/* GitHub projects: fetched client-side, cached in localStorage to avoid
   hammering the unauthenticated GitHub API (60 req/hr per IP) and to make
   repeat visits feel instant. Falls back gracefully if the API is unreachable. */
(function(){
  var GITHUB_USER = 'Mangesh-Bhattacharya';
  var CACHE_KEY = 'mb_portfolio_projects_v1';
  var CACHE_TTL = 60 * 60 * 1000; // 1 hour
  var YEARS_SINCE = new Date('2023-08-01T00:00:00Z');

  var ICONS = {
    ai: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="8" width="16" height="12" rx="2"/><path d="M9 8V5a3 3 0 0 1 6 0v3"/><circle cx="9" cy="14" r="1"/><circle cx="15" cy="14" r="1"/></svg>',
    security: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3l8 3.5V11c0 5-3.4 8.7-8 9.9C7.4 19.7 4 16 4 11V6.5L12 3z"/></svg>',
    cloud: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 18h11a4 4 0 0 0 .3-8 5.5 5.5 0 0 0-10.6-1.5A4.5 4.5 0 0 0 7 18z"/></svg>',
    network: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="M6.7 7.3L11 16M17.3 7.3L13 16M7 6h10"/></svg>',
    def: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 9l-4 3 4 3M16 9l4 3-4 3M14 6l-4 12"/></svg>'
  };
  var STAR_SVG = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.9L5.7 21l1.7-7-5.4-4.7 7.1-.6z"/></svg>';
  var GH_SVG = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.4 9.4 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.35 4.68-4.58 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z"/></svg>';
  var LINK_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 4h6v6M20 4l-9 9M9 6H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-4"/></svg>';

  var CATS = {
    security:['security','threat','vulnerability','ransomware','scan','recon','pentest','red-team','malware','ids','soc','siem'],
    ai:['ai','ml','machine-learning','neural','intelligence','anomaly','detection','llm','nlp','model'],
    cloud:['cloud','aws','azure','docker','kubernetes','canarie','ansible','devsecops'],
    network:['network','cisco','topology','nmap','packet','firewall','protocol']
  };

  var allProjects = [];

  function getCat(p){
    var t = (p.name+' '+(p.description||'')+' '+(p.topics||[]).join(' ')).toLowerCase();
    for(var c in CATS){ if(CATS[c].some(function(k){ return t.indexOf(k) > -1; })) return c; }
    return 'def';
  }
  function fmtName(n){ return n.replace(/[-_]/g,' ').replace(/\b\w/g, function(l){ return l.toUpperCase(); }); }
  function esc(s){ return (s||'').replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }

  function renderSkeletons(n){
    var grid = document.getElementById('projectsGrid');
    var html = '';
    for(var i=0;i<n;i++){
      html += '<div class="skeleton-card"><div class="skeleton" style="width:34px;height:34px;border-radius:9px;margin-bottom:16px;"></div>'+
              '<div class="skeleton" style="width:70%;"></div><div class="skeleton" style="width:100%;"></div>'+
              '<div class="skeleton" style="width:90%;"></div><div class="skeleton" style="width:40%;margin-top:20px;"></div></div>';
    }
    grid.innerHTML = html;
  }

  function renderProjects(list){
    var grid = document.getElementById('projectsGrid');
    if(!list.length){
      grid.innerHTML = '<div class="projects-empty">No projects matched this filter yet. <a href="https://github.com/'+GITHUB_USER+'" target="_blank" rel="noopener">Browse all repositories on GitHub &rarr;</a></div>';
      return;
    }
    var html = '';
    list.forEach(function(p){
      var techs = [p.language].concat((p.topics||[]).slice(0,3)).filter(Boolean);
      var techHtml = techs.map(function(t){ return '<span class="tech-badge">'+esc(t)+'</span>'; }).join('');
      var starHtml = p.stars ? '<div class="project-stars">'+STAR_SVG+' '+p.stars+'</div>' : '';
      var demoHtml = p.homepage ? '<a href="'+esc(p.homepage)+'" target="_blank" rel="noopener" class="project-link demo">'+LINK_SVG+' Demo</a>' : '';
      html += '<div class="project-card" data-cat="'+p.cat+'">'+
                '<div class="project-header"><div class="project-icon">'+(ICONS[p.cat]||ICONS.def)+'</div>'+starHtml+'</div>'+
                '<div class="project-title">'+esc(fmtName(p.name))+'</div>'+
                '<div class="project-desc">'+esc(p.description||'Cybersecurity / AI engineering project.')+'</div>'+
                '<div class="project-tech">'+techHtml+'</div>'+
                '<div class="project-links"><a href="'+esc(p.url)+'" target="_blank" rel="noopener" class="project-link github">'+GH_SVG+' Code</a>'+demoHtml+'</div>'+
              '</div>';
    });
    grid.innerHTML = html;
  }

  function updateStats(){
    var elP = document.getElementById('statProjects');
    var elS = document.getElementById('statStars');
    var stars = allProjects.reduce(function(s,p){ return s + (p.stars||0); }, 0);
    if(elP){ elP.dataset.count = allProjects.length; elP.dataset.suffix='+'; if(window.animateCount) window.animateCount(elP, allProjects.length, '+'); }
    if(elS){ elS.dataset.count = stars; if(window.animateCount) window.animateCount(elS, stars, ''); }
    var footLink = document.getElementById('projectsCountLink');
    if(footLink) footLink.textContent = 'View all '+allProjects.length+'+ repositories';
    var yearsEl = document.getElementById('statYears');
    if(yearsEl){
      var years = Math.max(1, Math.floor((Date.now() - YEARS_SINCE.getTime()) / (365.25*24*3600*1000)));
      if(window.animateCount) window.animateCount(yearsEl, years, '+');
    }
  }

  function fromCache(){
    try{
      var raw = localStorage.getItem(CACHE_KEY);
      if(!raw) return null;
      var parsed = JSON.parse(raw);
      if(Date.now() - parsed.ts > CACHE_TTL) return null;
      return parsed.data;
    }catch(e){ return null; }
  }
  function toCache(data){
    try{ localStorage.setItem(CACHE_KEY, JSON.stringify({ts:Date.now(), data:data})); }catch(e){}
  }

  function processRepos(repos){
    allProjects = repos.filter(function(r){ return !r.fork; }).map(function(r){
      return {
        name:r.name, description:r.description, url:r.html_url, language:r.language,
        stars:r.stargazers_count, homepage:r.homepage, topics:r.topics||[],
        updated:new Date(r.updated_at)
      };
    });
    allProjects.forEach(function(p){ p.cat = getCat(p); });
    allProjects.sort(function(a,b){ return (b.stars-a.stars) || (b.updated - a.updated); });
  }

  function loadProjects(){
    var cached = fromCache();
    if(cached){
      processRepos(cached);
      renderProjects(allProjects.slice(0,12));
      updateStats();
    } else {
      renderSkeletons(6);
    }
    fetch('https://api.github.com/users/'+GITHUB_USER+'/repos?per_page=100&sort=updated')
      .then(function(r){ if(!r.ok) throw new Error('rate-limited'); return r.json(); })
      .then(function(repos){
        toCache(repos);
        processRepos(repos);
        renderProjects(allProjects.slice(0,12));
        updateStats();
      })
      .catch(function(){
        if(!cached){
          document.getElementById('projectsGrid').innerHTML =
            '<div class="projects-empty">Live GitHub data is temporarily rate-limited. <a href="https://github.com/'+GITHUB_USER+'" target="_blank" rel="noopener">View repositories directly on GitHub &rarr;</a></div>';
        }
      });
  }

  var filterBar = document.getElementById('filterBar');
  if(filterBar){
    filterBar.addEventListener('click', function(e){
      var btn = e.target.closest('.filter-btn');
      if(!btn) return;
      filterBar.querySelectorAll('.filter-btn').forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.dataset.filter;
      var filtered = f === 'all' ? allProjects : allProjects.filter(function(p){ return p.cat === f; });
      renderProjects(filtered.slice(0, f === 'all' ? 12 : 24));
    });
  }

  window.mbProjects = { getAll: function(){ return allProjects; } };
  loadProjects();
})();
