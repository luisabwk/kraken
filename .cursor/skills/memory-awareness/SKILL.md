---
name: memory-awareness
description: Proactive memory usage for continuity across sessions. Use when a memory MCP is available — this skill governs when to automatically query and store memories, ensuring context persists between conversations. Triggers on task start, project context switch, architectural decision, complex bug resolution, and milestone completion.
---

# Memory Awareness

If a memory MCP is available in the workspace, use it **proactively** — don't wait for the user to ask.

## Auto-Query: When to Retrieve Memories

Query memories **before starting work** in these situations:

### 1. Task or Feature Start

Before implementing anything, fetch relevant context:

```
memory_query({ query: "<project-name> decisions architecture status", limit: 5, min_score: 0.4, project_name: "<project>" })
```

### 2. Project Context Switch

When the user moves to a different project:

```
memory_query({ query: "<new-project> recent status decisions blockers", limit: 5, min_score: 0.4, project_name: "<new-project>" })
```

### 3. Debugging Complex Issues

Before deep-diving, check if this was solved before:

```
memory_query({ query: "<error-or-symptom> fix resolution", limit: 3, min_score: 0.4, sector: "procedural" })
```

### 4. Creating Plans or PRDs

Before writing a plan, gather historical context:

```
memory_query({ query: "<topic> architecture constraints decisions", limit: 5, min_score: 0.4 })
```

### Query Guidelines

- Use `min_score: 0.4` for broader recall (default 0.7 is too strict)
- Use `project_name` filter when working within a known project
- Use `sector` filter for targeted searches (e.g., `procedural` for how-tos, `semantic` for facts)
- Don't flood context: limit to 3-5 results

## Auto-Store: When to Save Memories

Store memories **immediately after** these events:

### 1. Architectural Decisions

```
memory_store({
  content: "Decided to use <X> over <Y> because <reason>. Context: <context>",
  sector: "semantic",
  source_type: "vault",
  project_name: "<project>",
  tags: ["architecture", "decision", "<topic>"]
})
```

### 2. Complex Bug Resolutions

```
memory_store({
  content: "Bug: <symptom>. Root cause: <cause>. Fix: <solution>. Lesson: <learning>",
  sector: "procedural",
  source_type: "vault",
  project_name: "<project>",
  tags: ["bugfix", "<component>"]
})
```

### 3. Milestone Completions

```
memory_store({
  content: "Milestone completed: <description>. Deliverables: <list>. Next steps: <steps>",
  sector: "episodic",
  source_type: "vault",
  project_name: "<project>",
  tags: ["milestone", "completed"]
})
```

### 4. Infrastructure/Deploy Changes

```
memory_store({
  content: "Deploy: <what changed>. Service: <service>. Impact: <impact>",
  sector: "procedural",
  source_type: "global",
  tags: ["deploy", "infrastructure", "<service>"]
})
```

### 5. User Preferences and Patterns

When the user expresses a preference or pattern:

```
memory_store({
  content: "Preference: <what the user prefers>. Context: <when it applies>",
  sector: "emotional",
  source_type: "global",
  tags: ["preference", "<area>"]
})
```

### Store Guidelines

- Be **concise but complete** — future you has no extra context
- Always include `project_name` when applicable
- Use meaningful `tags` for future filtering
- Choose the right `sector`:
  - `episodic` — events, milestones, what happened
  - `semantic` — facts, decisions, knowledge
  - `procedural` — how-tos, processes, fixes
  - `emotional` — preferences, feelings, feedback
  - `reflective` — insights, meta-observations

## What NOT to Store

- Trivial changes (typo fixes, small refactors)
- Information already in code comments or docs
- Temporary debugging attempts that didn't lead anywhere
- Sensitive data (keys, passwords, tokens)

## Sector Quick Reference

| Sector | Store when... | Query when... |
|--------|--------------|---------------|
| `episodic` | Milestone, deploy, event | "What happened with X?" |
| `semantic` | Decision, fact, architecture | "How does X work?" |
| `procedural` | Fix, how-to, process | "How do I do X?" |
| `emotional` | Preference, feedback | "What does the user prefer?" |
| `reflective` | Insight, pattern noticed | "What did we learn?" |
