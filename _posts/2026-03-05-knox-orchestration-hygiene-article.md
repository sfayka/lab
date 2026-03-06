---
layout: post
title: "Harness, Hygiene, and Human Gates"
date: 2026-03-05
categories: [essays]
published: false
---



## What We Learned While Stabilizing Knox Bot

AI agents are impressive right up until they touch production-like systems for more than a few hours.

Then the real work begins.

Not model selection. Not prompt cleverness. Not whether the agent can write decent code in a clean demo. The real work is orchestration hygiene: task state, execution boundaries, review policy, proof semantics, failure handling, and the uncomfortable fact that a non-deterministic worker still needs to behave inside deterministic operational rules.

This document is both a field report and a design guide. It explains what broke while stabilizing Knox Bot on top of OpenClaw, why those failures were predictable, and how existing public work like OpenAI's harness engineering framing and Symphony's orchestration model point toward a cleaner way to build these systems.

The short version is simple:

- Humans should steer.
- Agents should execute.
- The harness must be legible.
- Queue semantics must be explicit.
- A successful step must always advance state.
- Human review should pause only the work that actually depends on that review.

If those rules are not enforced, the system does not become "agentic." It becomes ambiguous.

## The Problem We Actually Had

The Knox Bot stack had two different classes of issues:

1. runtime/auth/session problems
2. orchestration control-plane bugs

The auth failures were real. A broken OAuth state can absolutely stop a system from responding. But after re-authentication, the more important failures were not model failures. They were harness failures.

The orchestrator had several concrete bugs:

- A step could be marked `DONE` using fake runtime proof.
- Proof validation was too weak and accepted placeholder values.
- A successful step could repeat multiple times in one scheduling slice.
- A step could succeed but leave the task in `RUNNING` without advancing `next_command`.
- The success path could overwrite a more specific state chosen by the step itself.
- Human review gates were treated as stop-the-world by default, even when they should have been task-local.

None of those are "AI problems" in the mystical sense. They are systems-design problems.

That distinction matters because it changes how you fix them.

## Why This Keeps Happening

AI is non-deterministic at the content layer.

Orchestration cannot be.

That is the central tension of agent systems. A model can produce variable wording, variable plans, variable code, and variable intermediate reasoning. But the machine around it cannot afford variable meanings for things like:

- what `READY` means
- what `WAIT_REVIEW` means
- whether a step succeeded
- whether a task is globally blocked
- whether a task has advanced
- whether a session can execute file or shell work

If those meanings drift, the system becomes operationally unreadable. The more capable the model becomes, the worse this gets, because a stronger model can produce more plausible-looking wrong transitions.

That is why harness engineering is the right frame.

OpenAI's harness engineering argument is not really about writing prettier prompts. It is about moving operational intelligence into a durable, inspectable scaffold around the model. Symphony makes a similar point from the orchestration side: isolated runs, explicit work units, and proof-bearing execution matter more than vague "agent autonomy."

This is also why it is a mistake to treat chat memory as the system of record. Chat is explanation. The queue is reality.

## The Public Work That Mattered

Several public projects are close to what many teams are building now:

- OpenAI's harness engineering article
- OpenAI Symphony
- Paperclip
- Oh My Codex

They are not identical, but they are directionally aligned.

### Harness Engineering

The harness engineering framing is the most important of the four for this exact problem.

The main lesson is that reliable agentic work comes from durable scaffolding:

- repository-local instructions
- explicit workflows
- inspectable artifacts
- progressive disclosure
- feedback loops
- cleanup and garden work

This is the difference between "an agent that sometimes does useful things" and "a system that can be trusted to keep working."

### Symphony

Symphony is closer to orchestration architecture.

The useful ideas are:

- isolated implementation runs
- explicit work units
- clear run boundaries
- artifacts that prove what happened
- an assumption that harness discipline already exists

The critical point is that orchestration should manage work, not vibes.

### Paperclip

Paperclip is useful at a higher layer.

It looks more like a multi-agent operating surface for organizations: goals, coordination, visibility, oversight.

That matters, especially once a dashboard exists, but it is not the first fix for queue semantics. A dashboard over a dirty orchestrator just makes the mess easier to watch.

### Oh My Codex

Oh My Codex is helpful for operator ergonomics: hooks, team workflows, local feedback surfaces, practical glue.

That is useful, but it is not the primary answer to task-state correctness.

## The Core Design Principle

Do not invent everything from scratch.

Also do not forklift-swap the system while it is still unstable.

The right move is to borrow proven principles and apply them to the harness you already have:

- keep the current orchestrator
- fix its semantics
- tighten its invariants
- make its policy explicit
- only then decide whether to adopt larger external components

This is less exciting than replacing the whole stack. It is also how you avoid replacing one ambiguous system with another.

## The State Model Has To Mean Something

The queue should have states that are operationally unambiguous.

At minimum:

- `READY`: the task is runnable now and has a valid executable next step
- `RUNNING`: a step is in flight or the task is actively being worked
- `WAIT_REVIEW`: the task is paused for human input, but this does not imply a global stop
- `BLOCKED`: the task cannot proceed because a dependency is missing
- `DONE`: the deliverable exists and the proof is real

That looks obvious on paper. In practice, systems break because they smuggle extra meanings into those labels.

For example, `READY` cannot mean "there is a task description and maybe somebody will know what to do." It must mean "the orchestrator can execute a concrete first step now."

Similarly, `WAIT_REVIEW` cannot mean both:

- this task needs a human to look at it
- stop the whole system

Those are different operational meanings. They need different policy.

## Human Review Should Not Stop the World by Default

This was one of the most important corrections.

The original human gate behavior effectively meant:

- if any task is in review, stop scheduling

That is far too coarse.

Most review is task-local:

- a PR waiting for merge
- a content draft waiting for approval
- a design waiting for signoff

Those should pause that task and nothing else.

Global stop should be reserved for true shared dependencies:

- a product decision that several queued tasks depend on
- a security approval that blocks deployment work broadly
- an architecture choice that downstream execution must not guess

The policy should therefore become:

- `WAIT_REVIEW` means task-local human pause
- explicit `human-global` markers mean stop-the-world

That one distinction dramatically improves throughput without reducing control.

## Every Successful Step Must Advance

This sounds trivial. It is not.

A successful step must always do one of three things:

1. set a new `next_command`
2. move the task to a terminal or review state
3. move the task to a blocked state with an explicit unblock path

What it must never do is succeed and leave the task semantically unchanged.

That was one of the clearest orchestration failures in Knox:

- a step ran successfully
- the task remained `RUNNING`
- `next_command` still pointed to the same work
- the loop either repeated or left a latent repeat for the next cycle

This is exactly the kind of bug that makes agent systems feel haunted. The machine did what it was told, but the system did not move.

The fix is not more reasoning. The fix is an invariant.

## Proof Has To Be Real

Another failure mode was fake completion proof.

The orchestrator originally allowed tasks to be marked `DONE` using placeholder proof fields like `runtime`, `pending`, or synthetic artifact paths that did not represent real deliverables.

That is a harness-level trust failure.

`DONE` should be harder to achieve than "the process exited zero."

Real completion proof should be tied to actual output:

- a real file
- a real commit
- a real PR
- a real verification artifact
- a real test result

If the system allows fake `DONE`, every dashboard, queue, and status summary becomes suspect.

## Session Routes Are Policy, Not Just Transport

Another important lesson was that not all agent sessions are equivalent.

Knox had a real mismatch between:

- a Slack-routed control session
- a direct execution-capable session

That means session routing is part of the policy layer, not just the delivery layer.

If one route can read files and execute shell commands and another cannot, then the orchestrator must know that and the operator must know that.

The wrong way to model this is:

- "Knox has tools"

The right way to model it is:

- "this route has this capability surface under this sandbox policy"

That is much more precise, and precision is what prevents invisible failure.

## What a Clean Orchestration Layer Should Enforce

Here is the hygiene baseline I would enforce in any agent control plane:

### Queue invariants

- `READY` always has a valid executable `next_command`
- `RUNNING` cannot persist after a successful step unless a new step is explicitly set
- `DONE` requires non-placeholder proof
- `WAIT_REVIEW` is task-local by default
- only explicit global human gates stop the loop

### Step invariants

- every successful step advances state
- every failure either retries under bounded policy or records a blocker
- a step cannot silently noop the queue
- state chosen by the step must not be clobbered by the scheduler

### Capability invariants

- session routes declare their tool surface
- direct execution routes and chat routes are not assumed equivalent
- sandbox mode is inspectable
- privileged execution is explicit and auditable

### Operator invariants

- chat can explain work, but DB state wins
- dashboards render durable state, not inferred narrative
- review semantics are explicit
- cleanup is routine, not heroic

## How To Implement This Without Rebuilding Everything

This is the practical path.

### 1. Tighten the queue contract

Define, document, and enforce the meaning of each state.

Do not leave semantics in human memory.

### 2. Patch the scheduler before adding more features

Do not build a richer dashboard on top of ambiguous queue logic.

Fix:

- success-path state preservation
- no-progress detection
- explicit human-global gating only
- proof validation

### 3. Make step scripts responsible for state advancement

If a step succeeds, it must:

- set the next step
- or set review
- or set blocked
- or set done

This is simpler and more legible than asking the scheduler to infer future intent.

### 4. Distinguish execution routes from chat routes

Do not say "the bot has tools."

Say:

- direct route: execution-capable
- Slack route: chat/control only
- browser route: allowed or not allowed
- sandbox mode: host, container, restricted, or off

That turns operational mystery into explicit policy.

### 5. Keep artifacts local and inspectable

The durable system of record should be:

- the queue DB
- exported queue JSON
- scripts
- docs
- proof artifacts
- repo-local instructions

Not ephemeral chat context.

### 6. Add review scope as first-class metadata

If a review is global, encode that directly.

For example:

- `blocked_on=human-review`
- `blocked_on=human-global`

That is enough to make the scheduler intelligible.

## Why This Matters More Once You Have a Dashboard

A dashboard increases pressure on the orchestration layer.

That is good, because it forces honesty.

But it also means sloppy semantics become instantly visible:

- tasks that look active but are dead
- items marked done without proof
- queues blocked for the wrong reason
- routes that appear interchangeable but are not

The fix is not a prettier dashboard. The fix is a truthful system beneath it.

If the control plane is clean, the dashboard becomes operationally useful.

If the control plane is dirty, the dashboard becomes theater.

## The Deeper Lesson

The hardest part of AI operations is not getting a model to do clever things.

It is making sure the surrounding system has stronger semantics than the model does.

Models are probabilistic.

Your queue cannot be.

Models are expressive.

Your state transitions cannot be vague.

Models can improvise.

Your review policy cannot improvise.

Once you accept that, the architecture gets clearer. You stop expecting the model to magically produce operational correctness, and you start building the harness that makes correctness possible.

That is what this whole Knox incident really showed.

## The Practical Thesis

If you are building an AI worker system today, the right order is:

1. define durable task semantics
2. define route and capability semantics
3. define proof semantics
4. enforce scheduler invariants
5. only then add richer dashboards, multi-agent coordination, and higher-level orchestration

This is why harness engineering matters.

This is why Symphony is useful.

This is why "agentic" systems need more explicit policy, not less.

And this is why the work feels complicated: because it is not only an AI problem. It is an operating systems problem, a workflow systems problem, and a human factors problem wrapped around a non-deterministic engine.

## Sources

- OpenAI, "Harness engineering": <https://openai.com/index/harness-engineering/>
- OpenAI Symphony: <https://github.com/openai/symphony>
- Paperclip: <https://github.com/paperclipai/paperclip>
- Oh My Codex: <https://github.com/Yeachan-Heo/oh-my-codex>

## Suggested Follow-up

This document can become either:

- an internal Knox orchestration spec
- a public article about what breaks when you move from "chatting with AI" to "operating AI workers"

If publishing it, the next improvement would be adding:

- one concrete before/after queue-state diagram
- one table of state invariants
- one incident timeline from the Knox stabilization work
- one short appendix showing the exact human-gate policy change
