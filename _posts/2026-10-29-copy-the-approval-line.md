---
title: "Copy the Approval Line"
date: 2026-10-29
tags: [ai, agents, smb, operations, governance, human-review]
categories: [essays]
layout: post
published: false
---

Several agent products aimed at small and mid-sized businesses launched this month. They do different jobs. Bookings, accounting, accounts payable. Different companies, different buyers.

They drew the human-approval line in roughly the same place.

That is useful. When vendors who compete with each other land on the same rule, it is usually because they have seen what happens without it. If you are a small business owner setting up your first agent, you do not need to invent that rule. You can copy it.

## What the launches actually say

[WebRun](https://webrun.ai/blog/webrun-launches-ai-agents-for-business-operations), launched October 20, runs agents for business operations. Its example is a booking agent that adds new bookings to a schedule sheet and sends the team the day's list. The line is stated plainly: "Anything that can't be undone, like emailing a customer, waits for approval." Actions set to require approval pause the run and ask you in Telegram or WhatsApp. Every run is recorded.

Oracle NetSuite's industry agents, called SuiteAgents, were [covered by Small Business Trends](https://smallbiztrends.com/netsuite-launches-industry-specific-ai-agents-for-businesses/) on October 29. They monitor operations, flag risks, recommend actions, and help with multi-step workflows. The company says they work inside NetSuite's existing governance and are meant to preserve human judgment and accountability. The article also points out where oversight matters most: financial reporting, contract changes, compliance, and customer billing. And it gives sensible advice. Check which actions need employee review before you rely on the recommendations.

Kognitos works on finance back-office tasks such as accounts payable and reconciliation. According to an [industry roundup](https://upsellconnect.com/upsell-business-agency/ai-news/ai-agents-small-business-2026.html), Kognitos says releasing a payment stays with a human, and that an AI employee cannot approve its own work.

<!-- SEAN: The Kognitos claim (payment release stays with a human; no agent approves its own work) comes from the upsellconnect.com roundup only. I could not confirm it on kognitos.com. Please verify on Kognitos's site or a press release, or cut/soften this paragraph before publishing. -->

Three products. One pattern. The agent can watch, sort, draft, and recommend. A person says yes before anything leaves the building or moves money.

## Why the line sits there

The line follows one question: what can you take back?

A wrong row in a spreadsheet costs you a minute. A wrong email to a customer costs you a phone call and some trust. A wrong payment costs you the money, plus the week it takes to get it back, if you ever do.

So the question to ask about any step is not "could the agent do this?" It probably could. The question is "if this is slightly wrong, can I undo it before anyone outside notices?"

If yes, let the agent do it and check the results in batches. If no, the agent prepares it and a person approves it.

I made a longer case for this in [Where Human Review Actually Belongs](/posts/where-human-review-belongs/). The short version: review everything and your people start clicking approve without reading. Review nothing and errors pile up until reconciliation. Put the gate where mistakes become expensive or public.

The second Kognitos point matters as much as the first. An agent should not approve its own work. That sounds obvious. But it is easy to build by accident. You ask the agent to check its own output, it says the output is fine, and the workflow moves on. That is the agent agreeing with itself.

## The rule: what needs a yes first

Here is a one-page rule you can adopt as written. Edit the examples to fit your business. Keep the structure.

---

**What Needs a Yes First**

*Our rule for AI agents and automations. Applies to every tool, every vendor.*

**1. A person approves before the agent does anything that:**

- Sends a message to a customer, vendor, or anyone outside the company.
- Moves money. That includes payments, refunds, credits, and payroll changes.
- Changes a price, a quote, a contract, or terms.
- Deletes records or files.
- Changes bank details, tax settings, or account permissions.
- Posts anything publicly under the company's name.

**2. The agent can act on its own, with a log, when the action:**

- Stays inside our systems, and
- Can be undone by us in a few minutes, and
- Does not change what a customer sees or pays.

Examples: sorting email, drafting replies, filling in internal spreadsheets, tagging tickets, preparing reports.

**3. No agent approves its own work.** The approver is a named person, or a separate check the agent cannot change.

**4. Every approval shows what will happen.** The person sees the actual email, the actual amount, the actual recipient. Not a summary.

**5. When in doubt, it needs a yes.** New kinds of actions start on the approval list. They come off after we have watched them work.

**6. We review this list every quarter.** Owner: ____________. Last reviewed: ____________.

---

That is the whole thing. It fits on one page because it has to. If your team cannot remember the rule, they will not follow it.

## A few notes on using it

**Start strict and loosen on evidence.** It is easy to remove an approval step after a month of clean runs. It is hard to rebuild trust after an agent emails the wrong price list to your best customer.

**Watch the volume.** If one person is approving fifty items a day, they are not reviewing anymore. They are clicking. Either the gate is in the wrong place or the agent is not good enough yet. Both are worth knowing.

**Check that the vendor can actually enforce it.** WebRun describes policies that block or pause specific actions. NetSuite's coverage tells you to confirm which actions require review in your setup. Ask any vendor the same question: show me where I set this, and show me what happens when the agent hits it.

**Write down who the approver is.** "Someone on the team" is not an approver. A name is.

<!-- SEAN: optional Knox example, e.g. how an approval gate was placed in a real client or internal workflow. Only if real. -->

None of these launches is perfect, and I would test any of them before trusting it with real work. But they agree on where the line goes. That agreement is worth more than any single feature. Copy the line, write it down, and put a name next to it.
