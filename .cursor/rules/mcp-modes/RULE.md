# MCP Modes

> Define which MCPs to use in each context to optimize the context window.

## Why Does This Exist?

MCPs load tool definitions into context. Many active MCPs = less space for code and conversation.

**Technical limitation**: It's not possible to deactivate MCPs in real-time. This rule instructs the agent to **avoid using** MCPs outside the selected mode.

## Available Modes

### `minimal`
**Use case**: Simple conversations, code analysis, debugging
**Active MCPs**: No external MCPs - only native Cursor tools

```
✅ read_file, write, grep, codebase_search, run_terminal_cmd, etc.
❌ All external MCPs
```

### `dev`
**Use case**: Code development, feature implementation
**Active MCPs**:
- `context7` - Library documentation
- `semgrep` - Static security analysis
- `shadcn` - UI components

```
✅ context7, semgrep, shadcn
❌ Linear, Notion, Slack, Railway, supabase, github, supermemory
```

### `infra`
**Use case**: Deploy, infrastructure configuration, database
**Active MCPs**:
- `Railway` - Deploy and services
- `supabase` - Database and auth
- `github` - Repositories and PRs

```
✅ Railway, supabase, github
❌ Linear, Notion, Slack, context7, semgrep, shadcn, supermemory
```

### `pm`
**Use case**: Product management, documentation, communication
**Active MCPs**:
- `Linear` - Issues and projects
- `Notion` - Documentation and PRDs
- `Slack` - Communication
- `supermemory` - Memory and context

```
✅ Linear, Notion, Slack, supermemory
❌ Railway, supabase, github, context7, semgrep, shadcn
```

### `full`
**Use case**: When you need everything (avoid if possible)
**Active MCPs**: All

```
✅ All MCPs
```

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

## Quick Reference Table

| Mode | context7 | semgrep | shadcn | Railway | supabase | github | Linear | Notion | Slack | supermemory |
|------|----------|---------|--------|---------|----------|--------|--------|--------|-------|-------------|
| minimal | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| dev | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| infra | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| pm | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ |
| full | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

## Agent Behavior

When a mode is active, the agent should:

1. **Only use** MCPs allowed in the mode
2. **Not call** tools from MCPs outside the mode
3. **Inform** if it needs an MCP outside the mode (ask to switch modes)

### Example Behavior

```
Active mode: dev

User: "Create an issue in Linear for this bug"

Agent: "The current mode is `dev`, which doesn't include Linear. 
        Do you want me to switch to `pm` mode to create the issue?"
```

## Project Configuration

Projects can define their default mode in `AGENTS.md`:

```markdown
### MCP Mode: dev
This project uses `dev` mode by default.
```

The agent should respect this configuration when working on the project.
