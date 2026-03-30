---
title: "Done According to What"
date: 2026-03-30
tags: [ai, agents, systems, automation, harness, verification]
categories: [essays]
layout: post
published: true
---

The agent finished. Status updated, execution logged, task closed. From the outside, everything looks clean — no crash, no traceback, no visible sign of trouble. The work happened, the system said so, and the pipeline moved on to whatever came next.

Except nothing came next, because nothing actually happened. No PR. No commit. No record in Linear. Just a status change authored by the thing that was supposed to do the work, about the thing that was supposed to do the work. A system reporting on itself is not verification. It's narration.

This is the failure mode that never makes the demo. Not a hallucination, not a confused response, not a model doing something obviously wrong. Just confident, quiet, unverifiable completion — the kind that leaves a clean audit trail pointing to a hollow outcome. If you've run agents on real operational work rather than controlled examples, you've almost certainly seen it. It doesn't improve reliably with prompt engineering. It doesn't go away when you switch models. It's not a model problem. It's a structural one, and the structure responsible for it is in almost every agent system currently deployed.

---

The mechanics are straightforward enough. An agent executes a task, produces some output or believes it did, and reports a result back to whatever manages the work. If the task management layer accepts that report at face value — and most do, because most systems weren't designed to do otherwise — then completion becomes whatever the executor believed it was. Not what evidence in the external world confirms. Not what a second system can verify independently. The agent's self-assessment, laundered through a status field into a fact.

Most tools in the current ecosystem work this way whether they say so or not. The agent executes the task and reports on the task, which is a subtle conflict of interest that doesn't matter until it really does. Linear doesn't know what happened in the repository. GitHub doesn't know what the agent put in Linear. The agent knows what it intended to do, and it's confident it did it, and that confidence flows upstream as ground truth.

What happens when those systems disagree? In most setups, not much. The disagreement goes unnoticed, or gets logged somewhere nobody reads, and the workflow proceeds on the assumption that the executor had it right. Sometimes that assumption is correct. Sometimes it isn't, and you find out three steps later when something that should have been there isn't, and you spend an afternoon reconstructing what actually happened.

---

Harness is a control plane. It sits between the task tracker and the executor — between Linear and whatever is doing the actual work — and it doesn't run tasks. It decides whether tasks are finished. That's a different job, and it turns out to be a harder one to build, which is probably why so few systems bother. It does not trust the executor to declare completion.

The operating premise is that completion is an evidence problem, not a confidence problem. A task isn't done because the executor says so. It's done when something in the external world confirms it: a pull request that exists in the repository, a commit that landed, a state change in Linear that's backed by a real record rather than an agent's optimistic self-report. Harness evaluates completion against those external signals. The executor's report is an input to that evaluation, not the conclusion of it.

The practical implication is that Harness can be wrong in only one direction. It can block a task that actually completed if the evidence trail is incomplete. It cannot mark a task done on the basis of confidence alone. That asymmetry is intentional, and it's the thing that makes it useful in production rather than in demos.

![Harness Task Overview — multiple tasks in different lifecycle states, from accepted completion to blocked](/assets/images/harness/01-task-overview.png)

The task overview captures this in aggregate. Across a handful of tasks you can see the full spectrum of outcomes: accepted completions with full evidence chains, tasks pending verification, tasks blocked due to reconciliation failures, tasks halted and waiting on human review. The system isn't optimizing for everything to look green. It's tracking what's actually true.

---

To understand what the system does with a real problem, it helps to see what it does with a clean one first.

![Harness accepted completion detail — Linear passed, GitHub artifacts present, all systems aligned](/assets/images/harness/02-accepted-completion-detail.png)

The accepted completion case shows a task where the evidence held up. The verification panel notes that executor-reported success was treated as advisory input only — that's important phrasing, and it applies to every task regardless of outcome — but in this case, the external evaluation confirmed it. Linear shows the right state. GitHub has the artifacts. Harness marks the work complete. The timeline view shows the sequence: task created, pull request artifact captured, commit artifact captured, status transition recorded. Every event has a source and a timestamp. The completion didn't come from the executor's confidence. It came from the chain of artifacts that existed in the world after the work ran.

That's the baseline. The interesting case is when the chain breaks.

---

![Harness task detail: dryrun review kno 133 db v4 — verification rejected, reconciliation mismatch, outcome blocked](/assets/images/harness-2/05-hero-shot.png)

The task is `dryrun review kno 133 db v4`. On the left side of the interface, the state is unambiguous: Status is In Review, Verification is Rejected, Reconciliation is Mismatch, and the Outcome is Blocked. This is not a crashed task. The executor ran. It presumably reported completion. Harness evaluated that report and declined to accept it. This is the exact point most systems would have marked the task complete and moved on.

The detail panel on the right explains the specific problem. The verification reasoning surfaces three things: executor-reported success was treated as advisory input, evidence was insufficient to confirm completion, and manual review is required. Below that, the reconciliation section shows the mismatch directly — Linear records the task in state `review_required`, while Harness shows `in_review`. Those states are close enough to create confusion and different enough to matter. The explicit note in the panel: Linear record not found when Harness went to verify the external claim.

Walk through what that means operationally. The agent ran what appears to be a database review task — a schema review against ticket KNO-133, probably version 4 of something that's been iterated on. It finished. It said so. Harness evaluated that report against its verification policy — not the executor's self-assessment, an external policy — and found the evidence insufficient. It went to Linear to check the record that should exist if the work happened, and either the record wasn't there in the expected form or the state didn't align with where this task should be in its lifecycle. The reconciliation layer caught the mismatch, named it explicitly, and stopped.

The task didn't silently proceed. It didn't mark itself complete on the agent's say-so and leave the discrepancy to surface later as a confusing inconsistency. It stopped at the point of verification, with a legible explanation of exactly what didn't add up.

This is what most systems would not do.

---

There's a line in the verification panel worth sitting with: "executor-reported success was treated as advisory input only." That's not a hedge or a legal disclaimer. It's the architectural stance the entire system runs on. Every task, whether it completes cleanly or gets blocked, goes through the same evaluation. The executor's report is input. Evidence is verdict.

Most automation systems treat those as the same thing, because most of the time they happen to agree. The agent ran, the work happened, the evidence exists. Fine. But "most of the time" is not a reliability model. It's an optimistic default with no mechanism to catch the cases where it breaks down. And the cases where it breaks down tend to be the consequential ones — schema migrations, deployment gates, review checkpoints, the kind of work where an unverified completion isn't just a tracking problem but a correctness problem with real downstream cost. They don't fail loudly. They fail by agreeing with themselves.

The thing that makes unverified completion particularly dangerous isn't the individual failure. It's that it's invisible. A task that crashes gives you something to respond to. A task that confidently misreports its own completion gives you nothing — until something downstream tries to build on it and finds nothing there, at which point you're not debugging one bad task but reconstructing what actually happened across however many steps trusted it.

> "Done" is not a message. It's a state backed by evidence.

Most systems treat completion as a message from the executor. Harness treats it as a state the system has to earn by finding the evidence. Which one do you trust — the one that claims it worked, or the one that can prove it? The verification rejection in the screenshot is what happens when the evidence isn't there.

---

The outcome — Blocked, escalated to human review — is worth reading as a design decision rather than a failure condition. The task didn't fail in the conventional sense. The executor ran. Some work probably happened. The system simply cannot confirm what work happened, or whether the right thing is in the right state in the right systems, and it is not willing to resolve that uncertainty by assuming everything is fine.

That's what the `in_review` state represents. Not an error waiting to be corrected. A valid, explicit acknowledgment that the system reached the limit of what it can safely decide autonomously and is handing the question to a human. The reconciliation mismatch — Linear says `review_required`, Harness shows `in_review` — is legible and documented. Whoever reviews this task knows exactly what they're looking at: two systems with slightly different pictures of where this work is, a missing record, and an executor that said it was done.

That's more information than most systems provide about their cleanest completions, let alone their ambiguous ones. A human reviewer can look at this and make a decision. They can go to Linear, find or create the record, confirm the schema review happened, and close the task. Or they can find that the review didn't actually complete and route it back for re-execution. Either way, they're working with an honest accounting of what the system knows rather than a confident status update that buried the uncertainty.

---

Scale this pattern up and the argument becomes easier to see. Multi-agent pipelines compound optimistic assumptions. Each layer inherits whatever the previous layer chose to believe. Each layer trusts the layer beneath it, which means a bad completion at layer one propagates forward until something visible breaks — often several steps later, in a context where the original failure is hard to trace. The earlier you catch a bad completion, the cheaper the correction. The later it surfaces, the more expensive it becomes to unwind.

A control plane that insists on evidence before closing the loop isn't slowing automation down. It's making automation trustworthy enough to actually depend on. Without it, you don't have a pipeline. You have a sequence of optimistic steps that happen to produce correct results most of the time, with no mechanism to distinguish "this worked" from "this claimed to have worked." For demos and prototypes, the distinction rarely matters. For real operational workflows — the kind where a database review gate is supposed to be a gate, not a suggestion — it matters considerably.

The underlying problem isn't agent capability. These systems can do the work. The problem is that capability without enforcement is just optimistic execution dressed up as automation. You end up with a tool that looks autonomous when things go well and requires significant human involvement to clean up when they don't, which is not what autonomous means and is not what anyone is actually trying to build.

---

The thing this screenshot demonstrates isn't a bug catch or an edge case. It's the baseline behavior: when the evidence doesn't add up, the system says so, stops, and asks for a human. That's it. Auditable, legible, escalating rather than assuming. Not dramatic, not particularly clever, but exactly the behavior that makes the difference between a system you can build on and one you can only trust while you're watching it.

This is what a control plane actually does. Not smarter execution. Not better prompting. A layer that refuses to accept unverified work — that treats "done" as a claim to be evaluated, not a fact to be accepted — and that pushes ambiguous decisions to humans instead of resolving them optimistically. That layer is unglamorous to build and easy to skip. It's also the thing that separates a demo from something you can run a business on. Most systems optimize for flow. This one optimizes for truth.
