import type { Project } from './types';

/**
 * Registered projects.
 * Add new projects here - the dashboard renders them automatically.
 */
export const projects: Project[] = [
  {
    id: 'ideas',
    name: 'Wissenssystem',
    description:
      'Persistentes Forschungssystem mit adversarial-getesteten Prinzipien (P1-P4), ' +
      'Wissensgraph und Bootstrap-Protokoll.',
    path: 'c:\\Users\\Sven\\Desktop\\Ideas',
    status: 'active',
    color: '#8b5cf6',
    icon: '\u{1F9E0}',
    tags: ['Forschung', 'Wissen', 'Adversarial'],
    links: [
      { label: 'Bootstrap', url: 'CLAUDE_BOOTSTRAP.md' },
      { label: 'Graph', url: 'GRAPH.md' },
    ],
  },
  {
    id: 'content-creator',
    name: 'Content Factory',
    description:
      'Automatisierte Multi-Plattform Content-Erstellung: ' +
      'Research, Scriptwriting, Voiceover, Video-Assembly, Upload.',
    path: 'c:\\Users\\Sven\\Desktop\\ContentCreator',
    status: 'active',
    color: '#f59e0b',
    icon: '\u{1F3AC}',
    tags: ['Video', 'Automatisierung', 'Monetarisierung'],
    links: [
      { label: 'CLI', url: 'scripts/cli.py' },
      { label: 'Pipeline', url: 'scripts/pipeline.py' },
    ],
  },
  {
    id: 'remotion-video',
    name: 'Video Studio',
    description:
      'Programmatische Videogenerierung mit Remotion + Claude Code. ' +
      'React-Komponenten als Frames, natuerliche Sprache als Input.',
    path: 'c:\\Users\\Sven\\Desktop\\my-video',
    status: 'active',
    color: '#f472b6',
    icon: '\u{1F3A5}',
    tags: ['Remotion', 'Video', 'React', 'AI'],
    links: [
      { label: 'Studio', url: 'npm run dev' },
      { label: 'Render', url: 'npm run render' },
    ],
  },
];