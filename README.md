# lab.knoxanalytics.com

A simple GitHub Pages (Jekyll) site for **lab.knoxanalytics.com**.

## What’s here

- Home page with short intro + latest posts
- `Essays` page listing writing
- `Experiments` page listing repos + blurbs (data-driven)
- `Now` page describing current focus + related essays

## Local preview

### Prerequisites

- Ruby (2.6 or higher) - You have Ruby installed ✓
- Bundler - You have Bundler installed ✓

### Setup and run

1. **Install dependencies:**
   ```bash
   bundle install
   ```

2. **Start the Jekyll server:**
   ```bash
   bundle exec jekyll serve
   ```

3. **Open your browser:**
   Navigate to `http://localhost:4000`

The site will automatically rebuild when you make changes to files. Press `Ctrl+C` to stop the server.

### Troubleshooting

- If you get permission errors, you may need to install gems to a local path:
  ```bash
  bundle config set --local path 'vendor/bundle'
  bundle install
  ```

- If you encounter issues with the minima theme, try:
  ```bash
  bundle update
  ```

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
