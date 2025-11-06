// Eliud — Portfolio Interactions
// - Theme switcher with ripple wave + accent cycling
// - Scroll-triggered reveal animations
// - Smooth nav (native CSS) + footer year

(function () {
  const docEl = document.documentElement;
  const rippleRoot = document.getElementById('ripple-root');
  const themeToggle = document.getElementById('themeToggle');
  const menuToggle = document.getElementById('menuToggle');

  // Accent palette rotation
  const ACCENTS = [
    { name: 'blue', main: getCSS('--accent-blue') || '#4cc9ff' },
    { name: 'green', main: getCSS('--accent-green') || '#00f5a0' },
    { name: 'orange', main: getCSS('--accent-orange') || '#ff8a00' },
    { name: 'pink', main: getCSS('--accent-pink') || '#ff46c6' }
  ];
  let accentIndex = 0;

  // Utilities
  function getCSS(varName) {
    return getComputedStyle(docEl).getPropertyValue(varName).trim();
  }
  function setCSS(varName, value) {
    docEl.style.setProperty(varName, value);
  }
  function currentTheme() {
    return docEl.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }
  function toggleTheme() {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    docEl.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch {}
    updateMetaThemeColor();
  }
  function updateAccent(index) {
    const a = ACCENTS[index % ACCENTS.length];
    // Compute a secondary accent for glow/gradient (slightly lighter)
    const secondary = a.name === 'blue' ? '#72ddff' :
                     a.name === 'green' ? '#44ffc3' :
                     a.name === 'orange' ? '#ffb357' : '#ff7bdd';
    setCSS('--accent', a.main);
    setCSS('--accent-2', secondary);
    // Update glow shadow based on accent color (use rgba derived)
    const rgba = hexToRgba(a.main, 1);
    setCSS('--glow', `0 0 24px ${rgba(0.65)}, 0 0 48px ${rgba(0.30)}`);
  }
  function hexToRgba(hex, alphaDefault) {
    const hx = hex.replace('#', '');
    const bigint = parseInt(hx.length === 3 ? hx.replace(/(.)/g, '$1$1') : hx, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return (a = alphaDefault) => `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  // Ripple: centered on the toggle button
  function rippleFrom(el) {
    if (!rippleRoot || !el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rip = document.createElement('span');
    rip.className = 'ripple';
    rip.style.left = `${cx}px`;
    rip.style.top = `${cy}px`;
    rippleRoot.appendChild(rip);
    rip.addEventListener('animationend', () => rip.remove());
  }

  // Theme toggle click
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      // Cycle accent and toggle theme
      accentIndex = (accentIndex + 1) % ACCENTS.length;
      updateAccent(accentIndex);
      toggleTheme();
      rippleFrom(themeToggle);
      // retrigger reveal transitions slightly to dramatize
      setTimeout(() => triggerRevealOnToggle(), 150);
    });
  }

  // Initialize theme: localStorage or system preference
  (function initTheme() {
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') {
        docEl.setAttribute('data-theme', saved);
      } else {
        const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
        docEl.setAttribute('data-theme', prefersLight ? 'light' : 'dark');
      }
    } catch {
      // ignore
    }
    updateMetaThemeColor();
  })();

  // Scroll Reveal
  const revealNodes = new Set();
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
        revealNodes.delete(entry.target);
      }
    }
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((el) => {
    revealNodes.add(el);
    io.observe(el);
  });

  function triggerRevealOnToggle() {
    // Subtle re-animation: temporarily remove and re-add class
    document.querySelectorAll('.is-visible').forEach((el) => {
      el.classList.remove('is-visible');
      // force reflow
      void el.offsetWidth;
      el.classList.add('is-visible');
    });
  }

  // Footer year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Initial accent sync (if user has a preference stored in future)
  updateAccent(accentIndex);

  // Mobile menu
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const open = docEl.getAttribute('data-menu-open') === 'true';
      const next = !open;
      docEl.setAttribute('data-menu-open', next ? 'true' : 'false');
      menuToggle.setAttribute('aria-expanded', next ? 'true' : 'false');
    });
    // Close on nav click (for one-page anchors)
    document.querySelectorAll('#primaryNav .nav-link').forEach((a) => {
      a.addEventListener('click', () => {
        docEl.setAttribute('data-menu-open', 'false');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Meta theme-color updater (for mobile browser UI)
  function updateMetaThemeColor() {
    const meta = document.querySelector("meta[name='theme-color']");
    if (!meta) return;
    const bg = getCSS('--bg');
    meta.setAttribute('content', bg || (currentTheme() === 'dark' ? '#0b0f14' : '#f7fafc'));
  }

  // Pointer tracking for about-card highlight
  function attachPointerHighlight(selector) {
    document.querySelectorAll(selector).forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        el.style.setProperty('--mx', `${x}%`);
        el.style.setProperty('--my', `${y}%`);
      });
    });
  }
  attachPointerHighlight('.values-grid .value, .about-story');

  // Roadmap: active section + moving indicator
  const sections = [
    document.getElementById('home'),
    document.getElementById('about'),
    document.getElementById('experience'),
    document.getElementById('referees'),
    document.getElementById('contact'),
  ].filter(Boolean);
  const dots = Array.from(document.querySelectorAll('.roadmap .road-dot'));
  const jeep = document.querySelector('.roadmap .road-jeep');

  // Scroll observer to set active
  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const idx = sections.indexOf(entry.target);
        if (idx >= 0) {
          dots.forEach((d, i) => d.classList.toggle('active', i === idx));
          const positions = [ '6%', '26%', '50%', '74%', '92%' ];
          docEl.style.setProperty('--jeep-y', positions[idx] || '6%');
          // set active-section for themed rail
          const secId = entry.target.id;
          if (secId) docEl.setAttribute('data-active-section', secId);
          // bounce jeep and create transient ripple near active dot
          if (jeep) {
            jeep.classList.remove('bounce');
            void jeep.offsetWidth; // reflow
            jeep.classList.add('bounce');
          }
          const activeDot = dots[idx];
          if (activeDot) {
            const ripple = document.createElement('span');
            ripple.className = 'road-ripple';
            // position ripple centered on the active dot row
            const dotTop = activeDot.style.top || window.getComputedStyle(activeDot).top;
            const topVal = dotTop && dotTop !== 'auto' ? dotTop : positions[idx];
            ripple.style.top = topVal;
            document.querySelector('.roadmap')?.appendChild(ripple);
            ripple.addEventListener('animationend', () => ripple.remove());
          }
        }
      }
    });
  }, { threshold: 0.52 });

  sections.forEach((sec) => activeObserver.observe(sec));

  // Click to scroll
  dots.forEach((dot, i) => {
    const targetSel = dot.getAttribute('data-target');
    dot.addEventListener('click', () => {
      const target = targetSel ? document.querySelector(targetSel) : sections[i];
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Experience expand/collapse
  document.querySelectorAll('.exp-card').forEach((card) => {
    const btn = card.querySelector('.exp-toggle');
    const panel = card.querySelector('.exp-more');
    if (!btn || !panel) return;

    function setExpanded(expanded) {
      card.setAttribute('data-expanded', expanded ? 'true' : 'false');
      btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      panel.hidden = !expanded;
      // for smooth transition, let CSS handle max-height on attribute change
      btn.textContent = expanded ? 'Show less' : 'Read more';
    }

    btn.addEventListener('click', () => {
      const expanded = card.getAttribute('data-expanded') === 'true';
      setExpanded(!expanded);
    });

    // Keyboard accessibility: open with Enter/Space when focused on card
    card.addEventListener('keypress', (e) => {
      if (e.target === btn) return; // button already handles
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const expanded = card.getAttribute('data-expanded') === 'true';
        setExpanded(!expanded);
      }
    });
  });
})();


