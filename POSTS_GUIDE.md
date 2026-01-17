# How to Write Posts in Jekyll

## Quick Start

### 1. Create a New Post File

Create a file in the `_posts/` folder with this naming format:
```
YYYY-MM-DD-your-post-title.md
```

**Example:** `2026-01-20-my-new-essay.md`

### 2. Add Front Matter

Every post needs front matter at the top (between the `---` lines):

```markdown
---
layout: post
title: "Your Post Title"
date: 2026-01-20
categories: [essays]
---
```

### 3. Write Your Content

After the front matter, write your post in Markdown:

```markdown
---
layout: post
title: "Your Post Title"
date: 2026-01-20
categories: [essays]
---

Your content goes here. You can use **bold**, *italic*, and [links](https://example.com).

## Headings Work Too

- Bullet points
- More bullets

1. Numbered lists
2. Also work
```

## Important Details

### Categories

- **`categories: [essays]`** - Shows up on the Essays page
- **`categories: [notes]`** - For shorter posts (won't show on Essays page)
- **No categories** - Will show on home page but not Essays page

### Date Format

Use `YYYY-MM-DD` format: `2026-01-20`

### Title

- Use quotes around the title if it has special characters
- Keep it descriptive

## Example Post

Here's a complete example:

```markdown
---
layout: post
title: "Building My First AI Model"
date: 2026-01-20
categories: [essays]
---

I've been experimenting with building AI models for my consulting work.

## What I Learned

Here are the key takeaways:

1. Start simple
2. Iterate quickly
3. Test thoroughly

## Next Steps

I'm planning to dive deeper into...
```

## Where Posts Appear

- **Home page** (`/`): Shows the 5 most recent posts (any category)
- **Essays page** (`/essays/`): Shows only posts with `categories: [essays]`
- **Individual post**: Accessible at `/YYYY/MM/DD/your-post-title/`

## Tips

1. **Save the file** - Jekyll will auto-rebuild when you save
2. **Check locally** - Visit `http://localhost:4000` to see your post
3. **Use Markdown** - All standard Markdown works (headers, lists, links, code blocks, etc.)
4. **Date matters** - Posts are sorted by date, newest first

## Quick Template

Copy this template for a new post:

```markdown
---
layout: post
title: "Your Title Here"
date: YYYY-MM-DD
categories: [essays]
---

Write your content here...
```

That's it! Just create the file, add the front matter, write your content, and Jekyll handles the rest.
