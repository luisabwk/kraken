---
description: "Use when managing context window to optimize token usage and prevent context bloat"
alwaysApply: true
---

# Dynamic Context Management

> Optimize context window usage through intelligent offloading and selective retrieval.

## Why This Exists

LLM context windows are finite. When they fill up:
- **Auto-compaction** loses important details
- **Token costs** increase unnecessarily
- **Model precision** decreases with noise

**Solution**: Offload verbose data to filesystem, retrieve selectively.

## The 4 Rules

### Rule 01: Progressive Tool Disclosure

**Problem**: MCP tool schemas consume significant context space.

**Solution**:
1. Keep only tool **name + description** in active context
2. Lookup full schema only when needed
3. Load only parameters required for current operation

**Check**: If tool schemas exceed ~10% of context, they're too verbose.

### Rule 02: Long Response Handling

**Threshold**: Any output exceeding **50 lines** is "long".

**Workflow**:
```bash
# Step 1: Save to context directory
tool_output > ./context/mcp/{tool}_{timestamp}.md

# Step 2: Extract what you need
grep "relevant_pattern" ./context/mcp/{tool}_{timestamp}.md
head -30 ./context/mcp/{tool}_{timestamp}.md
tail -20 ./context/mcp/{tool}_{timestamp}.md
```

**Naming Convention**: `{tool_name}_{epoch_timestamp}.md`

### Rule 03: Session History Persistence

**Purpose**: Survive auto-compaction by maintaining external memory.

**Update Triggers**:
- Architectural decisions
- Important learnings
- Debugging breakthroughs
- Context that must persist

**Location**: `/context/history/session_log.md`

**Format**:
```markdown
## [YYYY-MM-DD HH:MM] - Title

**Context**: What was happening
**Decision**: What was decided
**Rationale**: Why
**Impact**: What this affects
```

### Rule 04: Terminal Log Management

**Problem**: Build/test outputs flood chat history.

**Solution**:
```bash
# Redirect to file
npm run build > ./context/terminal/build_$(date +%s).txt 2>&1

# Analyze selectively
tail -20 ./context/terminal/build_*.txt
grep -i "error\|warn" ./context/terminal/build_*.txt
```

## Directory Structure

```
/context/
├── README.md           # Overview and policies
├── mcp/                # Long MCP responses
│   └── {tool}_{ts}.md
├── history/            # Session persistence
│   └── session_log.md
└── terminal/           # Execution logs
    └── log_{ts}.txt
```

## Workflow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│  1. RECEIVE PROMPT                                          │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  2. CHECK: Is MCP tool needed?                              │
│     → YES: Dynamic lookup (not preloaded schema)            │
│     → NO: Proceed                                           │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  3. EXECUTE: Run tool/command                               │
│     → Output > 50 lines? Save to /context/{type}/           │
│     → Output ≤ 50 lines? Display normally                   │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  4. RETRIEVE: Extract only needed information               │
│     → grep, head, tail for specific data                    │
│     → Never load full verbose output into context           │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  5. RECORD: Update session history if significant           │
│     → Decisions, learnings, context to preserve             │
└─────────────────────────────────────────────────────────────┘
```

## When to Apply This Rule

| Scenario | Apply? | Notes |
|----------|--------|-------|
| Long MCP responses | Yes | Save to `/context/mcp/` |
| Build/test output | Yes | Save to `/context/terminal/` |
| Architecture decisions | Yes | Log to `/context/history/` |
| Simple code edits | No | Not worth the overhead |
| Quick Q&A | No | Context not at risk |

## Commands

| Command | Purpose |
|---------|---------|
| `/context status` | Show context directory usage |
| `/context clean` | Remove files older than 7 days |
| `/context log` | Add entry to session history |

## Integration with Other Rules

### With MCP Modes (`mcp-modes/`)
- Dynamic context complements MCP modes
- Modes control **which** MCPs to use
- Dynamic context controls **how** to handle their output

### With Execution (`execution/`)
- Apply Rule 04 during task execution
- Redirect verbose outputs to `/context/terminal/`
- Apply Rule 03 after completing significant tasks

### With Skills (`.cursor/skills/`)
- Skills provide detailed procedures that complement rules
- Skills are loaded on-demand when the agent detects a matching context
- See `.cursor/skills/` for available skills

## Cleanup Policy

```bash
# Files older than 7 days can be deleted
find ./context/mcp -mtime +7 -delete
find ./context/terminal -mtime +7 -delete

# History is preserved longer (manual cleanup)
```

## Metrics

Expected improvements from dynamic context management:
- **Context usage**: Reduced by up to ~47%
- **Token costs**: Proportionally reduced
- **Model precision**: Improved (less noise)

## Quick Reference

| Situation | Action |
|-----------|--------|
| Output > 50 lines | `> ./context/{type}/file.md` |
| Need specific info | `grep pattern file.md` |
| Important decision | Update `session_log.md` |
| Starting session | Check `session_log.md` for context |
