// Eliud — Portfolio Interactions
// - Theme switcher with ripple wave + accent cycling
// - Scroll-triggered reveal animations
// - Smooth nav (native CSS) + footer year

(function () {
  const docEl = document.documentElement;
  const rippleRoot = document.getElementById('ripple-root');
  const themeToggle = document.getElementById('themeToggle');

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
})();


