/* ============================================================================
 * _chapter_refs.js
 * ----------------------------------------------------------------------------
 * Canonical chapter-number resolver for the 27-chapter v3 spine.
 *
 * Purpose:
 *   Cross-chapter references in the book HTML are currently HARDCODED ("see
 *   Chapter 4", "introduced in Ch 16", "covered in chapter 9"). When the
 *   spine renumbers, every hardcoded reference becomes a mismatch hunt.
 *   This module exposes a slug-based resolver so chapters can write the
 *   reference once, by intent, and the renderer fills in the current number.
 *
 * Usage pattern (forward migration, do not retrofit every legacy ref):
 *
 *   <span data-chref="foundations.research">Chapter <span class="cnum">5</span></span>
 *   <span data-chsec="foundations.research" data-sec="3">section <span class="csec">5.3</span></span>
 *
 *   On DOMContentLoaded, this module walks every [data-chref] / [data-chsec]
 *   element, looks the slug up in window.CHAPTER_MAP, and overwrites the
 *   .cnum / .csec text content with the resolved number. If the slug is
 *   unknown, the element gets data-chref-status="unknown" and the fallback
 *   text the author wrote stays in place. No layout shift in either case.
 *
 * Migration policy:
 *   - New cross-references SHOULD use data-chref / data-chsec.
 *   - Existing hardcoded refs stay hardcoded for now; the remap document at
 *     core-course/wiki/course/_CROSS_CHAPTER_REF_REMAP.md tracks every
 *     hardcoded site so a later pass can migrate them in batches.
 *   - The chref(slug) helper is also exposed for inline JS that needs to
 *     compute a chapter number dynamically (e.g. in a generated figure
 *     caption).
 *
 * ============================================================================
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
   * 1. The canonical 27-chapter map.
   *
   * Slugs are intentionally namespaced by part so the reader of the resolver
   * sees the spine shape (Foundations / Strategy / Offer / Place / Demand /
   * Performance / Synthesis) and so the same slug never collides across
   * parts. When the spine renumbers, only the right-hand side of this map
   * changes. Every chapter HTML that uses data-chref keeps working.
   * --------------------------------------------------------------------------
   */
  var CHAPTER_MAP = {
    /* Part I. Foundations */
    'foundations.ai':                  1,
    'foundations.what-marketing-is':   2,
    'foundations.environment':         3,
    'foundations.buyers':              4,
    'foundations.research':            5,

    /* Part II. Strategy */
    'strategy.stp':                    6,
    'strategy.brands':                 7,

    /* Part III. Offer */
    'offer.product-management':        8,
    'offer.services':                  9,
    'offer.pricing':                  10,

    /* Part IV. Place */
    'place.distribution':             11,
    'place.retail':                   12,
    'place.dtc':                      13,
    'place.mobile-app':               14,
    'place.international':            15,

    /* Part V. Demand */
    'demand.promotions':              16,
    'demand.content':                 17,
    'demand.digital':                 18,
    'demand.social':                  19,
    'demand.creator':                 20,
    'demand.lifecycle':               21,
    'demand.pr-crisis':               22,

    /* Part VI. Performance */
    'performance.sales-alignment':    23,
    'performance.plan-analytics':     24,
    'performance.finance':            25,

    /* Part VII. Synthesis */
    'synthesis.ethics-ai':            26,
    'synthesis.capstone':             27
  };

  /* Reverse lookup: number -> slug. Built once at module load for any caller
   * that needs to ask "what slug is chapter 7?" rather than "what number is
   * brands?".
   */
  var NUMBER_TO_SLUG = {};
  Object.keys(CHAPTER_MAP).forEach(function (slug) {
    NUMBER_TO_SLUG[CHAPTER_MAP[slug]] = slug;
  });

  /* --------------------------------------------------------------------------
   * 2. Public API on window.
   * --------------------------------------------------------------------------
   */

  /**
   * Returns the canonical chapter number for a slug. Returns null if the
   * slug is not known (so the caller can fall back to its hardcoded number).
   */
  function chref(slug) {
    if (slug && Object.prototype.hasOwnProperty.call(CHAPTER_MAP, slug)) {
      return CHAPTER_MAP[slug];
    }
    return null;
  }

  /**
   * Returns the slug for a given chapter number. Used by the capture and
   * QA scripts that walk a chapter and need to know its semantic identity.
   */
  function chrefSlug(num) {
    var n = parseInt(num, 10);
    if (!isNaN(n) && Object.prototype.hasOwnProperty.call(NUMBER_TO_SLUG, n)) {
      return NUMBER_TO_SLUG[n];
    }
    return null;
  }

  /**
   * Resolves a [data-chref] / [data-chsec] element. Writes the resolved
   * number into the nested .cnum / .csec child. If the slug is unknown,
   * sets data-chref-status="unknown" so a linter can flag it and leaves
   * the author's fallback text in place.
   */
  function resolveOne(el) {
    var slug = el.getAttribute('data-chref') || el.getAttribute('data-chsec');
    if (!slug) return;
    var num = chref(slug);
    if (num === null) {
      el.setAttribute('data-chref-status', 'unknown');
      return;
    }
    el.setAttribute('data-chref-status', 'resolved');

    /* Chapter-only ref: overwrite .cnum text. */
    var cnum = el.querySelector('.cnum');
    if (cnum) cnum.textContent = String(num);

    /* Section ref: overwrite .csec text as "N.M". The author writes
     * data-sec="M" on the wrapper to specify which subsection. */
    var csec = el.querySelector('.csec');
    if (csec) {
      var sec = el.getAttribute('data-sec');
      if (sec) {
        csec.textContent = num + '.' + sec;
      } else {
        csec.textContent = String(num);
      }
    }
  }

  function resolveAll(root) {
    var scope = root || document;
    var nodes = scope.querySelectorAll('[data-chref], [data-chsec]');
    for (var i = 0; i < nodes.length; i++) {
      resolveOne(nodes[i]);
    }
  }

  /* --------------------------------------------------------------------------
   * 3. Bootstrap: resolve on DOMContentLoaded so any data-chref reference
   *    in the static HTML is filled in before the reader scrolls past.
   * --------------------------------------------------------------------------
   */
  if (typeof window !== 'undefined') {
    window.CHAPTER_MAP = CHAPTER_MAP;
    window.NUMBER_TO_SLUG = NUMBER_TO_SLUG;
    window.chref = chref;
    window.chrefSlug = chrefSlug;
    window.chrefResolveAll = resolveAll;

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { resolveAll(); });
    } else {
      resolveAll();
    }
  }
})();
