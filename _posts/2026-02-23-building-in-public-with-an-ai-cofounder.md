---
layout: post
title: "Building in Public With an AI Co-Founder"
date: 2026-02-23
categories: [essays]
published: false
---

People hear "AI co-founder" and imagine autopilot. That is not the job.

My agent can draft code, research a market, clean up task hygiene, write a first pass of a memo, and tee up a branch faster than I can context-switch into the work. It still does not get merge rights. That is not because the model is dumb. It is because a merge is a commitment. A deploy is a commitment. Published words are a commitment. And in a real business, commitments still belong to a human.

That distinction matters more now because the white-collar AI conversation is getting weird fast. People are arguing about "replacement" when what is actually happening in a lot of knowledge work is role decomposition:

- drafting moves down the stack,
- judgment moves up the stack,
- review becomes a first-class job,
- accountability gets more valuable, not less.

That is the operating model I am actually running. It is not glamorous. It works.

## The workflow nobody screenshots

The hype path looks like this:

"Describe feature -> AI builds feature -> ship."

The real path looks like this:

"Describe feature -> AI opens branch + PR + rationale -> human reviews -> human merges."

That last step is the whole game. Review is where I catch the thing the model optimized for that I did not ask for: the helpful refactor that quietly changed behavior, the clean-looking draft that invented a detail, the polished sentence that says more than I am willing to commit to publicly.

The agent not touching `main` is not safety theater. It is accountability architecture. If you are serious about building with agents, show the review layer, not just the deploy screenshot.

## What the agent owns vs what I still own

The line is not capability. The line is commitment.

The agent can own:

- first-pass implementation on scoped features,
- bug triage on bounded issues,
- draft content and internal docs,
- recurring research digests,
- status hygiene across tools,
- cleanup work nobody should be doing by hand.

I still own:

- merges,
- production deploys,
- client-facing communication,
- ambiguous tradeoff calls,
- the vision, meaning what I have in my head as the desired end state,
- anything where "close enough" creates downstream cost.

This is the part a lot of founders miss. They ask, "Can the agent do the task?" The better question is, "Who owns the consequence if the task is wrong?" That is the boundary.

## The near-miss that made this real

A few weeks ago, the agent set up a Docker dev environment for a new project. Task was clear. Context was good. The work looked solid.

Then the PR summary included this:

> "I noticed `.env.example` was missing values from `docker-compose`, so I added placeholders and comments."

Helpful move. Except one README comment looked like a real connection string to anyone scanning quickly. It was fabricated. Still unacceptable.

No catastrophe. I caught it in review, fixed it in a few minutes, merged clean. But the lesson mattered. The risk was not malice. It was helpfulness without full context.

That is a very normal model failure mode, by the way. Models want to complete the pattern in front of them. Sometimes that is exactly what you want. Sometimes it is how fake specifics end up in real artifacts. That is why human review exists.

## What this means for knowledge work

This is the part that feels most relevant right now. I do think agents will compress a lot of white-collar work. I also think the market is flattening too many categories into one scary sentence.

There is a big difference between:

- replacing repetitive drafting,
- accelerating bounded execution,
- and replacing accountable decision-makers.

Those are not the same thing.

What I am actually seeing is that agents are very good at generating a fast, useful first draft of many knowledge-work tasks. Code. Research. Summaries. Content. Triage. Cleanup. Internal coordination. They are great at drafts, at writing code, and at following a process.

What they are still bad at is carrying full business responsibility for the final answer, because they do not naturally perceive the intent sitting in the human's head. Unless the human is very deliberate about prompt, context, and memory, some of that intent gets lost. That is where the secret sauce really is: prompt plus context plus memory, with a human who understands the system well enough to inject the missing intent.

That does not mean jobs stay unchanged. It means the job shifts.

The premium moves toward:

- judgment,
- review,
- prioritization,
- escalation,
- narrative control,
- and owning the consequences.

That is still work. Important work. It is just higher in the stack than before.

## The social version vs the operating version

The social version of "AI co-founder" is velocity theater. Late-night screenshots. Big claims. A dashboard. Some "10x" chart with no denominator.

The operating version is much more boring:

- every external artifact gets human review,
- every merge has an accountable owner,
- every public claim maps to something real,
- every near-miss gets logged,
- and every system has a clear no-autonomy boundary.

Not because I distrust the agent. Because trust without verification is hope, and hope is not a release process.

## The part people misunderstand

When I explain this setup, I usually get two reactions:

1. "That sounds exhausting."
2. "So you are just grading the model's homework."

Both are partly true. Yes, it is overhead, and yes, I review a lot. But that framing still misses the point.

I am not a slower engineer now. I am an editor with an extremely fast first drafter. Judgment moved up the stack. Throughput moved down the stack. The agent gives me an 80% draft in minutes, and I spend focused time making the final 20% actually trustworthy. That is where quality lives anyway.

## The operating model that holds up under pressure

If you are going to do this seriously, treat it like an operating model, not a prompt trick.

- **Decision rights:** human
- **Execution rights:** agent
- **Release rights:** human
- **Audit trail:** PRs, summaries, and rationale
- **External publishing gate:** always human

When those lines are clear, speed goes up and risk goes down. When those lines blur, you get drift, rework, and reputation debt.

That last category matters more than people admit. An agent can save you ten hours and still cost you trust if it says the wrong thing to the wrong person in the wrong channel. That is not a model bug. That is a governance failure.

## Founder checklist

If you are experimenting with an "AI co-founder" setup, start here:

- enforce branch -> PR -> review -> merge,
- require rationale with every generated change,
- treat public content as client-facing,
- log near-misses, not just wins,
- optimize for consistency before scale.

The agent never pushes to `main`. That one rule sounds small. It is the contract that makes the whole system work.

## References

- GitHub Docs - Pull request reviews: https://docs.github.com/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews
- Google SRE Book - Release Engineering: https://sre.google/sre-book/release-engineering/
- NIST - AI Risk Management Framework 1.0: https://www.nist.gov/itl/ai-risk-management-framework
- Anthropic - Building Effective Agents: https://www.anthropic.com/engineering/building-effective-agents
- Anthropic - The Anthropic Economic Index: https://www.anthropic.com/economic-index

---

*Sean builds AI systems and autonomous workflows at Knox Analytics.*
