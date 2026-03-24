---
layout: post
title: "How We Run AI Ops at Knox Analytics: OpenClaw + OpenAI Codex"
date: 2026-03-12
categories: [essays]
description: "A transparent walkthrough of the operating model we actually run: approvals-first orchestration with OpenClaw and repo‑native changes with OpenAI Codex."
---

The first time we ran a Codex task without a tightly scoped recipe, it came back with a clean PR that touched three files. The target file — right. Two adjacent config files the model had decided might be relevant — wrong. Nothing broke, and the reviewer caught it, but that near-miss made something clear: we had been thinking about our AI operating model as a set of tools, not as a system with controls. The tools were fine. The controls weren't there yet.

That's when we got serious about the actual mechanics.

Here is the operating model we run today at Knox Analytics. This isn't an exhaustive framework or a vendor recommendation. It's our stack — OpenClaw for orchestration, OpenAI Codex for code work — and the specific controls we enforce around each piece.

## Channel intake and routing

Slack is our control surface. Triage signals — alerts, TODOs, short task prompts — come in through Slack and get routed to owners via OpenClaw. We enforce a policy matrix that defines who can approve which action classes, in which channels, at what times. Conservative defaults apply everywhere: read-only first, dry-runs where available, explicit timeboxes on anything with side effects. Nothing runs open-ended.

The policy matrix isn't just documentation. It's what OpenClaw actually checks before allowing an action. That distinction matters — policy that doesn't gate behavior is just wishful thinking written down somewhere.

## Approvals, audit, and kill-switches

Every action with side effects requires an explicit approval flow. Approvals are logged with the actor, the scope, and the expiry. We maintain an immutable action log and attach evidence — outputs, links, diffs — to each decision.

Any team member can pause a workflow family immediately. Resumption requires a deliberate review, not just a timeout. That kill-switch sounds like an emergency feature, but we've used it for ordinary reasons too: pausing a recurring task during a high-traffic period, holding a flow while we update its recipe. Having it as a real control changes how you think about what it means to run something.

## Code changes with Codex

Codex proposes branch changes only. Every task requires a PR, passing tests, lint, and reviewer sign-off. We scope tasks to bounded recipes — dependency bumps, selector fixes, doc syncs — with explicit acceptance criteria that define what the model is and isn't allowed to touch.

The scoping lesson from that first near-miss stayed with us. If a recipe doesn't define file scope explicitly, the model interprets its mandate broadly. That's not a flaw in the model — it's a gap in the task definition, and the task definition is our job. We tightened the recipe templates, added explicit file-scope constraints, and haven't had that problem since.

We track three numbers per Codex workflow: success rate, rework rate, and time-to-merge. Those numbers tell us whether a recipe is working or needs tightening.

## Weekly governance cadence

Every week we run a short review of the past seven days: logs, overrides, and any exception root causes. Thresholds and SLAs get tuned here — impact gates, escalation windows, retry limits. We document one or two small process fixes per cycle and don't attempt large governance rewrites. Incremental adjustment is how this kind of system actually improves; big-bang governance rewrites rarely survive contact with next week's logs.

## What we don't do

No desktop-wide agent privileges, no file-system-wide automation in production. No unsupervised merges or deploys — production actions always require a human gate. No unbounded context; we enforce TTL on anything stored and keep the memory layer lean.

We're also not running Perplexity Local in production. Desktop automation is interesting, but it needs a tighter playbook than we've built yet. We'd rather wait until we have the right approval and rollback controls in place before adding it to the stack.

## Why this holds together

Every change in this system ties back to a log line, a PR, and a person. That's the property we care about most — not automation rate, not task volume, not how many things the model did without being asked. Accountability is the thing that makes the rest of it trustworthy.

We add automation where rework falls, not where demos look good. That discipline is harder than it sounds — demos always look good.

If you're considering a similar path and want deeper detail on policies, templates, or runbooks, reach out. We're happy to share patterns without sharing private code.
