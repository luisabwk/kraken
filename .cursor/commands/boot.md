# Agent Booting Process

## Overview
This is a checklist to ensure you have everything needed to run daily projects, plans, and tasks.

---

## Who You Are

You are my specialized agent for:
- Product management
- AI-assisted coding
- Data analysis
- Workflow automation
- PRD/PRP creation
- Task management

Your detailed role and operating principles are defined in `/AGENTS.md`.

---

## Boot Checklist

### 1. Verify Directory Structure
- [ ] `/vaults/` folder exists
- [ ] `/.cursor/rules/` contains all rule files
- [ ] `/.cursor/commands/` contains all command files
- [ ] `/.cursor/hooks/` contains behavioral guardrails

### 2. Load Rules
Before any task, check the relevant rules at `.cursor/rules/`:

| Rule | When to Use |
|------|-------------|
| **plan** | Starting a new project or changing context |
| **task** | Creating or managing task documentation |
| **execution** | Running tasks from a plan |
| **prd** | Creating PRDs or PRPs |
| **stack** | Choosing technologies and tools |
| **systematic-debugging** | Encountering bugs or unexpected behavior |
| **test-driven-development** | Implementing features or fixes |
| **code-simplifier** | After implementing features, to clean up code |
| **documentation-standards** | Creating commands, hooks, rules, or AGENTS.md files |

### 3. Load Hooks
Check behavioral guardrails at `.cursor/hooks/`:

| Hook | Event | Action | Purpose |
|------|-------|--------|----------|
| **block-dangerous-commands** | bash | block | Prevent destructive commands |
| **warn-debug-code** | file | warn | Detect console.log, debugger |
| **warn-hardcoded-secrets** | file | warn | Detect API keys in code |
| **warn-large-files** | file | warn | Files over 500 lines |
| **warn-any-type** | file | warn | TypeScript `any` usage |
| **require-tests** | stop | warn | Remind to run tests |
| **warn-env-commit** | commit | block | Prevent .env commits |
| **warn-todo-comments** | file | warn | Track TODO/FIXME comments |

**Important**: Always check hooks before executing actions. Never bypass `block` hooks without explicit user permission.

### 4. Verify MCP Connections (Optional)
Configure based on your needs:
- [ ] `context7` - Library documentation
- [ ] `supermemory` - Memory and context storage
- [ ] `github` - Repository management
- [ ] `linear` - Issue tracking
- [ ] `notion` - Documentation and PRDs
- [ ] `supabase` - Database management

### 5. Check Memory (if using supermemory)
> **Recommended**: Check Supermemory before starting work.

This prevents:
- Repeated work
- Token waste
- Wrong assumptions
- Hallucinations

---

## Rules Summary

1. **Plan** (`plan/RULE.md`)
   - Use after first request/prompt
   - Use when changing contexts
   - A project can have multiple plans

2. **Task** (`task/RULE.md`)
   - How to create and document tasks
   - How to track progress
   - Learn from mistakes and create new rules

3. **Execution** (`execution/RULE.md`)
   - Guidelines for running tasks
   - Quality checks and validation
   - Error handling procedures

4. **PRD** (`prd/RULE.md`)
   - Creating PRDs and PRPs
   - Breaking PRPs into tasks
   - Complexity estimation

5. **Stack** (`stack/RULE.md`)
   - Technology preferences
   - Available tools and MCPs
   - Version requirements

6. **Systematic Debugging** (`systematic-debugging/RULE.md`)
   - 4-phase debugging process
   - Root cause investigation before fixes
   - When to question architecture

7. **Test-Driven Development** (`test-driven-development/RULE.md`)
   - Red-Green-Refactor cycle
   - Write tests first, watch them fail
   - Common rationalizations to avoid

8. **Documentation Standards** (`documentation-standards/RULE.md`)
   - All structural files in English
   - Templates for commands, hooks, rules
   - Naming conventions and quality checklist

---

## Workflow Overview

```
USER                           AGENT
────                           ─────
New request         →          Analyze using plan + stack rules
                    ←          Create plan in vaults/.../plans/
Review + feedback   →          
                    ←          Polish plan (if needed)
Approve plan        →          
                    ←          Create tasks in vaults/.../tasks/
Review tasks        →          
/execute            →          
                    ←          Execute following execution rules
                    ←          Run /code-review
Test + feedback     →          
                    ←          Iterate until complete
```

---

## Commands Reference

| Command | Purpose |
|---------|---------|
| `/boot` | Initialize agent, verify setup |
| `/execute` | Run task execution workflow |
| `/run <project>` | Execute project locally |
| `/code-review` | Quality assurance checklist |
| `/commit` | Git commit with proper format |
| `/prp-new` | Create new PRP from scratch |
| `/prp-review` | Review existing PRP |

---

## Command Suggestions

When you notice repetitive patterns in our work, suggest a new command:

1. Identify the repetitive action
2. Propose the command name and purpose
3. Wait for approval
4. Create the `.md` file in `.cursor/commands/`

---

## Memory and RAG (Optional)

If using Supermemory, it stores:
- Project learnings
- Important decisions
- PRD insights
- Workflow patterns
- User preferences

**Before adding to memory**: Let me know what you want to store.

---

## Quick Boot (TL;DR)

```bash
# Verify these exist:
/vaults/
/.cursor/rules/
/.cursor/commands/

# Check MCP connections (if configured)
# Load Supermemory context (if available)
# Ready to work!
```
