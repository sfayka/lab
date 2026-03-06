---
layout: post
title: "Why Manager / Worker Agents Beat One Big Autonomous Bot"
date: 2026-03-05
categories: [essays]
published: false
---

I wanted one super-agent.

One thread. One brain. One place to talk to.

It felt elegant on paper. In practice, it turned into a polite chaos engine.

The same agent was planning work, executing work, validating work, and writing summaries about work. It looked productive in chat. It was less productive in reality.

Because eventually it started grading its own homework.

That’s the whole article.

If you’ve been building autonomous workflows and something feels “off” after the first wave of excitement, this is probably why.

---

## Where the single-agent approach starts to drift

At first, the setup feels great.

You give one long-running agent a backlog and broad authority. It writes code, runs checks, reports progress, and asks for review when needed. Velocity looks high. You get dopamine from clean status updates.

Then week two or three hits.

You start seeing familiar failure patterns:

- setup work gets reported like completed work,
- placeholder commands get treated like execution,
- stale tasks stay “active” because no one is aggressively reconciling state,
- weak output gets pushed to human review instead of fixed,
- and chat summaries sound confident even when queue reality is messy.

None of this requires a “bad model.”

It’s a control-plane design issue.

When the same unit does the work and judges the work, incentives blur. Even for software.

---

## Why manager/worker separation works better

The fix is less glamorous than a new model launch.

Separate roles.

### Manager role

- owns priorities,
- routes tasks,
- enforces queue policy,
- validates proof,
- reconciles state.

### Worker role

- executes assigned steps,
- runs commands,
- produces artifacts,
- reports results.

That separation does one important thing: the manager can reject bad work without also defending its own shortcuts.

You get less ambiguity. Fewer accidental lies. Better flow.

---

## What “healthy” actually looks like

A healthy agent system is boring in the right ways.

- Durable state is the source of truth (not chat memory).
- Non-trivial work runs through real step scripts.
- A successful step always advances state.
- Stale work gets recovered automatically.
- Workers do not set queue policy.
- Fake progress gets rejected quickly.

This is closer to operations management than chatbot interaction.

That’s good news, by the way. Ops problems are fixable with clear rules.

---

## The scaling reason nobody talks about

A single “do everything” agent accumulates too many conflicting directives:

- code,
- test,
- review,
- deploy,
- research,
- planning,
- reporting,
- and queue management.

Eventually you get attention splits and weak enforcement.

Not because the model is dumb. Because the role is overloaded.

A small role-based lane structure scales better:

- manager,
- builder,
- verifier,
- market/research.

You don’t need ten bots.

You need clear responsibility boundaries.

---

## A practical starting topology

If you’re setting this up from scratch, start here:

- **Manager:** queue owner, policy gate, state reconciler
- **Builder:** repo mutation and implementation work
- **Verifier:** tests, browser checks, proof validation
- **Market/Research:** recurring opportunity scans and trend analysis
- **Scout/Writing support:** synthesis and content drafting

Could this be four instead of five? Sure.

The exact count is not the point.

Role clarity is the point.

---

## The most important rule

Workers should never advance important state on narrative alone.

They need evidence:

- files changed,
- tests run,
- artifacts produced,
- commit SHA,
- PR URL.

Then manager policy decides what happens next.

If you skip this, your system gradually optimizes for convincing updates instead of reliable execution.

Looks the same in chat.

Very different in production.

---

## What the human operator should do (and stop doing)

In a good manager/worker system, the human doesn’t babysit every step.

The human should:

- set direction,
- change priorities when context changes,
- resolve real blockers,
- review high-impact merges.

The human should not:

- manually patch every worker mistake,
- trust chat summaries over durable state,
- interrupt healthy execution loops out of anxiety.

If humans are still doing constant rescue work, the architecture isn’t done.

---

## Build-in-public version: good, bad, ugly

### Good

Role separation improved throughput quickly. Status got cleaner. Review became about decisions, not archaeology.

### Bad

We still had transition debt. Old tasks and old assumptions don’t disappear just because you introduce a manager role.

### Ugly

The worst incidents came from “narrative completion” — work reported as done without hard proof. That one failure mode can poison trust across the whole system.

Once trust drops, everything slows down.

---

## Bottom line

The upgrade is not “more agents.”

The upgrade is a system you can trust under pressure:

- clear roles,
- explicit policy,
- durable state,
- evidence-based advancement.

That’s what scales.

Not one giant autonomous personality with too many jobs.

---

## Sources

- OpenAI, *Harness engineering* (reliable scaffolding around model behavior): <https://openai.com/index/harness-engineering/>
- OpenAI Symphony (orchestration patterns and run structure): <https://github.com/openai/symphony>
- Anthropic, *Agent teams* docs (multi-agent coordination framing): <https://docs.anthropic.com/en/docs/claude-code/agent-teams>
- Martin Fowler, *System of Record* concept (durable source-of-truth framing): <https://martinfowler.com/bliki/SystemOfRecord.html>
