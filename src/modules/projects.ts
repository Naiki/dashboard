import type { Project } from '../types';
import { t } from './i18n';

// ── Render project list ──────────────────────────────────────
export function renderProjects(
  container: HTMLElement,
  projects: Project[],
  onSelect: (project: Project) => void,
): void {
  container.innerHTML = '';

  for (const project of projects) {
    const statusLabel = t('project.' + project.status);
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <div class="project-icon">${project.icon}</div>
      <div class="project-info">
        <div class="project-name">${project.name}</div>
        <div class="project-desc">${project.description}</div>
      </div>
      <span class="project-status ${project.status}">${statusLabel}</span>
      <svg class="project-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
    `;
    card.addEventListener('click', () => onSelect(project));
    container.appendChild(card);
  }

  const counter = document.getElementById('project-count');
  if (counter) counter.textContent = String(projects.length);
}

// ── Render project detail in drawer ──────────────────────────
export function renderProjectDrawer(
  titleEl: HTMLElement,
  bodyEl: HTMLElement,
  project: Project,
): void {
  titleEl.textContent = `${project.icon} ${project.name}`;

  const statusLabel = t('project.' + project.status);

  bodyEl.innerHTML = `
    <div class="drawer-section">
      <div class="drawer-section-title">${t('project.details')}</div>
      <div class="drawer-field">
        <span class="drawer-field-label">${t('project.status')}</span>
        <span class="project-status ${project.status}">${statusLabel}</span>
      </div>
      <div class="drawer-field">
        <span class="drawer-field-label">${t('project.path')}</span>
        <span class="drawer-field-value">${project.path}</span>
      </div>
      <div class="drawer-field">
        <span class="drawer-field-label">${t('project.color')}</span>
        <span style="display:inline-block;width:14px;height:14px;border-radius:50%;background:${project.color}"></span>
      </div>
    </div>

    <div class="drawer-section">
      <div class="drawer-section-title">${t('project.tags')}</div>
      <div class="drawer-tags">
        ${project.tags.map((tag) => `<span class="drawer-tag">${tag}</span>`).join('')}
      </div>
    </div>

    ${project.links?.length ? `
      <div class="drawer-section">
        <div class="drawer-section-title">${t('project.files')}</div>
        <div class="drawer-links">
          ${project.links.map((l) => `
            <a class="drawer-link" href="#" title="${project.path}\\\\${l.url}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              ${l.label}
            </a>
          `).join('')}
        </div>
      </div>
    ` : ''}

    <div class="drawer-section">
      <div class="drawer-section-title">${t('project.description')}</div>
      <p style="font-size:0.85rem;color:var(--text-secondary);line-height:1.6">${project.description}</p>
    </div>
  `;
}
