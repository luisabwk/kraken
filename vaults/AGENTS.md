# Vaults Directory Instructions

This directory contains **separated workspaces** (e.g. `work`, `personal`) and each workspace contains multiple projects.

## Directory Structure

```
vaults/
└── <area>/
    └── projects/
        └── <project>/
            ├── plans/       # Plans and PRPs
            ├── tasks/       # Task breakdowns and notes
            ├── execution/   # Deterministic scripts (tools)
            └── project/     # Code, assets, datasets, outputs
```

## General Rules

1. **One folder per project**: keep plans/tasks/execution scoped to the project.
2. **No secrets committed**: keep `.env` files inside the project folder, never commit them.
3. **Keep templates close to apps**: if a project needs local assets (like email templates), store them under `project/`.
4. **Document decisions where they happen**: update the plan and the relevant task notes.

## Creating a New Project

1. Create the folder at `vaults/<area>/projects/<project>/`.
2. Add subfolders: `plans/`, `tasks/`, `execution/`, `project/`.
3. Initialize dependencies inside `project/` (e.g. `package.json`, `requirements.txt`).
4. Create your plan inside `plans/`.
5. **Define MCP Mode** in the project's `AGENTS.md`.

## MCP Modes

Each project can define an MCP mode in its `AGENTS.md` to optimize context window usage.

| Mode | Active MCPs | Use Case |
|------|-------------|----------|
| `minimal` | None | Simple conversations |
| `dev` | context7, semgrep, shadcn | Development |
| `infra` | Railway, supabase, github | Deploy/Infra |
| `pm` | Linear, Notion, Slack, supermemory | Product Management |
| `full` | All | When you need everything |

### How to Use

Add to the project's `AGENTS.md`:

```markdown
### MCP Mode: `dev`
This project uses **dev** mode by default.
```

Or switch modes during a session: `/mcp [mode]`

See full rule at: `.cursor/rules/mcp-modes/RULE.md`
