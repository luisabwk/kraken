---
name: ai-evals-builder
description: Build AI evals using the Husain-Shankar framework (error analysis, open/axial coding, LLM-as-judge). Use when a user needs to create, improve, or debug evals for an AI product — including defining failure modes, building LLM judges, or setting up production monitoring for an LLM application.
---

# AI Evals Builder

Framework for building application-specific AI evals, distilled from the Husain-Shankar methodology. Grounded in qualitative data analysis (social science) and classical ML error analysis (Andrew Ng).

**Core principle**: Evals are data analytics on your LLM application. The goal is not perfect evals — it is to actionably improve your product.

---

## The Process (5 Steps)

### Step 1: Error Analysis — Open Coding

Manually review production traces and write free-form notes about what is wrong.

**How to do it:**

1. Load traces into an observability tool (Braintrust, Arize Phoenix, LangSmith, or any tool with annotation support)
2. Appoint a **benevolent dictator** — one person with domain expertise (usually the PM or subject-matter expert). Do NOT form a committee; it makes the process too expensive
3. Sample traces randomly and review them one by one
4. For each trace, write down **only the first/most upstream error** you see. Stop. Move on to the next trace
5. Write descriptive notes — not single words like "janky". Write "Did not confirm call transfer with user" or "Offered virtual tour that does not exist"
6. Aim for **~100 traces** initially. The real stopping rule is **theoretical saturation**: when you stop discovering new types of problems

**Critical rules:**

- Do NOT use an LLM for this step. LLMs lack product context and will say "the trace looks good" for subtle failures (e.g., hallucinating a feature that doesn't exist)
- Do NOT try to build a taxonomy while open coding. Just capture what's wrong in your own words
- Put your **product hat on**. A technically correct response can still be a bad product experience (e.g., AI says "not available, goodbye" when it should hand off to a human)
- The first 2-3 traces are painful. After that, you'll get fast and addicted to the insights

**Output**: A CSV/spreadsheet with trace IDs and free-form notes (open codes).

---

### Step 2: Axial Coding — Categorize Failure Modes

Use an LLM to group your messy open codes into actionable categories (axial codes).

**How to do it:**

1. Export open codes as CSV
2. Prompt an LLM (Claude, ChatGPT, etc.): "Please analyze this CSV. The metadata field contains open codes from qualitative error analysis of an LLM application. Create axial codes (categories) that group these open codes by failure mode."
3. Use the terms **"open codes"** and **"axial codes"** in your prompt — LLMs know these social science concepts and respond well to them
4. Review the proposed categories. Refine them to be **specific and actionable**:
   - BAD: "Capability limitations" (too vague)
   - GOOD: "Tour scheduling failures", "Human handoff issues", "Formatting errors in output"
5. Include a **"none of the above"** category to catch gaps in your taxonomy
6. Re-map all open codes to the final axial codes using an LLM (e.g., Google Sheets AI, a simple prompt: "Categorize the following note into one of these categories: [list]")

**Tip**: You can instruct the LLM to group by user story stage, by actionability, or by any lens useful to you. There is no single correct prompt.

**Output**: Each trace now has an axial code (failure category) assigned.

---

### Step 3: Count and Prioritize

Use basic counting to identify the most prevalent and impactful failure modes.

**How to do it:**

1. Create a pivot table (or simple count) of axial codes
2. Rank by frequency. Also consider severity — a rare but catastrophic failure may outrank a common but mild one
3. For each top failure mode, decide:
   - **Just fix it**: If the fix is obvious (e.g., forgot to include formatting instructions in the prompt), fix it immediately. No eval needed
   - **Code-based eval**: If testable with deterministic code (e.g., "output must be JSON", "response must be < 200 chars"), write a code-based evaluator. Prefer these — they're cheap
   - **LLM-as-judge eval**: If the failure is subjective/complex (e.g., "should have handed off to human"), build an LLM judge (Step 4)

**Output**: A prioritized list of failure modes with a remediation strategy for each.

---

### Step 4: Build LLM-as-Judge Evaluators

Create binary (pass/fail) LLM judges for complex, subjective failure modes.

**How to do it:**

1. Write a **judge prompt** for ONE specific failure mode. The prompt should:
   - Define the specific failure being evaluated
   - List concrete conditions that constitute a failure (derived from your data, not hypothetical)
   - Request a **binary output: true/false (pass/fail)**
   - Include relevant context the judge needs (system prompt, conversation, tool outputs)

2. **NEVER use Likert scales** (1-5, 1-7). Binary only. Reasons:
   - No one knows what 3.2 vs 3.7 means
   - It's a "weasel way of not making a decision"
   - Forces you to think clearly about what "good enough" means

3. You can use an LLM to help draft the judge prompt, but **review and edit it yourself**

4. Typical products need **4-7 LLM judges** total. You don't need one for everything — only for the pesky failure modes that persist after prompt fixes

**Example judge prompt structure:**

```
You are evaluating an LLM trace for a specific failure mode: [FAILURE NAME].

Output ONLY true (failure present) or false (no failure).

A failure occurs when ANY of these conditions are met:
- [Condition 1 derived from your actual data]
- [Condition 2]
- [Condition 3]

Context:
- System prompt: {system_prompt}
- Conversation: {conversation}
- Tool calls/results: {tool_outputs}
```

**Output**: A working judge prompt per failure mode.

---

### Step 5: Align the Judge to Human Judgment

Validate that your LLM judge agrees with human labels before deploying.

**How to do it:**

1. Run the judge on your labeled dataset (you already have human labels from open/axial coding)
2. Build a **confusion matrix** (2x2): Human says pass/fail vs Judge says pass/fail
3. **Do NOT rely on overall agreement percentage**. If the failure only occurs 10% of the time, a judge that always says "pass" gets 90% agreement. This is misleading
4. Focus on the **off-diagonal cells**: cases where human and judge disagree
5. If misalignment is high, iterate on the judge prompt:
   - Make failure conditions more specific
   - Add examples of edge cases
   - Clarify ambiguous language
6. Repeat until the confusion matrix shows acceptable alignment

**Red flag**: If someone reports "75% agreement" without a confusion matrix, the judge has not been properly validated.

**Output**: A validated judge with known alignment characteristics.

---

## Operationalization

Once judges are built and validated:

| Use Case | How |
|---|---|
| **CI/Unit tests** | Include labeled failure traces as test cases. Run judge on each push |
| **Production monitoring** | Sample N traces daily/weekly, run judges, track failure rates on dashboards |
| **Ongoing error analysis** | Continue open coding ~30 min/week to catch new failure modes (criteria drift) |
| **Custom review tools** | Build lightweight web apps to make trace review frictionless (vibe-code them with AI) |

**Time investment**: ~3-4 days initial setup. ~30 minutes/week ongoing.

---

## Anti-Patterns (Do NOT)

| Anti-Pattern | Why It Fails |
|---|---|
| Skip error analysis, jump to writing tests | Tests won't target real failures. "This is where things go off the rails" |
| Use LLMs for open coding | LLMs lack product context. They'll say "looks good" for subtle failures |
| Use Likert scales (1-5, 1-7) for judges | Untractable metrics. No one knows what 3.2 vs 3.7 means |
| Form a committee for open coding | Makes the process too expensive and slow. Use one benevolent dictator |
| Trust judge output without alignment check | Fastest way to lose trust in your entire eval system |
| Rely on overall agreement % | Misleading with rare errors. Always use confusion matrix |
| Use generic off-the-shelf evals | Cosine similarity, hallucination scores don't correlate with product-specific failures |
| Write vague open codes ("janky", "bad") | Can't categorize later. Be descriptive: what specifically went wrong |
| Dream up failure modes without looking at data | "You can't figure out your rubrics upfront" — criteria drift is real |
| Build a "beautiful eval suite" as the goal | The goal is to fix your product. If you see something wrong, just fix it |

---

## Key Concepts Reference

| Term | Definition |
|---|---|
| **Trace** | Complete log of one user interaction (system prompt, messages, tool calls, responses) |
| **Open code** | Free-form note about what's wrong in a trace (qualitative, no taxonomy) |
| **Axial code** | Category/label grouping similar open codes into a named failure mode |
| **Theoretical saturation** | Point where reviewing more traces yields no new types of problems |
| **Benevolent dictator** | Single domain expert who owns the open coding process |
| **LLM-as-judge** | An LLM that evaluates traces for one specific failure mode (binary: pass/fail) |
| **Confusion matrix** | 2x2 table comparing human labels vs judge labels for alignment validation |
| **Criteria drift** | People's opinions of good/bad change as they review more outputs (Shankar et al. research) |
| **Code-based eval** | Deterministic check (Python function, regex, string test) — cheaper than LLM judges |

---

## Agent Instructions

When helping a user build evals:

1. **Ask what stage they're at**: Do they have traces? Have they done error analysis? Do they have failure modes identified?
2. **Never skip to judges**: If they haven't done error analysis, guide them through Step 1 first
3. **Help with axial coding prompts**: Generate prompts using the "open codes → axial codes" terminology
4. **Draft judge prompts**: Based on their specific failure modes, draft binary judge prompts with concrete conditions
5. **Help build the confusion matrix**: Write code to compare judge output vs human labels
6. **Remind them**: The goal is product improvement, not eval perfection. Fix obvious issues immediately

---

## Sources

- Lenny's Podcast: "Why AI evals are the hottest new skill for product builders" — Hamel Husain & Shreya Shankar (2025-09-25). [YouTube](https://www.youtube.com/watch?v=BsWxPI9UM4c)
- Shreya Shankar et al., "Who Validates the Validated?" — Research paper on criteria drift in LLM evaluation
- Andrew Ng — Error analysis methodology (classical ML, adapted for LLMs)
- Hamel Husain & Shreya Shankar's AI Evals course (Maven, #1 course)
