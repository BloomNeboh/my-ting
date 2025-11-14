// Eliud — Professional Portfolio with Hip Hop Vibes
// - Theme switcher with ripple wave + accent cycling + ALIVE animations
// - Scroll-triggered reveal animations
// - Smooth nav (native CSS) + footer year
// - Contact form handling
// - Particle system with connections
// - Parallax effects
// - Magnetic interactions

(function () {
  const docEl = document.documentElement;
  const rippleRoot = document.getElementById('ripple-root');
  const themeToggle = document.getElementById('themeToggle');
  const menuToggle = document.getElementById('menuToggle');
  const particlesContainer = document.getElementById('particles');
  const gridCanvas = document.getElementById('grid-canvas');
  const contactForm = document.querySelector('.contact-form');

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

  // HOLOGRAPHIC GRID CANVAS
  function initHolographicGrid() {
    if (!gridCanvas || window.innerWidth < 768) return;
    
    const ctx = gridCanvas.getContext('2d');
    let animationFrame;
    
    function resizeCanvas() {
      gridCanvas.width = window.innerWidth;
      gridCanvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    let time = 0;
    const gridSize = 50;
    
    function drawGrid() {
      const lineColor = getCSS('--accent-2') || '#72ddff';
      ctx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 0.5;
      ctx.globalAlpha = 0.2;
      
      // Vertical lines with parallax
      for (let x = 0; x < gridCanvas.width; x += gridSize) {
        const offset = Math.sin(time + x * 0.001) * 2;
        ctx.beginPath();
        ctx.moveTo(x + offset, 0);
        ctx.lineTo(x + offset, gridCanvas.height);
        ctx.stroke();
      }
      
      // Horizontal lines with parallax
      for (let y = 0; y < gridCanvas.height; y += gridSize) {
        const offset = Math.cos(time + y * 0.001) * 2;
        ctx.beginPath();
        ctx.moveTo(0, y + offset);
        ctx.lineTo(gridCanvas.width, y + offset);
        ctx.stroke();
      }
      
      time += 0.01;
      animationFrame = requestAnimationFrame(drawGrid);
    }
    
    drawGrid();
  }

  // ADVANCED PARTICLE SYSTEM WITH CONNECTIONS
  const particles = [];
  const maxParticles = 25;
  
  function createParticle() {
    if (!particlesContainer || window.innerWidth < 768) return null;
    
    const particle = {
      element: document.createElement('div'),
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1
    };
    
    particle.element.className = 'particle';
    particle.element.style.width = particle.size + 'px';
    particle.element.style.height = particle.size + 'px';
    
    const accentColor = ACCENTS[accentIndex].main;
    particle.element.style.background = accentColor;
    particle.element.style.boxShadow = `0 0 ${particle.size * 2}px ${accentColor}`;
    
    particlesContainer.appendChild(particle.element);
    particles.push(particle);
    
    return particle;
  }

  function updateParticles() {
    if (window.innerWidth < 768) return;
    
    particles.forEach((particle, i) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Bounce off edges
      if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1;
      if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1;
      
      particle.element.style.left = particle.x + 'px';
      particle.element.style.top = particle.y + 'px';
    });
    
    requestAnimationFrame(updateParticles);
  }

  function initParticles() {
    if (window.innerWidth < 768) return;
    
    // Create initial particles
    for (let i = 0; i < maxParticles; i++) {
      createParticle();
    }
    
    // Start animation loop
    updateParticles();
  }

  initParticles();

  // MAGNETIC INTERACTIONS
  function initMagneticEffects() {
    const magneticElements = document.querySelectorAll('.magnetic, .magnetic-3d');
    
    magneticElements.forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const moveX = x * 0.15;
        const moveY = y * 0.15;
        
        if (el.classList.contains('magnetic-3d')) {
          const rotateX = (y / rect.height) * 10;
          const rotateY = (x / rect.width) * -10;
          el.style.transform = `translate(${moveX}px, ${moveY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        } else {
          el.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
        }
      });
      
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  }

  initMagneticEffects();

  // PARALLAX EFFECTS
  function initParallax() {
    const parallaxElements = document.querySelectorAll('.hero-img, .card.glass, .section-title');
    
    function updateParallax() {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      parallaxElements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < windowHeight && rect.bottom > 0;
        
        if (isVisible) {
          const speed = 0.1 + (index % 3) * 0.05;
          const yPos = -(scrollY * speed);
          const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
          
          // Add 3D rotation based on scroll
          if (el.classList.contains('magnetic-3d')) {
            const rotateX = (progress - 0.5) * 5;
            el.style.transform = `translateY(${yPos}px) rotateX(${rotateX}deg)`;
          } else {
            el.style.transform = `translateY(${yPos}px)`;
          }
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

  // ENHANCED THEME TOGGLE WITH ALIVE ANIMATION
  if (themeToggle) {
    const themeRipple = themeToggle.querySelector('.theme-ripple');
    
    themeToggle.addEventListener('click', () => {
      // Cycle accent and toggle theme
      accentIndex = (accentIndex + 1) % ACCENTS.length;
      updateAccent(accentIndex);
      toggleTheme();
      rippleFrom(themeToggle);
      
      // Trigger ripple animation
      if (themeRipple) {
        themeRipple.style.animation = 'none';
        void themeRipple.offsetWidth; // Force reflow
        themeRipple.style.animation = 'theme-ripple-expand 0.6s ease-out';
      }
      
      // retrigger reveal transitions slightly to dramatize
      setTimeout(() => triggerRevealOnToggle(), 150);
      
      // Update particles with new accent
      if (particlesContainer) {
        particles.forEach(particle => {
          const accentColor = ACCENTS[accentIndex].main;
          particle.element.style.background = accentColor;
          particle.element.style.boxShadow = `0 0 ${particle.size * 2}px ${accentColor}`;
        });
      }
    });
    
    // Add hover effect
    themeToggle.addEventListener('mouseenter', () => {
      if (themeRipple) {
        themeRipple.style.animation = 'theme-ripple-pulse 1s ease-in-out';
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

  // Initial accent sync
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
    document.getElementById('email-form'),
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

  // CONTACT FORM HANDLING
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('.form-submit');
      const name = this.querySelector('#name').value;
      const email = this.querySelector('#email').value;
      const subject = this.querySelector('#subject').value;
      const message = this.querySelector('#message').value;
      
      // Show loading state
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
      
      // Create mailto link
      const mailtoLink = `mailto:ellymchome503@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      // Reset form after a delay
      setTimeout(() => {
        this.reset();
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // Show success feedback
        const originalText = submitBtn.querySelector('span:first-child').textContent;
        submitBtn.querySelector('span:first-child').textContent = 'Message Sent! ✓';
        submitBtn.style.background = 'linear-gradient(180deg, #00f5a0, #44ffc3)';
        
        setTimeout(() => {
          submitBtn.querySelector('span:first-child').textContent = originalText;
          submitBtn.style.background = '';
        }, 3000);
      }, 500);
    });
  }

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
      if (window.innerWidth >= 768 && particles.length < 10) {
        initParticles();
      }
      
      // Reinitialize grid
      if (window.innerWidth >= 768) {
        initHolographicGrid();
      }
    }, 250);
  });

  // ADVANCED TEXT REVEAL
  function initTextReveal() {
    const textReveal = document.querySelector('.text-reveal');
    if (textReveal) {
      // Trigger reveal animation
      setTimeout(() => {
        textReveal.classList.add('is-visible');
      }, 300);
    }
    
    // Split text animation for tagline
    const textSplit = document.querySelector('.text-split');
    if (textSplit) {
      const words = textSplit.textContent.split(' ');
      textSplit.innerHTML = words.map((word, i) => 
        `<span style="animation-delay: ${i * 0.1}s; opacity: 0; animation: fade-in-word 0.6s ease forwards;">${word}</span>`
      ).join(' ');
    }
  }

  // Add CSS for word fade-in
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fade-in-word {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);

  initTextReveal();

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

  // Initialize grid
  if (window.innerWidth >= 768) {
    initHolographicGrid();
  }

  console.log('✨ Professional Portfolio with Hip Hop Vibes loaded!');
  console.log('🚀 Features: Enhanced Theme Toggle, Contact Form, Magnetic 3D, Particle System, Holographic Grid');
})();
