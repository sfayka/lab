---
layout: post
title: "The 90‑Day AI Reality Check: Cut Costs with SLMs, Ship Narrow Agents, and Clear the EU AI Act Clock"
description: "A practical 90-day plan to replace bloated AI workflows with small, scoped agents, reduce spend, and stay closer to compliance with a realistic, measurable path."
date: 2026-03-09 10:05:00 -0400
tags: [ai, strategy, slm, agents, compliance]
categories: [lab]
published: true
---

## The 90‑Day Reality Check

Everyone has a “AI strategy,” most are fantasy maps.

(They look great in slides, then die in Jira.)

You can see the same pattern everywhere:

- Huge “all-purpose” prompts.
- One giant model call for every task.
- Slow cycles because nobody knows if this helped or just made noise.
- Finance gets a bill spike.
- Legal asks, “What are we doing with user data?”

This is not a tooling problem. It’s a discipline problem.

The antidote is simple: move from giant models to small models where they win, and ship narrow agents for repeatable work.

Not “more AI.”
**More structure. Less mystery.**

---

## What failed first (and why it’s good)

Most AI rollouts fail because they start with the wrong optimization target.

You can’t “optimize” until you have:

1. A clear task split.
2. A cheap fast path.
3. A control plane that decides when to call expensive models.

If you throw a single powerful model at everything, your failure mode is obvious:

- High cost
- Inconsistent outputs
- No ownership
- No rollback

So we stop pretending one model can be everything.
We choose model-by-task, agent-by-agent, and budget-by-workflow.

**If it’s cheap, boring, and wrong sometimes, automate it anyway.**

---

## The operating model: “small-first, expensive-on-demand”

Treat AI workflows like a call center routing tree.

- **SLMs/mini models** for classification, routing, summaries, extraction, template filling.
- **Specialized agents** for repeatable narrow workflows.
- **Large models** only for hard edge cases and high-value synthesis.

Think of this as an internal architecture, not an app feature.

Example routing policy:

```yaml
# ai-router.yml
routes:
  - id: sentiment_ticket
    input:
      contains: ["support", "bug", "complaint"]
    model: "mistral-7b-instruct"   # small + cheap
    tools: ["ticket_tag", "priority", "reply_skeleton"]

  - id: contract_review
    input:
      contains: ["compliance", "contract", "terms", "pii"]
    model: "claude-3-haiku"        # tighter control + policy checks

  - id: final_summary_for_client
    input:
      contains: ["executive", "board", "strategic"]
    model: "gpt-4o"
    fallback:
      model: "claude-3-sonnet"
```

This is boringly normal. That’s the point.

**The expensive model is now a specialist, not a hammer.**

---

## Your first 90 days: a concrete plan

## Weeks 0–2: Audit and cut waste before adding features

### What to do

- Inventory every AI call (by route, model, prompt, tokens, success/failure).
- Mark tasks with:
  - repeatability (can be templated?)
  - complexity (rule-bound vs ambiguous)
  - compliance risk (PII, legal, safety)
- Set hard targets:
  - 20–35% monthly AI cost reduction
  - 10+ high-frequency tasks routed to small models
  - 1 measurable KPI per workflow (time-to-draft, approval rate, CSAT, cost per task)

### Deliverables

- A shared routing map.
- A baseline cost and latency dashboard.
- A shortlist of 3–6 narrow agent candidates.

Use this prompt style from day one:
> “Classify this request into one of: billing, support, marketing, legal, support-escalation. If ambiguous, return `review_required` and why.”

### Agent starter scaffold

```js
// agents/briefRouter.ts
export const routes = [
  {
    name: "support_triage",
    model: "llama-3.2-1b-instruct",
    maxTokens: 180,
    temperature: 0.2,
    prompt: "Classify incoming support message by intent and confidence."
  },
  {
    name: "docs_extractor",
    model: "mistral-7b",
    maxTokens: 400,
    temperature: 0.0,
    prompt: "Extract key fields from support email into JSON schema."
  },
  {
    name: "summarizer",
    model: "gpt-4o-mini",
    maxTokens: 700,
    temperature: 0.3,
    prompt: "Produce concise executive summary, preserve decisions and numbers."
  }
];
```

If your first week has no measurable routing, you’re still “researching.”
**You only ship when you route.**

---

## Weeks 3–6: Build and ship two to three narrow agents

### What to do

- Build agents for one team’s highest-volume pain, not “everything.”
- Add human approval on first loop (always).
- Connect guardrails:
  - schema validation
  - confidence threshold
  - escalation when confidence is low
- Run A/B for at least one process: large model only vs routed model chain.

### Deliverables

- 2–3 narrow agents live in production-like pipeline.
- Confidence-based escalation implemented.
- 1 workflow with a measurable speed gain and 1 with a measurable quality gain.

### Routing policy with confidence controls

```yaml
agent_policy:
  - name: invoice_classifier
    model: "qwen2-7b"
    confidence_threshold: 0.78
    on_low_confidence: "gpt-4o"
    on_error: "manual_review"

  - name: faq_writer
    model: "llama-3.1-8b"
    confidence_threshold: 0.85
    on_low_confidence: "claude-3-sonnet"
```

And run prompt language like this:
> “If confidence < 0.78, return `escalate` and no final output.”

You’ll discover the obvious fast:
- some tasks are not automatable yet
- some prompts are bad, not models

That’s a win.
**Progress is spotting bad assumptions early.**

---

## Weeks 7–12: Expand, harden, and de-risk with policy

### What to do

- Expand to next 5–10 workflows that are repetitive and measurable.
- Introduce model registry and versioning.
- Add audits:
  - token spend by model
  - rejection/escalation rate
  - exception logs by reason
- Build monthly “AI hygiene” review process with product + legal.

### Deliverables

- 6–10 narrow agents in use.
- 30–50% reduction in expensive-model calls for selected workflows.
- Playbook for incident handling and manual override.

### Cost math you can track weekly

```python
# simple monthly model-cost model
calls_per_week = 12000
avg_input = 900
avg_output = 200
gpt4o_input = 0.000015   # $ per 1K tokens (example)
gpt4o_output = 0.00006
slm_input = 0.0000012
slm_output = 0.0000024

cost_old = calls_per_week * (avg_input/1000*gpt4o_input + avg_output/1000*gpt4o_output) * 4
# suppose 70% now route to SLM
cost_new = calls_per_week * 0.7 * (avg_input/1000*slm_input + avg_output/1000*slm_output) * 4 \
         + calls_per_week * 0.3 * (avg_input/1000*gpt4o_input + avg_output/1000*gpt4o_output) * 4

print(cost_old, cost_new, "Savings:", cost_old - cost_new)
```

If it doesn’t move spend, your routing is decorative.
**Decorative AI is still expensive AI.**

---

## EU AI Act: where to care, now

Short version: you don’t need legal perfection on day one, but you need traceability.

EU AI Act pressure points that matter here:

- **Risk classification**: if your workflow touches critical outcomes, define it early.
- **Record-keeping**: log prompts, model used, and outputs for auditable processes.
- **Human oversight**: default to review points in higher-risk chains.
- **Data governance**: define where data goes; keep raw PII out of unnecessary model calls.

Narrow agents and SLMs help because they shrink blast radius.

- Smaller models for simpler tasks = easier to document behavior.
- Narrow scope = easier to prove limitation and control.
- Clear routing = easier to explain why and when AI assisted.

Your policy page can be short:

- What each agent does.
- What it must never do.
- What triggers manual review.
- What retention and redaction rules apply.

You’re not “compliant” because you have a policy doc.
You’re closer because your workflow is constrained.
**Compliance is architecture, not paperwork.**

---

## The prompts that scale (and the ones that don’t)

Avoid broad, open prompts.

Use narrow, versioned prompts:

- “Classify into one of [X, Y, Z].”
- “Return JSON with these fields only.”
- “If data is missing, ask one clarifying question.”
- “Never infer legal conclusions; flag and route.”

Use quotes for your contract with the model:

> “You are a routing assistant. Return only JSON with intent, confidence, and next_tool.”
  
> “Do not answer policy questions. Return `escalate` when legal review needed.”

This removes drift fast.
**Prompting is systems design at the sentence level.**

---

## Common failure modes (and fixes)

- **Failure:** routing looks good, but output quality drops.
  - **Fix:** raise confidence threshold and add fallback.
- **Failure:** agents run “correct” but break users.
  - **Fix:** enforce schema and deterministic post-checks.
- **Failure:** legal says “no clear log.”
  - **Fix:** centralize request/response metadata by route + version.

Don’t add fancy evaluation tooling first.
Add observability first.
**If you can’t measure it, you just made a chatbot.**

---

## The 90-day definition of done

At day 90, you should be able to answer yes/no to:

1. Did we replace repetitive heavy-model work with smaller models?
2. Are the remaining expensive calls tied to genuinely high-value tasks?
3. Can we show cost trend down over the last 30 days?
4. Do we have an escalation path for risky/high-impact outputs?
5. Can we explain to legal where and why AI made each recommendation?

If the answer is four yeses, you are not “done.”
But you are no longer improvising.

You have a system.
And systems beat vibes.

**A narrow, cheap, auditable AI stack starts in ninety days.**
