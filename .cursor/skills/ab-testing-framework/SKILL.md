---
name: ab-testing-framework
description: Design, run, and analyze A/B tests (controlled experiments) using Ronny Kohavi's methodology and Gibson Biddle's DHM trade-off analysis. Use when the user needs to plan an experiment, choose metrics (OEC), evaluate statistical significance, assess sample size requirements, avoid common experimentation pitfalls, or decide whether to A/B test at all.
---

# A/B Testing Framework

Practical framework for trustworthy online controlled experiments, extracted from Ronny Kohavi (Airbnb, Microsoft, Amazon) and Gibson Biddle (Netflix, Chegg).

## Core Philosophy

> "Any code change that you make, any feature that you introduce has to be in some experiment." — Ronny Kohavi

- Most ideas fail. Expect **66–92% failure rate** depending on domain maturity:
  - ~66% failure at early experimentation orgs (Microsoft overall)
  - ~85% failure in optimized domains (Bing search)
  - ~92% failure in highly optimized domains (Airbnb search relevance)
- ~10% of experiments are aborted on day one due to implementation bugs, not bad ideas.
- Even small bug fixes can have surprising, unexpected impact — test everything.
- Most value comes **inch by inch**, not from home runs. Bing's relevance team targets 2% OEC improvement per year via many small wins (0.1–0.2% each).

## Step 1: Decide Whether to A/B Test

### Prerequisites

- You need **enough units** (usually users) for statistics to work.
- The change must be randomizable (you can't A/B test mergers & acquisitions).

### Sample Size Rule of Thumb

| Users available | What you can do |
|-----------------|----------------|
| < 10,000 | Too few for most metrics. Use qualitative methods. |
| 10,000–200,000 | Start experimenting. Only detect **large effects** (≥5%). Build the culture and platform. |
| ≥ 200,000 | **Magic threshold.** Test everything. Detect smaller effects. Full experimentation program. |

### When NOT to A/B Test

- One-time irreversible decisions (M&A, major partnerships).
- Insufficient traffic for statistical power.
- Legal/compliance requirements where you must ship regardless — but still test **multiple implementations** and ship the one that hurts least.
- Early product with no product-market fit yet (focus on qualitative discovery first).

## Step 2: Define Your OEC (Overall Evaluation Criterion)

The OEC is the single most important concept in experimentation. Get this wrong and everything else is wasted.

### What Makes a Good OEC

1. **Causally predictive of lifetime value.** The OEC must reflect long-term user and business value, not just short-term wins.
2. **Includes countervailing metrics.** Never optimize a single metric in isolation.
3. **Directionally unambiguous.** If half the room thinks "up" is good and half thinks "up" is bad, it's a bad OEC. (Kohavi's microsoft.com "time on site" example: support team wanted less time; content team wanted more.)
4. **Measurable within experiment timeframe.** Use proxy metrics or models for long-term outcomes.

### OEC Design Patterns

**Pattern A: Composite metric**
Combine success metrics with user-experience metrics. Example at Bing:
- Revenue per search (success)
- Time to successful click (user experience)
- Session success rate (user experience)
- Churn rate (long-term health)

**Pattern B: Constraint optimization**
Fix a "budget" for one dimension, optimize the other. Example at Bing:
> "Increase revenue, but I give you a fixed budget of vertical pixels for ads. Under the same pixel budget, make more money."

**Pattern C: Cost-of-harm modeling**
Assign dollar values to negative outcomes. Example at Amazon email:
- Revenue from email clicks: +$X
- Cost of unsubscribe (lost lifetime email value): -$Y per unsubscribe
- Net value = $X - ($Y × unsubscribes)
- Result: More than half of Amazon's email campaigns were net-negative when harm was modeled.

### Guardrail Metrics vs. Success Metrics

| Type | Purpose | Example |
|------|---------|---------|
| **Success metrics** | What you're trying to improve | Revenue, conversion, engagement |
| **Guardrail metrics** | What you must NOT degrade | Page load time, error rate, churn, battery life |

Always define guardrail metrics. The Bing ad title experiment was a $100M win **because** it improved revenue without hurting guardrail metrics. The Windows indexer experiment improved relevance but killed battery life — guardrail caught it.

## Step 3: Design the Experiment

### Portfolio Allocation (80/20 Rule)

- **~80% of experiments:** Incremental improvements in the direction you know works. Inch-by-inch optimization.
- **~20% of experiments:** High-risk, high-reward bets. Big redesigns, new paradigms.
- For the 20%: **expect 80% to fail.** If it wins, it's a home run.

### OFAT: One Factor at a Time

Never bundle many changes into one experiment.

- If you combine 17 changes, statistically most will be negative, dragging down the winners.
- Decompose redesigns into smaller, testable increments.
- Learn what works, discard what doesn't, then compose the winners.

> "Of the 17, maybe you have four good ideas. Those are the ones that will launch and be positive." — Kohavi

### Big Redesigns

- Large redesigns almost always fail when tested as a single unit.
- If you must do one, **be ready to fail** and be willing to revert.
- Better: Move incrementally toward the target design, testing each step.

### Don't Ship on Flat

If an experiment shows no statistically significant improvement, **do not ship**:
- You've added code complexity and maintenance overhead for zero user benefit.
- Exception: legal/compliance requirements (but test multiple implementations).

## Step 4: Validate Experiment Integrity

### Sample Ratio Mismatch (SRM) — The #1 Validity Check

If your experiment is designed 50/50 but you observe 50.2/49.8 with a million users, **something is wrong.**

1. Compute the probability of the observed ratio under the null hypothesis.
2. At scale, even tiny deviations are extremely unlikely by chance (e.g., 1 in 500,000).
3. ~8% of experiments at Microsoft had SRM — a large number of invalid results.

**Common SRM causes:**
- Bots hitting control/treatment at different rates (most common)
- Data pipeline bugs filtering users asymmetrically
- Campaign traffic entering mid-funnel and skewing assignment
- Experiment starting at wrong trigger point

**Enforcement:** Blank out the scorecard with a red warning when SRM is detected. People will try to ignore it — design the platform so they can't present SRM-tainted results without visible warnings.

### Twyman's Law

> "Any figure that looks interesting or different is usually wrong." — Twyman

- If your typical experiment moves metrics < 1% and you suddenly see 10%: **investigate before celebrating.**
- 9 out of 10 times, a "too good to be true" result has a bug.
- Replicate the experiment. Check data pipelines. Look for instrumentation errors.
- The Bing ad title experiment ($100M) was initially flagged as Twyman's law — it took multiple replications to confirm it was real.

### A/A Tests

Run experiments where control and treatment are identical. If the platform reports statistically significant differences, something is broken. Use A/A tests to validate your platform.

## Step 5: Interpret Results Correctly

### P-Values — What They Actually Mean

**The most common interpretation is WRONG:**
- ❌ "P = 0.02 means 98% probability that treatment is better than control."
- ✅ P-value = probability of observing the data (or more extreme) **assuming the null hypothesis is true.**

To get the probability you actually want (is the treatment better?), you need **Bayes' rule**, which requires a prior — the base rate of experiment success.

### False Positive Risk (FPR)

The real risk depends on your domain's success rate:

| Domain success rate | p < 0.05 FPR | Interpretation |
|--------------------:|:------------:|----------------|
| 33% (Microsoft) | ~10% | Manageable |
| 15% (Bing) | ~20% | Significant |
| 8% (Airbnb search) | **~26%** | 1 in 4 "wins" is false |

### Decision Protocol

| P-value | Action |
|---------|--------|
| p < 0.01 | Ship with confidence |
| 0.01 < p < 0.05 | **Replicate the experiment.** Combine results using Fisher's method or Stouffer's method. |
| p > 0.05 | Do not ship. Not enough evidence. |

### Variance Reduction (Get Results Faster)

1. **Cap outlier metrics.** If some users book hundreds of nights (agencies), cap at 30. Revenue skewed by large purchases — cap at $1,000.
2. **CUPED (Controlled-experiment Using Pre-Experiment Data).** Use pre-experiment behavior to adjust post-experiment metrics. Unbiased results with lower variance, fewer users needed.
3. **Metric templates.** Pre-define metric sets per experiment type (UI experiments, revenue experiments) to speed up analysis.

## Step 6: Build Institutional Knowledge

### Quarterly Surprise Review

Hold quarterly meetings focused on the **most surprising experiments** (not just winners):
- Surprising = |predicted outcome - actual outcome| is large
- Include surprising winners AND surprising losers
- Surprising losers often yield the deepest strategic insights

### Document and Search

- Maintain a searchable archive of all experiments (hypothesis, results, learnings).
- Tag by keywords so teams can check: "Has anyone tested this before?"
- At Microsoft: 20,000–25,000 experiments/year, ~100 new treatments every working day.

### Avoid Peeking

Never use real-time P-value monitoring to decide when to stop an experiment. This inflates false positive rate from 5% to ~30%. (The "Optimizely problem.") Set the experiment duration in advance based on power calculations.

### Building Experimentation Culture (Beachhead Strategy)

Start with one team that ships frequently (weekly or daily, not quarterly):
1. Pick a team where experimentation is easy: high traffic, clear metrics, frequent deploys.
2. Share surprising results broadly — wins AND failures. This creates the flywheel.
3. Cross-pollinate: people who move from experimentation-mature teams carry the culture with them.
4. At Microsoft, Bing was the beachhead. Once Bing had compelling data, Office and other teams adopted experimentation. It took years, but the surprising results made the case.
5. Initial resistance is universal. Every org starts by saying "we have better PMs" or "our success rate will be higher." They are all humbled.

## Trade-Off Analysis: The DHM Model (Biddle)

Use Gibson Biddle's **Delight / Hard-to-copy / Margin** model to evaluate whether an experiment is worth running at all.

### Measuring Delight via Retention

Netflix measured delight through retention improvement in A/B tests.
- 2005: ~4.5% monthly churn
- Today: ~2% monthly churn
- Each percentage point improvement represents massive lifetime value.

### The Perfect New Release Test (Netflix Case Study)

**Setup:** 10,000 users in test cell get new release DVDs next day. Control gets them in ~2 weeks (average).

**Result:** Retention improved from 4.5% to 4.45% churn — a very small effect.

**Trade-off math:**
```
Saved customers ≈ 5,000 (at 1M total users, 0.05pp monthly churn improvement)
Value = 5,000 × $100 LTV × 2 (word-of-mouth factor) = $1M
Cost of additional DVD inventory = $5M
ROI: Negative ($1M value vs $5M cost). Did NOT roll out.
```

**Key insight:** The word-of-mouth multiplier is the pivotal assumption. At 2×, it's clearly negative. At 10× (Amazon's assumption), it roughly breaks even. Netflix tried hard to isolate the true WOM factor but couldn't — so they passed on the investment.

### The 2% Rule (Feature Reach)

If a feature would be used by less than ~2% of customers, kill it. The complexity cost (code maintenance, design clutter, cognitive load for all users) outweighs the benefit to the few.

Netflix tested Xbox Party (co-watching): barely reached 5% usage. Killed it. Years later, friends/social features at Netflix also failed. Pattern: social features struggle in media consumption products.

## Experimentation Maturity Model

Kohavi's 6-axis crawl → walk → run → fly model:

1. **Platform self-service** — Can teams set up experiments without engineering help?
2. **Metric automation** — Does the scorecard appear automatically, or do you wait for a data scientist?
3. **Trustworthiness checks** — SRM detection, A/A validation, guardrail monitoring?
4. **Analysis depth** — Number of metrics, segmentation, debugging capabilities?
5. **Organizational culture** — Do teams accept experiment results even when they contradict intuition?
6. **Velocity** — How many experiments run concurrently? What's the lead time?

Target: marginal cost of running an experiment approaches zero.

## Quick Reference: Kohavi's Rules of Thumb

| Rule | Details |
|------|---------|
| Test everything | Any code change, any feature — put it in an experiment |
| 200K users | Minimum for a mature experimentation program |
| 80–92% failure | Most ideas don't move metrics. This is normal. |
| Twyman's law | Too good to be true → probably wrong. Investigate. |
| SRM check | Always verify sample ratio. 8% of experiments have this bug. |
| Don't ship flat | No significant improvement = do not ship (adds complexity for nothing) |
| OFAT | One factor at a time. Decompose big changes. |
| 80/20 portfolio | 80% incremental, 20% high-risk/high-reward bets |
| Replicate p 0.01–0.05 | Rerun the experiment. Combine with Fisher's/Stouffer's method. |
| Cap metrics | Reduce variance by capping outliers |
| Institutional learning | Quarterly reviews. Searchable experiment archive. |

## Sources

- **Ronny Kohavi** — [The ultimate guide to A/B testing](https://www.youtube.com/watch?v=hEzpiDuYFoE) (Lenny's Podcast). Author of *Trustworthy Online Controlled Experiments* (Cambridge University Press). Former VP/Technical Fellow at Airbnb, Corporate VP at Microsoft, Director at Amazon.
- **Gibson Biddle** — [DHM Product Strategy framework](https://www.youtube.com/watch?v=X-83gvgVaWc) (Lenny's Podcast). Former VP Product at Netflix and Chegg. Netflix case studies on retention-based delight measurement and trade-off analysis.
- **Additional resources mentioned:** goodui.org (140+ A/B test patterns), "Rules of Thumb" paper (Microsoft), CUPED paper, SRM diagnosis paper (Microsoft 2018).
