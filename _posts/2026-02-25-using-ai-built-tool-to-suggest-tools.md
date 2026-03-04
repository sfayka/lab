---
layout: post
title: "Using My Own AI-Built Tool to Suggest New AI Tools to Build"
date: 2026-02-25
categories: [essays]
published: false
---

I tried the obvious move first.

"Ask AI what to build next."

It gave me 27 ideas in under 10 seconds. Clean bullets. Crisp names. Zero conviction.

A meeting note app. A prompt library. A "universal dashboard." The usual parade.

So I changed one variable: stop asking for ideas, start asking for evidence.

That shift turned AI from a brainstorm toy into an operating tool.

## The loop: one job, one input stream, one decision

I used a simple internal workflow:

- **Input:** work logs, repeated client questions, support friction, project postmortems
- **Process:** cluster recurring tasks, score pain, map pain to automations
- **Output:** ranked tool candidates with confidence + risks

No trend-mining. No "what's hot on X" layer.

Just operational pain.

I gave the model one optimization target:

> Find the smallest tool that saves internal time *and* creates external leverage for clients.

That eliminated 80% of shiny nonsense instantly.

## Prompt structure that produced signal (not novelty)

Here’s the exact skeleton I used:

> Analyze the attached workflow logs and identify repeated tasks with measurable friction.
>
> For each candidate tool idea, score:
> 1) frequency of pain,
> 2) severity (time/cost/risk),
> 3) willingness-to-pay proxy,
> 4) implementation complexity,
> 5) distribution advantage for a small services business.
>
> Reject ideas that are crowded, low-trust, or require enterprise integrations on day one.

Then every candidate got pushed through this founder scorecard:

1. **Pain frequency** — does this happen weekly?
2. **Economic weight** — does it affect revenue, delivery speed, or quality?
3. **Wedge size** — can I ship a narrow V1 in <2 weeks?
4. **Trust burden** — does adoption immediately trigger legal/security drag?
5. **Distribution fit** — can I sell it through channels I already have?

If it failed two categories, it was out.

No committee. No vibe override.

## What came out of the run

### Candidate A: "Auto-generate client update emails"

Strong on frequency. Easy to ship.

Weak on strategic leverage.

It saves admin time. It doesn't materially change outcomes.

**Verdict:** useful feature, not a wedge product.

### Candidate B: "Proposal redline assistant for AI consulting scopes"

High score across every dimension:

- frequent pain (scope edits weekly)
- direct dollar impact (faster close + fewer revision loops)
- domain advantage (consulting language + risk patterns)
- tight MVP path (markup + risk flags + scope diffs)

**Verdict:** build first.

### Candidate C: "Universal RFP response writer"

Big TAM. Big story. Wrong first move.

Why it failed:

- high trust burden
- heavy context requirements
- weak near-term wedge for a small team

**Verdict:** defer.

Large market is not the same thing as good sequencing.

## What I built and why

I built Candidate B first.

Not sexy. High leverage.

V1 does three things:

1. compares old vs. new scope language,
2. flags risk clauses (timeline, deliverables, change control),
3. drafts a founder-readable summary before anything goes to clients.

Business impact was boring and clear:

- less time in revision ping-pong,
- fewer scope misunderstandings,
- faster proposal-to-signature cycle.

Founders don't need more demos.

They need fewer expensive surprises.

## What this changed in my AI operating model

This became a weekly operating cadence:

- capture friction,
- rank pain,
- pick one wedge,
- ship or kill,
- log outcome.

That's the system.

Not glamorous. Very compounding.

### Lesson 1: AI ranks pain better than it invents markets

Grounded in real workflow data, it's useful.

Asked for startup ideas in the abstract, it's autocomplete with confidence.

### Lesson 2: hard filters are anti-delusion

A scorecard feels rigid until you've wasted a week on the wrong thing.

Use one.

### Lesson 3: local maxima are fine early

You don't need a ten-year platform in sprint one.

You need the next high-confidence wedge.

### Lesson 4: cadence beats complexity

A short loop run consistently beats a perfect framework run once.

## Founder checklist

If you want to run this without lighting a month on fire:

- Pull inputs from real operational logs, not brainstorming docs.
- Force every idea to tie to time, revenue, or risk.
- Reject anything that requires enterprise trust on day one.
- Pick one narrow build per cycle.
- Track outcomes (time saved, cycle time, close rate), not applause.

Use AI to find leverage in work you already do.

Then ship the smallest thing that removes recurring pain.

Everything else is theater.

## References

1. CB Insights — *The Top Reasons Startups Fail* ("no market need" remains a top failure driver): https://www.cbinsights.com/research/startup-failure-reasons-top/
2. Clayton Christensen et al. — *Know Your Customers’ “Jobs to Be Done”* (Harvard Business Review): https://hbr.org/2016/09/know-your-customers-jobs-to-be-done
3. Teresa Torres — *Continuous Discovery Habits* (evidence loops over one-off ideation): https://www.producttalk.org/book/
4. Paul Graham — *Do Things that Don’t Scale* (early wedge discipline): http://paulgraham.com/ds.html
5. GitLab Handbook — *Iteration* (small steps, compounding execution): https://handbook.gitlab.com/handbook/values/#iteration
