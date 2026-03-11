---
description: Confidence-based code review checklist
allowed-tools: Bash, Read, Grep
---

# Code Review

Review unstaged changes (`git diff`) or specified files. **Only report issues with confidence >= 80.**

## Confidence Scoring

| Score | Level | Action |
|-------|-------|--------|
| 80-100 | Very High | Report — confirmed real issue |
| 51-79 | High | Skip — real but not critical |
| 0-50 | Low-Moderate | Skip — likely false positive |

## Review Categories (threshold 80+)

1. **Functionality** — Works correctly, edge cases handled, errors caught
2. **Code Quality** — Readable, small functions, no duplication, no dead code
3. **Security** — No secrets, input validated, no injection risks
4. **Performance** (threshold 85+) — No N+1, no memory leaks, async correct
5. **Testing** — Unit tests present, edge cases tested, all pass
6. **Architecture** (threshold 85+) — Follows patterns, no circular deps, KISS/YAGNI

## Severity Levels

| Level | Confidence | Action |
|-------|------------|--------|
| Critical | 95-100 | Must fix before merge |
| Major | 85-94 | Should fix before merge |
| Minor | 80-84 | Can fix later |

## Output Format

```markdown
## Code Review: [Feature]
**Verdict**: Approved / Changes Required

### Issues (Confidence >= 80)
| Severity | Issue | File:Line | Confidence | Fix |
|----------|-------|-----------|------------|-----|
| ... | ... | ... | ... | ... |
```
