---
description: Create new Product Requirement Prompt from scratch
allowed-tools: Bash, Read, Write
---

# Create New PRP

Start a structured conversation to create a Product Requirement Prompt.

## Step 1: Initial Discovery (ask one at a time)

1. "What is the need or problem you want to solve?"
2. "Is this a new feature, bug fix, refactoring, or documentation?"
3. "What is the current state? What already exists?"
4. "Do you have any deadline, budget, or technology constraints?"
5. "How will you know this is done and working?"

## Step 2: Deep Dive (based on type)

| Type | Questions |
|------|-----------|
| New Feature | Users? Main flow? Integrations? Data storage? |
| Bug Fix | How it manifests? Reproducible? When started? Impact? |
| Refactoring | Current problem? Metrics? Target architecture? |
| Documentation | What needs docs? Audience? Missing info? |

## Step 3: Validate — each requirement must be Specific, Testable, Viable

## Step 4: Generate PRP

```markdown
# PRP-[XXX]: [Clear Title]

## Context
[2-4 paragraphs]

## Current State
[What exists or "Not implemented"]

## Requirements
- [ ] REQ-1: [Specific, testable]
(min 3, max 10)

## Constraints
- **Deadline**: / **Budget**: / **Technology**: / **Dependencies**:

## Success Criteria
- [ ] [Technical criterion with metric]
(min 3)

## Non-Requirements
- NOT: [out of scope item]
```

## Step 5: Ask if user wants detailed tasks generated
