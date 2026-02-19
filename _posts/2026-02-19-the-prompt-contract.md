---
layout: post
title: "The Prompt Contract: How I Stopped My Agent From Freelancing My UI"
date: 2026-02-19
categories: [essays]
published: false
---

Most people talk about prompting like it's copywriting.

Be clearer. Add context. Ask nicely. Iterate.

That works right up until your agent decides to "improve" your design and quietly ships a different product than the one you asked for.

I learned this the expensive way.

In one sprint, I got a clean v0 reference, good code quality, and passing tests — and still ended up with visual drift everywhere. Font weights changed. Spacing got rationalized. Colors got "close enough." Nothing was broken in isolation. The product just didn't feel like the design anymore.

The fix wasn't a better adjective. It was a contract.

Not legal contract. Prompt contract.

A specific sequence with specific failure conditions:

1. Read first.
2. Summarize before coding.
3. Implement exactly.
4. Treat drift as a bug.

Once I switched to that framing, quality stopped depending on luck.

---

## Outline

### 1) Why "good prompts" still fail
- The hidden problem: agents optimize for plausibility, not fidelity
- Why vague quality words ("modern," "clean," "polished") create drift
- The compounding cost of small visual deviations

### 2) Prompting as a contract, not a conversation
- Define acceptance criteria upfront
- Separate authority: design decisions vs implementation decisions
- Add explicit non-goals ("do not reinterpret")

### 3) The 4-step Prompt Contract I use
- Step 1: Read + inventory source-of-truth artifacts
- Step 2: Summarize understanding and wait for confirmation
- Step 3: Implement with deterministic constraints
- Step 4: Verify against checklist and classify mismatches as bugs

### 4) Contract clauses that changed outcomes
- "Any differences are bugs"
- "Max two repair attempts before escalation"
- "No silent substitutions of tokens/components"
- "Show exact changed files and rationale"

### 5) Before/after from real projects
- What changed in output quality
- What changed in revision count
- Where this still fails

### 6) Reusable template
- A copy/paste Prompt Contract block
- How to tune strictness by project type

### 7) Closing point
- Prompting quality is governance, not poetry
