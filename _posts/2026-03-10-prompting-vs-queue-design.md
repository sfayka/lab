---
layout: post
title: "Prompting Is Not the Moat. Queue Design Is"
date: 2026-03-10
categories: [essays]
published: true
---

People keep asking whether prompt engineering still matters. Of course it matters. It just is not the moat.

Two teams can use the same model, the same prompt, and roughly the same temperature settings and still get completely different business results. One team gets a reliable workflow. The other gets duplicate writes, stuck tasks, mystery retries, and a support inbox full of "why did this send twice?" That difference is not model quality. That difference is queue design.

---

## The Prompt Is Not The System

Prompts matter because they shape a decision. Queues matter because they shape what happens **after** the decision. That is the layer most teams underbuild.

If your agent classifies a support ticket correctly but routes it to the wrong queue, the prompt did not save you. If your agent writes the right refund explanation but sends it twice because your retry path is sloppy, the prompt did not save you. If your agent drafts a clean CRM update but your workflow has no confidence threshold, no human gate, and no fallback route, the prompt did not save you.

The prompt is one component. The queue is the operating model. A lot of what people call "AI unreliability" is really orchestration debt with better branding.

## Same Model, Different Outcome

Take a simple support workflow. Both companies use the same model to read inbound emails, classify the issue, draft a response, and decide whether to escalate.

Company A says they have an AI support agent. What they actually have is a model call glued to a few tools. If the classifier is uncertain, it still pushes forward. If the draft fails to send, the system retries without checking whether the action already happened. If a human needs to step in, the ticket lands in the same pile as everything else.

Looks fine in the demo. Then production starts. Now tickets get mislabeled. Some customers get duplicate replies. High-risk edge cases sit in the same queue as routine account questions. The team starts saying the model is unreliable.

Maybe. But most of the damage happened after the model returned an answer. That is the part teams do not want to hear, because it is less fun than talking about prompts.

Company B uses the same model very differently. Low-risk tickets route straight through. Unclear classifications drop to a review queue. High-risk intents skip draft mode entirely and go to a human. Retries are bounded. Writes are idempotent. Every escalation has an explicit reason. Failures that cannot recover go to a dead-letter queue instead of silently looping.

Same model. Different system. Different result.

## Routing Beats Cleverness

The strongest agent systems I have seen are not the ones with the fanciest prompts. They are the ones with the clearest routing rules.

Route by things that actually matter:

- risk
- customer tier
- confidence
- task type
- tool availability
- whether the action is reversible

That sounds less exciting than prompt hacking. Too bad. It is also the part that determines whether the system behaves like a workflow or like improv theater.

A good route table does three things:

- sends easy work down the cheap path
- sends uncertain work to review before it becomes damage
- prevents high-risk actions from being treated like low-risk ones

You do not get that from a prettier prompt. You get it from explicit operational design.

## Retries Are Not Free

This is another place teams fool themselves. They think retry means resilience. Sometimes retry means duplicate side effects.

If your agent is reading documents or classifying text, a retry is usually harmless. If your agent is mutating state, sending email, writing to a CRM, updating a ledger, or creating a ticket, a retry can be the bug.

That is why retries need policy:

- bounded attempts
- different handling for transient failures vs bad input
- idempotency keys for mutable actions
- dead-lettering for things that should stop, not loop

Without that, the system does not get more reliable. It gets more chaotic. And chaotic systems are expensive in exactly the way dashboards are bad at showing: more cleanup, more review, more weird one-off customer issues, more time spent explaining what happened after the fact.

## Human Review Is Part Of Queue Design

Teams talk about human review like it is a separate compliance layer. It is not. Human review is part of the queue.

If you push everything to people, you destroy throughput. If you push nothing to people, you accumulate trust debt. The right question is not "should there be human review?" The right question is "where does the workflow need a human gate, and what condition sends work there?"

That means you need explicit rules for:

- which tasks can auto-complete
- which tasks can draft but not act
- which tasks require approval before writing
- which tasks escalate based on risk, not just model confidence

Human review should be designed like a route, not bolted on like an apology after the workflow already broke.

## What I Would Build First

If I were hardening an agentic workflow for an SMB team, I would care about this before I spent extra time tuning prompts:

- explicit route definitions
- bounded retries
- idempotent writes
- specialist review queues
- dead-letter handling
- structured logs for every action
- queue-level metrics: depth, retry rate, fallback rate, unresolved approvals

That is not glamorous. It is also where reliability comes from.

## The Real Moat

Prompts still matter. I still tune them. I still care about tone, extraction quality, and how a model reasons through an edge case. But prompts are not the moat.

The moat is whether your system can survive ambiguity, latency, partial failure, bad inputs, tool outages, and the occasional model miss without turning normal work into a cleanup project. That is queue design. That is orchestration. That is the difference between a smart demo and a durable system.

---

If two companies are using the same model, the same APIs, and roughly the same prompts, the winner usually is not the one with better wording. It is the one with better workflow design.

Same model. Same API bill. Very different business.

---

## References

- <https://docs.temporal.io/>
- <https://docs.aws.amazon.com/step-functions/latest/dg/concepts-error-handling.html>
- <https://docs.stripe.com/api/idempotent_requests>
- <https://www.svix.com/resources/queues-for-event-driven-systems/>
