# Context Directory

Dynamic context storage for managing LLM context window efficiently.

## Subdirectories

| Directory | Purpose | Auto-cleanup |
|-----------|---------|--------------|
| `mcp/` | Long MCP tool responses (>50 lines) | Files >7 days old |
| `history/` | Session persistence and decision log | Manual |
| `terminal/` | Command execution logs | Files >7 days old |

## Usage

Files are created automatically by the agent when following the Dynamic Context Management rules (see `.cursor/rules/dynamic-context/RULE.md`).

### Commands

- `/context status` — Show usage statistics
- `/context clean` — Remove files older than 7 days
- `/context log [message]` — Add entry to session history
- `/context save [type] [content]` — Manually save content

## Cleanup Policy

- `mcp/` and `terminal/`: files older than 7 days can be safely deleted
- `history/session_log.md`: preserved long-term (manual cleanup only)
- Use `/context clean` or `/clean` for maintenance
