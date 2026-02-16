---
layout: post
title: "Your AI Agent Can Code. It Can't Design. Here's How I Fixed That."
date: 2026-02-16
categories: [essays]
---

Knox Bot — my OpenClaw coding agent — rebuilt an entire Next.js travel planning app in a few hours.

Authentication worked. Database queries were clean. API routes were fast. Tests passed.

But the UI looked like a developer built it.

Because one did.

It was functional. It just wasn't *good*. You know the difference the moment you see it. Everything is technically correct but visually generic. The spacing is slightly off. The colors don't feel cohesive. The typography hierarchy is flat.

"It works" is not the same as "it feels good to use."

I spent weeks trying to fix this with better prompts. I tried describing visual taste in words. I tried providing reference screenshots. I tried asking the agent to research design trends.

None of it worked.

Here's what finally did: **I stopped asking the agent to design anything**.

---

## The Problem: AI-Generated UI Looks Like Developer UI

Knox Bot can write a performant data aggregation pipeline without breaking a sweat.

But ask it to design a landing page and you get something that looks like a SaaS product from 2015.

Not broken. Just... bland.

The spacing is uniform but uninspired. The colors are inoffensive but forgettable. The layout is sensible but generic.

It's the visual equivalent of writing technically correct prose with zero voice.

And no amount of prompting fixes this.

## Why Prompting Doesn't Fix It

Here's what I tried first:

**1. Abstract direction**

> "Make this look modern and elegant. Use a professional color scheme."

The agent picked generic blues and grays. Everything was slightly rounded. Nothing was wrong. Nothing stood out.

"Modern" to an LLM means "the most common patterns in my training data."

The most common patterns are mediocre.

**2. Web research**

> "Research current design trends. Look at what top SaaS companies are doing."

The agent summarized blog posts about design trends and then... still made the same choices. Because reading about good design doesn't teach taste.

**3. Iterative refinement**

> "The spacing feels too tight. Try increasing it."
> "Actually, now it feels too loose. Go back."
> "The green is too bright. Mute it."
> "Wait, now it looks washed out..."

After 20 rounds of this, I'd improved it from "clearly bad" to "acceptable but forgettable."

That's the ceiling with prompting alone.

You cannot describe visual taste in words. Taste is curation. It's knowing what to leave out, when to break the grid, which subtle detail elevates the whole thing.

LLMs don't have taste. They have pattern matching.

## The Solution: Separate Design from Implementation

Here's what works:

1. **Design in v0.dev** — use it for visual iteration
2. **Push to a reference repo** — the design becomes the spec
3. **Agent implements faithfully** — match the reference exactly
4. **Design system constrains future work** — lock down the aesthetic defaults

v0 generates polished UI. The agent implements complex logic.

Neither does the other's job.

---

## The Workflow in Practice

### Step 1: Design in v0

I gave v0 this prompt:

> "Travel planning app landing page. Warm, inviting, professional. Hero section, features grid, testimonials, CTA."

10 minutes and a few regenerations later, I had a landing page that looked like a real designer made it.

Clean typography hierarchy. Cohesive color palette (forest green, terracotta, warm neutrals). Professional imagery. Proper spacing.

Everything I couldn't get Knox Bot to produce in 50 prompts.

### Step 2: Push to a Reference Repo

v0 gives you a working Next.js app. I pushed it to GitHub:

```bash
git clone https://github.com/sfayka/travel-together-design.git
```

This is now the **source of truth** for what the UI should look like.

### Step 3: Agent Implements

Now Knox Bot's job is simple:

> "Replace our landing page with the v0 design from `travel-together-design`. Match layout, colors, typography, and spacing exactly. Any differences are bugs."

The agent:
- Copied components from the reference
- Matched colors precisely (`hsl(153, 50%, 32%)`, not "forest green")
- Used the same fonts (DM Sans, DM Serif Display)
- Replicated spacing and layout pixel-perfect

Zero aesthetic decisions. Just faithful implementation.

### Step 4: Extract the Design System

Once the landing page was done, I had Knox Bot document the design decisions:

**DESIGN-SYSTEM.md** (workspace-level, applies to all projects):

```markdown
# Knox Analytics Design System

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

**DESIGN-TOKENS.md** (project-level, specific values):

```markdown
# Travel Together Design Tokens

## Colors
primary: hsl(153, 50%, 32%)      # Forest green
accent: hsl(24, 70%, 55%)        # Terracotta
neutral-50: hsl(30, 25%, 97%)    # Warm off-white
...

## Typography
heading-font: 'DM Serif Display'
body-font: 'DM Sans'
```

Now when Knox Bot builds new features, it doesn't invent aesthetics. It has:

- A philosophy to guide choices (workspace-level)
- Specific tokens to implement (project-level)

The agent can't produce ugly output when the defaults are locked down.

## The Design System Layer: Constraints, Not Freedom

Here's the counterintuitive part: **more rules produce better output**.

Most people think AI agents need freedom to be creative.

Wrong.

Unconstrained agents produce generic output because they default to the statistical average.

Constrained agents produce consistent, high-quality output because the defaults are locked down.

The design system is how you constrain aesthetic decisions:

**Workspace-level (DESIGN-SYSTEM.md)**

This is your taste codified. It applies to every project Knox Analytics touches.

```markdown
## Color Philosophy
Never use pure black (#000) or pure white (#fff).
Always use warm neutrals (hsl with 20-40° hue).
Primary colors should feel natural (greens, blues, earth tones).

## Typography
Headings: serif fonts only (warmth, authority).
Body: sans-serif fonts only (readability).
Never use system fonts (Arial, Helvetica) — they signal "unfinished."
```

These aren't specific values. They're guardrails.

**Project-level (DESIGN-TOKENS.md)**

This is the implementation. Specific colors, fonts, spacing values for this project.

```markdown
primary: hsl(153, 50%, 32%)
accent: hsl(24, 70%, 55%)
heading-font: 'DM Serif Display'
body-font: 'DM Sans'
spacing-unit: 0.25rem (4px base)
```

When Knox Bot builds a new feature, it:

1. Checks the design system for philosophy
2. Uses project tokens for implementation
3. Only makes decisions within those constraints

Result: every new feature feels cohesive with the rest of the app.

No invention. Just application.

## What Changed

Before this workflow:

- Every new feature was a design negotiation
- Knox Bot would guess at colors and spacing
- I'd spend hours tweaking prompts to get "acceptable"
- The app looked like 5 different people built it

After:

- Design happens in v0 (10 minutes)
- Implementation happens in code (automated, faithful)
- New features automatically match the existing aesthetic
- "Does it match the reference?" is an objective question

The difference isn't just aesthetic. It's velocity.

I stopped fighting with prompts and started shipping features.

---

## The Bigger Lesson: AI Agents Need Constraints, Not Freedom

The trend in AI tooling right now is toward more autonomy.

Agents that can build entire features end-to-end.

But autonomy without constraints produces mediocre results.

Here's what I've learned:

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

Those are curation problems, not code generation problems.

**More rules = better output.**

An unconstrained agent produces the statistical average.

A constrained agent produces consistent, high-quality work within defined boundaries.

The design system is how you define those boundaries.

**The future isn't one agent that does everything.**

It's specialized agents with clear boundaries, orchestrated together:

- v0 generates visual designs (it's trained on good design)
- Knox Bot implements application logic (it's trained on good code)
- The design system maintains consistency (documented taste)

Each tool does what it's actually good at.

None of them try to do everything.

## The Takeaway

If your AI agent's UI looks like a developer built it (because one did), you have two options:

**Option 1:** Keep writing better prompts and hoping for different results.

**Option 2:** Stop asking the agent to design anything.

I chose option 2.

v0 handles the design. Knox Bot handles the implementation. The design system keeps them aligned.

No more developer UI.

No more prompt negotiation.

Just clean separation of concerns.

---

*Sean builds AI systems and autonomous workflows at Knox Analytics. Knox Bot is employee #2.*
