---
layout: post
title: "I Use Two AI Agents as My Design and Engineering Team — Here's the Workflow"
date: 2026-02-17
categories: [essays]
---

If you read my last post, you know the setup: stop asking your coding agent to design anything. Use v0 for design, an autonomous agent for engineering, and keep them separated.

But knowing *what* to do is easy. The hard part is the *how*.

Specifically: the handoff. The moment the design leaves v0 and enters your codebase. Get it wrong and your agent will "improve" the design until it's unrecognizable. Get it right and you have two AI tools working together like they were built for each other.

I've shipped this workflow twice now. Here's exactly what I do — the artifacts, the prompts, the order, and the gotchas I hit the hard way.

---

## The Handoff Protocol: All of It, No Hand-Waving

### Step 1: Export v0 to a Reference Repo

v0 gives you a working Next.js app. Push it to GitHub as-is:

```bash
git init
git remote add origin https://github.com/you/project-design.git
git add .
git commit -m "v0 reference design"
git push -u origin main
```

This repo becomes the **source of truth**. Not a Figma file. Not screenshots. Not "match the vibe of the thing I showed you." A real, working implementation the agent can clone, read, and reference component by component.

This step matters more than it sounds. More on that in the gotchas.

### Step 2: Extract Design Tokens

Pull the exact values from v0's output and write them to `DESIGN-TOKENS.md` at your project root:

```markdown
## Colors
primary: hsl(153, 50%, 32%)      # Forest green
accent: hsl(24, 70%, 55%)        # Terracotta  
neutral-50: hsl(30, 25%, 97%)    # Warm off-white
foreground: hsl(0, 0%, 8%)       # Near-black

## Typography
heading-font: 'DM Serif Display'
body-font: 'DM Sans'

## Spacing
section-padding: 96px
card-padding: 32px
gap-default: 24px
```

Not "forest green." The exact HSL value. Not "large padding." The pixel number.

Why? Because your agent will build new features long after the initial implementation. When it needs to pick a color for a status badge or a hover state three weeks from now, it uses the tokens. No guessing. No "I'll use something in the green family." No drift.

The design system pays for itself the first time you add a new feature and it matches the rest of the app without you asking.

### Step 3: Document Your House Style

Tokens cover *this project*. But you're building more than one thing (hopefully).

Create `DESIGN-SYSTEM.md` at your workspace level — the folder where your agent works across all your projects. This is taste, codified:

```markdown
## Color Philosophy
Never use pure black (#000) or pure white (#fff).
Pair cool primary colors with warm accents.
Primary needs three shades: light (badges), base (buttons), dark (hover).

## Typography  
Headings: display or serif. Body: clean sans-serif. Never more than two families.

## Spacing
4px base scale: 4, 8, 12, 16, 24, 32, 48, 64, 96.
If you're writing mt-[13px], something is wrong with the scale.
```

Your agent reads this before touching any new project. It doesn't invent aesthetics from scratch. It applies your house rules.

Once this exists, you stop having the "make it look more professional" conversation entirely. (That conversation never ended well anyway.)

### Step 4: Two-Phase Verification — This Part Is Critical

Don't just hand the agent the repo URL and say "implement this." That's too vague, and you'll pay for it.

**Phase 1 — read and confirm:**

> "Clone the reference repo at [URL]. Read through the components and design tokens. Summarize what you see: color palette, typography choices, layout approach, key components. Confirm your understanding before writing any code."

Wait for the summary. Actually read it. If the agent misses something — a font, a color, a layout detail — correct it now. Before a single line of code is written.

This sounds slow. It saves you a full revision cycle.

**Phase 2 — implement with one critical constraint:**

> "Now implement this design in our app. Match layout, colors, typography, and spacing exactly. If anything looks different from the v0 reference, that's a bug."

That last sentence is the most important line in this entire post.

Without it, the agent will *improve* things. It will "balance" the hero section. It will "optimize" the contrast ratio. It will "rationalize" the spacing to follow an 8px grid. All reasonable decisions. All wrong.

"That's a bug" removes the agent's latitude to make aesthetic judgment calls. You're not being mean. You're being precise. Framing matters.

---

## The Gotchas I Hit the Hard Way

### Agents follow instructions literally (which is actually correct behavior)

First time I ran this workflow, I told Knox Bot to "use the v0 design." It didn't clone the repo. It tried to reconstruct what v0 outputs look like from training data — and got it approximately wrong.

I had to say: "Clone the repo at [exact URL]."

Don't assume context the agent doesn't have. Spell it out. Every step.

### Without "that's a bug," drift is guaranteed

I didn't include the constraint on my first attempt. Knox Bot made the hero "more balanced," adjusted the green to "a more accessible shade," and updated the spacing to "follow 8px grid discipline."

All defensible. All destroyed the cohesion.

Added the line. Second implementation: zero drift.

One sentence. Completely different outcome.

### v0 output is a prototype, not a drop-in

v0 gives you a standalone Next.js app. Your app already has authentication, a database schema, existing routing conventions, and components built over the last three months.

The agent's job isn't to copy v0's code structure. It's to take the *visual design* from v0 and express it in your existing stack.

Be explicit about this:

> "Take the visual design from v0. Implement it in our codebase using our existing auth, database, and routing. Don't copy v0's architecture — just the visuals."

Otherwise the agent will try to reconcile two completely different app structures and make a mess of both.

### The design system gets more valuable over time

Three weeks after the initial implementation, Knox Bot built a trip member management feature from scratch. It needed colors for status indicators — active, pending, removed.

Without tokens, it would have guessed. With tokens, it used `accent` for active states and `neutral-600` for inactive. Consistent, automatically, without asking.

That's the compounding return on this setup. The longer you run it, the less you have to think about consistency.

---

## Why This Generalizes

This isn't really about v0 and Knox Bot. Those are just the tools I'm using today.

The pattern is: **specialized tools, structured handoffs, constrained execution**.

1. Use the tool that's *actually good at the job* — not the one that can do it acceptably
2. Create real artifacts at the handoff (reference repo, tokens, design system) — vibes don't transfer between tools; specs do
3. Lock down the second tool's latitude — the "that's a bug" framing prevents the second tool from undoing the first tool's work

Tomorrow it might be Figma and Cursor. Perplexity for research and Claude for synthesis. Midjourney for brand visuals and an agent for copy. The tools change. The structure doesn't.

Most people try to get one AI to do everything because it's simpler. It's also how you end up with mediocre output across the board. Specialist tools with clean handoffs just produce better work — same as it's always been, honestly.

---

The handoff is the whole game. Get it right once and everything compounds: new features stay consistent, new projects inherit the aesthetic, and you stop having opinions about kerning.

---

*Sean builds AI systems and autonomous workflows at Knox Analytics.*
