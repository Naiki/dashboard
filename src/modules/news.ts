import type { NewsItem, NewsSource, Category, DashboardSettings } from '../types';
import { getSettings } from './settings';
import { t } from './i18n';

// ── Source Registry ──────────────────────────────────────────
const sources: NewsSource[] = [];

export function getSources(): NewsSource[] {
  return sources;
}

// ── Hacker News ─────────────────────────────────────────────
sources.push({
  id: 'hackernews',
  name: 'Hacker News',
  icon: '\u{1F7E0}',
  color: '#ff6600',
  enabled: true,
  fetchFn: async (): Promise<NewsItem[]> => {
    try {
      const res = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
      const ids: number[] = await res.json();
      const items = await Promise.all(
        ids.slice(0, 20).map(async (id): Promise<NewsItem | null> => {
          try {
            const r = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
            const s = await r.json();
            if (!s?.title) return null;
            return {
              id: `hn-${s.id}`,
              source: 'Hacker News',
              sourceId: 'hackernews',
              title: s.title,
              summary: s.url
                ? new URL(s.url).hostname.replace('www.', '')
                : `${s.descendants || 0} comments`,
              url: s.url || `https://news.ycombinator.com/item?id=${s.id}`,
              timestamp: new Date(s.time * 1000).toISOString(),
              category: categorize(s.title),
              icon: '\u{1F7E0}',
              engagement: { upvotes: s.score || 0, comments: s.descendants || 0 },
              tags: extractTags(s.title),
            };
          } catch { return null; }
        }),
      );
      return items.filter((x): x is NewsItem => x !== null);
    } catch { return []; }
  },
});

// ── Dev.to ──────────────────────────────────────────────────
sources.push({
  id: 'devto',
  name: 'Dev.to',
  icon: '\u{1F4BB}',
  color: '#3b49df',
  enabled: true,
  fetchFn: async (): Promise<NewsItem[]> => {
    try {
      const res = await fetch('https://dev.to/api/articles?per_page=15&top=1');
      const articles: any[] = await res.json();
      return articles.map((a) => ({
        id: `devto-${a.id}`,
        source: 'Dev.to',
        sourceId: 'devto',
        title: a.title,
        summary: a.description?.substring(0, 200) || '',
        url: a.url,
        timestamp: a.published_at,
        category: 'dev' as Category,
        icon: '\u{1F4BB}',
        thumbnail: a.cover_image || a.social_image || undefined,
        engagement: {
          upvotes: a.public_reactions_count || 0,
          comments: a.comments_count || 0,
        },
        tags: (a.tag_list || []).slice(0, 4),
      }));
    } catch { return []; }
  },
});

// ── GitHub Trending ─────────────────────────────────────────
sources.push({
  id: 'github-trending',
  name: 'GitHub',
  icon: '\u{2B50}',
  color: '#238636',
  enabled: true,
  fetchFn: async (): Promise<NewsItem[]> => {
    try {
      const since = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0];
      const res = await fetch(
        `https://api.github.com/search/repositories?q=created:>${since}&sort=stars&order=desc&per_page=10`,
      );
      const data = await res.json();
      return (data.items || []).map((r: any) => ({
        id: `gh-${r.id}`,
        source: 'GitHub',
        sourceId: 'github-trending',
        title: r.full_name,
        summary: (r.description || 'No description').substring(0, 200),
        url: r.html_url,
        timestamp: r.created_at,
        category: categorize(r.description || r.full_name),
        icon: '\u{2B50}',
        thumbnail: r.owner?.avatar_url || undefined,
        engagement: { upvotes: r.stargazers_count || 0, comments: r.forks_count || 0 },
        tags: [r.language, ...(r.topics || [])].filter(Boolean).slice(0, 4),
      }));
    } catch { return []; }
  },
});

// ── Reddit r/programming ────────────────────────────────────
sources.push({
  id: 'reddit-programming',
  name: 'r/programming',
  icon: '\u{1F4D0}',
  color: '#ff4500',
  enabled: true,
  fetchFn: () => fetchReddit('programming'),
});

// ── Reddit r/technology ─────────────────────────────────────
sources.push({
  id: 'reddit-technology',
  name: 'r/technology',
  icon: '\u{1F4F1}',
  color: '#ff4500',
  enabled: true,
  fetchFn: () => fetchReddit('technology'),
});

// ── Reddit r/artificial ─────────────────────────────────────
sources.push({
  id: 'reddit-ai',
  name: 'r/artificial',
  icon: '\u{1F916}',
  color: '#ff4500',
  enabled: true,
  fetchFn: () => fetchReddit('artificial'),
});

// ── Lobsters ────────────────────────────────────────────────
sources.push({
  id: 'lobsters',
  name: 'Lobsters',
  icon: '\u{1F99E}',
  color: '#ac130d',
  enabled: true,
  fetchFn: async (): Promise<NewsItem[]> => {
    try {
      const res = await fetch('https://lobste.rs/hottest.json');
      const stories: any[] = await res.json();
      return stories.slice(0, 15).map((s) => ({
        id: `lob-${s.short_id}`,
        source: 'Lobsters',
        sourceId: 'lobsters',
        title: s.title,
        summary: s.url
          ? new URL(s.url).hostname.replace('www.', '')
          : s.description?.substring(0, 200) || '',
        url: s.url || s.comments_url,
        timestamp: s.created_at,
        category: categorizeLobsters(s.tags || []),
        icon: '\u{1F99E}',
        engagement: { upvotes: s.score || 0, comments: s.comment_count || 0 },
        tags: (s.tags || []).slice(0, 4),
      }));
    } catch { return []; }
  },
});

// ── Reddit Fetch Helper ─────────────────────────────────────
async function fetchReddit(subreddit: string): Promise<NewsItem[]> {
  try {
    const res = await fetch(
      `https://www.reddit.com/r/${subreddit}/hot.json?limit=15&raw_json=1`,
      { headers: { Accept: 'application/json' } },
    );
    const data = await res.json();
    const posts = data?.data?.children || [];
    return posts
      .filter((p: any) => !p.data.stickied)
      .map((p: any) => {
        const d = p.data;
        const preview = d.preview?.images?.[0]?.source?.url;
        const thumb = d.thumbnail && d.thumbnail.startsWith('http') ? d.thumbnail : undefined;
        return {
          id: `reddit-${d.id}`,
          source: `r/${subreddit}`,
          sourceId: `reddit-${subreddit}`,
          title: d.title,
          summary:
            d.selftext?.substring(0, 200) ||
            (d.url && !d.is_self ? new URL(d.url).hostname.replace('www.', '') : ''),
          url: d.url_overridden_by_dest || `https://reddit.com${d.permalink}`,
          timestamp: new Date(d.created_utc * 1000).toISOString(),
          category: subreddit === 'artificial' ? ('ai' as Category) : categorize(d.title),
          icon: subreddit === 'artificial' ? '\u{1F916}' : subreddit === 'programming' ? '\u{1F4D0}' : '\u{1F4F1}',
          thumbnail: preview || thumb,
          engagement: { upvotes: d.ups || 0, comments: d.num_comments || 0 },
          tags: d.link_flair_text ? [d.link_flair_text] : [],
        } as NewsItem;
      });
  } catch { return []; }
}

// ── Public API ───────────────────────────────────────────────
export function registerNewsSource(source: NewsSource): void {
  sources.push(source);
}

// ── Categorization ──────────────────────────────────────────
const AI_KEYWORDS =
  /\b(ai|gpt|llm|claude|openai|anthropic|gemini|machine.?learning|neural|transformer|diffusion|copilot|chatgpt|mistral|llama|deep.?learning|rag|embedding)\b/i;
const MARKET_KEYWORDS =
  /\b(startup|funding|ipo|valuation|acquisition|revenue|billion|million|series.[a-d]|layoff|hire)\b/i;
const SCIENCE_KEYWORDS =
  /\b(research|paper|study|physics|biology|quantum|space|nasa|arxiv|nature|science)\b/i;

function categorize(title: string): Category {
  if (AI_KEYWORDS.test(title)) return 'ai';
  if (SCIENCE_KEYWORDS.test(title)) return 'science';
  if (MARKET_KEYWORDS.test(title)) return 'market';
  if (
    /\b(rust|python|javascript|typescript|go|java|react|vue|svelte|docker|kubernetes|git|api|framework|library|npm|crate|compiler)\b/i.test(
      title,
    )
  )
    return 'dev';
  return 'tech';
}

function categorizeLobsters(tags: string[]): Category {
  const joined = tags.join(' ');
  if (/ai|ml|machine.learning/i.test(joined)) return 'ai';
  if (/science|research|math/i.test(joined)) return 'science';
  return 'dev';
}

// ── Tag Extraction ──────────────────────────────────────────
function extractTags(title: string): string[] {
  const tags: string[] = [];
  if (AI_KEYWORDS.test(title)) tags.push('AI');
  if (/\b(rust)\b/i.test(title)) tags.push('Rust');
  if (/\b(python)\b/i.test(title)) tags.push('Python');
  if (/\b(javascript|typescript|js|ts)\b/i.test(title)) tags.push('JS/TS');
  if (/\b(go|golang)\b/i.test(title)) tags.push('Go');
  if (/\b(react|vue|svelte|angular)\b/i.test(title)) tags.push('Frontend');
  if (/\b(docker|kubernetes|k8s)\b/i.test(title)) tags.push('DevOps');
  if (/\b(linux|kernel|os)\b/i.test(title)) tags.push('Linux');
  if (/\b(security|vulnerability|hack|exploit)\b/i.test(title)) tags.push('Security');
  if (SCIENCE_KEYWORDS.test(title)) tags.push('Science');
  return tags.slice(0, 3);
}

// ── Smart Priority Scoring ──────────────────────────────────
function computePriority(item: NewsItem): number {
  const settings = getSettings();
  let score = 0;

  score += Math.min(Math.log2(item.engagement.upvotes + 1) * 0.8, 6);
  score += Math.min(Math.log2(item.engagement.comments + 1) * 0.6, 4);

  const interestBoost = settings.interests.includes(item.category) ? 3 : 0;
  const categoryScores: Record<string, number> = {
    ai: 4, dev: 2, science: 2, tech: 1, market: 1, general: 0,
  };
  score += (categoryScores[item.category] || 0) + interestBoost;

  const ageH = (Date.now() - new Date(item.timestamp).getTime()) / 3600000;
  if (ageH < 1) score += 5;
  else if (ageH < 3) score += 3;
  else if (ageH < 12) score += 1.5;
  else if (ageH < 24) score += 0.5;

  if (AI_KEYWORDS.test(item.title)) score += 2;
  if (item.thumbnail) score += 0.5;

  return Math.round(score * 10) / 10;
}

// ── Topic Clustering ────────────────────────────────────────
const STOP_WORDS = new Set([
  'the', 'and', 'for', 'that', 'this', 'with', 'from', 'your', 'have', 'are',
  'not', 'but', 'was', 'has', 'been', 'will', 'can', 'its', 'how', 'why',
  'what', 'when', 'who', 'which', 'about', 'into', 'than', 'them', 'then',
  'just', 'more', 'some', 'also', 'like', 'over', 'nach', 'eine', 'wird',
  'sich', 'oder', 'auch', 'noch', 'hier', 'does', 'using', 'used', 'new',
  'show', 'make', 'made',
]);

function clusterTopics(items: NewsItem[]): void {
  // Reset clusters
  for (const item of items) {
    item._cluster = undefined;
    item._clusterSize = undefined;
  }

  const clusters = new Map<string, NewsItem[]>();

  for (const item of items) {
    const words = item.title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter((w) => w.length > 3 && !STOP_WORDS.has(w));

    let matched = false;
    for (const [key, cluster] of clusters) {
      const keyWords = new Set(key.split('|'));
      const overlap = words.filter((w) => keyWords.has(w)).length;
      if (overlap >= 2) {
        cluster.push(item);
        item._cluster = key;
        matched = true;
        break;
      }
    }

    if (!matched && words.length >= 2) {
      const key = words.slice(0, 5).join('|');
      clusters.set(key, [item]);
      item._cluster = key;
    }
  }

  for (const [, cluster] of clusters) {
    const uniqueSources = new Set(cluster.map((i) => i.sourceId));
    for (const item of cluster) {
      item._clusterSize = uniqueSources.size;
      if (uniqueSources.size > 1) {
        item._priority = (item._priority || 0) + uniqueSources.size * 1.5;
      }
    }
  }
}

// ── Process items (score + cluster + sort) ──────────────────
function processItems(items: NewsItem[], settings: DashboardSettings): void {
  for (const item of items) {
    item._priority = computePriority(item);
  }
  clusterTopics(items);
  sortItems(items, settings.sortBy);
}

// ── Progressive Fetch ───────────────────────────────────────
let _cache: { items: NewsItem[]; fetchedAt: number } | null = null;

export async function fetchNewsProgressively(
  onUpdate: (items: NewsItem[], done: number, total: number) => void,
  forceRefresh = false,
): Promise<NewsItem[]> {
  // Return cache if fresh
  if (!forceRefresh && _cache && Date.now() - _cache.fetchedAt < 120000) {
    onUpdate(_cache.items, -1, -1);
    return _cache.items;
  }

  const settings = getSettings();
  const enabled = sources.filter((s) => s.enabled && settings.sources[s.id] !== false);
  const allItems: NewsItem[] = [];
  let done = 0;

  const promises = enabled.map(async (source) => {
    try {
      const items = await source.fetchFn();
      allItems.push(...items);
    } catch {
      // Source failed, continue
    }
    done++;
    processItems(allItems, settings);
    onUpdate([...allItems], done, enabled.length);
  });

  await Promise.allSettled(promises);
  _cache = { items: [...allItems], fetchedAt: Date.now() };
  return allItems;
}

// Legacy sync fetch (for re-filtering cached data)
export async function fetchAllNews(forceRefresh = false): Promise<NewsItem[]> {
  if (!forceRefresh && _cache && Date.now() - _cache.fetchedAt < 120000) {
    return _cache.items;
  }

  const settings = getSettings();
  const enabled = sources.filter((s) => s.enabled && settings.sources[s.id] !== false);
  const results = await Promise.allSettled(enabled.map((s) => s.fetchFn()));

  const items: NewsItem[] = [];
  for (const r of results) {
    if (r.status === 'fulfilled') items.push(...r.value);
  }

  processItems(items, settings);
  _cache = { items, fetchedAt: Date.now() };
  return items;
}

function sortItems(items: NewsItem[], sortBy: string): void {
  switch (sortBy) {
    case 'newest':
      items.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      break;
    case 'engagement':
      items.sort(
        (a, b) =>
          b.engagement.upvotes + b.engagement.comments -
          (a.engagement.upvotes + a.engagement.comments),
      );
      break;
    default:
      items.sort((a, b) => (b._priority || 0) - (a._priority || 0));
      break;
  }
}

// ── Filter ──────────────────────────────────────────────────
export function filterByHours(items: NewsItem[], hours: number): NewsItem[] {
  const cutoff = Date.now() - hours * 3600000;
  return items.filter((item) => new Date(item.timestamp).getTime() >= cutoff);
}

export function filterByCategory(items: NewsItem[], category: Category | 'all'): NewsItem[] {
  if (category === 'all') return items;
  return items.filter((item) => item.category === category);
}

// ── Group by Time ───────────────────────────────────────────
interface TimeGroup {
  label: string;
  items: NewsItem[];
}

export function groupByTime(items: NewsItem[]): TimeGroup[] {
  const now = Date.now();
  const groups: TimeGroup[] = [
    { label: t('time.lastHour'), items: [] },
    { label: t('time.last3h'), items: [] },
    { label: t('time.today'), items: [] },
    { label: t('time.yesterday'), items: [] },
    { label: t('time.thisWeek'), items: [] },
    { label: t('time.older'), items: [] },
  ];

  for (const item of items) {
    const age = now - new Date(item.timestamp).getTime();
    const hours = age / 3600000;
    if (hours < 1) groups[0].items.push(item);
    else if (hours < 3) groups[1].items.push(item);
    else if (hours < 24) groups[2].items.push(item);
    else if (hours < 48) groups[3].items.push(item);
    else if (hours < 168) groups[4].items.push(item);
    else groups[5].items.push(item);
  }

  return groups.filter((g) => g.items.length > 0);
}

// ── Render ──────────────────────────────────────────────────
const CAT_COLORS: Record<string, string> = {
  ai: '#a78bfa',
  dev: '#34d399',
  tech: '#60a5fa',
  market: '#fbbf24',
  science: '#f472b6',
  general: '#94a3b8',
};

const SOURCE_COLORS: Record<string, string> = {
  hackernews: '#ff6600',
  devto: '#3b49df',
  'github-trending': '#238636',
  'reddit-programming': '#ff4500',
  'reddit-technology': '#ff4500',
  'reddit-ai': '#ff4500',
  lobsters: '#ac130d',
};

export function renderNews(container: HTMLElement, items: NewsItem[]): void {
  const settings = getSettings();

  if (items.length === 0) {
    container.innerHTML = `
      <div class="feed-empty">
        <div class="feed-empty-icon">\u{1F4ED}</div>
        <p>${t('news.empty')}</p>
      </div>`;
    return;
  }

  container.innerHTML = '';
  const groups = groupByTime(items);

  for (const group of groups) {
    const header = document.createElement('div');
    header.className = 'feed-group-header';
    header.innerHTML = `<span>${group.label}</span><span class="feed-group-count">${group.items.length}</span>`;
    container.appendChild(header);

    for (const item of group.items) {
      const priority = item._priority || 0;
      const priorityClass =
        priority >= 10 ? 'priority-high' : priority >= 5 ? 'priority-medium' : 'priority-low';
      const isCards = settings.displayMode === 'cards';

      const el = document.createElement('div');
      el.className = `news-item ${priorityClass} ${isCards ? 'card-mode' : 'compact-mode'}`;

      const sourceColor = SOURCE_COLORS[item.sourceId] || '#666';
      const catColor = CAT_COLORS[item.category] || '#94a3b8';

      el.innerHTML = `
        ${
          item.thumbnail && isCards
            ? `<div class="news-thumb"><img src="${escapeAttr(item.thumbnail)}" alt="" loading="lazy" onerror="this.parentElement.remove()" /></div>`
            : ''
        }
        <div class="news-content">
          <div class="news-header">
            <span class="news-source-badge" style="--source-color: ${sourceColor}">${escapeHtml(item.source)}</span>
            <span class="news-time">${formatTime(item.timestamp)}</span>
            ${
              (item._clusterSize || 0) > 1
                ? `<span class="news-multi-source">${t('news.sources', { n: item._clusterSize || 0 })}</span>`
                : ''
            }
          </div>
          <div class="news-title">${escapeHtml(item.title)}</div>
          ${item.summary ? `<div class="news-summary">${escapeHtml(item.summary)}</div>` : ''}
          <div class="news-footer">
            <div class="news-stats">
              <span class="news-stat" title="${t('news.upvotes')}">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                ${formatNumber(item.engagement.upvotes)}
              </span>
              <span class="news-stat" title="${t('news.comments')}">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                ${formatNumber(item.engagement.comments)}
              </span>
              <span class="news-score-badge ${priority >= 10 ? 'high' : priority >= 5 ? 'medium' : 'low'}">${Math.round(priority)}</span>
            </div>
            <div class="news-tags">
              <span class="news-cat-tag" style="--cat-color: ${catColor}">${t('cat.' + item.category)}</span>
              ${item.tags.map((tag) => `<span class="news-tag">${escapeHtml(tag)}</span>`).join('')}
            </div>
          </div>
        </div>
        <div class="news-detail">
          <div class="news-detail-body">
            ${item.summary ? `<p class="news-detail-summary">${escapeHtml(item.summary)}</p>` : ''}
            <div class="news-detail-stats">
              <span><strong>${formatNumber(item.engagement.upvotes)}</strong> ${t('news.upvotes')}</span>
              <span><strong>${formatNumber(item.engagement.comments)}</strong> ${t('news.comments')}</span>
              <span class="news-detail-source">${escapeHtml(item.source)}</span>
            </div>
            ${item.tags.length > 0 ? `<div class="news-detail-tags">${item.tags.map((tag) => `<span class="news-tag">${escapeHtml(tag)}</span>`).join('')}</div>` : ''}
          </div>
          ${
            item.url
              ? `<a class="news-detail-link" href="${escapeAttr(item.url)}" target="_blank" rel="noopener">
              ${t('news.open')}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
            </a>`
              : ''
          }
        </div>
      `;

      el.addEventListener('click', (e) => {
        if ((e.target as HTMLElement).closest('.news-detail-link')) return;
        el.classList.toggle('expanded');
      });

      container.appendChild(el);
    }
  }
}

function formatTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return t('time.justNow');
  if (m < 60) return t('time.mAgo', { n: m });
  const h = Math.floor(m / 60);
  if (h < 24) return t('time.hAgo', { n: h });
  const d = Math.floor(h / 24);
  return t('time.dAgo', { n: d });
}

function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
