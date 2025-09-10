# Porkyville Chronicle — Static GitHub Pages Starter

Pure HTML + CSS + JS. No Jekyll, no plugins. Articles live in `data/articles.json`.

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

## Troubleshooting
- Check comma's in JSON arguments
- Check type of brackets
- Check if brackets are properly closed
- Ask ChatGPT or something idk
- Cry (a lot)
- McDonalds is open 24/7 if you need to cope with bad coding decisions
- :3
