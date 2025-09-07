# Porkyville Chronicle — Static GitHub Pages Starter

Pure HTML + CSS + JS. No Jekyll, no plugins. Articles live in `data/articles.json`.

## Deploy
1. Create a new repo (e.g., `porkyville-chronicle`).
2. Upload these files.
3. In GitHub **Settings → Pages**: Deploy from branch `main`, folder `/ (root)`.
4. Your site will be live at `https://USERNAME.github.io/REPO-NAME`.

## Custom Domain
- Keep the `CNAME` file (edit to your domain).
- Add a DNS CNAME record from your domain to `USERNAME.github.io`.
- In **Settings → Pages**, set the same custom domain and enable HTTPS.

## Add Articles
Edit `data/articles.json` and add entries like:
```json
{
  "id": "withers-run-wild",
  "title": "Withers Run Wild After Battle",
  "date": "2025-09-01",
  "author": "staff",
  "category": ["Politics"],
  "excerpt": "A battle in the northern fields unleashed dozens of Withers...",
  "content": "<p>Full HTML content here...</p>"
}
```
- `id` becomes the link slug (`article.html?id=withers-run-wild`).
- `category` can be a single string or an array; homepage rows use Politics, Economy, Culture, Sport.
- You can use basic HTML in `content` (paragraphs, headings, images).

## Pages
- `index.html` → front page (Top Stories, Latest, rows by category).
- `article.html?id=slug` → single article.
- `category.html?cat=Politics` → list by category.
- `404.html` → custom not found page.

## Theme
Edit `assets/css/style.css`. Colors live at the top as CSS variables.
