(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))t(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&t(o)}).observe(document,{childList:!0,subtree:!0});function s(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function t(a){if(a.ep)return;a.ep=!0;const n=s(a);fetch(a.href,n)}})();const Z=[{id:"ideas",name:"Wissenssystem",description:"Persistentes Forschungssystem mit adversarial-getesteten Prinzipien (P1-P4), Wissensgraph und Bootstrap-Protokoll.",path:"c:\\Users\\Sven\\Desktop\\Ideas",status:"active",color:"#8b5cf6",icon:"🧠",tags:["Forschung","Wissen","Adversarial"],links:[{label:"Bootstrap",url:"CLAUDE_BOOTSTRAP.md"},{label:"Graph",url:"GRAPH.md"}]},{id:"content-creator",name:"Content Factory",description:"Automatisierte Multi-Plattform Content-Erstellung: Research, Scriptwriting, Voiceover, Video-Assembly, Upload.",path:"c:\\Users\\Sven\\Desktop\\ContentCreator",status:"active",color:"#f59e0b",icon:"🎬",tags:["Video","Automatisierung","Monetarisierung"],links:[{label:"CLI",url:"scripts/cli.py"},{label:"Pipeline",url:"scripts/pipeline.py"}]},{id:"remotion-video",name:"Video Studio",description:"Programmatische Videogenerierung mit Remotion + Claude Code. React-Komponenten als Frames, natuerliche Sprache als Input.",path:"c:\\Users\\Sven\\Desktop\\my-video",status:"active",color:"#f472b6",icon:"🎥",tags:["Remotion","Video","React","AI"],links:[{label:"Studio",url:"npm run dev"},{label:"Render",url:"npm run render"}]}];let M=localStorage.getItem("dashboard-lang")||"de";const P={de:{dashboard:"Dashboard",news:"News",projects:"Projekte",settings:"Einstellungen",theme:"Theme",refresh:"Aktualisieren","time.lastHour":"Letzte Stunde","time.last3h":"Letzte 3 Stunden","time.today":"Heute","time.yesterday":"Gestern","time.thisWeek":"Diese Woche","time.older":"Aelter","time.justNow":"gerade eben","time.mAgo":"vor {n}m","time.hAgo":"vor {n}h","time.dAgo":"vor {n}d","news.empty":"Keine News in diesem Zeitraum","news.error":"News konnten nicht geladen werden.","news.open":"Artikel oeffnen","news.sources":"{n} Quellen","news.comments":"Kommentare","news.upvotes":"Upvotes","news.loading":"Lade {n} von {total} Quellen…","news.readMore":"Mehr anzeigen","cat.tech":"Tech","cat.ai":"AI","cat.dev":"Dev","cat.market":"Markt","cat.science":"Science","cat.general":"Allg.","cat.all":"Alle","settings.sources":"Quellen","settings.interests":"Interessen","settings.display":"Anzeige","settings.sort":"Sortierung","settings.theme":"Theme","settings.language":"Sprache","settings.cards":"Karten","settings.compact":"Kompakt","settings.priority":"Prioritaet","settings.newest":"Neueste","settings.engagement":"Engagement","theme.dark":"Dunkel","theme.dim":"Gedimmt","theme.light":"Hell","project.active":"Aktiv","project.paused":"Pausiert","project.archived":"Archiviert","project.details":"Details","project.status":"Status","project.path":"Pfad","project.color":"Farbe","project.tags":"Tags","project.files":"Dateien","project.description":"Beschreibung","interest.ai":"AI / ML","interest.dev":"Development","interest.tech":"Tech","interest.market":"Markt","interest.science":"Wissenschaft","interest.general":"Allgemein",voice:"Voice Studio","voice.title":"Voice Studio","voice.desc":"Nimm deine Sprachzeilen auf dem Handy auf. Der Server wandelt sie in Video-Voiceover um.","voice.connecting":"Verbinde mit Voice Server...","voice.connected":"Voice Server verbunden","voice.offline":"Voice Server nicht erreichbar","voice.phoneTitle":"Auf dem Handy aufnehmen","voice.phoneDesc":"Scanne den QR-Code oder oeffne die URL auf deinem Smartphone (gleiches WLAN).","voice.openStudio":"Voice Studio oeffnen","voice.progress":"Aufnahme-Fortschritt","voice.offlineTitle":"Server nicht gestartet","voice.offlineDesc":"Starte den Voice Server im my-video Projekt:"},en:{dashboard:"Dashboard",news:"News",projects:"Projects",settings:"Settings",theme:"Theme",refresh:"Refresh","time.lastHour":"Last Hour","time.last3h":"Last 3 Hours","time.today":"Today","time.yesterday":"Yesterday","time.thisWeek":"This Week","time.older":"Older","time.justNow":"just now","time.mAgo":"{n}m ago","time.hAgo":"{n}h ago","time.dAgo":"{n}d ago","news.empty":"No news in this time period","news.error":"Could not load news.","news.open":"Open article","news.sources":"{n} sources","news.comments":"Comments","news.upvotes":"Upvotes","news.loading":"Loading {n} of {total} sources…","news.readMore":"Read more","cat.tech":"Tech","cat.ai":"AI","cat.dev":"Dev","cat.market":"Market","cat.science":"Science","cat.general":"General","cat.all":"All","settings.sources":"Sources","settings.interests":"Interests","settings.display":"Display","settings.sort":"Sort","settings.theme":"Theme","settings.language":"Language","settings.cards":"Cards","settings.compact":"Compact","settings.priority":"Priority","settings.newest":"Newest","settings.engagement":"Engagement","theme.dark":"Dark","theme.dim":"Dim","theme.light":"Light","project.active":"Active","project.paused":"Paused","project.archived":"Archived","project.details":"Details","project.status":"Status","project.path":"Path","project.color":"Color","project.tags":"Tags","project.files":"Files","project.description":"Description","interest.ai":"AI / ML","interest.dev":"Development","interest.tech":"Tech","interest.market":"Market","interest.science":"Science","interest.general":"General",voice:"Voice Studio","voice.title":"Voice Studio","voice.desc":"Record your voice lines on your phone. The server converts them into video voiceover.","voice.connecting":"Connecting to Voice Server...","voice.connected":"Voice Server connected","voice.offline":"Voice Server unreachable","voice.phoneTitle":"Record on your phone","voice.phoneDesc":"Scan the QR code or open the URL on your smartphone (same WiFi).","voice.openStudio":"Open Voice Studio","voice.progress":"Recording Progress","voice.offlineTitle":"Server not started","voice.offlineDesc":"Start the Voice Server in the my-video project:"}};function c(e,i){let s=P[M][e]||P.de[e]||e;if(i)for(const[t,a]of Object.entries(i))s=s.replace(`{${t}}`,String(a));return s}function X(){return M}function q(e){M=e,localStorage.setItem("dashboard-lang",e)}function ee(e,i,s){e.innerHTML="";for(const a of i){const n=c("project."+a.status),o=document.createElement("div");o.className="project-card",o.innerHTML=`
      <div class="project-icon">${a.icon}</div>
      <div class="project-info">
        <div class="project-name">${a.name}</div>
        <div class="project-desc">${a.description}</div>
      </div>
      <span class="project-status ${a.status}">${n}</span>
      <svg class="project-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
    `,o.addEventListener("click",()=>s(a)),e.appendChild(o)}const t=document.getElementById("project-count");t&&(t.textContent=String(i.length))}function te(e,i,s){var a;e.textContent=`${s.icon} ${s.name}`;const t=c("project."+s.status);i.innerHTML=`
    <div class="drawer-section">
      <div class="drawer-section-title">${c("project.details")}</div>
      <div class="drawer-field">
        <span class="drawer-field-label">${c("project.status")}</span>
        <span class="project-status ${s.status}">${t}</span>
      </div>
      <div class="drawer-field">
        <span class="drawer-field-label">${c("project.path")}</span>
        <span class="drawer-field-value">${s.path}</span>
      </div>
      <div class="drawer-field">
        <span class="drawer-field-label">${c("project.color")}</span>
        <span style="display:inline-block;width:14px;height:14px;border-radius:50%;background:${s.color}"></span>
      </div>
    </div>

    <div class="drawer-section">
      <div class="drawer-section-title">${c("project.tags")}</div>
      <div class="drawer-tags">
        ${s.tags.map(n=>`<span class="drawer-tag">${n}</span>`).join("")}
      </div>
    </div>

    ${(a=s.links)!=null&&a.length?`
      <div class="drawer-section">
        <div class="drawer-section-title">${c("project.files")}</div>
        <div class="drawer-links">
          ${s.links.map(n=>`
            <a class="drawer-link" href="#" title="${s.path}\\\\${n.url}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              ${n.label}
            </a>
          `).join("")}
        </div>
      </div>
    `:""}

    <div class="drawer-section">
      <div class="drawer-section-title">${c("project.description")}</div>
      <p style="font-size:0.85rem;color:var(--text-secondary);line-height:1.6">${s.description}</p>
    </div>
  `}const B={sources:{hackernews:!0,devto:!0,"github-trending":!0,"reddit-programming":!0,"reddit-technology":!0,"reddit-ai":!0,lobsters:!0},interests:["ai","dev","tech"],displayMode:"cards",sortBy:"priority",defaultHours:24,theme:"dark",language:"de",categoryFilter:"all"},N="dashboard-settings";let w=null;function b(){if(w)return w;try{const e=localStorage.getItem(N);e?w={...B,...JSON.parse(e)}:w={...B}}catch{w={...B}}return w}function h(e){w=e,localStorage.setItem(N,JSON.stringify(e))}function _(e){document.documentElement.classList.remove("light","dim"),e!=="dark"&&document.documentElement.classList.add(e)}function z(e,i,s){const t=b(),a=X();e.innerHTML=`
    <div class="settings-section">
      <div class="settings-section-title">${c("settings.sources")}</div>
      <div class="settings-sources">
        ${i.map(n=>`
          <label class="settings-toggle">
            <input type="checkbox" data-source="${n.id}" ${t.sources[n.id]!==!1?"checked":""} />
            <span class="toggle-switch"></span>
            <span class="settings-toggle-icon">${n.icon}</span>
            <span class="settings-toggle-label">${n.name}</span>
          </label>
        `).join("")}
      </div>
    </div>

    <div class="settings-section">
      <div class="settings-section-title">${c("settings.interests")}</div>
      <div class="settings-interests">
        ${["ai","dev","tech","market","science","general"].map(n=>`
          <label class="settings-chip-toggle">
            <input type="checkbox" data-interest="${n}" ${t.interests.includes(n)?"checked":""} />
            <span class="settings-chip-label">${c("interest."+n)}</span>
          </label>
        `).join("")}
      </div>
    </div>

    <div class="settings-section">
      <div class="settings-section-title">${c("settings.display")}</div>
      <div class="settings-row">
        <label class="settings-radio">
          <input type="radio" name="displayMode" value="cards" ${t.displayMode==="cards"?"checked":""} />
          <span>${c("settings.cards")}</span>
        </label>
        <label class="settings-radio">
          <input type="radio" name="displayMode" value="compact" ${t.displayMode==="compact"?"checked":""} />
          <span>${c("settings.compact")}</span>
        </label>
      </div>
    </div>

    <div class="settings-section">
      <div class="settings-section-title">${c("settings.sort")}</div>
      <div class="settings-row">
        <label class="settings-radio">
          <input type="radio" name="sortBy" value="priority" ${t.sortBy==="priority"?"checked":""} />
          <span>${c("settings.priority")}</span>
        </label>
        <label class="settings-radio">
          <input type="radio" name="sortBy" value="newest" ${t.sortBy==="newest"?"checked":""} />
          <span>${c("settings.newest")}</span>
        </label>
        <label class="settings-radio">
          <input type="radio" name="sortBy" value="engagement" ${t.sortBy==="engagement"?"checked":""} />
          <span>${c("settings.engagement")}</span>
        </label>
      </div>
    </div>

    <div class="settings-section">
      <div class="settings-section-title">${c("settings.theme")}</div>
      <div class="settings-row">
        ${["dark","dim","light"].map(n=>`
          <label class="settings-radio">
            <input type="radio" name="theme" value="${n}" ${t.theme===n?"checked":""} />
            <span>${c("theme."+n)}</span>
          </label>
        `).join("")}
      </div>
    </div>

    <div class="settings-section">
      <div class="settings-section-title">${c("settings.language")}</div>
      <div class="settings-row">
        <label class="settings-radio">
          <input type="radio" name="language" value="de" ${a==="de"?"checked":""} />
          <span>Deutsch</span>
        </label>
        <label class="settings-radio">
          <input type="radio" name="language" value="en" ${a==="en"?"checked":""} />
          <span>English</span>
        </label>
      </div>
    </div>
  `,e.querySelectorAll("input[data-source]").forEach(n=>{n.addEventListener("change",()=>{const o=n.dataset.source;t.sources[o]=n.checked,h(t),s()})}),e.querySelectorAll("input[data-interest]").forEach(n=>{n.addEventListener("change",()=>{const o=[];e.querySelectorAll("input[data-interest]:checked").forEach(r=>{o.push(r.dataset.interest)}),t.interests=o,h(t),s()})}),e.querySelectorAll('input[name="displayMode"]').forEach(n=>{n.addEventListener("change",()=>{t.displayMode=n.value,h(t),s()})}),e.querySelectorAll('input[name="sortBy"]').forEach(n=>{n.addEventListener("change",()=>{t.sortBy=n.value,h(t),s()})}),e.querySelectorAll('input[name="theme"]').forEach(n=>{n.addEventListener("change",()=>{const o=n.value;t.theme=o,h(t),_(o)})}),e.querySelectorAll('input[name="language"]').forEach(n=>{n.addEventListener("change",()=>{const o=n.value;t.language=o,h(t),q(o),z(e,i,s),s()})})}const v=[];function F(){return v}v.push({id:"hackernews",name:"Hacker News",icon:"🟠",color:"#ff6600",enabled:!0,fetchFn:async()=>{try{const i=await(await fetch("https://hacker-news.firebaseio.com/v0/topstories.json")).json();return(await Promise.all(i.slice(0,20).map(async t=>{try{const n=await(await fetch(`https://hacker-news.firebaseio.com/v0/item/${t}.json`)).json();return n!=null&&n.title?{id:`hn-${n.id}`,source:"Hacker News",sourceId:"hackernews",title:n.title,summary:n.url?new URL(n.url).hostname.replace("www.",""):`${n.descendants||0} comments`,url:n.url||`https://news.ycombinator.com/item?id=${n.id}`,timestamp:new Date(n.time*1e3).toISOString(),category:C(n.title),icon:"🟠",engagement:{upvotes:n.score||0,comments:n.descendants||0},tags:ie(n.title)}:null}catch{return null}}))).filter(t=>t!==null)}catch{return[]}}});v.push({id:"devto",name:"Dev.to",icon:"💻",color:"#3b49df",enabled:!0,fetchFn:async()=>{try{return(await(await fetch("https://dev.to/api/articles?per_page=15&top=1")).json()).map(s=>{var t;return{id:`devto-${s.id}`,source:"Dev.to",sourceId:"devto",title:s.title,summary:((t=s.description)==null?void 0:t.substring(0,200))||"",url:s.url,timestamp:s.published_at,category:"dev",icon:"💻",thumbnail:s.cover_image||s.social_image||void 0,engagement:{upvotes:s.public_reactions_count||0,comments:s.comments_count||0},tags:(s.tag_list||[]).slice(0,4)}})}catch{return[]}}});v.push({id:"github-trending",name:"GitHub",icon:"⭐",color:"#238636",enabled:!0,fetchFn:async()=>{try{const e=new Date(Date.now()-6048e5).toISOString().split("T")[0];return((await(await fetch(`https://api.github.com/search/repositories?q=created:>${e}&sort=stars&order=desc&per_page=10`)).json()).items||[]).map(t=>{var a;return{id:`gh-${t.id}`,source:"GitHub",sourceId:"github-trending",title:t.full_name,summary:(t.description||"No description").substring(0,200),url:t.html_url,timestamp:t.created_at,category:C(t.description||t.full_name),icon:"⭐",thumbnail:((a=t.owner)==null?void 0:a.avatar_url)||void 0,engagement:{upvotes:t.stargazers_count||0,comments:t.forks_count||0},tags:[t.language,...t.topics||[]].filter(Boolean).slice(0,4)}})}catch{return[]}}});v.push({id:"reddit-programming",name:"r/programming",icon:"📐",color:"#ff4500",enabled:!0,fetchFn:()=>D("programming")});v.push({id:"reddit-technology",name:"r/technology",icon:"📱",color:"#ff4500",enabled:!0,fetchFn:()=>D("technology")});v.push({id:"reddit-ai",name:"r/artificial",icon:"🤖",color:"#ff4500",enabled:!0,fetchFn:()=>D("artificial")});v.push({id:"lobsters",name:"Lobsters",icon:"🦞",color:"#ac130d",enabled:!0,fetchFn:async()=>{try{return(await(await fetch("https://lobste.rs/hottest.json")).json()).slice(0,15).map(s=>{var t;return{id:`lob-${s.short_id}`,source:"Lobsters",sourceId:"lobsters",title:s.title,summary:s.url?new URL(s.url).hostname.replace("www.",""):((t=s.description)==null?void 0:t.substring(0,200))||"",url:s.url||s.comments_url,timestamp:s.created_at,category:ne(s.tags||[]),icon:"🦞",engagement:{upvotes:s.score||0,comments:s.comment_count||0},tags:(s.tags||[]).slice(0,4)}})}catch{return[]}}});async function D(e){var i;try{const t=await(await fetch(`https://www.reddit.com/r/${e}/hot.json?limit=15&raw_json=1`,{headers:{Accept:"application/json"}})).json();return(((i=t==null?void 0:t.data)==null?void 0:i.children)||[]).filter(n=>!n.data.stickied).map(n=>{var u,p,d,f,g;const o=n.data,r=(f=(d=(p=(u=o.preview)==null?void 0:u.images)==null?void 0:p[0])==null?void 0:d.source)==null?void 0:f.url,l=o.thumbnail&&o.thumbnail.startsWith("http")?o.thumbnail:void 0;return{id:`reddit-${o.id}`,source:`r/${e}`,sourceId:`reddit-${e}`,title:o.title,summary:((g=o.selftext)==null?void 0:g.substring(0,200))||(o.url&&!o.is_self?new URL(o.url).hostname.replace("www.",""):""),url:o.url_overridden_by_dest||`https://reddit.com${o.permalink}`,timestamp:new Date(o.created_utc*1e3).toISOString(),category:e==="artificial"?"ai":C(o.title),icon:e==="artificial"?"🤖":e==="programming"?"📐":"📱",thumbnail:r||l,engagement:{upvotes:o.ups||0,comments:o.num_comments||0},tags:o.link_flair_text?[o.link_flair_text]:[]}})}catch{return[]}}const x=/\b(ai|gpt|llm|claude|openai|anthropic|gemini|machine.?learning|neural|transformer|diffusion|copilot|chatgpt|mistral|llama|deep.?learning|rag|embedding)\b/i,se=/\b(startup|funding|ipo|valuation|acquisition|revenue|billion|million|series.[a-d]|layoff|hire)\b/i,W=/\b(research|paper|study|physics|biology|quantum|space|nasa|arxiv|nature|science)\b/i;function C(e){return x.test(e)?"ai":W.test(e)?"science":se.test(e)?"market":/\b(rust|python|javascript|typescript|go|java|react|vue|svelte|docker|kubernetes|git|api|framework|library|npm|crate|compiler)\b/i.test(e)?"dev":"tech"}function ne(e){const i=e.join(" ");return/ai|ml|machine.learning/i.test(i)?"ai":/science|research|math/i.test(i)?"science":"dev"}function ie(e){const i=[];return x.test(e)&&i.push("AI"),/\b(rust)\b/i.test(e)&&i.push("Rust"),/\b(python)\b/i.test(e)&&i.push("Python"),/\b(javascript|typescript|js|ts)\b/i.test(e)&&i.push("JS/TS"),/\b(go|golang)\b/i.test(e)&&i.push("Go"),/\b(react|vue|svelte|angular)\b/i.test(e)&&i.push("Frontend"),/\b(docker|kubernetes|k8s)\b/i.test(e)&&i.push("DevOps"),/\b(linux|kernel|os)\b/i.test(e)&&i.push("Linux"),/\b(security|vulnerability|hack|exploit)\b/i.test(e)&&i.push("Security"),W.test(e)&&i.push("Science"),i.slice(0,3)}function oe(e){const i=b();let s=0;s+=Math.min(Math.log2(e.engagement.upvotes+1)*.8,6),s+=Math.min(Math.log2(e.engagement.comments+1)*.6,4);const t=i.interests.includes(e.category)?3:0;s+=({ai:4,dev:2,science:2,tech:1,market:1,general:0}[e.category]||0)+t;const n=(Date.now()-new Date(e.timestamp).getTime())/36e5;return n<1?s+=5:n<3?s+=3:n<12?s+=1.5:n<24&&(s+=.5),x.test(e.title)&&(s+=2),e.thumbnail&&(s+=.5),Math.round(s*10)/10}const ae=new Set(["the","and","for","that","this","with","from","your","have","are","not","but","was","has","been","will","can","its","how","why","what","when","who","which","about","into","than","them","then","just","more","some","also","like","over","nach","eine","wird","sich","oder","auch","noch","hier","does","using","used","new","show","make","made"]);function ce(e){for(const s of e)s._cluster=void 0,s._clusterSize=void 0;const i=new Map;for(const s of e){const t=s.title.toLowerCase().replace(/[^a-z0-9\s]/g,"").split(/\s+/).filter(n=>n.length>3&&!ae.has(n));let a=!1;for(const[n,o]of i){const r=new Set(n.split("|"));if(t.filter(u=>r.has(u)).length>=2){o.push(s),s._cluster=n,a=!0;break}}if(!a&&t.length>=2){const n=t.slice(0,5).join("|");i.set(n,[s]),s._cluster=n}}for(const[,s]of i){const t=new Set(s.map(a=>a.sourceId));for(const a of s)a._clusterSize=t.size,t.size>1&&(a._priority=(a._priority||0)+t.size*1.5)}}function re(e,i){for(const s of e)s._priority=oe(s);ce(e),de(e,i.sortBy)}let k=null;async function le(e,i=!1){if(!i&&k&&Date.now()-k.fetchedAt<12e4)return e(k.items,-1,-1),k.items;const s=b(),t=v.filter(r=>r.enabled&&s.sources[r.id]!==!1),a=[];let n=0;const o=t.map(async r=>{try{const l=await r.fetchFn();a.push(...l)}catch{}n++,re(a,s),e([...a],n,t.length)});return await Promise.allSettled(o),k={items:[...a],fetchedAt:Date.now()},a}function de(e,i){switch(i){case"newest":e.sort((s,t)=>new Date(t.timestamp).getTime()-new Date(s.timestamp).getTime());break;case"engagement":e.sort((s,t)=>t.engagement.upvotes+t.engagement.comments-(s.engagement.upvotes+s.engagement.comments));break;default:e.sort((s,t)=>(t._priority||0)-(s._priority||0));break}}function U(e,i){const s=Date.now()-i*36e5;return e.filter(t=>new Date(t.timestamp).getTime()>=s)}function K(e,i){return i==="all"?e:e.filter(s=>s.category===i)}function ue(e){const i=Date.now(),s=[{label:c("time.lastHour"),items:[]},{label:c("time.last3h"),items:[]},{label:c("time.today"),items:[]},{label:c("time.yesterday"),items:[]},{label:c("time.thisWeek"),items:[]},{label:c("time.older"),items:[]}];for(const t of e){const n=(i-new Date(t.timestamp).getTime())/36e5;n<1?s[0].items.push(t):n<3?s[1].items.push(t):n<24?s[2].items.push(t):n<48?s[3].items.push(t):n<168?s[4].items.push(t):s[5].items.push(t)}return s.filter(t=>t.items.length>0)}const pe={ai:"#a78bfa",dev:"#34d399",tech:"#60a5fa",market:"#fbbf24",science:"#f472b6",general:"#94a3b8"},me={hackernews:"#ff6600",devto:"#3b49df","github-trending":"#238636","reddit-programming":"#ff4500","reddit-technology":"#ff4500","reddit-ai":"#ff4500",lobsters:"#ac130d"};function ge(e,i){const s=b();if(i.length===0){e.innerHTML=`
      <div class="feed-empty">
        <div class="feed-empty-icon">📭</div>
        <p>${c("news.empty")}</p>
      </div>`;return}e.innerHTML="";const t=ue(i);for(const a of t){const n=document.createElement("div");n.className="feed-group-header",n.innerHTML=`<span>${a.label}</span><span class="feed-group-count">${a.items.length}</span>`,e.appendChild(n);for(const o of a.items){const r=o._priority||0,l=r>=10?"priority-high":r>=5?"priority-medium":"priority-low",u=s.displayMode==="cards",p=document.createElement("div");p.className=`news-item ${l} ${u?"card-mode":"compact-mode"}`;const d=me[o.sourceId]||"#666",f=pe[o.category]||"#94a3b8";p.innerHTML=`
        ${o.thumbnail&&u?`<div class="news-thumb"><img src="${V(o.thumbnail)}" alt="" loading="lazy" onerror="this.parentElement.remove()" /></div>`:""}
        <div class="news-content">
          <div class="news-header">
            <span class="news-source-badge" style="--source-color: ${d}">${y(o.source)}</span>
            <span class="news-time">${ve(o.timestamp)}</span>
            ${(o._clusterSize||0)>1?`<span class="news-multi-source">${c("news.sources",{n:o._clusterSize||0})}</span>`:""}
          </div>
          <div class="news-title">${y(o.title)}</div>
          ${o.summary?`<div class="news-summary">${y(o.summary)}</div>`:""}
          <div class="news-footer">
            <div class="news-stats">
              <span class="news-stat" title="${c("news.upvotes")}">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                ${L(o.engagement.upvotes)}
              </span>
              <span class="news-stat" title="${c("news.comments")}">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                ${L(o.engagement.comments)}
              </span>
              <span class="news-score-badge ${r>=10?"high":r>=5?"medium":"low"}">${Math.round(r)}</span>
            </div>
            <div class="news-tags">
              <span class="news-cat-tag" style="--cat-color: ${f}">${c("cat."+o.category)}</span>
              ${o.tags.map(g=>`<span class="news-tag">${y(g)}</span>`).join("")}
            </div>
          </div>
        </div>
        <div class="news-detail">
          <div class="news-detail-body">
            ${o.summary?`<p class="news-detail-summary">${y(o.summary)}</p>`:""}
            <div class="news-detail-stats">
              <span><strong>${L(o.engagement.upvotes)}</strong> ${c("news.upvotes")}</span>
              <span><strong>${L(o.engagement.comments)}</strong> ${c("news.comments")}</span>
              <span class="news-detail-source">${y(o.source)}</span>
            </div>
            ${o.tags.length>0?`<div class="news-detail-tags">${o.tags.map(g=>`<span class="news-tag">${y(g)}</span>`).join("")}</div>`:""}
          </div>
          ${o.url?`<a class="news-detail-link" href="${V(o.url)}" target="_blank" rel="noopener">
              ${c("news.open")}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
            </a>`:""}
        </div>
      `,p.addEventListener("click",g=>{g.target.closest(".news-detail-link")||p.classList.toggle("expanded")}),e.appendChild(p)}}}function ve(e){const i=Date.now()-new Date(e).getTime(),s=Math.floor(i/6e4);if(s<1)return c("time.justNow");if(s<60)return c("time.mAgo",{n:s});const t=Math.floor(s/60);if(t<24)return c("time.hAgo",{n:t});const a=Math.floor(t/24);return c("time.dAgo",{n:a})}function L(e){return e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function y(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function V(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const A="http://localhost:3457";async function he(e){e.innerHTML=`
    <div class="voice-studio">
      <div class="voice-card">
        <div class="voice-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.5" stroke-linecap="round">
            <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/>
            <path d="M19 10v2a7 7 0 01-14 0v-2"/>
            <line x1="12" y1="19" x2="12" y2="23"/>
            <line x1="8" y1="23" x2="16" y2="23"/>
          </svg>
        </div>
        <h2>${c("voice.title")}</h2>
        <p class="voice-desc">${c("voice.desc")}</p>
        <div class="voice-status" id="voice-server-status">
          <span class="voice-dot connecting"></span>
          <span>${c("voice.connecting")}</span>
        </div>
      </div>

      <div class="voice-connect-section" id="voice-connect" style="display:none">
        <div class="voice-card">
          <h3>${c("voice.phoneTitle")}</h3>
          <p class="voice-desc">${c("voice.phoneDesc")}</p>
          <div class="voice-url-box" id="voice-url-box">
            <code id="voice-url"></code>
            <button class="voice-copy-btn" id="voice-copy-btn" title="Kopieren">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
            </button>
          </div>
          <div class="voice-qr" id="voice-qr"></div>
          <a class="voice-open-btn" id="voice-open-link" href="#" target="_blank">${c("voice.openStudio")}</a>
        </div>

        <div class="voice-card" id="voice-progress-card">
          <h3>${c("voice.progress")}</h3>
          <div class="voice-lines" id="voice-lines"></div>
        </div>
      </div>

      <div class="voice-offline" id="voice-offline" style="display:none">
        <div class="voice-card">
          <h3>${c("voice.offlineTitle")}</h3>
          <p class="voice-desc">${c("voice.offlineDesc")}</p>
          <code class="voice-cmd">cd my-video && npm run voice</code>
        </div>
      </div>
    </div>
  `,fe()}async function fe(e){var a;const i=document.getElementById("voice-server-status"),s=document.getElementById("voice-connect"),t=document.getElementById("voice-offline");try{const o=await(await fetch(A+"/api/scripts",{signal:AbortSignal.timeout(3e3)})).json();i&&(i.innerHTML=`<span class="voice-dot online"></span><span>${c("voice.connected")}</span>`),s&&(s.style.display=""),t&&(t.style.display="none");const r=document.getElementById("voice-url"),l=document.getElementById("voice-open-link"),u=document.getElementById("voice-qr"),p=A.replace("localhost",location.hostname);r&&(r.textContent=p),l&&(l.href=p),u&&(u.innerHTML=`<img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(p)}&bgcolor=0a0a0d&color=5eead4" alt="QR Code" style="border-radius:8px;" />`),(a=document.getElementById("voice-copy-btn"))==null||a.addEventListener("click",()=>{navigator.clipboard.writeText(p);const d=document.getElementById("voice-copy-btn");d&&(d.innerHTML='<span style="color:var(--accent)">✓</span>'),setTimeout(()=>{d&&(d.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>')},2e3)}),O(o),setInterval(()=>O(o),5e3)}catch{i&&(i.innerHTML=`<span class="voice-dot offline"></span><span>${c("voice.offline")}</span>`),s&&(s.style.display="none"),t&&(t.style.display="")}}async function O(e){const i=document.getElementById("voice-lines");if(i)for(const s of e)try{const[t,a]=await Promise.all([fetch(A+"/api/status?script="+s.id),fetch(A+"/api/script/"+s.id)]),n=await t.json(),o=await a.json(),r=o.lines.length,l=Object.values(n).filter(u=>u.recorded).length;i.innerHTML=`
        <div class="voice-script-header">
          <span class="voice-script-title">${s.title}</span>
          <span class="voice-script-count">${l} / ${r}</span>
        </div>
        <div class="voice-progress-bar">
          <div class="voice-progress-fill" style="width:${l/r*100}%"></div>
        </div>
        <div class="voice-line-list">
          ${o.lines.map((u,p)=>{const d=n[u.id];return`
              <div class="voice-line-item ${d!=null&&d.recorded?"done":""}">
                <span class="voice-line-num">${p+1}</span>
                <span class="voice-line-text">${u.text}</span>
                <span class="voice-line-status">${d!=null&&d.recorded?"✓":"○"}</span>
              </div>
            `}).join("")}
        </div>
      `}catch{}}"serviceWorker"in navigator&&navigator.serviceWorker.register("./sw.js").catch(()=>{});let S=24,H="all",R=[];function ye(){var o,r,l,u,p,d,f,g;const e=b();_(e.theme),e.language&&q(e.language),(o=document.getElementById("btn-theme"))==null||o.addEventListener("click",be);const i=localStorage.getItem("sidebar")==="collapsed",s=document.getElementById("sidebar"),t=document.getElementById("sidebar-backdrop");i&&s.classList.add("collapsed");const a=()=>{s.classList.add("collapsed"),localStorage.setItem("sidebar","collapsed"),t==null||t.classList.remove("open")};(r=document.getElementById("sidebar-toggle"))==null||r.addEventListener("click",()=>{s.classList.toggle("collapsed");const m=s.classList.contains("collapsed");localStorage.setItem("sidebar",m?"collapsed":"expanded"),m?t==null||t.classList.remove("open"):t==null||t.classList.add("open")}),t==null||t.addEventListener("click",a),document.querySelectorAll(".sidebar-link[data-view]").forEach(m=>{m.addEventListener("click",$=>{$.preventDefault();const J=m.dataset.view;we(J),window.innerWidth<=768&&a()})}),S=e.defaultHours,document.querySelectorAll(".chip[data-hours]").forEach(m=>{m.classList.remove("active"),m.dataset.hours===String(S)&&m.classList.add("active"),m.addEventListener("click",()=>{document.querySelectorAll(".chip[data-hours]").forEach($=>$.classList.remove("active")),m.classList.add("active"),S=parseInt(m.dataset.hours,10),T()})}),document.querySelectorAll(".cat-chip[data-category]").forEach(m=>{m.addEventListener("click",()=>{document.querySelectorAll(".cat-chip").forEach($=>$.classList.remove("active")),m.classList.add("active"),H=m.dataset.category,T()})}),(l=document.getElementById("btn-refresh-news"))==null||l.addEventListener("click",()=>{E(!0)}),(u=document.getElementById("btn-settings"))==null||u.addEventListener("click",ke),(p=document.getElementById("settings-close"))==null||p.addEventListener("click",I),(d=document.getElementById("settings-backdrop"))==null||d.addEventListener("click",I),(f=document.getElementById("drawer-close"))==null||f.addEventListener("click",j),(g=document.getElementById("drawer-backdrop"))==null||g.addEventListener("click",j),document.addEventListener("keydown",m=>{m.key==="Escape"&&(j(),I())}),Y(),G(),Q();const n=document.getElementById("projects-list");n&&ee(n,Z,Se),E(),setInterval(()=>E(),300*1e3)}function G(){document.querySelectorAll("[data-i18n]").forEach(e=>{const i=e.dataset.i18n;e.textContent=c(i)})}function Q(){document.querySelectorAll(".cat-chip[data-category]").forEach(e=>{const i=e.dataset.category;e.textContent=c("cat."+i)})}function Y(){const e=document.getElementById("source-bar");if(!e)return;const i=b(),s=F();e.innerHTML=s.map(t=>`
    <button class="source-chip ${i.sources[t.id]!==!1?"active":""}"
            data-source-id="${t.id}"
            style="--source-color: ${t.color}">
      <span class="source-chip-icon">${t.icon}</span>
      <span class="source-chip-name">${t.name}</span>
    </button>
  `).join(""),e.querySelectorAll(".source-chip").forEach(t=>{t.addEventListener("click",()=>{const a=t.dataset.sourceId,n=t.classList.contains("active");t.classList.toggle("active"),i.sources[a]=!n,h(i),E(!0)})})}function we(e){var i,s;if(document.querySelectorAll(".view").forEach(t=>t.classList.remove("active")),document.querySelectorAll(".sidebar-link[data-view]").forEach(t=>t.classList.remove("active")),(i=document.getElementById(`view-${e}`))==null||i.classList.add("active"),(s=document.querySelector(`.sidebar-link[data-view="${e}"]`))==null||s.classList.add("active"),e==="voice"){const t=document.getElementById("voice-content");t&&he(t)}}function be(){const e=b(),i=["dark","dim","light"],s=i.indexOf(e.theme),t=i[(s+1)%i.length];e.theme=t,h(e),_(t)}async function E(e=!1){const i=document.getElementById("news-feed"),s=document.getElementById("btn-refresh-news"),t=document.getElementById("news-loading"),a=document.getElementById("loading-text"),n=document.getElementById("loading-bar-fill");if(i){s==null||s.classList.add("spinning"),t&&(t.style.display="flex");try{await le((o,r,l)=>{R=o,r>=0&&a&&n?(a.textContent=c("news.loading",{n:r,total:l}),n.style.width=`${r/l*100}%`,r===l&&t&&(t.style.display="none")):t&&(t.style.display="none"),T()},e)}catch{i.innerHTML=`<div class="feed-empty"><p>${c("news.error")}</p></div>`}finally{s==null||s.classList.remove("spinning"),t&&(t.style.display="none")}}}function T(){const e=document.getElementById("news-feed");if(!e)return;let i=U(R,S);i=K(i,H),ge(e,i),$e()}function $e(){const e=document.getElementById("news-count");if(!e)return;let i=U(R,S);i=K(i,H),e.textContent=String(i.length)}function ke(){j();const e=document.getElementById("settings-modal"),i=document.getElementById("settings-backdrop"),s=document.getElementById("settings-body"),t=F().map(a=>({id:a.id,name:a.name,icon:a.icon}));z(s,t,()=>{Y(),G(),Q(),E(!0)}),e.classList.add("open"),i.classList.add("open")}function I(){var e,i;(e=document.getElementById("settings-modal"))==null||e.classList.remove("open"),(i=document.getElementById("settings-backdrop"))==null||i.classList.remove("open")}function Se(e){I();const i=document.getElementById("drawer"),s=document.getElementById("drawer-backdrop"),t=document.getElementById("drawer-title"),a=document.getElementById("drawer-body");te(t,a,e),i.classList.add("open"),s.classList.add("open")}function j(){var e,i;(e=document.getElementById("drawer"))==null||e.classList.remove("open"),(i=document.getElementById("drawer-backdrop"))==null||i.classList.remove("open")}document.addEventListener("DOMContentLoaded",ye);
