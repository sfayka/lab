# Site Maintenance Checklist

Regular maintenance tasks to keep your site running smoothly.

## ✅ Regular Maintenance (Monthly)

### Content Updates

- [ ] Review and update "Now" page with current focus
- [ ] Check experiments status - update any that have changed
- [ ] Review old posts - update if needed

### Technical Checks

- [ ] Test site locally: `bundle exec jekyll serve`
- [ ] Check all links still work
- [ ] Verify GitHub Pages is building successfully (check Actions tab)

## 🔄 Quarterly Maintenance

### Dependency Updates

- [ ] Update Jekyll and gems:

  ```bash
  bundle update
  ```

- [ ] Test site after updates to ensure nothing broke
- [ ] (Optional) Check for security advisories:

  ```bash
  gem install bundler-audit
  bundle audit
  ```

### Content Review

- [ ] Archive old experiments that are no longer active
- [ ] Review and update site description in `_config.yml` if needed
- [ ] Check if any new pages should be added to navigation

## 🛠️ As Needed

### When Adding New Features

- [ ] Test locally before pushing
- [ ] Check mobile responsiveness
- [ ] Verify dark theme still looks good

### When Dependencies Break

- [ ] Check Jekyll version compatibility
- [ ] Review minima theme updates
- [ ] Update `Gemfile` if needed

## 📋 Annual Maintenance

### Major Updates

- [ ] Review and update Ruby version (if system Ruby is outdated)
- [ ] Consider updating to latest Jekyll version
- [ ] Review and refresh site design/styling if desired
- [ ] Backup important content

## 🚨 Troubleshooting Checklist

If something breaks:

1. [ ] Check GitHub Actions for build errors
2. [ ] Test locally: `bundle exec jekyll serve`
3. [ ] Check for YAML syntax errors in `_data/experiments.yml`
4. [ ] Verify all file names are correct
5. [ ] Check `_config.yml` for syntax errors
6. [ ] Review recent commits for what changed

## 📝 Quick Commands Reference

```bash
# Start local server
bundle exec jekyll serve

# Update dependencies
bundle update

# Check for security issues (requires bundler-audit gem)
gem install bundler-audit
bundle audit

# Build site (without serving)
bundle exec jekyll build

# Clean and rebuild
bundle exec jekyll clean
bundle exec jekyll build
```

## 🔍 What You DON'T Need to Maintain

These are automated or don't need regular attention:

- ✅ **GitHub Pages deployment** - Automatic on every push
- ✅ **RSS feed** - Auto-generated from your posts
- ✅ **Post listings** - Automatically generated
- ✅ **Essays page** - Auto-updates when you add posts
- ✅ **Site styling** - Only change if you want to customize

## 💡 Maintenance Tips

1. **Keep it simple** - The site is designed to be low-maintenance
2. **Update regularly** - Small, frequent updates are easier than big overhauls
3. **Test locally first** - Always preview changes before pushing
4. **Commit often** - Small commits make it easier to roll back if needed
5. **Document changes** - Good commit messages help you remember what changed

## 📅 Suggested Schedule

- **Weekly**: Update "Now" page if priorities changed
- **Monthly**: Quick content review, test site
- **Quarterly**: Update dependencies, full content audit
- **Annually**: Major review and potential redesign

---

**Bottom line:** This site requires minimal maintenance. Most of your time will be spent creating content, not maintaining the site! 🎉
