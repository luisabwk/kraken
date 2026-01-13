import fs from "node:fs";
import path from "node:path";

type MappingFile = {
  linearToJira: Record<string, { jiraKey: string }>;
  jiraToLinear: Record<string, { linearIssueId: string }>;
  jiraCommentToLinearComment: Record<string, { linearCommentId: string }>;
  linearCommentToJiraComment: Record<string, { jiraCommentId: string }>;
};

const DEFAULT_FILE: MappingFile = {
  linearToJira: {},
  jiraToLinear: {},
  jiraCommentToLinearComment: {},
  linearCommentToJiraComment: {},
};

export class JiraLinearMappingStore {
  private filePath: string;

  constructor(filePath?: string) {
    this.filePath = filePath ?? path.join(process.cwd(), ".tmp", "jira-linear-sync", "mappings.json");
  }

  private ensureDir() {
    fs.mkdirSync(path.dirname(this.filePath), { recursive: true });
  }

  private readFile(): MappingFile {
    this.ensureDir();
    if (!fs.existsSync(this.filePath)) return { ...DEFAULT_FILE };
    const raw = fs.readFileSync(this.filePath, "utf8");
    try {
      const parsed = JSON.parse(raw) as Partial<MappingFile>;
      return {
        linearToJira: parsed.linearToJira ?? {},
        jiraToLinear: parsed.jiraToLinear ?? {},
        jiraCommentToLinearComment: parsed.jiraCommentToLinearComment ?? {},
        linearCommentToJiraComment: parsed.linearCommentToJiraComment ?? {},
      };
    } catch {
      return { ...DEFAULT_FILE };
    }
  }

  private writeFile(data: MappingFile) {
    this.ensureDir();
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), "utf8");
  }

  getJiraKey(linearIssueId: string): string | undefined {
    return this.readFile().linearToJira[linearIssueId]?.jiraKey;
  }

  getLinearIssueId(jiraKey: string): string | undefined {
    return this.readFile().jiraToLinear[jiraKey]?.linearIssueId;
  }

  setIssuePair(params: { linearIssueId: string; jiraKey: string }) {
    const data = this.readFile();
    data.linearToJira[params.linearIssueId] = { jiraKey: params.jiraKey };
    data.jiraToLinear[params.jiraKey] = { linearIssueId: params.linearIssueId };
    this.writeFile(data);
  }

  hasJiraCommentMirrored(jiraCommentId: string): boolean {
    return Boolean(this.readFile().jiraCommentToLinearComment[jiraCommentId]?.linearCommentId);
  }

  hasLinearCommentMirrored(linearCommentId: string): boolean {
    return Boolean(this.readFile().linearCommentToJiraComment[linearCommentId]?.jiraCommentId);
  }

  setCommentPair(params: { jiraCommentId: string; linearCommentId: string }) {
    const data = this.readFile();
    data.jiraCommentToLinearComment[params.jiraCommentId] = { linearCommentId: params.linearCommentId };
    data.linearCommentToJiraComment[params.linearCommentId] = { jiraCommentId: params.jiraCommentId };
    this.writeFile(data);
  }
}
