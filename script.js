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

  // Update grid color on accent change
  const originalUpdateAccent = updateAccent;
  updateAccent = function(index) {
    originalUpdateAccent(index);
    if (gridCanvas) {
      // Grid will update on next frame
    }
  };

  console.log('✨ Next-Gen Portfolio loaded with cutting-edge features!');
  console.log('🚀 Features: Holographic Grid, Magnetic 3D, Particle Connections, Advanced Cursor, Mouse Trails');
})();ent for glow/gradient (slightly lighter)
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
    const lineColor = getCSS('--accent-2') || '#72ddff';
    
    function drawGrid() {
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

  // MOUSE TRAIL SYSTEM
  let trailDots = [];
  let lastTrailTime = 0;
  
  function createMouseTrail(e) {
    if (!mouseTrailContainer || window.innerWidth < 768) return;
    
    const now = Date.now();
    if (now - lastTrailTime < 16) return; // Throttle to ~60fps
    lastTrailTime = now;
    
    const dot = document.createElement('div');
    dot.className = 'trail-dot';
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
    
    const accentColor = ACCENTS[accentIndex].main;
    dot.style.background = accentColor;
    dot.style.boxShadow = `0 0 8px ${accentColor}`;
    
    mouseTrailContainer.appendChild(dot);
    
    setTimeout(() => {
      if (dot.parentNode) {
        dot.remove();
      }
    }, 800);
  }

  // CUSTOM CURSOR WITH TRAIL
  let mouseX = 0;
  let mouseY = 0;
  let followerX = 0;
  let followerY = 0;
  let trailX = 0;
  let trailY = 0;

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

    // Cursor trail with more delay
    if (cursorTrail) {
      trailX += (mouseX - trailX) * 0.05;
      trailY += (mouseY - trailY) * 0.05;
      cursorTrail.style.left = trailX + 'px';
      cursorTrail.style.top = trailY + 'px';
    }

    // Create mouse trail dots
    createMouseTrail(e);

    // Check if hovering over interactive elements
    const hovered = e.target.closest('a, button, .nav-link, .exp-toggle, .star, .icon-link');
    if (hovered) {
      cursor.classList.add('hover');
      cursorFollower.classList.add('hover');
      if (cursorTrail) cursorTrail.classList.add('hover');
    } else {
      cursor.classList.remove('hover');
      cursorFollower.classList.remove('hover');
      if (cursorTrail) cursorTrail.classList.remove('hover');
    }
  }

  // Only enable custom cursor on desktop
  if (window.innerWidth > 640) {
    document.addEventListener('mousemove', updateCursor);
    initHolographicGrid();
  }

  // ADVANCED PARTICLE SYSTEM WITH CONNECTIONS
  const particles = [];
  const maxParticles = 30;
  
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
      
      // Draw connections to nearby particles
      particles.slice(i + 1).forEach(otherParticle => {
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          // Create connection line if it doesn't exist
          let connection = particlesContainer.querySelector(`[data-connection="${i}-${particles.indexOf(otherParticle)}"]`);
          if (!connection) {
            connection = document.createElement('div');
            connection.className = 'particle-connection';
            connection.setAttribute('data-connection', `${i}-${particles.indexOf(otherParticle)}`);
            particlesContainer.appendChild(connection);
          }
          
          const angle = Math.atan2(dy, dx) * 180 / Math.PI;
          connection.style.width = distance + 'px';
          connection.style.left = otherParticle.x + 'px';
          connection.style.top = otherParticle.y + 'px';
          connection.style.transform = `rotate(${angle}deg)`;
          connection.style.opacity = (1 - distance / 150) * 0.3;
        }
      });
    });
    
    // Remove old connections
    particlesContainer.querySelectorAll('.particle-connection').forEach(conn => {
      const [i, j] = conn.getAttribute('data-connection').split('-').map(Number);
      if (!particles[i] || !particles[j]) {
        conn.remove();
      } else {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > 150) {
          conn.remove();
        }
      }
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

  // ADVANCED PARALLAX EFFECTS WITH 3D
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

  // Update grid color on accent change
  const originalUpdateAccent = updateAccent;
  updateAccent = function(index) {
    originalUpdateAccent(index);
    if (gridCanvas) {
      // Grid will update on next frame
    }
  };

  console.log('✨ Next-Gen Portfolio loaded with cutting-edge features!');
  console.log('🚀 Features: Holographic Grid, Magnetic 3D, Particle Connections, Advanced Cursor, Mouse Trails');
})();
