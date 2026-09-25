/**
 * CleanSpark Home Care — Ultra Smooth Liquid Controller (v4)
 * High-performance, GPU hardware-accelerated, zero-jank liquid animations.
 * Pure Vanilla JavaScript (ES2024)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. PAGE LOAD LIQUID ENTRANCE
     ========================================================================== */
  requestAnimationFrame(() => {
    document.body.classList.add('page-loaded');
  });

  /* ==========================================================================
     2. MOBILE NAVIGATION DRAWER & ACCESSIBILITY
     ========================================================================== */
  const menuToggle = document.getElementById('mobileMenuToggle');
  const drawerClose = document.getElementById('mobileDrawerClose');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  const backdrop = document.getElementById('backdropOverlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

  function openDrawer() {
    if (!mobileDrawer || !backdrop) return;
    mobileDrawer.classList.add('open');
    backdrop.classList.add('active');
    menuToggle?.setAttribute('aria-expanded', 'true');
    drawerClose?.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (!mobileDrawer || !backdrop) return;
    mobileDrawer.classList.remove('open');
    backdrop.classList.remove('active');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.focus();
    document.body.style.overflow = '';
  }

  menuToggle?.addEventListener('click', openDrawer);
  drawerClose?.addEventListener('click', closeDrawer);
  backdrop?.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer?.classList.contains('open')) closeDrawer();
  });
  mobileNavLinks.forEach(link => link.addEventListener('click', closeDrawer));

  /* ==========================================================================
     3. WORK GALLERY: PHOTO + VIDEO CONTROLLER
     ========================================================================== */
  const galleryTabs = document.querySelectorAll('.gallery-tabs .tab-btn');
  const beforeImg = document.getElementById('galleryBeforeImg');
  const compCaption = document.getElementById('galleryCompCaption');
  const photoTitle = document.getElementById('galleryPhotoTitle');
  const videoPlayer = document.getElementById('galleryVideoPlayer');
  const videoSource = document.getElementById('galleryVideoSource');
  const videoTitle = document.getElementById('galleryVideoTitle');
  const videoDesc = document.getElementById('galleryVideoDesc');

  const cacheBust = '?v=' + Date.now();

  const galleryData = {
    kitchen: {
      photoTitle: 'Kitchen Deep Scrub Result',
      photoSrc: 'assets/images/kitchen-clean.jpg' + cacheBust,
      photoCaption: 'Kitchen Deep Scrub — Stainless steel stove, countertop grease removal & sink sanitization',
      videoTitle: 'Kitchen Countertop Cleaning Video',
      videoSrc: 'assets/video/kitchen-cleaning.mp4' + cacheBust,
      videoDesc: '🎥 Authentic Kitchen Countertop Scrubbing Clip'
    },
    bathroom: {
      photoTitle: 'Bathroom Sanitization Result',
      photoSrc: 'assets/images/bathroom-clean.jpg' + cacheBust,
      photoCaption: 'Bathroom Sanitization — Limescale removal & sparkling chrome fixtures',
      videoTitle: 'Bathroom Sanitization Video',
      videoSrc: 'assets/video/bathroom-cleaning.mp4' + cacheBust,
      videoDesc: '🎥 Authentic Bathroom Tile & Chrome Polish Clip'
    },
    living: {
      photoTitle: 'Living & Surfaces Result',
      photoSrc: 'assets/images/cleaning-action.jpg' + cacheBust,
      photoCaption: 'Living Room & Surfaces — Precision dusting, hardwood floor care & surface polishing',
      videoTitle: 'Living Room Surface Cleaning Video',
      videoSrc: 'assets/video/living-cleaning.mp4' + cacheBust,
      videoDesc: '🎥 Authentic Living Room Wiping & Dusting Clip'
    }
  };

  galleryTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      const category = e.target.getAttribute('data-category');
      if (!category || !galleryData[category]) return;
      galleryTabs.forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      const data = galleryData[category];
      if (beforeImg) {
        beforeImg.style.opacity = '0.3';
        setTimeout(() => {
          beforeImg.src = data.photoSrc;
          if (compCaption) compCaption.textContent = data.photoCaption;
          if (photoTitle) photoTitle.textContent = data.photoTitle;
          beforeImg.style.opacity = '1';
        }, 150);
      }
      if (videoPlayer && videoSource) {
        videoPlayer.style.opacity = '0.3';
        setTimeout(() => {
          videoSource.src = data.videoSrc;
          videoPlayer.poster = data.photoSrc;
          if (videoTitle) videoTitle.textContent = data.videoTitle;
          if (videoDesc) videoDesc.textContent = data.videoDesc;
          videoPlayer.load();
          videoPlayer.style.opacity = '1';
        }, 150);
      }
    });
  });

  /* ==========================================================================
     4. CONTACT FORM VALIDATION & SECURITY (XSS + HONEYPOT)
     ========================================================================== */
  const contactForm = document.getElementById('clientContactForm');
  const formStatusMsg = document.getElementById('formStatusMsg');

  function sanitizeInput(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/[&<>"']/g, (m) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[m]).trim();
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const honeypot = document.getElementById('website_url');
      if (honeypot?.value.trim()) {
        if (formStatusMsg) {
          formStatusMsg.className = 'form-status-msg success';
          formStatusMsg.textContent = 'Thank you! Your request has been received.';
        }
        contactForm.reset();
        return;
      }
      const name = sanitizeInput(document.getElementById('clientName')?.value || '');
      const phone = sanitizeInput(document.getElementById('clientPhone')?.value || '');
      const service = sanitizeInput(document.getElementById('clientService')?.value || '');
      if (!name || !phone) {
        if (formStatusMsg) {
          formStatusMsg.className = 'form-status-msg error';
          formStatusMsg.textContent = 'Please enter both your name and phone number.';
        }
        return;
      }
      if (!/^[\d\s+\-()]{7,15}$/.test(phone)) {
        if (formStatusMsg) {
          formStatusMsg.className = 'form-status-msg error';
          formStatusMsg.textContent = 'Please enter a valid phone number.';
        }
        return;
      }
      if (formStatusMsg) {
        formStatusMsg.className = 'form-status-msg success';
        formStatusMsg.innerHTML = `✅ <strong>Thank you, ${name}!</strong> Your request for <em>${service || 'Home Cleaning'}</em> has been received. Sarah will call or text you shortly at <strong>${phone}</strong>.`;
      }
      contactForm.reset();
    });
  }

  /* ==========================================================================
     5. DYNAMIC HIGH-PERFORMANCE SCROLL REVEAL (Layer-optimized)
     ========================================================================== */
  const revealElements = document.querySelectorAll('[data-reveal], [data-reveal-stagger]');
  
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.style.willChange = 'opacity, transform';
          el.classList.add('revealed');
          setTimeout(() => {
            el.style.willChange = 'auto';
          }, 850);
          revealObserver.unobserve(el);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.05
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  /* ==========================================================================
     6. ANIMATED NUMBER COUNTERS (60 FPS RAF)
     ========================================================================== */
  const counterElements = document.querySelectorAll('[data-count-to]');

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count-to'), 10);
    const duration = 2000;
    const startTime = performance.now();

    function easeOutExpo(t) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function updateCount(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const current = Math.floor(easedProgress * target);
      
      el.textContent = current.toLocaleString();
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        el.textContent = target.toLocaleString();
      }
    }
    
    requestAnimationFrame(updateCount);
  }

  if ('IntersectionObserver' in window && counterElements.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.4
    });

    counterElements.forEach(el => counterObserver.observe(el));
  }

  /* ==========================================================================
     7. ULTRA LIGHTWEIGHT FLOATING PARTICLES (GPU Accelerated)
     ========================================================================== */
  const particleContainer = document.querySelector('.hero-particles');
  
  if (particleContainer && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const particleTypes = ['bubble', 'sparkle', 'droplet'];
    let activeParticles = 0;
    const maxParticles = 8;

    function createParticle() {
      if (document.hidden || activeParticles >= maxParticles) return;
      activeParticles++;

      const particle = document.createElement('div');
      const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
      
      particle.classList.add('particle', `particle--${type}`);
      
      const size = type === 'sparkle' 
        ? Math.random() * 6 + 4 
        : Math.random() * 14 + 6;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.bottom = '-20px';
      
      const duration = Math.random() * 10 + 10;
      particle.style.animationDuration = `${duration}s`;
      
      particleContainer.appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
        activeParticles--;
      }, (duration + 1) * 1000);
    }

    for (let i = 0; i < 4; i++) {
      setTimeout(() => createParticle(), i * 600);
    }

    setInterval(createParticle, 2400);
  }

  /* ==========================================================================
     8. 3D TILT CARD EFFECT (RAF Throttled for 120 FPS Liquid Feel)
     ========================================================================== */
  const tiltCards = document.querySelectorAll('.tilt-card');
  
  tiltCards.forEach(card => {
    let tiltRaf = null;

    card.addEventListener('mouseenter', () => {
      card.style.willChange = 'transform';
    });

    card.addEventListener('mousemove', (e) => {
      if (tiltRaf) return;
      tiltRaf = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(0,-4px,0)`;
        tiltRaf = null;
      });
    });

    card.addEventListener('mouseleave', () => {
      if (tiltRaf) {
        cancelAnimationFrame(tiltRaf);
        tiltRaf = null;
      }
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translate3d(0,0,0)';
      card.style.willChange = 'auto';
    });
  });

  /* ==========================================================================
     9. HIGH PERFORMANCE SCROLL CONTROLLER (Cached Document Height + GPU Scale)
     ========================================================================== */
  const header = document.querySelector('.site-header');
  const progressBar = document.querySelector('.scroll-progress');
  let ticking = false;
  let cachedDocHeight = 0;

  function updateDocHeight() {
    cachedDocHeight = (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight;
  }

  window.addEventListener('resize', updateDocHeight, { passive: true });
  updateDocHeight();

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.pageYOffset || window.scrollY;
        
        // Header shrink toggle
        if (header) {
          if (scrollY > 60) {
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
          }
        }
        
        // Liquid smooth progress bar transform
        if (progressBar && cachedDocHeight > 0) {
          const scrollPercent = Math.min(100, Math.max(0, (scrollY / cachedDocHeight)));
          progressBar.style.transform = `scaleX(${scrollPercent})`;
        }
        
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ==========================================================================
     10. ACTIVE NAV LINK HIGHLIGHTING
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-links a');

  if ('IntersectionObserver' in window && sections.length > 0) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          desktopNavLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    });

    sections.forEach(section => sectionObserver.observe(section));
  }

  /* ==========================================================================
     11. MARQUEE DUPLICATION (Seamless loop)
     ========================================================================== */
  const marqueeTrack = document.querySelector('.marquee-track');
  if (marqueeTrack) {
    const clone = marqueeTrack.innerHTML;
    marqueeTrack.innerHTML += clone;
  }
});
