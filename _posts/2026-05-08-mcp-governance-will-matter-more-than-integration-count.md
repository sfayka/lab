---
title: "MCP Governance Will Matter More Than Integration Count"
date: 2026-05-08
tags: [ai, agents, mcp, governance, permissions, security, orchestration]
categories: [essays]
layout: post
published: false
---

![Editorial hero image for MCP governance, permissions, trust boundaries, and audit trails]({{ "/images/generated/hermes/mcp-governance-hero.png" | relative_url }})

The next MCP fight is not going to be about who has the longest connector list.

That is the easy scoreboard. It is also the least useful one. A tool catalog tells you what an agent can reach. It does not tell you what the system should trust, who approved the action, which permissions traveled with the request, or what happens when a low-trust input gets routed into a high-trust workflow.

That is where the real product surface is moving.

MCP makes tool access feel cleaner. That matters. Integration glue has been one of the ugliest parts of agentic systems, and a shared protocol is better than every vendor inventing a slightly different way for a model to call a calendar, a database, a repo, or a billing system.

But once the integration works, the harder question shows up immediately:

What is this agent allowed to cause?

Not what tool can it call. Not what endpoint can it reach. What consequence can it create downstream, under whose authority, with what approval, and with what evidence left behind?

That is the governance problem. MCP does not remove it. It makes it impossible to ignore.

## Reachability Is Not Trust

The first phase of MCP adoption is naturally going to look like a land grab. Every product wants to say it supports MCP. Every agent platform wants to show a long list of connected tools. Every internal platform team wants to reduce bespoke integration work.

Fine. That phase is useful.

It is also incomplete.

An MCP server is not trustworthy because it is reachable. A connector is not safe because it is standardized. A tool call is not legitimate because the agent found the tool in a registry.

Reachability answers one question: can the agent get there?

Governance answers the questions that matter in production:

- should this agent be allowed to use this tool for this task?
- does the user approval cover this downstream action?
- is the action read-only, reversible, expensive, destructive, or customer-visible?
- is the data driving the action trusted enough to authorize the consequence?
- can we explain later why the system allowed it?

Those are not edge cases. They are the operating model.

The boring example is also the dangerous one. An agent reads a web page, extracts a few facts, opens GitHub, creates an issue, edits a config file, and prepares a pull request. Each step looks reasonable in isolation. Reading a web page is low risk. Creating an issue is usually low risk. Editing a config file may be medium risk. Preparing a pull request may be safe if it stops before merge.

But the chain matters.

If the web page contained hostile instructions, stale facts, or a deliberately misleading dependency name, the agent may have carried low-trust input into a write-capable system. If the GitHub connector inherited broad repo permissions, the low-trust input now has a path to high-trust action. If the user approved "research this dependency" and the system interpreted that as approval to mutate code, the approval boundary moved without anyone explicitly deciding it should.

That is not a protocol problem.

It is a trust propagation problem.

## Approval Is Not A Boolean

Most teams talk about approval as if it is a single gate.

Approved or not approved.

That framing breaks quickly once agents start chaining tools.

Approval has scope. It has time. It has actor identity. It has intent. It has downstream boundaries. A human may approve an agent to inspect a repo. That does not mean the agent is approved to push a branch. A human may approve a billing lookup. That does not mean the agent is approved to issue a refund. A human may approve a customer-support draft. That does not mean the agent is approved to send it.

The question is not whether approval happened.

The question is what approval means at each state boundary.

A serious MCP-enabled system needs to treat approval as a structured object, not a vibe:

- who granted it
- which task it applies to
- which tools it covers
- which actions are excluded
- whether it can be delegated to subagents
- whether it expires
- whether it permits writes, sends, deletes, publishes, or deploys
- what evidence must be captured before the system accepts completion

Without that structure, approvals get laundered through the workflow. The user said yes to something upstream, and the system keeps spending that yes until it runs out of imagination or hits a hard permission error.

That is the wrong default.

Approval should not automatically follow the agent. Approval should have to survive each boundary it crosses.

## Agents Need Different Permissions Than Humans

One of the easiest mistakes is giving an agent the same permissions as the human who launched it.

That feels convenient. It is also how you accidentally turn human judgment into machine-speed authority.

Human permissions are often broad because humans are expected to apply context. A developer may have access to production logs, staging credentials, repo settings, and deployment controls because the organization trusts the developer to understand when each one is appropriate. If an agent inherits that entire surface, the system has converted judgment into entitlement.

The agent does not have the same situational awareness. It does not carry the same accountability. It does not pause in the same way before an irreversible action. It may be operating on summarized context, untrusted external content, stale memory, or a partially correct plan. If it has broad permissions, every one of those flaws can become an operational event.

So the permission model has to be designed around acceptable blast radius, not just intended behavior.

If the agent is supposed to read cost data, give it read access to the relevant cost data. If it needs to open a pull request, give it the narrow path required to propose a change, not the authority to merge it. If it needs to update a ticket, scope the update. If it needs to touch production, make that a separate state transition with separate approval.

This is where MCP governance becomes concrete. The useful question is not "does our agent support the AWS MCP server?" The useful question is "when this agent reaches AWS through MCP, can our controls distinguish agent-driven access from human-driven access, and can we enforce narrower rules for the agent?"

The same question applies to GitHub, Slack, Google Drive, Linear, Stripe, Salesforce, internal admin tools, and anything else with durable side effects.

If the permission system cannot tell the difference between a human action and an agent action, the organization is left pretending they are the same class of event.

They are not.

## Tool Output Should Not Authorize Tool Action

The next failure mode is more subtle.

An agent calls one tool. The output from that tool becomes the justification for calling another tool. That is normal orchestration. It is also where trust boundaries blur.

For example:

- a browser tool reads a vendor page
- the agent extracts a migration instruction
- a repo tool writes a config change
- a CI tool runs tests
- a GitHub tool opens a pull request
- a Slack tool announces that the migration is ready

Nothing in that chain is exotic. But each transition changes the trust level and consequence level of the workflow.

The browser output is evidence. It is not authority.

The test result is evidence. It is not authority.

The pull request is an artifact. It is not proof that the migration is safe.

A well-governed system keeps those meanings separate. Tool output can inform a decision, but it should not silently grant permission for the next side effect. If a low-trust source leads to a high-impact action, the system should either narrow the action, request fresh approval, or route the task to review.

This is the practical difference between an agent that has tools and a system that governs action.

## Subagents Make Inheritance Dangerous

Delegation makes the problem sharper.

If a parent agent has approval to perform a task, what does a child agent inherit?

All tools? Some tools? Read-only access? The same approval? A reduced scope? No authority to write? A different audit identity? A separate timebox?

Most teams do not have crisp answers yet because the first wave of agent systems treated subagents as an execution convenience. Split the work. Run research in parallel. Hand off implementation. Summarize results.

That is useful. It also creates an authorization problem.

Delegated work should not automatically inherit full authority from the parent. A research subagent should not gain write access because the parent can write. A verifier should not be able to mutate the artifact it is verifying. A summarizer should not inherit permissions to send the summary to customers. If a child agent touches a privileged path, that should be visible in the audit trail as its own event, not hidden inside the parent's broad approval.

Separation of duties matters more, not less, when the duties are performed by software.

The governance layer needs explicit inheritance rules:

- what authority can be delegated
- what authority is never delegated
- when a child must request fresh approval
- how child actions are attributed
- how results flow back without expanding privileges

Without those rules, subagents become permission multipliers.

## Audit Trails Are The Product Surface

The mature version of MCP governance will not be a prettier connector directory. It will be an inspection surface.

Operators will need to answer basic questions after the fact:

- which agent called which tool?
- under which approval?
- using which identity?
- against which resource?
- based on which input?
- with which result?
- what state changed afterward?
- who reviewed or overrode the decision?

If those questions require reconstructing events from chat transcripts, shell history, and scattered logs, the system is not governed. It is merely instrumented.

An audit trail has to preserve the shape of the decision, not just the fact that an API call occurred. "Agent called GitHub" is too thin. "Research subagent opened PR #214 using approval A-173, based on browser artifact B-822, limited to branch creation and PR creation, blocked from merge, then routed to human review because the target file touched deployment config" is the kind of record operators can use.

That record is boring. It is also the difference between an agent platform a serious team can adopt and an impressive demo they cannot put near production.

The audit surface should make governance legible:

- approval scope
- permission ceiling
- tool invocation
- input trust level
- output artifact
- state transition
- review decision
- exception path

This is the same lesson that keeps showing up in agent infrastructure. The agent's self-report is not enough. The system needs durable evidence, explicit state, and an acceptance rule.

MCP does not change that. It widens the set of systems where the lesson applies.

## The Real MCP Scoreboard

Connector count will still matter. More tools means more possible workflows, less custom glue, and faster adoption. But connector count is the first scoreboard, not the final one.

The better scoreboard is operational:

- Can the system enforce different permissions for agents and humans?
- Can approvals be scoped, expired, and audited?
- Can subagents inherit less authority than their parent?
- Can tool outputs carry trust labels without granting action rights?
- Can high-impact actions require fresh approval?
- Can the audit trail explain why the action was allowed?
- Can the system distinguish evidence from authorization?

Those are the questions that decide whether MCP becomes enterprise infrastructure or just a bigger plug-in drawer.

The companies that win this layer will not be the ones with the most logos in a connector grid. They will be the ones that make authority explicit. They will understand that "agent can call tool" and "system should trust the consequence" are different claims.

The first claim is connectivity.

The second claim is governance.

Connectivity gets the agent to the door. Governance decides whether it should be allowed to turn the handle.

## References

- AWS Security Blog — Secure AI agent access patterns to AWS resources using Model Context Protocol: <https://aws.amazon.com/blogs/security/secure-ai-agent-access-patterns-to-aws-resources-using-model-context-protocol/>
- Microsoft Agent 365 Blog — What's new in Agent 365, May 2026: <https://techcommunity.microsoft.com/blog/agent-365-blog/what%E2%80%99s-new-in-agent-365-may-2026/4516340>
- Axios — Agents are coming for every software business: <https://www.axios.com/2026/05/05/agents-ai-software-model-context-protocol>
- Model Context Protocol documentation: <https://modelcontextprotocol.io/introduction>