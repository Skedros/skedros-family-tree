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
