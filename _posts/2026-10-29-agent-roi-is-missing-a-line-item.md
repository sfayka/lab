---
title: "Agent ROI Is Missing a Line Item"
date: 2026-10-29
tags: [ai, agents, roi, smb, operations, strategy]
categories: [essays]
layout: post
published: false
---

Every agent business case I see has the same shape. Hours the task takes today. Hours the agent will take. Multiply the difference by a loaded wage. Subtract the subscription. Done.

There is a line missing. It is the hours a person spends checking the agent's work.

That line is never zero. In most small businesses it is the biggest number on the page that nobody wrote down.

## Two numbers worth sitting with

Bain published a study this month of [951 companies and 63 enterprise processes](https://www.bain.com/insights/realization-rate-the-metric-reshaping-enterprise-ai/). They call the key measure the realization rate: the share of expected value that actually shows up as deployed, measurable value. For generative AI it came in at roughly 38%. For traditional automation, after two decades of process mapping and integration work, it was 52%.

Read that second number again. The older, boring automation, the kind with clear rules and decades of practice behind it, still only delivers about half of what it promised.

Bain also found that only about 7% of companies run fully autonomous agents in production. Yet, in their words, many investment cases are built on the economics of full autonomy. Their advice is plain: if the business case assumes full automation but production still needs human approval, the expectations should reflect that.

A week later, G2 released its [2026 agents report](https://www.prnewswire.com/news-releases/new-g2-research-ai-agents-have-moved-from-pilot-to-production-but-oversight-comes-at-a-cost-302908654.html). 31% of buyers say employees spend six or more hours a week "bot-sitting," which is G2's term for overseeing agent work. 45% say oversight and rework eat more than a quarter of the productivity gains they expected.

Six hours a week is most of a working day. For a ten-person company, that is a real cost. It just lives on nobody's invoice.

## Why the line goes missing

Nobody leaves it out on purpose. It goes missing for three ordinary reasons.

The demo hides it. A vendor demo runs on clean inputs with a person who already knows the right answer. The checking happens in their head, so it looks free.

The cost is spread thin. Ten minutes here, a re-run there, a Slack message asking "did this actually go out?" None of it feels like a task. All of it adds up.

And the checking is often the work that used to be the job. When an agent drafts the quote, someone still has to know whether the quote is right. That knowledge did not move to the agent. It moved to review.

I wrote earlier about agents that report a task finished when nothing happened, in [Done According to What](/posts/done-according-to-what/). The fix there was verification that does not come from the agent itself. That fix is correct. It also costs time. If you build the check, you should budget for it.

<!-- SEAN: optional short Knox example here, e.g. a workflow where review time turned out larger than planned. Only if real. -->

## Budget review time from day one

Here is what I would ask any owner to do before signing for an agent.

**Write the review step down.** Who checks the output? How do they check it? What do they look at? If you cannot answer, you are not ready to price the project. You are ready to map the workflow.

**Time it during the pilot.** Do not estimate. Have the reviewer log minutes for two weeks. It will be higher at first. That is fine. You want the real curve, not the hopeful one.

**Count rework separately.** Checking is looking. Rework is fixing. Fixing a wrong invoice after it went out costs more than catching it before. Track both.

**Size the case at a realistic realization rate.** If your plan only works at 100% of projected savings, it does not work. Bain's 38% is an average across large companies, not a law. But it is a far better starting assumption than full value. I would want a project to still make sense at somewhere between 40% and 50%.

**Decide what would make you stop.** Pick the number in advance. If review plus rework is still above some threshold after eight weeks, you pause and fix the workflow, or you walk away.

## A simple worked template

The numbers below are made up. They are there to show the arithmetic, not to describe any real business.

**Example: invoice data entry for a small distributor**

| Line | Example value |
|---|---|
| Hours per week on the task today | 12 |
| Loaded hourly cost | $40 |
| Current weekly cost | $480 |
| Vendor's promised time saved | 10 hrs/week |
| "Brochure" weekly savings (10 × $40) | $400 |
| Agent subscription, per week | $75 |
| **Brochure net savings per week** | **$325** |

Now add the missing lines.

| Line | Example value |
|---|---|
| Review time per week (logged in pilot) | 3 hrs |
| Rework time per week | 1 hr |
| Cost of review and rework (4 × $40) | $160 |
| Realistic hours saved after review (10 − 4) | 6 hrs |
| Realized savings (6 × $40) | $240 |
| Agent subscription, per week | $75 |
| **Realistic net savings per week** | **$165** |

In this example, the realized value is 60% of the brochure ($240 of $400). That is better than Bain's average. The net savings still dropped by about half, from $325 to $165 a week.

That might still be a good project. Around $8,500 a year is worth having. But it is a different decision than $17,000 a year, and it changes how much setup cost you can justify.

Now run the bad case. Say review takes six hours and rework takes two. Realized savings fall to $80 a week. Subtract the subscription and you clear $5. That project is not worth the disruption.

The template is five questions:

1. What does the task cost today?
2. What does the vendor say it will save?
3. How many hours of review and rework did the pilot actually log?
4. What is left after you subtract them and the subscription?
5. Does it still make sense at half that?

If you can fill that in with logged numbers, you have a business case. If you can only fill in the first two, you have a sales pitch.

## Review time should shrink, and you should check that it does

One more thing. Review time is not fixed. A good deployment should get cheaper to supervise over time. The team learns what errors look like. The workflow gets cleaner. Some checks can move from a person to a rule.

That is the real value of tracking it. If review hours fall month over month, the agent is earning trust. If they stay flat, something structural is wrong. Usually it is the inputs, the handoffs, or a definition of done that nobody agreed on.

If they rise, stop and look.

Agents can save real time in a small business. I have no doubt about that. But the savings are what is left after the checking. Put that line in the spreadsheet on day one, and you will make better decisions about which agents to keep.

<!-- SEAN: optional closing line pointing to Knox's workflow reality check / ROI review offer. -->
