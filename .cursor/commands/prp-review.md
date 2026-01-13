# Review Existing PRP

## Overview
This command analyzes an existing Product Requirement Prompt (PRP) for completeness, clarity, and quality, providing actionable feedback.

---

## Activation

Run `/prp-review` when you need to:
- Validate a PRP before starting work
- Improve an existing PRP
- Check for missing information
- Identify potential risks or issues

---

## Review Process

### Step 1: Request the PRP

Ask the user to share the PRP:
> "Please share the PRP you'd like me to review. You can paste the content or reference a file path."

### Step 2: Structure Analysis

Check that all required sections are present:

| Section | Required | Check |
|---------|----------|-------|
| Context | ✅ Yes | 2-4 paragraphs explaining the problem |
| Current State | ✅ Yes | What exists today |
| Requirements | ✅ Yes | 3-10 specific items |
| Constraints | ✅ Yes | Timeline, budget, tech, dependencies |
| Success Criteria | ✅ Yes | 3+ measurable criteria |
| Non-Requirements | ⚪ Optional | Scope clarification |
| Open Questions | ⚪ Optional | Unresolved items |

### Step 3: Requirements Quality Check

For each requirement, evaluate:

| Criteria | Pass | Fail |
|----------|------|------|
| **Specific** | Clear, unambiguous | Vague, multiple interpretations |
| **Testable** | Can verify completion | No way to test |
| **Independent** | Stands alone | Depends on unclear items |
| **Valuable** | Delivers user/business value | Nice-to-have fluff |
| **Estimable** | Can estimate effort | Too vague to estimate |
| **Small** | Fits in reasonable time | Needs to be broken down |

### Step 4: Constraints Validation

Check for:
- [ ] Timeline is realistic given scope
- [ ] Technology constraints are compatible with requirements
- [ ] Dependencies are identified and manageable
- [ ] Budget aligns with complexity

### Step 5: Success Criteria Check

Ensure:
- [ ] At least 3 criteria present
- [ ] Each has a measurable metric
- [ ] Covers technical + business + quality aspects
- [ ] Achievable within constraints

### Step 6: Risk Identification

Flag potential issues:

| Risk Type | Indicators |
|-----------|-----------|
| 🔴 **Scope Creep** | Vague requirements, missing non-requirements |
| 🔴 **Unrealistic** | Too many requirements for timeline |
| 🟡 **Dependencies** | External systems, other teams |
| 🟡 **Technical** | New technology, unclear architecture |
| 🟢 **Minor Gaps** | Missing details, clarification needed |

---

## Review Output Template

After analysis, provide:

```markdown
## PRP Review: [Title]

### Summary
- **Overall Score**: [X/10]
- **Status**: ✅ Ready | ⚠️ Needs Work | ❌ Major Issues

### Structure Check
| Section | Status | Notes |
|---------|--------|-------|
| Context | ✅/❌ | [notes] |
| Current State | ✅/❌ | [notes] |
| Requirements | ✅/❌ | [notes] |
| Constraints | ✅/❌ | [notes] |
| Success Criteria | ✅/❌ | [notes] |

### Requirements Analysis
| Req | Specific | Testable | Clear | Issues |
|-----|----------|----------|-------|--------|
| REQ-1 | ✅/❌ | ✅/❌ | ✅/❌ | [notes] |
| REQ-2 | ✅/❌ | ✅/❌ | ✅/❌ | [notes] |

### Issues Found

#### 🔴 Critical (Must Fix)
- [Issue and recommendation]

#### 🟡 Important (Should Fix)
- [Issue and recommendation]

#### 🟢 Minor (Nice to Fix)
- [Issue and recommendation]

### Recommendations
1. [Specific action to improve PRP]
2. [Specific action to improve PRP]

### Questions to Clarify
- [Question about unclear item]
```

---

## Scoring Guide

| Score | Meaning | Action |
|-------|---------|--------|
| 9-10 | Excellent | Ready to execute |
| 7-8 | Good | Minor clarifications needed |
| 5-6 | Fair | Several improvements needed |
| 3-4 | Weak | Significant rework required |
| 1-2 | Poor | Start over with discovery |

---

## Common Issues & Fixes

### Vague Requirements
**Issue**: "System should be user-friendly"
**Fix**: "User can complete checkout in < 5 clicks with < 2% error rate"

### Missing Constraints
**Issue**: No timeline mentioned
**Fix**: Add explicit deadline or state "Flexible - no hard deadline"

### Weak Success Criteria
**Issue**: "Feature works correctly"
**Fix**: "100% of unit tests pass, API response time < 200ms, zero critical bugs in UAT"

### Scope Creep Risk
**Issue**: No non-requirements section
**Fix**: Add "NOT: mobile app, NOT: admin panel, NOT: multi-language"

---

## Quick Reference

```
/prp-review → Start this review process
/validate [req] → Check single requirement
/prp-new → Create new PRP from scratch
```
