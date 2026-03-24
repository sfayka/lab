---
layout: post
title: "Where Human Review Actually Belongs in an Agentic Workflow"
date: 2026-03-10
categories: [essays]
published: true
---

The instinct when something goes wrong in an agentic workflow is to add more human review. Put a person at the end. Gate every action. That instinct is understandable and usually counterproductive.

Too much review doesn't make a system safer — it makes it slower, more expensive, and prone to the failure mode where people start approving things automatically because they're approving seventy items a day that don't actually require their judgment. Too little review means errors compound invisibly until something surfaces as a refund, a customer complaint, or a quiet data integrity problem nobody catches until reconciliation. The goal isn't more review or less review. It's review in the right place.

That means mapping the workflow before you place any gates.

Before you add an approval step, trace the chain end-to-end: every input, every tool call, every state write, every handoff. At each transition, ask what happens if the model gets it slightly wrong. Not catastrophically wrong — slightly wrong. An invoice with a transposed field. A ticket routed to the wrong owner. A CRM update that creates a duplicate instead of enriching an existing record. Those small errors are where the review question actually lives, because they're common, they cascade, and they usually go unnoticed until someone is doing reconciliation at the end of the week.

The transitions that matter most are what I'd call state boundaries — moments where an error stops being cheap to fix. A model that drafts the wrong reply is easy to catch before send. A model that triggers a refund, commits a billing change, or fires a customer-facing message has already crossed a line that takes more than a quick edit to undo. Map those boundaries first. That's where human review belongs.

Most workflows have three kinds of nodes: machine-only (formatting, categorization, low-stakes routing), machine-with-threshold (medium-confidence work that gets a human look if some score or condition triggers), and machine-then-human (anything touching money, legal commitments, or customer trust directly). The mistake is treating every node the same — gating everything uniformly, or gating nothing.

Where failures cluster in SMB workflows is predictable once you've seen a few of them. In support: wrong intent classification sends a customer to the wrong queue, or stale context produces a reply that contradicts what was promised in a previous interaction. In sales ops: bad lead enrichment creates duplicates, or a discount commitment ends up in the wrong opportunity. In finance: invoice parsing misreads a line item, or a PO match fails silently and the reconciliation comes up short at close. In internal tooling: ticket routing errors mean work sits in the wrong queue for two days before anyone notices. These aren't exotic failure modes. They're the first failures that show up in any agentic workflow that didn't design for them.

Human review adds real value where uncertainty is high and the business consequence of being wrong is non-trivial. It adds almost no value — and measurable cost — where the action is repetitive, low-stakes, and reversible. Route the low-risk, high-volume edges to machine-only paths. Route the high-uncertainty, high-impact edges to human gates. Everything in between gets a threshold.

A policy matrix makes this operational. Define severity tiers: auto (no human touch), sample (random spot-checks), human-before-send (agent drafts, human fires), and human-after-sent (post-facto audit). Tie each tier to objective conditions — customer tier, transaction amount, policy flags, anomaly score, data sparsity — not to team hierarchy or whoever has the loudest complaints this week. Review queues organized around risk stay meaningful. Review queues organized around org chart become noise.

When you design for review, design for the reviewer too. Reviewers who receive context-heavy, bloated handoff packets start approving things on autopilot. Compact bundles work better: source input, what the model did, which fields changed, what happens next. Track first-pass acceptance rate per queue. If reviewers are accepting everything, either the routing is wrong — sending too much — or the bundle is too thin for them to actually evaluate. Reviewer feedback should close the loop back into routing rules, not just accumulate in a tracking sheet.

Governance around this doesn't have to be elaborate, but it has to be clear. Someone specific should own each policy knob — not the team, not a committee, a person. Every bypass or override should log the actor and rationale. Review SLOs (response time, false-positive rate, rework rate) should be published and checked on a regular cadence. Without that accountability layer, review policies drift. Thresholds creep. Ownership gets fuzzy. The gates exist on paper while the work flows around them.

The failure modes to avoid are easy to spot once you've run into them. Blanket human review kills throughput and burns reviewer attention fast. End-of-workflow gating means errors have compounded through five steps before anyone catches them. Using confidence scores as gates without calibrating them against actual outcomes means a well-calibrated model gets flagged constantly while an overconfident one sails through. No ownership of exception categories is how you build a team that runs the same manual triage loop every week with no one responsible for fixing the root cause.

The simplest default that holds up over time: every workflow step gets a risk class, and only the steps classified as high-risk go to a human. Everything else runs. Measure the gates weekly against exception rates and rework. Adjust thresholds when the data says something has changed. The system should get less review-intensive as it earns trust — not accumulate more gates every time something goes wrong.

## References

- <https://www.retool.com/blog/ai-agentic-workflows>
- <https://arxiv.org/abs/2201.11775>
- <https://www.zdnet.com/article/how-to-implement-human-in-the-loop-ml-ops/>
- <https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/the-economic-potential-of-generative-ai>
- <https://www.atlassian.com/incident-management/incident-review>
