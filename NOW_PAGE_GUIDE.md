# Now Page Guide

How to update your "Now" page - what you're currently focused on.

## Quick Start

Just edit `now.md` - it's a simple Markdown file!

## File Location

```
now.md
```

## Structure

The Now page has two sections:

1. **Current focus** - What you're working on right now
2. **Essays connected to this** - Automatically shows your latest essays (no editing needed!)

## Basic Template

```markdown
---
layout: page
title: Now
permalink: /now/
---

What I'm focused on right now, and why.

## Current focus

- _Your first focus item here_
- _What outcome you're aiming for_
- _Why it matters_

## Essays connected to this

{% assign essays = site.posts | where_exp: "p", "p.categories contains 'essays'" %}
{% include post-list.html posts=essays limit=5 %}
```

## Editing the Current Focus

Just update the bullet points under "## Current focus":

```markdown
## Current focus

- Building an AI consulting framework for client projects
- Writing about model interpretability techniques
- Exploring new ML techniques for time-series data
```

You can use:
- **Bullet points** (`- item`)
- **Bold text** (`**bold**`)
- **Links** (`[text](url)`)
- **Italics** (`*italics*`)

## Example Now Page

```markdown
---
layout: page
title: Now
permalink: /now/
---

What I'm focused on right now, and why.

## Current focus

- **Building a reusable ML framework** - Creating a standardized approach to model development for consulting clients. Goal is to reduce project setup time by 50%.

- **Writing about AI ethics** - Working on an essay series about responsible AI deployment in enterprise settings. First post coming soon.

- **Learning Rust** - Exploring Rust for high-performance data processing. Evaluating if it's worth adding to our tech stack.

## Essays connected to this

{% assign essays = site.posts | where_exp: "p", "p.categories contains 'essays'" %}
{% include post-list.html posts=essays limit=5 %}
```

## The Essays Section

**Don't edit this part!** It automatically shows your 5 most recent essays with the `essays` category. It updates automatically when you publish new essays.

If you want to change how many essays show, edit the `limit=5` part:
- `limit=3` - Shows 3 essays
- `limit=10` - Shows 10 essays
- Remove `limit=5` - Shows all essays

## When to Update

Update your Now page:
- **Weekly** - Keep it current with what you're actually working on
- **When priorities change** - Reflect your real focus
- **Monthly** - At minimum, review and refresh

## Tips

1. **Be specific** - "Building an AI framework" is better than "Working on AI stuff"
2. **Include outcomes** - What are you trying to achieve?
3. **Keep it real** - Only list things you're actually working on
4. **Use formatting** - Bold important items, add links to related work

## Formatting Options

```markdown
## Current focus

- **Bold important items** - Makes them stand out
- Regular items work fine too
- [Link to related work](https://example.com) - Add links
- *Italic for emphasis* - Use sparingly
```

## Common Patterns

**Project-focused:**
```markdown
- Building [Project Name](link) - Description of what it does
```

**Learning-focused:**
```markdown
- Learning Rust for high-performance computing
- Exploring transformer architectures
```

**Writing-focused:**
```markdown
- Writing about AI ethics in enterprise
- Drafting a series on model interpretability
```

**Goal-focused:**
```markdown
- Reducing client onboarding time by 50%
- Building a reusable consulting framework
```

## Don't Edit These Parts

Leave these alone (they're Jekyll/Liquid code):
- The front matter (`---` section at top)
- The `{% assign essays...` section
- The `{% include post-list.html...` section

Just focus on the "Current focus" section!

## Full Template

Copy this and customize:

```markdown
---
layout: page
title: Now
permalink: /now/
---

What I'm focused on right now, and why.

## Current focus

- _Your first focus item - what you're working on and why_
- _Second focus item - outcome you're aiming for_
- _Third focus item - why it matters_

## Essays connected to this

{% assign essays = site.posts | where_exp: "p", "p.categories contains 'essays'" %}
{% include post-list.html posts=essays limit=5 %}
```

That's it! Just edit the bullet points and you're done. The page updates automatically when you save! 🚀
