# 🦑 Kraken

> **Release the Kraken!** — Unleash reliable AI agents with a battle-tested 3-layer architecture.

Stop letting your AI agent run wild. Kraken brings order to chaos with a proven framework that separates what to do, how to decide, and how to execute.

---

## Why Kraken?

LLMs are probabilistic. Your business logic shouldn't be.

```
90% accuracy per step = 59% success over 5 steps
80% accuracy per step = 33% success over 5 steps
```

**The solution?** Push complexity into deterministic code. Let the AI focus on decisions, not execution.

---

## 🏗️ The 3-Layer Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  LAYER 1: DIRECTIVE (What to do)                            │
│  Location: /vaults/<area>/projects/<project>/plans/          │
│  Content: SOPs in Markdown - goals, inputs, tools, outputs  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  LAYER 2: ORCHESTRATION (Decision making)                   │
│  Actor: AI Agent                                            │
│  Role: Read directives, call tools, handle errors, learn    │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  LAYER 3: EXECUTION (Doing the work)                        │
│  Location: /vaults/<area>/projects/<project>/execution/      │
│  Content: Deterministic scripts (Python, TypeScript, JS)    │
└─────────────────────────────────────────────────────────────┘
```

| Layer | What it does | Who owns it |
|-------|--------------|-------------|
| **Directive** | Defines goals and instructions | You (in Markdown) |
| **Orchestration** | Makes decisions, routes work | AI Agent |
| **Execution** | Runs deterministic code | Scripts you control |

---

## 📁 Project Structure

```
kraken/
├── .cursor/                # Cursor IDE configuration
│   ├── commands/           # Custom slash commands (10)
│   ├── hooks/              # Behavioral guardrails (10)
│   ├── rules/              # Operating rules (11)
│   └── skills/             # Detailed procedural skills (13)
├── .claude/                # Claude Code configuration
│   ├── commands/           # Slash commands (10)
│   ├── agents/             # Subagent definitions (5)
│   └── settings.json       # Permissions and hooks
├── CLAUDE.md               # Claude Code root instructions
├── AGENTS.md               # Cursor root instructions
├── context/                # Dynamic context storage
│   ├── mcp/                # Long MCP responses
│   ├── history/            # Session persistence
│   └── terminal/           # Execution logs
├── vaults/                 # Your workspaces
│   ├── AGENTS.md           # Vault-level instructions
│   ├── work/
│   │   ├── projects/       # Full initiatives
│   │   ├── data/           # Data pipelines and reports
│   │   └── apps/           # Deployable services
│   └── personal/projects/  # Personal projects
├── .gitignore
├── AGENTS.md               # Root agent instructions
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites

- [Cursor IDE](https://cursor.sh) and/or [Claude Code](https://docs.anthropic.com/en/docs/claude-code) CLI
- Node.js >= 18.x LTS
- Python >= 3.10
- Git

### Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/luisabwk/kraken.git
   cd kraken
   ```

2. **Configure your environment**
   ```bash
   cp .env.example .env  # If needed
   # Add your API keys
   ```

3. **Release the Kraken!**
   ```
   /boot
   ```

---

## 🎮 Commands

| Command | What it does |
|---------|--------------|
| `/boot` | Initialize agent, verify setup |
| `/execute` | Run task execution workflow |
| `/code-review` | Quality assurance checklist |
| `/commit` | Git commit with proper format |
| `/prp-new` | Create Product Requirement Prompt |
| `/prp-review` | Review existing PRP |
| `/mcp` | Switch MCP modes (minimal/dev/full) |
| `/run` | Execute specific scripts |
| `/context` | Manage dynamic context (status/clean/log) |
| `/clean` | Repository hygiene and maintenance |

---

## 🛡️ Hooks (Guardrails)

Kraken includes behavioral hooks that prevent common mistakes:

| Hook | What it catches |
|------|-----------------|
| `block-dangerous-commands` | `rm -rf`, `DROP TABLE`, etc. |
| `warn-debug-code` | `console.log`, `debugger`, `print()` |
| `warn-hardcoded-secrets` | API keys, passwords in code |
| `warn-large-files` | Files > 500 lines |
| `warn-any-type` | TypeScript `any` usage |
| `require-tests` | Missing test files |
| `warn-env-commit` | `.env` files being committed |
| `warn-todo-comments` | Unresolved TODOs |
| `warn-long-output` | Command output > 50 lines (context bloat) |

---

## 🧠 Self-Annealing

Kraken gets smarter over time:

```
Error occurs
    ↓
Fix the issue
    ↓
Update the tool
    ↓
Test the tool
    ↓
Update directive
    ↓
System is now stronger
```

When something breaks, the agent learns and updates the directives so it doesn't happen again.

---

## 📦 Dynamic Context Management

LLM context windows fill up fast. Kraken includes a built-in system to manage this:

- **Long outputs** (>50 lines) are saved to `context/` instead of cluttering chat
- **Session history** persists decisions across auto-compaction
- **Terminal logs** are redirected for selective retrieval

```
/context status   → See usage
/context clean    → Remove old files
/context log      → Record a decision
```

See `.cursor/rules/dynamic-context/RULE.md` for the full system.

---

## 📋 Creating a New Project

```bash
# Create project structure
mkdir -p vaults/work/projects/my-project/{plans,tasks,execution,project}

# Add project-specific AGENTS.md
touch vaults/work/projects/my-project/AGENTS.md
```

Then create your first plan in `plans/` and let the Kraken take it from there.

### Vault Categories

| Category | Path | Use for |
|----------|------|---------|
| **projects/** | `vaults/<area>/projects/` | Full initiatives with plans, tasks, execution |
| **data/** | `vaults/<area>/data/` | Data pipelines, reports, datasets |
| **apps/** | `vaults/<area>/apps/` | Deployable apps and services |

---

## 🧩 Skills

Skills are detailed procedural guides that extend the agent's capabilities. While rules provide short, always-on guardrails, skills provide in-depth workflows loaded on-demand.

| Skill | What it does |
|-------|--------------|
| `code-simplifier` | Simplify and refine code after implementation |
| `documentation-standards` | Ensure consistent structural docs |
| `dynamic-context` | Manage context window efficiently |
| `execution` | Step-by-step task execution workflow |
| `memory-awareness` | Proactive memory usage across sessions |
| `mcp-modes` | Optimize which MCPs to use |
| `plan` | Create structured project plans |
| `prd` | Create PRPs and break into tasks |
| `skill-creator` | Create new skills (meta-skill) |
| `stack` | Technology choices and setup |
| `systematic-debugging` | Find root cause before fixing |
| `task` | Create and manage task files |
| `test-driven-development` | Red → Green → Refactor cycle |

### Creating New Skills

Use the `skill-creator` skill to create your own:
```bash
python3 .cursor/skills/skill-creator/scripts/init_skill.py my-skill --path .cursor/skills/
```

---

## 🎯 Operating Principles

1. **Check for tools first** — Reuse before creating
2. **Self-anneal** — Learn from errors, update directives
3. **KISS** — Keep It Simple, Stupid
4. **YAGNI** — You Ain't Gonna Need It
5. **DRY** — Don't Repeat Yourself
6. **TDD** — Red → Green → Refactor
7. **Systematic debugging** — Find root cause first
8. **Manage context** — Offload verbose data, retrieve selectively

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [AGENTS.md](./AGENTS.md) | Root agent instructions |
| [vaults/AGENTS.md](./vaults/AGENTS.md) | Vault structure & MCP modes |
| [context/README.md](./context/README.md) | Dynamic context system |
| [.cursor/hooks/README.md](./.cursor/hooks/README.md) | Hook documentation |
| [.cursor/skills/](./.cursor/skills/) | Skill library (Cursor) |
| [CLAUDE.md](./CLAUDE.md) | Claude Code root instructions |
| [.claude/agents/](./.claude/agents/) | Subagent library (Claude Code) |

---

## 🔄 Dual Compatibility: Cursor + Claude Code

Kraken supports **both Cursor IDE and Claude Code** out of the box:

| Feature | Cursor | Claude Code |
|---------|--------|-------------|
| Root instructions | `AGENTS.md` | `CLAUDE.md` |
| Vault instructions | `vaults/AGENTS.md` | `vaults/CLAUDE.md` |
| Slash commands | `.cursor/commands/` | `.claude/commands/` |
| Behavioral hooks | `.cursor/hooks/` (markdown) | `.claude/settings.json` (shell) |
| Rules/Skills | `.cursor/rules/` + `.cursor/skills/` | Consolidated in `CLAUDE.md` |
| Subagents | `.cursor/skills/` (on-demand) | `.claude/agents/` (persistent) |
| Permissions | Via IDE settings | `.claude/settings.json` |

Both configurations share the same project structure (`vaults/`, `context/`), plans, tasks, and execution scripts. Switch between tools seamlessly.

### Claude Code Subagents

| Agent | Purpose |
|-------|---------|
| `code-reviewer` | Confidence-based code review |
| `debugger` | Systematic root cause analysis |
| `prd-creator` | PRP creation and task decomposition |
| `code-simplifier` | Post-implementation code cleanup |
| `tdd-coach` | Test-driven development guidance |

---

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch
3. Follow the 3-layer architecture
4. Run `/code-review` before submitting
5. Use `/commit` for proper commit messages

---

## 📜 License

MIT — Go wild. Release your Kraken. 🦑

---

<p align="center">
  <strong>🦑 Release the Kraken!</strong><br>
  <em>Tame the chaos. Ship with confidence.</em>
</p>
