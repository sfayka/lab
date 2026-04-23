---
layout: post
title: "Computer Use Is Not a Benchmark. It Is a Trust Boundary."
date: 2026-04-23
tags: [ai, agents, computer-use, browser-automation, trust-boundaries, reliability]
categories: [essays]
published: false
---

Computer use is getting marketed like a capability score. Operators should read it as a control problem.

That is the opening claim.

This week’s release cycle made the shift hard to miss. OpenAI framed GPT-5.5 as a model for “real work and powering agents,” with supporting discussion around Codex, browser use, computer use, spreadsheets, slides, and broader task completion. That sounds like a benchmark story. It is really a workflow-custody story. The moment an agent can browse, click, paste, upload, navigate, and submit, the system stops being a coding demo and starts becoming an operator inside someone else’s software.

*Recent signal shaping this angle: OpenAI’s April 23 GPT-5.5 launch post, Greg Brockman’s emphasis on Codex for the full spectrum of computer work, and surrounding X discourse about browser/computer use moving from novelty to daily workflow.*

## The category is moving from generation to execution

- Recent launch language is converging on the same promise: not just better answers, but more tasks carried through to completion.
- That sounds like a capability upgrade. It is also a custody upgrade: the system can now hold the mouse, not just write the memo.
- Useful paragraph direction: once the agent is inside the browser, the unit of failure changes from “bad output” to “bad side effect.”
- Concrete examples to develop:
  - wrong tab, wrong account, wrong environment
  - silent form submission with stale data
  - clicking through warning screens because the model is optimizing for task completion instead of operational caution

## Browser and desktop actions create failure modes benchmarks do not capture

- Benchmarks reward success on bounded tasks. Production punishes ambiguity, latency, account mix-ups, and partial completion.
- A browser-use score does not tell you:
  - whether the agent knew which account it was logged into
  - whether it respected approval boundaries
  - whether it left a durable trail of what it touched
  - whether a human can reconstruct the run after something weird happens
- Strong contrast to build later: in demos, browser use looks like dexterity; in operations, it looks like liability unless the system around it is disciplined.

## The real product requirement is workflow custody

- Define “workflow custody” in concrete terms: who owns state, who decides when to escalate, who verifies completion, who can replay what happened.
- The browser should not be the system of record. It is just one execution surface.
- For real operators, computer use needs wrappers:
  - scoped environments
  - account isolation
  - explicit task contracts
  - approval gates for destructive actions
  - evidence capture before completion claims are accepted
- Tie to Knox/Harness language: the model can drive; the control plane still needs the brakes, mirrors, dash, and black box.

## This is where trust boundaries get expensive

- Computer use feels magical partly because it compresses many integrations into one generalized surface.
- That same generality is what makes governance harder.
- A bespoke API integration at least gives you typed contracts and predictable states. Browser execution throws the agent into a human interface full of ambiguity, ads, race conditions, and misleading affordances.
- Paragraph stub: the industry is treating “works across any software” as pure upside. Operators know it also means “inherits every weird edge case that humans normally absorb with judgment.”

## Closing direction

Computer use will matter. It may end up being one of the most important unlocks in the category.

But the serious question is not whether the model can complete a browsing task in a benchmark harness. The serious question is whether your system can contain, verify, and explain what happened after the model touched a real workflow.

That is why I do not think computer use is mainly a benchmark category.

It is a trust boundary.

And the teams that treat it that way will build systems people can actually run.
