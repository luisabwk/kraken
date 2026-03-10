---
description: "Use when managing MCP usage to optimize context window consumption"
alwaysApply: false
---

# MCP Modes

> Define which MCPs to use in each context to optimize the context window.

## Why This Exists

MCPs load tool definitions into the context. Many active MCPs = less space for code and conversation.

**Technical limitation**: It's not possible to disable MCPs at runtime. This rule instructs the agent to **avoid using** MCPs outside the selected mode.

## Available Modes

Customize these modes based on the MCPs installed in your workspace.

### `minimal`
**Usage**: Simple conversations, code analysis, debugging
**Active MCPs**: None (or memory MCP only)

### `dev`
**Usage**: Code development, feature implementation
**Active MCPs**: Documentation + database MCPs

Examples: context7 (docs), supabase (database), memory MCP

### `infra`
**Usage**: Deploy, infrastructure configuration
**Active MCPs**: Infrastructure + database MCPs

Examples: Railway/Vercel, supabase, database MCPs

### `pm`
**Usage**: Product management, documentation, communication
**Active MCPs**: Project management + communication MCPs

Examples: Linear/Jira, Notion, Slack, memory MCP

### `full`
**Usage**: When everything is needed (avoid if possible)
**Active MCPs**: All

## How to Use

### Via Command
```
/mcp dev
/mcp minimal
/mcp pm
```

### Via Project AGENTS.md
Add to the project's `AGENTS.md`:

```markdown
### MCP Mode
This project uses `dev` mode. Avoid using MCPs outside this mode.
```

### Via Direct Instruction
```
Use MCP mode: dev
```

## Configuring Modes for Your Workspace

Edit `vaults/AGENTS.md` or your project's `AGENTS.md` to define which MCPs belong to each mode. Example:

```markdown
## MCP Modes

| Mode | Active MCPs | Use Case |
|------|-------------|----------|
| `minimal` | None | Simple conversations |
| `dev` | context7, supabase | Development |
| `infra` | Railway, supabase, github | Deploy/Infra |
| `pm` | Linear, Notion, Slack | Product Management |
| `full` | All | When you need everything |
```

## Agent Behavior

When a mode is active, the agent should:

1. **Only use** MCPs allowed in the mode
2. **Not call** tools from MCPs outside the mode
3. **Inform** if an MCP outside the mode is needed (ask to switch modes)

### Behavior Example

```
Active mode: dev

User: "Create an issue in Linear for this bug"

Agent: "The current mode is `dev`, which doesn't include Linear. 
        Do you want me to switch to `pm` mode to create the issue?"
```

## Project-Specific Configuration

Projects can define their default mode in `AGENTS.md`:

```markdown
### MCP Mode: dev
This project uses `dev` mode by default.
Allowed MCPs: context7, supabase
```

The agent should respect this configuration when working on the project.
