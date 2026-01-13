# Hooks System

> Behavioral guardrails that prevent unwanted actions before they happen.

## Overview

Hooks are rules that the agent must check **before** executing certain actions. They act as safety nets to prevent common mistakes, enforce best practices, and maintain code quality.

## How It Works

1. **Before executing an action**, check if any hook applies
2. **If hook matches**, follow the specified action (warn or block)
3. **Document** when hooks are triggered in task Notes

## Hook Structure

Each hook is a markdown file with YAML frontmatter:

```markdown
---
name: hook-identifier
enabled: true
event: bash | file | commit | stop
pattern: regex-pattern
action: warn | block
---

Message to display when hook triggers.
```

## Events

| Event | When to Check | What to Inspect |
|-------|---------------|-----------------|
| `bash` | Before running shell commands | The command string |
| `file` | Before writing/editing files | File path, content |
| `commit` | Before git commits | Changed files, message |
| `stop` | Before ending a task | What was accomplished |

## Actions

| Action | Behavior |
|--------|----------|
| `warn` | Show message, ask for confirmation, allow if user approves |
| `block` | Show message, do NOT proceed, suggest alternative |

## Active Hooks

| Hook | Event | Action | Purpose |
|------|-------|--------|----------|
| `block-dangerous-commands` | bash | block | Prevent destructive commands |
| `warn-debug-code` | file | warn | Detect console.log, debugger |
| `warn-hardcoded-secrets` | file | warn | Detect API keys in code |
| `warn-large-files` | file | warn | Files over 500 lines |
| `warn-any-type` | file | warn | TypeScript `any` usage |
| `require-tests` | stop | warn | Remind to run tests |
| `warn-env-commit` | commit | block | Prevent .env commits |

## Usage Guidelines

### For the Agent

1. **Always** check hooks before executing actions
2. **Never** bypass a `block` action without explicit user permission
3. **Always** show the hook message when triggered
4. **Document** hook triggers in task Notes

### For the User

1. Hooks can be **disabled** by setting `enabled: false`
2. Create **new hooks** by adding `.md` files to this directory
3. Hooks are **conventions** - they rely on agent compliance

## Creating New Hooks

1. Create a new `.md` file in `.cursor/hooks/`
2. Add frontmatter with required fields
3. Write a clear message explaining the issue and alternatives
4. Test by triggering the condition

## Integration

- **Boot**: Agent loads hooks during `/boot`
- **Execution**: Hooks checked during task execution
- **Review**: Hook violations noted in code review
