---
name: warn-any-type
enabled: true
event: file
pattern: :\s*any\b|as\s+any\b|<any>|\bany\[\]
action: warn
---

# 🎯 TypeScript `any` Type Detected

Found usage of `any` type which bypasses TypeScript's type checking.

## Detected Patterns

| Pattern | Example |
|---------|----------|
| `: any` | `function foo(x: any)` |
| `as any` | `value as any` |
| `<any>` | `<any>value` |
| `any[]` | `const items: any[]` |

## Why This is Problematic

Using `any`:
- **Disables type checking** for that value
- **Spreads** - anything touching `any` becomes `any`
- **Hides bugs** that TypeScript would catch
- **Defeats the purpose** of using TypeScript

## Better Alternatives

### 1. Use `unknown` for truly unknown types
```typescript
// ❌ any - no type safety
function parse(data: any) { return data.value; }

// ✅ unknown - requires type checking
function parse(data: unknown) {
  if (typeof data === 'object' && data && 'value' in data) {
    return data.value;
  }
}
```

### 2. Define proper types
```typescript
// ❌ any
const response: any = await fetch(url);

// ✅ Typed
interface ApiResponse {
  data: User[];
  total: number;
}
const response: ApiResponse = await fetch(url);
```

### 3. Use generics
```typescript
// ❌ any
function getFirst(arr: any[]): any { return arr[0]; }

// ✅ Generic
function getFirst<T>(arr: T[]): T | undefined { return arr[0]; }
```

### 4. Use type guards
```typescript
function isUser(obj: unknown): obj is User {
  return typeof obj === 'object' && obj !== null && 'id' in obj;
}
```

## Acceptable Exceptions

- Third-party library without types (add `@ts-ignore` with comment)
- Temporary during migration (add TODO)
- Test mocks (use `jest.Mock` or similar)

## If Using `any` Intentionally

Add a comment explaining why:
```typescript
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// Reason: External API returns dynamic shape, validated at runtime
const data: any = externalApi.getData();
```
