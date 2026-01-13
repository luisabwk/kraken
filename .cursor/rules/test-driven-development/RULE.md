---
description: "Use when implementing any feature, bugfix, or code change - write tests first, watch them fail, then implement"
alwaysApply: false
---

# Test-Driven Development (TDD)

> Use this rule when implementing any feature or bugfix. **Write the test first. Watch it fail. Write minimal code to pass.**

## The Iron Law

```
NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST
```

Write code before the test? **Delete it. Start over.**

**No exceptions:**
- Don't keep it as "reference"
- Don't "adapt" it while writing tests
- Don't look at it
- Delete means delete

## Core Principle

**If you didn't watch the test fail, you don't know if it tests the right thing.**

## When to Use

**Always:**
- New features
- Bug fixes
- Refactoring
- Behavior changes

**Exceptions (ask user first):**
- Throwaway prototypes
- Generated code
- Configuration files

Thinking "skip TDD just this once"? Stop. That's rationalization.

## The Red-Green-Refactor Cycle

```
┌─────────┐     ┌─────────┐     ┌──────────┐
│   RED   │ ──► │  GREEN  │ ──► │ REFACTOR │
│  Write  │     │ Minimal │     │  Clean   │
│  Test   │     │  Code   │     │   Up     │
└─────────┘     └─────────┘     └──────────┘
     ▲                               │
     └───────────────────────────────┘
```

### RED - Write Failing Test

Write ONE minimal test showing what should happen.

**Good Test:**
```typescript
test('retries failed operations 3 times', async () => {
  let attempts = 0;
  const operation = () => {
    attempts++;
    if (attempts < 3) throw new Error('fail');
    return 'success';
  };

  const result = await retryOperation(operation);

  expect(result).toBe('success');
  expect(attempts).toBe(3);
});
```
✅ Clear name, tests real behavior, one thing

**Bad Test:**
```typescript
test('retry works', async () => {
  const mock = jest.fn()
    .mockRejectedValueOnce(new Error())
    .mockResolvedValueOnce('success');
  await retryOperation(mock);
  expect(mock).toHaveBeenCalledTimes(2);
});
```
❌ Vague name, tests mock not code

**Requirements:**
- One behavior per test
- Clear, descriptive name
- Real code (no mocks unless unavoidable)

### Verify RED - Watch It Fail

**MANDATORY. Never skip.**

```bash
npm test path/to/test.test.ts
# or
python -m pytest tests/test_file.py::test_name
```

Confirm:
- Test fails (not errors)
- Failure message is expected
- Fails because feature missing (not typos)

**Test passes immediately?** You're testing existing behavior. Fix test.

**Test errors?** Fix error, re-run until it fails correctly.

### GREEN - Minimal Code

Write the SIMPLEST code to pass the test.

**Good:**
```typescript
async function retryOperation<T>(fn: () => Promise<T>): Promise<T> {
  for (let i = 0; i < 3; i++) {
    try {
      return await fn();
    } catch (e) {
      if (i === 2) throw e;
    }
  }
  throw new Error('unreachable');
}
```
✅ Just enough to pass

**Bad:**
```typescript
async function retryOperation<T>(
  fn: () => Promise<T>,
  options?: {
    maxRetries?: number;
    backoff?: 'linear' | 'exponential';
    onRetry?: (attempt: number) => void;
  }
): Promise<T> {
  // YAGNI - You Aren't Gonna Need It
}
```
❌ Over-engineered for current test

Don't add features, refactor other code, or "improve" beyond the test.

### Verify GREEN - Watch It Pass

**MANDATORY.**

```bash
npm test
# or
python -m pytest
```

Confirm:
- Test passes
- Other tests still pass
- Output pristine (no errors, warnings)

**Test fails?** Fix code, not test.

**Other tests fail?** Fix now.

### REFACTOR - Clean Up

After green only:
- Remove duplication
- Improve names
- Extract helpers

Keep tests green. Don't add behavior.

### Repeat

Next failing test for next feature.

## Red Flags - STOP and Start Over

- Code before test
- Test after implementation
- Test passes immediately
- Can't explain why test failed
- Tests added "later"
- Rationalizing "just this once"
- "I already manually tested it"
- "Tests after achieve the same purpose"
- "Keep as reference" or "adapt existing code"
- "TDD is dogmatic, I'm being pragmatic"

**All of these mean: Delete code. Start over with TDD.**

## Common Rationalizations - DON'T Fall For These

| Excuse | Reality |
|--------|----------|
| "Too simple to test" | Simple code breaks. Test takes 30 seconds. |
| "I'll test after" | Tests passing immediately prove nothing. |
| "Tests after achieve same goals" | Tests-after = "what does this do?" Tests-first = "what should this do?" |
| "Already manually tested" | Ad-hoc ≠ systematic. No record, can't re-run. |
| "Deleting X hours is wasteful" | Sunk cost fallacy. Keeping unverified code is technical debt. |
| "Keep as reference, write tests first" | You'll adapt it. That's testing after. Delete means delete. |
| "Need to explore first" | Fine. Throw away exploration, start with TDD. |
| "Test hard = design unclear" | Listen to test. Hard to test = hard to use. |
| "TDD will slow me down" | TDD faster than debugging. Pragmatic = test-first. |
| "Existing code has no tests" | You're improving it. Add tests for what you touch. |

## Task Steps with TDD

When writing tasks, use this granularity:

```markdown
## 4. Steps

### Feature: User validation

- [ ] Step 1: Write failing test for email validation
  ```typescript
  test('rejects invalid email format', () => {
    expect(validateEmail('invalid')).toBe(false);
  });
  ```

- [ ] Step 2: Run test, verify it fails with "validateEmail is not defined"

- [ ] Step 3: Write minimal implementation
  ```typescript
  function validateEmail(email: string): boolean {
    return email.includes('@');
  }
  ```

- [ ] Step 4: Run test, verify it passes

- [ ] Step 5: Commit: "feat(validation): add email format validation"

- [ ] Step 6: Write failing test for edge case (empty string)
  
- [ ] Step 7: Run test, verify failure

- [ ] Step 8: Update implementation to handle edge case

- [ ] Step 9: Verify all tests pass

- [ ] Step 10: Commit: "feat(validation): handle empty email edge case"
```

## Example: Bug Fix with TDD

**Bug:** Empty email accepted in form

**RED**
```typescript
test('rejects empty email', async () => {
  const result = await submitForm({ email: '' });
  expect(result.error).toBe('Email required');
});
```

**Verify RED**
```bash
$ npm test
FAIL: expected 'Email required', got undefined
```

**GREEN**
```typescript
function submitForm(data: FormData) {
  if (!data.email?.trim()) {
    return { error: 'Email required' };
  }
  // ...existing code
}
```

**Verify GREEN**
```bash
$ npm test
PASS
```

**REFACTOR**
Extract validation if needed for multiple fields.

**COMMIT**
```bash
git commit -m "fix(form): reject empty email submission"
```

## Verification Checklist

Before marking work complete:

- [ ] Every new function/method has a test
- [ ] Watched each test fail before implementing
- [ ] Each test failed for expected reason (feature missing, not typo)
- [ ] Wrote minimal code to pass each test
- [ ] All tests pass
- [ ] Output pristine (no errors, warnings)
- [ ] Tests use real code (mocks only if unavoidable)
- [ ] Edge cases and errors covered

Can't check all boxes? You skipped TDD. Start over.

## When Stuck

| Problem | Solution |
|---------|----------|
| Don't know how to test | Write wished-for API. Write assertion first. Ask user. |
| Test too complicated | Design too complicated. Simplify interface. |
| Must mock everything | Code too coupled. Use dependency injection. |
| Test setup huge | Extract helpers. Still complex? Simplify design. |

## Integration with Other Rules

- **Use with**: `@execution` rule when implementing tasks
- **Use with**: `@systematic-debugging` when tests fail unexpectedly
- **Document**: Learnings in task Notes section
- **Review**: Use `@code-review` after completing feature

## The Bottom Line

```
Production code → test exists and failed first
Otherwise → not TDD
```

No exceptions without user's explicit permission.

**TDD is not dogma. TDD is pragmatism.** It's faster than debugging untested code.
