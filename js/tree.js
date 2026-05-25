/* ============================================================================
   Skedros Family Tree — TREE PAGE RENDERING
   Depends on data.js and family.js being loaded first.
   ========================================================================== */

const peopleLayer = document.getElementById('people');
const svg = document.getElementById('lines');
const canvasEl = document.getElementById('canvas');
const CARD_HALF_H = 28;

/* Set canvas dimensions from CANVAS constant */
canvasEl.style.width = CANVAS.width + 'px';
canvasEl.style.height = CANVAS.height + 'px';

/* ---------- Branch labels (the section headers like "Skedros", "Avgares clan") ---------- */
function renderBranchLabels() {
  for (const lab of BRANCH_LABELS) {
    const el = document.createElement('div');
    el.className = 'branch-label';
    el.style.top = lab.y + 'px';
    el.style.left = lab.x + 'px';
    el.textContent = lab.label;
    canvasEl.appendChild(el);
  }
}

/* ---------- Generation rule lines + left-edge labels ---------- */
function renderGenerationRules() {
  const rows = [
    { y: GY.I,   label: 'Gen I' },
    { y: GY.II,  label: 'Gen II' },
    { y: GY.III, label: 'Gen III' },
    { y: GY.IV,  label: 'Gen IV' },
    { y: GY.V,   label: 'Gen V' },
    { y: GY.VI,  label: 'Gen VI' },
  ];
  for (const r of rows) {
    const rule = document.createElement('div');
    rule.className = 'gen-rule';
    rule.style.top = r.y + 'px';
    canvasEl.appendChild(rule);

    const lab = document.createElement('div');
    lab.className = 'gen-label';
    lab.style.top = r.y + 'px';
    lab.textContent = r.label;
    canvasEl.appendChild(lab);
  }
}

/* ---------- People cards ---------- */
function svgNS(tag, attrs, className) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const k in attrs) el.setAttribute(k, attrs[k]);
  if (className) el.setAttribute('class', className);
  return el;
}

function renderPeople() {
  for (const p of people) {
    const el = document.createElement('div');
    el.className = 'person'
                 + (p.unknown ? ' unknown' : '')
                 + (p.deceasedYoung ? ' deceased-young' : '')
                 + (coreSet.has(p.id) ? ' core' : '');
    el.style.left = p.x + 'px';
    el.style.top = p.y + 'px';
    el.dataset.id = p.id;
    el.innerHTML = `
      <div class="name">${escapeHtml(p.name)}</div>
      ${p.alt   ? `<div class="alt">${escapeHtml(p.alt)}</div>` : ''}
      ${p.dates ? `<div class="dates">${escapeHtml(p.dates)}</div>` : ''}
      ${p.note  ? `<div class="note">${escapeHtml(p.note)}</div>` : ''}
    `;
    // Tap vs drag: only open the detail panel on a clean tap
    let pdown = null;
    el.addEventListener('pointerdown', (e) => {
      pdown = { x: e.clientX, y: e.clientY, t: Date.now() };
    });
    el.addEventListener('pointerup', (e) => {
      if (!pdown) return;
      const dx = Math.abs(e.clientX - pdown.x);
      const dy = Math.abs(e.clientY - pdown.y);
      const dt = Date.now() - pdown.t;
      pdown = null;
      if (dx < 6 && dy < 6 && dt < 600) {
        e.stopPropagation();
        showDetail(p.id);
      }
    });
    el.addEventListener('mouseenter', () => setHover(p.id));
    el.addEventListener('mouseleave', () => setHover(null));
    peopleLayer.appendChild(el);
  }
}

/* ---------- Connection geometry helpers ---------- */
function marriageLineY(a, b) {
  return Math.max(a.y, b.y) + CARD_HALF_H + 16;
}

function resolveParentAnchor(id) {
  if (id.includes('+')) {
    const [aId, bId] = id.split('+');
    const a = peopleMap[aId], b = peopleMap[bId];
    if (!a || !b) return null;
    return { x: (a.x + b.x) / 2, y: marriageLineY(a, b), isCouple: true };
  }
  const p = peopleMap[id];
  if (!p) return null;
  return { x: p.x, y: p.y + CARD_HALF_H, isCouple: false };
}

function sizeSvg() {
  svg.setAttribute('width', canvasEl.offsetWidth);
  svg.setAttribute('height', canvasEl.offsetHeight);
  svg.setAttribute('viewBox', `0 0 ${canvasEl.offsetWidth} ${canvasEl.offsetHeight}`);
}

/* ---------- Lines (descent + marriage brackets) ---------- */
function renderLines() {
  // Marriages: low bracket between the two cards
  for (const [aId, bId] of marriages) {
    const a = peopleMap[aId], b = peopleMap[bId];
    if (!a || !b) continue;
    const lineY = marriageLineY(a, b);
    const left = Math.min(a.x, b.x), right = Math.max(a.x, b.x);

    // Vertical descenders from each card down to the marriage line
    svg.appendChild(svgNS('line',
      { x1: a.x, y1: a.y + CARD_HALF_H, x2: a.x, y2: lineY }, 'l-marriage-tick'));
    svg.appendChild(svgNS('line',
      { x1: b.x, y1: b.y + CARD_HALF_H, x2: b.x, y2: lineY }, 'l-marriage-tick'));
    // Horizontal marriage bar
    svg.appendChild(svgNS('line',
      { x1: left, y1: lineY, x2: right, y2: lineY }, 'l-marriage'));
    // Dot at the center
    const midX = (left + right) / 2;
    svg.appendChild(svgNS('circle', { cx: midX, cy: lineY, r: 3 }, 'dot-marriage'));
  }

  // Descents: parent anchor → vertical drop → horizontal bus → vertical drop → child
  for (const d of descent) {
    const parent = resolveParentAnchor(d.from);
    if (!parent) continue;
    const child = peopleMap[d.to];
    if (!child) continue;
    const childTop = child.y - CARD_HALF_H;
    const bus = parent.y + (d.busLevel || 1) * 14;

    // From parent down to bus
    svg.appendChild(svgNS('line',
      { x1: parent.x, y1: parent.y, x2: parent.x, y2: bus }, 'l-descent'));
    // Horizontal bus segment over to under the child
    svg.appendChild(svgNS('line',
      { x1: parent.x, y1: bus, x2: child.x, y2: bus }, 'l-descent'));
    // Vertical drop from bus into the child card
    svg.appendChild(svgNS('line',
      { x1: child.x, y1: bus, x2: child.x, y2: childTop }, 'l-descent'));
    // Small dot at the bus junction
    svg.appendChild(svgNS('circle', { cx: child.x, cy: bus, r: 2 }, 'dot-descent'));
  }
}

/* ---------- Hover / pinned highlight ---------- */
let pinnedId = null;
function setHover(personId) {
  if (pinnedId) return;
  applyHighlight(personId);
}
function setPinned(personId) {
  pinnedId = personId;
  applyHighlight(personId);
}
function clearPinned() {
  pinnedId = null;
  applyHighlight(null);
}
function applyHighlight(personId) {
  const cards = document.querySelectorAll('.person');
  cards.forEach(el => el.classList.remove('hl-self','hl-parent','hl-spouse','hl-sibling','hl-child','hl-dimmed'));
  if (!personId) return;
  const r = relations[personId];
  if (!r) return;
  cards.forEach(el => {
    const id = el.dataset.id;
    if (id === personId)              el.classList.add('hl-self');
    else if (r.parents.includes(id))  el.classList.add('hl-parent');
    else if (r.spouses.includes(id))  el.classList.add('hl-spouse');
    else if (r.siblings.includes(id)) el.classList.add('hl-sibling');
    else if (r.children.includes(id)) el.classList.add('hl-child');
    else                              el.classList.add('hl-dimmed');
  });
}

/* ---------- Path-to-Skedros-core visualization ---------- */
function applyPathHighlight(pathIds) {
  document.querySelectorAll('.person.path-hl').forEach(el => el.classList.remove('path-hl'));
  if (!pathIds || pathIds.length === 0) {
    canvasEl.classList.remove('path-mode');
    return;
  }
  for (const id of pathIds) {
    const el = document.querySelector(`.person[data-id="${id}"]`);
    if (el) el.classList.add('path-hl');
  }
  canvasEl.classList.add('path-mode');
}

function renderConnection(personId) {
  const el = document.getElementById('detail-path');
  const path = findPathToCore(personId);
  if (!path) {
    el.innerHTML = '<div class="path-empty">No documented marriage or birth connection to the Skedros family in the source. This person appears as a standalone branch.</div>';
    applyPathHighlight(null);
    return;
  }
  if (path.length === 1) {
    el.innerHTML = '<div class="path-empty">Part of the Skedros family core.</div>';
    applyPathHighlight(path);
    return;
  }
  const parts = [];
  for (let i = 0; i < path.length; i++) {
    const id = path[i];
    const p = peopleMap[id];
    const isCore = coreSet.has(id) && (i === path.length - 1);
    parts.push(`<button data-id="${id}"${isCore ? ' class="is-core"' : ''}>${escapeHtml(p ? p.name : id)}</button>`);
    if (i < path.length - 1) {
      parts.push(`<span class="path-arrow">${escapeHtml(relationLabel(id, path[i + 1]))}</span>`);
    }
  }
  el.innerHTML = `<div class="path-chain">${parts.join('')}</div>`;
  applyPathHighlight(path);
}

/* ---------- Detail panel ---------- */
function showDetail(personId) {
  const p = peopleMap[personId];
  if (!p) return;
  const r = relations[personId] || { parents:[], spouses:[], siblings:[], children:[] };

  document.getElementById('detail-name').innerHTML =
    escapeHtml(p.name) + (p.deceasedYoung ? ' <span class="dagger">&dagger;</span>' : '');
  const altEl = document.getElementById('detail-alt');
  altEl.textContent = p.alt || '';
  altEl.style.display = p.alt ? 'block' : 'none';
  const datesEl = document.getElementById('detail-dates');
  datesEl.textContent = p.dates || '';
  datesEl.style.display = p.dates ? 'block' : 'none';
  const noteEl = document.getElementById('detail-note');
  noteEl.textContent = p.note || '';
  noteEl.style.display = p.note ? 'block' : 'none';

  const photoEl = document.getElementById('detail-photo');
  const photos = p.photos || [];
  if (photos.length) {
    photoEl.style.backgroundImage = `url("photos/${photos[0]}")`;
    photoEl.classList.remove('placeholder');
    photoEl.removeAttribute('data-initial');
  } else {
    photoEl.style.backgroundImage = '';
    photoEl.classList.add('placeholder');
    const m = p.name.match(/[A-Za-zΑ-Ωα-ωΆ-Ώά-ώ]/);
    photoEl.setAttribute('data-initial', m ? m[0].toUpperCase() : '?');
  }

  const fillRelation = (elId, ids, emptyMsg) => {
    const el = document.getElementById(elId);
    if (!ids || !ids.length) { el.innerHTML = `<em>${emptyMsg}</em>`; return; }
    el.innerHTML = ids.map(rid => {
      const rp = peopleMap[rid];
      return `<button data-id="${rid}">${escapeHtml(rp ? rp.name : rid)}</button>`;
    }).join('');
  };
  fillRelation('detail-parents',  r.parents,  'not recorded');
  fillRelation('detail-spouse',   r.spouses,  'none recorded');
  fillRelation('detail-siblings', r.siblings, 'none recorded');
  fillRelation('detail-children', r.children, 'none recorded');

  const bioEl = document.getElementById('detail-bio');
  if (p.bio) {
    bioEl.innerHTML = p.bio.split(/\n\n+/).map(par =>
      `<p>${escapeHtml(par).replace(/\n/g, '<br>')}</p>`
    ).join('');
  } else {
    bioEl.innerHTML = '<em>No biography on file yet.</em>';
  }

  // Full-profile link points to the per-person profile page
  const profileLink = document.getElementById('detail-profile-link');
  profileLink.href = `profile.html?id=${encodeURIComponent(personId)}`;

  renderConnection(personId);

  const panel = document.getElementById('detail-panel');
  panel.classList.add('open');
  panel.setAttribute('aria-hidden', 'false');
  panel.scrollTop = 0;
  setPinned(personId);
}

function closeDetail() {
  const panel = document.getElementById('detail-panel');
  panel.classList.remove('open');
  panel.setAttribute('aria-hidden', 'true');
  clearPinned();
  applyPathHighlight(null);
}

// Panel button delegation: click a relation name to jump to that person
document.getElementById('detail-panel').addEventListener('click', (e) => {
  const t = e.target;
  if (t.tagName === 'BUTTON' && t.dataset.id) {
    showDetail(t.dataset.id);
  }
});
document.getElementById('detail-close').addEventListener('click', closeDetail);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDetail(); });

/* ---------- Boot: render everything ---------- */
renderGenerationRules();
renderBranchLabels();
renderPeople();
sizeSvg();
renderLines();

/* ============================================================================
   PAN AND ZOOM
   ========================================================================== */
const viewport = document.getElementById('viewport');
const zoomDisplay = document.getElementById('zoom-display');
const state = { x: 0, y: 0, scale: 1, minScale: 0.12, maxScale: 2.4 };

function applyTransform() {
  canvasEl.style.transform = `translate(${state.x}px, ${state.y}px) scale(${state.scale})`;
  if (zoomDisplay) zoomDisplay.textContent = Math.round(state.scale * 100) + '%';
}

function fitToScreen() {
  const vw = viewport.offsetWidth;
  const vh = viewport.offsetHeight;
  const cw = canvasEl.offsetWidth;
  const ch = canvasEl.offsetHeight;
  const scale = Math.min(vw / cw, vh / ch) * 0.96;
  state.scale = Math.max(state.minScale, Math.min(state.maxScale, scale));
  state.x = (vw - cw * state.scale) / 2;
  state.y = (vh - ch * state.scale) / 2;
  applyTransform();
}

viewport.addEventListener('wheel', (e) => {
  e.preventDefault();
  const factor = e.deltaY < 0 ? 1.1 : 0.91;
  const rect = viewport.getBoundingClientRect();
  const cx = e.clientX - rect.left;
  const cy = e.clientY - rect.top;
  const newScale = Math.max(state.minScale, Math.min(state.maxScale, state.scale * factor));
  state.x = cx - (cx - state.x) * (newScale / state.scale);
  state.y = cy - (cy - state.y) * (newScale / state.scale);
  state.scale = newScale;
  applyTransform();
}, { passive: false });

let dragging = false, dragStart = null;
viewport.addEventListener('mousedown', (e) => {
  if (e.target.closest('.person') || e.target.closest('.detail-panel')) return;
  dragging = true; dragStart = { x: e.clientX - state.x, y: e.clientY - state.y };
  viewport.classList.add('dragging');
});
window.addEventListener('mousemove', (e) => {
  if (!dragging) return;
  state.x = e.clientX - dragStart.x;
  state.y = e.clientY - dragStart.y;
  applyTransform();
});
window.addEventListener('mouseup', () => { dragging = false; viewport.classList.remove('dragging'); });

// Touch support
let touchStart = null;
viewport.addEventListener('touchstart', (e) => {
  if (e.touches.length === 1 && !e.target.closest('.person') && !e.target.closest('.detail-panel')) {
    touchStart = { x: e.touches[0].clientX - state.x, y: e.touches[0].clientY - state.y };
  }
}, { passive: true });
viewport.addEventListener('touchmove', (e) => {
  if (e.touches.length === 1 && touchStart) {
    e.preventDefault();
    state.x = e.touches[0].clientX - touchStart.x;
    state.y = e.touches[0].clientY - touchStart.y;
    applyTransform();
  }
}, { passive: false });
viewport.addEventListener('touchend', () => { touchStart = null; });

document.getElementById('zoom-in').addEventListener('click', () => {
  state.scale = Math.min(state.maxScale, state.scale * 1.2);
  applyTransform();
});
document.getElementById('zoom-out').addEventListener('click', () => {
  state.scale = Math.max(state.minScale, state.scale / 1.2);
  applyTransform();
});
document.getElementById('reset').addEventListener('click', fitToScreen);

window.addEventListener('load', () => { setTimeout(fitToScreen, 50); });
window.addEventListener('resize', () => fitToScreen());

/* ============================================================================
   SEARCH PANEL HOOK — pans the canvas to the chosen person and opens detail.
   ========================================================================== */

function panToPerson(personId, smooth = true) {
  const p = peopleMap[personId];
  if (!p) return;
  // Pick a comfortable zoom level if currently zoomed way out
  const targetScale = Math.max(state.scale, 0.65);
  state.scale = targetScale;
  // Center the viewport on the person's card
  const vw = viewport.offsetWidth;
  const vh = viewport.offsetHeight;
  state.x = vw / 2 - p.x * targetScale;
  state.y = vh / 2 - p.y * targetScale;
  if (smooth) {
    canvasEl.style.transition = 'transform 0.4s cubic-bezier(0.22, 0.61, 0.36, 1)';
    applyTransform();
    setTimeout(() => { canvasEl.style.transition = ''; }, 420);
  } else {
    applyTransform();
  }
  // Open detail panel after the pan settles
  setTimeout(() => showDetail(personId), smooth ? 320 : 50);
}

// Wire up the search panel: each result is a button that, when clicked,
// closes the search panel and pans to that person on the canvas.
const searchPanel = buildSearchPanel({
  makeResultHTML: (p) => {
    const isCore = coreSet.has(p.id);
    return `<button class="search-result${isCore ? ' is-core' : ''}" data-id="${p.id}">
      ${escapeHtml(p.name)}
      ${p.alt   ? `<div class="meta">${escapeHtml(p.alt)}</div>`   : ''}
      ${p.dates ? `<div class="meta">${escapeHtml(p.dates)}</div>` : ''}
    </button>`;
  },
  onSelect: (id) => {
    searchPanel.close();
    panToPerson(id);
  },
});

// Keyboard shortcut: "/" focuses the search panel
document.addEventListener('keydown', (e) => {
  if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
    e.preventDefault();
    searchPanel.open();
  }
});
