# Quick Start Guide

Get up and running with your lab site in minutes!

## 📚 All Guides

- **POSTS_GUIDE.md** - How to write blog posts
- **EXPERIMENTS_GUIDE.md** - How to add projects/experiments
- **NOW_PAGE_GUIDE.md** - How to update your "Now" page
- **MAINTENANCE.md** - General maintenance and workflow
- **MAINTENANCE_CHECKLIST.md** - Regular maintenance tasks

## 🚀 First Steps

### 1. Update Your "Now" Page

Edit `now.md` and replace the placeholder text:

```markdown
## Current focus

- Building your first project
- Learning something new
- Writing your first post
```

### 2. Add Your First Experiment

Edit `_data/experiments.yml` and replace the example:

```yaml
- name: Your Project Name
  url: https://github.com/yourusername/project
  why: >-
    Why this project exists and what it does.
  status: active
  tags:
    - your-tag
```

### 3. Write Your First Post

Create `_posts/2026-01-20-my-first-post.md`:

```markdown
---
layout: post
title: "My First Post"
date: 2026-01-20
categories: [essays]
---

Your content here!
```

## 📝 Templates Available

- `_data/experiments.yml.template` - Copy for new experiments
- `now.md.template` - Reference for Now page format

## ✅ That's It!

1. Edit `now.md` - Update what you're focused on
2. Edit `_data/experiments.yml` - Add your projects
3. Create posts in `_posts/` - Write your content

Everything else is automated! 🎉

## 🔗 Need Help?

- See the individual guide files for detailed instructions
- All guides are in the root directory of your site
- Each guide has examples and templates

Happy writing! ✨
