import { describe, expect, it } from "vitest";
import { adfToPlainText, textToAdf } from "../src/jiraClient.js";
import { extractJiraIssueKeyFromText, extractJiraIssueKeyFromUrl } from "../src/jiraLinearSync.js";
import { JIRA_LINEAR_SYNC_MARKER_PREFIX } from "../src/config.js";

describe("jira-linear-sync parsing", () => {
  it("extracts Jira issue key from text", () => {
    expect(extractJiraIssueKeyFromText("Ticket ABC-123 needs attention")).toBe("ABC-123");
    expect(extractJiraIssueKeyFromText("abc-123 lower")).toBe(null);
    expect(extractJiraIssueKeyFromText("No key here")).toBe(null);
  });

  it("extracts Jira issue key from Jira browse url", () => {
    expect(extractJiraIssueKeyFromUrl("https://my.atlassian.net/browse/ABC-123")).toBe("ABC-123");
    expect(extractJiraIssueKeyFromUrl("https://my.atlassian.net/jira/software/c/projects/ABC/boards/1?selectedIssue=ABC-999")).toBe(
      "ABC-999",
    );
    expect(extractJiraIssueKeyFromUrl("https://example.com/not-jira")).toBe(null);
  });

  it("roundtrips comment text through ADF helpers", () => {
    const text = `${JIRA_LINEAR_SYNC_MARKER_PREFIX} source:linear issue:foo comment:bar -->\nHello\nWorld`;
    const adf = textToAdf(text);
    expect(adfToPlainText(adf)).toBe(text);
  });
});
