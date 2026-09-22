---
layout: post
title: "The Next 90 Days in Agentic AI: 5 Bets on OpenAI vs Anthropic (and What Would Prove Me Wrong)"
date: 2026-03-04
categories: [essays]
published: true
---

I don't love prediction posts.

Most of them are content candy. Big confidence. No memory.

So this was a different format when I published it: five bets for the next 1-3 months, confidence levels, and disconfirming signals that would prove me wrong.

The window those bets covered has closed. What follows is the original memo, plus an empty scorecard. Fill the scores with receipts -- not vibes.

If we're going to make claims in public, we should make them testable. Then we should score them.

<!-- SEAN: One-paragraph retrospective frame -- what you were watching in early March 2026, without inventing which bets won. -->

---

## How to read this

Treat the original bets as an operator memo, not prophecy.

Useful questions then (and now):
- what were founders likely to overreact to,
- what should we actually measure,
- what could we ship that month with low regret?

---

## Scorecard (fill after the fact)

| Bet | Original confidence | Score (right / mixed / wrong) | Evidence (links, dates, notes) |
| --- | --- | --- | --- |
| 1. Controls + deployability over "best model" | 80% | <!-- SEAN --> | <!-- SEAN --> |
| 2. Orchestration reliability over single-agent hero messaging | 75% | <!-- SEAN --> | <!-- SEAN --> |
| 3. Pricing/packaging pressure on agentic unit economics | 65% | <!-- SEAN --> | <!-- SEAN --> |
| 4. Ecosystem race (integrations + partners + implementation) | 70% | <!-- SEAN --> | <!-- SEAN --> |
| 5. Narrative/proof gap widens before it narrows | 85% | <!-- SEAN --> | <!-- SEAN --> |

Do not score from memory alone. Link a launch, a packaging change, a case study, or a flop.

---

## Bet 1: enterprise buying keeps moving from "best model" to "best controls + deployability"

**Prediction (1-3 months):**
OpenAI and Anthropic both increase emphasis on governance/control primitives (permissions, auditability, policy controls, admin ergonomics) because procurement friction is now the bottleneck in many real deals.

**Confidence:** 80%

**Why this felt likely:**
Most serious buyers already have access to strong model quality. Their blocker is operational trust under constraints: compliance, legal, internal approvals, incident handling.

**What would disconfirm this:**
- New launches are mostly benchmark flexes with thin control depth.
- Enterprise win stories still center on model IQ more than deployment confidence.

---

## Bet 2: product narratives tilt toward orchestration reliability (less single-agent hero messaging)

**Prediction (1-3 months):**
We'll see more focus on routing, handoffs, exception handling, and multi-step reliability -- less "fully autonomous does everything" framing.

**Confidence:** 75%

**Why this felt likely:**
In production, failures are usually coordination failures. Missing owner. Weak fallback. Fragile boundary between steps. We've seen this repeatedly.

**What would disconfirm this:**
- Major launches keep pushing one-agent autonomy narratives with little handoff/control specificity.
- Minimal movement on workflow observability/recovery tooling.

---

## Bet 3: pricing and packaging pressure rises around agentic unit economics

**Prediction (1-3 months):**
Both vendors adjust or clarify packaging for long-running tasks, tool-heavy workflows, and enterprise predictability requirements.

**Confidence:** 65%

**Why this felt likely:**
CFO scrutiny is tightening. Demo spend tolerates ambiguity. Production budgets don't.

**What would disconfirm this:**
- No meaningful pricing/packaging changes despite rising enterprise usage.
- Large customers report stable economics without asking for contractual/package shifts.

---

## Bet 4: ecosystem race accelerates (integrations + partners + implementation layer)

**Prediction (1-3 months):**
OpenAI and Anthropic both push harder on ecosystem reach -- integrations, alliances, channel/service motions -- to win implementation mindshare, not just API volume.

**Confidence:** 70%

**Why this felt likely:**
Enterprise adoption is implementation-constrained. In real buying cycles, distribution plus integration often beats small model deltas.

**What would disconfirm this:**
- Flat partner activity and few meaningful integration announcements.
- Adoption stories remain mostly direct API usage with low ecosystem involvement.

---

## Bet 5: the narrative/proof gap widens before it narrows

**Prediction (1-3 months):**
Public claims about AI efficiency will keep rising faster than workflow-level KPI proof (cycle time, quality, exception rates).

**Confidence:** 85%

**Why this felt likely:**
Narrative usually outruns instrumentation during transitions. This cycle doesn't look different.

**What would disconfirm this:**
- A visible wave of transparent KPI disclosures tied to specific workflow redesigns.
- Investor/customer updates include consistent non-financial execution metrics, not just margin commentary.

---

## Build-in-public framing (good / bad / ugly)

### Good

Teams are getting less precious about "perfect architecture first" and more focused on proving one workflow at a time.

### Bad

There's still too much "which model is best?" debate disconnected from day-2 operating reality.

### Ugly

Some teams are making broad efficiency claims with weak instrumentation. That works until one reliability event forces the receipts conversation.

---

## Practical founder posture (still true)

- Keep architecture choices reversible where possible.
- Instrument one workflow deeply before expanding agent footprint.
- Push vendors/partners for evidence on controls, cost predictability, and failure handling.
- Treat "agentic transformation" claims as hypotheses until KPI-backed.

Short version: stay curious, keep receipts. Then score the bets.

---

## Key context sources

- OpenAI Operator / agent-action framing: https://openai.com/index/introducing-operator/
- Reuters AI-linked restructuring trendlines:
  - https://www.reuters.com/business/blocks-fourth-quarter-profit-rises-announces-over-4000-job-cuts-2026-02-26/
  - https://www.reuters.com/business/world-at-work/companies-cutting-jobs-investments-shift-toward-ai-2026-02-25/
- OpenClaw ACP/operator docs (orchestration implementation context): https://docs.openclaw.ai/tools/acp-agents
