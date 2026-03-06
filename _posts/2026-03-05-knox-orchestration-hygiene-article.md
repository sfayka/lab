---
layout: post
title: "Harness, Hygiene, and Human Gates"
date: 2026-03-05
categories: [essays]
published: true
---

## What We Learned While Stabilizing Knox Bot

Agents look magical for about an hour.

Then they touch real workflows.

Then you find out what actually matters: queue semantics, proof rules, state transitions, review scope, route capabilities. Not the model leaderboard. Not prompt poetry. Not whether the demo looked smooth on Friday.

We hit this wall while stabilizing Knox Bot on OpenClaw. Some failures were auth/session issues. Real, boring, fixable.

The bigger failures were harness failures.

That distinction matters.

If you call everything an “AI problem,” you’ll keep patching the wrong layer.

---

## The failures we actually had

Two classes of issues showed up:

1. runtime/auth/session breaks
2. orchestration control-plane bugs

The second class did more damage.

Concrete examples:

- A step could be marked `DONE` with fake or placeholder proof.
- Proof validation accepted values that looked structured but proved nothing.
- A successful step could execute more than once in a single scheduling slice.
- A step could succeed but leave the task in `RUNNING` with no advancement.
- Scheduler success handling could overwrite a more specific state chosen by the step.
- Human review was treated as stop-the-world by default, even when only one task needed review.

None of this is mystical model behavior.

It’s systems design.

---

## The central tension (and why teams keep stepping on this rake)

The model layer is probabilistic.

Your orchestration layer cannot be.

A model can vary in wording, plan structure, and intermediate reasoning. Fine.

But your system cannot vary on meanings like:

- what `READY` means
- what `WAIT_REVIEW` means
- what counts as success
- what blocks one task vs all tasks
- what route can actually execute tools

When those meanings drift, operations become unreadable. Stronger models make this worse, not better, because they can generate more plausible-looking wrong transitions.

(Yes, plausible is dangerous.)

---

## Why “harness engineering” is the right frame

OpenAI’s harness engineering framing and orchestration-first projects like Symphony point in the same direction:

- durable scaffolding beats clever prompting,
- explicit work units beat vague autonomy,
- proof-bearing execution beats status theater,
- inspectable artifacts beat chat-memory folklore.

Chat is explanation.

Queue state is reality.

If those disagree, trust the queue.

---

## The state model has to mean one thing

You need states with operationally narrow meanings:

- `READY`: runnable now with a valid executable next step
- `RUNNING`: a step is actively in flight
- `WAIT_REVIEW`: task-local human pause by default
- `BLOCKED`: cannot proceed, dependency missing
- `DONE`: deliverable exists and proof is real

Sounds obvious. Teams still break this constantly.

Typical anti-pattern: `READY` means “someone should probably do something soon.”

That is not a state. That is anxiety.

---

## Human review should not stop the world

This was one of our biggest throughput fixes.

Old behavior (effectively):
- any task in review => scheduler stalls broadly

That is too coarse for most teams.

Most reviews are task-local:
- PR merge
- content approval
- design signoff

Those should pause one task, not the entire queue.

Global pause should be explicit and rare:
- shared architecture decision
- cross-cutting security/legal approval
- dependency that multiple queued tasks truly require

So we moved to this policy:

- `WAIT_REVIEW` = task-local by default
- explicit `human-global` marker = stop-the-world

One distinction. Big operational difference.

---

## Every successful step must advance state

This sounds too basic to mention.

It isn’t.

A successful step must do one of three things:

1. set a new `next_command`
2. move to review/blocked/terminal state
3. move to `DONE` with valid proof

What it must never do: “succeed” and leave semantic state unchanged.

We saw exactly that failure mode:

- step executed,
- task stayed `RUNNING`,
- `next_command` still pointed to same work,
- loop repeated or left repeat debt for next cycle.

That’s how systems start feeling haunted.

They’re not haunted. They’re underspecified.

---

## Proof has to be real (or `DONE` means nothing)

We had completion states that passed with placeholder proof.

That’s a trust failure in the harness.

`DONE` should require durable artifacts, not optimistic intent:

- real file output,
- real commit,
- real PR,
- real test artifact,
- real verification record.

Process exit zero is not enough.

If fake `DONE` exists, every queue, dashboard, and summary becomes suspect.

---

## Route capability is policy, not transport

Another painful lesson: not all sessions are equal.

We had route mismatch between control/chat surfaces and execution-capable surfaces.

So don’t model this as “the bot has tools.”

Model it as:

- this route has this tool surface,
- under this sandbox policy,
- with this escalation path.

Precision removes operational guesswork.

Guesswork is where incidents breed.

---

## Hygiene baseline I’d enforce on any agent control plane

### Queue invariants

- `READY` always has executable `next_command`
- `RUNNING` cannot linger after success without explicit next step
- `DONE` requires non-placeholder proof
- `WAIT_REVIEW` is task-local by default
- only explicit global review markers halt the queue

### Step invariants

- success always advances state
- failures either retry under bounded policy or record explicit blocker
- no silent no-op success path
- scheduler does not clobber step-chosen specific state

### Capability invariants

- route capability surface is declared
- chat routes and direct execution routes are not assumed equivalent
- sandbox mode is inspectable
- privileged paths are explicit and auditable

### Operator invariants

- DB state is source of truth
- dashboard renders durable state, not inferred narrative
- review scope is explicit
- cleanup work is routine, not emergency-only

---

## Practical rollout order (without a rewrite fantasy)

Do not forklift-replace the system while semantics are still dirty.

We’ve tried versions of that move. It feels productive until month two.

Use this order:

1. tighten queue contract and document state meanings
2. patch scheduler semantics (state preservation, no-progress detection, gate scope)
3. enforce proof validation for terminal states
4. require step scripts to advance state explicitly
5. make route capability surfaces first-class metadata
6. only then layer richer dashboarding and higher-level orchestration

Boring order.

Reliable order.

---

## Why this matters even more with dashboards

A dashboard increases scrutiny. Good.

It also exposes semantic debt immediately:

- tasks that look active but are dead,
- `DONE` without real artifacts,
- queues blocked for wrong reasons,
- routes that look interchangeable but aren’t.

If control-plane semantics are clean, dashboards become operationally useful.

If semantics are dirty, dashboards are just prettier confusion.

---

## The practical thesis

If you’re running AI workers in production, the order is:

1. define task semantics,
2. define capability semantics,
3. define proof semantics,
4. enforce scheduler invariants,
5. then scale orchestration complexity.

This is why harness engineering matters.

This is why orchestration work is harder than it looks.

And this is why teams feel stuck: they think they have an “AI reliability” problem when they actually have a workflow-systems problem wrapped around a non-deterministic engine.

Different diagnosis. Different fix.

---

## Sources

- OpenAI, "Harness engineering": <https://openai.com/index/harness-engineering/>
- OpenAI Symphony: <https://github.com/openai/symphony>
- Paperclip: <https://github.com/paperclipai/paperclip>
- Oh My Codex: <https://github.com/Yeachan-Heo/oh-my-codex>
