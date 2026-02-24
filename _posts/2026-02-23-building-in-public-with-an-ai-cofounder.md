---
layout: post
title: "Building in Public With an AI Co-Founder"
date: 2026-02-23
categories: [essays]
published: false
---

Everyone's building with AI. Not everyone will tell you what it actually looks like.

Here's what it looks like.

Knox Analytics is a two-person operation. Employee #1 is me. Employee #2 is an AI agent that writes code, drafts content, runs research, and manages Notion — while I make decisions, review everything, and hold the merge button. We ship real software. We have real clients. The agent has real responsibilities.

And it breaks. Often in instructive ways.

---

## The workflow nobody shows you

The hype version: you describe a feature, AI builds it, you ship.

The real version: you describe a feature, AI builds a branch, opens a PR, writes a summary of what it changed and why — and then it waits. It always waits. Because the agent never touches main.

That's the rule. Branch → PR → human reviews → human merges. No exceptions.

It sounds like a guardrail against catastrophic failure. It is. But it's also something else: it's the forcing function that makes the whole thing work. The review step is where I catch the thing the agent optimized for that I didn't ask for. The "improvement" that drifted from the design. The refactor that quietly broke the type contract three files over.

The agent doesn't push to main. Not because it can't. Because the moment it can, the accountability structure disappears — and so does the quality signal.

Building in public means showing the PRs, not just the deploys.

---

## What it actually handles

More than I expected. Less than the pitch decks claim.

**Autonomous (no babysitting required):**
- First-pass feature implementation from a clear spec
- Bug triage on well-scoped issues
- Content drafts (including this one, in a previous iteration)
- Notion updates, CRM entries, task management
- Daily research digests — surfacing, formatting, posting to Discord
- Dependency audits, boilerplate cleanup

**Still needs a human:**
- Merges. Every time.
- Deploys to production.
- Client-facing anything — emails, proposals, published content.
- Any decision with ambiguous tradeoffs.
- Anything where "close enough" isn't close enough.

The line isn't about capability. The agent is *capable* of doing most of that second list. The line is about accountability. A merge is a commitment. A deploy is a commitment. Published content is a commitment. Those belong to the human.

---

## The moment it got real

A few weeks ago the agent was spinning up a Docker-based dev environment for a new project. Clear task, clear context. It went off and did it.

Then it posted its PR summary:

> "I noticed the `.env.example` was missing a few of the values from your `docker-compose` file so I added them with placeholder comments."

Helpful. Except it also added a comment in the README that looked, to an untrained eye, like it had pasted in a real connection string from somewhere in the workspace. It hadn't — it was a fabricated example that happened to match the format exactly.

Still. That goes nowhere near a public repo without human eyes on it. The agent didn't know what it didn't know. It was trying to be helpful. That's the failure mode — not malice, not sloppiness. Helpfulness without context.

I caught it in review. Fixed it in two minutes. The PR shipped clean.

The lesson wasn't "AI is dangerous." It was: the review step isn't ceremony. It's the product.

---

## What "building in public" actually means here

The AI Twitter version of building in public is screenshots of your dashboard at 1 AM and a thread about velocity.

This version is: every commit, every PR, every draft goes through a human checkpoint before it exists in the world. Not because I don't trust the agent. Because trust without verification is just hope, and hope is not a deployment strategy.

Building in public with an AI co-founder means being transparent about the seams. The agent writes the code. I review the code. We both know exactly where that line is, and we don't blur it.

That discipline is the product. The discipline is what scales.

---

## What surprises people

When I describe this setup, the reaction is usually one of two things: "that sounds exhausting" or "that sounds like you're just checking the agent's homework."

Both are kind of right.

It is more overhead than if I just wrote everything myself (in the short run). And yes, I am reviewing the agent's work constantly. But here's the reframe: I'm not a developer checking code anymore. I'm an editor with a very fast first drafter. My job is judgment, not execution.

The agent ships a content draft in eight minutes. I spend twelve minutes making it mine. The output is better than either of us would have done alone, at a pace neither of us could have hit alone.

That's not hype. That's just what the math works out to.

The unsexy part is: it only works if you hold the line every single time. One "eh, looks fine, merge it" without reading it — and you've broken the contract. Not with the agent. With yourself.

The agent never pushes to main.

That's the whole thing.
