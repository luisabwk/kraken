---
description: "Use after implementing features to simplify and refine code for clarity, consistency, and maintainability"
alwaysApply: false
---

# Code Simplifier

> Use this rule after writing or modifying code to simplify and refine it for clarity, consistency, and maintainability while preserving all functionality.

## Core Principle

**Clarity over Brevity.** Explicit, readable code is better than clever, compact code. Your goal is to make code that future developers (including yourself) will thank you for.

## The Iron Law

```
NEVER CHANGE WHAT THE CODE DOES - ONLY HOW IT DOES IT
```

All original features, outputs, and behaviors must remain intact. If you're unsure whether a change affects behavior, don't make it.

## When to Use

- After implementing a new feature
- After fixing a bug
- After refactoring
- When code feels "messy" or hard to read
- Before code review

## Simplification Principles

### 1. Preserve Functionality (NON-NEGOTIABLE)

- **Never** change what the code does
- **Never** remove features or behaviors
- **Always** verify outputs remain the same
- **When in doubt**, keep the original

### 2. Enhance Clarity

| Do | Don't |
|----|-------|
| Use descriptive variable names | Use single letters (except loops) |
| Break complex expressions into steps | Chain too many operations |
| Use early returns to reduce nesting | Deep nested if/else chains |
| Extract magic numbers to constants | Leave unexplained numbers |
| Add comments explaining "why" | Add comments explaining "what" |

### 3. Reduce Complexity

**Eliminate:**
- Unnecessary nesting (flatten with early returns)
- Redundant code (apply DRY)
- Dead code and unused imports
- Over-abstraction (if only used once, inline it)
- Unnecessary comments that describe obvious code

**Avoid:**
- Nested ternary operators → Use if/else or switch
- Dense one-liners → Break into readable steps
- Clever tricks → Use straightforward approaches

### 4. Apply Project Standards

Follow the established patterns from the codebase:
- Import ordering and style
- Function declaration style (arrow vs function keyword)
- Naming conventions
- Error handling patterns
- File organization

### 5. Maintain Balance

**Avoid over-simplification that:**
- Reduces code clarity
- Creates "clever" solutions hard to understand
- Combines too many concerns into one function
- Removes helpful abstractions
- Prioritizes "fewer lines" over readability

## Red Flags - Code That Needs Simplification

| Smell | Problem | Solution |
|-------|---------|----------|
| `if (x) { if (y) { if (z) {` | Deep nesting | Early returns, guard clauses |
| `a ? b ? c : d : e ? f : g` | Nested ternaries | if/else or switch |
| `arr.map().filter().reduce().flat()` | Long chains | Break into named steps |
| `// increment i by 1` | Obvious comments | Remove comment |
| `const x = y; return x;` | Unnecessary temp | Return directly |
| Same code in 3+ places | Duplication | Extract function |
| 50+ line function | Too long | Split into smaller functions |
| `any` type everywhere | Weak typing | Add proper types |

## Simplification Checklist

Before considering simplification complete:

- [ ] All original functionality preserved (tested!)
- [ ] No nested ternary operators
- [ ] No function longer than 30 lines (soft limit)
- [ ] No file longer than 500 lines
- [ ] No deep nesting (max 3 levels preferred)
- [ ] All magic numbers extracted to constants
- [ ] Dead code removed
- [ ] Unused imports removed
- [ ] Variable names are descriptive
- [ ] Complex logic has explanatory comments

## Examples

### Bad → Good: Nested Ternaries

```typescript
// ❌ Bad: Nested ternary
const status = isLoading ? 'loading' : hasError ? 'error' : data ? 'success' : 'empty';

// ✅ Good: Clear switch or if/else
function getStatus(isLoading: boolean, hasError: boolean, data: unknown): string {
  if (isLoading) return 'loading';
  if (hasError) return 'error';
  if (data) return 'success';
  return 'empty';
}
```

### Bad → Good: Deep Nesting

```typescript
// ❌ Bad: Deep nesting
function processUser(user: User) {
  if (user) {
    if (user.isActive) {
      if (user.hasPermission) {
        // actual logic here
        return doSomething(user);
      }
    }
  }
  return null;
}

// ✅ Good: Early returns (guard clauses)
function processUser(user: User) {
  if (!user) return null;
  if (!user.isActive) return null;
  if (!user.hasPermission) return null;
  
  return doSomething(user);
}
```

### Bad → Good: Long Chain

```typescript
// ❌ Bad: Hard to debug, hard to read
const result = data
  .filter(x => x.active)
  .map(x => ({ ...x, score: calculateScore(x) }))
  .filter(x => x.score > 50)
  .sort((a, b) => b.score - a.score)
  .slice(0, 10)
  .map(x => x.name);

// ✅ Good: Named intermediate steps
const activeItems = data.filter(item => item.active);

const scoredItems = activeItems.map(item => ({
  ...item,
  score: calculateScore(item),
}));

const highScorers = scoredItems
  .filter(item => item.score > 50)
  .sort((a, b) => b.score - a.score);

const topTenNames = highScorers
  .slice(0, 10)
  .map(item => item.name);
```

### Bad → Good: Magic Numbers

```typescript
// ❌ Bad: What do these numbers mean?
if (password.length < 8) return false;
if (retryCount > 3) throw new Error('Failed');
setTimeout(callback, 300000);

// ✅ Good: Self-documenting
const MIN_PASSWORD_LENGTH = 8;
const MAX_RETRY_ATTEMPTS = 3;
const SESSION_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes

if (password.length < MIN_PASSWORD_LENGTH) return false;
if (retryCount > MAX_RETRY_ATTEMPTS) throw new Error('Failed');
setTimeout(callback, SESSION_TIMEOUT_MS);
```

## Scope

**Default**: Only simplify code that was recently modified or created in the current session.

**Don't** touch unrelated code unless explicitly asked.

**Why**: Minimizes risk of breaking things and keeps changes focused.

## Process

1. **Identify** recently modified code sections
2. **Analyze** for simplification opportunities
3. **Apply** project standards and simplification patterns
4. **Verify** all functionality remains unchanged
5. **Test** to confirm nothing broke
6. **Document** only significant changes

## Integration

- **After implementing**: Run simplification pass before code review
- **Use with**: `@code-review` to verify quality after simplification
- **Use with**: `@test-driven-development` to ensure tests still pass
