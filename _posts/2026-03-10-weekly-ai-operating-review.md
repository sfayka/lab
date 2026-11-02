---
layout: post
title: "The Weekly AI Operating Review Every SMB Should Run"
date: 2026-03-10
categories: [essays]
published: true
---

Most SMB AI pilots don't blow up. They rot.

Dashboards stay green. Someone says the agent is "working." Meanwhile exceptions stack up, reviewers quietly absorb the mess, and cost-per-task creeps until nobody wants to open the bill.

A short weekly operating review is how you catch that drift before it shows up as missed SLAs, burned reviewers, or a quiet decision to shelve the whole thing.

This is not a vendor checklist. It's a scorecard and a 60-minute ritual. Fill it with your numbers, your owners, and one real incident from the past week — or don't bother running it.

<!-- SEAN: Optional opener beat — one concrete Knox week (what broke, who caught it, what the scorecard would have shown). No invented metrics. -->

## The scorecard (one page)

Track these every week for the workflows that actually touch customers or money. If a metric isn't owned, it doesn't count.

| Signal | What it means | Baseline / threshold | Owner |
| --- | --- | --- | --- |
| Exception rate | Humans handling work the agent attempted | <!-- SEAN: your baseline + red line --> | <!-- SEAN: name --> |
| Escalation volume | Tickets / tasks that left the happy path | <!-- SEAN --> | <!-- SEAN --> |
| Review load | Queue depth × avg review time | <!-- SEAN --> | <!-- SEAN --> |
| Cost per completed task | Model + tool + human fix time | <!-- SEAN --> | <!-- SEAN --> |
| First-time-right rate | Completed without rework | <!-- SEAN --> | <!-- SEAN --> |
| Latency (p50 / p95) | End-to-end, not just model call | <!-- SEAN --> | <!-- SEAN --> |

Slice by workflow if you run more than one lane (support, intake, finance, internal ops). A blended average hides the lane that's on fire.

### Exception quality beats exception count

Don't just count failures. Tag them:

- model miss / hallucination
- tool or integration failure
- policy gap
- stale data
- orchestration bug (routing, handoff, state)

Prioritize by cost-weighted impact, not frequency. Ten cheap misses are not the same as one expensive silent wrong answer.

<!-- SEAN: Drop your top 3 exception classes from a recent Knox week, with rough cost or time impact if you have it. -->

## The 60-minute agenda

Keep the room small: ops owner, process owner, one engineer who can change routing/prompts/guardrails.

| Block | Time | What you do |
| --- | --- | --- |
| Scorecard | 15 min | Red / amber / green vs last week. No storytelling yet. |
| Top regressions | 20 min | Root-cause the top 1–3 drifts. Pick a class, not a vibe. |
| Actions | 15 min | Policy, guardrail, routing, or prompt change — one change per owner. |
| Commit | 10 min | Owner + verification date before next review. Write it down. |

If you need 90 minutes every week, the system is too opaque. Fix instrumentation, not the meeting length.

<!-- SEAN: Paste a real past agenda (or redact one) so readers see how Knox runs this, not a template. -->

## Failure modes

- Green dashboards with undefined drift windows
- Accuracy theater that ignores cost and review burden
- Exception analysis only after incidents
- High automation % mistaken for reliability
- Prompt/model swaps with no measurement window

## Close

Run the review. Name an owner. Give every exception class a cause, an action, and a date you will check again.

If you can't fill the scorecard with real numbers this week, that *is* the finding.

<!-- SEAN: Closing line with Lab voice — optional one-sentence Knox conviction, still no invented KPIs. -->
