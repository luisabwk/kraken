---
name: prd-writer
description: "Guide users through writing Product Requirements Documents (PRDs) and decomposing them into executable technical tasks. Use when creating a PRD, product spec, product one-pager, feature brief, PRP, or when breaking requirements into tasks with estimates, sprint planning, or technical decomposition."
---

# PRD Writer & Task Decomposition

Write PRDs that connect business goals to product decisions, then decompose them into executable technical tasks. A PRD is not a feature list — it is a strategic document that aligns a team around a problem worth solving, the evidence behind it, and what success looks like.

## Core Principles

These principles come from how top PMs at Google, Asana, Airbnb, and other companies approach product documentation:

1. **Connect the dots** — A PRD bridges the gap from high-level business goal to concrete feature work. Every section should make one more "dot" visible. If a reader cannot trace a line from company strategy to the proposed solution, dots are missing. *(Jackie Bavaro, ex-Asana)*

2. **Start with the problem, not the solution** — Resist jumping to features. Frame the customer pain and the business opportunity first. If multiple people read the problem statement and imagine different solutions, the problem is well-framed. *(Melissa Perri, "Escaping the Build Trap")*

3. **Define "done" before starting** — Ask: "When we release this, what do we hope will happen? What metrics will change?" If nobody can answer, the PRD is not ready. *(Melissa Perri)*

4. **Write for alignment, not completeness** — A PRD nobody reads is worse than no PRD. Tailor length and detail to the audience and decision at hand. *(Ken Norton, ex-Google)*

5. **Make scope explicit** — What you leave out is as important as what you include. A "Non-Goals" section prevents scope creep more effectively than any meeting. *(Jackie Bavaro)*

---

## When to Use Each Format

| Format | Length | When to Use |
|--------|--------|-------------|
| **One-Pager** | 1-2 pages | Early-stage ideas, quick alignment, low-risk features |
| **Standard PRD** | 3-5 pages | Most features, cross-team initiatives, medium complexity |
| **Comprehensive PRD** | 5-10 pages | Platform changes, new product lines, high-risk bets, regulatory |

Start with a One-Pager. Upgrade to Standard or Comprehensive only when the decision demands it.

---

## PRD Template

### Frontmatter

```
Title:        [Descriptive name — not a project codename]
Author:       [PM name]
Status:       [Draft | In Review | Approved | Archived]
Last updated: [Date]
Reviewers:    [Engineering lead, Design lead, key stakeholders]
```

### 1. Problem Statement

Write 2-4 paragraphs that answer:

- **Who** is affected? (specific user segment, not "users")
- **What** pain or unmet need do they have? (observable behavior, not assumption)
- **Why now?** (market shift, data signal, strategic priority, customer escalation)
- **What happens if we do nothing?** (quantify the cost of inaction)

**Guidance:**

- Use customer quotes, support ticket data, or usage metrics as evidence.
- Avoid embedding your solution in the problem statement. "Users need a dashboard" is a solution. "Users cannot see their progress toward monthly goals" is a problem.
- If the problem came from a stakeholder request, translate the request into the underlying need.

**Ask the user:**

1. "Who specifically is experiencing this problem?"
2. "How do you know this is a real problem? What evidence do you have?"
3. "What are people doing today to work around this?"
4. "Why is this the right time to solve it?"

### 2. Goals and Success Metrics

Define 2-4 measurable outcomes. Each goal needs a metric, a baseline, and a target.

| Goal | Metric | Baseline | Target | Timeframe |
|------|--------|----------|--------|-----------|
| Reduce churn in segment X | Monthly churn rate | 8% | 5% | 90 days post-launch |
| Increase activation | % completing onboarding | 40% | 60% | 60 days post-launch |

**Guidance:**

- Distinguish **leading indicators** (engagement, adoption) from **lagging indicators** (revenue, churn). Include both.
- Ask: "If we ship this and the metrics don't move, was it a failure?" If yes, the metrics are right.
- Include a **guardrail metric** — something that should NOT get worse.
- Avoid vanity metrics (page views, signups without activation).

**Ask the user:**

1. "What do we hope will happen when we release this?"
2. "How will you measure whether this worked?"
3. "What metric should definitely NOT get worse?"

### 3. User Stories and Use Cases

Write 3-8 user stories:

> **As a** [specific user persona], **I want to** [action], **so that** [outcome/value].

Expand the top 2-3 stories into brief use cases:

```
Use Case: [Name]
Actor:     [Persona]
Trigger:   [What initiates this flow]
Flow:      1. User does X → 2. System responds with Y → 3. User sees Z
Success:   [What "done" looks like for this user]
Edge case: [What could go wrong]
```

Prioritize stories by frequency and impact. Mark P0 (must-have) vs P1 (should-have) vs P2 (nice-to-have).

### 4. Proposed Solution

Describe the high-level approach (NOT a spec — a direction):

- **What** are we building? (1-2 paragraph overview)
- **Why this approach?** (alternatives considered and why rejected)
- **Key design decisions** already made and their rationale

Include rough wireframes or flow diagrams if available. Call out what is intentionally NOT included in v1.

### 5. Scope and Non-Goals

**In Scope (v1):**
- [ ] Capability 1
- [ ] Capability 2
- [ ] Capability 3

**Non-Goals (explicitly out of scope):**
- NOT: [thing someone might assume is included]
- NOT: [future version capability]
- NOT: [adjacent problem we are not solving]

Be specific: "Not building admin dashboard" is better than "Not building extra features."

### 6. Constraints and Architecture Decisions

| Constraint | Value |
|-----------|-------|
| **Deadline** | [date/period or "Not specified"] |
| **Budget** | [hours/cost or "Not specified"] |
| **Technology** | [stack/restrictions or "Not specified"] |
| **Dependencies** | [systems/teams or "Not specified"] |
| **Quality** | [standards or "Not specified"] |

**Architecture Decisions** (optional):

| Decision | Alternatives | Reason |
|----------|-------------|--------|
| [Choice made] | [Options considered] | [Why this choice] |

### 7. Dependencies and Risks

| Dependency/Risk | Type | Impact | Mitigation |
|-----------------|------|--------|------------|
| API from team X not ready | Dependency | Blocks integration | Stub the API; align on date |
| Users may not adopt new flow | Risk | Low adoption | A/B test before full rollout |

Identify dependencies on other teams early — they are the #1 cause of PRD delays.

### 8. Timeline and Milestones

| Milestone | Date | Description |
|-----------|------|-------------|
| Design review | Week 2 | Finalize UX flows |
| Engineering kick-off | Week 3 | Begin implementation |
| Beta launch | Week 6 | 10% of users |
| GA launch | Week 8 | Full rollout + metric review |

Include a **decision checkpoint** before full launch to review beta metrics against success criteria.

### 9. Open Questions

- [ ] Question 1 — Owner: [name], Due: [date]
- [ ] Question 2 — Owner: [name], Due: [date]

A PRD with no open questions is either trivial or the author has not thought deeply enough.

---

## One-Pager Template

For early-stage alignment, use this abbreviated format:

```markdown
# [Feature Name] — One-Pager

**Problem**: [2-3 sentences on who, what pain, why now]

**Hypothesis**: If we [solution], then [outcome], as measured by [metric].

**Proposed approach**: [3-5 bullet points describing what we'd build]

**Non-goals**: [2-3 things explicitly out of scope]

**Success criteria**: [2-3 measurable outcomes with targets]

**Open questions**: [2-3 things we need to figure out]

**Next step**: [What happens after this one-pager is reviewed]
```

---

## Conversation Flow

When helping a user write a PRD and optionally decompose it into tasks, follow this sequence. Ask ONE question at a time — do not overwhelm.

### Phase 1: Understand Context

1. "What problem are you trying to solve and for whom?"
2. "What evidence do you have that this is a real problem? (data, customer quotes, support tickets)"
3. "How does this connect to your team's or company's current strategy?"
4. "Is this a new feature, bug fix, refactoring, or documentation?"
5. "What level of detail do you need — a one-pager, standard PRD, or comprehensive PRD?"

### Phase 2: Define Success

6. "What do you hope will happen when you ship this? What metrics will change?"
7. "What's the guardrail — what should NOT get worse?"
8. "Do you have any deadline, budget, or technology constraints?"

### Phase 3: Explore Solution Space

9. "What approaches have you considered? Why this one?"
10. "What are you explicitly NOT building in v1?"

### Phase 4: Identify Risks

11. "What dependencies do you have on other teams?"
12. "What's the biggest risk to this project?"

### Phase 5: Draft and Review

13. Generate the PRD using the appropriate template.
14. Highlight sections that are thin or based on assumptions rather than evidence.
15. Suggest specific next steps: "Validate assumption X with user research before finalizing."

### Phase 6: Task Decomposition (Optional)

After completing the PRD, offer: "Want me to decompose this into executable technical tasks with estimates?"

If yes, transition to the Task Decomposition Mode below. Maintain context — use the same terms, reference requirements by number, respect constraints.

---

## Anti-Patterns

| Anti-Pattern | Why It Fails | Fix |
|-------------|--------------|-----|
| **PRD as feature list** | No problem framing, no success criteria | Start with Problem Statement and Goals before features |
| **PRD nobody reads** | Too long, too detailed too early | Match format to decision size; use One-Pager first |
| **Solution masquerading as problem** | "We need to build X" skips the "why" | Rewrite: what customer pain does X solve? |
| **Vanity metrics** | "Increase page views" has no business value | Use outcome metrics tied to retention, revenue, or activation |
| **Missing Non-Goals** | Scope creeps because boundaries were never set | Add explicit Non-Goals; review with stakeholders |
| **No decision checkpoint** | Feature ships, nobody checks if it worked | Add milestone for metric review 30-60 days post-launch |
| **Strategy-disconnected PRD** | Feature exists in isolation from company goals | Add "This supports [strategic pillar]" in Problem Statement |
| **Vague requirements** | "System should be fast" is untestable | Demand specifics: "Response time < 300ms at p95" |
| **Tasks > 8 points** | Too large to estimate or execute reliably | Always break down; see decomposition patterns |

---

## Task Decomposition Mode

Activated after a PRD is complete, or when user requests task breakdown directly (`/tasks`, "generate tasks", "break into tasks").

### Activation Questions

1. "Tasks for ALL requirements or specific ones?"
2. "Need complexity estimates?"
3. "Want execution order suggestion?"
4. "Team works in sprints? How many days?"

### Analysis Before Generation

Before generating tasks, analyze:
- **Type** of each requirement (Backend / Frontend / Database / DevOps / Docs / Tests)
- **Dependencies** between requirements
- **Complexity** and uncertainties
- **Natural phases** (Setup → Core → Tests → Deploy)

### Task Format

```markdown
## Requirement: [copy from PRD]

### Task 1: [Clear and Actionable Name]
**Complexity**: [1, 3, 5, or 8 points]
**Type**: [Backend/Frontend/Infra/Docs/Tests]
**Dependencies**: [list or "None"]

**Objective**: [1 sentence of what this delivers]

**Details**:
1. [Specific technical step]
2. [Specific technical step]

**Files/Components Involved**:
path/file.ext → [What to do]

**Acceptance Criteria**:
- [ ] [How to validate it works]
- [ ] [Edge cases verified]

**Required Tests**:
- [ ] [Specific unit test]
- [ ] [Integration/E2E test]
```

### Execution Plan Format

```markdown
# Execution Plan: [PRD Title]

## Summary
- **Total tasks**: [N] | **Estimate**: [X points] (~[Y days])

## Phase 1: Foundation
**Objective**: [phase goal] | **Duration**: [X pts]
1. **[Task]** - [X pts] - [Type] → [brief description]

## Phase 2: Core Implementation
[Same structure]

## Phase 3: Testing & Integration
[Same structure]

## Phase 4: Deploy & Validation
[Same structure]

## Identified Risks
| Risk | Impact | Mitigation | Task |
|------|--------|------------|------|
| [Risk] | High/Med/Low | [How to mitigate] | [#X] |

## Recommendations
- **Order**: [specific recommendation]
- **Parallelization**: [which tasks can run in parallel]
- **First sprint focus**: [task list]
```

---

## Scoring System

### Point Scale

| Points | Time | Characteristics | Examples |
|--------|------|-----------------|----------|
| **1** | < 2h | Isolated change, 1 file, no complex logic | Add form field, adjust CSS |
| **3** | 2-4h | Simple business logic, 2-3 files, known pattern | Basic CRUD, simple endpoint |
| **5** | 4-8h | Non-trivial logic, multiple components | External API integration |
| **8** | 8-16h | High complexity, interconnected parts | Complex system integration |
| **13+** | > 16h | **TOO LARGE** — must break down further | |

### Estimation Rules

- Estimate for ONE developer
- Include implementation + basic tests + expected debug time
- If in doubt, choose the LARGER number
- If > 8 points, ALWAYS break into smaller tasks

### Time Conversion

```
1 pt  = 1-2 hours
3 pts = 2-4 hours
5 pts ≈ 1 day
8 pts ≈ 1-2 days
```

---

## Common Decomposition Patterns

### Frontend + Backend Feature
```
1. Backend: API/Endpoints (5pts)
2. Frontend: UI Components (5pts)
3. Integration and Tests (3pts)
```

### External Integration
```
1. Research/Setup (3pts)
2. Core Implementation (5-8pts)
3. Resilience (retries, circuit breaker) (3-5pts)
4. Tests (3pts)
```

### Migration / Refactoring
```
1. Analysis (3pts)
2. Parallel Setup (5pts)
3. Incremental Migration — multiple tasks (5pts each)
4. Validation and Switch (5pts)
5. Cleanup (3pts)
```

### Performance Optimization
```
1. Profiling (3pts)
2. Quick Wins (3pts each)
3. Structural Optimizations (5-8pts each)
4. Final Validation (3pts)
```

---

## Risk Identification

| Level | Indicators |
|-------|------------|
| **HIGH** | External API dependency, new tech, downtime risk, data migration, critical performance |
| **MEDIUM** | Multiple integrations, unclear logic, tight deadline |
| **LOW** | Isolated task, easily revertible |

For each risk, define: trigger, impact, and mitigation plan.

---

## Quality Checklists

### PRD Checklist

- [ ] Problem statement is evidence-based, not assumption-based
- [ ] Goals have metrics with baselines, targets, and timeframes
- [ ] Guardrail metric defined (what should NOT get worse)
- [ ] User stories grounded in real behavior, prioritized (P0/P1/P2)
- [ ] Non-Goals section is specific and reviewed with stakeholders
- [ ] Dependencies identified with owners and dates
- [ ] Decision checkpoint milestone included
- [ ] Open questions have owners and due dates
- [ ] No contradictions between constraints and requirements
- [ ] Reader can trace a line from company strategy → problem → solution → metrics

### Task Decomposition Checklist

- [ ] All PRD requirements covered by tasks
- [ ] No task exceeds 8 points
- [ ] Dependencies between tasks identified
- [ ] All tasks have complexity estimates
- [ ] Test tasks included for each requirement
- [ ] Risks identified with mitigation plans
- [ ] Phases organized logically (Foundation → Core → Tests → Deploy)
- [ ] Parallelizable tasks identified
- [ ] First sprint scope is realistic

---

## Sources

Frameworks synthesized from:

- **Jackie Bavaro** (ex-Asana Head of Product, *Cracking the PM Career*) — Strategy as connecting dots; Non-Goals as scope protection. [Lenny's Podcast]
- **Melissa Perri** (*Escaping the Build Trap*, CEO of Product Institute) — Outcome-driven PM; "What do we hope will happen when we release this?"; discovery vs delivery. [Lenny's Podcast]
- **Ken Norton** (ex-Google PM lead) — Write for alignment not completeness; 10X vs 10% thinking. [Lenny's Podcast]
- **Melissa Perri & Denise Tilles** (*Product Operations*) — Strategy deployment; process standardization at scale. [Lenny's Podcast]
