---
description: Initialize agent, verify setup, and load rules
allowed-tools: Bash, Read, Grep
---

# Agent Booting Process

Verify the workspace is ready for work.

## Boot Checklist

### 1. Verify Directory Structure
- [ ] `/vaults/` folder exists
- [ ] `/.claude/commands/` contains command files
- [ ] `/.claude/agents/` contains subagent definitions

### 2. Check Available Subagents

List subagents with: `claude agents`

| Agent | Purpose |
|-------|---------|
| `code-reviewer` | Confidence-based code review |
| `debugger` | Systematic root cause analysis |
| `prd-creator` | PRP creation and task decomposition |
| `code-simplifier` | Post-implementation code cleanup |
| `tdd-coach` | Test-driven development guidance |

### 3. Verify MCP Connections (Optional)
- [ ] Documentation MCP (e.g. context7)
- [ ] Memory MCP (if configured)
- [ ] Project management MCP (e.g. Linear, Jira)
- [ ] Database MCP (if needed)

### 4. Load Context
- [ ] Read `/context/history/session_log.md` if it exists
- [ ] Query memory MCP for project context (if available)

## Quick Boot

```bash
# Verify structure exists
ls vaults/ .claude/commands/ .claude/agents/

# Check recent context
cat context/history/session_log.md 2>/dev/null || echo "No session history yet"
```

Ready to work!
