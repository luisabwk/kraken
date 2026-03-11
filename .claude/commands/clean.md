---
description: Repository hygiene — clean temp files, organize execution folders
allowed-tools: Bash, Read, Grep
---

# Clean Repository

Periodic hygiene check for the repository.

## Steps

### 1. Check context and .tmp status
```bash
du -sh context/mcp context/history context/terminal 2>/dev/null
du -sh .tmp 2>/dev/null
```

### 2. Safe cleanup (with confirmation)
- `.tmp/` — list then delete contents
- Context — run `/context clean` for files older than 7 days
- Never delete `context/history/` without explicit request

### 3. Execution folder hygiene
For each `vaults/**/execution/`:
- Keep reusable scripts
- Move one-off artifacts to `project/archive/`
- Don't delete without confirmation

### 4. Untracked/uncommitted review
- `git status`
- Verify `.gitignore` covers caches (`.mypy_cache/`, `.ruff_cache/`, `.pytest_cache/`)
- Suggest: track, archive, ignore, or delete for each untracked file

### 5. Consistency check
- Each project with `execution/` should have `plans/` or `tasks/` reference
