# Vaults Directory Instructions

This directory contains **separated workspaces** (e.g. `work`, `personal`) and each workspace contains multiple projects.

## Directory Structure

```
vaults/
└── <area>/
    ├── projects/     # Full initiatives (plans, tasks, execution, deliverables)
    │   └── <project>/
    │       ├── plans/       # Plans and PRPs
    │       ├── tasks/       # Task breakdowns and notes
    │       ├── execution/   # Deterministic scripts (tools)
    │       ├── project/     # Code, assets, datasets, outputs
    │       └── service/     # Optional: app code when project is a deployable service
    ├── data/         # Data pipelines, reports (execution + project outputs; optional plans)
    │   └── <name>/
    │       ├── execution/
    │       └── project/
    └── apps/         # Deployable apps and small services (may use service/ and/or execution/)
        └── <name>/
```

**Project convention**: Any folder with `execution/` should have at least `plans/`, `tasks/`, or a README explaining the scripts.

### When to Use Each Category

| Under `vaults/<area>/` | Use for | Typical structure |
|------------------------|---------|-------------------|
| **projects/** | Full initiatives with plans, tasks, execution, and deliverables | `plans/`, `tasks/`, `execution/`, `project/` |
| **data/** | Data pipelines, reports, and scripts that produce datasets | `execution/`, `project/`, optional `plans/` |
| **apps/** | Deployable apps and small services | App code + optional `execution/`, `plans/` |

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

```bash
mkdir -p vaults/<area>/projects/<name>/{plans,tasks,execution,project}
```

## MCP Modes

Each project can define an MCP mode to optimize context window usage.

| Mode | Active MCPs | Use Case |
|------|-------------|----------|
| `minimal` | None | Simple conversations |
| `dev` | Documentation + database MCPs | Development |
| `infra` | Infrastructure + database MCPs | Deploy/Infra |
| `pm` | Project management MCPs | Product Management |
| `full` | All | When you need everything |

Configure modes in the project's directory-level `CLAUDE.md` or `AGENTS.md`.
