// Eliud — Portfolio Interactions (Enhanced)
// - Theme switcher with ripple wave + accent cycling
// - Scroll-triggered reveal animations
// - Smooth nav (native CSS) + footer year
// - NEW: Custom cursor, particle system, parallax effects, enhanced interactions

(function () {
  const docEl = document.documentElement;
  const rippleRoot = document.getElementById('ripple-root');
  const themeToggle = document.getElementById('themeToggle');
  const menuToggle = document.getElementById('menuToggle');
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');
  const particlesContainer = document.getElementById('particles');

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

  // CUSTOM CURSOR
  let mouseX = 0;
  let mouseY = 0;
  let followerX = 0;
  let followerY = 0;

  function updateCursor(e) {
    if (!cursor || !cursorFollower) return;
    
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';

    // Smooth follower with easing
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';

    // Check if hovering over interactive elements
    const hovered = e.target.closest('a, button, .nav-link, .exp-toggle, .star, .icon-link');
    if (hovered) {
      cursor.classList.add('hover');
      cursorFollower.classList.add('hover');
    } else {
      cursor.classList.remove('hover');
      cursorFollower.classList.remove('hover');
    }
  }

  // Only enable custom cursor on desktop
  if (window.innerWidth > 640) {
    document.addEventListener('mousemove', updateCursor);
  }

  // PARTICLE SYSTEM
  function createParticle() {
    if (!particlesContainer || window.innerWidth < 768) return;
    
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 3 + 1;
    const startX = Math.random() * window.innerWidth;
    const duration = Math.random() * 20 + 15;
    const delay = Math.random() * 5;
    
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = startX + 'px';
    particle.style.animationDuration = duration + 's';
    particle.style.animationDelay = delay + 's';
    
    // Random accent color
    const accentColor = ACCENTS[Math.floor(Math.random() * ACCENTS.length)].main;
    particle.style.background = accentColor;
    particle.style.boxShadow = `0 0 ${size * 2}px ${accentColor}`;
    
    particlesContainer.appendChild(particle);
    
    // Remove after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.remove();
      }
    }, (duration + delay) * 1000);
  }

  // Create particles periodically
  function initParticles() {
    if (window.innerWidth < 768) return;
    
    // Initial particles
    for (let i = 0; i < 15; i++) {
      setTimeout(() => createParticle(), i * 200);
    }
    
    // Continuous particle creation
    setInterval(() => {
      if (particlesContainer.children.length < 20) {
        createParticle();
      }
    }, 2000);
  }

  initParticles();

  // PARALLAX EFFECTS
  function initParallax() {
    const parallaxElements = document.querySelectorAll('.hero-img, .card.glass, .section-title');
    
    function updateParallax() {
      const scrollY = window.scrollY;
      
      parallaxElements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
          const speed = 0.1 + (index % 3) * 0.05;
          const yPos = -(scrollY * speed);
          el.style.transform = `translateY(${yPos}px)`;
        }
      });
    }
    
    // Throttle scroll events
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateParallax();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  initParallax();

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
      
      // Update particles with new accent
      if (particlesContainer) {
        Array.from(particlesContainer.children).forEach(particle => {
          const accentColor = ACCENTS[accentIndex].main;
          particle.style.background = accentColor;
          particle.style.boxShadow = `0 0 4px ${accentColor}`;
        });
      }
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

  // Scroll Reveal with stagger
  const revealNodes = new Set();
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        // Add stagger delay for grid items
        const isGridItem = entry.target.closest('.values-grid, .exp-grid, .refs-grid, .contact-row');
        if (isGridItem) {
          const items = Array.from(isGridItem.children);
          const index = items.indexOf(entry.target.closest('.value, .exp-card, .ref-card, .icon-link'));
          if (index >= 0) {
            setTimeout(() => {
              entry.target.classList.add('is-visible');
            }, index * 100);
          } else {
            entry.target.classList.add('is-visible');
          }
        } else {
          entry.target.classList.add('is-visible');
        }
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
  const stars = Array.from(document.querySelectorAll('.constellation .star'));

  // Scroll observer to set active
  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const idx = sections.indexOf(entry.target);
        if (idx >= 0) {
          // set active-section for themed rail
          const secId = entry.target.id;
          if (secId) docEl.setAttribute('data-active-section', secId);
          
          // Constellation: activate matching star, twinkle
          const activeStar = stars[idx];
          stars.forEach((s, i) => s.classList.toggle('active', i === idx));
          if (activeStar) {
            activeStar.classList.remove('twinkle');
            void activeStar.offsetWidth;
            activeStar.classList.add('twinkle');
            
            // Add ripple effect to active star
            const core = activeStar.querySelector('.core');
            if (core) {
              const ripple = document.createElement('circle');
              ripple.setAttribute('r', '4');
              ripple.setAttribute('class', 'ripple-star');
              ripple.style.fill = 'none';
              ripple.style.stroke = getCSS('--accent-2');
              ripple.style.strokeWidth = '2';
              ripple.style.opacity = '0.6';
              activeStar.appendChild(ripple);
              
              setTimeout(() => {
                ripple.style.transition = 'r 0.8s ease, opacity 0.8s ease';
                ripple.setAttribute('r', '20');
                ripple.style.opacity = '0';
                
                setTimeout(() => ripple.remove(), 800);
              }, 10);
            }
          }
        }
      }
    });
  }, { threshold: 0.52 });

  sections.forEach((sec) => activeObserver.observe(sec));

  // Constellation star click
  stars.forEach((star, i) => {
    const targetSel = star.getAttribute('data-target');
    star.addEventListener('click', () => {
      const target = targetSel ? document.querySelector(targetSel) : sections[i];
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Add click animation
        star.style.transform = 'scale(1.5)';
        setTimeout(() => {
          star.style.transform = '';
        }, 300);
      }
    });
  });

  // Experience expand/collapse with animation
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
      
      // Add bounce animation to card
      card.style.transform = 'scale(1.02)';
      setTimeout(() => {
        card.style.transform = '';
      }, 300);
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

  // Enhanced button interactions
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
    
    btn.addEventListener('mousedown', function() {
      this.style.transform = 'translateY(0) scale(0.98)';
    });
    
    btn.addEventListener('mouseup', function() {
      this.style.transform = 'translateY(-2px) scale(1.05)';
    });
  });

  // Icon link hover effects
  document.querySelectorAll('.icon-link').forEach((link) => {
    link.addEventListener('mouseenter', function() {
      const img = this.querySelector('img');
      if (img) {
        img.style.transform = 'scale(1.2) rotate(-10deg)';
      }
    });
    
    link.addEventListener('mouseleave', function() {
      const img = this.querySelector('img');
      if (img) {
        img.style.transform = '';
      }
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Window resize handler
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Reinitialize particles if needed
      if (window.innerWidth >= 768 && particlesContainer.children.length < 10) {
        initParticles();
      }
      
      // Disable custom cursor on mobile
      if (window.innerWidth <= 640) {
        if (cursor) cursor.style.display = 'none';
        if (cursorFollower) cursorFollower.style.display = 'none';
        document.body.style.cursor = 'auto';
      } else {
        if (cursor) cursor.style.display = 'block';
        if (cursorFollower) cursorFollower.style.display = 'block';
        document.body.style.cursor = 'none';
      }
    }, 250);
  });

  // Initial cursor visibility check
  if (window.innerWidth <= 640) {
    if (cursor) cursor.style.display = 'none';
    if (cursorFollower) cursorFollower.style.display = 'none';
    document.body.style.cursor = 'auto';
  }

  // Add entrance animation to hero title
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    setTimeout(() => {
      heroTitle.style.animation = 'title-glow 3s ease-in-out infinite, floating 3s ease-in-out infinite';
    }, 500);
  }

  // Add typewriter effect to hero role
  const heroRole = document.querySelector('.hero-role');
  if (heroRole && !heroRole.classList.contains('typewriter-complete')) {
    heroRole.classList.add('typewriter-complete');
  }

  console.log('✨ Portfolio enhanced with eye-catching animations!');
})();
