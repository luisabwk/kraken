import { JIRA_LINEAR_SYNC_MARKER_PREFIX } from "./config.js";
import { JiraClient, adfToPlainText, type JiraIssueKey } from "./jiraClient.js";
import { JiraLinearMappingStore } from "./jiraLinearMappingStore.js";
import type { LinearClient } from "./linearClient.js";
import { createComment, fetchIssueSyncView, fetchProjectIssueIds, fetchTeamStatesByName, updateIssue } from "./linearClient.js";

export type SyncStatusMode = "jira_to_linear" | "bidirectional" | "off";

export type SyncConfig = {
  projectId: string;
  dryRun: boolean;
  statusMode: SyncStatusMode;
  linearStateNameForJiraCategory: Partial<Record<"new" | "indeterminate" | "done", string>>;
  linearStateNameForJiraStatusName?: Record<string, string>;
  jiraStatusForLinearStateName: Record<string, string>;
};

export function extractJiraIssueKeyFromText(text: string): string | null {
  const m = text.match(/\b([A-Z][A-Z0-9]{1,15}-\d{1,10})\b/);
  return m?.[1] ?? null;
}

export function extractJiraIssueKeyFromUrl(url: string): string | null {
  const patterns = [
    /\/browse\/([A-Z][A-Z0-9]{1,15}-\d{1,10})\b/,
    /[?&](?:selectedIssue|issueKey)=([A-Z][A-Z0-9]{1,15}-\d{1,10})\b/,
  ];
  for (const re of patterns) {
    const m = url.match(re);
    if (m?.[1]) return m[1];
  }
  return null;
}

function hasMarker(body: string | null | undefined, needle: string): boolean {
  if (!body) return false;
  return body.includes(needle);
}

function buildMarkerLine(params: Record<string, string>): string {
  const parts = Object.entries(params).map(([k, v]) => `${k}:${v}`);
  return `${JIRA_LINEAR_SYNC_MARKER_PREFIX} ${parts.join(" ")} -->`;
}

function statusCategoryKey(raw: unknown): "new" | "indeterminate" | "done" | null {
  const key = (raw as { fields?: { status?: { statusCategory?: { key?: string } } } })?.fields?.status?.statusCategory?.key;
  if (key === "new" || key === "indeterminate" || key === "done") return key;
  return null;
}

async function resolveJiraKeyForLinearIssue(params: {
  issueId: string;
  store: JiraLinearMappingStore;
  jira: JiraClient;
  linear: LinearClient;
}): Promise<JiraIssueKey | null> {
  const existing = params.store.getJiraKey(params.issueId);
  if (existing) return existing;

  const issue = await fetchIssueSyncView(params.linear, params.issueId);

  // 1) Explicit marker in description
  const marker = `${JIRA_LINEAR_SYNC_MARKER_PREFIX} jira:`;
  const desc = issue.description ?? "";
  const idx = desc.indexOf(marker);
  if (idx >= 0) {
    const slice = desc.slice(idx);
    const key = extractJiraIssueKeyFromText(slice);
    if (key) {
      try {
        await params.jira.getIssue(key);
        params.store.setIssuePair({ linearIssueId: issue.id, jiraKey: key });
        return key;
      } catch {
        // ignore invalid key
      }
    }
  }

  // 2) Jira links in attachments
  for (const a of issue.attachments?.nodes ?? []) {
    if (!a.url) continue;
    const key = extractJiraIssueKeyFromUrl(a.url);
    if (!key) continue;
    try {
      await params.jira.getIssue(key);
      params.store.setIssuePair({ linearIssueId: issue.id, jiraKey: key });
      return key;
    } catch {
      // ignore invalid key
    }
  }

  // 3) Fallback: find Jira key in title/description
  for (const candidateSource of [issue.title ?? "", issue.description ?? ""]) {
    const key = extractJiraIssueKeyFromText(candidateSource);
    if (!key) continue;
    try {
      await params.jira.getIssue(key);
      params.store.setIssuePair({ linearIssueId: issue.id, jiraKey: key });
      return key;
    } catch {
      // ignore invalid key
    }
  }

  return null;
}

async function ensureLinearStateFromJira(params: {
  jiraKey: JiraIssueKey;
  issueId: string;
  linear: LinearClient;
  jira: JiraClient;
  dryRun: boolean;
  linearStateNameForJiraCategory: SyncConfig["linearStateNameForJiraCategory"];
  linearStateNameForJiraStatusName?: SyncConfig["linearStateNameForJiraStatusName"];
  teamStateCache: Map<string, Map<string, string>>;
}): Promise<{ changed: boolean; desiredStateName?: string; desiredStateId?: string } | null> {
  const [jiraIssue, linearIssue] = await Promise.all([
    params.jira.getIssue(params.jiraKey),
    fetchIssueSyncView(params.linear, params.issueId),
  ]);

  const overrideStateName = params.linearStateNameForJiraStatusName?.[jiraIssue.fields.status.name];
  const cat = statusCategoryKey(jiraIssue) ?? "indeterminate";
  const desiredStateName = overrideStateName ?? params.linearStateNameForJiraCategory[cat];
  if (!desiredStateName) return null;
  if (linearIssue.state.name === desiredStateName) return { changed: false, desiredStateName };

  if (!params.teamStateCache.has(linearIssue.team.id)) {
    params.teamStateCache.set(linearIssue.team.id, await fetchTeamStatesByName(params.linear, linearIssue.team.id));
  }
  const map = params.teamStateCache.get(linearIssue.team.id)!;
  const desiredStateId = map.get(desiredStateName);
  if (!desiredStateId) return null;

  if (!params.dryRun) {
    await updateIssue(params.linear, { id: linearIssue.id, stateId: desiredStateId });
  }
  return { changed: true, desiredStateName, desiredStateId };
}

async function ensureJiraStatusFromLinear(params: {
  jiraKey: JiraIssueKey;
  issueId: string;
  linear: LinearClient;
  jira: JiraClient;
  dryRun: boolean;
  jiraStatusForLinearStateName: SyncConfig["jiraStatusForLinearStateName"];
}): Promise<{ changed: boolean; desiredStatusName?: string } | null> {
  const [jiraIssue, linearIssue] = await Promise.all([
    params.jira.getIssue(params.jiraKey),
    fetchIssueSyncView(params.linear, params.issueId),
  ]);
  const desiredStatusName = params.jiraStatusForLinearStateName[linearIssue.state.name];
  if (!desiredStatusName) return null;
  if (jiraIssue.fields.status.name === desiredStatusName) return { changed: false, desiredStatusName };

  const transitions = await params.jira.listTransitions(params.jiraKey);
  const match =
    transitions.find((t) => t.to?.name === desiredStatusName) ??
    transitions.find((t) => t.name === desiredStatusName) ??
    null;
  if (!match) return null;

  if (!params.dryRun) {
    await params.jira.transitionIssue(params.jiraKey, match.id);
  }
  return { changed: true, desiredStatusName };
}

async function syncCommentsJiraToLinear(params: {
  jiraKey: JiraIssueKey;
  issueId: string;
  linear: LinearClient;
  jira: JiraClient;
  store: JiraLinearMappingStore;
  dryRun: boolean;
}): Promise<number> {
  const [jiraComments, linearIssue] = await Promise.all([
    params.jira.listComments(params.jiraKey),
    fetchIssueSyncView(params.linear, params.issueId),
  ]);
  const linearBodies = new Set((linearIssue.comments?.nodes ?? []).map((c) => c.body));

  let createdCount = 0;
  for (const jc of jiraComments) {
    if (!jc.id) continue;
    if (params.store.hasJiraCommentMirrored(jc.id)) continue;

    const text = adfToPlainText(jc.body);
    if (!text) continue;

    const marker = buildMarkerLine({ source: "jira", key: params.jiraKey, comment: jc.id });
    if (typeof text === "string" && text.includes(`${JIRA_LINEAR_SYNC_MARKER_PREFIX} source:linear`)) continue;

    const author = jc.author?.displayName ?? "unknown";
    const body = [
      marker,
      `### Jira Comment (${params.jiraKey})`,
      `- **Author**: ${author}`,
      `- **Created**: ${jc.created}`,
      "",
      text,
    ].join("\n");

    if (linearBodies.has(body)) continue;

    if (!params.dryRun) {
      const created = await createComment(params.linear, { issueId: linearIssue.id, body });
      params.store.setCommentPair({ jiraCommentId: jc.id, linearCommentId: created.id });
    }
    createdCount += 1;
  }

  return createdCount;
}

async function syncCommentsLinearToJira(params: {
  jiraKey: JiraIssueKey;
  issueId: string;
  linear: LinearClient;
  jira: JiraClient;
  store: JiraLinearMappingStore;
  dryRun: boolean;
}): Promise<number> {
  const [jiraComments, linearIssue] = await Promise.all([
    params.jira.listComments(params.jiraKey),
    fetchIssueSyncView(params.linear, params.issueId),
  ]);
  const jiraPlainBodies = new Set(jiraComments.map((c) => adfToPlainText(c.body)));

  let createdCount = 0;
  for (const lc of linearIssue.comments?.nodes ?? []) {
    if (!lc.id) continue;
    if (params.store.hasLinearCommentMirrored(lc.id)) continue;
    if (hasMarker(lc.body, `${JIRA_LINEAR_SYNC_MARKER_PREFIX} source:jira`)) continue;

    const marker = buildMarkerLine({ source: "linear", issue: linearIssue.id, comment: lc.id });
    const author = lc.user?.name ?? lc.user?.id ?? "unknown";

    const bodyText = [
      marker,
      `[Linear] Mirrored comment from ${linearIssue.url ?? linearIssue.id}`,
      `Author: ${author}`,
      `Created: ${lc.createdAt}`,
      "",
      lc.body,
    ].join("\n");

    if (jiraPlainBodies.has(bodyText)) continue;

    if (!params.dryRun) {
      const created = await params.jira.addComment(params.jiraKey, bodyText);
      params.store.setCommentPair({ jiraCommentId: created.id, linearCommentId: lc.id });
    }
    createdCount += 1;
  }

  return createdCount;
}

export async function runJiraLinearSync(params: {
  linear: LinearClient;
  jira: JiraClient;
  store?: JiraLinearMappingStore;
  config: SyncConfig;
}): Promise<{
  ok: true;
  scanned: number;
  mapped: number;
  statusChanges: number;
  commentsJiraToLinear: number;
  commentsLinearToJira: number;
  skippedNoJiraKey: number;
}> {
  const store = params.store ?? new JiraLinearMappingStore();
  const teamStateCache = new Map<string, Map<string, string>>();

  const issueIds = await fetchProjectIssueIds(params.linear, params.config.projectId);

  let scanned = 0;
  let mapped = 0;
  let statusChanges = 0;
  let commentsJiraToLinear = 0;
  let commentsLinearToJira = 0;
  let skippedNoJiraKey = 0;

  for (const issueId of issueIds) {
    scanned += 1;
    const jiraKey = await resolveJiraKeyForLinearIssue({ issueId, store, jira: params.jira, linear: params.linear });
    if (!jiraKey) {
      skippedNoJiraKey += 1;
      continue;
    }
    mapped += 1;

    if (params.config.statusMode === "jira_to_linear" || params.config.statusMode === "bidirectional") {
      const res = await ensureLinearStateFromJira({
        jiraKey,
        issueId,
        linear: params.linear,
        jira: params.jira,
        dryRun: params.config.dryRun,
        linearStateNameForJiraCategory: params.config.linearStateNameForJiraCategory,
        linearStateNameForJiraStatusName: params.config.linearStateNameForJiraStatusName,
        teamStateCache,
      });
      if (res?.changed) statusChanges += 1;
    }

    if (params.config.statusMode === "bidirectional") {
      const res = await ensureJiraStatusFromLinear({
        jiraKey,
        issueId,
        linear: params.linear,
        jira: params.jira,
        dryRun: params.config.dryRun,
        jiraStatusForLinearStateName: params.config.jiraStatusForLinearStateName,
      });
      if (res?.changed) statusChanges += 1;
    }

    commentsJiraToLinear += await syncCommentsJiraToLinear({
      jiraKey,
      issueId,
      linear: params.linear,
      jira: params.jira,
      store,
      dryRun: params.config.dryRun,
    });

    commentsLinearToJira += await syncCommentsLinearToJira({
      jiraKey,
      issueId,
      linear: params.linear,
      jira: params.jira,
      store,
      dryRun: params.config.dryRun,
    });
  }

  return { ok: true, scanned, mapped, statusChanges, commentsJiraToLinear, commentsLinearToJira, skippedNoJiraKey };
}
