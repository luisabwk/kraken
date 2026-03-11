---
description: Run task execution workflow step-by-step
allowed-tools: Bash, Read, Edit, Write, Grep
---

# Execution Checklist

Follow this checklist to ensure consistent, quality execution.

## Pre-Execution

1. Read the plan at `/vaults/<area>/projects/<project>/plans/[plan-file].md`
2. Check task statuses in the plan's task list
3. For "Done"/"In process" tasks, read their Notes
4. Verify project structure and dependencies

## During Execution

1. Update task status to "In process"
2. Follow steps in the task file
3. Document decisions in Notes section
4. Follow KISS, YAGNI, DRY principles

## Post-Execution

Run all applicable checks:

```bash
# TypeScript/JavaScript
npm run lint && npm run typecheck && npm test && npm run build

# Python
ruff check . && python3 -m mypy . && python3 -m pytest
```

Then:
1. Update task status to "Done"
2. Mark checkbox in plan's task list
3. Add completion notes and learnings
