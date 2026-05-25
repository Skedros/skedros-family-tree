/* ============================================================================
   Skedros Family Tree — PROFILE PAGE RENDERING
   Reads ?id=<person_id> from the URL and renders that person's profile.
   Depends on data.js + family.js.
   ========================================================================== */

(function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id || !peopleMap[id]) {
    document.getElementById('not-found').hidden = false;
    document.getElementById('missing-id').textContent = id || '(none)';
    return;
  }

  const p = peopleMap[id];
  const rel = relations[id] || { parents: [], spouses: [], siblings: [], children: [] };
  const photos = p.photos || [];

  // Make the article visible
  document.getElementById('profile').hidden = false;
  document.title = p.name + ' · The Skedros Family Tree';

  // Eyebrow: relate them to the Skedros family at a glance
  const eyebrowEl = document.getElementById('hero-eyebrow');
  if (coreSet.has(id)) {
    eyebrowEl.textContent = 'Skedros family';
  } else {
    const path = findPathToCore(id);
    eyebrowEl.textContent = path ? 'Connected to the Skedros family' : 'Related branch';
  }

  // Hero text
  document.getElementById('hero-name').innerHTML =
    escapeHtml(p.name) + (p.deceasedYoung ? ' <span style="opacity:0.6">&dagger;</span>' : '');
  document.getElementById('hero-alt').textContent = p.alt || '';
  document.getElementById('hero-dates').textContent = p.dates || '';
  document.getElementById('hero-note').textContent = p.note || '';

  // Hero photo (use first photo, or fall back to initial placeholder)
  const heroImg = document.getElementById('hero-image');
  const heroPlaceholder = document.getElementById('hero-placeholder');
  if (photos.length) {
    heroImg.src = 'photos/' + photos[0];
    heroImg.alt = p.name;
    heroImg.hidden = false;
    heroPlaceholder.style.display = 'none';
  } else {
    const m = p.name.match(/[A-Za-zΑ-Ωα-ωΆ-Ώά-ώ]/);
    heroPlaceholder.setAttribute('data-initial', m ? m[0].toUpperCase() : '?');
  }

  // Gallery only if more than one photo
  if (photos.length > 1) {
    initGallery(photos, p.name);
  }

  // Biography
  if (p.bio) {
    const bioEl = document.getElementById('biography-text');
    bioEl.innerHTML = p.bio.split(/\n\n+/).map(par =>
      '<p>' + escapeHtml(par).replace(/\n/g, '<br>') + '</p>'
    ).join('');
  }

  // Family relationships
  fillFamilyList('family-parents',  rel.parents,  'not recorded');
  fillFamilyList('family-spouse',   rel.spouses,  'none recorded');
  fillFamilyList('family-siblings', rel.siblings, 'none recorded');
  fillFamilyList('family-children', rel.children, 'none recorded');

  // Connection to Skedros core
  renderConnectionPath(id);

  /* ---------- helpers ---------- */
  function fillFamilyList(containerId, ids, emptyMsg) {
    const el = document.getElementById(containerId);
    if (!ids || !ids.length) { el.innerHTML = '<em>' + emptyMsg + '</em>'; return; }
    el.innerHTML = ids.map(rid => {
      const rp = peopleMap[rid];
      return '<a href="profile.html?id=' + encodeURIComponent(rid) + '">' +
             escapeHtml(rp ? rp.name : rid) + '</a>';
    }).join('');
  }

  function renderConnectionPath(personId) {
    const el = document.getElementById('connection-content');
    const path = findPathToCore(personId);
    if (!path) {
      el.innerHTML = '<p class="path-empty">No documented marriage or birth connection to the Skedros family in the source. This person appears as a standalone branch.</p>';
      return;
    }
    if (path.length === 1) {
      el.innerHTML = '<p class="path-empty">Part of the Skedros family core.</p>';
      return;
    }
    const parts = [];
    for (let i = 0; i < path.length; i++) {
      const pid = path[i];
      const pp = peopleMap[pid];
      const isCore = coreSet.has(pid) && (i === path.length - 1);
      const isSelf = (i === 0);
      const cls = isCore ? ' class="is-core"' : '';
      if (isSelf) {
        parts.push('<strong>' + escapeHtml(pp ? pp.name : pid) + '</strong>');
      } else {
        parts.push('<a href="profile.html?id=' + encodeURIComponent(pid) + '"' + cls + '>' +
                   escapeHtml(pp ? pp.name : pid) + '</a>');
      }
      if (i < path.length - 1) {
        parts.push('<span class="path-arrow">' + escapeHtml(relationLabel(pid, path[i + 1])) + '</span>');
      }
    }
    el.innerHTML = '<div class="path-chain">' + parts.join(' ') + '</div>';
  }

  function initGallery(photoList, personName) {
    const gallery = document.getElementById('gallery');
    gallery.hidden = false;

    const main = document.getElementById('gallery-main');
    const thumbsEl = document.getElementById('gallery-thumbs');
    const caption = document.getElementById('gallery-caption');
    let index = 0;

    function show(i) {
      index = (i + photoList.length) % photoList.length;
      main.src = 'photos/' + photoList[index];
      main.alt = personName + ' — photo ' + (index + 1);
      caption.textContent = personName + ' — photo ' + (index + 1) + ' of ' + photoList.length;
      thumbsEl.querySelectorAll('img').forEach((img, j) => {
        img.classList.toggle('active', j === index);
      });
    }

    // Build thumbnail strip
    photoList.forEach((photo, j) => {
      const img = document.createElement('img');
      img.src = 'photos/' + photo;
      img.alt = personName + ' thumbnail ' + (j + 1);
      img.addEventListener('click', () => show(j));
      thumbsEl.appendChild(img);
    });

    document.getElementById('gallery-prev').addEventListener('click', () => show(index - 1));
    document.getElementById('gallery-next').addEventListener('click', () => show(index + 1));

    // Arrow keys
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft')  show(index - 1);
      if (e.key === 'ArrowRight') show(index + 1);
    });

    show(0);
  }
})();
