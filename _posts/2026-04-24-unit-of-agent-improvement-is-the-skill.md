---
title: "The Unit of Agent Improvement Is Not the Prompt. It Is the Skill."
date: 2026-04-24
tags: [ai, agents, systems, skills, evals, openclaw, gbrain, automation]
categories: [essays]
layout: post
published: false
---

The next serious agent systems will not get better because somebody keeps rewriting the master prompt. They will get better because every repeated mistake turns into a durable operating unit: a skill with tools, tests, review gates, and a path back into the next run.

That sounds less magical than "memory." Good. Memory is too easy to turn into a pile of vibes. A skill is harder to fake.

![AI-generated editorial image for agent skill loops and verification gates]({{ "/images/generated/hermes/unit-of-agent-improvement-skill-hero.png" | relative_url }})

_Status: unpublished skeleton. This is a working outline, not a finished essay._

## Working Thesis

Agent improvement should be treated as an artifact lifecycle, not as a prompt-editing habit. The useful loop is: observe the failure, name the repeatable pattern, encode the fix as a skill, attach deterministic tools and regression checks, then make future agents route through that skill instead of relearning the lesson in chat.

## Target Reader

Technical operators, founders, and AI engineering leads who are already using coding or operations agents and are starting to feel the drag of repeated mistakes, lost context, ad hoc prompt patches, and "we fixed this last week" failures.

## Why Now

- Garry Tan posted that the cycle replacing a large share of his agentic coding is doing work with OpenClaw and then saying "SKILLIFY IT," tying the pattern to GBrain, personal context, and repeatable agent improvement: <https://x.com/garrytan/status/2046981289031667961>
- The quoted article attached to that thread is titled "How to really stop your agents from making the same mistakes": <https://x.com/i/article/2046866228703363072>
- Todd Hanford summarized the pattern as "thin harness, fat skills," with better long-running agents coming from deterministic tools plus evals, unit tests, E2E tests, and smoke tests: <https://x.com/thanford7/status/2046983297033765136>
- OpenAI's GPT-5.5 launch language emphasizes agents that understand complex goals, use tools, check their work, and carry more tasks through to completion: <https://x.com/OpenAI/status/2047376561205325845>
- This is highly correlated with existing Knox Lab themes: control planes, verification, evidence-backed completion, and the difference between agent narration and operational truth.

## Source Links

- Garry Tan, "SKILLIFY IT" / GBrain and OpenClaw workflow: <https://x.com/garrytan/status/2046981289031667961>
- Garry Tan article link surfaced by X, "How to really stop your agents from making the same mistakes": <https://x.com/i/article/2046866228703363072>
- Todd Hanford, "thin harness, fat skills" framing: <https://x.com/thanford7/status/2046983297033765136>
- OpenAI, GPT-5.5 announcement emphasizing tool use and checking work: <https://x.com/OpenAI/status/2047376561205325845>

## Existing Knox Context To Connect

- `Done According to What` argues that an agent's completion report is not verification.
- `Overnight, Unsupervised, and Still Telling the Truth` argues that long-running automation must classify outcomes honestly when nobody is watching.
- `Build Me a $1M ARR Product` frames the control plane as the system that normalizes work, routes it, collects evidence, and enforces lifecycle transitions.
- This post should extend that line of argument from task completion into system learning: how does the control plane remember what went wrong without turning every lesson into prompt soup?

## Outline

### 1. The Prompt Patch Is The New TODO Comment

Open with the production mismatch: an agent makes the same avoidable mistake twice. The common response is to add another sentence to the system prompt or paste another warning into the task. That feels like progress, but it is usually just an untracked TODO comment in a bigger blob of instructions.

Point to make: if the lesson has no owner, no trigger, no test, and no path into the execution flow, it is not a system improvement. It is a note.

### 2. Chat Memory Is Not An Operating Model

Draw the line between useful context and operational memory. Context helps the model answer this request. Operational memory changes what the system does next time.

Concrete contrast:

- Chat memory: "Remember that we prefer PRs with test plans."
- Skill: detects PR creation workflow, enforces a test-plan section, checks diff risk, runs the obvious validation, and blocks shipping when the artifact is missing.

The second one can be inspected. The first one can only be hoped for.

### 3. Thin Harness, Fat Skills

Use the discovered phrase carefully and cite it as a source, not as Sean's invention. The useful architecture is not a giant universal agent with every policy stuffed into one prompt. It is a smaller orchestration layer that routes into durable skills.

A skill should contain:

- trigger conditions: when should this run?
- deterministic tool calls: what can be checked without asking the model to guess?
- workflow steps: what sequence does the agent follow?
- regression tests: what past failures must not recur?
- review gates: when does a human need to decide?
- reporting format: what evidence comes back out?

This is where the Knox angle becomes strong: a skill is not just instruction. It is an operating contract.

### 4. The Difference Between Learning And Accumulating Lore

Teams already accumulate lore: Slack threads, docs, prompt snippets, postmortems, "remember to" notes. Agent teams will drown in the same thing unless lessons become executable.

The sharper claim: the bottleneck is not whether the model can understand the lesson. It is whether the system can route the right lesson into the right future situation without depending on a human to remember it.

Possible example to develop:

- A coding agent repeatedly opens PRs without updating docs.
- Bad fix: add "remember docs" to the global prompt.
- Better fix: create a `docs-impact-review` skill that detects changed interfaces, checks docs paths, asks for explicit "no docs needed" reasoning, and adds a PR checklist item.

### 5. Skills Need Evals Or They Become Rituals

A skill without a test is just a more formal prompt. The reason this pattern matters is that skills can carry regression checks.

Tie back to existing Knox writing about evidence: "It worked once" is not enough. The skill should prove it still catches the class of mistake it was created to prevent.

Potential structure:

- unit tests for deterministic parsing/routing
- smoke tests for the workflow end-to-end
- evals for the judgment-heavy parts
- fixture failures from real incidents
- review records when the skill escalates instead of deciding

### 6. The Control Plane Learns By Changing The Work, Not The Story

Bring it back to Sean's core theme. A control plane is not just a place where agents report completion. It is where the organization decides what counts as safe execution.

If an agent failure produces only a better explanation, the system did not learn. If it produces a skill that changes routing, checks evidence, and prevents the same miss from passing silently next time, the system learned.

## Key Claims To Validate

- The Garry Tan / GBrain / OpenClaw thread is current enough and relevant enough to anchor the piece.
- The phrase "thin harness, fat skills" should be attributed to Todd Hanford unless another earlier source is discovered.
- X's article link/title should be verified before quoting more than the surfaced title.
- The post should not imply that skills eliminate the need for model capability; the argument is that skills make capability repeatable and inspectable.
- The OpenAI GPT-5.5 source should be used as market context only, not as proof of specific reliability claims beyond the announcement text.

## Counterargument / Caveat

There is a real risk that "skillify everything" becomes bureaucracy. Not every one-off correction deserves a durable skill. The decision rule should be repetition plus consequence: if the mistake is likely to recur and the cost of recurrence matters, turn it into a skill. Otherwise, leave it as context or a note.

Also: skills can go stale. A bad skill is worse than no skill if it routes work through outdated assumptions with high confidence. The skill lifecycle needs ownership, tests, and deletion paths.

## Knox Analytics Angle

Knox should position this as the practical learning loop for operational AI. The value is not "we use agents." The value is building systems where repeated work becomes increasingly controlled, auditable, and less dependent on heroics.

For client work, this becomes a concrete offering:

- identify repeated operational failures
- turn them into workflow skills
- connect each skill to systems of record
- add verification and escalation gates
- report evidence instead of confidence

That is more credible than selling generic agent autonomy.

## TODOs For Expansion

- Verify the full Garry Tan article content if X article access allows it.
- Add one concrete before/after example from a real Knox or OpenClaw workflow.
- Decide whether to keep "thin harness, fat skills" in the title/subhead or leave it as a sourced section phrase.
- Add a small diagram or pseudo-contract showing what a skill contains.
- Cross-link internally to `Done According to What` and `Overnight, Unsupervised, and Still Telling the Truth` once final URLs are confirmed.
- Tighten the ending around a decision rule: if a lesson cannot be triggered, tested, and routed, it has not become operational memory.
