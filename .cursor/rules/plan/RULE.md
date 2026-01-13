---
description: "Use when starting a new project, creating implementation plans, or changing context between projects"
alwaysApply: false
---

# Plan Rules

> Use this rule when creating plans for projects and tasks.

## When to Create a Plan

Create a plan when:
- Starting a new project or feature
- Changing context to a different project
- Breaking down a complex request
- A project requires multiple steps

**Note**: A project can have multiple plans for different phases or features.

## Basic Principles

Always write a plan by decomposing the request into **no more than 10 objective steps**.

### Self-Assessment Questions

Before writing a plan, ask yourself:

```
1. What is the goal of this request?
2. What are the logical steps to achieve that?
3. Does this request have dependencies not specified by the user?
4. Is there any MCP, rule, or tool related to this request?
5. Do I have all the data needed to proceed? If not, ask the user.
```

## Frameworks

Apply these principles to every plan:

### K.I.S.S. (Keep It Simple, Stupid)
- Don't overcomplicate solutions
- Use clear names for methods, variables, and functions
- Apply single responsibility principle
- Keep code organized and objective
- If a file exceeds 500 lines, split it

### Y.A.G.N.I. (You Aren't Gonna Need It)
- Don't add features "for the future"
- If it's not needed now, don't create it
- Build for current requirements only
- Leave future concerns to future selves

### D.R.Y. (Don't Repeat Yourself)
- Never duplicate code
- Reuse existing components and modules
- Build reusable structures
- Changes should happen in one place

## Plan Structure

Save plans as markdown files in `/vaults/<area>/projects/<project>/plans/` with this naming convention:

```
[ID] - [Project Title] - [Date].md

Examples:
001 - Email Template Preview - 2024-01-15.md
002 - API Rate Limiter - 2024-01-20.md
```

### Plan Template

```markdown
# [ID] - [Project Title]

**Created**: YYYY-MM-DD
**Status**: Draft | In Progress | Completed

## 1. Objective

[2-3 sentences describing what we're trying to achieve and why]

## 2. Resources Needed

### Tools & Technologies
- [Tool/framework 1]
- [Tool/framework 2]

### MCPs
- [ ] [MCP name] - [purpose]

### External Dependencies
- [API, service, or data source]

### Permissions
- [Any access or credentials needed]

## 3. Constraints

- **Timeline**: [deadline or "flexible"]
- **Technical**: [limitations, requirements]
- **Quality**: [standards to maintain]
- **Scope**: [what's explicitly out of scope]

## 4. Milestones

### Milestone 1: [Foundation/Setup]
Goal: [What this milestone delivers]
Tasks: 000-002

### Milestone 2: [Core Features]
Goal: [What this milestone delivers]
Tasks: 003-005

### Milestone 3: [Polish/Deploy]
Goal: [What this milestone delivers]
Tasks: 006-008

## 5. Tasks

### Milestone 1: Foundation
- [ ] 000 - [Task title]
- [ ] 001 - [Task title]
- [ ] 002 - [Task title]

### Milestone 2: Core Features
- [ ] 003 - [Task title]
- [ ] 004 - [Task title]

### Milestone 3: Polish
- [ ] 005 - [Task title]
- [ ] 006 - [Task title]

## 6. Notes

[Decisions made, open questions, risks identified]
```

## Complete Example

```markdown
# 001 - Email Template Preview System - 2024-01-15

**Created**: 2024-01-15
**Status**: In Progress

## 1. Objective

Build a preview system for HTML email templates that combines a template file 
containing {{variables}} with a JSON file containing the values for those 
variables. The system should render a live preview in the browser.

## 2. Resources Needed

### Tools & Technologies
- TypeScript + Next.js (frontend + API)
- shadcn/ui for components
- Tailwind CSS for styling

### MCPs
- [x] context7 - Check library versions
- [ ] github - Sync and commit

### External Dependencies
- None (local files only)

### Permissions
- File system read access for templates

## 3. Constraints

- **Timeline**: 2 days
- **Technical**: Must work with existing HTML templates
- **Quality**: Must handle missing variables gracefully
- **Scope**: Preview only, no email sending functionality

## 4. Milestones

### Milestone 1: Foundation
Goal: Project setup and file handling
Tasks: 000-001

### Milestone 2: Core Features
Goal: Variable extraction and substitution
Tasks: 002-003

### Milestone 3: UI & Polish
Goal: Preview interface and error handling
Tasks: 004-005

## 5. Tasks

### Milestone 1: Foundation
- [x] 000 - Setup Next.js project with TypeScript and shadcn
- [x] 001 - Create file loader for templates and JSON data

### Milestone 2: Core Features
- [ ] 002 - Implement variable extraction from templates *(In process)*
- [ ] 003 - Build variable substitution engine

### Milestone 3: UI & Polish
- [ ] 004 - Create preview UI with split view
- [ ] 005 - Add error handling and validation

## 6. Notes

- **2024-01-15**: Decided to use regex for variable extraction
- **2024-01-15**: Found existing templates use {{variable}} syntax
- Risk: Some templates may have nested variables - need to test
```

## Red Flags - Plan Needs Revision

Stop and revise the plan if:

- Objective is vague or has multiple interpretations
- More than 10 tasks are needed (split into multiple plans)
- Tasks are too large (> 8 hours each)
- Dependencies are unclear or circular
- No clear success criteria
- Scope keeps expanding (YAGNI violation)

## Task Management in Plans

### Task List Format

```markdown
## 5. Tasks

### [Milestone Name]
- [x] 000 - Completed task title
- [ ] 001 - Pending task title *(In process)*
- [ ] 002 - Pending task title
```

### Status Indicators

| Symbol | Meaning |
|--------|----------|
| `[x]` | Completed |
| `[ ]` | Pending or In Progress |
| `*(In process)*` | Currently being worked on |
| `[-]` | Canceled |

### Updating Progress

When working on tasks:
1. Mark current task with `*(In process)*`
2. Check off completed tasks `[x]`
3. Update the corresponding task file in `/vaults/<area>/projects/<project>/tasks/`

## Linking Plans to Tasks

Each task in the plan should have a corresponding file in `/vaults/<area>/projects/<project>/tasks/`:

```
Plan: /vaults/work/projects/email-templates/plans/001 - Email Template Preview - 2024-01-15.md
      └── Task: 002 - Implement variable extraction

Task File: /vaults/work/projects/email-templates/tasks/email-template-preview/002 - Implement variable extraction.md
```

## Plan Review Checklist

Before finalizing a plan:

- [ ] Objective is clear and measurable
- [ ] Resources are identified and available
- [ ] Constraints are documented
- [ ] Milestones have clear goals
- [ ] Tasks are small enough (< 8 hours each)
- [ ] Dependencies between tasks are noted
- [ ] No scope creep (YAGNI applied)
