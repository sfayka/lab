# Site Maintenance Guide

Quick reference for maintaining your Jekyll lab site.

## 📝 Common Tasks

### Adding/Updating Experiments

Experiments are managed in `_data/experiments.yml`. Edit this file to add or update projects:

```yaml
- name: Project Name
  url: https://github.com/yourusername/project
  why: >-
    A brief explanation of why this project exists.
  status: active  # or "archived", "on-hold", etc.
  tags:
    - tag1
    - tag2
```

**Example:**
```yaml
- name: AI Model Trainer
  url: https://github.com/knoxanalytics/ai-trainer
  why: >-
    A tool to streamline model training workflows for consulting clients.
  status: active
  tags:
    - machine-learning
    - tooling
    - consulting
```

The `why` field uses `>-` which allows multi-line text (just write normally, it will format correctly).

### Updating the "Now" Page

Just edit `now.md` directly. Update the "Current focus" section with what you're working on:

```markdown
## Current focus

- Building an AI consulting framework
- Writing about model interpretability
- Exploring new ML techniques
```

The "Essays connected to this" section automatically shows your latest essays - no need to edit it manually.

### Adding New Pages

1. Create a new `.md` file in the root directory
2. Add front matter:
   ```markdown
   ---
   layout: page
   title: Page Title
   permalink: /page-url/
   ---
   ```
3. Add it to `_config.yml` under `header_pages` if you want it in navigation:
   ```yaml
   header_pages:
     - essays.md
     - experiments.md
     - now.md
     - your-new-page.md
   ```

## 🔄 Workflow Tips

### Local Development

1. **Always test locally first:**
   ```bash
   bundle exec jekyll serve
   ```
   Visit `http://localhost:4000` to preview changes

2. **Auto-reload:** Jekyll watches for file changes and rebuilds automatically. Just refresh your browser.

3. **Check for errors:** Watch the terminal output for any build errors.

### Before Pushing to GitHub

1. ✅ Test locally - make sure everything looks good
2. ✅ Check all links work
3. ✅ Verify posts show up correctly
4. ✅ Commit and push:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

### GitHub Pages Deployment

- **Automatic:** GitHub Pages rebuilds automatically when you push to `main`
- **Wait time:** Usually 1-3 minutes for changes to appear
- **Check status:** Go to your repo → Actions tab to see build status

## 📁 File Structure Quick Reference

```
lab-site/
├── _config.yml          # Site configuration
├── _data/
│   └── experiments.yml  # Experiments data (edit this!)
├── _posts/              # Blog posts go here
│   └── YYYY-MM-DD-title.md
├── _layouts/            # Page templates (don't edit unless needed)
├── _includes/           # Reusable components (don't edit unless needed)
├── assets/
│   └── css/
│       └── style.scss   # Your custom styles (edit carefully!)
├── essays.md            # Essays page
├── experiments.md       # Experiments page (auto-generated from _data)
├── now.md               # Now page (edit this!)
└── index.md             # Home page
```

## 🎨 Styling

### Customizing Colors

Edit `assets/css/style.scss` and look for the `:root` section:

```scss
:root {
  --color-primary: #00d9ff;      // Main accent color
  --color-accent: #00ff88;       // Secondary accent
  --color-bg: #0a0a0f;          // Background
  // ... etc
}
```

Change these values to customize your color scheme.

### Adding Custom Styles

Add your styles at the bottom of `assets/css/style.scss`. The file is well-organized with comments.

## 🐛 Troubleshooting

### Posts not showing up?

- ✅ Check filename format: `YYYY-MM-DD-title.md`
- ✅ Check date is in the future (Jekyll hides future-dated posts by default)
- ✅ Verify front matter is correct
- ✅ Make sure file is in `_posts/` folder

### Changes not appearing?

- ✅ Restart Jekyll server (`Ctrl+C` then `bundle exec jekyll serve`)
- ✅ Clear browser cache
- ✅ Check for build errors in terminal

### Experiments not showing?

- ✅ Check YAML syntax in `_data/experiments.yml` (indentation matters!)
- ✅ Verify the file is valid YAML (use a YAML validator if needed)

## 📚 Useful Commands

```bash
# Start local server
bundle exec jekyll serve

# Start with drafts visible
bundle exec jekyll serve --drafts

# Build site without serving
bundle exec jekyll build

# Update dependencies
bundle update
```

## 💡 Pro Tips

1. **Use drafts:** Create files in `_drafts/` folder (no date needed) to work on posts before publishing
2. **Preview future posts:** Use `--future` flag: `bundle exec jekyll serve --future`
3. **Markdown cheatsheet:** Keep [this](https://www.markdownguide.org/cheat-sheet/) handy
4. **YAML syntax:** Be careful with indentation - use 2 spaces, not tabs
5. **Commit often:** Small, frequent commits are easier to manage

## 🔗 Quick Links

- **Posts Guide:** See `POSTS_GUIDE.md` for detailed post writing instructions
- **Jekyll Docs:** https://jekyllrb.com/docs/
- **Markdown Guide:** https://www.markdownguide.org/

---

That's it! The site is designed to be low-maintenance. Most of your time will be spent writing posts and updating the Now page. Everything else is automated! 🚀
