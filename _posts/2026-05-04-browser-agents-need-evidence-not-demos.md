---
title: "Browser Agents Need Evidence, Not Demos"
date: 2026-05-04
tags: [ai, agents, browser-agents, harness, verification, browserbase, automation]
categories: [essays]
layout: post
published: false
---

Browser agents are going to create the cleanest demos and some of the messiest production failures.

That is not because browser automation is a bad idea. It is because the browser is where intent, state, identity, permissions, timing, UI ambiguity, and external systems all collide. A web agent can appear to do the work perfectly while leaving behind almost no durable proof that the work happened correctly.

Clicking through a site is not the hard part anymore. Knowing what the clicks meant is the hard part.

That is why the interesting question around DeepAgents, Browserbase, and similar web-agent stacks is not whether they can drive a browser. They can. The interesting question is what evidence they capture, how that evidence is validated, and what the system does when the browser says one thing and the task record says another.

## Browser Work Fails Quietly

Code tasks at least have a natural artifact trail. There is usually a branch, a commit, a pull request, a test command, a CI result, or a file diff. Those artifacts are not sufficient by themselves, but they give the acceptance layer something to inspect.

Browser tasks are slippery.

An agent can open a page, fill a form, click a button, see a success toast, and report completion. But what actually happened?

Did the record save? Did it save under the right account? Did the page render cached state? Did the confirmation refer to the current action or a previous one? Did the submit button silently fail and leave a disabled spinner? Did the automation land in a staging workspace instead of production? Did it update the right customer, the wrong customer, or no customer at all?

The browser makes all of those failures look like normal motion.

That is the production mismatch. Web agents are very good at performing workflows. They are not automatically good at proving the workflow reached the intended external state.

## A Screenshot Is Evidence, But Not A Verdict

Screenshots matter. So do traces, DOM snapshots, network logs, console output, downloaded files, and before/after records. But none of those should be treated as a verdict on their own.

A screenshot can prove the agent saw a success message. It cannot prove the system of record changed correctly. A DOM snapshot can prove a field appeared. It cannot prove the backend accepted the right mutation. A network response can prove an API returned 200. It cannot prove the business workflow is now complete.

This is the same completion problem that shows up in coding agents, but the browser makes it easier to hide.

The agent reports: done.

The browser shows: something happened.

The operator needs to know: did the right thing happen, and can we prove it?

That requires an evidence model, not just a replay.

## The Browser Agent Needs A Contract

A useful browser-agent workflow should start with a contract before it starts clicking.

For example:

- which URL or app surface is in scope
- which account or workspace should be active
- what record should be created, changed, or inspected
- what external state should exist afterward
- what proof must be captured
- what failure conditions require stopping
- what data must never be submitted without review

That contract matters because browser work is full of irreversible or semi-irreversible actions. Sending a message, changing a billing field, updating a CRM record, deleting a row, publishing content, moving a ticket, submitting a form — these are not just UI events. They are business state transitions.

A browser agent that can click faster than a human is only useful if the surrounding system is stricter than a human's memory.

## The Harness Layer Should Not Care Which Browser Stack Ran

DeepAgents plus Browserbase may be a strong implementation path. Playwright may be another. A local Chromium controller may be enough for some tasks. Different teams will use different browser substrates.

The acceptance layer should not make the browser substrate the center of the architecture.

It should normalize facts.

The important facts look more like this:

- action attempted
- target surface
- precondition observed
- artifact captured
- external state checked
- discrepancy found
- manual review required
- completion accepted or blocked

That is the level where browser-agent work becomes governable. The executor can be swapped. The proof contract remains.

This is especially important for systems like Harness or Proofline. The point is not to become a browser automation platform. The point is to decide whether a browser-driven task produced acceptable evidence.

## The Best Browser Agents Will Be Boring Around The Edges

The flashiest browser-agent demos will show long autonomous workflows: open the site, navigate, research, compare, fill, submit, summarize. Those demos are useful. They also skip the part operators actually need in production.

What happens when the login expires?

What happens when a modal appears that was not in the plan?

What happens when the record already exists?

What happens when the page says saved but the API returns a validation warning?

What happens when two tabs disagree?

What happens when the browser completed the workflow but the downstream system has no matching event?

A serious browser-agent system needs boring answers to those questions. It needs state checks, artifact capture, retry boundaries, manual review gates, and audit trails. It needs to stop treating visual completion as operational completion.

That is not a knock on browser agents. It is the path to making them useful.

## The Decision Rule

If the browser action matters, the browser trace is not enough.

You need the trace, the artifact, the external state check, and the acceptance rule. You need to know what changed, where it changed, why it counted, and what the system did when the evidence did not hold.

The future of browser agents will not be won by the agent that can click the most impressive path through a web app.

It will be won by the system that can prove which clicks mattered.

Source note: inspired by Harrison Chase's DeepAgents + Browserbase example: https://x.com/hwchase17/status/2050300474927292883
