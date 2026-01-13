# Code Review Checklist

## Overview
Comprehensive checklist for conducting thorough code reviews to ensure quality, security, and maintainability. Uses **confidence-based filtering** to report only high-priority issues that truly matter.

## How to Use
1. Run `/code-review` after completing a feature or task
2. Review unstaged changes (`git diff`) by default, or specified files
3. Apply confidence scoring to each potential issue
4. **Only report issues with confidence ≥ 80**
5. Document findings in the task's Notes section
6. Fix critical issues before marking task as Done

---

## Confidence Scoring System

Rate each potential issue on a scale from 0-100:

| Score | Confidence Level | Criteria |
|-------|-----------------|----------|
| **0-25** | Low | Likely false positive, or pre-existing issue not related to current changes |
| **26-50** | Moderate | Might be real issue, but could be nitpick or rarely happens in practice |
| **51-79** | High | Real issue, verified, but not critical to functionality |
| **80-100** | Very High | Confirmed issue that will impact functionality or violates project guidelines |

### Scoring Guidelines

**Score 80+ (REPORT)** when:
- ✅ Double-checked and verified the issue is real
- ✅ Will directly impact functionality in practice
- ✅ Explicitly violates project guidelines or conventions
- ✅ Security vulnerability confirmed
- ✅ Bug that will be hit by users

**Score < 80 (DON'T REPORT)** when:
- ❌ Stylistic preference not in project guidelines
- ❌ "Might" cause issues but unconfirmed
- ❌ Pre-existing issue not related to current changes
- ❌ Theoretical concern unlikely to happen
- ❌ Personal opinion without objective backing

### Why Confidence Scoring?

**Quality over Quantity.** Developers ignore reviews with too many low-value comments. By only reporting high-confidence issues, reviews become actionable and respected.

---

## Review Categories

### 1. Functionality (Confidence threshold: 80+)
- [ ] Code does what it's supposed to do
- [ ] Edge cases are handled appropriately
- [ ] Error handling is present and appropriate
- [ ] No obvious bugs or logic errors
- [ ] Input validation is present where needed
- [ ] Output matches expected format/type

### 2. Code Quality (Confidence threshold: 80+)
- [ ] Code is readable and well-structured
- [ ] Functions are small and focused (single responsibility)
- [ ] Variable and function names are descriptive
- [ ] No code duplication (DRY principle followed)
- [ ] Follows project conventions and style guide
- [ ] Comments explain "why" not "what" (when needed)
- [ ] No dead code or unused imports
- [ ] File size is reasonable (< 500 lines preferred)

### 3. Security (Confidence threshold: 80+)
- [ ] No obvious security vulnerabilities
- [ ] Input validation prevents injection attacks
- [ ] Sensitive data is handled properly (no logging secrets)
- [ ] No hardcoded secrets, API keys, or credentials
- [ ] Authentication/authorization checks are present where needed
- [ ] Data is sanitized before use

### 4. Performance (Confidence threshold: 85+)
- [ ] No unnecessary loops or redundant computations
- [ ] Database queries are optimized (no N+1 problems)
- [ ] Large datasets are paginated or streamed
- [ ] Async operations are handled correctly
- [ ] No memory leaks (event listeners cleaned up, etc.)
- [ ] Caching is used where appropriate

### 5. Testing (Confidence threshold: 80+)
- [ ] Unit tests cover main functionality
- [ ] Edge cases are tested
- [ ] Error scenarios are tested
- [ ] Tests are readable and maintainable
- [ ] All tests pass locally
- [ ] Test coverage is adequate for critical paths

### 6. Documentation (Confidence threshold: 75+)
- [ ] Public functions/APIs have documentation
- [ ] Complex logic is explained
- [ ] README is updated if needed
- [ ] API changes are documented
- [ ] Breaking changes are clearly noted

### 7. Architecture & Design (Confidence threshold: 85+)
- [ ] Code follows established patterns in the codebase
- [ ] Dependencies are appropriate and up-to-date
- [ ] No circular dependencies introduced
- [ ] Separation of concerns is maintained
- [ ] KISS principle is followed (not over-engineered)
- [ ] YAGNI principle is followed (no unnecessary features)

---

## Severity Levels

When high-confidence issues are found, classify them:

| Level | Description | Confidence | Action |
|-------|-------------|------------|--------|
| 🔴 **Critical** | Security issues, data loss risk, broken functionality | 95-100 | Must fix before merge |
| 🟠 **Major** | Bugs, performance issues, missing tests | 85-94 | Should fix before merge |
| 🟡 **Minor** | Style issues against guidelines, minor improvements | 80-84 | Can fix later |

**Issues below 80 confidence are NOT reported.**

---

## Review Output Template

After completing the review, document findings:

```markdown
## Code Review: [Task/Feature Name]
**Date**: YYYY-MM-DD
**Reviewer**: Agent
**Scope**: [git diff / specific files]

### Summary
- Files reviewed: X
- High-confidence issues found: X
- Verdict: [Approved / Changes Required]

### Issues Found (Confidence ≥ 80 only)

#### 🔴 Critical (95-100)
| Issue | File:Line | Confidence | Fix |
|-------|-----------|------------|-----|
| [Description] | `path/file.ts:42` | 98 | [Specific fix] |

#### 🟠 Major (85-94)
| Issue | File:Line | Confidence | Fix |
|-------|-----------|------------|-----|
| [Description] | `path/file.ts:15` | 88 | [Specific fix] |

#### 🟡 Minor (80-84)
| Issue | File:Line | Confidence | Fix |
|-------|-----------|------------|-----|
| [Description] | `path/file.ts:7` | 82 | [Specific fix] |

### Not Reported (< 80 confidence)
- [Optional: Brief mention of low-confidence concerns for awareness]

### Verdict
✅ **Approved** - No high-confidence issues found
⚠️ **Approved with changes** - Minor issues to address
❌ **Changes required** - Critical/Major issues must be fixed
```

---

## Quick Checks (TL;DR)

For fast reviews, at minimum check with HIGH confidence:
- [ ] It works as intended (test it!)
- [ ] No security vulnerabilities (confirmed, not theoretical)
- [ ] Tests pass
- [ ] No hardcoded secrets
- [ ] Code is readable

**Remember: Only report what you're ≥80% confident about.**
