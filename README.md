# Kraken 🐙

A structured AI agent framework for Cursor IDE that maximizes reliability through separation of concerns.

## 🏗️ Architecture

This system follows a **3-layer architecture** to maximize reliability:

| Layer | Location | Purpose |
|-------|----------|----------|
| **Directive** | `/vaults/<area>/projects/<project>/plans/` | SOPs and instructions in Markdown |
| **Orchestration** | AI Agent | Intelligent routing and decision-making |
| **Execution** | `/vaults/<area>/projects/<project>/execution/` | Deterministic scripts (Python, TypeScript, JavaScript) |

**Why this works 💡**: LLMs are probabilistic, but business logic requires consistency. By pushing complexity into deterministic code, the agent focuses on decision-making while execution remains reliable.

## 📁 Project Structure

```
kraken/
├── .cursor/
│   ├── commands/           # Custom commands
│   │   ├── boot.md         # Initialize agent
│   │   ├── code-review.md  # Quality checklist
│   │   ├── commit.md       # Git commit guide
│   │   ├── execute.md      # Task execution
│   │   ├── prp-new.md      # Create new PRP
│   │   └── prp-review.md   # Review existing PRP
│   ├── hooks/              # Behavioral guardrails
│   │   ├── block-dangerous-commands.md
│   │   ├── warn-debug-code.md
│   │   ├── warn-hardcoded-secrets.md
│   │   └── ... (8 hooks total)
│   └── rules/              # Operating rules
│       ├── code-simplifier/         # Code cleanup guidelines
│       ├── execution/               # How to execute tasks
│       ├── plan/                    # How to create plans
│       ├── prd/                     # PRP creation guide
│       ├── stack/                   # Technology preferences
│       ├── systematic-debugging/    # 4-phase debugging process
│       ├── task/                    # Task management
│       └── test-driven-development/ # TDD workflow
├── .tmp/                   # Temporary files (not committed)
├── vaults/                 # Workspaces
│   ├── work/
│   │   └── projects/       # Work projects
│   └── personal/
│       └── projects/       # Personal projects
├── .env                    # Environment variables (not committed)
├── .gitignore
├── AGENTS.md               # Agent operating instructions
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.x LTS
- Python >= 3.10
- Cursor IDE with MCP support
- Git

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/kraken.git
   cd kraken
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env  # If template exists
   # Edit .env with your API keys and credentials
   ```

3. **Configure MCP servers** (optional)
   - Open Cursor settings
   - Add the MCP servers you need (see [MCP Servers](#-mcp-servers))

4. **Boot the agent**
   ```
   /boot
   ```

### Commands

| Command | Purpose |
|---------|---------|
| `/boot` | Initialize agent and verify setup |
| `/execute` | Run task execution workflow |
| `/code-review` | Quality assurance checklist |
| `/commit` | Git commit with proper format |
| `/prp-new` | Create new Product Requirement Prompt |
| `/prp-review` | Review existing PRP |

## 🛠️ Tech Stack

### Languages & Frameworks
| Use Case | Technology |
|----------|------------|
| Data Analysis | Python 3.11+ |
| Web Apps | Next.js 14+ with TypeScript |
| UI Components | shadcn/ui + Tailwind CSS |
| Databases | Supabase (PostgreSQL), MongoDB |

### Recommended Versions
```
Node.js:    >= 18.x LTS (20.x recommended)
Python:     >= 3.10 (3.11+ recommended)
npm:        >= 9.x
TypeScript: >= 5.x
Next.js:    >= 14.x
```

## 🔧 MCP Servers (Optional)

Configure based on your needs. The agent can work without MCPs, but they enhance capabilities.

| Server | Purpose | Use Case |
|--------|---------|----------|
| `context7` | Library documentation | Check package safety |
| `supermemory` | Memory and context storage | Store/retrieve learnings |
| `github` | Repository management | Commits, PRs, branches |
| `linear` | Issue tracking | Project management |
| `notion` | Documentation | Meeting notes, docs |
| `supabase` | Database management | Tables, auth, storage |

### MCP Modes

The agent supports different modes to optimize context usage:

| Mode | MCPs Active | Use Case |
|------|-------------|----------|
| `minimal` | None | Simple conversations |
| `dev` | context7, semgrep, shadcn | Development |
| `infra` | Railway, supabase, github | Deploy/Infra |
| `pm` | Linear, Notion, Slack, supermemory | Product Management |
| `full` | All | When you need everything |

## 📋 Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                         WORKFLOW                                 │
├─────────────────────────────────────────────────────────────────┤
│  USER                              AGENT                        │
│  ────                              ─────                        │
│  New request              →        Analyze (plan + stack rules) │
│                           ←        Create plan in vaults/.../plans/ │
│  Review + feedback        →                                     │
│                           ←        Polish plan (if needed)      │
│  Approve plan             →                                     │
│                           ←        Create tasks in vaults/.../tasks/ │
│  Review tasks             →                                     │
│  /execute                 →                                     │
│                           ←        Execute + /code-review       │
│  Test + feedback          →                                     │
│                           ←        Iterate until complete       │
└─────────────────────────────────────────────────────────────────┘
```

## 🧠 Memory System (Optional)

If using Supermemory MCP, the agent can store:
- Project learnings and decisions
- PRD/PRP insights
- Workflow patterns
- Error resolutions

**Tip**: Always check memory before starting work to avoid repeated errors.

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [AGENTS.md](./AGENTS.md) | Agent operating instructions |
| [Plan Rules](./.cursor/rules/plan/RULE.md) | How to create plans |
| [Task Rules](./.cursor/rules/task/RULE.md) | Task creation and management |
| [Execution Rules](./.cursor/rules/execution/RULE.md) | How to execute tasks |
| [PRD Rules](./.cursor/rules/prd/RULE.md) | PRP creation guide |
| [Stack Rules](./.cursor/rules/stack/RULE.md) | Technology preferences |
| [Debugging Rules](./.cursor/rules/systematic-debugging/RULE.md) | 4-phase debugging process |
| [TDD Rules](./.cursor/rules/test-driven-development/RULE.md) | Test-driven development |
| [Code Simplifier](./.cursor/rules/code-simplifier/RULE.md) | Code cleanup guidelines |
| [Hooks](./.cursor/hooks/README.md) | Behavioral guardrails |

## 🎯 Operating Principles

1. **Check for tools first** - Reuse existing scripts before creating new ones
2. **Self-anneal** - Learn from errors and update directives
3. **Update directives** - Living documents that improve over time
4. **KISS** - Keep solutions simple and focused
5. **YAGNI** - Don't build for hypothetical future needs
6. **DRY** - Don't repeat yourself
7. **TDD** - Write tests first, watch them fail, then implement
8. **Systematic debugging** - Find root cause before fixing

## 🤝 Getting Started with Projects

1. Create a project folder in `/vaults/<area>/projects/<project-name>/`
2. Add subfolders: `plans/`, `tasks/`, `execution/`, `project/`
3. Create your first plan in `plans/`
4. Run `/execute` to start working

### Example Project Structure

```
vaults/
└── work/
    └── projects/
        └── my-app/
            ├── plans/
            │   └── 001 - Initial Setup - 2026-01-13.md
            ├── tasks/
            │   └── my-app/
            │       ├── 000 - Setup project.md
            │       └── 001 - Implement feature.md
            ├── execution/
            │   └── scripts/
            └── project/
                └── src/
```

## 📄 License

MIT License - Feel free to use, modify, and distribute.

---

**Built with 🐙 for AI-assisted development**
