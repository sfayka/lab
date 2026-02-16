---
layout: post
title: "I Use Two AI Agents as My Design and Engineering Team — Here's the Workflow"
date: 2026-02-17
categories: [essays]
---

I rebuilt a travel planning app with two AI agents: one for design, one for engineering.

Not because I wanted to experiment with multi-agent workflows. Because asking one AI to do both produced mediocre results.

Most people try to get a single AI coding agent to design *and* build. That's a mistake. Design and engineering are different skills, even for AI. When you ask Claude or GPT to "make it look professional," you get technically correct code with generic, uninspired UI.

Here's what actually works: Use [v0.dev](https://v0.dev) as your designer and an autonomous coding agent (I use Knox Bot via [OpenClaw](https://openclaw.ai)) as your engineer. But the magic isn't in the tools—it's in the handoff between them.

---

## The Problem: "I'll Know It When I See It" Isn't a Spec

I'm not a designer. I know good UI when I see it, but I can't describe it in words.

When I asked Knox Bot to "make the landing page look modern and professional," it gave me this:

- Generic blues and grays
- Slightly rounded corners (because that's "modern")
- Uniform spacing
- Sensible but forgettable layout

Nothing was *wrong*. It just looked like every other developer-built SaaS site from 2015.

I tried iterating:

> "Make it warmer."  
> "More like Airbnb."  
> "Bigger hero."  
> "Actually, smaller hero."

After 20 rounds, I'd nudged it from "clearly bad" to "acceptable but bland."

That's the ceiling when you ask a coding agent to design. It doesn't have taste. It has pattern matching. And the pattern it's matching is "the average UI in GitHub repos."

---

## The Solution: Specialized Tools for Specialized Jobs

Here's what works:

**v0.dev handles design.** It's trained on beautiful UIs, so it generates them in one shot. You iterate conversationally: "warmer colors," "bigger hero," "more like Stripe's pricing page." Within 10 minutes, you have something that looks like a real designer made it.

**Knox Bot handles engineering.** It takes the finished design and implements it faithfully in your actual codebase. Not a standalone prototype—the real thing, wired up to your database, integrated with your auth flow, matching your existing architecture.

Neither tries to do the other's job.

The trick is the handoff.

---

## The Handoff Protocol: The Part That Actually Matters

This is where most people screw it up. They get a nice design from v0, then ask their coding agent to "implement something like this," and watch the design drift as the agent "improves" things.

Here's what works:

### Step 1: Export v0 to a Reference Repo

v0 gives you a working Next.js app. Push it to GitHub as-is:

```bash
git clone https://v0.dev/chat/xyz/code
cd travel-together-design
git remote add origin https://github.com/you/travel-together-design.git
git push -u origin main
```

This repo is now the **source of truth** for what the UI should look like. Not a Figma file that drifts. Not screenshots. A working implementation.

### Step 2: Create Design Tokens

Pull the exact values from v0's output and document them in `DESIGN-TOKENS.md`:

```markdown
## Colors
primary: hsl(153, 50%, 32%)      # Forest green
accent: hsl(24, 70%, 55%)        # Terracotta  
neutral-50: hsl(30, 25%, 97%)    # Warm off-white

## Typography
heading-font: 'DM Serif Display'
body-font: 'DM Sans'

## Spacing
section-padding: 96px
card-padding: 32px
gap-default: 24px
```

Not "forest green"—the exact HSL value. Not "large padding"—the pixel value.

Why? Because this prevents the agent from making taste decisions later. When it builds a new feature, it doesn't pick colors. It uses the tokens.

### Step 3: Give the Agent Taste Constraints

Create `DESIGN-SYSTEM.md` in your workspace (the folder where the agent works on all your projects). This is taste codified:

```markdown
## Color Philosophy
Never use pure black (#000) or pure white (#fff).
Primary colors should feel natural (greens, blues, earth tones).
Always pair cool primary with warm accent.

## Typography
Headings: serif fonts only (warmth, authority).
Body: sans-serif fonts only (readability).
Never use system fonts (Arial, Helvetica)—they signal "unfinished."
```

These aren't project-specific values. They're your house style. The agent applies them to everything it builds for you.

### Step 4: Two-Phase Verification (This Is Critical)

Don't just tell the agent to "implement the v0 design." That's too vague.

Instead, use a two-phase approach:

**Phase 1 — Read and confirm:**

> "Clone the v0 reference repo at [URL]. Read through the components and design tokens. Summarize what you see: color palette, typography, layout approach, key components. Confirm you understand the design before writing any code."

Wait for the agent to respond. It will summarize what it sees. Check that summary. If it misses something, correct it now.

**Phase 2 — Implement with a key constraint:**

> "Now implement this design in our app. Match layout, colors, typography, and spacing exactly. **If anything looks different from the v0 reference, that's a bug.**"

That last line is critical. It reframes aesthetic differences as bugs, not "improvements" or "style choices."

Without that line, the agent will drift. It will "improve" spacing, "optimize" color contrast, "simplify" layouts. Those aren't improvements. They're drift.

---

## Real-World Gotchas I Actually Hit

### 1. Agents follow instructions literally

I told Knox Bot to "use the v0 design." It didn't clone the repo. It tried to remember what v0 designs look like from training data.

I had to say: "Clone the repo at [URL]."

Don't assume. Be explicit.

### 2. The "that's a bug" line prevents drift

First time I did this, I didn't include "if it's different, that's a bug."

Knox Bot made the hero section "more balanced," changed the green to "a more accessible shade," and adjusted spacing to "follow 8px grid discipline."

All reasonable. All destroyed the cohesion.

Second time, I added the line. Zero drift.

### 3. Design tokens prevent taste creep

When the agent built a new feature (trip member management), it needed to pick colors for status indicators.

Without tokens, it would've guessed. With tokens, it used `accent` for active states and `neutral-600` for inactive. Consistent without asking.

### 4. v0 produces standalone components

v0's output is a fresh Next.js app. Your app already has auth, a database, routing conventions.

The agent's job isn't copy-pasting v0's code. It's *adapting* the design to your existing stack.

Be clear: "Take the visual design from v0, implement it in our codebase with our existing auth, DB schema, and routing."

---

## Why This Generalizes

This isn't just "the v0 + OpenClaw workflow."

It's a pattern: **use the best specialized tool for each job, then build a structured bridge between them.**

Today it's v0 for design and Knox Bot for engineering. Tomorrow it might be:

- Figma for design + Cursor for engineering  
- Midjourney for brand visuals + Claude for copywriting  
- Perplexity for research + GPT for synthesis

The pattern stays the same:

1. Use the tool that's *actually good* at the job (not the tool that's "good enough")
2. Create a structured handoff (reference artifacts, not vibes)
3. Give the second tool constraints that prevent it from undoing the first tool's work

Most people use one AI tool for everything because it's simpler. It's also mediocre.

Specialized tools + structured handoffs = better results.

---

## What Changed for Me

Before this workflow:

- Spent hours writing design prompts that never quite worked
- Got "acceptable but bland" UI after 20+ iterations  
- Every new feature was a design negotiation with the agent
- The app looked like three different people built it

After:

- Design in v0: 10 minutes
- Implementation: automated and faithful
- New features automatically match existing aesthetic  
- "Does it match the reference?" is a yes/no question

The difference isn't just aesthetic. It's velocity.

I stopped arguing with AI about kerning and started shipping features.

---

## The Takeaway

Don't ask one AI to be both designer and engineer.

Use v0 for design. Use an autonomous agent for engineering. Build a structured handoff between them.

The handoff is the hard part:

- Reference repo (source of truth)  
- Design tokens (exact values)
- Design system (taste constraints)  
- Two-phase verification (read, then build)  
- "That's a bug" instruction (prevents drift)

Get that right, and you have a design + engineering team that actually works together.

Miss it, and you have two tools producing inconsistent output.

---

*Sean builds AI systems and autonomous workflows at Knox Analytics.*
