---
layout: post
title: "I Asked My AI Agent What We Should Build Next. Here's What Happened."
date: 2026-02-23
categories: [essays]
published: false
---

We kept building the wrong things. Not broken things — impressive things. Cool demos, fast prototypes, features that looked great in a thread and did basically nothing for the business.

That's the trap with AI right now. The hard part usually isn't building. It's deciding what actually deserves to be built.

So we tried something different and asked the agent what we should build next.

---

## The problem

When you're a small team, every build is a bet. One miss can burn a month, two can burn a quarter, and you can still feel productive the whole time because the velocity looks good on paper.

Our default playbook wasn't giving us enough signal:

- Market research was slow and expensive.
- X was noisy and optimized for whatever was hot this week.
- Customer calls were useful, but mostly surfaced problems people already knew they had.
- Competitor analysis assumes you already know who to benchmark against.

We needed broader signal, faster — and something better than gut feel plus vibes.

---

## The approach

We gave the agent a very specific brief:

> "Survey the current AI tools landscape for small businesses and agencies. Focus on: what tools exist, what problems they claim to solve, what the most common complaints are in reviews and forums, and where there are obvious gaps between what users need and what's currently available. Prioritize Reddit, HN, G2, and Capterra. Return a structured gap analysis."

Then we let it do a multi-step run: search, read, cluster complaints, and synthesize themes.

Not a one-shot "tell me the answer" prompt. More like assigning a very fast junior analyst that doesn't get tired after 30 tabs.

The output came back cleaner than I expected.

---

## What came back

The report organized everything into three buckets: **saturated**, **emerging**, and **underserved**.

**Saturated** was exactly what you'd expect: AI writing tools, chatbot builders, meeting summarizers. Crowded categories, low edge, hard to stand out unless you have a wedge.

**Emerging** included AI-native CRM, field-service ops tooling, and agent-to-agent workflow products. Interesting spaces, but still a lot of "looks good in demo" products where real-world reliability isn't there yet.

**Underserved** was where things got useful:

1. **Integration as the product.** Not another wrapper — actual connective tissue across ugly real stacks (Sheets + legacy CRM + random inbox workflows).
2. **Explainability for non-technical operators.** Owners trusted outputs, but couldn't defend decisions to stakeholders.
3. **Intake-layer tooling.** Proposal generation, scoping, and onboarding had obvious pain and thin tooling.

That was the first section that felt like real build guidance instead of market commentary.

---

## Signal vs. noise

Honest read: about 60% of the report was obvious in hindsight. "Writing tools are crowded" isn't exactly a moonshot insight.

But even the obvious part helped because it turned hand-wavy assumptions into structured evidence, which made decision conversations much less fuzzy.

The other 40% was the value. Not because the information was hidden, but because we weren't naturally looking there.

Field-service ops is a good example. We already suspected the category was messy, but we hadn't seen how consistent the complaints were across forums and reviews. Different people, different contexts, same friction pattern.

When that happens repeatedly, it's usually not noise. It's the market telling you where systems are still broken.

---

## The meta point

Yes, we used AI to decide what AI to build. Slightly ridiculous. Also practical.

If you're building AI products and not applying them to your own prioritization decisions, you're skipping one of the best feedback loops you have.

That said, this only worked because the agent had context from real client work. Without that, you'll still get polished output, but it can drift into generic advice quickly.

The report didn't hand us a roadmap. It gave us a better set of questions, and that was enough to choose the next build with more confidence.


That's the loop.
