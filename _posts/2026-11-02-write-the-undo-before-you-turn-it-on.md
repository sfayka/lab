---
title: "Write the Undo Before You Turn It On"
date: 2026-11-02
tags: [ai, agents, operations, reversibility, governance, smb]
categories: [essays]
layout: post
published: false
---

The first question I want answered about an agent is what Tuesday looks like after it does the wrong thing. Who notices. Who fixes it. How long that takes. What the customer already believes.

If that answer is "we will figure it out," the agent is not ready to act. It might be ready to draft. Those are different permissions.

## Two vendor surveys, same direction

Both numbers below come from companies that sell agent software. Use them as a signal, then check your own workflow.

Kore.ai's [Agent Productivity Index](https://www.kore.ai/research/agent-productivity-index-report) surveyed 408 IT and engineering leaders at U.S. companies with 1,001 to 5,000 employees. Every respondent was already running agents in production. The report was commissioned by Kore.ai and fielded by Propeller Insights. The page does not say when the questions were asked. Figures are self-reported.

In that sample, 79% of consequential autonomous actions required a manual reversal. Of those reversals, 93% were described as costly and disruptive. The correction hurt on top of the original mistake. And 70% could tell that a failure had happened in a multi-agent setup and still could not say which agent caused it. Seeing the smoke is a different skill from naming the source.

Nylas, in its [H2 2026 survey of 1,030 U.S. professionals](https://www.nylas.com/blog/pr/ai-agent-mistakes-survey-state-of-agentic-ai-h2-2026/) who build, buy, or influence AI systems, found that 31% had an agent trigger a workflow they had to reverse in the prior 90 days. Another 25% had an agent update the wrong record. Another 18% had an agent send an incorrect or inappropriate email. Nylas sells communications infrastructure, so the same vendor-survey caution applies. Nearly half that sample works in software and SaaS.

A roofing company and a 3,000-person IT department will post different reversal rates. The lesson that travels is simpler. Once agents are allowed to act, reversals show up often, the cleanup is often painful, and a multi-agent setup frequently leaves the team unable to name the source.

<!-- SEAN: the Kore.ai page I checked does not state fieldwork dates. Add them if you have the PDF. -->

## Pick the first job by the cost of the undo

Teams usually pick a first agent by the size of the task. "It takes the office three hours a day, so start there." Hours matter. Sort first by how cheap it is to undo a wrong action on a Tuesday, with the people you actually have.

A draft sitting in a folder is free to undo. Delete it. A CRM field you can edit back, a tag, a calendar hold no customer has seen: cheap. A text the customer already read, a price you published, a day you promised, a card you charged: expensive. The work has left your system and entered someone else's week. A public reply, a deleted record with no backup, or a Thursday the customer already took off work for leaves an apology and a reschedule.

[Where Human Review Actually Belongs](/posts/where-human-review-belongs/) puts the human at that state boundary, the step where a draft becomes a fact a customer can hold you to. [Copy the Approval Line](/posts/copy-the-approval-line/) is the short version several products already use: if you cannot take the step back before anyone outside notices, a person approves it. [Your First AI Agent Should Do One Job](/posts/your-first-ai-should-do-one-job/) keeps the first permission narrow: one trigger, one output, one rollback path.

The first production permission I would give an agent in a small company is preparation. Draft the quote. File the photo. Propose the slot. A person sends, books, or charges. Widen that later, after the undo has been used for real and the undo was boring.

In [Agent ROI Is Missing a Line Item](/posts/agent-roi-is-missing-a-line-item/) the missing line is review time. Reversal time sits on the same page. A project that saves four hours and then spends three of them unwinding one bad send saved one hour. If you cannot estimate the unwind, you cannot price the agent.

## A one-page reversal plan, per action

Write this before the toggle goes on. One action gets one page. Three actions, three pages. If the page spills, the action is too muddy to hand over.

The rows below are the template. Fill them in your own words, in the system you actually use.

| Row | What to write |
|---|---|
| Action | The one thing the agent is allowed to do. "Create a draft quote." "Send the appointment text." |
| What changes | The record, message, calendar, payment, or promise that will be different afterward. |
| Who can trigger it | Which agent, which mailbox, which person can turn this permission on. |
| How you notice | The log line, inbox, or report that shows it happened without asking the agent. Name the screen. |
| How you undo it | The clicks, in order, in that system. If the undo is "call the customer," write the sentence you will use. |
| Who does the undo | A person's name or role. "The office" is not a name. |
| How long it takes | Minutes for a clean case. Say what makes it longer. |
| What will not undo | The part the customer already saw, the charge that already settled, the slot they already planned around. |
| Stop rule | If a bad run costs more than this much time or money, this action goes back to a person. |

Then attach one sentence on evidence. [Done According to What](/posts/done-according-to-what/) is the standard. The agent's own status is a claim. The calendar event is either gone or still on the board. The draft is either deleted or still in the folder.

Here is the template filled in for a fictional shop. The company, the tool, and the numbers are made up. They are here so the rows have a shape.

**Example: "Hold a Thursday slot" at a four-truck plumbing company**

| Row | Example |
|---|---|
| Action | Agent may place an unconfirmed hold on the shop calendar. It may not text the customer. |
| What changes | A hold labeled HOLD — unconfirmed on the shared shop calendar, with the caller's name and address in the notes. |
| Who can trigger it | The after-hours assistant, using the scheduling@ mailbox. |
| How you notice | The hold appears on tomorrow's dispatch board before 7:30am. The call recording is attached to the job draft. |
| How you undo it | Dispatcher deletes the hold. If the customer was not texted, no customer contact is required. |
| Who does the undo | The morning dispatcher. Backup: the owner. |
| How long it takes | Two minutes if nobody has been told. Half a day if a text already went out and the customer arranged to be home. |
| What will not undo | Any text, email, or Yelp reply that already names a day. That becomes a phone call. |
| Stop rule | If the agent texts a day without a human, turn off send and keep drafts only. Review that week before switching send back on. |

The useful line in that example is the split between the hold and the text. The hold is a cheap undo. The text is an expensive one. Vendors often package them as one feature. Give the agent the hold. Keep the text until the hold has been boring for a few weeks.

<!-- SEAN: optional — replace the fictional plumbing example with a real workflow if you have one you can describe accurately. Do not invent a client. -->

## What I would do this week

List the actions an agent is already allowed to take in your business. Include the "helpful" ones a vendor turned on during setup. For each action, mark it free, cheap, expensive, or no undo.

Anything marked expensive or no undo goes back to draft-only until the one-page plan exists and a person has walked the undo once, on purpose, in the real system. A plan nobody has rehearsed is a paragraph.

If you cannot name who does the undo, the agent does not get the action. That is the whole policy. Intelligence can wait. The undo cannot.
