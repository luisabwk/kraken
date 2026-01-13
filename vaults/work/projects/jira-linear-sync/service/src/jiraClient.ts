export type JiraIssueKey = string;

export type JiraStatus = {
  id: string;
  name: string;
  statusCategory?: { key?: string; name?: string } | null;
};

export type JiraComment = {
  id: string;
  created: string;
  updated: string;
  author?: { accountId?: string; displayName?: string } | null;
  body?: unknown;
};

export type JiraIssue = {
  key: JiraIssueKey;
  fields: {
    status: JiraStatus;
    updated: string;
  };
};

function requiredEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

function normalizeBaseUrl(raw: string): string {
  return raw.replace(/\/+$/, "");
}

function basicAuthHeader(email: string, apiToken: string): string {
  const raw = `${email}:${apiToken}`;
  const b64 = Buffer.from(raw, "utf8").toString("base64");
  return `Basic ${b64}`;
}

export function textToAdf(text: string): unknown {
  const lines = text.split("\n");
  const content: unknown[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] ?? "";
    if (line.length) content.push({ type: "text", text: line });
    if (i < lines.length - 1) content.push({ type: "hardBreak" });
  }
  return {
    type: "doc",
    version: 1,
    content: [{ type: "paragraph", content }],
  };
}

export function adfToPlainText(adf: unknown): string {
  const out: string[] = [];

  function walk(node: unknown) {
    if (!node) return;
    if (Array.isArray(node)) {
      for (const n of node) walk(n);
      return;
    }
    if (typeof node !== "object") return;

    const n = node as Record<string, unknown>;
    if (n.type === "text" && typeof n.text === "string") out.push(n.text);
    if (n.type === "hardBreak") out.push("\n");
    if (n.content) walk(n.content);
  }

  walk(adf);
  return out.join("").trimEnd();
}

export class JiraClient {
  private baseUrl: string;
  private authHeader: string;

  constructor(params?: { baseUrl?: string; email?: string; apiToken?: string }) {
    const baseUrl = params?.baseUrl ?? requiredEnv("JIRA_BASE_URL");
    const email = params?.email ?? requiredEnv("JIRA_EMAIL");
    const apiToken = params?.apiToken ?? requiredEnv("JIRA_API_TOKEN");
    this.baseUrl = normalizeBaseUrl(baseUrl);
    this.authHeader = basicAuthHeader(email, apiToken);
  }

  private async request<T>(method: string, path: string, body?: unknown): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.authHeader,
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Jira API HTTP ${res.status} ${res.statusText}: ${text}`);
    }
    return (await res.json()) as T;
  }

  async getIssue(issueKey: JiraIssueKey): Promise<JiraIssue> {
    return await this.request<JiraIssue>("GET", `/rest/api/3/issue/${encodeURIComponent(issueKey)}?fields=status,updated`);
  }

  async listComments(issueKey: JiraIssueKey): Promise<JiraComment[]> {
    const comments: JiraComment[] = [];
    let startAt = 0;
    const maxResults = 100;

    for (;;) {
      const page = await this.request<{
        startAt: number;
        maxResults: number;
        total: number;
        comments: JiraComment[];
      }>("GET", `/rest/api/3/issue/${encodeURIComponent(issueKey)}/comment?startAt=${startAt}&maxResults=${maxResults}`);
      comments.push(...(page.comments ?? []));
      startAt = page.startAt + page.maxResults;
      if (comments.length >= page.total) break;
    }

    return comments;
  }

  async addComment(issueKey: JiraIssueKey, textBody: string): Promise<{ id: string }> {
    return await this.request<{ id: string }>("POST", `/rest/api/3/issue/${encodeURIComponent(issueKey)}/comment`, {
      body: textToAdf(textBody),
    });
  }

  async listTransitions(issueKey: JiraIssueKey): Promise<Array<{ id: string; name: string; to?: { name?: string; id?: string } }>> {
    const data = await this.request<{ transitions: Array<{ id: string; name: string; to?: { name?: string; id?: string } }> }>(
      "GET",
      `/rest/api/3/issue/${encodeURIComponent(issueKey)}/transitions`,
    );
    return data.transitions ?? [];
  }

  async transitionIssue(issueKey: JiraIssueKey, transitionId: string): Promise<void> {
    await this.request("POST", `/rest/api/3/issue/${encodeURIComponent(issueKey)}/transitions`, { transition: { id: transitionId } });
  }
}
