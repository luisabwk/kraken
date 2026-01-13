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
├── .cursor/
│   ├── commands/           # Custom slash commands
│   │   ├── boot.md         # /boot - Initialize agent
│   │   ├── code-review.md  # /code-review - Quality checklist
│   │   ├── commit.md       # /commit - Proper git commits
│   │   ├── execute.md      # /execute - Run tasks
│   │   ├── mcp.md          # /mcp - Manage MCP modes
│   │   ├── prp-new.md      # /prp-new - Create PRPs
│   │   ├── prp-review.md   # /prp-review - Review PRPs
│   │   └── run.md          # /run - Execute scripts
│   ├── hooks/              # Behavioral guardrails
│   │   ├── block-dangerous-commands.md
│   │   ├── warn-debug-code.md
│   │   ├── warn-hardcoded-secrets.md
│   │   └── ... (9 hooks total)
│   └── rules/              # Operating rules
│       ├── plan/           # How to create plans
│       ├── task/           # Task management
│       ├── execution/      # How to execute
│       ├── prd/            # PRP creation guide
│       ├── stack/          # Tech preferences
│       ├── mcp-modes/      # MCP optimization
│       ├── code-simplifier/
│       ├── systematic-debugging/
│       ├── test-driven-development/
│       └── documentation-standards/
├── vaults/                 # Your workspaces
│   ├── AGENTS.md           # Vault-level instructions
│   ├── work/projects/      # Work projects
│   └── personal/projects/  # Personal projects
├── .gitignore
├── AGENTS.md               # Root agent instructions
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites

- [Cursor IDE](https://cursor.sh) with MCP support
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

## 📋 Creating a New Project

```bash
# Create project structure
mkdir -p vaults/work/projects/my-project/{plans,tasks,execution,project}

# Add project-specific AGENTS.md
touch vaults/work/projects/my-project/AGENTS.md
```

Then create your first plan in `plans/` and let the Kraken take it from there.

---

## 🎯 Operating Principles

1. **Check for tools first** — Reuse before creating
2. **Self-anneal** — Learn from errors, update directives
3. **KISS** — Keep It Simple, Stupid
4. **YAGNI** — You Ain't Gonna Need It
5. **DRY** — Don't Repeat Yourself
6. **TDD** — Red → Green → Refactor
7. **Systematic debugging** — Find root cause first

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [AGENTS.md](./AGENTS.md) | Root agent instructions |
| [vaults/AGENTS.md](./vaults/AGENTS.md) | MCP modes & vault rules |
| [.cursor/hooks/README.md](./.cursor/hooks/README.md) | Hook documentation |

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
