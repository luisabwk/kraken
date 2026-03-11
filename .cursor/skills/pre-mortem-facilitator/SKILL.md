---
name: pre-mortem-facilitator
description: Facilitate a pre-mortem session using Shreyas Doshi's Tigers/Paper Tigers/Elephants framework. Use when the user is planning a launch, starting a critical project, preparing for a major initiative, or wants to proactively identify risks before something goes wrong.
---

# Pre-Mortem Facilitator

Run a structured pre-mortem to surface hidden risks, build psychological safety, and create shared threat vocabulary — so you never have to do an ugly post-mortem.

> "If you do a pre-mortem right, you will not have to do an ugly post-mortem."
> — Shreyas Doshi

## When to Use

- Before a major product launch
- At the start of a critical project or initiative
- Before a go-to-market campaign
- When a team is overly optimistic and nobody is raising concerns
- When stakes are high and failure would be costly

## Core Concept

A pre-mortem inverts the post-mortem: instead of analyzing failure after it happens, the team **imagines failure in advance** and works backwards to identify what could go wrong. The genius is in the opening prompt — it grants psychological safety for people to voice concerns they'd normally suppress.

## The Three Threat Categories

### 1. Tigers (Real Threats)

Actual dangers that could kill the project. These are concrete, specific risks.

**Examples:**
- "Our payment integration has a known edge case that could cause double charges at scale"
- "The dependency team hasn't committed to the API we need by launch date"
- "We don't have a rollback plan if latency spikes above 500ms"

### 2. Paper Tigers (False Threats)

Things that **seem** scary but aren't actually dangerous. Naming these prevents wasted energy.

**Examples:**
- "Competitor X launched something similar, but their approach is fundamentally different from ours"
- "Engineering estimates seem tight, but we've shipped similar scope in less time before"
- "Legal flagged a concern, but it only applies to EU markets we're not targeting"

### 3. Elephants (Unspoken Truths)

The elephant in the room — concerns nobody is voicing. Not necessarily project-killers, but realities the team is avoiding.

**Examples:**
- "We're assuming PR coverage will drive adoption, but we have no distribution plan"
- "The exec sponsor hasn't actually reviewed the final scope"
- "Our target metric is vanity — it won't tell us if users truly find value"

## Step-by-Step Facilitation Process

### Step 0: Decide Scope and Audience

| Launch Size | Meeting Structure |
|-------------|-------------------|
| **Large launch** | Two separate sessions: (1) Engineering/Product risks, (2) Go-to-market risks |
| **Small/medium launch** | One combined session with all functions |

**Who to invite:** Every person from every function involved in the initiative. For engineering sessions, include **every engineer** — not just leads. Include PM, design, and relevant cross-functional partners.

### Step 1: Set the Prompt (2 min)

Open the meeting with this exact framing:

> "Imagine it is six months from now. This project has **miserably failed**. It's our worst-case scenario. Now, let's work backwards: **what went wrong?** What contributed to this utter failure?"

Key: Use vivid, specific language. "Miserably failed" and "utter failure" are intentional — they create psychological permission to think negatively in a way that "what could go wrong?" does not.

### Step 2: Silent Brainstorm (5–10 min)

- Open a shared document (template below)
- Each team member writes their Tigers, Paper Tigers, and Elephants **independently and silently**
- Critical: Entries must be **hidden from others** during this phase (use a tool that supports this, or separate sections per person)
- Silence prevents groupthink and anchoring bias

### Step 3: Round-Robin Sharing (15–25 min)

- Go around the room one person at a time
- Each person reads their entries aloud
- **No debate or discussion during sharing** — just listen and note
- The facilitator may ask brief clarifying questions only

### Step 4: Vote on Scariest Tigers (5 min)

Each participant picks the **one Tiger from someone else's list** (not their own) that scares them the most. This surfaces which threats have the broadest resonance across the team.

### Step 5: Prioritize and Create Action Plan (Post-Meeting)

The **pre-mortem leader** (typically the PM) takes ownership of:

1. Reviewing all entries from the shared document
2. Ranking Tigers by severity and vote count
3. Identifying which Elephants need to become explicit decisions
4. Discarding or acknowledging Paper Tigers
5. Creating a **Pre-Mortem Action Plan** with:
   - Top 3–5 Tigers to mitigate
   - Assigned owners for each mitigation
   - Timeline for resolution
   - Elephants that require a team decision

### Step 6: Share and Track

- Distribute the action plan to the full team within 48 hours
- The pre-mortem leader keeps themselves accountable for progress
- Reference Tigers in future meetings as shared vocabulary

## Pre-Mortem Document Template

```markdown
# Pre-Mortem: [Project/Launch Name]
**Date:** [Date]
**Facilitator:** [Name]
**Prompt:** Imagine this project has miserably failed 6 months from now. What went wrong?

## Participants
| Name | Role |
|------|------|
|      |      |

## Tigers (Real Threats)
| # | Threat | Raised By | Votes | Severity |
|---|--------|-----------|-------|----------|
| 1 |        |           |       |          |

## Paper Tigers (False Threats)
| # | Seeming Threat | Why It's Not Real | Raised By |
|---|----------------|-------------------|-----------|
| 1 |                |                   |           |

## Elephants (Unspoken Truths)
| # | Elephant | Raised By |
|---|----------|-----------|
| 1 |          |           |

## Action Plan
| Priority | Tiger/Elephant | Mitigation | Owner | Due Date | Status |
|----------|---------------|-------------|-------|----------|--------|
| P0       |               |             |       |          |        |
```

## Key Principles

### Psychological Safety Is the Mechanism

The pre-mortem works because it **licenses negativity**. In modern organizations, nobody wants to be the pessimist. The "imagine failure" prompt flips the social dynamic — suddenly, raising concerns is the assignment, not a personality flaw.

### Shared Vocabulary Outlasts the Meeting

The biggest long-term benefit: after a pre-mortem, team members start using "Tiger" and "Elephant" in everyday conversations. A PM might say "I have a tiger" in a standup, and now it's socially acceptable to raise red flags at any time. This cultural shift is more valuable than any single risk identified.

### The Leader Owns the Output

The pre-mortem leader (usually the PM) is responsible for converting raw brainstorm output into a prioritized, actionable plan. The meeting generates signal; the leader extracts the plan.

### Low Cost, High Upside

A pre-mortem is one meeting (30–60 min) + follow-up prioritization work. The cost is negligible compared to the damage of a preventable failure, a public backlash, or a multi-week post-mortem cleanup.

## Anti-Patterns

| Anti-Pattern | Why It Fails | Fix |
|-------------|-------------|-----|
| Skipping silent brainstorm | Loudest voices dominate; groupthink kills signal | Always start with silent individual writing |
| Debating during sharing | Shuts down psychological safety | Enforce listen-only during round-robin |
| Not voting | All tigers seem equal; no prioritization signal | Always vote on scariest tiger from someone else |
| No action plan | Pre-mortem becomes cathartic venting session | Leader must produce action plan within 48h |
| Only inviting leads | Front-line engineers and ICs see risks leaders miss | Invite every contributor, not just managers |
| Running it too late | Risks are already locked in; no time to mitigate | Run early in the project lifecycle |
| Trying to solve everything | Dilutes focus; team gets overwhelmed | Pick top 3–5 tigers only |

## Facilitator Checklist

```
Pre-Mortem Preparation:
- [ ] Identify scope: engineering-only, GTM-only, or combined?
- [ ] Invite ALL contributors from every function involved
- [ ] Prepare shared document with template
- [ ] Set meeting for 30–60 min depending on team size

During the Meeting:
- [ ] Deliver the failure prompt with vivid language
- [ ] Run 5–10 min silent brainstorm (hidden entries)
- [ ] Facilitate round-robin sharing (no debate)
- [ ] Run voting on scariest tigers (from someone else's list)
- [ ] Close by asking: "How did that feel?" (expect smiles)

After the Meeting:
- [ ] Prioritize all entries within 48 hours
- [ ] Create action plan with owners and deadlines
- [ ] Share action plan with the full team
- [ ] Track progress on top tiger mitigations
- [ ] Reinforce Tiger/Elephant vocabulary in future meetings
```

## Source

- **Lenny's Podcast**: "The art of product management | Shreyas Doshi (Stripe, Twitter, Google, Yahoo)" — [YouTube](https://www.youtube.com/watch?v=YP_QghPLG-8)
- Shreyas credits the original pre-mortem idea to Gary Klein's Harvard Business Review article
- Framework refined through practice at Stripe and advisory work with startups
