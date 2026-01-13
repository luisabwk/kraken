---
name: block-dangerous-commands
enabled: true
event: bash
pattern: rm\s+-rf\s+[/~]|rm\s+-rf\s+\*|dd\s+if=|mkfs\.|format\s+|>\s*/dev/|chmod\s+777|chown\s+-R.*[/~]
action: block
---

# 🛑 Dangerous Command Blocked

This command has been blocked because it could cause **irreversible damage**:

## Blocked Patterns

| Pattern | Risk |
|---------|------|
| `rm -rf /` or `rm -rf ~` | Delete entire filesystem or home |
| `rm -rf *` | Delete everything in current directory |
| `dd if=` | Overwrite disk/partitions |
| `mkfs.` | Format filesystem |
| `> /dev/` | Overwrite device files |
| `chmod 777` | Insecure permissions |
| `chown -R` on system paths | Change ownership recursively |

## What to Do Instead

1. **Verify the path** - Double-check you're in the right directory
2. **Use safer alternatives**:
   - `rm -rf ./specific-folder` (explicit relative path)
   - `trash` command instead of `rm`
   - `mv` to a temp location first
3. **Ask user for confirmation** if absolutely necessary

## If User Insists

Only proceed if user explicitly confirms with full understanding of risks. Document the decision in task Notes.
