---
layout: post
title: "I Asked My AI Agent What We Should Build Next. Here's What Happened."
date: 2026-02-23
categories: [essays]
published: false
---

The hardest part of building AI tools isn't building them.

It's knowing which one to build.

The surface area is infinite. Every week there's a new model, a new API, a new category of workflow that didn't exist six months ago. You can be extremely busy and still be working on the wrong thing. Most AI builders I know have this problem and solve it the same way: gut feeling + whatever's getting engagement on Twitter.

I tried something different. I asked the agent.

---

## The problem

When you're a small shop, every build decision is a resource decision. There's no bandwidth to build something nobody wants. There's no budget to spend three months on a tool that solves a problem people have already solved. And there's no obvious signal in a landscape where everything is either "revolutionary" or vaporware.

The usual approaches don't work well at this scale:

- Market research is slow and expensive to commission.
- Twitter/X is noisy and biased toward whatever's hype this week.
- Talking to customers is gold — but only tells you about the problems they know they have.
- Competitor analysis requires knowing who your competitors are.

I needed a different kind of signal. Something that could survey the landscape broadly, synthesize what it found, and tell me where the gaps were — without me having to manually read 200 Hacker News threads.

---

## The approach

I spun up a research agent with a specific brief:

> "Survey the current AI tools landscape for small businesses and agencies. Focus on: what tools exist, what problems they claim to solve, what the most common complaints are in reviews and forums, and where there are obvious gaps between what users need and what's currently available. Prioritize Reddit, HN, G2, and Capterra. Return a structured gap analysis."

Not a one-shot prompt. A multi-step agent run — search, read, synthesize, output. The agent scraped forums, pulled review data, cross-referenced feature lists, and came back with a structured report.

That part worked better than expected.

---

## What the output actually looked like

The report was broken into three categories: **saturated**, **emerging**, and **underserved**.

**Saturated** (don't bother) — AI writing tools, chatbot builders, meeting summarizers. Every one of those categories has 40+ players. The agent flagged them correctly. Nothing surprising there.

**Emerging** (early, worth watching) — AI-native CRM, AI ops for field service businesses, agent-to-agent workflow tools. These were interesting. Not because they're uncontested — they're not — but because the early entrants are still mostly demo-quality and the core pain points aren't fully addressed yet.

**Underserved** (actual gaps) — This is where it got interesting.

Three things surfaced that I hadn't been thinking about:

1. **Integration as a first-class product.** Not another Zapier wrapper. Something that could actually read a client's existing tech stack — Google Sheets, a legacy CRM, a disconnected email system — and build the connective tissue. The complaints in the forums were consistent: "I don't need another AI tool, I need my existing tools to talk to each other."

2. **Explainability for non-technical decision makers.** A recurring theme: business owners using AI tools couldn't explain the outputs to their stakeholders. They trusted the AI but couldn't defend it. That's a UX problem nobody's solved well.

3. **AI tooling for the intake layer.** Proposal generation, scoping, onboarding — the work that happens before a client is fully in the system. Lots of pain, very few good tools.

---

## Signal vs. noise

Here's the honest take: about 60% of the report was obvious in hindsight.

Of course AI writing tools are saturated. Of course meeting summarizers are commoditized. The agent told me things I already knew but hadn't bothered to say out loud. (Which is valuable, actually — it's easier to dismiss a hunch than a structured analysis that confirms the hunch.)

The other 40% was signal I wouldn't have found on my own — not because it was hidden, but because I wouldn't have known to look for it. The field service CRM angle, for instance. I was aware that niche was underserved. I didn't know how loud the complaints were in the relevant forums until the agent read them all.

The surprising thing wasn't the gaps. It was the *consistency* of the complaints. The same frustration showing up in a Reddit thread from a plumber in Ohio, a G2 review from a marketing agency in Atlanta, and an HN comment from a freelance ops consultant — that's signal. Different contexts, same pain.

The obvious-in-hindsight part: integration was always going to be the real problem. It always is. Every new tool creates a new integration surface. The agent confirmed it with data instead of intuition.

---

## The meta point

We used the tool to figure out what to build with the tool.

There's something slightly absurd about that. But there's also something clarifying about it. If you're building AI tooling and you're not running it on your own problems first, you're leaving the best feedback loop on the table.

The agent has context we built up over months of real client work. The research run wasn't running in a vacuum — it was running against a backdrop of actual problems we'd already seen in the wild. That context shaped what it surfaced and how it weighted the gaps.

That's not a feature of the tool. That's a feature of actually using the tool.

The output isn't a roadmap. It's a better set of questions. Which — when you're choosing what to build next — is exactly what you need.

We built the intake layer tool. Still in progress. Akino Solar is the first real test.

That's how you close the loop.
