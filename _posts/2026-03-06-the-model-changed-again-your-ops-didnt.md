---
layout: post
title: "The Model Changed Again. Your Ops Didn’t."
date: 2026-03-06
categories: [essays]
published: false
---

Every model release now comes with the same mood swing.

First: excitement. "This one finally thinks better." "This one is faster." "This one can do agent teams."  
Then: confusion. "Why did quality drop on support replies?" "Why did latency jump?" "Why did cost spike this week?"

We went through this loop more than once. (More than I want to admit.)

At first, we treated model upgrades like software upgrades. Pick the newest one, swap it in, move on.

That worked for about five minutes.

Because the model wasn’t the real system.

Our operations were.

And our operations were underbuilt.

---

## 1) We tried “pick one model and ship.” It broke in three weeks.

The original plan was simple: choose one strong model, use it everywhere, and standardize the stack.

Sounds clean. Very founder-friendly. Fewer decisions, less complexity.

In practice, it broke fast.

The first thing that failed was consistency by task type. The same model that looked great on long-form strategy prompts would produce mediocre support drafts under tighter latency budgets. Then sales-summary outputs got verbose when we needed crisp bullets. Then coding-heavy tasks improved while operational writing regressed.

Nothing was catastrophic. That made it worse.

It was death by small misses:
- extra review passes,
- hidden rework,
- jittery response times,
- and cost drift nobody noticed until month-end.

The team reaction was predictable: "AI is unreliable."

The better diagnosis was less dramatic: we had no routing logic, no eval baseline, and no rollback rules. We were asking one model to be universally good across workflows with different constraints.

That’s not strategy. That’s wishful abstraction.

The model wasn’t flaky.

Our process was.

---

## 2) The release treadmill got faster, and that changes the game

Model releases are not slowing down. If anything, the product surface is fragmenting faster.

OpenAI now explicitly separates usage profiles (Instant vs Thinking vs Pro), which productizes the speed-depth tradeoff instead of hiding it behind one default model choice. Anthropic is leaning harder into longer-context and team-style agent workflows. GitHub keeps rolling stronger top-tier models into Copilot offerings, which resets team expectations almost immediately.

You can ignore the release notes if you want.

Your developers won’t. Your clients won’t. Your competitors definitely won’t.

The practical implication: "pick one best model" is becoming less useful each quarter.

What matters now is best-fit routing by job:
- fast tier for routine throughput,
- deeper tier for high-stakes reasoning,
- strict fallback when either quality or latency slips.

In other words, multi-model operations beats model loyalty.

If your AI strategy is one model name in a config file, you don’t have an AI strategy. You have a preference.

---

## 3) The founder model-ops playbook (minimum viable, no ML team required)

You do not need a platform team to stabilize this.

You need a loop.

Here’s the smallest version that actually works.

### Step 1: Build a tiny eval set from real work

Pick four task types you actually run every week:
1. support response draft,
2. sales-call summary,
3. proposal/statement-of-work draft,
4. one edge-case reasoning task that usually causes friction.

Use your real prompts. Not benchmark theater prompts.

If you test with synthetic tasks, you’ll get synthetic confidence.

### Step 2: Score each candidate model on four dimensions

For each task, score:
- **quality** (does this need heavy human rewrite?),
- **latency** (does this fit the workflow SLA?),
- **cost** (is this sustainable at actual volume?),
- **consistency** (does quality hold across repeated runs?).

Keep this lightweight. A simple 1–5 rubric plus notes is enough to start.

The goal is not scientific purity.

The goal is fewer bad surprises.

### Step 3: Route by job, not by hype

Set routing rules that reflect business constraints:
- default fast model for the 80% routine lane,
- deeper reasoning model only for high-stakes branches,
- explicit "do not auto-run" zones for sensitive tasks.

If everything goes to the expensive/deep tier, your cost profile explodes.

If everything goes to the fast tier, quality debt explodes.

Either way, you pay.

### Step 4: Add rollback triggers before you need them

Define automatic fallback behavior upfront:
- if median latency exceeds threshold X for Y hours,
- if quality scores dip below threshold,
- if error/retry rate crosses threshold,

…route to backup model or pause specific automations.

Rollback is not a failure signal.

No rollback plan is.

### Step 5: Run a weekly 30-minute review

Not daily panic-checking release notes.

Weekly, same agenda:
- what changed,
- what degraded,
- what improved,
- what to reroute,
- what to leave alone.

This is where teams either build leverage or build noise.

Systems beat screenshots.

---

## 4) What to implement this quarter

If you want a concrete monthly plan:

### Week 1
Define eval tasks and scoring rubric. Pull examples from real queue work.

### Week 2
Test top 2–3 models against that set. Capture quality/latency/cost/consistency.

### Week 3
Ship routing + fallback logic. Keep it simple and explicit.

### Week 4
Monitor drift. Keep what works. Kill what doesn’t. Document changes.

Then run monthly tune-ups, not weekly architecture rewrites.

A common founder mistake here is full re-platforming on every major model launch.

Don’t.

Treat model vendors like changing infra dependencies: evaluate, migrate deliberately, preserve rollback, protect production.

You don’t need a lab.

You need a loop.

---

## 5) Hard opinion: “model selection” consulting by itself is already stale

If a consultant’s core offer is "we’ll pick your model," that value is decaying quickly.

The durable value is operational:
- orchestration design,
- routing policy,
- eval discipline,
- reliability guardrails,
- and business integration with real owners.

Model choice still matters.

It just isn’t the moat.

Execution cadence is the moat.

The teams that win this year won’t be the teams that guessed the single best model in March.

They’ll be the teams that built a repeatable system for adapting in April, May, and June without blowing up quality, margins, or trust.

That’s less exciting than announcement-day hot takes.

It’s also how businesses survive platform volatility.

---

## Sources

- OpenAI Academy — *Introducing GPT-5.3 Instant, GPT-5.4 Thinking, and GPT-5.4 Pro*  
  https://academy.openai.com/public/clubs/work-users-ynjqu/resources/latest-model

- TechCrunch — *Anthropic releases Opus 4.6 with new ‘agent teams’*  
  https://techcrunch.com/2026/02/05/anthropic-releases-opus-4-6-with-new-agent-teams/

- GitHub Changelog — *Claude Opus 4.6 is now generally available for GitHub Copilot*  
  https://github.blog/changelog/2026-02-05-claude-opus-4-6-is-now-generally-available-for-github-copilot/

- CNBC — *Anthropic launches Claude Opus 4.6 as AI moves toward a ‘vibe working’ era*  
  https://www.cnbc.com/2026/02/05/anthropic-claude-opus-4-6-vibe-working.html
