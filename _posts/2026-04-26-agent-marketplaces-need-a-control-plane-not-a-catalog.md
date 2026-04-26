---
title: "Agent Marketplaces Need a Control Plane, Not a Catalog"
date: 2026-04-26
tags: [ai, agents, systems, governance, control-plane, enterprise, verification]
categories: [essays]
layout: post
published: false
---

Agent marketplaces are going to make bad agent governance look like a procurement problem. It is not. It is a runtime problem.

The demo framing is simple: put specialized agents in a gallery, let teams discover them, connect the right one to the right workflow, and suddenly the enterprise has an AI workforce. That is the easy part. The hard part starts one step later, when the agent is allowed to touch a customer record, create a vendor, approve a payment, update a CRM field, or move a task into a state that another system treats as true.

![AI-generated editorial image for agent marketplace control planes]({{ "/images/generated/hermes/agent-marketplaces-control-plane-hero.png" | relative_url }})

## Status note

Skeleton only. Do not publish without validating the source claims, tightening the examples, and deciding whether this should be framed around agent marketplaces broadly or around the narrower enterprise identity/governance layer.

## Working thesis

As enterprise agents move into galleries, marketplaces, and partner ecosystems, the real product is not the catalog. The real product is the control plane that decides what each agent is allowed to do, what evidence proves it did the right thing, and which human or system owns the decision when the evidence is ambiguous.

## Target reader

- Technical operators evaluating agent platforms inside an existing company.
- Founders building agent infrastructure who are tempted to treat distribution as the hard part.
- Small business and mid-market leaders who will soon be sold “agent marketplaces” as if discovery equals safety.

## Why now

Recent public signals are converging around agents as distributed enterprise software rather than isolated chat interfaces:

- Google Cloud announced partner-built agents available inside Gemini Enterprise, moving agents into an enterprise platform/gallery pattern: <https://cloud.google.com/blog/products/ai-machine-learning/partner-built-agents-available-in-gemini-enterprise>
- Prisma AIRS was described on X as running inside the customer’s GCP environment with a native control plane for Vertex AI and Gemini: <https://x.com/rajeshberi/status/2047950556539547908>
- Dun & Bradstreet tied agentic workflows to business identity verification and D-U-N-S based onboarding: <https://x.com/DunBradstreet/status/2047695598338322796>
- World described Vercel and Okta work around human-in-the-loop verification for agentic workflows and a “Human Principal” pattern: <https://x.com/worldnetwork/status/2047821101820936338>
- Microsoft’s Agent Governance Toolkit frames the problem as runtime governance: deterministic policy enforcement, zero-trust identity, sandboxing, and SRE for autonomous agents: <https://github.com/microsoft/agent-governance-toolkit>

## Source links to preserve

- Google Cloud Blog: Partner-built agents available in Gemini Enterprise — <https://cloud.google.com/blog/products/ai-machine-learning/partner-built-agents-available-in-gemini-enterprise>
- Microsoft Agent Governance Toolkit — <https://github.com/microsoft/agent-governance-toolkit>
- X post mentioning Prisma AIRS inside Gemini Enterprise Agent Platform — <https://x.com/rajeshberi/status/2047950556539547908>
- X post from World on human-in-the-loop verification with Vercel/Okta — <https://x.com/worldnetwork/status/2047821101820936338>
- X post from Dun & Bradstreet on business verification agents — <https://x.com/DunBradstreet/status/2047695598338322796>
- X search result for “AI Agent Governance Toolkit” — <https://x.com/Dinosn/status/2048293123990630612>

## Duplicate check / relation to existing Lab posts

This overlaps with Sean’s control-plane essays but has a different wedge:

- “Done According to What” argues completion must be evidence-backed.
- “Overnight, Unsupervised, and Still Telling the Truth” argues unattended systems need honest classification.
- “Build Me a $1M ARR Product” explains task decomposition and verification loops.

This skeleton should not repeat those arguments. The new angle is marketplace distribution: once agents come from many vendors and run inside shared enterprise environments, governance becomes the runtime surface. The catalog is only the front door.

## Outline

### 1. The catalog is the wrong mental model

Open with a concrete mismatch: an enterprise installs a “vendor onboarding agent” from a gallery. The approval flow looks clean. The agent can read vendor records, check an identity provider, and update procurement status. The risk is not whether the tile in the gallery looked trustworthy. The risk is whether every action is scoped, logged, evidenced, and reversible.

Possible opener:

> The dangerous part of an agent marketplace is not that someone installs the wrong agent. It is that the right-looking agent gets the wrong authority.

### 2. Marketplaces turn agent safety into a multi-party problem

A single internally built agent can be governed with local conventions. A marketplace introduces multiple actors:

- platform owner
- agent vendor
- enterprise admin
- workflow owner
- identity provider
- system of record
- human approver

The article should emphasize that every boundary creates a place for responsibility to blur.

### 3. Identity is not login; identity is authority

Use the D&B / Okta / World signals carefully: do not overclaim. The point is that identity verification is becoming part of agentic workflow design.

Questions to validate:

- Who is the principal when an agent acts?
- Is the action attributed to the agent, the user, the vendor, the workspace, or a delegated service account?
- What happens when the agent’s action is correct but unauthorized?
- What happens when the agent’s action is authorized but unsupported by evidence?

### 4. Policy has to sit in the path of action

Tie Microsoft’s toolkit positioning to Sean’s existing language: policy enforcement cannot be an after-the-fact dashboard. It has to sit between the agent framework and the action.

Concrete system picture:

1. Agent proposes tool call.
2. Policy engine evaluates identity, scope, risk, and context.
3. Sandbox executes only the permitted action.
4. Evidence receipt is captured.
5. Reconciliation checks the system of record.
6. Ambiguous or high-impact outcomes route to human review.

### 5. Human-in-the-loop is a routing decision, not a slogan

Argue against generic “keep a human in the loop” language. The useful version specifies:

- which actions need approval before execution
- which outcomes need review after execution
- which evidence gaps block completion
- which identities can override policy
- what audit trail survives later investigation

### 6. The Knox Analytics angle

For small and mid-sized teams, the right question is not “Which agent marketplace should we adopt?” It is:

- Which workflows are safe to expose to third-party or partner-built agents?
- What permission envelope does each workflow need?
- What evidence proves the agent did the job?
- Where does human review belong?
- What does the system do when records disagree?

This connects directly to Knox’s operator-founder stance: boring governance is what makes agents useful enough to trust.

## Key claims to validate

- Google Cloud’s Gemini Enterprise announcement is accurately described as agent/gallery or marketplace-like distribution.
- Prisma AIRS details in the X post are public and attributable; avoid treating a single X post as definitive product documentation unless confirmed by vendor docs.
- Microsoft Agent Governance Toolkit is accurately summarized as runtime policy enforcement, zero-trust identity, sandboxing, and reliability/SRE for agents.
- World/Okta/Vercel and D&B examples should be described as public signals, not proof of a settled market category.
- No claim should imply these tools interoperate unless a source says so.

## Counterargument / caveat

A catalog still matters. Procurement, discovery, trust badges, and vendor review are useful. But they do not answer the production question. A reviewed vendor can still be over-permissioned. A high-quality agent can still act on stale context. A correct action can still lack the evidence needed to close the loop. Distribution lowers adoption friction; it does not create operational truth.

## TODOs for expansion

- Pull exact quotes from the Google Cloud announcement and Microsoft README.
- Confirm whether Prisma AIRS has an official product page or blog post that should replace the X-only citation.
- Decide whether to include a short “minimum viable agent governance checklist.”
- Add a concrete example around vendor onboarding, support ticket refunds, or CRM record updates.
- Make the close sharp: “A marketplace gives you agents. A control plane tells you what they are allowed to make true.”

## Hero image prompt summary

AI-generated with Hermes image provider `openai-codex` / `gpt-image-2-medium`.

Visual metaphor: an enterprise agent marketplace grid feeding into a central policy checkpoint with identity badges, permission gates, audit/evidence receipts, and approved routes into systems of record.
