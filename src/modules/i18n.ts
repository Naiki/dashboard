export type Lang = 'de' | 'en';

let _lang: Lang = (localStorage.getItem('dashboard-lang') as Lang) || 'de';

const strings: Record<Lang, Record<string, string>> = {
  de: {
    // Nav
    dashboard: 'Dashboard',
    news: 'News',
    projects: 'Projekte',
    settings: 'Einstellungen',
    theme: 'Theme',
    refresh: 'Aktualisieren',

    // Time groups
    'time.lastHour': 'Letzte Stunde',
    'time.last3h': 'Letzte 3 Stunden',
    'time.today': 'Heute',
    'time.yesterday': 'Gestern',
    'time.thisWeek': 'Diese Woche',
    'time.older': 'Aelter',

    // Relative time
    'time.justNow': 'gerade eben',
    'time.mAgo': 'vor {n}m',
    'time.hAgo': 'vor {n}h',
    'time.dAgo': 'vor {n}d',

    // News
    'news.empty': 'Keine News in diesem Zeitraum',
    'news.error': 'News konnten nicht geladen werden.',
    'news.open': 'Artikel oeffnen',
    'news.sources': '{n} Quellen',
    'news.comments': 'Kommentare',
    'news.upvotes': 'Upvotes',
    'news.loading': 'Lade {n} von {total} Quellen\u2026',
    'news.readMore': 'Mehr anzeigen',

    // Categories
    'cat.tech': 'Tech',
    'cat.ai': 'AI',
    'cat.dev': 'Dev',
    'cat.market': 'Markt',
    'cat.science': 'Science',
    'cat.general': 'Allg.',
    'cat.all': 'Alle',

    // Settings
    'settings.sources': 'Quellen',
    'settings.interests': 'Interessen',
    'settings.display': 'Anzeige',
    'settings.sort': 'Sortierung',
    'settings.theme': 'Theme',
    'settings.language': 'Sprache',
    'settings.cards': 'Karten',
    'settings.compact': 'Kompakt',
    'settings.priority': 'Prioritaet',
    'settings.newest': 'Neueste',
    'settings.engagement': 'Engagement',

    // Themes
    'theme.dark': 'Dunkel',
    'theme.dim': 'Gedimmt',
    'theme.light': 'Hell',

    // Projects
    'project.active': 'Aktiv',
    'project.paused': 'Pausiert',
    'project.archived': 'Archiviert',
    'project.details': 'Details',
    'project.status': 'Status',
    'project.path': 'Pfad',
    'project.color': 'Farbe',
    'project.tags': 'Tags',
    'project.files': 'Dateien',
    'project.description': 'Beschreibung',

    // Interest labels
    'interest.ai': 'AI / ML',
    'interest.dev': 'Development',
    'interest.tech': 'Tech',
    'interest.market': 'Markt',
    'interest.science': 'Wissenschaft',
    'interest.general': 'Allgemein',
  },
  en: {
    dashboard: 'Dashboard',
    news: 'News',
    projects: 'Projects',
    settings: 'Settings',
    theme: 'Theme',
    refresh: 'Refresh',

    'time.lastHour': 'Last Hour',
    'time.last3h': 'Last 3 Hours',
    'time.today': 'Today',
    'time.yesterday': 'Yesterday',
    'time.thisWeek': 'This Week',
    'time.older': 'Older',

    'time.justNow': 'just now',
    'time.mAgo': '{n}m ago',
    'time.hAgo': '{n}h ago',
    'time.dAgo': '{n}d ago',

    'news.empty': 'No news in this time period',
    'news.error': 'Could not load news.',
    'news.open': 'Open article',
    'news.sources': '{n} sources',
    'news.comments': 'Comments',
    'news.upvotes': 'Upvotes',
    'news.loading': 'Loading {n} of {total} sources\u2026',
    'news.readMore': 'Read more',

    'cat.tech': 'Tech',
    'cat.ai': 'AI',
    'cat.dev': 'Dev',
    'cat.market': 'Market',
    'cat.science': 'Science',
    'cat.general': 'General',
    'cat.all': 'All',

    'settings.sources': 'Sources',
    'settings.interests': 'Interests',
    'settings.display': 'Display',
    'settings.sort': 'Sort',
    'settings.theme': 'Theme',
    'settings.language': 'Language',
    'settings.cards': 'Cards',
    'settings.compact': 'Compact',
    'settings.priority': 'Priority',
    'settings.newest': 'Newest',
    'settings.engagement': 'Engagement',

    'theme.dark': 'Dark',
    'theme.dim': 'Dim',
    'theme.light': 'Light',

    'project.active': 'Active',
    'project.paused': 'Paused',
    'project.archived': 'Archived',
    'project.details': 'Details',
    'project.status': 'Status',
    'project.path': 'Path',
    'project.color': 'Color',
    'project.tags': 'Tags',
    'project.files': 'Files',
    'project.description': 'Description',

    'interest.ai': 'AI / ML',
    'interest.dev': 'Development',
    'interest.tech': 'Tech',
    'interest.market': 'Market',
    'interest.science': 'Science',
    'interest.general': 'General',
  },
};

export function t(key: string, params?: Record<string, string | number>): string {
  let str = strings[_lang][key] || strings.de[key] || key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      str = str.replace(`{${k}}`, String(v));
    }
  }
  return str;
}

export function getLang(): Lang {
  return _lang;
}

export function setLang(lang: Lang): void {
  _lang = lang;
  localStorage.setItem('dashboard-lang', lang);
}