/* =============================================================================
   _v7review.js  —  v7 inline-redline CHANGE REVIEW controller (shared)
   -----------------------------------------------------------------------------
   Pairs with _v7review.css. Three jobs (all idempotent, no console errors):

     (a) TOGGLE  — inject a fixed "Review changes: ON/OFF" button. Default ON.
         Persists in localStorage ('cc-v7review'); ?review=1 forces ON, ?review=0
         forces OFF (and writes the preference). Toggles html.cc-review.

     (b) PANEL   — build a "Changes in this chapter" list from every [data-chg]
         element. One entry per distinct data-chg number, showing: the number,
         the rationale (data-why), the depth tag (data-depth = complete|focused|
         both), and the source (data-src). A distinct change number may appear on
         several elements (e.g. a <del> and its replacement <ins> share data-chg);
         we merge them and read data-why/-depth/-src from whichever element carries
         them. The role chip reflects what the change DID (add / remove / reword);
         when a number spans both a del and an ins it reads "replace".

     (c) MARKERS — after each [data-chg] element, inject one clickable [N] marker
         linking to that change's panel entry (and the panel number links back to
         the in-text marker). Injected once per element.

   GUARANTEES:
     - Idempotent: re-running (e.g. after a depth toggle reflow) never double-injects
       markers, never rebuilds duplicate chrome. Safe to call repeatedly.
     - Does NOT touch depth-engine.js, the chapter boot, the proxy, or any widget.
       It only reads [data-chg] and appends review chrome + markers.
     - Honors prefers-reduced-motion via the CSS.
     - Works whether loaded with `defer` (DOM ready) or earlier (waits for DOMContentLoaded).

   WIRE-IN (any chapter <head>, after _accessibility.*):
     <link rel="stylesheet" href="_v7review.css">
     <script src="_v7review.js" defer></script>
   ========================================================================== */
(function () {
  'use strict';
  if (window.__ccReviewInit) { /* allow re-run of build, but not re-bind */ }
  var STORAGE_KEY = 'cc-v7review';
  var ROLE = { add: 'added', del: 'removed', mod: 'reworded', replace: 'replaced' };

  /* ---- state helpers ---------------------------------------------------- */
  function readPref() {
    // Query param wins and is sticky.
    try {
      var qs = new URLSearchParams(window.location.search);
      if (qs.has('review')) {
        var v = qs.get('review');
        var on = !(v === '0' || v === 'off' || v === 'false');
        try { localStorage.setItem(STORAGE_KEY, on ? 'on' : 'off'); } catch (e) {}
        return on;
      }
    } catch (e) {}
    // Stored preference, else DEFAULT ON.
    try {
      var s = localStorage.getItem(STORAGE_KEY);
      if (s === 'off') return false;
      if (s === 'on') return true;
    } catch (e) {}
    return true; // default: review ON
  }
  function setReview(on) {
    document.documentElement.classList.toggle('cc-review', !!on);
    try { localStorage.setItem(STORAGE_KEY, on ? 'on' : 'off'); } catch (e) {}
    syncToggleUI(on);
  }
  function isOn() { return document.documentElement.classList.contains('cc-review'); }

  /* ---- role of a single [data-chg] element ------------------------------ */
  function elRole(el) {
    if (el.classList.contains('cc-add')) return 'add';
    if (el.classList.contains('cc-del')) return 'del';
    if (el.classList.contains('cc-mod')) return 'mod';
    // fall back to tag name
    var t = el.tagName.toLowerCase();
    if (t === 'ins') return 'add';
    if (t === 'del') return 'del';
    return 'mod';
  }

  /* ---- collect changes, grouped by number ------------------------------- */
  function collectChanges() {
    var els = Array.prototype.slice.call(document.querySelectorAll('[data-chg]'));
    var byNum = {};   // num -> { num, roles:Set-ish, why, depth, src, els:[] }
    var order = [];
    els.forEach(function (el) {
      var num = (el.getAttribute('data-chg') || '').trim();
      if (!num) return;
      if (!byNum[num]) {
        byNum[num] = { num: num, roles: {}, why: '', depth: '', src: '', els: [] };
        order.push(num);
      }
      var rec = byNum[num];
      rec.els.push(el);
      rec.roles[elRole(el)] = true;
      // read rationale/depth/src from whichever element carries them (prefer non-empty)
      if (!rec.why && el.getAttribute('data-why')) rec.why = el.getAttribute('data-why');
      if (!rec.depth && el.getAttribute('data-depth')) rec.depth = el.getAttribute('data-depth');
      if (!rec.src && el.getAttribute('data-src')) rec.src = el.getAttribute('data-src');
    });
    // sort by numeric value when possible, else lexical
    order.sort(function (a, b) {
      var na = parseFloat(a), nb = parseFloat(b);
      if (!isNaN(na) && !isNaN(nb)) return na - nb;
      return a < b ? -1 : a > b ? 1 : 0;
    });
    return order.map(function (n) {
      var rec = byNum[n];
      // derive a single display role
      var hasAdd = rec.roles.add, hasDel = rec.roles.del, hasMod = rec.roles.mod;
      var role;
      if (hasAdd && hasDel) role = 'replace';
      else if (hasMod) role = 'mod';
      else if (hasDel) role = 'del';
      else role = 'add';
      rec.displayRole = role;
      return rec;
    });
  }

  /* ---- (c) inject one [N] marker after each [data-chg] element ----------- */
  function injectMarkers(changes) {
    changes.forEach(function (rec) {
      rec.els.forEach(function (el) {
        if (el.getAttribute('data-chg-marked') === '1') return; // idempotent
        el.setAttribute('data-chg-marked', '1');
        var r = elRole(el);
        var a = document.createElement('a');
        a.className = 'cc-chg-marker cc-m-' + r;
        a.href = '#cc-chg-entry-' + rec.num;
        a.textContent = '[' + rec.num + ']';
        a.setAttribute('aria-label', 'Change ' + rec.num + ' (' + (ROLE[rec.displayRole] || r) + '); open its rationale');
        a.setAttribute('data-chg-jump', rec.num);
        // place the marker immediately after the change span/ins/del
        if (el.nextSibling) el.parentNode.insertBefore(a, el.nextSibling);
        else el.parentNode.appendChild(a);
      });
    });
  }

  /* ---- (b) build the "Changes in this chapter" panel -------------------- */
  function buildPanel(changes) {
    if (document.getElementById('cc-review-panel')) return; // idempotent

    var addN = 0, delN = 0, modN = 0, repN = 0;
    changes.forEach(function (r) {
      if (r.displayRole === 'add') addN++;
      else if (r.displayRole === 'del') delN++;
      else if (r.displayRole === 'mod') modN++;
      else repN++;
    });

    // launcher button (only shows when review ON, per CSS)
    var launch = document.createElement('button');
    launch.className = 'cc-review-panel-toggle';
    launch.id = 'cc-review-panel-toggle';
    launch.type = 'button';
    launch.setAttribute('aria-haspopup', 'dialog');
    launch.innerHTML = 'Changes in this chapter · ' + changes.length;
    document.body.appendChild(launch);

    var panel = document.createElement('aside');
    panel.className = 'cc-review-panel';
    panel.id = 'cc-review-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Changes in this chapter');
    panel.setAttribute('aria-modal', 'false');
    panel.setAttribute('data-open', 'false');

    var head = document.createElement('div');
    head.className = 'cc-review-panel-head';
    var subBits = [];
    if (addN) subBits.push(addN + ' added');
    if (modN) subBits.push(modN + ' reworded');
    if (repN) subBits.push(repN + ' replaced');
    if (delN) subBits.push(delN + ' removed');
    head.innerHTML =
      '<div><h2>Changes in this chapter</h2>' +
      '<div class="cc-rp-sub">' + changes.length + ' change' + (changes.length === 1 ? '' : 's') +
      (subBits.length ? ' · ' + subBits.join(' · ') : '') + '</div></div>';
    var closeBtn = document.createElement('button');
    closeBtn.className = 'cc-review-panel-close';
    closeBtn.type = 'button';
    closeBtn.setAttribute('aria-label', 'Close changes panel');
    closeBtn.innerHTML = '×';
    head.appendChild(closeBtn);
    panel.appendChild(head);

    var legend = document.createElement('div');
    legend.className = 'cc-review-panel-legend';
    legend.innerHTML =
      '<span><i class="cc-rl-add"></i> added</span>' +
      '<span><i class="cc-rl-mod"></i> reworded</span>' +
      '<span><i class="cc-rl-del"></i> removed</span>';
    panel.appendChild(legend);

    var list = document.createElement('ol');
    list.className = 'cc-review-panel-list';
    changes.forEach(function (rec) {
      var li = document.createElement('li');
      li.id = 'cc-chg-entry-' + rec.num;
      var role = rec.displayRole;
      var roleChipClass = role === 'del' ? 'cc-role-del' : role === 'mod' ? 'cc-role-mod' : role === 'replace' ? 'cc-role-mod' : 'cc-role-add';
      var roleLabel = (ROLE[role] || role);
      var depth = (rec.depth || '').trim();
      var depthLabel = depth === 'both' ? 'both depths' : depth === 'focused' ? 'concise' : depth === 'complete' ? 'comprehensive' : depth;
      var head2 =
        '<div class="cc-rp-entry-head">' +
          '<a class="cc-rp-num" href="#cc-chg-mark-' + rec.num + '" data-chg-back="' + rec.num + '" aria-label="Jump to change ' + rec.num + ' in the text">' + rec.num + '</a>' +
          '<span class="cc-rp-role ' + roleChipClass + '">' + roleLabel + '</span>' +
          (depthLabel ? '<span class="cc-rp-depth">' + depthLabel + '</span>' : '') +
        '</div>';
      var why = rec.why ? '<p class="cc-rp-why">' + escapeHtml(rec.why) + '</p>' : '';
      var src = rec.src ? '<div class="cc-rp-src">' + escapeHtml(rec.src) + '</div>' : '';
      li.innerHTML = head2 + why + src;
      list.appendChild(li);
    });
    panel.appendChild(list);
    document.body.appendChild(panel);

    /* open / close wiring */
    function openPanel() { panel.setAttribute('data-open', 'true'); closeBtn.focus(); }
    function closePanel() { panel.setAttribute('data-open', 'false'); launch.focus(); }
    launch.addEventListener('click', function () {
      if (panel.getAttribute('data-open') === 'true') closePanel(); else openPanel();
    });
    closeBtn.addEventListener('click', closePanel);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.getAttribute('data-open') === 'true') closePanel();
    });

    /* panel number -> jump to in-text marker + flash it */
    list.addEventListener('click', function (e) {
      var back = e.target.closest('[data-chg-back]');
      if (!back) return;
      e.preventDefault();
      var num = back.getAttribute('data-chg-back');
      var marker = document.querySelector('.cc-chg-marker[data-chg-jump="' + cssEsc(num) + '"]');
      if (marker) {
        closePanel();
        marker.scrollIntoView({ behavior: prefersReduced() ? 'auto' : 'smooth', block: 'center' });
        flash(marker);
      }
    });

    return { panel: panel, openPanel: openPanel };
  }

  /* ---- marker click -> open panel + jump to its entry ------------------- */
  function wireMarkerJumps() {
    if (window.__ccMarkerJumpsWired) return;
    window.__ccMarkerJumpsWired = true;
    document.addEventListener('click', function (e) {
      var m = e.target.closest('.cc-chg-marker[data-chg-jump]');
      if (!m) return;
      e.preventDefault();
      var num = m.getAttribute('data-chg-jump');
      var panel = document.getElementById('cc-review-panel');
      var entry = document.getElementById('cc-chg-entry-' + num);
      if (panel) panel.setAttribute('data-open', 'true');
      if (entry) {
        entry.scrollIntoView({ behavior: prefersReduced() ? 'auto' : 'smooth', block: 'center' });
        flash(entry);
      }
    });
  }

  /* ---- (a) the toggle button -------------------------------------------- */
  var toggleEl = null, stateEl = null, dotEl = null, countEl = null;
  function buildToggle(count) {
    if (document.getElementById('cc-review-toggle')) {
      toggleEl = document.getElementById('cc-review-toggle');
      stateEl = toggleEl.querySelector('.cc-rt-state');
      dotEl = toggleEl.querySelector('.cc-rt-dot');
      countEl = toggleEl.querySelector('.cc-rt-count');
      return;
    }
    toggleEl = document.createElement('button');
    toggleEl.className = 'cc-review-toggle';
    toggleEl.id = 'cc-review-toggle';
    toggleEl.type = 'button';
    toggleEl.setAttribute('aria-pressed', isOn() ? 'true' : 'false');
    toggleEl.innerHTML =
      '<span class="cc-rt-dot" aria-hidden="true"></span>' +
      '<span>Review changes: <span class="cc-rt-state">ON</span></span>' +
      (count ? '<span class="cc-rt-count">' + count + '</span>' : '');
    document.body.appendChild(toggleEl);
    stateEl = toggleEl.querySelector('.cc-rt-state');
    dotEl = toggleEl.querySelector('.cc-rt-dot');
    countEl = toggleEl.querySelector('.cc-rt-count');
    toggleEl.addEventListener('click', function () { setReview(!isOn()); });
  }
  function syncToggleUI(on) {
    if (!toggleEl) return;
    toggleEl.setAttribute('aria-pressed', on ? 'true' : 'false');
    if (stateEl) stateEl.textContent = on ? 'ON' : 'OFF';
  }

  /* ---- small utilities -------------------------------------------------- */
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function cssEsc(s) {
    if (window.CSS && CSS.escape) return CSS.escape(s);
    return String(s).replace(/["\\]/g, '\\$&');
  }
  function prefersReduced() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  function flash(el) {
    if (prefersReduced()) return;
    el.classList.remove('cc-chg-flash');
    void el.offsetWidth; // reflow so the animation restarts
    el.classList.add('cc-chg-flash');
    setTimeout(function () { el.classList.remove('cc-chg-flash'); }, 1200);
  }

  /* ---- in-text anchor so the panel "back" link has a target ------------- */
  function tagFirstMarkerAnchors(changes) {
    // give the FIRST marker of each change a stable id the panel links to
    changes.forEach(function (rec) {
      var first = document.querySelector('.cc-chg-marker[data-chg-jump="' + cssEsc(rec.num) + '"]');
      if (first && !first.id) first.id = 'cc-chg-mark-' + rec.num;
    });
  }

  /* ---- boot ------------------------------------------------------------- */
  function init() {
    // 1) apply persisted/default review state BEFORE building chrome so UI is correct
    setReview(readPref());

    var changes = collectChanges();

    // 2) markers in text
    injectMarkers(changes);
    tagFirstMarkerAnchors(changes);

    // 3) the toggle + the panel
    buildToggle(changes.length);
    syncToggleUI(isOn());
    if (changes.length) buildPanel(changes);
    wireMarkerJumps();

    window.__ccReviewInit = true;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-run marker injection after a depth toggle reflow (shell postMessages ccDepth).
  // collectChanges/injectMarkers are idempotent, so this only fills in any element
  // that became present; it never duplicates.
  window.addEventListener('message', function (e) {
    if (e && e.data && (e.data.ccDepth === 'complete' || e.data.ccDepth === 'focused')) {
      try { injectMarkers(collectChanges()); } catch (err) {}
    }
  });

  // Public hook (parity with __reannotate__) in case the shell wants to rebuild.
  window.__ccReviewRefresh = function () {
    try { injectMarkers(collectChanges()); } catch (e) {}
  };
})();
