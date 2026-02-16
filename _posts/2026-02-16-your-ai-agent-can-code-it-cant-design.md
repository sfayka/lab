---
layout: post
title: "Your AI Agent Can Code. It Can't Design. Here's How I Fixed That."
date: 2026-02-16
categories: [essays]
---

Knox Bot — my OpenClaw coding agent — rebuilt an entire Next.js travel planning app in a few hours.

Authentication worked. Database queries were clean. API routes were fast. Tests passed.

But the UI looked like a developer built it. Because one did.

It was functional. It just wasn't *good*. You know the difference the moment you see it. Everything technically correct but visually generic. The spacing slightly off. The colors don't feel cohesive. The typography hierarchy flat.

"It works" is not the same as "it feels good to use."

I spent hours trying to fix this with better prompts. I tried describing visual taste in words. I tried providing reference screenshots. I tried asking the agent to research design trends.

None of it worked.

Here's what finally did: **I stopped asking the agent to design anything**.

---

## The Problem: AI-Generated UI Looks Like Developer UI

Knox Bot can write a performant data aggregation pipeline without breaking a sweat, well, maybe more like a data aggregation pipeline that works after some iteration and testing. Want to be honest here, it's not quite at the 1-shot level yet. Sonnet and Opus are amazing models, but we aren't at that point yet (I think we will be there this year, btw, 2026 is the year to get your AI skills ready for the future). 

But ask it to design a landing page and you get something that looks like a SaaS product from 2015 (or Geocities, iykyk)!

Not broken. Just... bland. The spacing is uniform but uninspired. The colors are inoffensive but forgettable. The layout is sensible but generic. It's the visual equivalent of writing technically correct prose with zero voice. And no amount of prompting fixes this.

## Why Prompting Doesn't Fix It

Here's what I tried first:

**1. Abstract direction**

> "Make this look modern and elegant. Use a professional color scheme."

The agent picked generic blues and grays. Everything was slightly rounded. Nothing was wrong. Nothing stood out.

"Modern" to an LLM means "the most common patterns in my training data." The problem is, most common patterns are mediocre, at best. 

**2. Web research**

> "Research current design trends. Look at what top SaaS companies are doing."

The agent summarized blog posts about design trends and then... still made the same choices. Because reading about good design doesn't teach taste. As we were taught as children, beauty is in the eyes of the beholder, and art is hyper subjective. 

**3. Iterative refinement**

> "The spacing feels too tight. Try increasing it."
> "Actually, now it feels too loose. Go back."
> "The green is too bright. Mute it."
> "Wait, now it looks washed out..."

After numerous rounds of this, I'd improved it from "clearly bad" to "slightly less terrible."

That's the ceiling with prompting alone. You cannot describe visual taste in words. Taste is curation. It's knowing what to leave out, when to break the grid, which subtle detail elevates the whole thing. LLMs don't have taste. They have pattern matching. They have training data from GitHub. 

## The Solution: Separate Design from Implementation

Here's what works:

1. **Design in v0.dev** — use it for visual iteration (because v0 is trained on beautiful UIs, it generates them with a 1-shot prompt)
2. **Push to a reference repo** — the design becomes the spec
3. **Agent implements faithfully** — match the reference exactly (if anything deviates that's a bug)
4. **Design system constrains future work** — lock down the aesthetic defaults

v0 generates polished UI. The agent implements complex logic like implementing and then tying that implementation into the existing structure (end-points, buttons, links, etc.)

Neither does the other's job.

---

## The Workflow in Practice

### Step 1: Design in v0

I gave v0 this prompt:

> "Travel planning app landing page. Warm, inviting, professional. Hero section, features grid, testimonials, CTA."

~10 minutes and a few regenerations later, I had a landing page that looked like a real designer made it. It followed what v0 considers best practice, scrolling was smooth, images and text looked fantastic. 

Clean typography hierarchy. Cohesive color palette (forest green, terracotta, warm neutrals). Professional imagery. Proper spacing.

Everything I couldn't get Knox Bot to produce in 50 prompts!

### Step 2: Push to a Reference Repo

v0 gives you a working Next.js app. I pushed it to GitHub (you could use any version control, really).

This becomes the **source of truth** for what the UI should look like. Not a mood board, not a Figma file that drifts out of sync—a working implementation.

### Step 3: Agent Implements

Now Knox Bot's job is dead simple:

> "Clone the reference repo and read through the components. Summarize what you see—color palette, typography, layout approach. Confirm you understand the design before writing any code."

I wait for the summary. If it misses something, I correct it now.

Then:

> "Now replace our landing page with this design. Match layout, colors, typography, and spacing exactly. Any differences are bugs."

This two-phase approach (read and confirm, then implement) prevents the agent from misinterpreting the design or filling gaps with its own assumptions.

The agent:
- Copied components from the reference
- Matched colors precisely (`hsl(153, 50%, 32%)`, not "forest green" or "greenish")
- Used the exact same fonts (DM Sans, DM Serif Display)
- Replicated spacing and layout pixel-perfect

Zero aesthetic decisions. Just faithful implementation. And when there were discrepancies? I called them bugs, not "style preferences." Framing matters.

### Step 4: Extract the Design System

Once the landing page was done, I had Knox Bot document the design decisions. This is where the magic happens—you're basically teaching the agent what "good" looks like for your specific project.

**DESIGN-SYSTEM.md** (workspace-level, applies to all Knox Analytics projects):

```markdown
# Design System

## Color Philosophy
- Primary: Bold, natural tones (forest green, deep blue)
- Accent: Warm, inviting (terracotta, amber)
- Neutrals: Warm grays, never pure black/white

## Typography Scale
- xs: 0.75rem (12px)
- sm: 0.875rem (14px)
- base: 1rem (16px)
- lg: 1.125rem (18px)
- xl: 1.25rem (20px)
...
```

**DESIGN-TOKENS.md** (project-level, specific values for this particular app):

```markdown
## Colors
primary: hsl(153, 50%, 32%)      # Forest green
accent: hsl(24, 70%, 55%)        # Terracotta
neutral-50: hsl(30, 25%, 97%)    # Warm off-white
...

## Typography
heading-font: 'DM Serif Display'
body-font: 'DM Sans'
```

Now when Knox Bot builds new features, it doesn't invent aesthetics. It has a philosophy to guide choices (workspace-level) and specific tokens to implement (project-level).

The agent literally can't produce ugly output when the defaults are locked down. It's like putting bumpers on a bowling lane.

## The Design System Layer: Constraints, Not Freedom

Here's the counterintuitive part: **more rules produce better output**.

Most people think AI agents need freedom to be creative. Wrong. Dead wrong.

Unconstrained agents produce generic output because they default to the statistical average. It's just math, people. Probability. The model has seen a million medium-quality UIs and three really good ones. Guess which one it's going to output?

Constrained agents produce consistent, high-quality output because the defaults are locked down. You're not giving the agent freedom—you're giving it guardrails.

The two-file system from Step 4 does this: workspace-level philosophy (never use pure black, always pair cool primary with warm accent) guides all projects, while project-level tokens (exact HSL values, specific fonts) lock in the implementation.

When Knox Bot builds a new feature, it checks the design system for philosophy, uses the project tokens for implementation, and only makes decisions within those constraints. Every new feature feels cohesive. No invention. Just faithful application of established rules.

## What Changed

Before this workflow:

- Every new feature was a design negotiation (exhausting)
- Knox Bot would guess at colors and spacing (badly)
- I'd spend hours tweaking prompts to get "acceptable" (never great)
- The app looked like 5 different people built it (because effectively, it was)

After:

- Design happens in v0 (~10 minutes, done)
- Implementation happens in code (automated, faithful, fast)
- New features automatically match the existing aesthetic (no thinking required)
- "Does it match the reference?" is an objective yes/no question (finally!)

The difference isn't just aesthetic. It's velocity. I stopped fighting with prompts and started shipping features.

Turns out, when you stop asking your agent to do things it's bad at, you get more done. Who knew?

---

## The Bigger Lesson: AI Agents Need Constraints, Not Freedom

The trend in AI tooling right now is toward more autonomy. Agents that can build entire features end-to-end, start to finish.

But here's the thing: autonomy without constraints produces mediocre results.

Here's what I've learned building with Knox Bot:

**Good AI agents are specialists, not generalists.**

Knox Bot should:
- Implement complex application logic
- Write tests
- Handle edge cases
- Refactor for performance
- Integrate APIs

Knox Bot should not:
- Design user interfaces
- Choose color palettes
- Create visual hierarchy
- Decide on typography

Those last ones? Those are curation problems, not code generation problems. And LLMs are terrible curators.

**More rules = better output.**

Unconstrained agent → statistical average → mediocre.

Constrained agent → defined boundaries → consistent quality.

The design system is how you define those boundaries. Simple as that.

**The future isn't one agent that does everything.**

It's specialized agents with clear boundaries, orchestrated together:

- v0 generates visual designs (trained on beautiful UIs)
- Knox Bot implements application logic (trained on functional code)
- The design system maintains consistency (your taste, documented)

Each tool does what it's actually good at. None of them try to do everything. It's the Unix philosophy but for AI agents.

---

If your AI agent's UI looks like a developer built it (because one did), stop asking it to design. Use v0 for design, your agent for implementation, and a design system to keep them aligned.

---

*Sean builds AI systems and autonomous workflows at Knox Analytics. Knox Bot is employee #2.*
