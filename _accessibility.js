/* =============================================================
   Core Marketing v3 — Accessibility Toggle Controller
   -------------------------------------------------------------
   - Reads four toggle states from localStorage on load
   - Sets data-a11y-* attributes on <html> so _accessibility.css
     can scope its overrides
   - Wires up checkboxes on the bookshelf panel (if present)
   - Adds a small floating accessibility button on chapter pages
     so the reader can toggle in-place
   - Listens for storage events to propagate changes across tabs
   ============================================================= */
(function () {
  'use strict';

  var STORAGE_KEY = 'cm_a11y_v1';

  var TOGGLES = [
    {
      id: 'contrast',
      attr: 'data-a11y-contrast',
      onValue: 'high',
      label: 'High contrast text',
      help: 'Switches secondary text to a darker neutral so it meets WCAG AA 4.5:1.'
    },
    {
      id: 'text',
      attr: 'data-a11y-text',
      onValue: 'large',
      label: 'Large text',
      help: 'Bumps body text from 19 to 22 pixels and sidenotes from 13 to 17.'
    },
    {
      id: 'motion',
      attr: 'data-a11y-motion',
      onValue: 'reduced',
      label: 'Reduced motion',
      help: 'Turns off scroll-triggered fade-ins, sidenote reveals, and sketch draw-in.'
    },
    {
      id: 'font',
      attr: 'data-a11y-font',
      onValue: 'dyslexia',
      label: 'Dyslexia-friendly font',
      help: 'Swaps the EB Garamond body type for Atkinson Hyperlegible.'
    }
  ];

  function readState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      var parsed = JSON.parse(raw);
      var state = defaultState();
      TOGGLES.forEach(function (t) {
        if (typeof parsed[t.id] === 'boolean') state[t.id] = parsed[t.id];
      });
      return state;
    } catch (e) {
      return defaultState();
    }
  }

  function defaultState() {
    var s = {};
    TOGGLES.forEach(function (t) { s[t.id] = false; });
    return s;
  }

  function writeState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      // localStorage unavailable; runtime toggling still works for this page.
    }
  }

  function applyState(state) {
    var html = document.documentElement;
    TOGGLES.forEach(function (t) {
      if (state[t.id]) {
        html.setAttribute(t.attr, t.onValue);
      } else {
        html.removeAttribute(t.attr);
      }
    });
  }

  function syncCheckboxes(state) {
    TOGGLES.forEach(function (t) {
      var els = document.querySelectorAll('input[type="checkbox"][data-a11y-toggle="' + t.id + '"]');
      els.forEach(function (el) { el.checked = !!state[t.id]; });
    });
  }

  function attachCheckboxHandlers(state) {
    TOGGLES.forEach(function (t) {
      var els = document.querySelectorAll('input[type="checkbox"][data-a11y-toggle="' + t.id + '"]');
      els.forEach(function (el) {
        el.addEventListener('change', function () {
          state[t.id] = !!el.checked;
          writeState(state);
          applyState(state);
          syncCheckboxes(state);
        });
      });
    });
  }

  function buildFloatingControl(state) {
    // Only render on pages that did not already include their own panel.
    if (document.querySelector('.a11y-panel')) return;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'a11y-fab';
    btn.setAttribute('aria-label', 'Accessibility options');
    btn.setAttribute('aria-expanded', 'false');
    btn.textContent = 'A11Y';

    var pop = document.createElement('div');
    pop.className = 'a11y-popover';
    pop.setAttribute('role', 'dialog');
    pop.setAttribute('aria-label', 'Accessibility options');

    var heading = document.createElement('h4');
    heading.textContent = 'Accessibility';
    pop.appendChild(heading);

    TOGGLES.forEach(function (t) {
      var label = document.createElement('label');
      label.className = 'a11y-option';

      var input = document.createElement('input');
      input.type = 'checkbox';
      input.setAttribute('data-a11y-toggle', t.id);
      input.checked = !!state[t.id];

      var textWrap = document.createElement('span');
      textWrap.className = 'a11y-option-text';

      var lbl = document.createElement('span');
      lbl.className = 'a11y-option-label';
      lbl.textContent = t.label;

      var help = document.createElement('span');
      help.className = 'a11y-option-help';
      help.textContent = t.help;

      textWrap.appendChild(lbl);
      textWrap.appendChild(help);
      label.appendChild(input);
      label.appendChild(textWrap);
      pop.appendChild(label);
    });

    btn.addEventListener('click', function () {
      var open = pop.getAttribute('data-open') === 'true';
      pop.setAttribute('data-open', open ? 'false' : 'true');
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
    });

    document.addEventListener('click', function (e) {
      if (!pop.contains(e.target) && e.target !== btn) {
        pop.setAttribute('data-open', 'false');
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        pop.setAttribute('data-open', 'false');
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    document.body.appendChild(btn);
    document.body.appendChild(pop);
  }

  function onStorage(e) {
    if (e.key !== STORAGE_KEY) return;
    var state = readState();
    applyState(state);
    syncCheckboxes(state);
  }

  // Apply state as early as possible to avoid flash of un-styled overrides.
  var initialState = readState();
  applyState(initialState);

  function onReady() {
    syncCheckboxes(initialState);
    attachCheckboxHandlers(initialState);
    buildFloatingControl(initialState);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }

  window.addEventListener('storage', onStorage);

  // Expose for debugging / tests.
  window.CoreMarketingA11y = {
    read: readState,
    apply: applyState,
    state: initialState,
    toggles: TOGGLES,
    STORAGE_KEY: STORAGE_KEY
  };
})();
