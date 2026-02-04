import { t } from './i18n';

const VOICE_SERVER = 'http://localhost:3457';

interface VoiceStatus {
  [lineId: string]: { recorded: boolean; size?: number; format?: string };
}

interface ScriptInfo {
  id: string;
  title: string;
  description: string;
  lineCount: number;
}

/**
 * Renders the Voice Studio view in the dashboard.
 * Shows connection status, QR code for phone, and recording progress.
 */
export async function renderVoice(container: HTMLElement): Promise<void> {
  container.innerHTML = `
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
        <h2>${t('voice.title')}</h2>
        <p class="voice-desc">${t('voice.desc')}</p>
        <div class="voice-status" id="voice-server-status">
          <span class="voice-dot connecting"></span>
          <span>${t('voice.connecting')}</span>
        </div>
      </div>

      <div class="voice-connect-section" id="voice-connect" style="display:none">
        <div class="voice-card">
          <h3>${t('voice.phoneTitle')}</h3>
          <p class="voice-desc">${t('voice.phoneDesc')}</p>
          <div class="voice-url-box" id="voice-url-box">
            <code id="voice-url"></code>
            <button class="voice-copy-btn" id="voice-copy-btn" title="Kopieren">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
            </button>
          </div>
          <div class="voice-qr" id="voice-qr"></div>
          <a class="voice-open-btn" id="voice-open-link" href="#" target="_blank">${t('voice.openStudio')}</a>
        </div>

        <div class="voice-card" id="voice-progress-card">
          <h3>${t('voice.progress')}</h3>
          <div class="voice-lines" id="voice-lines"></div>
        </div>
      </div>

      <div class="voice-offline" id="voice-offline" style="display:none">
        <div class="voice-card">
          <h3>${t('voice.offlineTitle')}</h3>
          <p class="voice-desc">${t('voice.offlineDesc')}</p>
          <code class="voice-cmd">cd my-video && npm run voice</code>
        </div>
      </div>
    </div>
  `;

  checkConnection(container);
}

async function checkConnection(container: HTMLElement): Promise<void> {
  const statusEl = document.getElementById('voice-server-status');
  const connectEl = document.getElementById('voice-connect');
  const offlineEl = document.getElementById('voice-offline');

  try {
    const res = await fetch(VOICE_SERVER + '/api/scripts', { signal: AbortSignal.timeout(3000) });
    const scripts: ScriptInfo[] = await res.json();

    if (statusEl) {
      statusEl.innerHTML = `<span class="voice-dot online"></span><span>${t('voice.connected')}</span>`;
    }
    if (connectEl) connectEl.style.display = '';
    if (offlineEl) offlineEl.style.display = 'none';

    // Get local network URL
    const urlEl = document.getElementById('voice-url');
    const openLink = document.getElementById('voice-open-link') as HTMLAnchorElement;
    const qrEl = document.getElementById('voice-qr');

    // Use the server's actual URL
    const phoneUrl = VOICE_SERVER.replace('localhost', location.hostname);
    if (urlEl) urlEl.textContent = phoneUrl;
    if (openLink) openLink.href = phoneUrl;

    // Simple QR code using external API (works offline too via cache)
    if (qrEl) {
      qrEl.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(phoneUrl)}&bgcolor=0a0a0d&color=5eead4" alt="QR Code" style="border-radius:8px;" />`;
    }

    // Copy button
    document.getElementById('voice-copy-btn')?.addEventListener('click', () => {
      navigator.clipboard.writeText(phoneUrl);
      const btn = document.getElementById('voice-copy-btn');
      if (btn) btn.innerHTML = '<span style="color:var(--accent)">✓</span>';
      setTimeout(() => {
        if (btn) btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>';
      }, 2000);
    });

    // Load recording progress
    loadProgress(scripts);

    // Auto-refresh progress every 5 seconds
    setInterval(() => loadProgress(scripts), 5000);
  } catch {
    if (statusEl) {
      statusEl.innerHTML = `<span class="voice-dot offline"></span><span>${t('voice.offline')}</span>`;
    }
    if (connectEl) connectEl.style.display = 'none';
    if (offlineEl) offlineEl.style.display = '';
  }
}

async function loadProgress(scripts: ScriptInfo[]): Promise<void> {
  const linesEl = document.getElementById('voice-lines');
  if (!linesEl) return;

  for (const script of scripts) {
    try {
      const [statusRes, scriptRes] = await Promise.all([
        fetch(VOICE_SERVER + '/api/status?script=' + script.id),
        fetch(VOICE_SERVER + '/api/script/' + script.id),
      ]);
      const status: VoiceStatus = await statusRes.json();
      const scriptData = await scriptRes.json();

      const total = scriptData.lines.length;
      const done = Object.values(status).filter(s => s.recorded).length;

      linesEl.innerHTML = `
        <div class="voice-script-header">
          <span class="voice-script-title">${script.title}</span>
          <span class="voice-script-count">${done} / ${total}</span>
        </div>
        <div class="voice-progress-bar">
          <div class="voice-progress-fill" style="width:${(done / total) * 100}%"></div>
        </div>
        <div class="voice-line-list">
          ${scriptData.lines.map((line: any, i: number) => {
            const s = status[line.id];
            return `
              <div class="voice-line-item ${s?.recorded ? 'done' : ''}">
                <span class="voice-line-num">${i + 1}</span>
                <span class="voice-line-text">${line.text}</span>
                <span class="voice-line-status">${s?.recorded ? '✓' : '○'}</span>
              </div>
            `;
          }).join('')}
        </div>
      `;
    } catch {
      // Ignore
    }
  }
}
