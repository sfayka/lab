---
layout: post
title: "RLS Broke My App (Twice): The Supabase Authorization Pattern I Actually Trust"
date: 2026-02-20
categories: [essays]
published: false
---

I didn't get burned by some exotic zero-day.

I got burned by "mostly works."

Twice.

The app looked fine. Auth worked. Queries worked. Tests looked okay.

Then real workflows hit real policies.

First failure: circular RLS logic between `trips` and `trip_members`.
Second failure: authorization logic spread across app code and database rules, with a service-role shortcut papering over both.

Classic founder move: ship pressure meets subtle policy complexity.

I told myself we'd clean it up later.

Later arrived as production risk.

What finally fixed it was not one magic query. It was a pattern:
- user-session server actions by default,
- SECURITY DEFINER helper functions for policy checks,
- explicit ownership/member/admin semantics in one place,
- and no service-role usage outside truly dev-only tooling.

This post is the cleanup I wish I'd had before the first migration.

---

## Outline

### 1) Failure #1: circular policy recursion
- How trips ↔ members checks created recursion risk
- Why "it passes locally" was misleading
- Symptoms in real usage

### 2) Failure #2: split-brain authorization
- App-level checks saying one thing, RLS saying another
- Why service-role usage felt convenient and became dangerous
- The cost: hidden privilege creep

### 3) The pattern that fixed it
- SECURITY DEFINER helpers (`is_trip_owner`, `is_trip_member`, etc.)
- Policy design per table (read/write/delete semantics)
- User-session server actions as the default

### 4) Data-shape gotchas
- Why `auth.users` refs don't auto-join to `profiles`
- Bulk profile fetch with `.in('id', profileIds)`
- Avoiding N+1 and avoiding fake joins

### 5) What still uses service role (and why)
- Dev-only seed endpoint
- Clear guardrails (`NODE_ENV` + isolated route)

### 6) Migration checklist
- How to audit an existing Supabase app for auth drift
- What to test before and after policy changes

### 7) Closing point
- Authorization isn't feature code. It's infrastructure.
