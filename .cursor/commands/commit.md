# Commit & Sync Checklist

## Overview
Guidelines for creating meaningful commits and keeping the repository synchronized. Commits should have clear, descriptive messages that explain the context and motivation for changes.

---

## Pre-Commit Checklist

### 1. Preparation
- [ ] All changes are correct and tested
- [ ] Linting passes (`npm run lint` or equivalent)
- [ ] Tests pass (`npm run test` or equivalent)
- [ ] Build succeeds (`npm run build` or equivalent)
- [ ] No sensitive data in staged files (secrets, API keys)

### 2. Branch Verification
- [ ] Confirm you're on the correct branch
- [ ] **Pushes to `main` require explicit user confirmation**
- [ ] Pull latest changes if working with others

---

## Commit Message Format

Use [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature or functionality |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Code style changes (formatting, no logic change) |
| `refactor` | Code refactoring (no feature or fix) |
| `test` | Adding or updating tests |
| `chore` | Maintenance tasks, dependencies |
| `perf` | Performance improvements |

### Scope (optional)
The area of the codebase affected: `email`, `api`, `auth`, `ui`, etc.

### Description
- Use imperative mood: "add" not "added" or "adds"
- Keep under 72 characters
- Don't end with a period

---

## Examples

### Simple commit
```
feat(email): add HTML template preview system
```

### Commit with body
```
fix(parser): handle empty JSON data gracefully

Previously, the parser would crash when receiving empty JSON.
Now it returns an empty object with a warning log.
```

### Commit with task reference
```
feat(workflow): implement variable extraction from templates

Adds regex-based extraction of {{variables}} from HTML templates.
Supports nested variables and provides unique variable list.

Task: 001
Plan: emailTemplates
```

### Documentation commit
```
docs: update README with setup instructions
```

### Multiple changes (use body)
```
refactor(api): reorganize endpoint structure

- Move user endpoints to /api/users
- Move auth endpoints to /api/auth
- Update route documentation
- Add request validation middleware

Breaking change: API paths have changed
```

---

## Commit Workflow

### Step 1: Review Changes
```bash
git status              # See what's changed
git diff               # Review unstaged changes
git diff --staged      # Review staged changes
```

### Step 2: Stage Changes
```bash
git add <files>        # Stage specific files
git add -p             # Stage interactively (review each change)
```

### Step 3: Commit
```bash
git commit -m "type(scope): description"
```

For longer messages:
```bash
git commit
# This opens editor for multi-line message
```

### Step 4: Sync Remote
```bash
git pull --rebase      # Get latest changes
git push               # Push to remote
```

---

## Branch Rules

| Branch | Rule |
|--------|------|
| `main` | **Protected** - requires user confirmation before push |
| `feature/*` | Free to commit and push |
| `fix/*` | Free to commit and push |

---

## Troubleshooting

### Forgot to add file to last commit
```bash
git add <forgotten-file>
git commit --amend --no-edit
```

### Need to change last commit message
```bash
git commit --amend -m "new message"
```

### Accidentally committed to wrong branch
```bash
git reset HEAD~1              # Undo commit, keep changes
git checkout correct-branch
git add . && git commit       # Commit to correct branch
```

---

## Quick Checklist (TL;DR)

Before every commit:
- [ ] Tests pass
- [ ] No secrets in code
- [ ] Message follows format: `type(scope): description`
- [ ] Correct branch selected
