# Porkyville Chronicle — GitHub Pages Starter

A Jekyll-powered newspaper-style site, tuned to run on GitHub Pages without paid themes.

## Quick start
1. Create a new repo called `porkyville-chronicle`.
2. Copy these files into it (or upload the provided ZIP).
3. In **Settings → Pages**, choose "Deploy from a branch", `main` branch, `/ (root)` folder.
4. (Optional) Add your custom domain in **Settings → Pages** and set the `CNAME` DNS record.

## Customize
- Update `_config.yml` `url` and `baseurl` to match your GitHub Pages or custom domain.
- Edit `_data/authors.yml` for bylines.
- Write articles in `_posts` using the format `YYYY-MM-DD-title.md` with front matter:
  ```yaml
  ---
  title: My Headline
  author: staff
  categories: [politics]
  excerpt: A short dek for the homepage.
  ---
  Article body in Markdown.
  ```
- Need new sections? Add to `categories/` and the home layout will auto-link them.

No plugins are used to stay GitHub Pages–compatible.
