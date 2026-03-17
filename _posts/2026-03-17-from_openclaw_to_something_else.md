---
layout: post
title: "I Tried to Build an AI Agent. I Was Solving the Wrong Problem."
date: 2026-03-17
categories: [lab, ai, automation]
tags: [openclaw, codex, ai-agents, workflows, productivity]
published: true
---

## The idea

A few weeks ago, I got pulled into the idea of agent-based systems.

Tools like OpenClaw promise something that sounds incredibly powerful:

> Give it a task, and it figures out how to get it done.

Not just answering questions — actually doing work:
- breaking problems into steps  
- delegating to sub-agents  
- executing across systems  
- running autonomously  

If that works, it changes how you build.

So I went all in.

---

## The experiment

I didn’t just try it casually — I committed to it.

I built:
- a task harness  
- a queue system with prioritization  
- structured prompts for delegation  
- retries and execution loops  

I used ChatGPT and Codex heavily to:
- debug failures  
- improve prompts  
- refine execution  

And for a while, it *felt* like it was working.

It could:
- complete simple tasks  
- chain a few steps together  
- call tools and return results  

And when it worked, it was impressive.

---

## The reality

But over time, a pattern started to emerge.

It wasn’t reliable.

Not in the way I needed.

The problems were subtle at first, but consistent:

- tasks would stall halfway through  
- outputs would be partially complete with no clear signal  
- state would drift or disappear  
- retries were inconsistent  
- I had to constantly check what it was doing  

It wasn’t “delegate and walk away.”

It was:

> delegate… and then babysit it

---

## What I thought the problem was

My first instinct was that I was doing something wrong.

Maybe:
- my prompts weren’t good enough  
- I needed better task breakdown  
- I needed more structure  
- I needed more agents  

So I kept iterating.

More prompts.  
More configuration.  
More orchestration.

---

## What the problem actually was

Eventually it clicked.

The issue wasn’t the model.  
It wasn’t the prompts.

It was the system.

I was trying to use an **agent framework** to do the job of a **workflow system**.

Those are not the same thing.

---

## What was missing

What I actually needed was:

- a clear task model  
- explicit state (queued, running, done, failed)  
- deterministic execution  
- observable outputs  
- reliable completion  

What I had instead was:

- a conversational loop  
- implicit state  
- probabilistic planning  
- loosely connected tool calls  

In other words:

> it looked powerful, but it wasn’t built for reliability

---

## The shift

The turning point was simple:

> stop trying to build an agent  
> start building a system  

Instead of:

> give this to the agent and hope it figures it out

I moved to:

> define the work clearly, then let something execute it

---

## The new system

What I use now is much simpler:
- ChatGPT → thinking / planning
- Linear → task system
- Codex → execution
- Cursor → refinement

That’s it.

No orchestration layer.  
No agent hierarchy.  
No complex runtime.

---

## How it actually works

1. I use ChatGPT to:
   - explore ideas  
   - break things into tasks  

2. I put those tasks into Linear:
   - small  
   - bounded  
   - clearly defined  

3. I assign tasks to Codex:
   - it executes  
   - opens PRs  
   - returns results  

4. I review and move on

---

## The difference

The experience is completely different.

### Before (agent-first)

- unclear progress  
- fragile execution  
- constant intervention  
- hard to debug  

### After (task-first)

- clear state  
- predictable behavior  
- fast iteration  
- real output  

---

## The surprising part

The new system feels…

boring.

And that’s exactly why it works.

---

## What OpenClaw is actually good at

This isn’t a knock on OpenClaw.

It *is* useful.

It works well for:
- scheduled tasks  
- simple automation  
- recurring summaries  
- lightweight workflows  

Where it struggles:

- long-running tasks  
- multi-step execution  
- anything that needs to be reliable  

---

## What I learned

The biggest lesson wasn’t about a tool.

It was about architecture.

> don’t start with agents  
> start with structure  

If you don’t have:
- a task model  
- clear execution boundaries  
- observable state  

…adding agents just makes things harder.

---

## Where this leads

Once you have a system like this:

- you can still use AI for planning  
- you can still use AI for execution  
- you can still automate parts of the flow  

But now:

> the system controls execution  
> the model fills in the gaps  

Not the other way around.

---

## Final thought

I didn’t abandon the idea of AI agents.

I just stopped trying to make them do something they weren’t built for.

And once I did that:

> I got more done in a few days than I did in weeks of trying to “build the perfect agent”

---

## Next

I’m now building a small tool based on this workflow:

email → structured issue → Linear → Codex → follow-up

It’s something I’ll actually use.

Which is a good sign.
