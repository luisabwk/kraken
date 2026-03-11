---
name: opportunity-solution-tree
description: Build and structure Opportunity Solution Trees (OST) for product discovery. Use when helping define product strategy, map customer needs, structure the opportunity space, prioritize what to build, or run discovery interviews.
---

# Opportunity Solution Tree (OST)

> Framework by Teresa Torres for connecting business outcomes to customer opportunities to solutions. Use this when helping a team or individual go from "what outcome do we want?" to "what should we build?"

## What Is an OST

A tree visual with four layers:

```
Outcome (root)
 └── Opportunity Space (needs, pain points, desires)
      └── Solutions (ideas that address opportunities)
           └── Assumption Tests (experiments to de-risk solutions)
```

The purpose: add structure to the messy problem of "I have an outcome — how do I figure out what to build?" Most teams know how to execute prescribed features. Few know how to work backward from an outcome.

## Step-by-Step: Building an OST

### Step 1: Define the Outcome

Place a single, measurable business outcome at the root.

- Derive it from the business model — what metric matters most for this team right now?
- Must be something the product trio (PM + Designer + Engineer) can influence.
- If the team is prescribed features instead of outcomes, help them identify the implicit outcome their work contributes to.

Examples:
- "Increase weekly active engagement with streaming content"
- "Reduce time-to-first-value for new users"
- "Increase conversion from trial to paid"

Bad outcomes: vague goals like "make the product better" or "improve UX."

### Step 2: Create an Experience Map (Top-Level Opportunities)

Map the customer's end-to-end experience related to that outcome. This becomes the first branching layer.

Rules:
- Capture 3–7 distinct moments/steps in the customer journey.
- Use the customer's perspective, not the product's feature set.
- Even competitors share the same experience map — it's about the human experience, not your product.

Netflix example (outcome: increase engagement):
1. **Trigger** — "I want to watch something"
2. **Deciding what to watch** — browsing, choosing platform
3. **Evaluating content** — "Is this show any good?"
4. **Viewing experience** — actually watching
5. **Post-viewing** — "What's next?" / binge loop

Each step is a top-level opportunity bucket. Keep to 3–7 (cognitive processing limit).

### Step 3: Collect Customer Stories via Interviews

Opportunities emerge from real customer stories, not brainstorming. Interview weekly (continuous discovery cadence).

#### The Story-Based Interview Technique

Do NOT ask direct questions like:
- "What do you like about Netflix?"
- "How do you decide what to watch?"
- "What features do you wish existed?"

These produce unreliable, decontextualized answers. Instead, collect a specific instance:

**Opening prompt**: "Tell me about the last time you [did the relevant activity]."

Then follow the timeline:
1. **Set the scene** — "Where were you? Who were you with?"
2. **Walk through chronologically** — "What happened next?"
3. **Dig into friction points** — "You said you couldn't find anything. Tell me more about that."
4. **Summarize and redirect** — Reflect what you heard, then go deeper on moments of interest.

Key principles:
- The interview should feel like having a beer with a friend, not a 50-question interrogation.
- You can run an entire interview from one opening question plus "what happened next?"
- Focus on **actual past behavior**, never hypotheticals ("what would you do if...").
- Listen for needs the customer isn't even aware of — mediocrity is invisible to the people living it.
- The sign of a good interview: the customer says "When can we do this again?"

#### Common Interview Mistakes

| Mistake | Why It's Harmful |
|---------|-----------------|
| 50-question protocol | Breaks conversational flow; you stop listening |
| Asking "why" directly | Gets rationalized, unreliable answers |
| Staying shallow ("Great, tell me another story") | Misses all the value in the details |
| Focusing on opinions instead of behavior | Opinions don't predict behavior |
| Worrying about asking favors | People love telling their stories when you listen well |

### Step 4: Identify Opportunities (NOT Solutions)

Extract unmet needs, pain points, and desires from the stories. Place them under the relevant experience map step.

#### The Critical Distinction: Opportunity vs. Solution

> "98% of people that write opportunities write them as solutions." — Teresa Torres

An **opportunity** describes a customer's unmet need, pain point, or desire.
A **solution** describes a product change or feature.

| Type | Example |
|------|---------|
| Opportunity | "It's hard to select specific letters on the Apple TV onscreen keyboard with the remote" |
| Solution | "Add voice search to Apple TV" |
| Opportunity | "I can't tell if this show is good before committing to it" |
| Solution | "Show Rotten Tomatoes scores on the browse page" |
| Opportunity | "I don't remember where I left off in a series" |
| Solution | "Add a 'Continue Watching' row" |

**Test**: If two competitors (Netflix and Hulu) would share this problem statement, it's likely an opportunity. If it's specific to a product implementation, it's a solution.

#### Opportunity Framing Rules

- Be specific, not generic. "I wish this was easier to use" is too broad — what specifically is hard, for whom, in what moment?
- Good framing: "It's hard to enter my password by selecting letters on the screen with the Apple TV remote."
- The more specific the opportunity, the more solvable it becomes.
- Each opportunity should be something a team can realistically address.

### Step 5: Structure the Hierarchy (Vertical Depth)

Opportunities decompose vertically. As you move down the tree, opportunities get smaller and more specific.

```
Can't decide what to watch (big, evergreen)
 ├── I can't tell if a show is good (medium)
 │    ├── I want to know who's in the cast (small, solvable)
 │    ├── I want to see if people like me enjoyed it (small, solvable)
 │    └── I can't tell the genre/tone from the thumbnail (small, solvable)
 ├── I've seen everything that interests me (medium)
 └── I don't know what's new this week (medium)
```

Why this matters:
- Top-level opportunities are evergreen (Netflix will always work on "deciding what to watch").
- Leaf-level opportunities are small enough to solve in a continuous cadence.
- You're always contributing to the bigger problem by solving smaller ones.
- The tree lets you make strategic decisions about where to play.

### Step 6: Generate and Compare Solutions

Below each leaf opportunity, brainstorm multiple solutions. Never commit to the first idea.

Rules:
- Work with at least 3 solutions per opportunity (compare and contrast).
- A product trio should collaborate on solutions — not just the PM deciding.
- Solutions from different teams addressing the same opportunity may look very different — that's the differentiator.

### Step 7: Assumption-Test Solutions

Break each solution into its underlying assumptions. Prioritize the riskiest assumptions. Test them with small, fast experiments.

- Do NOT test the whole idea at once (too slow, too expensive).
- Run 6–12 small assumption tests per week across ~3 candidate solutions.
- At week's end, compare and contrast which solutions have the strongest foundation.
- Assumption testing IS the start of delivery — there's no clean separation.

## Common Mistakes (Summary)

| # | Mistake | Fix |
|---|---------|-----|
| 1 | Writing solutions instead of opportunities | Apply the competitor test: would a rival share this problem? |
| 2 | Framing opportunities too broadly | Get specific: who, what moment, what's the friction? |
| 3 | Asking direct questions in interviews | Collect stories: "Tell me about the last time..." |
| 4 | Treating discovery as a phase before delivery | Run both in parallel — always delivering, always discovering |
| 5 | Testing whole ideas instead of assumptions | Break ideas into assumptions, test the riskiest first |
| 6 | Waiting for permission to talk to customers | Start with your personal network — you don't need formal channels |
| 7 | Only considering one solution per opportunity | Always compare at least 3 options |
| 8 | Shallow interviews that skip the details | Dig in: "You said X — tell me more about that" |

## Key Terminology

| Term | Definition |
|------|-----------|
| **Outcome** | Measurable business result the team drives (root of the tree) |
| **Opportunity** | Unmet need, pain point, or desire — always from the customer's perspective |
| **Experience Map** | 3–7 step timeline of the customer's journey, used to structure top-level opportunities |
| **Product Trio** | PM + Designer + Engineer — the core discovery and decision-making unit |
| **Continuous Discovery** | Ongoing feedback loops with customers (min. 1 interview/week) running in parallel with delivery |
| **Assumption Test** | Small, fast experiment targeting a single risky assumption underlying a solution |
| **Opportunity Space** | The full set of needs, pain points, and desires organized hierarchically |

## When to Use This Skill

- Structuring what to build next for a product team
- Helping a PM shift from feature-factory to outcome-oriented thinking
- Mapping the customer journey to find where value can be created
- Preparing discovery interview guides
- Reviewing whether a team's "opportunities" are actually solutions in disguise
- Prioritizing across a large space of possible problems to solve

## Agent Guidelines

When helping someone build an OST:

1. **Always start with the outcome.** If the user doesn't have one, help derive it from their business model.
2. **Map the experience before listing opportunities.** The experience map provides structure.
3. **Challenge anything that sounds like a solution.** Apply the competitor test.
4. **Push for specificity.** "Easier to use" is never an opportunity — dig until you find the specific friction.
5. **Recommend story-based interviewing.** If the user hasn't talked to customers, the tree will be based on assumptions — flag that explicitly.
6. **Keep the tree manageable.** 3–7 top-level branches, 2–4 levels deep max.
7. **Encourage multiple solutions.** Never let the user commit to the first idea without considering alternatives.

---

*Source: Lenny's Podcast — "Build better products with continuous product discovery" with Teresa Torres (48:18). Based on the framework from her book "Continuous Discovery Habits." Blog and courses at producttalk.org.*
