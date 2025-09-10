(function(){
  const state = {
    articles: [],
    authors: {}
  };

  function qs(sel, root=document){ return root.querySelector(sel); }
  function qsa(sel, root=document){ return Array.from(root.querySelectorAll(sel)); }

  function getParam(name){
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
  }

  function fmtDate(iso){
    try{
      const d = new Date(iso + 'T00:00:00');
      return d.toLocaleDateString(undefined, {year:'numeric', month:'short', day:'2-digit'});
    }catch(e){ return iso; }
  }

  function slugify(s){ return String(s||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''); }

  async function loadData(){
    const [a, au] = await Promise.all([
      fetch('data/articles.json').then(r => r.json()),
      fetch('data/authors.json').then(r => r.json())
    ]);
    state.articles = a.sort((x,y)=> y.date.localeCompare(x.date)); // newest first
    state.authors = au;
  }

  function cardHTML(article, compact=false){
    const href = `article.html?id=${encodeURIComponent(article.id)}`;
    const cat = Array.isArray(article.category) ? article.category[0] : (article.category||'');
    return `
      <article class="card${compact?' compact':''}">
        <a href="${href}">
          <h3>${article.title}</h3>
          ${compact ? '' : `<p>${(article.excerpt||'').slice(0,140)}</p>`}
          <div class="card-meta">
            <span>${fmtDate(article.date)}</span>
            ${cat ? ` • <span>${cat}</span>` : ''}
          </div>
        </a>
      </article>
    `;
  }

  function renderHome(){
    // Top stories: first 3
    const top = state.articles.slice(0,4).map(a => cardHTML(a)).join('');
    qs('#top-stories').innerHTML = top;

    // Latest list (8)
    qs('#latest-list').innerHTML = state.articles.slice(0,8)
      .map(a => `<li><a href="article.html?id=${encodeURIComponent(a.id)}">${a.title}</a></li>`)
      .join('');

    // Rows by category
    ['PE','World','Politics','Economy','Culture'].forEach(cat => {
      const el = qs(`#row-${cat}`);
      if(!el) return;
      const posts = state.articles.filter(a => (Array.isArray(a.category)?a.category:[a.category]).includes(cat)).slice(0,4);
      el.innerHTML = posts.map(p => cardHTML(p, true)).join('') || `<p>No articles yet in ${cat}.</p>`;
    });

    // Search
    const searchInput = qs('#search');
    const results = qs('#search-results');
    if(searchInput){
      searchInput.addEventListener('input', (e)=>{
        const q = e.target.value.toLowerCase().trim();
        if(!q){ results.innerHTML=''; return; }
        const hits = state.articles.filter(a =>
          (a.title||'').toLowerCase().includes(q) ||
          (a.excerpt||'').toLowerCase().includes(q) ||
          (a.content||'').toLowerCase().includes(q)
        ).slice(0,8);
        results.innerHTML = hits.map(h => `<li><a href="article.html?id=${encodeURIComponent(h.id)}">${h.title}</a></li>`).join('') || '<li>No matches.</li>';
      });
    }
  }

  function renderArticle(){
    const id = getParam('id');
    const art = state.articles.find(a => a.id === id);
    if(!art){
      qs('#title').textContent = 'Article Not Found';
      qs('#meta').textContent = 'We could not find that story.';
      return;
    }
    document.title = `${art.title} · Porkyville Chronicle`;
    qs('#title').textContent = art.title;
    const author = state.authors[art.author] ? state.authors[art.author].name : (art.author||'Staff');
    const cats = (Array.isArray(art.category)?art.category:[art.category]).filter(Boolean).join(', ');
    qs('#meta').innerHTML = `${fmtDate(art.date)} • By ${author}${cats ? ' • In ' + cats : ''}`;
    qs('#excerpt').textContent = art.excerpt || '';
    if (art.markdown) {
      qs('#content').innerHTML = marked.parse(art.content || '');
    } else {
      qs('#content').innerHTML = art.content || '';
    }

    // Simple structured data (optional)
    const ld = {
      "@context":"https://schema.org",
      "@type":"NewsArticle",
      "headline": art.title,
      "datePublished": art.date,
      "author": {"@type":"Person","name": author}
    };
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(ld);
    document.head.appendChild(s);
  }

  function renderCategory(){
    const cat = getParam('cat') || '';
    qs('#cat-title').textContent = cat || 'Category';
    const posts = state.articles.filter(a => (Array.isArray(a.category)?a.category:[a.category]).includes(cat));
    qs('#cat-cards').innerHTML = posts.map(p => cardHTML(p)).join('') || `<p>No articles yet in ${cat}.</p>`;
  }

  async function init(){
    qs('#year') && (qs('#year').textContent = new Date().getFullYear());
    try{
      await loadData();
    }catch(e){
      console.error('Failed to load data:', e);
      qsa('.cards, .latest, .content').forEach(el => el && (el.innerHTML = '<p>Failed to load articles.</p>'));
      return;
    }

    const page = document.body.getAttribute('data-page');
    if(page==='home') renderHome();
    if(page==='article') renderArticle();
    if(page==='category') renderCategory();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
