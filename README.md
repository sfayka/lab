# lab.knoxanalytics.com

A simple GitHub Pages (Jekyll) site for **lab.knoxanalytics.com**.

## What’s here

- Home page with short intro + latest posts
- `Essays` page listing writing
- `Experiments` page listing repos + blurbs (data-driven)
- `Now` page describing current focus + related essays

## Local preview

If you have Ruby/Jekyll installed:

```bash
bundle install
bundle exec jekyll serve
```

Then open `http://localhost:4000`.

## Deploy (GitHub Pages)

1. Create a new GitHub repo (recommended name: `lab` or `lab-site`).
2. Push this repo.
3. In GitHub repo → **Settings → Pages**:
   - Source: `Deploy from a branch`
   - Branch: `main` / root
4. Set **Custom domain** to `lab.knoxanalytics.com`.

### DNS

For a subdomain, create a **CNAME** record:

- Host/Name: `lab`
- Type: `CNAME`
- Target: `sfayka.github.io`

This repo includes a `CNAME` file already.
