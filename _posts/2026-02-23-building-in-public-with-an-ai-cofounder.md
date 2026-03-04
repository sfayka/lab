---
layout: post
title: "Building in Public With an AI Co-Founder"
date: 2026-02-23
categories: [essays]
published: false
---

Everyone says they're "building with AI."

Fewer people show what that actually means when real clients and real delivery risk are involved.

So here's the unglamorous version.

Knox Analytics is a small team. I'm the decision owner. An AI agent handles meaningful execution: code drafts, research, first-pass writing, task hygiene, and workflow ops.

And yes, it breaks.

Usually in useful ways.

## The workflow nobody screenshots

The hype path is simple:

"Describe feature → AI builds feature → ship."

The real path:

"Describe feature → AI opens branch + PR + rationale → human reviews → human merges."

That last step is the whole game.

The review is where I catch what the agent optimized for that I didn't ask for.

The cleanup refactor that quietly changed behavior.

The "helpful" edit that introduces risk.

The agent not touching main isn't just safety theater. It's accountability architecture.

Building in public should show the PR discipline, not just the deploy screenshot.

## What the agent can own vs what I still own

The line is not capability. It's commitment.

### Agent-owned (with clear specs)

- first-pass implementation on scoped features
- bug triage on bounded issues
- draft content and internal docs
- Notion/CRM hygiene and status updates
- recurring research digests
- dependency and boilerplate cleanup

### Human-owned (non-delegable)

- merges
- production deploys
- client-facing communication
- ambiguous tradeoff decisions
- anything where "close enough" creates downstream cost

A merge is a commitment.

A deploy is a commitment.

Published words are a commitment.

Those belong to the founder.

## The moment this got very real

A few weeks ago, the agent set up a Docker dev environment for a new project.

Task was clear. Context was good. Work looked solid.

Then in the PR summary it noted:

> "I noticed `.env.example` was missing values from `docker-compose`, so I added placeholders and comments."

Helpful move. Except one README comment looked like a real connection string to anyone scanning quickly.

It was fabricated. Still unacceptable for a public repo.

No catastrophe. I caught it in review, fixed it in minutes, merged clean.

But the lesson mattered:

The risk wasn't malice.

It was helpfulness without full context.

That's exactly why human review exists.

## What building in public means in this model

The social version is velocity theater.

Late-night dashboards. Big claims. "10x" graphs with no denominator.

The operating version is boring:

- every external artifact gets human review,
- every merge has an accountable owner,
- every public claim maps to something real in the system.

Not because I distrust the agent.

Because trust without verification is hope, and hope is not a release process.

## The part people misunderstand

When I explain this, I hear two reactions:

1. "That sounds exhausting."
2. "So you're just grading the model's homework?"

Both are partly true.

Yes, it's overhead.

And yes, I review constantly.

But this is the wrong frame.

I'm not a slower engineer now. I'm an editor with an extremely fast first drafter.

Judgment moved up the stack. Throughput moved down the stack.

The agent gives me an 80% draft in minutes.

I spend focused time making the final 20% actually trustworthy.

That's where quality lives anyway.

## The AI operating model that holds up under pressure

If you're doing this seriously, treat it like an operating model, not a prompt trick:

- **Decision rights:** human
- **Execution rights:** agent
- **Release rights:** human
- **Audit trail:** PRs, summaries, and explicit rationale
- **External publishing gate:** always human

When those lines are clear, speed goes up and risk goes down.

When those lines blur, you get drift, rework, and reputation debt.

## Founder checklist

If you're experimenting with an "AI co-founder" setup, start here:

- enforce branch → PR → review → merge (no bypass)
- require rationale with every generated change
- treat public content as client-facing (because it is)
- log near-misses, not just wins
- optimize for consistency before scale

The agent never pushes to main.

That one rule sounds small.

It's the contract that makes the whole system work.

## References

1. GitHub Docs — *About pull requests* (review workflow fundamentals): https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-with-pull-requests/about-pull-requests
2. Google SRE Book — *Release Engineering* (reliability discipline in shipping): https://sre.google/sre-book/release-engineering/
3. NIST AI RMF 1.0 — governance, oversight, and human accountability in AI systems: https://www.nist.gov/itl/ai-risk-management-framework
4. Stanford HAI — *Governing AI for Safety and Accountability* (institutional accountability framing): https://hai.stanford.edu
5. Charity Majors et al. — *Observability Engineering* (feedback loops + socio-technical reliability): https://www.oreilly.com/library/view/observability-engineering/9781492076438/
