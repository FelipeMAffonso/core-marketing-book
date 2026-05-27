/* ============================================================================
 * depth-engine.js  —  Core Course depth engine (Comprehensive <-> Focused)
 * ----------------------------------------------------------------------------
 * GROUNDWORK / INFRASTRUCTURE. This is the runtime that lets ONE chapter
 * document carry BOTH depths and recompose itself on toggle, ported from the
 * MRV book's index.html (autoNumber @2174, autoCitations @2362, applyDensity
 * @2773). The teardown that this implements is _orchestration/MRV-DEPTH-MECHANISM.md
 * (read it for the why; this file is the how, parameterized for Core).
 *
 * WHAT IT DOES (three recompute passes, run on every depth toggle and on load):
 *   1. ccAutoNumber()    -- renumber VISIBLE h2/h3 sections gap-free (4.1, 4.2 ...)
 *   2. ccAutoCitations() -- renumber VISIBLE citations by first appearance and
 *                           rebuild the References list wholesale ([7] -> [4]).
 *   3. (caller resyncs/prunes its own TOC; helper ccVisibleHeadings() provided.)
 *
 * WHY A RUNTIME AND NOT CSS: hiding [data-complete] blocks with display:none is
 * only step one. If citation #5 lives in a hidden block, the baked "[7]" two
 * paragraphs later is now WRONG and the reference list shows a gap. MRV solves
 * this by carrying NO baked numbers and computing them at runtime from the
 * VISIBLE set. Core today bakes numbers (<sup class="cite">7</sup>,
 * <span class="sec-num">4.1</span>); depth_codemod.py converts a chapter to the
 * key-based contract this engine consumes. See DEPTH-INTEGRATION-PLAN.md.
 *
 * THE MARKUP CONTRACT this engine reads (post-codemod):
 *   - Depth tags (verbatim from MRV):
 *       data-complete       apparatus shown only in Comprehensive (visible by default)
 *       data-verbose        legacy synonym for data-complete (treated identically)
 *       data-focused        Focused-only bridge prose (hidden by default via inline
 *                           style="display:none"; the visibility CSS reveals it)
 *     Shared teaching prose carries NO attribute and shows in both depths.
 *   - Citations (key-based, NO baked number):
 *       inline marker   <sup class="cite" data-cite="key"></sup>   (empty)
 *       data store      <div class="references-data" style="display:none">
 *                         <p data-ref="key">Full formatted reference HTML</p> ...
 *                       </div>
 *       render target   <ol class="references-list"></ol>   (empty; engine fills <li>s)
 *   - Section headings: bare <h2 id>/<h3 id> titles (the codemod strips the baked
 *     <span class="sec-num">N.M</span>; this engine writes the number at runtime).
 *
 * CONFIG-DRIVEN (PLATFORM-VISION 2b: never hard-coded, professor-selectable later):
 *   window.DEPTH_CONFIG = {
 *     depths:  { complete: {...}, focused: {...} },  // label/short metadata per depth
 *     allowed: ['complete','focused'],               // which depths a deployment offers
 *     default: 'complete',                           // seed depth on first load
 *     storageKey: 'cc-density',                      // localStorage key (Core uses cc-density)
 *     chapterMap: window.CHAPTER_MAP                 // slug -> chapter number (config-driven)
 *   }
 *   Every value has a safe fallback so the engine also runs with no config at all.
 *
 * IDEMPOTENT: original (un-numbered) heading text and original caption HTML are
 * snapshotted into data-* on first run, so toggling Complete<->Focused any number
 * of times never compounds ("4.1 4.1 ..."). Citations are rebuilt from the data
 * store every run, so they are inherently idempotent.
 *
 * SAME-DOCUMENT or IFRAME: pass the document to operate on. The shell may render
 * chapters in an <iframe> (operate on frame.contentDocument) or in-page (operate
 * on document). All functions take an explicit `doc` (default: document).
 * ============================================================================
 */
(function (global) {
  'use strict';

  /* --------------------------------------------------------------------------
   * 0. CONFIG RESOLUTION
   * Read window.DEPTH_CONFIG but never trust it blindly: fill every gap with a
   * default so the engine is safe to run standalone (e.g. inside the codemod
   * proof page) or before the platform config layer has loaded.
   * ------------------------------------------------------------------------ */
  var DEFAULTS = {
    depths: {
      complete: { label: 'Comprehensive', short: 'Comprehensive' },
      focused:  { label: 'Focused',       short: 'Concise' }
    },
    allowed: ['complete', 'focused'],
    'default': 'complete',
    storageKey: 'cc-density',
    /* EDITION axis (audience/voice), ORTHOGONAL to DEPTH (length). An element
     * tagged data-edition="X" shows only in edition X; untagged shows in all.
     * Default = advanced-only, so chapters with no data-edition tags behave
     * EXACTLY as before (the 27 shipped chapters are unaffected). A deployment
     * that ships the Beginner edition sets allowedEditions + defaultEdition via
     * DEPTH_CONFIG; the build can also lock a single edition per product. */
    editions: {
      advanced: { label: 'Marketing Management', short: 'Advanced' },
      beginner: { label: 'Principles',           short: 'Beginner' }
    },
    allowedEditions: ['advanced'],
    defaultEdition: 'advanced',
    editionStorageKey: 'cc-edition',
    chapterMap: null,
    accent: '#c2410c' /* Core coral-deep; only used for inline link color */
  };

  function getConfig() {
    var c = global.DEPTH_CONFIG || {};
    return {
      depths: c.depths || DEFAULTS.depths,
      allowed: (c.allowed && c.allowed.length) ? c.allowed : DEFAULTS.allowed,
      defaultDepth: c['default'] || DEFAULTS['default'],
      storageKey: c.storageKey || DEFAULTS.storageKey,
      editions: c.editions || DEFAULTS.editions,
      allowedEditions: (c.allowedEditions && c.allowedEditions.length) ? c.allowedEditions : DEFAULTS.allowedEditions,
      defaultEdition: c.defaultEdition || DEFAULTS.defaultEdition,
      editionStorageKey: c.editionStorageKey || DEFAULTS.editionStorageKey,
      chapterMap: c.chapterMap || global.CHAPTER_MAP || DEFAULTS.chapterMap,
      accent: c.accent || DEFAULTS.accent
    };
  }

  /* The single source of truth for the current depth. The shell owns the UI and
   * persistence, but the engine keeps a normalized copy so its passes agree on
   * what "focused" means. Normalize anything that is not 'focused' to 'complete'
   * (MRV does the same: Complete is the conservative default). */
  var state = {
    depth: getConfig().defaultDepth === 'focused' ? 'focused' : 'complete',
    edition: getConfig().defaultEdition
  };

  function setDepth(mode) {
    state.depth = (mode === 'focused') ? 'focused' : 'complete';
    return state.depth;
  }
  function getDepth() { return state.depth; }
  function isFocused() { return state.depth === 'focused'; }

  /* EDITION state. Normalize an unknown edition to the configured default so the
   * engine is always valid. The shell owns the UI/persistence; the engine keeps
   * a normalized copy so every pass agrees on the current edition. */
  function setEdition(ed) {
    var cfg = getConfig();
    state.edition = (cfg.editions && cfg.editions[ed]) ? ed : cfg.defaultEdition;
    return state.edition;
  }
  function getEdition() { return state.edition; }

  /* --------------------------------------------------------------------------
   * 1. VISIBILITY PREDICATE
   * A node is "depth-hidden" iff we are in Focused mode AND the node itself, or
   * any ancestor up to <body>, carries data-complete or data-verbose. This is
   * the EXACT rule MRV uses (autoNumber's `isVerbose` and autoCitations'
   * `isHidden`), unified here. data-focused blocks are the inverse (shown only
   * in Focused) and never count as "hidden" content for numbering, because in
   * Focused mode they are visible and in Complete mode they hold no numbered
   * sections/citations by construction (bridge prose only).
   * ------------------------------------------------------------------------ */
  function isDepthHidden(el, doc) {
    if (!isFocused()) return false;          // Complete mode: nothing is depth-hidden
    var node = el;
    var body = doc.body;
    while (node && node !== body) {
      if (node.nodeType === 1 && node.hasAttribute &&
          (node.hasAttribute('data-complete') || node.hasAttribute('data-verbose'))) {
        return true;
      }
      node = node.parentElement;
    }
    return false;
  }

  /* EDITION visibility: a node is edition-hidden iff it (or an ancestor up to
   * <body>) carries data-edition set to a DIFFERENT edition than the current one.
   * Untagged nodes show in every edition. This is independent of depth and applies
   * in BOTH Comprehensive and Focused. */
  function isEditionHidden(el, doc) {
    var cur = state.edition;
    var node = el;
    var body = doc.body;
    while (node && node !== body) {
      if (node.nodeType === 1 && node.getAttribute) {
        var ed = node.getAttribute('data-edition');
        if (ed && ed !== cur) return true;
      }
      node = node.parentElement;
    }
    return false;
  }

  /* Combined predicate used by every renumbering pass: hidden if off-edition OR
   * depth-hidden. (Sections/citations/captions must skip BOTH so the visible set
   * renumbers gap-free in each of the four edition x depth cells.) */
  function isHidden(el, doc) {
    return isEditionHidden(el, doc) || isDepthHidden(el, doc);
  }

  /* --------------------------------------------------------------------------
   * 2. CHAPTER NUMBER (config-driven, per MRV recommendation 6.2)
   * Core reads the chapter number from window.CHAPTER_MAP via the file's slug
   * rather than the filename, so renumbering the spine never touches a chapter.
   * Resolution order:
   *   (a) explicit data-chapter-num on <html>/<body>/[data-chapter] (codemod can stamp it),
   *   (b) data-chapter-slug -> DEPTH_CONFIG.chapterMap[slug],
   *   (c) parse "chapter-NN-" from the document URL as a last resort.
   * Returns 0 when unknown -> sections are then numbered bare (no "N." prefix),
   * which is the correct degrade for intro/front-matter pages.
   * ------------------------------------------------------------------------ */
  function getChapterNum(doc) {
    var cfg = getConfig();
    // (a) explicit numeric stamp
    var stamped = doc.documentElement.getAttribute('data-chapter-num') ||
                  (doc.body && doc.body.getAttribute('data-chapter-num'));
    if (stamped && !isNaN(parseInt(stamped, 10))) return parseInt(stamped, 10);
    var stampEl = doc.querySelector('[data-chapter-num]');
    if (stampEl) {
      var sv = parseInt(stampEl.getAttribute('data-chapter-num'), 10);
      if (!isNaN(sv)) return sv;
    }
    // (b) slug -> map
    var slug = doc.documentElement.getAttribute('data-chapter-slug') ||
               (doc.body && doc.body.getAttribute('data-chapter-slug'));
    if (!slug) {
      var slugEl = doc.querySelector('[data-chapter-slug]');
      if (slugEl) slug = slugEl.getAttribute('data-chapter-slug');
    }
    if (slug && cfg.chapterMap && Object.prototype.hasOwnProperty.call(cfg.chapterMap, slug)) {
      var n = parseInt(cfg.chapterMap[slug], 10);
      if (!isNaN(n)) return n;
    }
    // (c) URL fallback: chapter-04-... -> 4
    try {
      var src = (doc.defaultView && doc.defaultView.location && doc.defaultView.location.href) ||
                doc.URL || '';
      var m = src.match(/chapter-(\d+)/i);
      if (m) return parseInt(m[1], 10);
    } catch (e) {}
    return 0;
  }

  /* --------------------------------------------------------------------------
   * 3. ccAutoNumber()  —  SECTION RENUMBERING  (port of MRV autoNumber @2174)
   * Numbers VISIBLE h2/h3 in document order, gap-free, skipping depth-hidden
   * headings. Idempotent: the un-numbered title is snapshotted once into
   * dataset.depthOriginal; every run rebuilds from that snapshot.
   *
   * Core difference vs MRV: Core bakes the number inside <span class="sec-num">.
   * The codemod removes that span, leaving a bare title. To be ROBUST even if a
   * chapter has not been codemodded yet, the snapshot step also strips:
   *   - a leading "N.M " / "N.M.K " text prefix (MRV's regex), and
   *   - a leading <span class="sec-num">...</span> if present (defensive).
   * We write the computed number as a leading <span class="sec-num">N.M</span>
   * so Core's existing CSS for .sec-num keeps applying.
   * ------------------------------------------------------------------------ */
  var SEC_NUM_PREFIX_RE = /^\s*<span[^>]*class="[^"]*\bsec-num\b[^"]*"[^>]*>.*?<\/span>\s*/i;
  var NUM_TEXT_PREFIX_RE = /^\s*\d+\.\d+(\.\d+)?\s+/;

  function snapshotHeading(h) {
    if (h.dataset.depthOriginal === undefined) {
      // Capture inner HTML once, stripping any baked sec-num span or numeric prefix.
      var html = h.innerHTML;
      html = html.replace(SEC_NUM_PREFIX_RE, '');
      html = html.replace(NUM_TEXT_PREFIX_RE, '');
      h.dataset.depthOriginal = html;
    }
    return h.dataset.depthOriginal;
  }

  function writeHeadingNumber(h, label) {
    var original = h.dataset.depthOriginal;
    if (label) {
      h.innerHTML = '<span class="sec-num">' + label + '</span> ' + original;
    } else {
      h.innerHTML = original; // unnumbered (e.g. "Key Takeaways", or chNum unknown)
    }
  }

  function ccAutoNumber(doc) {
    doc = doc || document;
    try {
      var chNum = getChapterNum(doc);
      var focused = isFocused();

      // Decide which h2s carry a number. Core marks some h2s as unnumbered
      // apparatus (Apply/Takeaways/Check-Your-Understanding). We honor an
      // explicit opt-out attribute data-no-num so those never get a section
      // number in EITHER depth, matching the current baked markup where they
      // have no <span class="sec-num">.
      var allH2 = doc.querySelectorAll('h2[id]');
      var sectionCount = 0;

      allH2.forEach(function (h2) {
        snapshotHeading(h2);

        var hiddenHere = isEditionHidden(h2, doc) || focused && (h2.hasAttribute('data-complete') || h2.hasAttribute('data-verbose') ||
                          (h2.closest && h2.closest('[data-complete],[data-verbose]')));
        if (hiddenHere) {
          // Hidden in Focused: strip number (it would be wrong / invisible anyway)
          // and DO NOT advance the counter, so survivors stay gap-free.
          writeHeadingNumber(h2, null);
          // Also clear any h3 numbers inside this hidden section's span.
          numberH3sUnder(h2, doc, chNum, sectionCount, focused, true);
          return;
        }

        var unnumbered = h2.hasAttribute('data-no-num');
        var label = null;
        if (!unnumbered && chNum) {
          sectionCount++;
          label = chNum + '.' + sectionCount;
        }
        writeHeadingNumber(h2, label);

        // Number h3s belonging to this h2 (until the next h2). Only meaningful
        // when this h2 itself is numbered.
        numberH3sUnder(h2, doc, chNum, (unnumbered ? 0 : sectionCount), focused, !label);
      });
    } catch (e) { /* never let numbering break the page */ }
  }

  /* Walk forward from an h2 to the next h2, numbering visible h3[id]. Mirrors
   * MRV's sibling walk INCLUDING the descend-into-containers step (h3s nested in
   * divs/details). `forceBare` strips numbers without counting (used when the
   * parent section is hidden or unnumbered). */
  function numberH3sUnder(h2, doc, chNum, sectionCount, focused, forceBare) {
    var subCount = 0;
    var sibling = h2.nextElementSibling;
    while (sibling && sibling.tagName !== 'H2') {
      // direct-sibling h3
      if (sibling.tagName === 'H3' && sibling.id) {
        subCount = applyH3(sibling, doc, chNum, sectionCount, subCount, focused, forceBare);
      }
      // nested h3s inside containers (divs/details/etc.)
      if (sibling.querySelectorAll) {
        var nested = sibling.querySelectorAll('h3[id]');
        for (var i = 0; i < nested.length; i++) {
          subCount = applyH3(nested[i], doc, chNum, sectionCount, subCount, focused, forceBare);
        }
      }
      sibling = sibling.nextElementSibling;
    }
  }

  function applyH3(h3, doc, chNum, sectionCount, subCount, focused, forceBare) {
    snapshotHeading(h3);
    var hidden = isEditionHidden(h3, doc) || focused && (h3.hasAttribute('data-complete') || h3.hasAttribute('data-verbose') ||
                  (h3.closest && h3.closest('[data-complete],[data-verbose]')));
    var unnumbered = h3.hasAttribute('data-no-num');
    if (forceBare || hidden || unnumbered || !chNum || !sectionCount) {
      writeHeadingNumber(h3, null);
      return subCount;
    }
    subCount++;
    writeHeadingNumber(h3, chNum + '.' + sectionCount + '.' + subCount);
    return subCount;
  }

  /* --------------------------------------------------------------------------
   * 4. ccAutoCitations()  —  CITATION RENUMBERING  (port of MRV autoCitations @2362)
   * THE HARD PART. Numbers ONLY visible citations by first appearance, blanks
   * citations inside hidden blocks, and rebuilds the References list wholesale
   * with fresh [N] links. This is what makes a hidden citation drop out and the
   * survivors renumber (e.g. [7] -> [4]).
   *
   * Core markup notes (handled here):
   *   - The inline marker is <sup class="cite" data-cite="key"></sup>. We keep
   *     class="cite" so Core's existing tooltip CSS still styles it.
   *   - The data store is <div class="references-data"> with <p data-ref="key">.
   *     (MRV used id="references-data"; the codemod emits a class so multiple
   *     chapters could in principle coexist; we accept either id or class.)
   *   - The render target is <ol class="references-list"> (or id). MRV used a
   *     <div>; an <ol> is more semantic for Core. We write <li> children when
   *     the target is an <ol>/<ul>, else <p> children (so it also works in a div).
   *   - "Further reading" is a SEPARATE, uncited list and is left untouched.
   *
   * Back-links: Core removed ref->citation back-links on 2026-05-10 (Felipe
   * directive). We honor that by default (DEPTH_CONFIG.backlinks !== true), so
   * the rebuilt reference list shows "[N] text" with the [N] NOT linked back.
   * Inline markers still link forward to #ref-N. Set DEPTH_CONFIG.backlinks =
   * true to restore MRV's bidirectional behavior.
   * ------------------------------------------------------------------------ */
  function ccAutoCitations(doc) {
    doc = doc || document;
    try {
      var cfg = getConfig();
      var backlinks = (global.DEPTH_CONFIG && global.DEPTH_CONFIG.backlinks === true);
      var accent = cfg.accent;

      var allCites = doc.querySelectorAll('sup.cite[data-cite], [data-cite]');
      if (allCites.length === 0) return;

      // (B) Load the reference text store: key -> innerHTML. Accept id or class.
      var refData = {};
      var refDiv = doc.getElementById('references-data') ||
                   doc.querySelector('.references-data');
      if (refDiv) {
        var refs = refDiv.querySelectorAll('[data-ref]');
        refs.forEach(function (r) { refData[r.getAttribute('data-ref')] = r.innerHTML; });
      }

      // (C) First pass: number ONLY visible citations, by first appearance.
      var keyToNum = {};
      var numToKey = {};
      var visibleOccurrences = {};   // key -> [{el}]  (visible occurrences only)
      var hiddenCites = [];          // citations inside hidden blocks (to be blanked)
      var nextNum = 1;

      allCites.forEach(function (el) {
        var key = el.getAttribute('data-cite');
        if (!key) return;
        if (isHidden(el, doc)) { hiddenCites.push(el); return; }
        if (!keyToNum[key]) {
          keyToNum[key] = nextNum;
          numToKey[nextNum] = key;
          visibleOccurrences[key] = [];
          nextNum++;
        }
        visibleOccurrences[key].push({ el: el });
      });

      // (D) Render every visible inline marker as a forward link [N] with a
      // hover title = plain (de-HTML'd) reference text, so the existing tooltip
      // and the screen-reader title agree.
      Object.keys(visibleOccurrences).forEach(function (key) {
        var num = keyToNum[key];
        var occs = visibleOccurrences[key];
        var refText = refData[key] || key;
        var plainRef = refText.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
        occs.forEach(function (occ, i) {
          var el = occ.el;
          var anchorId = occs.length > 1 ? ('cite' + num + '-' + (i + 1)) : ('cite' + num);
          el.id = anchorId;
          el.innerHTML = '<a href="#ref' + num + '" data-ref="ref' + num +
            '" title="' + plainRef.replace(/"/g, '&quot;') +
            '" style="color:' + accent + ';text-decoration:none;">[' + num + ']</a>';
        });
      });

      // (E) Blank out hidden citations so a STALE number from the previous mode
      // never shows after toggling Focused -> ... -> Focused.
      hiddenCites.forEach(function (el) { el.innerHTML = ''; el.removeAttribute('id'); });

      // (F) Rebuild the visible References list wholesale: only refs with >=1
      // visible citation, in the new numeric order, with fresh #refN anchors.
      var refsContainer = doc.getElementById('references-list') ||
                          doc.querySelector('.references-list');
      if (refsContainer) {
        var asList = (refsContainer.tagName === 'OL' || refsContainer.tagName === 'UL');
        var html = '';
        for (var n = 1; n < nextNum; n++) {
          var key = numToKey[n];
          var text = refData[key] || key;
          var occs = visibleOccurrences[key];

          var label;
          if (!backlinks) {
            // Core default: show the number, not linked back.
            label = '[' + n + ']';
          } else if (occs.length === 1) {
            label = '<a href="#cite' + n + '" style="color:' + accent +
              ';text-decoration:none;" title="Jump back to citation">[' + n + ']</a>';
          } else {
            var subLinks = occs.map(function (occ, i) {
              var letter = String.fromCharCode(97 + i);
              return '<a href="#cite' + n + '-' + (i + 1) + '" style="color:#888;text-decoration:none;" title="Jump to occurrence ' + (i + 1) + '">' + letter + '</a>';
            }).join(', ');
            label = '<a href="#cite' + n + '-1" style="color:' + accent +
              ';text-decoration:none;">[' + n + ']</a> <span style="font-size:11px;color:#888;">[' + subLinks + ']</span>';
          }

          if (asList) {
            // <ol>/<ul>: the <li> carries the #refN anchor; numbering comes from
            // either the list itself (ol) or our explicit [N] label.
            html += '<li id="ref' + n + '">' + (backlinks ? ('<sup>' + label + '</sup> ') : '') + text + '</li>';
          } else {
            html += '<p id="ref' + n + '" style="margin:12px 0;padding-left:28px;text-indent:-28px;">' +
                    '<sup>' + label + '</sup> ' + text + '</p>';
          }
        }
        refsContainer.innerHTML = html;
      }

      // Expose the computed mapping for callers/tests (read-only snapshot).
      return { keyToNum: keyToNum, numToKey: numToKey, count: nextNum - 1, hidden: hiddenCites.length };
    } catch (e) { /* chapters without citations: silently no-op */ }
  }

  /* --------------------------------------------------------------------------
   * 4.5 ccAutoCaptions()  —  FIGURE / INTERACTIVE caption numbering
   * Numbers every element carrying [data-cap] from the VISIBLE set, in document
   * order, as ONE merged sequence (a Figure and an Interactive therefore never
   * share a number -- killing the duplicate-number class book-wide). Skips
   * depth-hidden captions in Focused exactly like sections/citations, so hiding a
   * figure in Concise renumbers the survivors ("18.5" -> "18.4"). The chapter
   * number prefixes it. data-cap="interactive" emits a trailing " &middot; "
   * before its sibling title text; data-cap="figure" emits just the label+number.
   * Idempotent: the visible text is recomputed from the data-* attrs every run.
   * In-text <span class="figref" data-figref="key"> are filled from the caption
   * whose data-cap-key matches, so a renumbered figure never strands a stale
   * "Figure 8.2" in prose.
   * ------------------------------------------------------------------------ */
  function ccAutoCaptions(doc) {
    doc = doc || document;
    try {
      var chNum = getChapterNum(doc);
      var caps = doc.querySelectorAll('[data-cap]');
      if (!caps.length) return { count: 0 };
      var keyToNum = {};
      var counts = {};   // SEPARATE sequence per label (Figure vs Interactive), textbook-style
      caps.forEach(function (el) {
        if (isHidden(el, doc)) { el.textContent = ''; return; }  // blank stale hidden
        var kind = el.getAttribute('data-cap');
        var label = (kind === 'interactive') ? 'Interactive' : 'Figure';
        counts[label] = (counts[label] || 0) + 1;
        var num = chNum ? (chNum + '.' + counts[label]) : String(counts[label]);
        var key = el.getAttribute('data-cap-key');
        if (key) keyToNum[key] = label + ' ' + num;
        // A widget-title prefix (class cap-num) emits the " &middot; " before its
        // sibling title text; a figcaption number span (class fnum) emits only the
        // label+number, with its description following as normal caption text.
        var titlePrefix = el.classList && el.classList.contains('cap-num');
        if (titlePrefix) {
          el.innerHTML = label + ' ' + num + ' &middot; ';
        } else {
          el.textContent = label + ' ' + num;
        }
      });
      doc.querySelectorAll('[data-figref]').forEach(function (r) {
        if (isHidden(r, doc)) { r.textContent = ''; return; }
        r.textContent = keyToNum[r.getAttribute('data-figref')] || '';
      });
      return { count: n };
    } catch (e) { /* chapters without captions: silently no-op */ }
  }

  /* --------------------------------------------------------------------------
   * 5. TOC HELPER
   * The shell owns its own "On this page" TOC. After a toggle it should resync
   * each TOC label to the (renumbered) heading text and hide rows whose heading
   * is now depth-hidden. This helper returns the current visible heading set so
   * a caller can rebuild/prune without re-implementing the predicate.
   * ------------------------------------------------------------------------ */
  function ccVisibleHeadings(doc) {
    doc = doc || document;
    var out = [];
    var headings = doc.querySelectorAll('h2[id], h3[id]');
    headings.forEach(function (h) {
      out.push({
        id: h.id,
        level: h.tagName === 'H3' ? 3 : 2,
        text: h.textContent.trim(),
        hidden: isHidden(h, doc) || (isFocused() &&
                 (h.hasAttribute('data-complete') || h.hasAttribute('data-verbose')))
      });
    });
    return out;
  }

  /* --------------------------------------------------------------------------
   * 6. injectDepthCSS()  —  THE ONLY VISIBILITY STEP  (port of MRV @2922)
   * Complete mode injects NOTHING (data-complete shows by default; data-focused
   * stays hidden via its own inline display:none). Focused mode injects the
   * hide/show rules. Idempotent: replaces a single <style id="cc-depth-style">.
   * Also removes any per-chapter standalone fallback so this engine is
   * authoritative (mirrors MRV removing #rs-standalone-density).
   * ------------------------------------------------------------------------ */
  function injectDepthCSS(doc) {
    doc = doc || document;
    try {
      var prev = doc.getElementById('cc-depth-style');
      if (prev) prev.remove();
      var prevEd = doc.getElementById('cc-edition-style');
      if (prevEd) prevEd.remove();
      var standalone = doc.getElementById('cc-standalone-density') ||
                       doc.getElementById('rs-standalone-density');
      if (standalone) standalone.remove();

      if (isFocused()) {
        var css =
          '[data-verbose]{display:none !important;}\n' +
          '[data-complete]{display:none !important;}\n' +
          '[data-focused]{display:block !important;}\n';
        var style = doc.createElement('style');
        style.id = 'cc-depth-style';
        style.textContent = css;
        (doc.head || doc.documentElement).appendChild(style);
      }

      // EDITION visibility — a SEPARATE <style>, appended AFTER the depth style so
      // off-edition hiding wins even over the [data-focused] reveal above (a
      // beginner-focused block must stay hidden in the advanced edition). Applies
      // in BOTH depths: hide every edition that is not the current one.
      var ecfg = getConfig();
      if (ecfg.editions) {
        var ecss = '';
        Object.keys(ecfg.editions).forEach(function (ed) {
          if (ed !== state.edition) ecss += '[data-edition="' + ed + '"]{display:none !important;}';
        });
        if (ecss) {
          var estyle = doc.createElement('style');
          estyle.id = 'cc-edition-style';
          estyle.textContent = ecss;
          (doc.head || doc.documentElement).appendChild(estyle);
        }
      }
    } catch (e) {}
  }

  /* --------------------------------------------------------------------------
   * 6.5 setupRefsAutoExpand()  —  click an in-text citation [N] -> open the
   * (collapsed) References <details> so the target entry is visible, then let the
   * jump land. Delegated + idempotent (wired once per document); harmless on
   * chapters whose References is not (yet) a <details>.
   * ------------------------------------------------------------------------ */
  function setupRefsAutoExpand(doc) {
    doc = doc || document;
    if (doc.__ccRefsExpandWired) return;
    doc.__ccRefsExpandWired = true;
    doc.addEventListener('click', function (e) {
      var a = (e.target && e.target.closest) ? e.target.closest('a[href^="#ref"]') : null;
      if (!a) return;
      var t = doc.getElementById(a.getAttribute('href').slice(1));
      if (!t) return;
      var det = t.closest ? t.closest('details') : null;
      if (det && !det.open) {
        det.open = true;
        setTimeout(function () { try { t.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (e2) {} }, 0);
      }
    }, false);
  }

  /* --------------------------------------------------------------------------
   * 7. applyDepth(mode, doc)  —  THE ORCHESTRATOR  (port of MRV applyDensity @2773)
   * Order matters and matches MRV exactly:
   *   1. normalize + persist depth
   *   2. inject visibility CSS (the only step that changes what is shown)
   *   3. ccAutoNumber()    (recompute section numbers from the visible set)
   *   4. ccAutoCitations() (recompute citation numbers + rebuild References)
   * TOC resync/prune is left to the caller (shell) via ccVisibleHeadings(),
   * because the shell owns the TOC DOM. Returns the citation mapping for tests.
   * ------------------------------------------------------------------------ */
  function applyView(edition, mode, doc) {
    doc = doc || document;
    var cfg = getConfig();
    if (edition != null) setEdition(edition);
    if (mode != null) {
      // Respect the allowed list: if a deployment does not allow the requested
      // depth, fall back to its default. (Professor-configurable, per VISION 2b.)
      if (cfg.allowed.indexOf(mode) === -1) mode = cfg.defaultDepth;
      setDepth(mode);
    }
    try {
      if (global.localStorage) {
        global.localStorage.setItem(cfg.storageKey, state.depth);
        global.localStorage.setItem(cfg.editionStorageKey, state.edition);
      }
    } catch (e) {}

    injectDepthCSS(doc);   // visibility: edition + depth
    ccAutoNumber(doc);     // sections from the visible set
    var citeInfo = ccAutoCitations(doc); // citations + References rebuild
    ccAutoCaptions(doc);                 // figure/interactive caption numbering
    setupRefsAutoExpand(doc);            // in-text cite click -> open References details
    return citeInfo;
  }

  // Thin wrappers (back-compat): set one axis, keep the other as-is.
  function applyDepth(mode, doc) { return applyView(null, mode, doc); }
  function applyEdition(edition, doc) { return applyView(edition, null, doc); }

  /* --------------------------------------------------------------------------
   * 8. init(doc)  —  convenience boot for IN-PAGE (non-iframe) usage
   * Reads the persisted depth (or DEPTH_CONFIG.default) and applies it. Safe to
   * call on DOMContentLoaded. When the shell drives an iframe it should instead
   * call applyDepth(mode, frame.contentDocument) on each load/toggle and skip
   * init() entirely.
   * ------------------------------------------------------------------------ */
  function init(doc) {
    doc = doc || document;
    var cfg = getConfig();
    var savedD = null, savedE = null;
    try {
      if (global.localStorage) {
        savedD = global.localStorage.getItem(cfg.storageKey);
        savedE = global.localStorage.getItem(cfg.editionStorageKey);
      }
    } catch (e) {}
    var mode = (savedD === 'focused' || savedD === 'complete') ? savedD : cfg.defaultDepth;
    var ed = (cfg.editions && cfg.editions[savedE]) ? savedE : cfg.defaultEdition;
    return applyView(ed, mode, doc);
  }

  /* --------------------------------------------------------------------------
   * 9. PUBLIC API
   * ------------------------------------------------------------------------ */
  var DepthEngine = {
    applyView: applyView,
    applyDepth: applyDepth,
    applyEdition: applyEdition,
    ccAutoNumber: ccAutoNumber,
    ccAutoCitations: ccAutoCitations,
    ccAutoCaptions: ccAutoCaptions,
    injectDepthCSS: injectDepthCSS,
    ccVisibleHeadings: ccVisibleHeadings,
    getChapterNum: getChapterNum,
    isDepthHidden: isDepthHidden,
    isEditionHidden: isEditionHidden,
    isHidden: isHidden,
    getDepth: getDepth,
    setDepth: setDepth,
    getEdition: getEdition,
    setEdition: setEdition,
    isFocused: isFocused,
    getConfig: getConfig,
    init: init
  };

  global.DepthEngine = DepthEngine;
  if (typeof module !== 'undefined' && module.exports) module.exports = DepthEngine;

})(typeof window !== 'undefined' ? window : this);
