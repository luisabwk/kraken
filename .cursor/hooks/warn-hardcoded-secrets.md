---
name: warn-hardcoded-secrets
enabled: true
event: file
pattern: (API_KEY|SECRET|PASSWORD|TOKEN|CREDENTIAL|PRIVATE_KEY)\s*[:=]\s*["'][^"']{8,}["']|sk-[a-zA-Z0-9]{20,}|ghp_[a-zA-Z0-9]{36}|eyJ[a-zA-Z0-9_-]*\.eyJ
action: warn
---

# 🔐 Potential Hardcoded Secret Detected

Found what appears to be a hardcoded secret or credential in the code.

## Detected Patterns

| Pattern | Type |
|---------|------|
| `API_KEY = "..."` | API Key assignment |
| `SECRET = "..."` | Secret assignment |
| `PASSWORD = "..."` | Password in code |
| `sk-...` | OpenAI API key format |
| `ghp_...` | GitHub personal access token |
| `eyJ...` | JWT token |

## This is a Security Risk!

Hardcoded secrets can be:
- Exposed in version control history
- Leaked in error logs
- Stolen by malicious actors
- Difficult to rotate

## What to Do

1. **Remove** the secret from the code immediately
2. **Use environment variables**:
   ```typescript
   const apiKey = process.env.API_KEY;
   ```
3. **Add to .env file** (which should be in .gitignore):
   ```
   API_KEY=sk-your-actual-key-here
   ```
4. **Rotate the secret** if it was ever committed

## Verification Checklist

- [ ] Secret removed from code
- [ ] Using environment variable instead
- [ ] .env file is in .gitignore
- [ ] Secret was never committed to git history
