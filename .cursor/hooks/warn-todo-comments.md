---
name: warn-todo-comments
enabled: true
event: file
pattern: //\s*TODO|#\s*TODO|//\s*FIXME|#\s*FIXME|//\s*HACK|#\s*HACK
action: warn
---

# 📝 TODO/FIXME Comment Detected

Found a TODO, FIXME, or HACK comment in the code.

## Detected Patterns

| Pattern | Meaning |
|---------|----------|
| `TODO:` | Something to do later |
| `FIXME:` | Something broken that needs fixing |
| `HACK:` | Workaround that should be improved |

## Questions to Ask

1. **Is this the right time to address it?**
   - If related to current task → Fix it now
   - If unrelated → Leave it, but consider creating a task

2. **Is the TODO clear enough?**
   - Bad: `// TODO: fix this`
   - Good: `// TODO(#123): Add retry logic for network failures`

3. **Should this be tracked elsewhere?**
   - Create a GitHub issue
   - Add to project backlog
   - Link in the comment

## Best Practices for TODOs

### Include Context
```typescript
// TODO(user, 2026-01-10): Refactor to use new API
// when v2 is released. See issue #456.
```

### Link to Issues
```typescript
// FIXME(#789): Race condition when multiple users
// submit simultaneously. Needs mutex or queue.
```

### Set Priority
```typescript
// TODO(P1): Critical - must fix before release
// TODO(P2): Important - fix soon
// TODO(P3): Nice to have - when time permits
```

## If Adding New TODO

Make sure it has:
- [ ] Clear description of what needs to be done
- [ ] Context for why it's needed
- [ ] Link to issue/task if applicable
- [ ] Your name/date for accountability
