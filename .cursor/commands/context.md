# /context - Dynamic Context Management

> Manage the dynamic context system to optimize token usage.

## Usage

```
/context [subcommand]
```

## Subcommands

| Subcommand | Description |
|------------|-------------|
| `status` | Show context directory usage and statistics |
| `clean` | Remove old files (>7 days) from context directories |
| `log [message]` | Add entry to session history |
| `save [type] [content]` | Manually save content to context directory |
| `read [file]` | Read specific context file with tail/head |

---

## `/context status`

Shows current usage of context directories.

### Agent Instructions

When this command is invoked:

1. List files in `/context/mcp/`, `/context/history/`, `/context/terminal/`
2. Show file count and total size for each directory
3. Show most recent files

### Expected Output

```
📊 Context Directory Status

/context/mcp/
  Files: 3
  Size: 45KB
  Recent: linear_search_1705380000.md (2h ago)

/context/history/
  Files: 1
  Size: 2KB
  Last update: session_log.md (1h ago)

/context/terminal/
  Files: 5
  Size: 120KB
  Recent: log_1705379000.txt (30m ago)

Total: 9 files, 167KB
```

---

## `/context clean`

Removes files older than 7 days from mcp/ and terminal/ directories.

### Agent Instructions

When this command is invoked:

1. Find files older than 7 days in `/context/mcp/` and `/context/terminal/`
2. Show what will be deleted (dry run)
3. Ask for confirmation
4. Delete files if confirmed

### Commands to Execute

```bash
# Dry run - show what would be deleted
find ./context/mcp -type f -mtime +7
find ./context/terminal -type f -mtime +7

# After confirmation
find ./context/mcp -type f -mtime +7 -delete
find ./context/terminal -type f -mtime +7 -delete
```

---

## `/context log [message]`

Adds an entry to the session history log.

### Agent Instructions

When this command is invoked:

1. Parse the message from the command
2. If no message provided, ask for details:
   - What was the context?
   - What decision was made?
   - Why was it made?
   - What does it impact?
3. Format as standard log entry
4. Append to `/context/history/session_log.md`

### Entry Format

```markdown
## [YYYY-MM-DD HH:MM] - Brief Title

**Context**: What was happening
**Decision**: What was decided
**Rationale**: Why this decision was made
**Impact**: What this affects going forward
```

---

## `/context save [type] [content]`

Manually saves content to a context directory.

### Arguments

| Argument | Values | Description |
|----------|--------|-------------|
| `type` | `mcp`, `terminal` | Target directory |
| `content` | string or file | Content to save |

### Agent Instructions

1. Validate the type argument
2. Generate filename with timestamp
3. Save content to appropriate directory
4. Report saved location

---

## `/context read [file]`

Reads a context file with smart extraction.

### Agent Instructions

1. If file is short (<50 lines), display fully
2. If file is long, show:
   - First 10 lines
   - Last 20 lines
   - Offer to grep for specific patterns

---

## Best Practices

| Situation | Command |
|-----------|---------|
| Check storage usage | `/context status` |
| Free up space | `/context clean` |
| Record important decision | `/context log` |
| Save verbose output manually | `/context save mcp` |
| Review saved context | `/context read` |

### Automatic vs Manual

The agent automatically:
- Saves long outputs (>50 lines) to context directories
- Updates session log after significant decisions

Use `/context` commands for:
- Manual overrides
- Monitoring usage
- Cleanup
- Reading back saved context

---

## Directory Structure Reference

```
/context/
├── mcp/              # Long MCP tool responses
│   └── {tool}_{timestamp}.md
├── history/          # Session persistence
│   └── session_log.md
└── terminal/         # Command execution logs
    └── log_{timestamp}.txt
```
