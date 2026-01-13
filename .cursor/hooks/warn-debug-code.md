---
name: warn-debug-code
enabled: true
event: file
pattern: console\.log\(|console\.debug\(|console\.info\(|debugger;|print\((?!.*file)|DEBUG\s*=\s*[Tt]rue
action: warn
---

# 🐛 Debug Code Detected

Found debugging statements that should probably be removed before committing:

## Detected Patterns

| Pattern | Language |
|---------|----------|
| `console.log()` | JavaScript/TypeScript |
| `console.debug()` | JavaScript/TypeScript |
| `debugger;` | JavaScript/TypeScript |
| `print()` | Python |
| `DEBUG = True` | Various |

## Checklist

- [ ] Is this intentional logging that should stay?
- [ ] Is this in a development-only file?
- [ ] Should this be replaced with proper logging?

## Recommendations

1. **Remove** if it was for debugging during development
2. **Replace** with proper logging framework if needed for production:
   ```typescript
   // Instead of console.log
   logger.info('User action', { userId, action });
   ```
3. **Keep** only if in development/test utilities

## If Keeping Intentionally

Add a comment explaining why:
```typescript
// DEBUG: Keep for monitoring performance in staging
console.log('Render time:', elapsed);
```
