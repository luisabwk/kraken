---
description: "Use when creating, updating, or managing task files for projects and plans"
alwaysApply: false
---

# Task Writing and Management

> Use this rule when creating or managing tasks for plans.

## Overview

Tasks are the atomic units of work derived from plans. They live in `/vaults/<area>/projects/<project>/tasks/` and are tracked in the plan's task list.

## Directory Structure

```
/vaults/<area>/projects/<project>/tasks/
└── [task-group-or-plan-name]/ (optional)
    ├── 000 - First task title.md
    ├── 001 - Second task title.md
    └── 002 - Third task title.md
```

**Important**: Always create a new folder for each plan/project.

## Task Origin

Tasks are derived from the markdown files in `/vaults/<area>/projects/<project>/plans/`. The plan contains:
- SOPs and directives
- Milestones that group tasks
- The task list (section 5)

After creating tasks, update the plan's task list section.

## Task File Naming

Use this template for task file names:

```
[ID] - [Clear objective title].md

Examples:
000 - Setup project structure and dependencies.md
001 - Implement variable extraction from templates.md
002 - Create HTML preview renderer.md
```

Rules:
- ID is 3-digit, zero-padded (000, 001, 002...)
- Title is objective but not too long (< 60 characters)
- Use sentence case
- End with `.md`

## Task Content Structure

Every task file must contain:

```markdown
# [ID] - [Task Title]

## 1. Status
**To do** | In process | Done | Canceled

## 2. Goal
[1-2 sentences describing what this task delivers]

## 3. Rules and Constraints
- [Mandatory requirement 1]
- [Mandatory requirement 2]
- [Things to avoid]

## 4. Steps
- [ ] Step 1: [Specific action]
- [ ] Step 2: [Specific action]
- [ ] Step 3: [Specific action]

## 5. Notes
[Links, decisions, documentation, learnings, blockers]

---
**Created**: YYYY-MM-DD
**Completed**: YYYY-MM-DD (when done)
```

## Complete Task Example

```markdown
# 001 - Implement variable extraction from templates

## 1. Status
**In process** ← Currently working on this

## 2. Goal
Create a function that identifies and extracts all {{variable}} placeholders from HTML templates, returning a list of unique variable names.

## 3. Rules and Constraints
- Use regex pattern `/\{\{(\w+)\}\}/g` for extraction
- Return unique variables only (no duplicates)
- Handle nested variables gracefully
- Do not modify the original template
- Function must be pure (no side effects)

## 4. Steps
- [x] Create `extractVariables(template: string): string[]` function
- [x] Implement regex pattern matching
- [ ] Add deduplication logic
- [ ] Write unit tests
- [ ] Add JSDoc documentation

## 5. Notes
- **2024-01-15**: Started implementation, regex working
- **2024-01-15**: Found edge case with spaces inside braces, added trim
- Reference: [MDN Regex Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)

---
**Created**: 2024-01-15
**Completed**: -
```

## Task Statuses

| Status | Description | Plan Checkbox |
|--------|-------------|--------------|
| **To do** | In backlog, not started | `[ ]` unchecked |
| **In process** | Currently being worked on | `[ ]` unchecked |
| **Done** | Completed and verified | `[x]` checked |
| **Canceled** | No longer needed | `[-]` or removed |

### Status Rules
- Only ONE task should be "In process" at a time
- Always update status in BOTH the task file AND the plan
- Mark as "Done" only after validation passes

## Task Complexity Guidelines

Tasks should be small enough to complete in a single session:

| Complexity | Time Estimate | Action |
|------------|---------------|---------|
| Small | < 2 hours | Single task |
| Medium | 2-4 hours | Single task |
| Large | 4-8 hours | Consider splitting |
| Too Large | > 8 hours | **Must split** |

### When to Split a Task

Split when:
- Task has more than 7-10 steps
- Task spans multiple systems/files
- Task has unclear scope
- Task keeps growing during execution

How to split:
1. Identify natural boundaries
2. Create new task files
3. Update plan's task list
4. Add dependencies between tasks

## Red Flags - STOP and Reassess

If you notice any of these, stop and split the task:

- Task description is vague or has multiple interpretations
- You're adding "just one more step" repeatedly
- Task touches more than 5 files
- Estimated time keeps increasing
- You can't explain the goal in one sentence

## Updating Tasks

### Starting Work
1. Update status to "In process" in task file
2. Keep plan's checkbox unchecked

### During Work
- Check off completed steps
- Add notes for decisions/learnings
- Document blockers immediately

### Completing Work
1. Verify all steps are checked
2. Run validation (tests, lint, etc.)
3. Update status to "Done"
4. Add completion date
5. Check the box in plan's task list

## Linking Tasks to Plans

In the plan file (`/vaults/<area>/projects/<project>/plans/[plan-file].md`), section 5:

```markdown
## 5. Tasks

### Milestone 1: Foundation
- [x] 000 - Setup project structure and dependencies
- [ ] 001 - Implement variable extraction from templates *(In process)*
- [ ] 002 - Create JSON data loader

### Milestone 2: Core Features  
- [ ] 003 - Build HTML preview renderer
- [ ] 004 - Add variable substitution logic
```

## Learning from Tasks

When completing tasks, capture learnings:

```markdown
## 5. Notes

### Learnings
- API has rate limit of 100 req/min, added throttling
- JSON files need UTF-8 BOM handling on Windows
- Template regex fails with nested braces, use recursive pattern

### New Rules Added
- Always validate JSON encoding before parsing
- Add retry logic for external API calls
```

These learnings should inform future tasks and potentially update rules.
