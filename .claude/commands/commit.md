---
description: Git commit with conventional commits format
allowed-tools: Bash, Read, Grep
---

# Commit & Sync

## Pre-Commit

- [ ] All changes tested
- [ ] Linting passes
- [ ] Tests pass
- [ ] Build succeeds
- [ ] No sensitive data in staged files
- [ ] Correct branch selected
- [ ] Pushes to `main` require explicit user confirmation

## Commit Format

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`

## Workflow

```bash
git status
git diff --staged
git commit -m "type(scope): description"
git pull --rebase
git push
```
