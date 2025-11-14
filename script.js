  console.log('✨ Professional Portfolio with Hip Hop Vibes loaded!');
  console.log('🚀 Features: Enhanced Theme Toggle, Contact Form, Magnetic 3D, Particle System, Holographic Grid');

  // AI ASSISTANT FUNCTIONALITY
  const aiToggle = document.getElementById('ai-toggle');
  const aiChat = document.getElementById('ai-chat');
  const aiClose = document.getElementById('ai-close');
  const aiInput = document.getElementById('ai-input');
  const aiSend = document.getElementById('ai-send');
  const aiMessages = document.getElementById('ai-messages');

  // AI Knowledge Base - All about Eliud
  const aiKnowledge = {
    name: 'Eliud',
    role: 'Tourism Marketing Manager & Web Developer',
    email: 'ellymchome503@gmail.com',
    whatsapp: '+255621671652',
    services: [
      'Tourism Marketing - Destination campaigns, partner funnels, email drips, retargeting sequences',
      'Web Development - Responsive websites, modern stacks, SEO foundations, component libraries',
      'Branding Projects - Brand systems, design tokens, visual identity',
      'Content Creation - Multimedia stories, social assets, short-form video with CTAs'
    ],
    experience: [
      'Tourism Marketing - Designed destination campaigns, built partner funnels, optimized content calendars',
      'Web Development & Branding - Shipped responsive websites, created component libraries, integrated analytics',
      'Content Creation - Produced multimedia stories, managed social assets, scripted short-form video'
    ],
    values: [
      'Creativity - Original concepts with measurable outcomes',
      'Reliability - Clear comms, tight delivery, ownership from brief to ship',
      'Digital Excellence - Performance-first design, clean code, systems that scale'
    ],
    referees: [
      'Abuu Karata - General Manager, Airport Planet Lodge',
      'Alex Benson Sichona - Ass. Lecturer, University of Dar es Salaam',
      'Maria Donath Labila - Tour Operator, Tupande Usambara Cultural Tour'
    ],
    tagline: 'I map dreams to journeys, code visions to clicks rhythm in strategy, harmony in pixels, momentum in the market.',
    about: 'I build magnetic brand stories for destinations and craft digital experiences that convert. From GTM strategy to web flows, my work blends research, empathy, and precise execution.'
  };

  // AI Response Generator
  function generateAIResponse(userMessage) {
    const message = userMessage.toLowerCase().trim();
    
    // Greetings
    if (message.match(/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/)) {
      return `Hello! 👋 I'm Eliud's AI Assistant. I'm here to help you learn about ${aiKnowledge.name}'s services, experience, and how to get in touch. What would you like to know?`;
    }
    
    // Name
    if (message.match(/(who are you|what's your name|your name|who is eliud|tell me about eliud)/)) {
      return `${aiKnowledge.name} is a ${aiKnowledge.role}. ${aiKnowledge.about} ${aiKnowledge.tagline}`;
    }
    
    // Services
    if (message.match(/(services|what can|what do you|offer|provide|capabilities|skills)/)) {
      return `Here are ${aiKnowledge.name}'s main services:\n\n${aiKnowledge.services.map((s, i) => `${i + 1}. ${s}`).join('\n\n')}\n\nWould you like more details about any specific service?`;
    }
    
    // Experience
    if (message.match(/(experience|background|work|projects|portfolio|what has|done)/)) {
      return `${aiKnowledge.name} has experience in:\n\n${aiKnowledge.experience.map((e, i) => `${i + 1}. ${e}`).join('\n\n')}\n\nYou can see more details in the Experience section above!`;
    }
    
    // Contact
    if (message.match(/(contact|email|phone|whatsapp|reach|get in touch|how to contact|connect)/)) {
      return `You can reach ${aiKnowledge.name} through:\n\n📧 Email: ${aiKnowledge.email}\n📱 WhatsApp: ${aiKnowledge.whatsapp}\n\nOr use the contact form above to send a direct message! You can also book a coffee meeting via Cal.com.`;
    }
    
    // Pricing/Cost
    if (message.match(/(price|cost|fee|rate|how much|pricing|budget)/)) {
      return `For pricing and project quotes, please reach out directly via email (${aiKnowledge.email}) or WhatsApp (${aiKnowledge.whatsapp}). ${aiKnowledge.name} provides customized quotes based on your specific project needs.`;
    }
    
    // Availability
    if (message.match(/(available|free|busy|when|schedule|timeline|time)/)) {
      return `${aiKnowledge.name} is available for new projects! You can book a coffee meeting through the Cal.com link in the footer, or reach out via WhatsApp for immediate inquiries.`;
    }
    
    // Tourism Marketing
    if (message.match(/(tourism|marketing|destination|campaign|travel|tourism marketing)/)) {
      return `${aiKnowledge.name} specializes in tourism marketing, including:\n\n• Destination campaigns that increase inquiries and bookings\n• Partner funnels and email drip campaigns\n• Retargeting sequences\n• Content calendars mapped to traveler intent\n• Geo-targeted creative and landing pages\n• Multi-touch attribution dashboards\n\nInterested in discussing a tourism marketing project?`;
    }
    
    // Web Development
    if (message.match(/(web|website|development|developer|coding|build|create website|web dev)/)) {
      return `${aiKnowledge.name} offers web development services:\n\n• Responsive websites with modern tech stacks\n• SEO foundations and optimization\n• Component libraries and brand systems\n• Analytics integration and A/B testing\n• Performance-first design\n• Clean, scalable code\n\nReady to build something amazing?`;
    }
    
    // Portfolio/Projects
    if (message.match(/(portfolio|projects|work|examples|showcase|samples|previous work)/)) {
      return `You're currently viewing ${aiKnowledge.name}'s portfolio! This site itself showcases the quality of work. For specific project examples and case studies, please reach out directly. ${aiKnowledge.name} has worked with various clients including hotels, tour operators, and educational institutions.`;
    }
    
    // Referees/Testimonials
    if (message.match(/(referee|testimonial|reference|review|feedback|client|satisfied)/)) {
      return `${aiKnowledge.name} has worked with trusted partners:\n\n${aiKnowledge.referees.map((r, i) => `${i + 1}. ${r}`).join('\n\n')}\n\nYou can see their testimonials in the Referees section above!`;
    }
    
    // Values/Approach
    if (message.match(/(values|approach|philosophy|how|method|way|style)/)) {
      return `${aiKnowledge.name}'s core values:\n\n${aiKnowledge.values.map((v, i) => `${i + 1}. ${v}`).join('\n\n')}\n\nThis approach ensures every project delivers measurable results and exceptional quality.`;
    }
    
    // CV/Resume
    if (message.match(/(cv|resume|download|pdf|curriculum|vitae)/)) {
      return `You can download ${aiKnowledge.name}'s CV by clicking the "Download CV" button in the hero section above!`;
    }
    
    // Default response
    const defaultResponses = [
      `I'm not sure I understand that question. Could you ask about ${aiKnowledge.name}'s services, experience, or how to get in touch?`,
      `Hmm, let me help you better. You can ask me about:\n• Services offered\n• Experience and background\n• How to contact ${aiKnowledge.name}\n• Tourism marketing\n• Web development\n• Or anything else about the portfolio!`,
      `I'd be happy to help! Try asking about ${aiKnowledge.name}'s services, experience, contact information, or specific areas like tourism marketing or web development.`
    ];
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  }

  // Add message to chat
  function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ${isUser ? 'user' : 'ai'}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'ai-message-avatar';
    avatar.textContent = isUser ? '👤' : '🤖';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'ai-message-content';
    messageContent.textContent = content;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageContent);
    aiMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    aiMessages.scrollTop = aiMessages.scrollHeight;
    
    return messageDiv;
  }

  // Show typing indicator
  function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'ai-message ai';
    typingDiv.id = 'ai-typing';
    
    const avatar = document.createElement('div');
    avatar.className = 'ai-message-avatar';
    avatar.textContent = '🤖';
    
    const typingContent = document.createElement('div');
    typingContent.className = 'ai-message-typing';
    typingContent.innerHTML = '<span></span><span></span><span></span>';
    
    typingDiv.appendChild(avatar);
    typingDiv.appendChild(typingContent);
    aiMessages.appendChild(typingDiv);
    aiMessages.scrollTop = aiMessages.scrollHeight;
    
    return typingDiv;
  }

  // Remove typing indicator
  function removeTyping() {
    const typing = document.getElementById('ai-typing');
    if (typing) typing.remove();
  }

  // Send message
  function sendMessage() {
    const message = aiInput.value.trim();
    if (!message) return;
    
    // Add user message
    addMessage(message, true);
    aiInput.value = '';
    
    // Show typing indicator
    const typing = showTyping();
    
    // Generate and show AI response after delay
    setTimeout(() => {
      removeTyping();
      const response = generateAIResponse(message);
      addMessage(response);
    }, 800 + Math.random() * 400); // Simulate thinking time
  }

  // Toggle chat
  if (aiToggle && aiChat) {
    aiToggle.addEventListener('click', () => {
      const isActive = aiChat.classList.contains('active');
      if (!isActive) {
        aiChat.classList.add('active');
        aiChat.setAttribute('aria-hidden', 'false');
        aiInput.focus();
        
        // Add welcome message if chat is empty
        if (aiMessages.children.length === 0) {
          setTimeout(() => {
            addMessage(`Hello! 👋 I'm ${aiKnowledge.name}'s AI Assistant. I can help you learn about services, experience, and how to get in touch. What would you like to know?`);
          }, 300);
        }
      }
    });
  }

  // Close chat
  if (aiClose) {
    aiClose.addEventListener('click', () => {
      aiChat.classList.remove('active');
      aiChat.setAttribute('aria-hidden', 'true');
    });
  }

  // Send on button click
  if (aiSend) {
    aiSend.addEventListener('click', sendMessage);
  }

  // Send on Enter key
  if (aiInput) {
    aiInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  }

  // Close chat when clicking outside (optional)
  document.addEventListener('click', (e) => {
    if (aiChat && aiChat.classList.contains('active')) {
      if (!aiChat.contains(e.target) && !aiToggle.contains(e.target)) {
        // Optional: uncomment to close on outside click
        // aiChat.classList.remove('active');
        // aiChat.setAttribute('aria-hidden', 'true');
      }
    }
  });

  console.log('🤖 AI Assistant loaded and ready!');
})();ete(entry.target);
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

  // AI ASSISTANT FUNCTIONALITY
  const aiToggle = document.getElementById('ai-toggle');
  const aiChat = document.getElementById('ai-chat');
  const aiClose = document.getElementById('ai-close');
  const aiInput = document.getElementById('ai-input');
  const aiSend = document.getElementById('ai-send');
  const aiMessages = document.getElementById('ai-messages');

  // AI Knowledge Base - All about Eliud
  const aiKnowledge = {
    name: 'Eliud',
    role: 'Tourism Marketing Manager & Web Developer',
    email: 'ellymchome503@gmail.com',
    whatsapp: '+255621671652',
    services: [
      'Tourism Marketing - Destination campaigns, partner funnels, email drips, retargeting sequences',
      'Web Development - Responsive websites, modern stacks, SEO foundations, component libraries',
      'Branding Projects - Brand systems, design tokens, visual identity',
      'Content Creation - Multimedia stories, social assets, short-form video with CTAs'
    ],
    experience: [
      'Tourism Marketing - Designed destination campaigns, built partner funnels, optimized content calendars',
      'Web Development & Branding - Shipped responsive websites, created component libraries, integrated analytics',
      'Content Creation - Produced multimedia stories, managed social assets, scripted short-form video'
    ],
    values: [
      'Creativity - Original concepts with measurable outcomes',
      'Reliability - Clear comms, tight delivery, ownership from brief to ship',
      'Digital Excellence - Performance-first design, clean code, systems that scale'
    ],
    referees: [
      'Abuu Karata - General Manager, Airport Planet Lodge',
      'Alex Benson Sichona - Ass. Lecturer, University of Dar es Salaam',
      'Maria Donath Labila - Tour Operator, Tupande Usambara Cultural Tour'
    ],
    tagline: 'I map dreams to journeys, code visions to clicks rhythm in strategy, harmony in pixels, momentum in the market.',
    about: 'I build magnetic brand stories for destinations and craft digital experiences that convert. From GTM strategy to web flows, my work blends research, empathy, and precise execution.'
  };

  // AI Response Generator
  function generateAIResponse(userMessage) {
    const message = userMessage.toLowerCase().trim();
    
    // Greetings
    if (message.match(/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/)) {
      return `Hello! 👋 I'm Eliud's AI Assistant. I'm here to help you learn about ${aiKnowledge.name}'s services, experience, and how to get in touch. What would you like to know?`;
    }
    
    // Name
    if (message.match(/(who are you|what's your name|your name|who is eliud|tell me about eliud)/)) {
      return `${aiKnowledge.name} is a ${aiKnowledge.role}. ${aiKnowledge.about} ${aiKnowledge.tagline}`;
    }
    
    // Services
    if (message.match(/(services|what can|what do you|offer|provide|capabilities|skills)/)) {
      return `Here are ${aiKnowledge.name}'s main services:\n\n${aiKnowledge.services.map((s, i) => `${i + 1}. ${s}`).join('\n\n')}\n\nWould you like more details about any specific service?`;
    }
    
    // Experience
    if (message.match(/(experience|background|work|projects|portfolio|what has|done)/)) {
      return `${aiKnowledge.name} has experience in:\n\n${aiKnowledge.experience.map((e, i) => `${i + 1}. ${e}`).join('\n\n')}\n\nYou can see more details in the Experience section above!`;
    }
    
    // Contact
    if (message.match(/(contact|email|phone|whatsapp|reach|get in touch|how to contact|connect)/)) {
      return `You can reach ${aiKnowledge.name} through:\n\n📧 Email: ${aiKnowledge.email}\n📱 WhatsApp: ${aiKnowledge.whatsapp}\n\nOr use the contact form above to send a direct message! You can also book a coffee meeting via Cal.com.`;
    }
    
    // Pricing/Cost
    if (message.match(/(price|cost|fee|rate|how much|pricing|budget)/)) {
      return `For pricing and project quotes, please reach out directly via email (${aiKnowledge.email}) or WhatsApp (${aiKnowledge.whatsapp}). ${aiKnowledge.name} provides customized quotes based on your specific project needs.`;
    }
    
    // Availability
    if (message.match(/(available|free|busy|when|schedule|timeline|time)/)) {
      return `${aiKnowledge.name} is available for new projects! You can book a coffee meeting through the Cal.com link in the footer, or reach out via WhatsApp for immediate inquiries.`;
    }
    
    // Tourism Marketing
    if (message.match(/(tourism|marketing|destination|campaign|travel|tourism marketing)/)) {
      return `${aiKnowledge.name} specializes in tourism marketing, including:\n\n• Destination campaigns that increase inquiries and bookings\n• Partner funnels and email drip campaigns\n• Retargeting sequences\n• Content calendars mapped to traveler intent\n• Geo-targeted creative and landing pages\n• Multi-touch attribution dashboards\n\nInterested in discussing a tourism marketing project?`;
    }
    
    // Web Development
    if (message.match(/(web|website|development|developer|coding|build|create website|web dev)/)) {
      return `${aiKnowledge.name} offers web development services:\n\n• Responsive websites with modern tech stacks\n• SEO foundations and optimization\n• Component libraries and brand systems\n• Analytics integration and A/B testing\n• Performance-first design\n• Clean, scalable code\n\nReady to build something amazing?`;
    }
    
    // Portfolio/Projects
    if (message.match(/(portfolio|projects|work|examples|showcase|samples|previous work)/)) {
      return `You're currently viewing ${aiKnowledge.name}'s portfolio! This site itself showcases the quality of work. For specific project examples and case studies, please reach out directly. ${aiKnowledge.name} has worked with various clients including hotels, tour operators, and educational institutions.`;
    }
    
    // Referees/Testimonials
    if (message.match(/(referee|testimonial|reference|review|feedback|client|satisfied)/)) {
      return `${aiKnowledge.name} has worked with trusted partners:\n\n${aiKnowledge.referees.map((r, i) => `${i + 1}. ${r}`).join('\n\n')}\n\nYou can see their testimonials in the Referees section above!`;
    }
    
    // Values/Approach
    if (message.match(/(values|approach|philosophy|how|method|way|style)/)) {
      return `${aiKnowledge.name}'s core values:\n\n${aiKnowledge.values.map((v, i) => `${i + 1}. ${v}`).join('\n\n')}\n\nThis approach ensures every project delivers measurable results and exceptional quality.`;
    }
    
    // CV/Resume
    if (message.match(/(cv|resume|download|pdf|curriculum|vitae)/)) {
      return `You can download ${aiKnowledge.name}'s CV by clicking the "Download CV" button in the hero section above!`;
    }
    
    // Default response
    const defaultResponses = [
      `I'm not sure I understand that question. Could you ask about ${aiKnowledge.name}'s services, experience, or how to get in touch?`,
      `Hmm, let me help you better. You can ask me about:\n• Services offered\n• Experience and background\n• How to contact ${aiKnowledge.name}\n• Tourism marketing\n• Web development\n• Or anything else about the portfolio!`,
      `I'd be happy to help! Try asking about ${aiKnowledge.name}'s services, experience, contact information, or specific areas like tourism marketing or web development.`
    ];
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  }

  // Add message to chat
  function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ${isUser ? 'user' : 'ai'}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'ai-message-avatar';
    avatar.textContent = isUser ? '👤' : '🤖';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'ai-message-content';
    messageContent.textContent = content;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageContent);
    aiMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    aiMessages.scrollTop = aiMessages.scrollHeight;
    
    return messageDiv;
  }

  // Show typing indicator
  function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'ai-message ai';
    typingDiv.id = 'ai-typing';
    
    const avatar = document.createElement('div');
    avatar.className = 'ai-message-avatar';
    avatar.textContent = '🤖';
    
    const typingContent = document.createElement('div');
    typingContent.className = 'ai-message-typing';
    typingContent.innerHTML = '<span></span><span></span><span></span>';
    
    typingDiv.appendChild(avatar);
    typingDiv.appendChild(typingContent);
    aiMessages.appendChild(typingDiv);
    aiMessages.scrollTop = aiMessages.scrollHeight;
    
    return typingDiv;
  }

  // Remove typing indicator
  function removeTyping() {
    const typing = document.getElementById('ai-typing');
    if (typing) typing.remove();
  }

  // Send message
  function sendMessage() {
    const message = aiInput.value.trim();
    if (!message) return;
    
    // Add user message
    addMessage(message, true);
    aiInput.value = '';
    
    // Show typing indicator
    const typing = showTyping();
    
    // Generate and show AI response after delay
    setTimeout(() => {
      removeTyping();
      const response = generateAIResponse(message);
      addMessage(response);
    }, 800 + Math.random() * 400); // Simulate thinking time
  }

  // Toggle chat
  if (aiToggle && aiChat) {
    aiToggle.addEventListener('click', () => {
      const isActive = aiChat.classList.contains('active');
      if (!isActive) {
        aiChat.classList.add('active');
        aiChat.setAttribute('aria-hidden', 'false');
        aiInput.focus();
        
        // Add welcome message if chat is empty
        if (aiMessages.children.length === 0) {
          setTimeout(() => {
            addMessage(`Hello! 👋 I'm ${aiKnowledge.name}'s AI Assistant. I can help you learn about services, experience, and how to get in touch. What would you like to know?`);
          }, 300);
        }
      }
    });
  }

  // Close chat
  if (aiClose) {
    aiClose.addEventListener('click', () => {
      aiChat.classList.remove('active');
      aiChat.setAttribute('aria-hidden', 'true');
    });
  }

  // Send on button click
  if (aiSend) {
    aiSend.addEventListener('click', sendMessage);
  }

  // Send on Enter key
  if (aiInput) {
    aiInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  }

  // Close chat when clicking outside (optional)
  document.addEventListener('click', (e) => {
    if (aiChat && aiChat.classList.contains('active')) {
      if (!aiChat.contains(e.target) && !aiToggle.contains(e.target)) {
        // Optional: uncomment to close on outside click
        // aiChat.classList.remove('active');
        // aiChat.setAttribute('aria-hidden', 'true');
      }
    }
  });

  console.log('🤖 AI Assistant loaded and ready!');
})();
