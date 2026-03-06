---
layout: post
title: "The Model Changed Again. Your Ops Didn’t."
date: 2026-03-06
categories: [essays]
published: true
---

Every model release now creates the same emotional arc on teams like ours. First, everyone is excited. Then, a week later, someone asks why quality slipped on support replies, why latency is suddenly inconsistent, or why costs jumped without any obvious product gain. We’ve been through that cycle more than once, and it took us too long to admit the underlying issue wasn’t “the model changed.” The issue was that our operating loop never matured past “pick one and hope.”

At the beginning, we treated model upgrades like normal dependency upgrades: pick the newest strong model, swap it in, and move on. That approach sounds clean in a meeting. It fails in production because one model almost never maps cleanly to every workflow you run.

---

## 1) We tried “pick one model and ship.” It broke in three weeks.

The original plan was simple and very founder-friendly: standardize on one model, reduce decision overhead, keep architecture tidy. In practice, it broke fast. The same model that performed well on longer strategic writing drifted on support drafts under tighter latency constraints. Sales summaries became too verbose when we needed crisp call notes. Engineering-oriented work improved while operational writing got noisier.

None of these failures were dramatic enough to trigger an obvious incident. That’s what made them expensive. We saw extra review passes, more hidden cleanup, jittery response timing, and cost drift that only became obvious at month-end.

When that happens, teams usually say “AI is unreliable.” The better diagnosis is less exciting and more useful: no routing policy, no evaluation baseline, and no rollback triggers. We were asking one model to be equally good across workflows with different quality, speed, and cost constraints.

That isn’t strategy. That’s wishful simplification.

---

## 2) The release treadmill got faster, and strategy has to adapt

Model surfaces are fragmenting quickly. OpenAI now explicitly separates usage profiles (Instant vs Thinking vs Pro), which makes the speed/depth tradeoff a product choice instead of a hidden tuning detail. Anthropic keeps pushing on longer-context and team-style workflows, while GitHub rolls stronger model options into Copilot plans that reset developer expectations almost immediately.

You can ignore release notes if you want, but your team won’t and your clients won’t. The market behavior now rewards adaptive routing, not model loyalty.

In practical terms, "pick one best model" keeps getting weaker as an operating strategy. Best-fit routing by job is stronger:
- a fast default lane for routine throughput,
- a deeper reasoning lane for high-stakes tasks,
- explicit fallback behavior when either quality or latency drifts.

If your AI strategy is one model name in a config file, you don’t really have a strategy. You have a preference.

---

## 3) A minimum viable model-ops loop (without building an ML org)

You don’t need a platform team to stabilize this. You need a repeatable loop.

### Step 1: Build a small eval set from your real work

Pick four task types that actually show up every week: support response draft, sales-call summary, proposal/SOW draft, and one edge-case reasoning task that usually causes friction. Use your real prompts and real constraints. Synthetic benchmarks are useful for marketing. They’re weak for operational decisions.

### Step 2: Score candidates on four dimensions

For each task, score quality, latency, cost, and consistency. Keep scoring lightweight (1–5 plus notes is enough), but make it repeatable. The goal here is not scientific precision. The goal is fewer expensive surprises.

### Step 3: Route by workflow using concrete model lanes

This is where teams get leverage quickly. A practical example using Anthropic model lanes:

- **Everyday default lane:** Sonnet for routine operational throughput.
- **Heavy reasoning lane:** Opus for high-stakes analysis, synthesis, or complex decision support.
- **Lightweight/background lane:** Haiku for heartbeat checks, low-risk research sweeps, or simple recurring summaries.

That kind of lane design gives you control over cost and latency without flattening quality.

### Step 4: Add rollback triggers before you need them

Define fallback behavior in advance: if median latency crosses threshold X for Y hours, or if quality score drops below threshold, auto-route to backup model or pause specific automations. Rollback isn’t an embarrassment. Missing rollback is.

### Step 5: Run a weekly 30-minute review

Don’t do daily panic checks. Do one disciplined weekly review: what improved, what degraded, what rerouted, what stayed stable. This is where teams either build compounding leverage or drown in model-chasing noise.

Systems beat screenshots.

---

## 4) What to implement this quarter

If you want a concrete rollout path, keep it simple. Week one: define eval tasks and rubric from real queue work. Week two: test top 2–3 model options against that set. Week three: ship routing and fallback policy. Week four: measure drift, keep what works, cut what doesn’t, and document decisions.

Then move to monthly tuning, not weekly replatforming.

A common founder mistake is rebuilding architecture around every major release cycle. We’ve done versions of that. It feels proactive and usually burns time. Treat model vendors like other infrastructure dependencies: evaluate deliberately, migrate with rollback, and protect production continuity.

You don’t need a lab.

You need a loop.

---

## 5) Hard opinion: model selection alone is already stale consulting

If the core consulting offer is “we’ll pick your model,” that value is decaying fast. Model choice still matters, but the durable value has shifted to orchestration design, routing policy, evaluation discipline, reliability guardrails, and business integration with clear owners.

The teams that win this year won’t be the teams that guessed the best model in March. They’ll be the teams that built an operating cadence that still works in April, May, and June as the model landscape keeps moving.

Execution cadence is the moat.

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
