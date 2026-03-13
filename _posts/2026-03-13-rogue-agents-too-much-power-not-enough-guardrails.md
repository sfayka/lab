---
layout: post
title: "Rogue Agents: Too Much Power, Not Enough Guardrails"
description: "Documented failures of AI agents in the wild — and the practical controls that would have prevented them."
categories: ai, agents, security, governance
tags: [agents, security, prompt-injection, governance]
---

Hook
- Agents are shipping into real systems. Some have already done damage — data wiped, secrets leaked, bills spiked. The pattern isn’t “AI is dangerous.” It’s “we gave it authority without guardrails.”

Why this matters now
- Vendors are adding evals, approval gates, and control planes — but teams still wire agents straight to production. This piece is a field guide: real incidents, root causes, and the few controls that prevent most of them.

Documented incidents (with sources)

<!-- Scout: insert 6–10 bullet incidents here. For each: 1–2 sentence summary + impact + 1–2 credible links + root cause (permissions/guardrails) -->
- [TODO] Incident #1 — summary, impact, source, root cause
- [TODO] Incident #2 — summary, impact, source, root cause
- [TODO] Incident #3 — summary, impact, source, root cause
- [TODO] Incident #4 — summary, impact, source, root cause
- [TODO] Incident #5 — summary, impact, source, root cause
- [TODO] Incident #6 — summary, impact, source, root cause

The playbook: controls that stop the failures

<!-- Market: map controls to incident classes, with links/tools -->
1) Permissioning & scope
   - Per-action scopes, resource scoping, time-bounded tokens, policy-as-code
   - Least-privilege data views (read-only mirrors first)
2) Sandboxing & isolation
   - Filesystem/network sandboxes; deny-by-default outbound; allowlists for data sources/hosts
3) Human-in-the-loop
   - Approval gates, diff previews, dry-run/shadow modes, rollback switches
4) Validation & policy checks
   - Structured output schemas, content policy validators, budget/cost caps, canary tests/evals
5) Prompt-injection defenses
   - Retrieval isolation, allowed-link lists, content sanitizers, model-side/app-side filters
6) Observability
   - Audit logs with diffs+reasons, anomaly alerts, uncertainty triggers, incident review templates

Incident → control mapping (quick reference)
- Data loss (mass edits/deletes) → read-only first, diff+approve, write-behind + human gate
- Secret leaks → redaction in logs, zero-trust retrieval, no long-lived tokens, outbound domain allowlist
- Cost blow-ups → per-run/tenant budget caps, loop guards, circuit breakers, telemetry alerts
- Compliance breaches → policy validators pre-action, DLP checks, deny disallowed endpoints
- Prompt injection → isolate retrieval, strip/neutralize untrusted content, approved-source allowlist

7‑Day hardening plan (ship safely without heroics)
- Day 0: Write the spec (trigger, inputs, allowed actions, output schema, handoff rule, rollback rule). Draft 5 golden tests.
- Day 1: Access — least-privileged service accounts; read-only first; scoped tokens; log everything.
- Day 2: Skeleton — single tool, draft-only writes, structured logs.
- Day 3: Evals — run golden tests + 2 real historical examples; capture diffs/failures.
- Day 4: Guardrails — policy checks (allowlists, DLP), hold-for-approval.
- Day 5: Shadow/staging — compare against human baseline; track time saved + error deltas.
- Day 6: Ramp — 10% rollout with rollback switch; escalate on uncertainty.
- Day 7: Decide — expand, iterate, or kill; document lessons.

Closing
- Autonomous can wait. Trust can’t. Most “rogue” stories are just missing basics: scope, review, and visibility. Put guardrails in first — then give your agents real work.

References
<!-- Add final curated links once Scout/Market briefs land -->
- [TODO]