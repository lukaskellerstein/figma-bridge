// Figma Bridge — status overlay content script (ISOLATED world)
// Listens for postMessage from MAIN world (__figs) and renders a Shadow DOM overlay.

(() => {
  const HOST_ID = 'figma-bridge-status';
  if (document.getElementById(HOST_ID)) return;

  const host = document.createElement('div');
  host.id = HOST_ID;
  document.body.appendChild(host);

  const shadow = host.attachShadow({ mode: 'closed' });

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = chrome.runtime.getURL('content-status.css');
  shadow.appendChild(link);

  const container = document.createElement('div');
  shadow.appendChild(container);

  // ── Status helpers ──

  const STATUS_COLORS = [
    'planning', 'fetching-assets', 'fetching-images', 'fetching-icons',
    'generating', 'executing', 'verifying', 'done', 'error',
  ];

  const statusClass = (status) =>
    STATUS_COLORS.includes(status) ? status : 'unknown';

  const escapeHtml = (str) =>
    String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  // ── Rendering ──

  const render = ({ agents, activeCount, version }) => {
    const agentRows = agents.length === 0
      ? '<div class="empty-row">No agents running</div>'
      : agents.map(a => `
          <div class="agent-row">
            <div class="status-dot status-${statusClass(a.status)}"></div>
            <div class="info">
              <div class="name">${escapeHtml(a.name)}</div>
              <div class="task text-${statusClass(a.status)}">${escapeHtml(a.task || a.status)}</div>
            </div>
          </div>`).join('');

    const badgeClass = activeCount > 0 ? 'active' : 'idle';

    container.innerHTML = `
      <div class="panel">
        <div class="header" data-drag="true">
          <div class="dot"></div>
          <div class="title">Claude Design</div>
          <div class="version">v${escapeHtml(version)}</div>
        </div>
        <div class="agents-header">
          <div class="agents-label">AGENTS</div>
          <div class="count-badge ${badgeClass}">${activeCount} active</div>
        </div>
        ${agentRows}
        <div class="footer">Figma Bridge v${escapeHtml(version)}</div>
      </div>`;

    host.style.display = '';
  };

  const hide = () => {
    container.innerHTML = '';
    host.style.display = 'none';
  };

  // Show immediately with empty state
  render({ agents: [], activeCount: 0, version: '3.0.0' });

  // ── Drag ──

  let isDragging = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;

  shadow.addEventListener('mousedown', (e) => {
    const header = e.target.closest('[data-drag="true"]');
    if (!header) return;

    isDragging = true;
    header.classList.add('dragging');

    const rect = host.getBoundingClientRect();
    dragOffsetX = e.clientX - rect.left;
    dragOffsetY = e.clientY - rect.top;

    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    host.style.position = 'fixed';
    host.style.left = `${e.clientX - dragOffsetX}px`;
    host.style.top = `${e.clientY - dragOffsetY}px`;
    host.style.right = 'auto';
  });

  document.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;

    const header = shadow.querySelector('.header');
    if (header) header.classList.remove('dragging');
  });

  // ── Message listener ──

  window.addEventListener('message', (event) => {
    if (event.data?.type !== 'FIGS_CMD') return;

    switch (event.data.action) {
      case 'render':
        render(event.data.payload);
        break;
      case 'remove':
        hide();
        break;
    }
  });
})();
