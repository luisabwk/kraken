---
name: warn-long-output
enabled: true
event: bash
pattern: .*
action: warn
threshold: 50
---

# Long Output Warning

**Trigger**: Command output exceeds 50 lines.

## When This Fires

After executing a command that produces more than 50 lines of output, this hook reminds the agent to follow the Dynamic Context Management rules.

## Expected Behavior

1. **Detect** output length after command execution
2. **If > 50 lines**, consider redirecting to `/context/terminal/`
3. **Save** the output for later selective retrieval
4. **Extract** only relevant portions into context

## Recommended Actions

```bash
# Option 1: Re-run with redirect
command > ./context/terminal/log_$(date +%s).txt 2>&1

# Option 2: Save current output
echo "previous_output" > ./context/terminal/log_$(date +%s).txt

# Option 3: Selective extraction
tail -20 ./context/terminal/log_*.txt
grep "error\|warning" ./context/terminal/log_*.txt
```

## Message

```
⚠️ Long Output Detected (>{threshold} lines)

Consider saving to /context/terminal/ and extracting only relevant portions.
This prevents context bloat and improves model precision.

See: .cursor/rules/dynamic-context/RULE.md
```

## Exceptions

Don't apply this warning for:
- `ls` commands (directory listings are usually needed in full)
- `git status` or `git diff` (often needed in full)
- When user explicitly requests full output

## Integration

This hook works with:
- **Rule 04** of Dynamic Context Management (Terminal Log Management)
- `/context save terminal` command
- `/context status` to monitor accumulated logs
