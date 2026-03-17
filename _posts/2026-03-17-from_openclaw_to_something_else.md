---
layout: post
title: "I Built an AI Agent. I Was Solving the Wrong Problem."
date: 2026-03-17
categories:
   - lab
   - ai
   - automation
tags:
   - openclaw
   - codex
   - ai-agents
   - workflows
   - productivity
published: true
slug: built-ai-agent-solving-wrong-problem
---

## The idea

A few weeks ago, I got pulled into the same temptation a lot of builders are feeling right now: if agents can plan, call tools, and keep going on their own, maybe the next layer of software is just “let the model handle it.” That sounds like leverage. It also sounds like the future, so I built toward it. I wired up OpenClaw, added a task harness, set up a queue, and built a thin execution loop around it.

On paper, it looked like the right kind of system. In practice, it felt like trying to run a warehouse with a very confident intern who could talk a good game but kept losing the pallet jack. The early demos were convincing enough to keep me going. It could break work into steps. It could call tools. It could finish simple tasks. Every time it did something correctly, it felt like I was one prompt away from a clean autonomous workflow.

> **That was the trap.**

The short version: **I built an agent when I needed a workflow**.

## What I thought I was building

I thought I was building an agent platform. That was the pitch in my head: give the system a task, let it decide how to get there, and let the model handle the messy middle.

That idea is seductive because it sounds like removing work. In reality, it often just moves the work somewhere less visible. You stop writing code, but you start supervising behavior. You stop managing one clear process, but you inherit five vague ones.

And that is exactly what happened.

<u>Less implementation</u> is not the same thing as <u>less operational burden</u>.

## What actually happened

The system wasn’t broken in a dramatic way. It didn’t crash every time or fail obviously. It failed in the annoying, expensive way that makes you question your own judgment. Tasks would stall halfway through. Outputs would come back half-finished. State would drift. Retries would behave differently depending on the mood of the loop. I had to keep checking what it was doing, which meant I never really got to trust it.

The best way I can describe it is this: I had built something that looked like a conveyor belt, but it behaved like a conversation. It could talk about the package. It was not great at moving the package.

That distinction matters. Conversations are flexible. Workflows are accountable. If you mix those two up, you end up with something that feels intelligent and acts fragile.

> **Conversations are flexible. Workflows are accountable.**

## The wrong diagnosis

My first instinct was to blame the usual suspects. Maybe the prompts were weak. Maybe the task breakdown wasn’t clear enough. Maybe I needed better retries, more structure, more agents, one more layer of orchestration, one more abstraction to smooth things out.

That is the classic builder reflex when a system gets flaky: add more scaffolding and hope the structure starts behaving like intent.

It didn’t.

I kept tightening the prompts and tuning the loop, but I was polishing the wrong part of the machine. I was treating the failure like a model problem when it was really an architecture problem.

## The real problem

Eventually the thing snapped into focus. I wasn’t trying to build an agent. I was trying to build a workflow system and making it wear an agent costume.

**Those are not the same product.**

An agent framework is good at flexible reasoning, loose planning, and opportunistic tool use. A workflow system is good at state, boundaries, repeatability, and clean handoffs. If you ask one to pretend to be the other, you get the worst of both worlds: the uncertainty of a model with none of the discipline of a real pipeline.

What I actually needed was not “smarter autonomy.” I needed a system that knew where work lived, what state it was in, when it was done, and how to tell me when it wasn’t.

*That* is the difference between a demo and an operating system.

## What changed

Once I stopped chasing the agent fantasy, the design got much simpler.

I moved toward a boring stack on purpose:

- **ChatGPT** for thinking and decomposition
- **Linear** for holding the actual task
- **Codex** for execution
- **Cursor** for refinement

That sounds less exciting than a “fully autonomous agent.” It is less exciting. It is also more usable.

The shape of the work became clear. I use ChatGPT to explore the problem and break it down. I put the resulting tasks into Linear so they have clear state and ownership. I hand implementation to Codex when there is an actual piece of work to do. Then I review the output and move forward.

No magic. Just a cleaner division of labor.

## The difference in practice

The old setup felt like babysitting a very clever tool that might drift off the rails if I blinked. The new setup feels like operating a system. Progress is visible. Status is visible. Failures are legible. If something goes wrong, I can see where it happened instead of trying to reconstruct a trail of partial reasoning.

That difference is huge.

It is the difference between asking a chef to cook in your head and running a kitchen with labeled stations. One sounds elegant. The other actually ships dinner.

And the weird part is that the better system feels boring. That is not a flaw. That is usually the signal that the architecture is finally doing its job.

> **Boring is often what reliability looks like.**

## What OpenClaw is actually good at

This is not a takedown of OpenClaw. It is useful. I still think it has a place.

It works well for scheduled tasks, recurring summaries, lightweight automation, and other jobs that are narrow enough to tolerate some looseness. It is fine when the stakes are low and the path is short.

Where it gets shaky is the territory where reliability matters more than novelty. Long-running tasks. Multi-step execution. Anything that needs a strong guarantee that state will hold together from beginning to end.

That is where “agentic” starts to sound more like “approximate.”

## The lesson

The biggest thing I learned here wasn’t about a tool. It was about respecting the difference between a model and an operating system for work.

If you don’t have a task model, if you don’t have execution boundaries, if you don’t have observable state, then adding more autonomy is like bolting a jet engine to a shopping cart. It may be exciting for a minute. It is not a serious way to move freight.

The better move is to start with structure and let the model fill in the gaps.

That is the operating lesson I keep coming back to: the system should control execution. The model should help with reasoning inside that system. Not the other way around.

> **System first. Model second.**

## Where this goes next

I am still building from this workflow. The next thing I want is a small tool that turns email into a structured issue, routes it into Linear, hands it to Codex, and tracks the follow-up cleanly.

That is a much more interesting problem than “can I build a perfect agent.” It is also a much more useful one.

I did not abandon the idea of AI agents. I just stopped asking them to solve the wrong problem.
