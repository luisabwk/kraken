# Create New PRP

## Overview
This command starts the process of creating a new Product Requirement Prompt (PRP) from scratch using a structured conversational approach.

---

## Activation

Run `/prp-new` when you need to:
- Define requirements for a new feature
- Document a bug fix scope
- Plan a refactoring effort
- Create documentation requirements

---

## Process Flow

### Step 1: Initial Discovery

Start by asking these 5 mandatory questions:

1. **Problem/Need**: "What is the need or problem you want to solve?"
2. **Type**: "Is this a new feature, bug fix, refactoring, or documentation?"
3. **Current State**: "What is the current state? What already exists?"
4. **Constraints**: "Do you have any deadline, budget, or technology constraints?"
5. **Success**: "How will you know this is done and working?"

### Step 2: Deep Dive

Based on the type, ask follow-up questions:

| Type | Questions to Ask |
|------|------------------|
| **New Feature** | Who are the users? What's the main flow? Any integrations? How is data stored? |
| **Bug Fix** | How does it manifest? Is it reproducible? When did it start? What's the impact? |
| **Refactoring** | What's the current problem? What metrics matter? Target architecture? Any downtime? |
| **Documentation** | What needs docs? Who's the audience? What info is missing? What docs exist? |

### Step 3: Validate Requirements

For each requirement mentioned, ensure it is:
- ✅ **Specific**: Clear and unambiguous
- ✅ **Testable**: Can verify when done
- ✅ **Viable**: Fits within constraints

If a requirement is vague, ask: _"What specifically do you mean by [X]? How would you test this?"_

### Step 4: Generate PRP

Once you have enough information, generate the PRP using this template:

```markdown
# PRP-[XXX]: [Clear Title]

## Context
[2-4 paragraphs explaining the problem, why now, project context]

## Current State
[What exists today, or "Not implemented" if new]

## Requirements
- [ ] REQ-1: [Specific, testable requirement]
- [ ] REQ-2: [Specific, testable requirement]
- [ ] REQ-3: [Specific, testable requirement]

## Constraints
- **Deadline**: [date or "Flexible"]
- **Budget**: [hours/cost or "Not specified"]
- **Technology**: [stack requirements or "Any"]
- **Dependencies**: [other systems/teams or "None"]
- **Quality**: [standards or "Standard"]

## Success Criteria
- [ ] [Technical criterion with metric]
- [ ] [Business criterion, verifiable]
- [ ] [Quality criterion]

## Non-Requirements (Out of Scope)
- NOT: [Explicitly excluded item]
- NOT: [Future version item]

## Open Questions
- [ ] [Any unresolved question]

---
**Created**: [date]
**Priority**: [if mentioned]
**Estimate**: [if mentioned]
```

### Step 5: Review & Confirm

After generating, ask:
> "Does this PRP accurately capture what you need? Any adjustments?"

---

## Checklist Before Finalizing

- [ ] All 5 main sections are present
- [ ] Minimum 3 requirements, maximum 10
- [ ] All requirements are specific and testable
- [ ] Success criteria have metrics
- [ ] Constraints are documented
- [ ] Non-requirements clarify scope
- [ ] No contradictions between sections

---

## Next Steps

After PRP is approved, offer:
> "PRP is ready! Want me to: A) Generate detailed tasks, or B) Leave it as is?"

If tasks requested, switch to Tasks mode with `/tasks`.

---

## Quick Reference

```
/prp-new → Start this process
/validate [req] → Check if a requirement is well-written
/prp-review → Review an existing PRP
```
