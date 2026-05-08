---
title: "The Breakthrough Is the Harness"
date: 2026-05-04
tags: [ai, agents, coding-agents, harness, symphony, verification, workflow]
categories: [essays]
layout: post
published: false
---

The next jump in coding-agent performance is not going to come from a better prompt by itself. It is going to come from the harness around the agent.

That is the part of the system most teams still underinvest in. They obsess over which model is slightly better this week, whether the agent should use one CLI or another, and how many minutes it can run before asking for help. Those things matter, but they are not the operating difference between a useful agent and a risky one.

The operating difference is whether the agent is placed inside a workflow that makes the work legible, repeatable, constrained, and verifiable.

A recent X post about OpenAI Symphony made the point in a more tactical way: Symphony plus a strong codebase harness can dramatically improve coding-agent outcomes. The details mentioned were not magical. Playwright CLI. A boot skill. A `WORKFLOW.md`. Clear setup paths. A codebase that teaches the agent how work is supposed to move through the system.

That is the lesson. The impressive part is not that the agent can code. The impressive part is that the environment stops treating code generation as the whole job.

## The Common Framing Is Too Small

Most teams still evaluate coding agents as if the unit of work is the response. You ask for a change. The agent produces code. You look at the diff and decide whether it is good.

That is fine for small changes. It breaks down quickly for real work.

Real work has setup. It has hidden assumptions. It has repo conventions, test commands, local services, flaky dependencies, style expectations, product boundaries, security constraints, and deployment requirements. It has tasks that should not start until the agent has proven it is in the right repository with the right branch and the right bootstrap state.

A model does not absorb all of that just because the context window is larger. Some of it has to exist as workflow.

That is what a harness does. It turns a codebase from a pile of files into an executable operating environment for agents. It tells the agent where to start, what proof it must produce, which commands matter, what counts as completion, and where the sharp edges are.

On paper, this sounds like documentation. In practice, it is closer to infrastructure.

## A Good Harness Makes The Agent Less Special

The best version of this pattern makes the agent less magical.

Instead of relying on a one-off conversation, the system gives every executor the same basic rails:

- how to bootstrap the repo
- how to verify the environment
- how to run the relevant tests
- how to inspect the app
- how to report artifacts
- how to stop when preflight fails
- how to avoid crossing product boundaries

That is not bureaucracy. That is how you make agentic work governable.

Without it, the agent has to infer too much from the current prompt. It has to guess which test command matters. It has to guess whether a failing local dependency is expected. It has to guess whether screenshots, PR links, commits, or logs are required. It has to guess whether it is allowed to reshape the architecture to make the task easier.

Agents are very good at guessing confidently. That is exactly why the harness matters.

A good harness removes avoidable guessing. It makes the boring path obvious and the dangerous path harder to take by accident.

## Symphony Is A Substrate, Not A Verdict

This is where Symphony-like systems become interesting. A stronger execution substrate can coordinate work, run agents, manage context, and improve the mechanics of getting code written. That is valuable. It is also not the same thing as acceptance.

The substrate can execute. It should not be the only thing that decides whether the work is done.

That distinction matters because most agent systems blur it. The thing that does the work also reports completion. The system accepts the report. The dashboard turns green. Everyone moves on until some downstream step discovers that the evidence never existed.

For small tasks, maybe that is tolerable. For real production work, it is a bad control loop.

The better architecture separates the roles:

- the task tracker defines intended work
- the execution substrate runs the work
- GitHub and tests expose artifacts
- the harness verifies the evidence
- the human reviews exceptions and tradeoffs

That is the pattern I keep coming back to. Not because it is elegant, but because it is the first structure that matches the failure modes I actually see.

## WORKFLOW.md Is Not A Nice-To-Have

A file like `WORKFLOW.md` sounds too simple to matter. It is easy to dismiss as agent docs, repo hygiene, or a prompt-engineering trick.

But in practice, that file can become one of the most important pieces of the system.

It is where you encode the operating contract:

- what branch discipline looks like
- which commands prove the app works
- what acceptance criteria must be mapped to artifacts
- which directories are off limits
- how to handle failed setup
- what needs a PR versus a local patch
- what evidence must be returned before claiming completion

That is not just instruction. It is a boundary between execution and self-report.

The agent still has room to reason. It still has room to solve the task. But it is no longer inventing the rules of the workflow while it is inside the workflow.

That is the difference between a clever assistant and an operational system.

## The Real Benchmark Is Transfer

A good harness should improve more than one run. It should make future runs easier to verify, easier to debug, and easier to compare.

If a task failed because setup was unclear, the harness should change. If a task passed locally but missed the browser workflow, the verification path should change. If an agent repeatedly claims completion without a PR URL, the completion contract should change. If the same class of failure appears across several repos, the pattern should be lifted into the shared workflow layer.

That is where the compounding happens.

The model gets better from the outside. The harness gets better from your own operational history.

That is why I do not think the most important agent teams will be the ones with the most elaborate prompts. They will be the ones with the best feedback loops around work: preflight, execution, evidence capture, verification, review, and rollback.

## The Decision Rule

If an agent can run for an hour, the system around it has to be more rigorous than the system around a five-minute chatbot answer.

That means the codebase needs a harness. The execution substrate needs boundaries. The completion claim needs evidence. The workflow needs a memory of what failed last time.

The breakthrough is not merely that agents can write more code.

The breakthrough is when the system can tell whether the code-writing actually produced trustworthy work.

Source note: inspired by Jason Zhou's post on OpenAI Symphony and codebase harnesses: https://x.com/jasonzhou1993/status/2050524139132445055
