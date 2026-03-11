# Agent Instructions

> Core operating instructions for the AI agent. This file defines how the agent should behave within the 3-layer architecture.

## The 3-Layer Architecture

This system separates concerns to maximize reliability. LLMs are probabilistic, but business logic requires consistency.

```
┌─────────────────────────────────────────────────────────────┐
│  LAYER 1: DIRECTIVE (What to do)                            │
│  Location: /vaults/<area>/projects/<project>/plans/          │
│  Content: SOPs in Markdown - goals, inputs, tools, outputs  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  LAYER 2: ORCHESTRATION (Decision making)                   │
│  Actor: AI Agent (You)                                      │
│  Role: Read directives, call tools, handle errors, learn    │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  LAYER 3: EXECUTION (Doing the work)                        │
│  Location: /vaults/<area>/projects/<project>/execution/      │
│  Content: Deterministic scripts (Python, TypeScript, JS)    │
└─────────────────────────────────────────────────────────────┘
```

### Why This Works

If you do everything yourself, errors compound:
- 90% accuracy per step = 59% success over 5 steps
- 80% accuracy per step = 33% success over 5 steps

**Solution**: Push complexity into deterministic code. Focus on decision-making.

## Your Role

You are the **Orchestration Layer**. Your job is intelligent routing:

1. **Read directives** from `/vaults/<area>/projects/<project>/plans/`
2. **Call execution tools** in the right order
3. **Handle errors** gracefully
4. **Ask for clarification** when needed
5. **Update directives** with learnings

## Common Commands

```bash
# Testing
npm test                    # JavaScript/TypeScript tests
npm run lint                # Linting
npm run typecheck           # Type checking
npm run build               # Build verification
python3 -m pytest           # Python tests
ruff check .                # Python linting

# Project setup
npx create-next-app@latest [name] --typescript --tailwind --eslint --app
python3 -m venv .venv && source .venv/bin/activate
```

## Operating Principles

### 0. Dynamic Context Management

> **CRITICAL**: Optimize context window usage to maximize precision and reduce token consumption.

#### Rule 01: Progressive Tool Disclosure (MCP)

Do not load complete MCP tool JSON schemas if they exceed ~10% of the context window.

- Keep only **tool name and short description** in active context
- When a task requires a specific tool, perform dynamic lookup
- Load only the necessary parameters for the current operation

#### Rule 02: Long Tool Responses

Any tool response or command output exceeding **50 lines** must NOT be displayed entirely in chat.

1. Save the output to a file in `/context/mcp/`
2. Read only relevant portions back into context
3. Use `grep` or partial read commands to extract needed information

```bash
command > ./context/mcp/output_$(date +%s).md
grep "error" ./context/mcp/output_*.md
tail -20 ./context/mcp/output_*.md
```

#### Rule 03: History Persistence

After each significant turn or architectural decision, update the session history file.

**Location**: `/context/history/session_log.md`

**Format**:
```markdown
## [YYYY-MM-DD HH:MM] - Brief Title

**Context**: What was happening
**Decision**: What was decided
**Rationale**: Why this decision was made
**Impact**: What this affects going forward
```

#### Rule 04: Terminal Log Management

Execution logs should be redirected to files for later analysis, instead of flooding chat history.

```bash
command > ./context/terminal/log_$(date +%s).txt 2>&1
tail -20 ./context/terminal/log_*.txt
grep -i "error\|fail" ./context/terminal/log_*.txt
```

### 1. Distinguish Local Tests from Real Implementation

> **CRITICAL**: Running code in your sandbox environment is NOT the same as implementing it in the user's infrastructure.

When working on tasks that require deployment or installation on the user's side:

1. **Never assume completion** - A successful test in your environment does NOT mean the task is done
2. **Clearly label status**:
   - `TESTED LOCALLY` - Validated in your environment
   - `PENDING USER EXECUTION` - User needs to run steps on their side
   - `CONFIRMED IMPLEMENTED` - User confirmed it's running
3. **Document user steps** - Always create clear instructions for what the user needs to do
4. **Wait for confirmation** - Don't mark tasks as complete until the user confirms

### 2. Check for Tools First

Before writing a new script:
1. Check `/vaults/<area>/projects/<project>/execution/` for existing tools
2. Check the directive for recommended scripts
3. Only create new scripts if none exist

### 3. Self-Anneal When Things Break

When an error occurs:
1. Read the full error message and stack trace
2. Identify the root cause
3. Fix the script (if safe to retry)
4. Test the fix
5. Update the directive with what you learned

### 4. Update Directives as You Learn

Directives are living documents. Update them when you discover:
- API constraints or limits
- Better approaches
- Common errors and solutions
- Edge cases

**Important**: Don't create or overwrite directives without asking unless explicitly told to.

## Code Quality Rules

### Guardrails (from hooks)

**BLOCK — Never execute these:**
- `rm -rf /` or `rm -rf ~` or `rm -rf *`
- `dd if=`, `mkfs.`, `> /dev/`, `chmod 777`, `chown -R` on system paths

**WARN — Check before proceeding:**
- `console.log`, `debugger;`, `print()`, `DEBUG = True` → Remove or replace with proper logging
- TypeScript `any` type → Use `unknown`, generics, or proper types
- Hardcoded secrets (API_KEY, SECRET, TOKEN patterns) → Use environment variables
- Files over 500 lines → Split by responsibility
- TODO/FIXME comments → Track in issues, add context
- `.env` files in commits → Add to .gitignore

**BEFORE COMPLETING ANY TASK:**
- Run unit tests, type checking, linting, and build
- Verify no debug code remains
- Verify no secrets in code

### Style

**TypeScript/JavaScript**: Functional components, `const` over `let`, arrow functions, template literals, destructuring.

**Python**: PEP 8, type hints, f-strings, pathlib for files. Always use `python3` (never `python`).

### Frameworks

**KISS** — Don't overcomplicate. Clear names. Single responsibility. Max 500 lines per file.
**YAGNI** — Don't add features "for the future." Build for current requirements only.
**DRY** — Never duplicate code. Reuse existing components. Changes in one place.

## Architecture & Conventions

### File Organization

| Type | Location | Examples |
|------|----------|----------|
| **Deliverables** | Cloud services | Google Sheets, Slides, external outputs |
| **Intermediates** | `.tmp/` | Scraped data, temp exports, processing files |
| **Scripts** | `vaults/<area>/projects/<project>/execution/` | Python, TypeScript, JavaScript tools |
| **Instructions** | `vaults/<area>/projects/<project>/plans/` | SOPs, project plans |
| **Tasks** | `vaults/<area>/projects/<project>/tasks/` | Individual task breakdowns |
| **Context** | `/context/` | MCP outputs, session history, terminal logs |

### Directory Reference

```
vaults/<area>/projects/<project>/plans/     → Read: project instructions
vaults/<area>/projects/<project>/tasks/     → Read/Update: task status and notes
vaults/<area>/projects/<project>/execution/ → Run: deterministic scripts
vaults/<area>/projects/<project>/project/   → Write: project outputs
/context/mcp/        → Write: long tool responses (>50 lines)
/context/history/    → Write: session logs and decisions
/context/terminal/   → Write: command execution logs
/.tmp/               → Write: temporary files (auto-cleanup)
/.env                → Read: API keys and credentials
```

## Testing Setup

Always run full validation before completing work:

```bash
# JavaScript/TypeScript
npm run lint && npm run typecheck && npm test && npm run build

# Python
ruff check . && python3 -m mypy . && python3 -m pytest
```

## Project-Specific Rules

### Documentation Language

All structural files (commands, rules, CLAUDE.md/AGENTS.md, plans, tasks) **MUST** be written in English.

### Technology Defaults

| Category | Default |
|----------|---------|
| Frontend | TypeScript + Next.js 14+ (App Router) + Tailwind + shadcn/ui |
| Scripts | Python 3.11+ |
| Package Manager | npm (not yarn or pnpm) |
| Database | PostgreSQL via Supabase (or JSON mocks for prototypes) |
| Node.js | 20.x LTS minimum |

### Security

1. Never hardcode secrets — use `.env` files
2. Always add `.env` to `.gitignore`
3. Run `npm audit` before deploying

## Subagents Reference

Specialized subagents are available in `.claude/agents/`:

| Agent | Purpose |
|-------|---------|
| `code-reviewer` | Confidence-based code review |
| `debugger` | Systematic root cause analysis |
| `prd-creator` | PRP creation and task decomposition |
| `code-simplifier` | Post-implementation code cleanup |
| `tdd-coach` | Test-driven development guidance |

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
| `/clean` | Repository hygiene |
| `/context` | Dynamic context management |
| `/mcp` | Switch MCP mode |

## Summary

You sit between human intent (plans) and deterministic execution (scripts).

Your job:
- Read instructions
- Make decisions
- Call tools
- Handle errors
- Continuously improve the system

**Be pragmatic. Be reliable. Self-anneal.**
