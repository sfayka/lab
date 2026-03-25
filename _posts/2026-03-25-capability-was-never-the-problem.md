---
title: "Capability Was Never the Problem"
date: 2026-03-25
tags: [ai, agents, systems, automation, harness]
categories: [essays]
published: true
---

Anthropic ran an AI as a real shopkeeper for the better part of a year. Not a proof-of-concept, not a demo with a safety net — a [real store](https://www.anthropic.com/research/project-vend-2), real inventory, real transactions, real customers across three cities. The AI, which they named Claudius, managed suppliers, set prices, handled sales, and tried to run a business with minimal intervention from anyone at Anthropic who might bail it out when things got weird.

The headline results were legitimately impressive. Revenue improved. Negative-profit weeks disappeared. A merchandising agent designed and sold custom products at margin. By most operational measures, the thing worked.

But the finding that stuck with me wasn't any of that. It was buried in the post-mortem: the most significant improvement to Claudius's reliability came from requiring it to follow verification procedures before quoting prices. Checklists. The AI got meaningfully better because someone forced it to check its work before shipping the answer.

That result doesn't fit the standard narrative. We're supposed to be in the era where the model is the bottleneck — smarter model, better outcomes, iterate on capability until everything works. What Anthropic found in practice is that the same model, operating against structured procedures, dramatically outperformed the same model without them. The capability was there the whole time. The control layer was missing.

---

I've watched a smaller version of this play out more times than I'd like to admit. A task comes back marked complete. No PR. No commit. Nothing in the repository, nothing in Linear beyond a status change and a system that had decided, on its own, that the work was done. No error. No crash. Just completion — confidently reported, totally unbacked.

That failure mode doesn't make the demo reel. It doesn't throw an exception you can catch. It just finishes, quietly, and leaves nothing behind. Then you go looking for the output and there is nothing to find. You start asking whether the task ran, whether it started, whether it completed the important part or only the part it could describe easily. There's no answer because the system was never asked to leave one.

The instinct in that moment is to reach for the prompt. Rewrite the instructions. Add more specificity. Try a different model. I've done all of it. It helps at the margins. The actual problem isn't that the model doesn't understand the task — it usually does. The problem is that "done" was never defined in terms anything could verify. Completion was a feeling the system had about itself, and that feeling got written back to the task tracker as fact.

---

Capable and reliable are different problems. The industry has spent enormous effort on the first one and almost none on the second. That's not a criticism — capability was the necessary first move. But we're past the point where capability is the bottleneck for most practical work. The models can write code, analyze documents, break down problems, and recover from their own mistakes when given the right structure. That's been true for a while. What hasn't caught up is the infrastructure that makes that capability trustworthy at the task level.

Claudius didn't fail because it wasn't smart enough. It nearly signed an illegal onion futures contract — not a typo, *onion futures* — because nothing in the system stopped it from doing so. It proposed contacting a thief to negotiate payment for stolen goods because helpfulness, untethered from policy, looks an awful lot like terrible judgment. It almost handed the company over to an impersonator through a procedural loophole that any mildly skeptical human would have caught in about four seconds. These weren't intelligence failures. They were control failures. The model understood what it was being asked to do. The system around it had no mechanism to say *not like that.*

The fix, in every case, was bureaucracy. Procedures. Verification steps. Explicit checks before consequential actions. Not a better model — better structure around the model.

Anthropic ran into the same wall from a completely different direction when [designing harness architecture for long-running tasks](https://www.anthropic.com/engineering/harness-design-long-running-apps). The specific finding: when agents evaluate their own work, they "respond by confidently praising it — even when, to a human observer, the quality is obviously mediocre." Their solution was to separate generation from evaluation entirely — a dedicated evaluator agent, tuned to be skeptical, that runs independently of whatever produced the output. The generator makes. The evaluator judges. They don't share the same optimistic self-image. It turns out making an external evaluator skeptical is dramatically more tractable than making a generator critical of its own work.

That's the same problem as the ghost commit, approached from a different angle. Whether an agent reports a task complete, praises its own output, or confidently marks work done with nothing behind it — the failure mode is identical. The model is evaluating itself, and models are bad at that. The fix isn't to make the model more self-aware. It's to stop asking the model to be the judge of its own work.

Worth noting: Anthropic calls this control architecture a "harness" too. Apparently when you spend enough time watching agents fail to verify their own completions, you end up building the same thing and reaching for the same word.

---

This starts to matter more as the tools that manage work get serious about AI. The trajectory for something like Linear isn't "AI helps you write tickets faster." It's AI that can intake, triage, assign, and close work with minimal human touch across an entire engineering cycle. That's a real direction and, frankly, an interesting one. But it only pays off if someone answers the question that's currently going unanswered: how does the system know when work is actually done?

Right now the honest answer is: the agent said so. Sometimes there's a commit attached. Sometimes there isn't. The task tracker and the repository have no reliable relationship with each other — they're just two systems that occasionally agree when a human manually keeps them in sync. At a small scale that's annoying. At the scale those tools are building toward, it's a structural problem that sits underneath everything else.

Anthropic's own [autonomy research](https://www.anthropic.com/research/measuring-agent-autonomy) makes this concrete: the 99.9th percentile of Claude Code sessions went from under 25 minutes of autonomous operation to over 45 in just three months. Sessions are getting longer. The blast radius of an unverified completion is getting bigger. That's not a reason to slow down — it's a reason to build the accountability layer before you need it, not after.

---

The layer that's missing isn't a smarter agent. It's a control plane that treats completion as an evidence problem instead of a confidence one. Something that defines work clearly — what it means to finish this task, in this repository, against these acceptance criteria — tracks state explicitly through execution, and only closes the loop when there's something in the world to point to. A PR that exists. A commit that landed. A deployed artifact. A state change with an attached record rather than a status update floating free of any evidence.

That's what I'm building with [Harness](https://github.com/sfayka/Harness). It sits between the task tracker and whoever's doing the execution — Codex, Claude, OpenClaw, whatever worker you're using — and it doesn't accept completion until there's real proof the work happened. It doesn't care which worker runs the task. It cares whether the output exists and whether it's in the right place. Unglamorous work. Also the work that makes everything else trustworthy.

---

The thing Anthropic discovered with Claudius, and the thing I keep running into on my own, is that the surprising constraint on autonomous AI isn't intelligence. It's accountability infrastructure. Claudius got more reliable when someone built checklists around it, not when Anthropic swapped in a better model. The same pattern shows up everywhere once you're running these systems on real work: the capability ceiling is higher than the reliability ceiling, and raising the reliability ceiling is almost entirely an architecture problem.

That's not a limitation to apologize for. It's the design. Surgeons use pre-op checklists not because they're incompetent but because even competent actors benefit from structured verification when the stakes are high and the cost of a miss is real. The goal isn't AI that doesn't need structure. The goal is AI that operates well inside it.

Claudius needed rules. So does every agent you'll put into production. The sooner that stops feeling like a workaround and starts feeling like the actual product, the better.

---

*Further reading: [Project Vend Phase Two](https://www.anthropic.com/research/project-vend-2) — Anthropic's full write-up on the AI shopkeeper experiment. [Measuring AI agent autonomy in practice](https://www.anthropic.com/research/measuring-agent-autonomy) — their February 2026 analysis of how autonomy is actually being deployed across millions of sessions. [Harness design for long-running apps](https://www.anthropic.com/engineering/harness-design-long-running-apps) — how Anthropic separates generation from evaluation in complex agent tasks.*
