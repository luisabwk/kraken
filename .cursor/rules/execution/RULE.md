---
description: "Use when executing tasks from a plan, running project workflows, or implementing features step-by-step"
alwaysApply: false
---

# Plan and Task Execution

> Use this rule when you need to execute any task belonging to a plan/project.

## Directory Structure

Before starting execution, ensure the project structure exists:

```
.
├── .cursor/
│   ├── commands/
│   │   ├── boot.md
│   │   ├── code-review.md
│   │   ├── commit.md
│   │   ├── execute.md
│   │   ├── prp-new.md
│   │   └── prp-review.md
│   └── rules/
│       ├── execution/
│       ├── plan/
│       ├── prd/
│       ├── stack/
│       └── task/
├── vaults/
│   └── <area>/
│       └── projects/
│           └── <project>/
│               ├── plans/
│               ├── tasks/
│               ├── execution/
│               └── project/
└── .tmp/
```

## Execution Workflow

### Phase 1: Pre-Execution Checks

1. **Read the Plan**
   - Open `/vaults/<area>/projects/<project>/plans/[plan-file].md`
   - Review objectives, constraints, and milestones
   - Check the task list in section 5

2. **Check Task Status**
   - If tasks are marked "Done" or "In process", read their Notes section
   - Understand what was already completed
   - Identify blockers or dependencies

3. **Verify Project Setup**
   - Ensure `/vaults/<area>/projects/<project>/project/` folder exists
   - Check if `.env` file is needed and configured
   - Verify required dependencies are installed

### Phase 2: Task Execution

1. **Update Task Status**
   - Change status to "In process" in the task file
   - Update the checkbox in the plan's task list

2. **Follow Task Steps**
   - Execute each step in the task's "Steps/Subtasks" section
   - Document decisions and learnings in the Notes section
   - If blocked, document the blocker and move to next task

3. **Code Standards**
   - Follow KISS, YAGNI, DRY principles
   - Keep files under 500 lines
   - Use descriptive names for functions/variables
   - Add comments only when explaining "why"

4. **Error Handling**
   - When errors occur, read the full stack trace
   - Fix the issue and document what went wrong
   - Update the task with learnings to prevent recurrence

### Phase 3: Validation

Before marking a task as Done, run all applicable checks:

```bash
# For TypeScript/JavaScript projects
npm run lint          # Check code style
npm run typecheck     # Check types (if applicable)
npm run test          # Run unit tests
npm run build         # Verify build succeeds

# For Python projects
python -m pytest      # Run tests
python -m mypy .      # Type checking (if using mypy)
ruff check .          # Linting (if using ruff)
```

### Phase 4: Post-Execution

1. **Update Task Status**
   - Change status to "Done" in the task file
   - Check the box in the plan's task list

2. **Document Completion**
   - Add completion notes to the task file
   - Include any important learnings or decisions

3. **Code Review**
   - Run `/code-review` checklist
   - Fix any critical or major issues found

## Red Flags - STOP Immediately

If you catch yourself doing any of these, STOP and reassess:

- Skipping the plan or task documentation
- Not updating task status when switching context
- Ignoring failing tests
- Hardcoding secrets or credentials
- Over-engineering beyond requirements
- Deleting code without understanding why it exists
- "Quick fixing" without understanding root cause
- Proceeding when requirements are unclear

**All of these mean: STOP. Read the plan again or ask for clarification.**

## Execution Rules

### DO ✅
- Always read the full task before starting
- Update statuses in real-time
- Document decisions and learnings
- Run tests before marking as Done
- Ask for clarification when requirements are unclear
- Commit frequently with meaningful messages

### DON'T ❌
- Skip reading the plan or task documentation
- Leave tasks "In process" when switching context
- Ignore failing tests
- Hardcode secrets or credentials
- Over-engineer beyond requirements
- Delete code without understanding why it exists

## Handling Common Scenarios

### Missing Dependencies
```bash
# Check what's needed
npm install           # or pip install -r requirements.txt
# If package is missing, add it
npm install [package] # or pip install [package]
```

### Environment Variables
1. Create `.env` in `/vaults/<area>/projects/<project>/project/`
2. Add required variables (never commit secrets)
3. Reference in code using environment loader

### Task Too Complex
If a task is taking too long or becoming complex:
1. Stop and reassess
2. Break into smaller subtasks
3. Update the task file with new subtasks
4. Continue execution

### Blocked by External Dependency
1. Document the blocker in task Notes
2. Mark task as "Blocked: [reason]"
3. Move to next available task
4. Return when blocker is resolved

## Quality Checklist

Before considering ANY task complete:

- [ ] Code works as intended
- [ ] All tests pass
- [ ] No linting errors
- [ ] No type errors (if applicable)
- [ ] Build succeeds
- [ ] Task status updated to "Done"
- [ ] Plan task list checkbox marked
- [ ] Notes section updated with learnings
