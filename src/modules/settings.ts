import type { DashboardSettings, Category, Theme } from '../types';
import { DEFAULT_SETTINGS } from '../types';
import { t } from './i18n';
import type { Lang } from './i18n';
import { setLang, getLang } from './i18n';

const STORAGE_KEY = 'dashboard-settings';

let _settings: DashboardSettings | null = null;

export function getSettings(): DashboardSettings {
  if (_settings) return _settings;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      _settings = { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
    } else {
      _settings = { ...DEFAULT_SETTINGS };
    }
  } catch {
    _settings = { ...DEFAULT_SETTINGS };
  }
  return _settings!;
}

export function saveSettings(settings: DashboardSettings): void {
  _settings = settings;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

export function applyTheme(theme: Theme): void {
  document.documentElement.classList.remove('light', 'dim');
  if (theme !== 'dark') {
    document.documentElement.classList.add(theme);
  }
}

export function renderSettingsPanel(
  container: HTMLElement,
  sources: { id: string; name: string; icon: string }[],
  onChange: () => void,
): void {
  const settings = getSettings();
  const currentLang = getLang();

  container.innerHTML = `
    <div class="settings-section">
      <div class="settings-section-title">${t('settings.sources')}</div>
      <div class="settings-sources">
        ${sources.map(s => `
          <label class="settings-toggle">
            <input type="checkbox" data-source="${s.id}" ${settings.sources[s.id] !== false ? 'checked' : ''} />
            <span class="toggle-switch"></span>
            <span class="settings-toggle-icon">${s.icon}</span>
            <span class="settings-toggle-label">${s.name}</span>
          </label>
        `).join('')}
      </div>
    </div>

    <div class="settings-section">
      <div class="settings-section-title">${t('settings.interests')}</div>
      <div class="settings-interests">
        ${(['ai', 'dev', 'tech', 'market', 'science', 'general'] as Category[]).map(cat => `
          <label class="settings-chip-toggle">
            <input type="checkbox" data-interest="${cat}" ${settings.interests.includes(cat) ? 'checked' : ''} />
            <span class="settings-chip-label">${t('interest.' + cat)}</span>
          </label>
        `).join('')}
      </div>
    </div>

    <div class="settings-section">
      <div class="settings-section-title">${t('settings.display')}</div>
      <div class="settings-row">
        <label class="settings-radio">
          <input type="radio" name="displayMode" value="cards" ${settings.displayMode === 'cards' ? 'checked' : ''} />
          <span>${t('settings.cards')}</span>
        </label>
        <label class="settings-radio">
          <input type="radio" name="displayMode" value="compact" ${settings.displayMode === 'compact' ? 'checked' : ''} />
          <span>${t('settings.compact')}</span>
        </label>
      </div>
    </div>

    <div class="settings-section">
      <div class="settings-section-title">${t('settings.sort')}</div>
      <div class="settings-row">
        <label class="settings-radio">
          <input type="radio" name="sortBy" value="priority" ${settings.sortBy === 'priority' ? 'checked' : ''} />
          <span>${t('settings.priority')}</span>
        </label>
        <label class="settings-radio">
          <input type="radio" name="sortBy" value="newest" ${settings.sortBy === 'newest' ? 'checked' : ''} />
          <span>${t('settings.newest')}</span>
        </label>
        <label class="settings-radio">
          <input type="radio" name="sortBy" value="engagement" ${settings.sortBy === 'engagement' ? 'checked' : ''} />
          <span>${t('settings.engagement')}</span>
        </label>
      </div>
    </div>

    <div class="settings-section">
      <div class="settings-section-title">${t('settings.theme')}</div>
      <div class="settings-row">
        ${(['dark', 'dim', 'light'] as Theme[]).map(theme => `
          <label class="settings-radio">
            <input type="radio" name="theme" value="${theme}" ${settings.theme === theme ? 'checked' : ''} />
            <span>${t('theme.' + theme)}</span>
          </label>
        `).join('')}
      </div>
    </div>

    <div class="settings-section">
      <div class="settings-section-title">${t('settings.language')}</div>
      <div class="settings-row">
        <label class="settings-radio">
          <input type="radio" name="language" value="de" ${currentLang === 'de' ? 'checked' : ''} />
          <span>Deutsch</span>
        </label>
        <label class="settings-radio">
          <input type="radio" name="language" value="en" ${currentLang === 'en' ? 'checked' : ''} />
          <span>English</span>
        </label>
      </div>
    </div>
  `;

  // Wire source toggles
  container.querySelectorAll('input[data-source]').forEach(input => {
    input.addEventListener('change', () => {
      const id = (input as HTMLInputElement).dataset.source!;
      settings.sources[id] = (input as HTMLInputElement).checked;
      saveSettings(settings);
      onChange();
    });
  });

  // Wire interest toggles
  container.querySelectorAll('input[data-interest]').forEach(input => {
    input.addEventListener('change', () => {
      const interests: Category[] = [];
      container.querySelectorAll('input[data-interest]:checked').forEach(cb => {
        interests.push((cb as HTMLInputElement).dataset.interest as Category);
      });
      settings.interests = interests;
      saveSettings(settings);
      onChange();
    });
  });

  // Wire display mode
  container.querySelectorAll('input[name="displayMode"]').forEach(input => {
    input.addEventListener('change', () => {
      settings.displayMode = (input as HTMLInputElement).value as 'cards' | 'compact';
      saveSettings(settings);
      onChange();
    });
  });

  // Wire sort
  container.querySelectorAll('input[name="sortBy"]').forEach(input => {
    input.addEventListener('change', () => {
      settings.sortBy = (input as HTMLInputElement).value as 'priority' | 'newest' | 'engagement';
      saveSettings(settings);
      onChange();
    });
  });

  // Wire theme
  container.querySelectorAll('input[name="theme"]').forEach(input => {
    input.addEventListener('change', () => {
      const theme = (input as HTMLInputElement).value as Theme;
      settings.theme = theme;
      saveSettings(settings);
      applyTheme(theme);
    });
  });

  // Wire language
  container.querySelectorAll('input[name="language"]').forEach(input => {
    input.addEventListener('change', () => {
      const lang = (input as HTMLInputElement).value as Lang;
      settings.language = lang;
      saveSettings(settings);
      setLang(lang);
      // Re-render entire settings panel with new language
      renderSettingsPanel(container, sources, onChange);
      onChange();
    });
  });
}
