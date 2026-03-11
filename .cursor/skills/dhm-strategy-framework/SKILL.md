---
name: dhm-strategy-framework
description: Evaluate and strengthen product strategy using Gibson Biddle's DHM framework (Delight, Hard-to-copy, Margin-enhancing). Use when the user asks about product strategy, competitive advantage, feature prioritization trade-offs, or wants to stress-test whether a product idea is strategically sound.
---

# DHM Strategy Framework

Gibson Biddle's product strategy model, developed during his time as VP of Product at Netflix (2005–2010). The core thesis: **a product strategy is a set of hypotheses about how you will delight customers in hard-to-copy, margin-enhancing ways.**

## The DHM Model

Evaluate every strategy, feature, or initiative against three dimensions simultaneously:

| Dimension | Core Question | How to Measure |
|-----------|--------------|----------------|
| **Delight** | Does this make the experience 10X better for customers? | Retention lift in A/B tests |
| **Hard-to-copy** | Does this build durable competitive advantage? | Which of the 5 advantage types does it strengthen? |
| **Margin-enhancing** | Does this improve unit economics or grow revenue? | Revenue impact, cost reduction, or retention-driven LTV increase |

An ideal strategy scores high on all three. Most real initiatives involve trade-offs — the framework makes those trade-offs explicit.

---

## Step 1: Evaluate Delight

Delight is not satisfaction. It is a 10X improvement over what exists (Peter Thiel's Zero to One standard).

### Measuring Delight via Retention

Run an A/B test where the test cell receives the "ideal" version of the experience. Measure:

- **Primary metric**: Monthly retention (churn rate difference between test and control)
- **Secondary**: Usage/engagement rates — what percentage of customers actually use the feature?

### The Reach Threshold

A feature that only 2% of customers use is a "two-percenter." Kill it. It adds complexity for everyone (engineering maintenance, UI clutter, cognitive load) while benefiting almost nobody.

**Rule of thumb**: If a feature can't reach at least 10–15% of your user base, it's unlikely to move retention meaningfully. Even high-conversion features fail if reach is too low.

### Netflix Example — Perfect New Release Test (2005)

- **Setup**: 10,000 customers in test cell received new-release DVDs the next day; control waited 2+ weeks
- **Result**: Churn dropped from 4.50% to 4.45% — measurable but tiny
- **Extrapolation**: Saving 5,000 customers × $100 LTV × 2X word-of-mouth = $1M value
- **Cost**: $5M additional DVD inventory
- **Verdict**: Does not pass margin test at 2X word-of-mouth. At 10X (Amazon's assumption), it's a wash. Netflix did not roll it out.

**Lesson**: What customers say they want in surveys is not always what moves retention. Always validate with A/B tests.

---

## Step 2: Evaluate Hard-to-Copy Advantage

There are **five types of hard-to-copy advantage**. Assess which ones your initiative strengthens:

### 1. Unique Technology
Proprietary tech that competitors cannot easily replicate.
- **Netflix example**: Personalization algorithm — knows the movie tastes of 1B+ taste profiles (222M members × ~5 profiles each)

### 2. Brand
Trust and emotional connection that take years to build.
- **Netflix example**: Customers trust Netflix with their credit card for $20/month without thinking about it
- **Anti-pattern**: Anything that damages brand trust for short-term margin (e.g., dark patterns)

### 3. Network Effects
The product becomes more valuable as more people use it.
- **Netflix example**: Every screen in the world is prewired for Netflix — a device/platform flywheel
- **Failed hypothesis**: Social features (friends, Netflix Party/Xbox Party) — tested multiple times, never reached critical mass

### 4. Content / Unique Data Assets
Proprietary content or data that cannot be replicated.
- **Netflix example**: Original content (Stranger Things, BoJack Horseman) — exclusive and non-replicable

### 5. Economies of Scale
Cost advantages that grow with size.
- **Netflix example**: $18B content spend amortized across 220M+ members vs. competitors with smaller bases

**For B2B**: Add **switching costs** as a sixth advantage type — deeply integrated products that are painful to replace.

### The "Happy Family on the Couch" Test

If a competitor can copy your initiative within a week, it is not building hard-to-copy advantage. It may still be worth doing (it can delight and improve margin), but don't confuse it with strategy.

- **Netflix example**: Putting a happy family on the non-member signup page increased free trial conversions — but Blockbuster copied it within a week.

---

## Step 3: Evaluate Margin Enhancement

Margin = profit. Ask: does this initiative improve the business economics?

### Ways to Enhance Margin

1. **Improve retention** → Higher LTV per customer
2. **Increase conversion** → Lower acquisition cost per customer
3. **Enable premium pricing** → Drive customers toward higher-priced plans
4. **Right-size investment** → Use data to allocate spend more efficiently
5. **Grow subscriber base** → Amortize fixed costs over more customers

### Netflix Example — Personalization and Content Investment

Personalization allows Netflix to predict how many people will watch a show before commissioning it:
- Predicted 100M viewers for Stranger Things → invested $500M
- Predicted 20M viewers for BoJack Horseman → invested $100M

This "right-sizing" of investment is how personalization enhances margin — not through direct revenue, but through smarter capital allocation.

---

## Step 4: Analyze Delight vs. Margin Trade-offs

Most strategic decisions involve tension between delight and margin. Use this formula:

```
Value of Delight = Customers Saved × LTV × Word-of-Mouth Multiplier
Cost = Implementation + Ongoing Costs
```

### Key Variables to Challenge

| Variable | Conservative | Aggressive | Who Decides |
|----------|-------------|------------|-------------|
| Word-of-mouth multiplier | 2X | 10X | Depends on product virality |
| Customer LTV | Historical average | Forward-looking | Finance + Product together |
| Reach | Observed usage % | Projected adoption | A/B test data |

### Decision Framework for Trade-offs

1. **Calculate the math** — don't rely on intuition alone
2. **Challenge assumptions** — especially the word-of-mouth multiplier
3. **Assess stakes**: Is this decision high-stakes or low-stakes?
   - **Magnitude**: How big is the cost relative to total revenue?
   - **Reversibility**: Is this a one-way door or two-way door? (Amazon terminology)
4. **Default to testing** — run the A/B test in a small market first

### Netflix Example — Auto-Cancel Inactive Members (2020)

- **Delight**: Yes — returning money to people not using the service
- **Hard-to-copy**: Builds brand trust
- **Margin**: Loses ~$100M
- **Decision**: Do it. $100M is small relative to $30B revenue, and it's reversible
- **Lesson**: Low-magnitude, reversible decisions with brand upside should lean toward delight

### Netflix Example — Advertising-Supported Plan

- Reed Hastings killed ads in 2008 to maintain simplicity and focus on personalization
- His Socratic test: "Who will be best in the world at advertising?" → Google. "Who needs to be best at personalization?" → Us.
- Reversed in 2022 when growth stalled — "customer choice" outweighed "simplicity"
- **Lesson**: Strategic context changes. A decision that was right in 2008 can become wrong in 2022.

---

## GEM Model — Prioritization Across the Organization

Use GEM (Growth, Engagement, Monetization) to align leaders on what matters most right now.

### The Three Levers

| Lever | Definition | Proxy Metric |
|-------|-----------|--------------|
| **Growth** | Year-over-year customer acquisition | % YoY customer growth |
| **Engagement** | Product quality and stickiness | Monthly retention rate |
| **Monetization** | Turning usage into revenue | Revenue per user, conversion rate |

### How to Apply

1. **Start with a SWAG** (Stupid Wild-Ass Guess) — form your own point of view first
2. **Force-rank G, E, M** — leadership must agree on the order
3. **Use the ranking to resolve disputes** — when Growth is #1, growth-oriented features win ties
4. **Revisit quarterly** — the ranking shifts as the company matures

### Netflix Example — Chegg (2010)

CEO wanted: Growth > Engagement > Monetization
CFO wanted: Monetization > Engagement > Growth

This fundamental misalignment nearly broke the company. Resolution required getting leaders in a room and forcing agreement. The CFO who couldn't align eventually left.

**Lesson**: GEM misalignment is the #1 source of strategic dysfunction in startups.

### Typical Progression

```
Early stage:  Growth > Engagement > Monetization
Growth stage: Engagement > Growth > Monetization  (build before you scale)
Mature stage: Monetization > Engagement > Growth
```

Startups flip between Growth and Engagement constantly. Monetization comes later.

---

## Applying DHM: Rapid Evaluation Checklist

When evaluating any product initiative, run through this:

```
DHM Evaluation: [Initiative Name]

DELIGHT
- [ ] What specific customer pain does this solve or joy does it create?
- [ ] What % of customers will actually use this? (Kill if <5%)
- [ ] How would we A/B test this? What's the retention hypothesis?
- [ ] What do customers SAY they want vs. what the data shows?

HARD-TO-COPY
- [ ] Which advantage type(s) does this strengthen?
      [ ] Unique technology  [ ] Brand  [ ] Network effects
      [ ] Content/data      [ ] Economies of scale  [ ] Switching costs (B2B)
- [ ] Could a competitor replicate this within a week? A month? A year?
- [ ] Does this compound over time (flywheel) or is it a one-time gain?

MARGIN
- [ ] How does this improve unit economics?
      [ ] Better retention  [ ] Higher conversion  [ ] Premium pricing
      [ ] Smarter spending  [ ] Larger base for cost amortization
- [ ] What's the cost to implement and maintain?
- [ ] What's the delight-vs-margin math? (Value = Saved × LTV × WoM)

TRADE-OFF
- [ ] Is this high-stakes or low-stakes? (magnitude + reversibility)
- [ ] What assumptions drive the decision? Which ones can we test?
- [ ] What's the smallest experiment we can run to validate?
```

---

## Strategy Development Process

Gibson's methodology for building product strategy at a new company:

1. **Week 1–2**: Develop a SWAG of the product strategy — fast, imperfect, opinionated
2. **Week 2–4**: Share 1:1 with experienced team members. They've been there longer and will refine your thinking.
3. **Week 4–6**: Iterate based on feedback. Build consensus one conversation at a time.
4. **Week 6+**: Share the strategy broadly across the company

**Do not**: Hire a consulting firm. Go into a hole for months. Wait for the perfect answer. Skip the SWAG.

Each strategy is a **hypothesis**. Expect 6 out of 10 to fail. The value comes from the 3–4 that work.

---

## Anti-Patterns

| Anti-Pattern | Why It Fails |
|-------------|-------------|
| Only pursuing easy-to-copy wins | No durable advantage; competitors neutralize gains quickly |
| Skipping A/B tests for "obvious" features | What customers say ≠ what moves retention |
| Optimizing for 2-percenters | Adds complexity without meaningful impact |
| Ignoring the margin math | Delight without economics kills the business |
| Treating every decision as high-stakes | Slows down reversible, low-magnitude decisions |
| Building strategy in isolation | Miss institutional knowledge; strategy needs 1:1 refinement |
| Conflating company culture with product advantage | "Great talent" is not a product hard-to-copy advantage |

---

## Source

Gibson Biddle on Lenny's Podcast — "DHM Framework: Product Strategy at Netflix"
Gibson Biddle's Medium essays on product strategy: https://gibsonbiddle.medium.com
Website: https://gibsonbiddle.com
