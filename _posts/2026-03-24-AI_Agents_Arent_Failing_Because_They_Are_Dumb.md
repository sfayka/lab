---
title: "AI Agents Aren’t Failing Because They’re Dumb"
date: 2026-03-24
tags: [ai, agents, systems, automation, harness]
categories: [essays]
published: true
---

There is a version of the AI agent story that sounds reasonable right up until you try to run real work through it. The models just are not there yet. They lose context, hallucinate, miss edge cases, and need another generation or two before autonomy becomes trustworthy.

I believed some version of that too, at least until I started using these systems on actual operating work instead of clean demos. Not toy prompts. Not one-off coding tricks. Real tasks tied to Linear tickets, repositories, status changes, and outputs that either exist or do not. I ran OpenClaw, experimented with Paperclip, wired pieces together, and let them operate with some level of autonomy.

That is when the standard explanation stopped holding up. The failures did not feel like intelligence failures. They felt like systems failures.

> **The models are not the whole problem. The control layer is the problem.**

The moment that forced the issue for me was not dramatic. A task got marked completed. There was no PR, no commit, no artifact, nothing in the repo, and nothing in Linear beyond the status change itself. Just a system confidently reporting that work had been done.

**Done according to what?**

That question matters more than people think. If there is no observable output, then completion is just a feeling the system had about itself. That is fine in chat. It is useless in operations.

The pattern gets harder to ignore once you move from single tasks to multi-step work. Ask an agent to handle something bounded and you will often get a reasonable result. Ask it to sequence work across stages, validate intermediate output, and integrate the result into a live workflow, and things start to drift. Steps get skipped. Context degrades. Progress stalls halfway through. You end up staring at the terminal trying to decide whether the system is still working or quietly stopped five minutes ago.

That is the point where the autonomy story starts to fall apart. You check in, rephrase, restate the task, and nudge it forward. Eventually it becomes obvious that you are not delegating work. You are supervising a system that needs regular intervention to remain pointed in the right direction. That is not autonomy. It is managed drift.

> **That is not autonomy. It is managed drift.**

The silent failures are worse than the obvious ones. At least a hard failure gives you something to respond to. A traceback is annoying, but it is legible. A silent stall is operational poison. These systems often just stop. No clear failure state. No retry policy you can trust. No explicit indicator of whether the task failed, stalled, or never actually started the important part.

If you cannot tell whether a piece of work completed, failed, or stalled, then you do not really have a system. You have a conversation that sometimes produces useful artifacts.

*A conversation is not a workflow.*


The easy conclusion is that the models are not capable enough yet. I do not think that fully survives contact with reality. The same models can write working code, break down problems, and fix their own mistakes when prompted correctly. They can clearly do useful work. The issue is not raw capability in the narrow sense. The issue is that almost none of the surrounding machinery makes that work reliable.

That distinction matters because it changes where the bottleneck actually lives. If the model can generate competent work but the system cannot define, track, verify, and complete that work consistently, then the model is not your first operational problem. Your control layer is.

> **If the model can do useful work but the system cannot verify it, your bottleneck is not intelligence. It is operations.**

Right now, most agent setups still rely on prompts as the main interface for work. That is the architectural weakness hiding in plain sight. Prompts can describe intent, but they do not define a task model. They do not give you explicit lifecycle state. They do not tell you what completion means in a way another system can verify. They do not let you say, with confidence, that a task is done because evidence exists in the world beyond the model saying so.

That is why chat-native systems feel impressive and fragile at the same time. They are good at producing output. They are much worse at carrying operational accountability.

**Prompts can express intent. They cannot carry accountability.**

If you step back, the pattern is consistent across tools. There is usually no structured task definition beyond a blob of instructions. Lifecycle tracking is thin or implied. Verification is weak. Completion is rarely tied to something concrete like a commit, a PR, a deployed artifact, or a state transition backed by evidence.

So the whole workflow becomes probabilistic. Sometimes it works. Sometimes it drifts. Sometimes it says it worked and leaves nothing behind. Then a human steps in and patches the gap manually, which is the part people forget to count when they say the system is autonomous.


OpenClaw is a good example. If what you want is a capable chat-driven agent that can run scheduled work and handle lightweight flows, it is useful. It does what it is designed to do. But if you try to treat it like a system that can reliably execute multi-step work with minimal supervision and leave behind trustworthy outputs, you run into the same failure modes over and over again.

That is not because OpenClaw is badly built. It is because people keep asking an agent shell to behave like a workflow engine with a real control plane.

*Agent shell* and *workflow engine* are not interchangeable categories.


That is the missing layer in almost everything I have tried so far. Not better reasoning. Not more autonomy. Not another agent framework. A control layer.

The missing piece is something that defines tasks clearly, tracks lifecycle explicitly, and only considers work complete when there is real evidence the work happened. A PR exists. A commit landed. A document was generated. A ticket changed state because a verifiable artifact was attached to it. Until you have that layer, autonomy is mostly theater.

You do not have an autonomous system. You have a tool that looks autonomous as long as a human operator is standing nearby to keep the illusion intact.

> **Until completion is tied to evidence, autonomy is mostly theater.**

That is the direction I am moving in now with Harness. Not another agent. A system that sits around the agent and makes the work itself reliable.

At this point, I do not think the model is the main bottleneck for a lot of teams trying to operationalize agents. The bottleneck is everything around it: task definition, state management, verification, routing, retries, and the discipline to treat completion as an evidence problem instead of a vibes problem.

That is where the next real gains are going to come from. Not smarter demos. Better operating systems for work.

> **Not smarter demos. Better operating systems for work.**
