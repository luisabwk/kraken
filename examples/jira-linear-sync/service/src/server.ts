import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { JiraClient } from "./jiraClient.js";
import { runJiraLinearSync, type SyncStatusMode } from "./jiraLinearSync.js";
import { LinearClient } from "./linearClient.js";

function getEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

function jsonResponse(res: http.ServerResponse, status: number, body: unknown) {
  const raw = JSON.stringify(body);
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(raw);
}

function parseBearerToken(headerValue: string | undefined): string | null {
  if (!headerValue) return null;
  const m = headerValue.match(/^Bearer\s+(.+)\s*$/i);
  return m?.[1] ?? null;
}

function readJsonFile<T>(filePath: string): T {
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw) as T;
}

async function main() {
  const port = Number(process.env.PORT ?? "3000");
  const dryRun = process.env.DRY_RUN === "1";
  const syncTriggerToken = getEnv("SYNC_TRIGGER_TOKEN");

  const linear = new LinearClient(getEnv("LINEAR_API_KEY"));
  const jira = new JiraClient();

  // Look for status mapping file in ../project/
  const mappingPath = path.join(process.cwd(), "..", "project", "status-mapping.json");
  let mapping: {
    meta?: { linearProject?: { id?: string } };
    jiraStatusNameToLinearStateName?: Record<string, string>;
    linearStateNameToJiraStatusName?: Record<string, string>;
  } = {};
  
  if (fs.existsSync(mappingPath)) {
    mapping = readJsonFile(mappingPath);
  }

  const projectId = process.env.LINEAR_SYNC_PROJECT_ID ?? mapping?.meta?.linearProject?.id;
  if (!projectId) throw new Error("Missing LINEAR_SYNC_PROJECT_ID and mapping.meta.linearProject.id");

  const server = http.createServer(async (req, res) => {
    try {
      // Health check
      if (req.method === "GET" && req.url === "/health") {
        return jsonResponse(res, 200, { ok: true, service: "jira-linear-sync" });
      }

      if (req.method !== "POST" || req.url !== "/sync") {
        res.statusCode = 404;
        return res.end("Not found");
      }

      const got = parseBearerToken(String(req.headers.authorization ?? ""));
      if (!got || got !== syncTriggerToken) return jsonResponse(res, 401, { ok: false, error: "Unauthorized" });

      const statusMode = (process.env.SYNC_STATUS_MODE ?? "jira_to_linear") as SyncStatusMode;
      const linearStateNameForJiraCategory = {
        new: process.env.LINEAR_STATE_FOR_JIRA_NEW ?? "Todo",
        indeterminate: process.env.LINEAR_STATE_FOR_JIRA_INDETERMINATE ?? "In Progress",
        done: process.env.LINEAR_STATE_FOR_JIRA_DONE ?? "Done",
      } as const;

      let jiraStatusForLinearStateName: Record<string, string> = mapping?.linearStateNameToJiraStatusName ?? {};
      const rawMap = process.env.JIRA_STATUS_FOR_LINEAR_STATE_NAME_JSON;
      if (rawMap) jiraStatusForLinearStateName = JSON.parse(rawMap) as Record<string, string>;

      const result = await runJiraLinearSync({
        linear,
        jira,
        config: {
          projectId,
          dryRun,
          statusMode,
          linearStateNameForJiraCategory,
          linearStateNameForJiraStatusName: mapping?.jiraStatusNameToLinearStateName ?? undefined,
          jiraStatusForLinearStateName,
        },
      });

      return jsonResponse(res, 200, result);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("Sync error:", message);
      return jsonResponse(res, 500, { ok: false, error: message });
    }
  });

  server.listen(port, () => {
    console.log(`\ud83d\udd04 jira-linear-sync listening on :${port}`);
    console.log(`   POST /sync (Bearer token)`);
    console.log(`   GET  /health`);
    if (dryRun) console.log("   DRY_RUN=1 (no writes)");
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
