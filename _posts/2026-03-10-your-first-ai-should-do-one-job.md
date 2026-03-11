---
layout: post
title: "Your First AI Agent Should Do One Job. Ship It Next Week."
date: 2026-03-10
categories: [essays]
published: true
---

Everybody wants an autonomous employee. That is usually how teams get into trouble.

Your first AI agent should do one boring job you already understand. One trigger. One input shape. One output. One rollback path. Not because ambition is bad, but because trust is earned narrowly.

If your first agent can reconcile payouts, prep a weekly report, or triage Tier 1 support better than a messy manual process, that is a win. A real one. It saves time. It builds confidence. It gives you something you can actually operate. That is a much better first step than trying to build a synthetic coworker that touches six systems and improvises its way through your business.

---

## Most Teams Start Too Broad

This is the mistake I keep seeing: "We want an agent that can handle operations." Or support. Or sales. Or just "be helpful."

That is not a first agent. That is a vague ambition wearing a product requirement costume.

Broad agents fail in boring ways. Too many tools. Too many edge cases. Too much hidden judgment. No clear handoff. No obvious rollback. Then when something goes wrong, nobody can even agree on what the system was supposed to do in the first place.

That is not an AI problem. That is a systems design problem caused by starting too wide. The fix is not better prompting. The fix is picking one job small enough to finish. If you cannot explain the workflow without waving your hands around, it is too broad.

## Pick A Job Small Enough To Finish

Your first agent should be narrow enough that you could explain the entire workflow on a whiteboard in two minutes.

That usually means:

- one bounded workflow
- clear inputs and outputs
- low ambiguity
- reversible or reviewable actions
- no money movement on v1
- no broad admin access across half your stack

Good first jobs:

- payout reconciliation into a draft ledger row with links and diffs
- CRM hygiene sweeps: dedupe, enrich, assign, report
- Tier 1 support triage with draft replies and policy-based escalation
- weekly report assembly from known systems into a standard format

Bad first jobs:

- "handle my inbox"
- "run operations"
- anything that requires the agent to impersonate judgment across five systems
- anything where a wrong action creates an immediate customer or financial mess

Start with something boring. Boring is good. Boring means the boundaries are visible. Visible boundaries are what let you debug reality instead of debating vibes.

## Why This Is Finally Worth Doing

This is the first year I feel comfortable telling SMB teams to try agents in production. Not because the models suddenly became perfect. They did not.

What changed is the scaffolding around them. Whether you like the vendors or not, they are all conceding the same point: if agents are going to touch real workflows, they need controls, auditability, evaluation, and governance.

Microsoft is pushing harder on agent identity, policy, posture management, and auditability with Agent 365 and the surrounding security stack. OpenAI just launched Codex Security in research preview, which is basically an argument that agents need validation, context, and reviewability baked into the workflow. Google is still hammering the same point from the governance side: lifecycle oversight from pre-launch testing through monitoring and remediation.

That matters. It means the conversation is finally shifting from "can an agent do something interesting?" to "can we run this safely, measure it, and roll it back when it misbehaves?" That is a much more useful conversation for a real business.

## If I Had One Week

You do not need a quarter to prove whether this is worth doing. A week is enough. If I were helping a small team stand up their first real agent, this is the sequence I would use.

First hour: write the contract. Define the trigger, the input shape, the allowed actions, the output, the handoff rule, and the rollback rule. Then write a few golden test cases before you write a line of code. Happy path. Missing data. Policy violation. Tool failure. Bad upstream response.

If you skip that step, you are not building an agent. You are freehanding automation. A vague agent spec is just hope in markdown.

Then I would set up access the boring way: least-privileged credentials, read-only where possible, scoped keys, and logs on everything. The first version should earn the right to write. It should not begin there.

After that, build the smallest observable skeleton possible. Read the input. Transform it. Produce a draft output. Persist a structured activity log so later, when somebody asks what happened, you have an answer better than "the model decided."

Then run it against a handful of real examples from your own business. Not pristine examples. Messy ones. The kind with missing fields, inconsistent formatting, stale data, and edge cases nobody wrote down because a human normally just figures it out. That is where the useful failure modes show up. Not in the demo.

Then add guardrails before adding power. My default trust ladder for a first agent is simple:

read -> draft -> human approve -> write

Most teams want to jump straight to the last step because autonomy feels like the payoff. Usually the real payoff is trust. Trust is what earns you the next step.

Once that looks good in shadow mode, turn it on for a small slice of eligible tasks. Ten percent is enough. Review the diffs daily. Watch where humans are correcting it. Watch where the system hesitates. Watch whether the mistakes are understandable or chaotic. If you cannot explain the failure mode, you are not ready to scale the success mode.

At the end of the week, one of three things should happen:

- expand it
- tighten the top failure modes and run another week
- kill it and document why

All three are valid outcomes. The real failure is dragging a vague pilot around for three months because nobody wants to admit it is not ready.

## Architecture That Ages Well

The first version should be simple, but it should not be sloppy.

A few defaults age well:

- manager/worker shape instead of one monolithic prompt
- prompts and policies in versioned files
- structured logs for every action
- a diff view for anything that changes state
- a clear escalation path when confidence, policy, or data quality drops

You do not need a massive control plane on day one. You do need enough structure that you can debug the system after the novelty wears off.

## Metrics That Matter

If you are a founder or operator, these are the numbers I would watch first:

- coverage: what percentage of eligible tasks the agent even attempts
- assist rate vs autonomy rate
- human correction rate
- mean time to resolution vs baseline
- incidents: bad writes, policy violations, and rollback events

Do not let vanity metrics fool you. A high automation rate with rising correction load is not success. It is outsourced cleanup.

## What Not To Do

A few mistakes show up over and over:

- chaining six tools together on v1
- giving the agent broad write access before it earns it
- shipping without a diff view
- skipping golden tests
- treating model confidence as the same thing as business safety

That last one gets teams in trouble. A model can sound confident and still be operationally wrong.

Ask me how I know.

## Start Narrow, Then Earn More Surface Area

Autonomous can wait. Trust cannot.

Your first real win with agents is usually not flashy. It lives in a workflow you already hate. Something repetitive. Something annoying. Something that drains attention from people who should be doing better work. That is exactly where you start.

One job. Ship it next week. Then decide whether it deserves a second one.

---

## References

- <https://www.microsoft.com/en-us/security/blog/2026/03/09/secure-agentic-ai-for-your-frontier-transformation/>
- <https://openai.com/index/codex-security-now-in-research-preview/>
- <https://blog.google/products/2026-responsible-ai-progress-report/>
