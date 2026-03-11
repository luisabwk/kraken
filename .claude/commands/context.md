---
description: Dynamic context management — status, clean, log, save, read
allowed-tools: Bash, Read, Write
argument-hint: <status|clean|log|save|read>
---

# /context — Dynamic Context Management

## Subcommands

### `status` — Show context directory usage
```bash
du -sh context/mcp context/history context/terminal 2>/dev/null
find context/ -type f 2>/dev/null | head -20
```

### `clean` — Remove files older than 7 days
```bash
find ./context/mcp -type f -mtime +7 -delete
find ./context/terminal -type f -mtime +7 -delete
```

### `log [message]` — Add entry to session history
Append to `/context/history/session_log.md`:
```markdown
## [YYYY-MM-DD HH:MM] - Title
**Context**: / **Decision**: / **Rationale**: / **Impact**:
```

### `save [type] [content]` — Save to context directory
Types: `mcp`, `terminal`. Generates timestamped filename.

### `read [file]` — Read context file
Short (<50 lines): display fully. Long: show first 10 + last 20, offer grep.
