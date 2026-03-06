---
layout: post
title: "The Next 90 Days in Agentic AI: 5 Bets on OpenAI vs Anthropic (and What Would Prove Me Wrong)"
date: 2026-03-04
categories: [essays]
published: false
---

Prediction posts are usually content candy.

Big claims. No accountability. Everyone moves on in two weeks.

That’s not useful for operators.

So this is a practical memo instead: five bets for the next 1–3 months, confidence levels, and the exact signals that would prove each one wrong.

If we’re going to be opinionated, we should also be falsifiable.

---

## Positioning note for Knox Lab

Write this as an operator brief, not prophecy.

What matters:
- what founders are likely to overreact to,
- what metrics actually matter,
- what to ship this month without overcommitting.

The point is better decisions, not better hot takes.

---

## Bet 1: Enterprise buying tilts from “best model” to “best controls + deployment confidence”

**Prediction (1–3 months):**
OpenAI and Anthropic both increase emphasis on governance primitives (permissions, auditability, policy controls, admin ergonomics) because procurement friction is now the blocker in many enterprise deals.

**Confidence:** 80%

**Why I think this:**
Most serious teams already have access to capable models. The harder problem is trust under real constraints — compliance, legal review, internal controls, and incident handling.

**Disconfirming signals:**
- New releases focus mostly on benchmark deltas with little operational-control depth.
- Enterprise win narratives continue to center on raw model quality over deployment confidence.

---

## Bet 2: Product narratives move toward orchestration reliability (away from single-agent hero stories)

**Prediction (1–3 months):**
Roadmaps and launches increasingly stress multi-step reliability, routing, handoffs, and exception paths rather than “fully autonomous” one-agent stories.

**Confidence:** 75%

**Why I think this:**
In production, failures are usually coordination failures. Context gaps between steps. Missing owners. Weak fallback behavior. Not “model forgot what SQL is.”

**Disconfirming signals:**
- Major launches double down on single-agent autonomy marketing with little handoff/control detail.
- Little/no visible movement on workflow-level observability and recovery tooling.

---

## Bet 3: Pricing and packaging pressure rises around agentic unit economics

**Prediction (1–3 months):**
Both vendors adjust or clarify packaging for long-running tasks, tool-heavy workflows, and enterprise predictability demands.

**Confidence:** 65%

**Why I think this:**
CFO scrutiny is tightening. Demo budgets survive ambiguity. Production budgets don’t.

**Disconfirming signals:**
- No meaningful pricing/packaging updates despite clear enterprise usage growth.
- Large customers publicly report stable economics without needing contract or packaging changes.

---

## Bet 4: The partner ecosystem race accelerates (integrations, alliances, implementation layer)

**Prediction (1–3 months):**
OpenAI and Anthropic both push harder on ecosystem leverage — integrations, platform alliances, and services channels — to win implementation mindshare, not just API volume.

**Confidence:** 70%

**Why I think this:**
Enterprise adoption is implementation-constrained. Distribution plus integration often beats model deltas in real buying cycles.

**Disconfirming signals:**
- Flat partner activity and few meaningful enterprise integration announcements.
- Adoption stories remain mostly direct API usage with minimal ecosystem role.

---

## Bet 5: The narrative gap widens: public “AI efficiency” claims grow faster than workflow-level proof

**Prediction (1–3 months):**
Executive claims about AI productivity gains continue to increase faster than transparent KPI evidence (cycle time, quality, exception rate).

**Confidence:** 85%

**Why I think this:**
Narrative always outruns instrumentation in transition periods. This one won’t be different.

**Disconfirming signals:**
- A meaningful wave of public KPI disclosures tied to specific workflow redesigns.
- Investor/customer updates consistently include non-financial execution metrics, not just margin commentary.

---

## Suggested structure for the final published piece

1. **Opening:** where most teams are misreading the quarter.
2. **The five bets:** each with confidence + what would falsify it.
3. **Operator dashboard:** six signals to review weekly.
4. **30-day posture:** low-regret moves founders can execute now.
5. **Close:** bet on workflow evidence, not headlines.

---

## Optional watchlist box

- Major enterprise packaging changes from OpenAI or Anthropic
- New governance/admin controls shipped
- Public case studies with measurable workflow KPIs
- Launches emphasizing orchestration reliability over benchmark optics
- Stronger partner-led implementation motions

---

## Practical founder guidance for this month

- Keep stack decisions reversible (don’t hard-fork around one vendor assumption yet).
- Instrument one workflow deeply before expanding agent footprint.
- Push vendors and partners for evidence on controls, cost predictability, and failure-handling.
- Treat “agentic transformation” claims as hypotheses until KPI-backed.

Short version: stay curious, but verify everything.

---

## Key context sources

- OpenAI Operator / agent-action framing: https://openai.com/index/introducing-operator/
- Reuters AI-linked restructuring trendlines:
  - https://www.reuters.com/business/blocks-fourth-quarter-profit-rises-announces-over-4000-job-cuts-2026-02-26/
  - https://www.reuters.com/business/world-at-work/companies-cutting-jobs-investments-shift-toward-ai-2026-02-25/
- OpenClaw ACP/operator docs (orchestration implementation context): https://docs.openclaw.ai/tools/acp-agents
