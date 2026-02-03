// ── Projects ────────────────────────────────────────────────
export interface Project {
  id: string;
  name: string;
  description: string;
  path: string;
  status: 'active' | 'paused' | 'archived';
  color: string;
  icon: string;
  tags: string[];
  lastActivity?: string;
  links?: { label: string; url: string }[];
}

// ── News ────────────────────────────────────────────────────
export type Category = 'tech' | 'ai' | 'dev' | 'market' | 'science' | 'general';

export interface NewsItem {
  id: string;
  source: string;
  sourceId: string;
  title: string;
  summary?: string;
  url?: string;
  timestamp: string;
  category: Category;
  icon?: string;
  thumbnail?: string;
  engagement: {
    upvotes: number;
    comments: number;
  };
  tags: string[];
  _priority?: number;
  _cluster?: string;
  _clusterSize?: number;
}

export interface NewsSource {
  id: string;
  name: string;
  icon: string;
  color: string;
  enabled: boolean;
  fetchFn: () => Promise<NewsItem[]>;
}

// ── Settings ────────────────────────────────────────────────
export type Theme = 'dark' | 'dim' | 'light';

export interface DashboardSettings {
  sources: Record<string, boolean>;
  interests: Category[];
  displayMode: 'cards' | 'compact';
  sortBy: 'priority' | 'newest' | 'engagement';
  defaultHours: number;
  theme: Theme;
  language: 'de' | 'en';
  categoryFilter: Category | 'all';
}

export const DEFAULT_SETTINGS: DashboardSettings = {
  sources: {
    'hackernews': true,
    'devto': true,
    'github-trending': true,
    'reddit-programming': true,
    'reddit-technology': true,
    'reddit-ai': true,
    'lobsters': true,
  },
  interests: ['ai', 'dev', 'tech'],
  displayMode: 'cards',
  sortBy: 'priority',
  defaultHours: 24,
  theme: 'dark',
  language: 'de',
  categoryFilter: 'all',
};
