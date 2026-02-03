import './style.css';

// ── PWA Service Worker ──────────────────────────────────────
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}
import { projects } from './config';
import { renderProjects, renderProjectDrawer } from './modules/projects';
import {
  fetchNewsProgressively,
  filterByHours,
  filterByCategory,
  renderNews,
  getSources,
} from './modules/news';
import { getSettings, saveSettings, applyTheme, renderSettingsPanel } from './modules/settings';
import { t } from './modules/i18n';
import { setLang } from './modules/i18n';
import type { Project, Category } from './types';

// ── State ────────────────────────────────────────────────────
let currentHours = 24;
let currentCategory: Category | 'all' = 'all';
let allNews: any[] = [];

// ── Init ─────────────────────────────────────────────────────
function init(): void {
  const settings = getSettings();

  // Apply saved theme
  applyTheme(settings.theme);

  // Apply saved language
  if (settings.language) {
    setLang(settings.language);
  }

  // Theme toggle cycles: dark -> dim -> light -> dark
  document.getElementById('btn-theme')?.addEventListener('click', cycleTheme);

  // Sidebar
  const sidebarCollapsed = localStorage.getItem('sidebar') === 'collapsed';
  const sidebar = document.getElementById('sidebar')!;
  if (sidebarCollapsed) sidebar.classList.add('collapsed');
  document.getElementById('sidebar-toggle')?.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    localStorage.setItem(
      'sidebar',
      sidebar.classList.contains('collapsed') ? 'collapsed' : 'expanded',
    );
  });

  // Navigation
  document.querySelectorAll('.sidebar-link[data-view]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const view = (link as HTMLElement).dataset.view!;
      switchView(view);
    });
  });

  // Time filter chips
  currentHours = settings.defaultHours;
  document.querySelectorAll('.chip[data-hours]').forEach((chip) => {
    // Set active based on settings
    chip.classList.remove('active');
    if ((chip as HTMLElement).dataset.hours === String(currentHours)) {
      chip.classList.add('active');
    }
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip[data-hours]').forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      currentHours = parseInt((chip as HTMLElement).dataset.hours!, 10);
      applyFilter();
    });
  });

  // Category filter chips
  document.querySelectorAll('.cat-chip[data-category]').forEach((chip) => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.cat-chip').forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      currentCategory = (chip as HTMLElement).dataset.category! as Category | 'all';
      applyFilter();
    });
  });

  // Refresh
  document.getElementById('btn-refresh-news')?.addEventListener('click', () => {
    loadNews(true);
  });

  // Settings modal
  document.getElementById('btn-settings')?.addEventListener('click', openSettings);
  document.getElementById('settings-close')?.addEventListener('click', closeSettings);
  document.getElementById('settings-backdrop')?.addEventListener('click', closeSettings);

  // Drawer close
  document.getElementById('drawer-close')?.addEventListener('click', closeDrawer);
  document.getElementById('drawer-backdrop')?.addEventListener('click', closeDrawer);

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
      closeSettings();
    }
  });

  // Render source filter bar
  renderSourceBar();

  // Update i18n labels
  updateLabels();

  // Update category chips with i18n
  updateCategoryChips();

  // Projects
  const projectsList = document.getElementById('projects-list');
  if (projectsList) {
    renderProjects(projectsList, projects, openProjectDrawer);
  }

  // Load news progressively
  loadNews();

  // Auto-refresh every 5 minutes
  setInterval(() => loadNews(), 5 * 60 * 1000);
}

// ── i18n Label Update ────────────────────────────────────────
function updateLabels(): void {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = (el as HTMLElement).dataset.i18n!;
    el.textContent = t(key);
  });
}

function updateCategoryChips(): void {
  document.querySelectorAll('.cat-chip[data-category]').forEach((chip) => {
    const cat = (chip as HTMLElement).dataset.category!;
    chip.textContent = t('cat.' + cat);
  });
}

// ── Source Filter Bar ────────────────────────────────────────
function renderSourceBar(): void {
  const bar = document.getElementById('source-bar');
  if (!bar) return;
  const settings = getSettings();
  const sources = getSources();

  bar.innerHTML = sources
    .map(
      (s) => `
    <button class="source-chip ${settings.sources[s.id] !== false ? 'active' : ''}"
            data-source-id="${s.id}"
            style="--source-color: ${s.color}">
      <span class="source-chip-icon">${s.icon}</span>
      <span class="source-chip-name">${s.name}</span>
    </button>
  `,
    )
    .join('');

  bar.querySelectorAll('.source-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const id = (chip as HTMLElement).dataset.sourceId!;
      const isActive = chip.classList.contains('active');
      chip.classList.toggle('active');
      settings.sources[id] = !isActive;
      saveSettings(settings);
      loadNews(true);
    });
  });
}

// ── View Switching ───────────────────────────────────────────
function switchView(viewId: string): void {
  document.querySelectorAll('.view').forEach((v) => v.classList.remove('active'));
  document
    .querySelectorAll('.sidebar-link[data-view]')
    .forEach((l) => l.classList.remove('active'));

  document.getElementById(`view-${viewId}`)?.classList.add('active');
  document.querySelector(`.sidebar-link[data-view="${viewId}"]`)?.classList.add('active');
}

// ── Theme Cycling ────────────────────────────────────────────
function cycleTheme(): void {
  const settings = getSettings();
  const themes = ['dark', 'dim', 'light'] as const;
  const idx = themes.indexOf(settings.theme);
  const next = themes[(idx + 1) % themes.length];
  settings.theme = next;
  saveSettings(settings);
  applyTheme(next);
}

// ── News (Progressive Loading) ───────────────────────────────
async function loadNews(force = false): Promise<void> {
  const feed = document.getElementById('news-feed');
  const btn = document.getElementById('btn-refresh-news');
  const loadingEl = document.getElementById('news-loading');
  const loadingText = document.getElementById('loading-text');
  const loadingFill = document.getElementById('loading-bar-fill');
  if (!feed) return;

  btn?.classList.add('spinning');
  if (loadingEl) loadingEl.style.display = 'flex';

  try {
    await fetchNewsProgressively((items, done, total) => {
      allNews = items;

      // Update loading progress
      if (done >= 0 && loadingText && loadingFill) {
        loadingText.textContent = t('news.loading', { n: done, total });
        loadingFill.style.width = `${(done / total) * 100}%`;
        if (done === total && loadingEl) {
          loadingEl.style.display = 'none';
        }
      } else if (loadingEl) {
        // From cache
        loadingEl.style.display = 'none';
      }

      applyFilter();
    }, force);
  } catch {
    feed.innerHTML = `<div class="feed-empty"><p>${t('news.error')}</p></div>`;
  } finally {
    btn?.classList.remove('spinning');
    if (loadingEl) loadingEl.style.display = 'none';
  }
}

function applyFilter(): void {
  const feed = document.getElementById('news-feed');
  if (!feed) return;
  let filtered = filterByHours(allNews, currentHours);
  filtered = filterByCategory(filtered, currentCategory);
  renderNews(feed, filtered);
  updateNewsCount();
}

function updateNewsCount(): void {
  const count = document.getElementById('news-count');
  if (!count) return;
  let filtered = filterByHours(allNews, currentHours);
  filtered = filterByCategory(filtered, currentCategory);
  count.textContent = String(filtered.length);
}

// ── Settings ─────────────────────────────────────────────────
function openSettings(): void {
  const modal = document.getElementById('settings-modal')!;
  const backdrop = document.getElementById('settings-backdrop')!;
  const body = document.getElementById('settings-body')!;

  const sources = getSources().map((s) => ({ id: s.id, name: s.name, icon: s.icon }));
  renderSettingsPanel(body, sources, () => {
    renderSourceBar();
    updateLabels();
    updateCategoryChips();
    loadNews(true);
  });

  modal.classList.add('open');
  backdrop.classList.add('open');
}

function closeSettings(): void {
  document.getElementById('settings-modal')?.classList.remove('open');
  document.getElementById('settings-backdrop')?.classList.remove('open');
}

// ── Drawer ───────────────────────────────────────────────────
function openProjectDrawer(project: Project): void {
  const drawer = document.getElementById('drawer')!;
  const backdrop = document.getElementById('drawer-backdrop')!;
  const title = document.getElementById('drawer-title')!;
  const body = document.getElementById('drawer-body')!;

  renderProjectDrawer(title, body, project);

  drawer.classList.add('open');
  backdrop.classList.add('open');
}

function closeDrawer(): void {
  document.getElementById('drawer')?.classList.remove('open');
  document.getElementById('drawer-backdrop')?.classList.remove('open');
}

// ── Boot ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);
