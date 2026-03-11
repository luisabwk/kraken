---
name: prd-writer
description: "Guide users through writing effective Product Requirements Documents (PRDs) using frameworks from top PMs. Use when creating a PRD, product requirements document, product spec, product one-pager, feature brief, or when someone needs to document what to build and why."
---

# PRD Writer

Write PRDs that connect business goals to product decisions. A PRD is not a feature list — it is a strategic document that aligns a team around a problem worth solving, the evidence behind it, and what success looks like.

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

---

### 1. Problem Statement

Write 2-4 paragraphs that answer:

- **Who** is affected? (specific user segment, not "users")
- **What** pain or unmet need do they have? (observable behavior, not assumption)
- **Why now?** (market shift, data signal, strategic priority, customer escalation)
- **What happens if we do nothing?** (quantify the cost of inaction)

**Guidance:**

- Use customer quotes, support ticket data, or usage metrics as evidence.
- Avoid embedding your solution in the problem statement. "Users need a dashboard" is a solution. "Users cannot see their progress toward monthly goals" is a problem.
- If the problem came from a stakeholder request, translate the request into the underlying need: "Sales asked for X" → "Customers in segment Y are churning because of Z."

**Questions to ask the user:**

1. "Who specifically is experiencing this problem?"
2. "How do you know this is a real problem? What evidence do you have?"
3. "What are people doing today to work around this?"
4. "Why is this the right time to solve it?"

---

### 2. Goals and Success Metrics

Define 2-4 measurable outcomes. Each goal needs a metric, a baseline, and a target.

| Goal | Metric | Baseline | Target | Timeframe |
|------|--------|----------|--------|-----------|
| Reduce churn in segment X | Monthly churn rate | 8% | 5% | 90 days post-launch |
| Increase activation | % completing onboarding | 40% | 60% | 60 days post-launch |

**Guidance:**

- Distinguish **leading indicators** (engagement, adoption) from **lagging indicators** (revenue, churn). Include both.
- Ask: "If we ship this and the metrics don't move, was it a failure?" If yes, the metrics are right. If not, find better ones.
- Avoid vanity metrics (page views, signups without activation).
- Include a **guardrail metric** — something that should NOT get worse (e.g., "page load time stays under 2s").

**Questions to ask the user:**

1. "What do we hope will happen when we release this?"
2. "How will you measure whether this worked?"
3. "What metric should definitely NOT get worse?"
4. "When will you evaluate results — 30, 60, or 90 days?"

---

### 3. User Stories and Use Cases

Write 3-8 user stories in the format:

> **As a** [specific user persona], **I want to** [action], **so that** [outcome/value].

Then expand the top 2-3 stories into brief use cases:

```
Use Case: [Name]
Actor:     [Persona]
Trigger:   [What initiates this flow]
Flow:
  1. User does X
  2. System responds with Y
  3. User sees Z
Success:   [What "done" looks like for this user]
Edge case: [What could go wrong]
```

**Guidance:**

- Ground stories in real customer interviews or observed behavior, not hypothetical personas.
- Prioritize stories by frequency and impact. Mark which are P0 (must-have) vs P1 (should-have) vs P2 (nice-to-have).
- If you have no real user research yet, flag the stories as assumptions and propose a validation plan.

**Questions to ask the user:**

1. "Can you walk me through a real user's journey with this problem today?"
2. "What are the 2-3 most common scenarios?"
3. "What's the edge case you're most worried about?"

---

### 4. Proposed Solution

Describe the high-level approach. This is NOT a spec — it is a direction.

- **What** are we building? (1-2 paragraph overview)
- **Why this approach?** (what alternatives were considered and why they were rejected)
- **Key design decisions** already made and their rationale

**Guidance:**

- Include rough wireframes, mockups, or flow diagrams if available — visual alignment is faster than written alignment.
- Call out what is intentionally NOT included in v1.
- If the solution is not yet defined, describe the discovery plan instead: what experiments, prototypes, or research will inform the solution.

---

### 5. Scope and Non-Goals

**In Scope (v1):**
- [ ] Capability 1
- [ ] Capability 2
- [ ] Capability 3

**Non-Goals (explicitly out of scope):**
- NOT: [thing that someone might assume is included]
- NOT: [future version capability]
- NOT: [adjacent problem we are not solving]

**Guidance:**

- Non-Goals prevent scope creep. Be specific: "Not building admin dashboard" is better than "Not building extra features."
- If a stakeholder keeps pushing for something in Non-Goals, escalate it as a separate initiative rather than expanding this PRD.
- Revisit scope when the team estimates effort. If the scope exceeds the available time, cut from the bottom of the priority list, not from quality.

---

### 6. Dependencies and Risks

| Dependency/Risk | Type | Impact | Mitigation |
|-----------------|------|--------|------------|
| API from team X not ready | Dependency | Blocks integration | Stub the API; align on delivery date |
| Users may not adopt new flow | Risk | Low adoption | Run A/B test before full rollout |
| Regulatory approval needed | Dependency | Blocks launch | Start review process in parallel |

**Guidance:**

- Dependencies on other teams are the #1 cause of PRD delays. Identify them early and get commitments.
- For each risk, define: what is the trigger, what is the impact, and what is the mitigation plan.

---

### 7. Timeline and Milestones

| Milestone | Date | Description |
|-----------|------|-------------|
| Design review | Week 2 | Finalize UX flows |
| Engineering kick-off | Week 3 | Begin implementation |
| Internal dogfood | Week 6 | Team tests end-to-end |
| Beta launch | Week 8 | 10% of users |
| GA launch | Week 10 | Full rollout |

**Guidance:**

- A PRD timeline is directional, not a commitment. It exists to pressure-test feasibility.
- If working backward from the timeline reveals the plan is infeasible, surface this early. Either cut scope or extend timeline — do not hide the gap.
- Include a "decision checkpoint" before full launch where you review beta metrics against success criteria.

---

### 8. Open Questions

List unresolved questions that need answers before or during development:

- [ ] Question 1 — Owner: [name], Due: [date]
- [ ] Question 2 — Owner: [name], Due: [date]

A PRD with no open questions is either trivial or the author has not thought deeply enough.

---

## Anti-Patterns to Avoid

| Anti-Pattern | Why It Fails | Fix |
|-------------|--------------|-----|
| **PRD as feature list** | No problem framing, no success criteria, no strategy connection | Start with Problem Statement and Goals before any features |
| **PRD nobody reads** | Too long, too detailed too early, written for the author not the audience | Match format to decision size; use the One-Pager for early alignment |
| **Solution masquerading as problem** | "We need to build X" skips the "why" | Rewrite: what customer pain does X solve? Is X the only solution? |
| **Vanity metrics** | "Increase page views" doesn't connect to business value | Use outcome metrics tied to retention, revenue, or activation |
| **Missing Non-Goals** | Scope creeps because boundaries were never set | Add explicit Non-Goals section; review it with stakeholders |
| **No decision checkpoint** | Feature ships, nobody checks if it worked | Add a milestone for metric review 30-60 days post-launch |
| **Strategy-disconnected PRD** | Feature exists in isolation from company goals | Add a line in Problem Statement: "This supports [strategic pillar]" |

---

## Conversation Flow for the Agent

When helping a user write a PRD, follow this sequence:

### Phase 1: Understand Context
1. "What problem are you trying to solve and for whom?"
2. "What evidence do you have that this is a real problem? (data, customer quotes, support tickets)"
3. "How does this connect to your team's or company's current strategy?"
4. "What level of detail do you need — a one-pager, standard PRD, or comprehensive PRD?"

### Phase 2: Define Success
5. "What do you hope will happen when you ship this? What metrics will change?"
6. "What's the guardrail — what should NOT get worse?"

### Phase 3: Explore Solution Space
7. "What approaches have you considered? Why this one?"
8. "What are you explicitly NOT building in v1?"

### Phase 4: Identify Risks
9. "What dependencies do you have on other teams?"
10. "What's the biggest risk to this project?"

### Phase 5: Draft and Review
11. Generate the PRD using the template above.
12. Highlight any sections that are thin or based on assumptions rather than evidence.
13. Suggest specific next steps: "Validate assumption X with user research before finalizing."

Ask ONE question at a time. Do not overwhelm with multiple questions.

---

## One-Pager Template (Quick Version)

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

## Sources

Frameworks synthesized from:

- **Jackie Bavaro** (ex-Asana Head of Product, co-author of *Cracking the PM Career*) — Strategy as connecting dots from business goals to features; the three components of strategy (vision, strategic framework, roadmap); collaborative strategy development. [Lenny's Podcast]
- **Melissa Perri** (author of *Escaping the Build Trap*, CEO of Product Institute) — Outcome-driven product management; the danger of being an order-taker; "What do we hope will happen when we release this?"; discovery vs delivery balance. [Lenny's Podcast]
- **Ken Norton** (ex-Google PM lead, executive coach) — The art vs science of PM; 10X vs 10% thinking; creative vs reactive leadership; evaluating how features come to be. [Lenny's Podcast]
- **Melissa Perri & Denise Tilles** (*Product Operations*) — Strategy deployment; connecting value back to teams; process standardization for product management at scale. [Lenny's Podcast]
