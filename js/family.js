/* ============================================================================
   Skedros Family Tree — SHARED FAMILY LOGIC
   ----------------------------------------------------------------------------
   This file builds the family graph and provides helpers used by every page:
     - peopleMap            : id -> person object lookup
     - relations            : id -> { parents, spouses, siblings, children }
     - familyGraph          : id -> Set of connected ids
     - coreSet              : Set of ids in the "Skedros family" connected core
     - findPathToCore(id)   : shortest path from any person to the core
     - relationLabel(a, b)  : human label for the edge between two ids
     - escapeHtml(s)        : safe HTML insertion
   Depends on js/data.js being loaded first.
   ========================================================================== */

const peopleMap = Object.fromEntries(people.map(p => [p.id, p]));

/* ---------- Parent / spouse / sibling / child computation ---------- */
const relations = {};
(function computeRelations() {
  for (const p of people) {
    relations[p.id] = { parents: [], spouses: [], siblings: [], children: [] };
  }
  for (const d of descent) {
    const parentIds = d.from.split('+');
    if (relations[d.to] && !relations[d.to].parents.length) {
      relations[d.to].parents = parentIds.slice();
    }
    for (const pid of parentIds) {
      if (relations[pid] && !relations[pid].children.includes(d.to)) {
        relations[pid].children.push(d.to);
      }
    }
  }
  for (const [a, b] of marriages) {
    if (relations[a] && !relations[a].spouses.includes(b)) relations[a].spouses.push(b);
    if (relations[b] && !relations[b].spouses.includes(a)) relations[b].spouses.push(a);
  }
  const siblingGroups = {};
  for (const d of descent) {
    if (!siblingGroups[d.from]) siblingGroups[d.from] = [];
    if (!siblingGroups[d.from].includes(d.to)) siblingGroups[d.from].push(d.to);
  }
  for (const group of Object.values(siblingGroups)) {
    for (const id of group) {
      if (!relations[id]) continue;
      for (const other of group) {
        if (other !== id && !relations[id].siblings.includes(other)) {
          relations[id].siblings.push(other);
        }
      }
    }
  }
})();

/* ---------- Family graph (for path-finding to Skedros core) ---------- */
const familyGraph = {};
function addFamilyEdge(a, b) {
  if (!a || !b) return;
  if (!familyGraph[a]) familyGraph[a] = new Set();
  if (!familyGraph[b]) familyGraph[b] = new Set();
  familyGraph[a].add(b);
  familyGraph[b].add(a);
}
(function buildFamilyGraph() {
  for (const [a, b] of marriages) addFamilyEdge(a, b);
  for (const d of descent) {
    const parents = d.from.split('+');
    for (const p of parents) addFamilyEdge(p, d.to);
  }
  for (const [a, b] of crossClusterLinks) addFamilyEdge(a, b);
})();

/* ---------- "Skedros family" core: everyone reachable from the seeds ---------- */
const coreSet = new Set();
(function computeCoreSet() {
  for (const id of CORE_SEEDS) if (peopleMap[id]) coreSet.add(id);
  const queue = [...coreSet];
  while (queue.length) {
    const cur = queue.shift();
    for (const neighbor of familyGraph[cur] || []) {
      if (!coreSet.has(neighbor)) {
        coreSet.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
})();

/* ---------- Shortest path from any person to the nearest core member ---------- */
function findPathToCore(start) {
  if (!peopleMap[start]) return null;
  if (coreSet.has(start)) return [start];
  const visited = new Set([start]);
  const queue = [[start]];
  while (queue.length) {
    const path = queue.shift();
    const last = path[path.length - 1];
    for (const neighbor of familyGraph[last] || []) {
      if (visited.has(neighbor)) continue;
      visited.add(neighbor);
      const next = path.concat(neighbor);
      if (coreSet.has(neighbor)) return next;
      queue.push(next);
    }
  }
  return null;
}

/* ---------- Human-readable label for the edge between two consecutive ids ---------- */
function relationLabel(a, b) {
  for (const [x, y] of marriages) {
    if ((x === a && y === b) || (x === b && y === a)) return 'married to';
  }
  for (const [x, y] of crossClusterLinks) {
    if ((x === a && y === b) || (x === b && y === a)) return 'married to';
  }
  for (const d of descent) {
    const parents = d.from.split('+');
    if (parents.includes(a) && d.to === b) return 'parent of';
    if (parents.includes(b) && d.to === a) return 'child of';
  }
  return 'related to';
}

/* ---------- HTML escape ---------- */
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

/* ---------- Convenience: get a person, or null if unknown ---------- */
function getPerson(id) {
  return peopleMap[id] || null;
}

/* ============================================================================
   SEARCH PANEL — shared renderer
   ----------------------------------------------------------------------------
   buildSearchPanel({ onSelect }) wires up the search panel that's been added
   to the page (search-panel, search-input, search-list, search-count, etc.).
   The `onSelect` callback receives the chosen person's id; the caller decides
   what to do with it — tree.js pans to them, profile.js navigates.
   ========================================================================== */

function buildSearchPanel({ onSelect, makeResultHTML }) {
  const panel = document.getElementById('search-panel');
  const toggle = document.getElementById('search-toggle');
  const closeBtn = document.getElementById('search-close');
  const input = document.getElementById('search-input');
  const list = document.getElementById('search-list');
  const countEl = document.getElementById('search-count');
  if (!panel || !toggle || !input || !list) return;

  // Sort the people once. Names with diacritics handled by localeCompare.
  const sorted = people.slice().sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
  );

  function render(filter = '') {
    const q = filter.trim().toLowerCase();
    const matches = sorted.filter(p => {
      if (!q) return true;
      if (p.name.toLowerCase().includes(q)) return true;
      if (p.alt && p.alt.toLowerCase().includes(q)) return true;
      return false;
    });

    countEl.textContent = q
      ? `${matches.length} of ${people.length} match`
      : `${people.length} people`;

    if (matches.length === 0) {
      list.innerHTML = '<p class="search-empty">No matches. Try a different spelling, or search by Greek name.</p>';
      return;
    }

    const chunks = [];
    let lastLetter = null;
    for (const p of matches) {
      const letter = p.name.charAt(0).toUpperCase();
      if (!q && letter !== lastLetter) {
        chunks.push(`<div class="letter-divider">${letter}</div>`);
        lastLetter = letter;
      }
      chunks.push(makeResultHTML(p));
    }
    list.innerHTML = chunks.join('');
  }

  // Live filter as user types
  input.addEventListener('input', e => render(e.target.value));

  // Click on a result delegates to the caller
  list.addEventListener('click', e => {
    const el = e.target.closest('[data-id]');
    if (!el) return;
    const id = el.dataset.id;
    if (onSelect) onSelect(id, e);
  });

  // Open / close
  function open() {
    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    setTimeout(() => { input.focus(); input.select(); }, 150);
  }
  function close() {
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
  }
  toggle.addEventListener('click', () => {
    panel.classList.contains('open') ? close() : open();
  });
  closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && panel.classList.contains('open')) close();
  });

  // Build initial list
  render('');

  // Expose a close fn for callers who want to dismiss after selection
  return { open, close, render };
}

/* ============================================================================
   CLUSTER ASSIGNMENT
   ----------------------------------------------------------------------------
   Each person is assigned to exactly one family-branch cluster. We do this
   by BFS from a configured seed person, walking the marriages + descents
   graph WITHOUT cross-cluster links — so each "branch" that the source only
   loosely connects to the Skedros core (Demitrios Georgouses, JC Georgouses,
   Avgares, etc.) remains its own cluster.

   personCluster[id]  : cluster id string (e.g. 'skedros', 'avgares', 'other')
   ========================================================================== */

const strictGraph = {};
function addStrictEdge(a, b) {
  if (!a || !b) return;
  if (!strictGraph[a]) strictGraph[a] = new Set();
  if (!strictGraph[b]) strictGraph[b] = new Set();
  strictGraph[a].add(b);
  strictGraph[b].add(a);
}
(function buildStrictGraph() {
  for (const [a, b] of marriages) addStrictEdge(a, b);
  for (const d of descent) {
    const parents = d.from.split('+');
    for (const p of parents) addStrictEdge(p, d.to);
  }
  // NOTE: crossClusterLinks intentionally excluded — see file header.
})();

const personCluster = {};
(function assignClusters() {
  if (typeof CLUSTER_DEFS === 'undefined') return;
  for (const def of CLUSTER_DEFS) {
    if (!peopleMap[def.seed]) continue;
    const queue = [def.seed];
    const seen = new Set([def.seed]);
    while (queue.length) {
      const cur = queue.shift();
      // Only stamp if not already in a cluster (first-come wins; ordering matters)
      if (!(cur in personCluster)) personCluster[cur] = def.id;
      for (const nb of strictGraph[cur] || []) {
        if (!seen.has(nb)) { seen.add(nb); queue.push(nb); }
      }
    }
  }
  // Anyone left over → 'other' (orphan singletons, the Skedros grandfathers, etc.)
  for (const p of people) {
    if (!(p.id in personCluster)) personCluster[p.id] = 'other';
  }
})();
