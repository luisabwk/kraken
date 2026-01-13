import { LINEAR_API_URL } from "./config.js";

export type LinearGraphQLResponse<T> = { data?: T; errors?: Array<{ message: string }> };

export class LinearClient {
  constructor(private apiKey: string) {}

  async request<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
    const res = await fetch(LINEAR_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.apiKey,
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Linear API HTTP ${res.status} ${res.statusText}: ${text}`);
    }

    const json = (await res.json()) as LinearGraphQLResponse<T>;
    if (json.errors?.length) {
      throw new Error(`Linear API errors: ${json.errors.map((e) => e.message).join(" | ")}`);
    }
    if (!json.data) throw new Error("Linear API: missing data");
    return json.data;
  }
}

export type IssueLite = {
  id: string;
  title: string;
  description?: string | null;
  url?: string | null;
  updatedAt?: string | null;
  team: { id: string; key?: string | null; name?: string | null };
  state: { id: string; name: string };
};

export type IssueAttachment = { id: string; url?: string | null; title?: string | null };

export type IssueComment = {
  id: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  user?: { id: string; name?: string | null } | null;
};

export type IssueSyncView = IssueLite & {
  attachments?: { nodes: IssueAttachment[] };
  comments?: { nodes: IssueComment[] };
};

export async function fetchIssueSyncView(client: LinearClient, issueId: string): Promise<IssueSyncView> {
  const query = /* GraphQL */ `
    query IssueSyncView($id: String!) {
      issue(id: $id) {
        id
        title
        description
        url
        updatedAt
        team { id key name }
        state { id name }
        attachments { nodes { id url title } }
        comments { nodes { id body createdAt updatedAt user { id name } } }
      }
    }
  `;

  const data = await client.request<{ issue: IssueSyncView | null }>(query, { id: issueId });
  if (!data.issue) throw new Error(`Issue not found: ${issueId}`);
  return data.issue;
}

export async function fetchProjectIssueIds(client: LinearClient, projectId: string): Promise<string[]> {
  const ids: string[] = [];
  let after: string | null = null;

  const query = /* GraphQL */ `
    query ProjectIssues($projectId: String!, $after: String) {
      project(id: $projectId) {
        issues(first: 50, after: $after) {
          nodes { id }
          pageInfo { hasNextPage endCursor }
        }
      }
    }
  `;

  type Response = {
    project: {
      issues: {
        nodes: Array<{ id: string }>;
        pageInfo: { hasNextPage: boolean; endCursor?: string | null };
      };
    } | null;
  };

  for (;;) {
    const data = await client.request<Response>(query, { projectId, after });
    if (!data.project) throw new Error(`Project not found: ${projectId}`);
    ids.push(...data.project.issues.nodes.map((n) => n.id));
    if (!data.project.issues.pageInfo.hasNextPage) break;
    after = data.project.issues.pageInfo.endCursor ?? null;
    if (!after) break;
  }

  return ids;
}

export async function fetchTeamStatesByName(client: LinearClient, teamId: string): Promise<Map<string, string>> {
  const query = /* GraphQL */ `
    query TeamStates($id: String!) {
      team(id: $id) { states { nodes { id name } } }
    }
  `;

  const data = await client.request<{
    team: { states: { nodes: Array<{ id: string; name: string }> } } | null;
  }>(query, { id: teamId });
  if (!data.team) throw new Error(`Team not found: ${teamId}`);
  
  const map = new Map<string, string>();
  for (const s of data.team.states.nodes) map.set(s.name, s.id);
  return map;
}

export async function updateIssue(client: LinearClient, input: { id: string; stateId?: string }): Promise<void> {
  const mutation = /* GraphQL */ `
    mutation IssueUpdate($id: String!, $input: IssueUpdateInput!) {
      issueUpdate(id: $id, input: $input) { success }
    }
  `;

  const data = await client.request<{ issueUpdate: { success: boolean } }>(mutation, {
    id: input.id,
    input: { ...(input.stateId ? { stateId: input.stateId } : {}) },
  });

  if (!data.issueUpdate.success) throw new Error("issueUpdate failed");
}

export async function createComment(client: LinearClient, input: { issueId: string; body: string }): Promise<{ id: string }> {
  const mutation = /* GraphQL */ `
    mutation CommentCreate($input: CommentCreateInput!) {
      commentCreate(input: $input) { success comment { id } }
    }
  `;

  const data = await client.request<{
    commentCreate: { success: boolean; comment: { id: string } | null };
  }>(mutation, { input: { issueId: input.issueId, body: input.body } });

  if (!data.commentCreate.success || !data.commentCreate.comment) {
    throw new Error("commentCreate failed");
  }
  return data.commentCreate.comment;
}
