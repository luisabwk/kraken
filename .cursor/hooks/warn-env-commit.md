---
name: warn-env-commit
enabled: true
event: commit
pattern: \.env$|\.env\.local$|\.env\.production$|credentials\.json$|secrets\.
action: block
---

# 🚫 Sensitive File in Commit

Attempting to commit a file that likely contains secrets or credentials.

## Blocked Files

| Pattern | Type |
|---------|------|
| `.env` | Environment variables |
| `.env.local` | Local environment |
| `.env.production` | Production secrets |
| `credentials.json` | Service credentials |
| `secrets.*` | Secret files |

## This is Blocked Because

- Secrets in git history are **permanent** (even if removed later)
- Anyone with repo access can see them
- Automated scanners detect and exploit leaked secrets
- Rotating compromised secrets is costly

## What to Do

### 1. Remove from staging
```bash
git reset HEAD .env
```

### 2. Add to .gitignore
```bash
echo ".env" >> .gitignore
echo ".env.*" >> .gitignore
echo "credentials.json" >> .gitignore
```

### 3. If Already Committed Previously

The secret is compromised. You must:
1. **Rotate the secret** immediately
2. Consider using `git filter-branch` or BFG to remove from history
3. Force push (coordinate with team)

## Verification

- [ ] File removed from staging
- [ ] File added to .gitignore
- [ ] Secrets rotated if previously exposed

## If This is a Template File

Rename to make it clear it's a template:
```
.env.example    # Template without real values
.env.template   # Template without real values
```

These can be safely committed if they contain placeholder values only.
