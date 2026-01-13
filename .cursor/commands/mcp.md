# /mcp - Manage MCP Mode

> Activate an MCP mode to optimize context window usage.

## Usage

```
/mcp [mode]
/mcp list
/mcp status
```

## Arguments

| Argument | Description |
|----------|-------------|
| `minimal` | No external MCPs - only native tools |
| `dev` | Development: context7, semgrep, shadcn |
| `infra` | Infrastructure: Railway, supabase, github |
| `pm` | Product Management: Linear, Notion, Slack, supermemory |
| `full` | All MCPs (avoid if possible) |
| `list` | List available modes |
| `status` | Show current mode |

## Instructions for the Agent

When this command is invoked:

### If argument = `list`
Respond with the list of available modes:

```
📋 Available MCP Modes:

• minimal  - No external MCPs (simple conversations, debugging)
• dev      - context7 + semgrep + shadcn (development)
• infra    - Railway + supabase + github (deploy, database)
• pm       - Linear + Notion + Slack + supermemory (management)
• full     - All MCPs (avoid if possible)

Use: /mcp [mode] to activate
```

### If argument = `status`
Report which mode is active based on the current conversation or the project's AGENTS.md.

### If argument = name of a valid mode
1. Confirm mode activation
2. List which MCPs are allowed
3. List which MCPs are blocked
4. From this point forward, **avoid using MCPs outside the mode**

Example response:

```
✅ Mode `dev` activated

Allowed:
• context7 - Library documentation
• semgrep - Security analysis
• shadcn - UI components

Blocked in this mode:
• Linear, Notion, Slack, Railway, supabase, github, supermemory

If you need a blocked MCP, let me know to switch modes.
```

### If argument is invalid or missing
Show help:

```
❓ Mode not recognized.

Use: /mcp [mode]

Available modes: minimal, dev, infra, pm, full
For details: /mcp list
```

## Important

⚠️ **Technical limitation**: This command does NOT deactivate MCPs from Cursor. 
It instructs the agent to avoid using MCPs outside the selected mode.

To actually reduce context consumption, configure MCPs per project in `.cursor/mcp.json`.
