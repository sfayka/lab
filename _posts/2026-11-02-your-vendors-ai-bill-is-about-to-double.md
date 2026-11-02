---
title: "Your Vendor's AI Bill Is About to Double"
date: 2026-11-02
tags: [ai, pricing, vendors, smb, operations, costs]
categories: [essays]
layout: post
published: false
---

On December 1, a specific meter doubles. If a vendor's "AI included" plan sits on that meter, their cost changes on that date whether your invoice does or not.

You will not see the meter. You will see a credit cut, a slower model, a new overage, or a renewal that moved. The useful work happens before that, in a short list of questions your vendor can answer in writing.

## The rate that changes on December 1

Google's [Gemini API pricing page](https://ai.google.dev/gemini-api/docs/pricing) lists Gemini 4 Argon, model id `gemini-4-argon`, as a paid model with no free tier. Standard pricing is $2.00 per million input tokens and $10.00 per million output tokens through November 30, 2026. Starting December 1, 2026, those rates are $4.00 and $20.00. Output includes thinking tokens. The quiet reasoning the model does before it answers is billed at the output rate, and that rate doubles too.

Batch, Flex, and Priority double the same day, each from its own introductory rate:

| Tier | Input, per 1M tokens | Output, per 1M tokens, including thinking |
|---|---|---|
| Standard | $2.00, then $4.00 | $10.00, then $20.00 |
| Batch | $1.00, then $2.00 | $5.00, then $10.00 |
| Flex | $1.00, then $2.00 | $5.00, then $10.00 |
| Priority | $3.60, then $7.20 | $18.00, then $36.00 |

Context caching on those four tiers doubles as well, from $0.10 to $0.20 on Standard, $0.05 to $0.10 on Batch and Flex, and $0.18 to $0.36 on Priority. I read those figures on the pricing page while writing this. If Google edits the page, the page wins.

One more row is easy to miss. The Contributor tier is listed at $1.00 input and $5.00 output, with no December step-up on the page I checked. That flat rate is a snapshot. Read the row your vendor is actually on. Argon is four service prices, plus this one.

This is developer API pricing, the bill a software company pays Google. A chatbot seat and a Yelp subscription are separate invoices. Most owners will never open this page. Their CRM vendor, phone agent, or "AI included" suite might be looking at it already.

<!-- SEAN: re-check https://ai.google.dev/gemini-api/docs/pricing before publish in case Google revises the December 1 figures. Contributor had no dated increase when this was drafted. -->

## The vendor stands between you and the meter

A vendor running a feature on Argon before December 1 has been paying the introductory rate. On that date the rate doubles for Standard, Batch, Flex, and Priority. The vendor then has a short menu.

They can eat the increase for a while. They can cut the credits, minutes, or replies included in your plan. They can move traffic onto a cheaper model and leave the feature name alone. They can add an overage that used to be waived. They can raise the plan at renewal and call it packaging.

Any of those can be a fair business decision. What shows up on the invoice is a plan change or an overage. The token rate stays on Google's page. On your side the symptom is a stingier allowance, a larger renewal, or drafts that need more checking because a cheaper model is now in the path. I wrote about that drift in [The Model Changed Again. Your Ops Didn't.](/posts/the-model-changed-again-your-ops-didnt/). A vendor can make the swap in a config file you never see.

Ask which model the product uses. A phone agent, a CRM, and a lead tool can each be on something else entirely. If the vendor will not name it, price the bundle as if the meter inside it can move, because this one just did.

## Costs have already been rising for a lot of leaders

On October 22, 2026, BSI reported that 71% of U.S. business leaders said the cost of AI had increased compared with 12 months earlier. The [press release](https://www.bsigroup.com/en-US/insights-and-media/media-center/press-releases/2026/october/nearly-seven-in-ten-us-businesses-report-ai-failure-as-investment-rises/) also says 75% expect the cost of using AI to rise further, and 87% still expect their organization to increase AI investment. Respondents are described as U.S. business leaders, including C-suite executives with insight into how their organizations use AI. The release text does not state a sample size. Read 71% as "most of the leaders BSI asked," about their own spend.

That spend is theirs. Your Yelp bill and your CRM bill are separate questions. The useful pattern is that cost pressure is already normal in companies large enough to answer a survey like this, and it reaches a small business through a vendor's plan.

[Agent ROI Is Missing a Line Item](/posts/agent-roi-is-missing-a-line-item/) argues for counting review time on day one. Add a second habit. Count the chance that included usage shrinks. Say the sticker is $40, a number I made up, with a wide allowance. It is a different product when that allowance shrinks, or when a cheaper model makes the drafts worse and review time goes up.

## What to ask, in writing, before the renewal

Send this list. Keep the answers with the contract. A sales call that "covers it" does not survive the person who made the promise leaving.

**1. Which model answers my customers, and on which tier?**

Ask for the model id, the way Google lists `gemini-4-argon`. Ask whether the traffic is Standard, Batch, Flex, Priority, or something else, and whether thinking tokens bill as output. If they use more than one model, ask which job uses which. An internal note and a booked day can sit on different meters.

**2. Is the rate you pay introductory, and on what date does it change?**

December 1, 2026 is a real date for Argon. Your vendor may be on a different model with a different date. Ask whether their cost has an expiration, and whether your plan is shielded from it. "Enterprise pricing" still needs a date.

**3. When your cost moves, what happens to my plan?**

Force a choice: price, included credits or minutes, the model, or the speed. A credit cut at the same sticker price is a price increase per job.

**4. Can I cap it?**

A storm week, a marketing push, or a loop can run a meter you never see. Ask for a cap in units you understand: leads, minutes, messages, or dollars. Ask what the product does at the cap. A hard stop and a quiet overage are different products. If overages are waived today, ask how you will hear before that changes, and keep the answer in the email.

**5. Will you tell me before you change the model?**

Ask for notice before a model change, and ask whether you can stay on the current model long enough to check ten real jobs. Quality drift shows up as extra review. That review time decides whether the tool still pays.

**6. Where do I see usage before the invoice?**

If the only number you get is the monthly charge, you cannot tell a busy month from a pricing change. Ask for the screen that shows units, and look at it once before you need it.

## How I would underwrite the next renewal

Take the current plan price. Ask whether the tool still pays if included usage falls by half, or if review time rises because the model changed. If the answer is no, the current price is a promotional year. Underwrite the renewal at the tighter number.

Argon's December step-up is one dated example, large enough to see from the outside. The pattern is older than that date. Vendors absorb a new model cost while the price is introductory. Then they pass it on, usually without the word "token" appearing anywhere you read. The owners who stay in control are the ones who can name the model, the cap, and the notice period before they click renew.

<!-- SEAN: optional — if a real vendor has already cut credits or swapped models on you, one concrete sentence belongs here. Do not imply any Knox client is on Argon unless you know the model name. BSI sample size was not in the press release text. -->
