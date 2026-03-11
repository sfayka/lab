---
layout: post
title: "Where Human Review Actually Belongs in an Agentic Workflow"
date: 2026-03-10
categories: [essays]
published: true
---

AI orchestration only scales when review is placed at *decision points with business risk*, not as a blanket afterthought. In SMB teams, the wrong review policy can quietly double work: too much review adds latency and cost, too little review increases customer-impact errors. This outline is about designing review into the workflow architecture so people intervene where models are weak and agents are strong.

## Why this matters now

- Multi-step agent chains fail in *transitions* (data handoffs, state changes, and approvals), not just final text generation.
- SMBs are adopting agentic automation faster than they are designing guardrails, so failures often surface as rework, not outages.
- Operational AI ROI comes from reducing low-value human load, but unbounded autonomy increases exception cost and trust decay.

## Sections

### 1) Map the chain before you add “approval”

- Trace each workflow step end-to-end (input → tool calls → transforms → state writes).
- Identify “state boundary” points where small mistakes become high-cost (billing, refunds, CRM writes, customer comms).
- Decide whether each node is machine-only, machine-with-threshold, or machine-then-human.

### 2) Failure points in common SMB workflows

- **Support:** wrong intent classification, stale customer context, policy mismatch (SLA, escalation rules).
- **Sales ops:** bad lead enrichment, duplicate opportunity updates, discount/commitment text drift.
- **Finance ops:** invoice parsing, PO matching, approval-limit violations, missed reconciliation flags.
- **Internal tooling:** incorrect ticket routing, stale metadata, data joins from mismatched IDs.

### 3) Review by leverage: where humans add value

- Human review belongs where uncertainty is high *and* business impact is non-trivial (money, legal, trust, safety).
- Route low-risk, high-volume edges (formatting, categorization, draft responses) to human-free paths.
- Use confidence + exception taxonomies to decide review depth (binary approve/deny, edits-only, post-facto audit).

### 4) Calibrate review intensity with a policy matrix

- Define severity tiers: `auto`, `sample`, `human-before-send`, `human-after-sent`.
- Tie policies to objective conditions (customer tier, amount, policy flags, anomaly score, data sparsity).
- Review queues should be by *risk and drift*, not by team hierarchy alone.

### 5) Build for “review velocity” not just control

- Give reviewers compact bundles: source input, model rationale, changed fields, and next action.
- Track first-pass acceptance rate of each reviewer queue to tighten routing rules.
- Add reviewer feedback signals back into routing prompts, tools, and thresholds.

### 6) Governance and accountability structure

- Define who owns each policy knob (ops lead, finance lead, security/compliance liaison).
- Require override logs with actor + rationale for every bypass.
- Publish review SLOs (response SLA, false-positive rate, rework rate) and report quarterly.

## Failure modes to avoid

- Blanket human review of everything (kills throughput and raises costs).
- Review only at the end of workflows (cascading errors already compounded).
- “Confidence score” gating without calibration against ground-truth outcomes.
- No ownership of exception categories, causing repeated manual triage loops.
- Reviewer fatigue from low-signal alerts and bloated handoff context.

## Operating decision or implementation lesson

**Set one default: every workflow step gets a risk class and a review gate; only risk-class `high` steps go to people, and all gates are measured weekly against exception and rework outcomes.**

## References

- <https://www.retool.com/blog/ai-agentic-workflows>
- <https://arxiv.org/abs/2201.11775>
- <https://www.zdnet.com/article/how-to-implement-human-in-the-loop-ml-ops/>
- <https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/the-economic-potential-of-generative-ai>  
- <https://www.atlassian.com/incident-management/incident-review>
