---
description: Switch MCP mode to optimize context window
allowed-tools: Bash, Read
argument-hint: <minimal|dev|infra|pm|full|list|status>
---

# MCP Mode Management

## Modes

| Mode | MCPs | Use Case |
|------|------|----------|
| `minimal` | None | Simple conversations |
| `dev` | Documentation + database | Development |
| `infra` | Infrastructure + database | Deploy/Infra |
| `pm` | Project management | Product Management |
| `full` | All | When everything is needed |

## Actions

- `/mcp list` — Show available modes
- `/mcp status` — Show current mode
- `/mcp [mode]` — Activate mode, list allowed/blocked MCPs

Configure actual MCP lists per project in `.mcp.json` or the project's `CLAUDE.md`.
