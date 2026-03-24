---
title: "AI Agents Aren’t Failing Because They’re Dumb"
date: 2026-03-24
tags: [ai, agents, systems, automation, harness]
---

There’s a version of the story we keep telling about AI agents that sounds reasonable on the surface.

The models just aren’t there yet. They’re not reliable enough, they lose context, they hallucinate, they need better reasoning. Give it another release or two and everything will stabilize.

That explanation held up right until I started trying to use them for real work.

Not demos. Not one-off prompts. Actual tasks tied to systems — Linear tickets, repositories, things that either ship or don’t. I ran OpenClaw, experimented with Paperclip, wired things together, and let them try to operate with some level of autonomy.

That’s when the explanation stopped making sense.

Because the failures weren’t about intelligence.

They were about everything around it.

---

The moment that really forced the issue for me was simple.

A task was marked as completed.

No PR. No commit. No artifact. Nothing in the repo. Nothing in Linear beyond a status change. Just a system confidently reporting that something had been done.

Done according to what?

If there’s no observable output, what exactly completed?

It’s a small thing until you realize how often it happens.

---

Multi-step work is where it becomes impossible to ignore.

Single tasks usually work. Ask for something bounded and you’ll often get a reasonable result. But as soon as the work requires sequencing — do this, then that, then validate, then integrate — things start to drift.

Steps get skipped. Context degrades. Progress stalls somewhere in the middle.

And now you’re in this awkward position where you don’t know if it’s still working or quietly stopped five minutes ago.

So you check in. You rephrase. You nudge it forward.

At some point it becomes obvious you’re not delegating anything. You’re supervising a system that needs constant intervention to stay on track.

That’s not autonomy. It just feels like it for the first few minutes.

---

The silent failures are worse.

At least a hard failure gives you something to react to. These systems tend to just… stop. No clear failure state. No indication of what went wrong. No retry behavior.

If you’re not watching closely, you won’t even know it didn’t finish.

And if you can’t tell whether something completed, failed, or stalled, you don’t really have a system. You have a conversation that sometimes produces results.

---

The easy conclusion is that the models aren’t good enough.

But that doesn’t quite hold up.

The same models can:
- write working code
- break down problems
- fix their own errors when prompted correctly

So the capability is there.

What’s missing is everything that makes work *reliable*.

---

Right now, most agent setups rely on prompts as the interface for work.

But prompts don’t define:
- what the task actually is
- what state it’s in
- what completion means

They don’t give you a way to say, with any confidence, “this is done.”

They just produce output and move on.

That’s fine for chat. It breaks down quickly for systems.

---

If you step back, the pattern is pretty consistent.

There’s no structured task definition beyond a blob of instructions. No lifecycle tracking beyond whatever the tool decides to surface. No verification that ties completion to something real, like a commit or a PR.

So everything becomes probabilistic.

Sometimes it works. Sometimes it doesn’t. And you’re left filling in the gaps manually.

---

OpenClaw is a good example of this.

If what you want is a capable chat-driven agent that can run scheduled work, it’s solid. It’s useful. It does exactly what it’s designed to do.

But if you try to treat it like a system that can reliably execute multi-step tasks and produce real outputs without supervision, you start running into the same problems over and over again.

Not because it’s poorly built.

Because that layer just isn’t there.

---

That’s the part that’s been missing in everything I’ve tried so far.

Not better reasoning. Not more autonomy. Not another agent framework.

A control layer.

Something that defines tasks clearly, tracks their lifecycle explicitly, and only considers them complete when there’s actual evidence that the work happened.

Until that exists, you don’t really have autonomous systems.

You have tools that look autonomous, as long as you’re watching them closely.

---

That’s the direction I’m moving in now with Harness.

Not another agent.

A system that sits around the agent and makes the work itself reliable.

Because at this point, the model isn’t the bottleneck.

Everything around it is.
