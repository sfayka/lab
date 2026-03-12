---
layout: post
title: "How We Run AI Ops at Knox Analytics: OpenClaw + OpenAI Codex"
date: 2026-03-12
categories: [essays]
description: "A transparent walkthrough of the operating model we actually run: approvals-first orchestration with OpenClaw and repo‑native changes with OpenAI Codex."
---

This is a case study of how we operate AI in production at Knox Analytics today. It is not a vendor comparison; it is our stack and our process, with the controls we enforce.

> Scope & disclosure: We run **OpenClaw** as the orchestration/gateway and **OpenAI Codex** for code/engineering work. We do **not** operate Perplexity in production. Anything mentioned outside this stack is presented only as an alternative pattern, not a claim of use.

## Our operating model at a glance

- **Orchestration (OpenClaw):** channel intake (Slack), routing rules, approval matrices, audit logs, kill‑switches, and weekly governance.
- **Implementation (OpenAI Codex):** repo‑native edits with PRs, tests, and reviewer‑ready diffs; no direct merges, no prod deploys without human gate.
- **No desktop/local agents in prod:** we avoid file‑system wide agents; where local checks are needed, we scope them to deterministic scripts.

## Channel intake and routing

- Slack is the control surface. We collect triage signals (alerts, TODOs, brief prompts) and route them to owners.
- OpenClaw enforces a **policy matrix**: who can approve which action classes, at what times, and in which channels.
- We set conservative defaults: read‑only first, dry‑runs where available, and explicit timeboxes.

## Approvals, audit, and kill‑switches

- Every action with side‑effects requires an approval flow; approvals are logged with actor, scope, and expiry.
- We keep an immutable action log and attach evidence (outputs/links) to decisions.
- Any owner can trigger an emergency **pause** for a workflow family; resumption requires an explicit review.

## Code changes with OpenAI Codex

- Codex proposes branch changes only. We require: PR, tests, lints, and reviewer sign‑off.
- We scope Codex tasks to **bounded recipes** (e.g., dependency bump, selector fix, doc sync) with clear acceptance criteria.
- We track outcomes with simple metrics: success rate, rework rate, and time‑to‑merge.

## Weekly governance cadence

- A short standing review covers: last 7 days of logs, overrides, and exception root causes.
- Thresholds and SLAs are tuned here (impact gates, escalation windows, retry limits).
- We document 1–2 small process fixes each week; no “big bang” governance rewrites.

## What we don’t do (yet)

- No Perplexity Computer/Local in prod; no desktop‑wide agent privileges.
- No unsupervised merges or deploys; prod actions always require a human gate.
- No unlimited “memory” — we enforce TTL and keep context lean.

## Alternatives we’d consider and when

- Desktop/Local assistants (e.g., Perplexity Local) for **design/QA** pilots that need browser/OS context — only with strict playbooks, approvals, and rollback drills.
- Additional orchestration targets (ticketing/CRM) as volume grows — after logs/approvals prove stable.

## Why this works for us

- It’s **explainable**: every change ties back to a log line, a PR, and a person.
- It’s **incremental**: we add automation where rework falls, not where demos look good.
- It’s **secure by default**: read‑only, dry‑run, timebox, and kill‑switch as table stakes.

If you’re considering a similar path and want deeper detail (policies, templates, or runbooks), reach out — we’re happy to share patterns without sharing private code.
