---
name: warn-large-files
enabled: true
event: file
pattern: (file_lines > 500)
action: warn
---

# 📏 Large File Warning

This file exceeds the recommended **500 lines** limit.

## Why This Matters

Large files are:
- **Hard to navigate** - Finding things takes longer
- **Hard to test** - Too many things to cover
- **Hard to review** - PRs become overwhelming
- **Often a sign** - Of mixed responsibilities

## Recommended Actions

### 1. Split by Responsibility

If file has multiple concerns, extract them:
```
// Before: user-service.ts (800 lines)

// After:
user-service.ts (200 lines) - Core service
user-validation.ts (150 lines) - Validation logic
user-repository.ts (200 lines) - Database operations
user-types.ts (50 lines) - Type definitions
```

### 2. Extract Components

For UI files, split into smaller components:
```
// Before: Dashboard.tsx (600 lines)

// After:
Dashboard.tsx (100 lines) - Main container
DashboardHeader.tsx (80 lines)
DashboardStats.tsx (120 lines)
DashboardChart.tsx (150 lines)
DashboardTable.tsx (150 lines)
```

### 3. Move Constants/Types

Extract large constant objects or type definitions:
```
constants.ts
types.ts
```

## Acceptable Exceptions

- Generated files
- Test files with many test cases
- Configuration files
- Legacy code marked for refactoring

## If Keeping Large File

Add a comment at the top explaining why:
```typescript
/**
 * @fileoverview This file is large because [reason].
 * TODO: Split into smaller modules when [condition].
 */
```
