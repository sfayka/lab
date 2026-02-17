---
layout: post
title: "I Use Two AI Agents as My Design and Engineering Team — Here's the Workflow"
date: 2026-02-17
categories: [essays]
---

Most AI coding tools can generate a decent UI if you describe what you want. They can also write functional backend code. But ask one tool to do both — design something beautiful *and* wire it into your existing codebase — and the result is mediocre on both fronts.

The better approach: use two specialized tools and build a clean handoff between them. One handles design. The other handles engineering. Neither tries to do the other's job.

The tricky part isn't choosing the tools. It's the handoff — the moment the design leaves one tool and enters the other. Get that wrong and the engineering agent "improves" your design until it's unrecognizable. Get it right and you have two specialized tools working together like they were built for each other.

Here's the exact protocol I use. All of it. No hand-waving.

---

## The Setup

Two tools:

- **[v0.dev](https://v0.dev)** — design. It's trained on beautiful UIs and generates them with a single prompt. 10 minutes of iteration and you have something that looks like a real designer made it.
- **Knox Bot via [OpenClaw](https://openclaw.ai)** — engineering. It takes the finished design and implements it in your actual codebase — wired to your database, integrated with your auth flow, matching your existing architecture.

Neither tries to do the other's job. That's the whole setup.

The rest is the handoff.

---

## The Handoff Protocol

### Step 1: Export v0 to a Reference Repo

v0 gives you a working Next.js app. Push it to GitHub as-is:

```bash
git init
git remote add origin https://github.com/you/project-design.git
git add .
git commit -m "v0 reference design"
git push -u origin main
```

This repo is now the **source of truth** for what the UI should look like. Not a Figma file that drifts. Not screenshots the agent can't reliably access. A working implementation it can clone, read, and reference component by component.

### Step 2: Extract Design Tokens

Pull the exact values from v0's output and write them to `DESIGN-TOKENS.md` at your project root:

```markdown
## Colors
primary: hsl(153, 50%, 32%)      # Forest green
accent: hsl(24, 70%, 55%)        # Terracotta  
neutral-50: hsl(30, 25%, 97%)    # Warm off-white
foreground: hsl(0, 0%, 8%)       # Near-black (never pure #000)

## Typography
heading-font: 'DM Serif Display'
body-font: 'DM Sans'
heading-weight: 700
body-weight: 400

## Spacing
section-padding: 96px
card-padding: 32px
gap-default: 24px
```

Not "forest green." The exact HSL value. Not "large padding." The pixel value.

This matters because the agent will build new features after the initial implementation. When it needs to pick a color for a status badge, a hover state, an error message — it uses the tokens. No guessing, no inventing, no drift.

### Step 3: Give the Agent a Design System

`DESIGN-TOKENS.md` covers *this project*. But you're building more than one thing. Create `DESIGN-SYSTEM.md` at the workspace level (the folder where your agent works across all projects) to capture taste that applies everywhere:

```markdown
## Color Philosophy
Never use pure black (#000) or pure white (#fff).
Pair cool primary colors with warm accents.
Warm palettes need warm grays — add 5–10% saturation from your primary hue.

## Typography
Headings: display or serif (warmth, authority).
Body: clean sans-serif (readability above all else).
Never mix more than two font families.

## Spacing
Use a 4px base scale: 4, 8, 12, 16, 24, 32, 48, 64, 96.
Never use arbitrary values like mt-[13px]. If you're writing that, something's wrong with the scale.
```

This is your house style. The agent applies it to everything it builds, even when there's no reference repo to clone.

### Step 4: Two-Phase Verification

Don't tell the agent to "implement the v0 design." Too vague.

**Phase 1 — Read and confirm:**

> "Clone the reference repo at [URL]. Read through the components and design tokens. Summarize what you see: color palette, typography choices, layout approach, key components. Confirm understanding before writing any code."

Wait for the summary. Check it. If the agent misses something — a font, a color, a layout detail — correct it now, before a single line of code is written.

**Phase 2 — Implement with one critical constraint:**

> "Now implement this design in our app. Match layout, colors, typography, and spacing exactly. If anything looks different from the v0 reference, that's a bug."

That last sentence is the most important part of this entire protocol.

Without it, the agent will improve things. It will "balance" the hero, "optimize" the contrast ratio, "rationalize" the spacing. All reasonable decisions. All wrong. You didn't ask for judgment calls. You asked for faithful implementation.

"That's a bug" removes the agent's latitude to make aesthetic decisions. It's not being mean — it's being precise.

---

## Gotchas I Actually Hit

These aren't hypothetical. Each one cost me at least a round of debugging before I figured out the fix.

### Without "that's a bug," your agent will redesign your site

First time through, I left out the constraint. I told Knox Bot to implement the v0 design and let it run.

It made the hero section "more balanced." It adjusted the primary green to "a more accessible shade." It updated the spacing to "follow proper 8px grid discipline."

Every single change was defensible. Knox Bot could justify each one. And the end result looked nothing like what v0 had produced — the visual cohesion was gone, replaced by a committee of individually reasonable decisions.

I added one line to the prompt: *"If anything looks different from the v0 reference, that's a bug."*

Second implementation: zero drift. Same design, faithfully translated. One sentence changed the entire outcome.

This is the single most important thing I learned building this workflow. Coding agents are trained to make things better. When it comes to design, "better" is the enemy of "consistent." You have to explicitly tell them that faithful reproduction is the goal, not improvement.

### "Use the v0 design" means nothing to your agent

I told Knox Bot to "use the v0 design." Seemed clear to me. It wasn't.

Knox Bot didn't clone the reference repo. It tried to reconstruct what a v0 design might look like based on its training data — and produced something that was approximately, generically wrong. Think "plausible v0 output" instead of "your specific v0 output."

The fix: don't gesture at context. Provide it. "Clone the repo at [this specific URL]. Read the components in [this specific directory]. Use these exact values."

Every piece of context you assume the agent has is a piece of context it will hallucinate instead.

### v0 output is a prototype, not a drop-in

v0 gives you a fresh Next.js app with its own routing, its own component structure, its own conventions. Your actual app has authentication, a database schema, established patterns, existing components.

The first time, I didn't make this distinction clear. Knox Bot tried to import v0's component tree wholesale — bringing in routing conventions that conflicted with ours and component patterns that didn't match the existing codebase.

Be explicit: "Take the *visual design* from v0 — the layout, colors, typography, spacing. Implement it in our codebase using our existing auth, database schema, and routing. Don't copy v0's code structure. Use ours."

The agent's job is translation, not transplant.

### Design tokens prevent taste creep on future features

After implementing this workflow on Travel Together, Knox Bot built a trip member management feature. It needed colors for status indicators — active, pending, removed.

Without tokens, it would've guessed. With tokens, it used `accent` for active states and `neutral-600` for inactive. No prompting required. Consistent by default.

This is the compounding value of the design system: it gets more useful the longer you use it. Every new feature inherits the aesthetic without you having to re-explain it.

---

## The Pattern (Beyond Just v0 + Knox Bot)

This isn't really about v0 and Knox Bot specifically. It's about a structure that works whenever you're combining specialized AI tools:

1. **Use the tool that's actually good at the job** — not the tool that's "good enough." v0 is trained on beautiful UIs. Use it for UIs. Your coding agent is trained on functional code. Use it for code.

2. **Create structured artifacts at the handoff** — reference repo, design tokens, design system. Vibes don't transfer between tools. Documented specs do.

3. **Lock down the second tool's aesthetic latitude** — the "that's a bug" framing. Whatever the first tool produced, the second tool's job is to faithfully express it, not improve it.

The same structure would apply to other tool pairings — Figma for design and Cursor for engineering, a research tool for discovery and a writing tool for synthesis, an image generator for brand visuals and an agent for copy. The specific tools change. The handoff discipline holds.

---

The handoff is the whole game. Get it right once and it compounds — every new feature stays consistent, every new project inherits the aesthetic without effort, and you stop having conversations with your agent about kerning.

---

*Sean builds AI systems and autonomous workflows at Knox Analytics.*
