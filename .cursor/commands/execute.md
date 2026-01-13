# Execution Checklist

## Overview
This is a step-by-step guide for executing plans and tasks. Follow this checklist to ensure consistent, quality execution.

---

## Pre-Execution Checklist

### 1. Review the Plan
- [ ] Read the plan file at `/vaults/<area>/projects/<project>/plans/[plan-file].md`
- [ ] Understand the objective and constraints
- [ ] Review milestones and overall scope

### 2. Check Task Status
- [ ] Open the task list in section 5 of the plan
- [ ] Identify which tasks are "Done", "In process", or "To do"
- [ ] For "Done"/"In process" tasks, read their Notes in `/vaults/<area>/projects/<project>/tasks/`

### 3. Verify Project Structure
- [ ] Confirm `/vaults/<area>/projects/<project>/project/` folder exists (create if needed)
- [ ] Check if `.env` file is required and properly configured
- [ ] Verify dependencies are installed

---

## During Execution

### 4. Start the Task
- [ ] Update task status to "In process" in the task `.md` file
- [ ] Update the plan's task list to reflect current work

### 5. Execute Task Steps
- [ ] Follow the steps defined in the task file
- [ ] Document any decisions in the Notes section
- [ ] If blocked, document the blocker and proceed to next task

### 6. Code Quality
- [ ] Follow KISS, YAGNI, DRY principles
- [ ] Keep files under 500 lines
- [ ] Use clear, descriptive naming
- [ ] Add comments only when explaining "why"

---

## Post-Execution Checklist

### 7. Run Tests and Validation
```bash
# TypeScript/JavaScript
npm run lint        # Check code style
npm run typecheck   # Type checking
npm run test        # Unit tests
npm run build       # Build verification

# Python
python -m pytest    # Tests
ruff check .        # Linting
```

- [ ] All linting checks pass
- [ ] All type checks pass (if applicable)
- [ ] All unit tests pass
- [ ] Build succeeds without errors

### 8. Complete the Task
- [ ] Update task status to "Done" in the task file
- [ ] Mark checkbox as complete in plan's task list
- [ ] Add completion notes and learnings to task Notes section

### 9. Code Review
- [ ] Run `/code-review` command
- [ ] Fix any critical or major issues
- [ ] Document review findings if applicable

---

## Environment Setup

If the project requires API keys or credentials:

1. Create `.env` file at `/vaults/<area>/projects/<project>/project/.env`
2. Add required variables:
```env
API_KEY=your_key_here
DATABASE_URL=your_url_here
```
3. **Never commit `.env` files** - ensure they're in `.gitignore`

---

## Quick Reference

| Action | Location |
|--------|----------|
| Read plan | `/vaults/<area>/projects/<project>/plans/` |
| Read/update tasks | `/vaults/<area>/projects/<project>/tasks/` |
| Project files | `/vaults/<area>/projects/<project>/project/` |
| Environment vars | `/vaults/<area>/projects/<project>/project/.env` |
| Code review | `/code-review` command |
