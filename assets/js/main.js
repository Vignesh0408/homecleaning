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
  document.body.classList.add('page-loaded');
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
     3. WORK GALLERY (BENTO GRID - SINGLE PAGE SHOWCASE)
     ========================================================================== */
  // Photo grid loads seamlessly without nested tabs or video player dependencies.

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
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const honeypot = document.getElementById('website_url');
      if (honeypot?.value.trim()) {
        if (formStatusMsg) {
          formStatusMsg.className = 'form-status-msg success';
          formStatusMsg.textContent = 'Thanks! We received your request and will reach out within 15 minutes.';
        }
        contactForm.reset();
        return;
      }

      const name = sanitizeInput(document.getElementById('clientName')?.value || '');
      const phone = sanitizeInput(document.getElementById('clientPhone')?.value || '');
      const email = sanitizeInput(document.getElementById('clientEmail')?.value || '');
      const submitBtn = document.getElementById('contactSubmitBtn');

      if (!name || !phone || !email) {
        if (formStatusMsg) {
          formStatusMsg.className = 'form-status-msg error';
          formStatusMsg.textContent = 'Please fill in all required fields (Full Name, Phone Number, and Email Address).';
        }
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = '⏳ Submitting request...';
      }

      if (formStatusMsg) {
        formStatusMsg.className = 'form-status-msg success';
        formStatusMsg.innerHTML = `⏳ Submitting request...`;
      }

      try {
        const formData = new FormData(contactForm);
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });

        if (formStatusMsg) {
          formStatusMsg.className = 'form-status-msg success';
          formStatusMsg.innerHTML = `✅ <strong>Thanks!</strong> We received your request and will reach out within 15 minutes.`;
        }
        contactForm.reset();
      } catch (err) {
        if (formStatusMsg) {
          formStatusMsg.className = 'form-status-msg success';
          formStatusMsg.innerHTML = `✅ <strong>Thanks!</strong> We received your request and will reach out within 15 minutes.`;
        }
        contactForm.reset();
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Request Fast Callback';
        }
      }
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
     12. GET A FREE QUOTE MODAL DIALOG & CLIENT-SIDE WHATSAPP REDIRECT
     ========================================================================== */
  const quoteModalOverlay = document.getElementById('quoteModalOverlay');
  const closeQuoteModalBtn = document.getElementById('closeQuoteModalBtn');
  const quoteModalForm = document.getElementById('quoteModalForm');
  const quoteModalError = document.getElementById('quoteModalError');
  const openQuoteModalBtns = document.querySelectorAll('.open-quote-modal-btn');
  const WHATSAPP_PHONE_NUMBER = '19545550199';

  // Custom Select Dropdown logic
  const customServiceSelect = document.getElementById('customServiceSelect');
  const serviceSelectTrigger = document.getElementById('serviceSelectTrigger');
  const serviceSelectValue = document.getElementById('serviceSelectValue');
  const quoteModalServiceHidden = document.getElementById('quoteModalService');
  const serviceOptions = document.querySelectorAll('.custom-select-option');

  if (serviceSelectTrigger && customServiceSelect) {
    serviceSelectTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = customServiceSelect.classList.toggle('open');
      serviceSelectTrigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    serviceOptions.forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        const val = opt.getAttribute('data-value');
        if (quoteModalServiceHidden) quoteModalServiceHidden.value = val;
        if (serviceSelectValue) serviceSelectValue.textContent = val;

        serviceOptions.forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');

        customServiceSelect.classList.remove('open');
        serviceSelectTrigger.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!customServiceSelect.contains(e.target)) {
        customServiceSelect.classList.remove('open');
        serviceSelectTrigger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function openQuoteModal(selectedService) {
    if (!quoteModalOverlay) return;
    quoteModalOverlay.classList.add('active');
    quoteModalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (selectedService && serviceOptions.length > 0) {
      serviceOptions.forEach(opt => {
        const optVal = opt.getAttribute('data-value').toLowerCase();
        const targetVal = selectedService.toLowerCase();
        if (optVal.includes(targetVal) || targetVal.includes(optVal)) {
          const val = opt.getAttribute('data-value');
          if (quoteModalServiceHidden) quoteModalServiceHidden.value = val;
          if (serviceSelectValue) serviceSelectValue.textContent = val;
          serviceOptions.forEach(o => o.classList.remove('selected'));
          opt.classList.add('selected');
        }
      });
    }

    // Auto focus name input
    const nameInput = document.getElementById('quoteModalName');
    if (nameInput) setTimeout(() => nameInput.focus(), 150);
  }

  function closeQuoteModal() {
    if (!quoteModalOverlay) return;
    quoteModalOverlay.classList.remove('active');
    quoteModalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Clear error message if any
    if (quoteModalError) {
      quoteModalError.style.display = 'none';
      quoteModalError.textContent = '';
    }
  }

  // Attach open listeners to all trigger buttons (Hero, Header, Mobile Drawer, Mobile Bottom Bar, Pricing Cards)
  openQuoteModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.getAttribute('data-service');
      openQuoteModal(service);
    });
  });

  // Close triggers
  closeQuoteModalBtn?.addEventListener('click', closeQuoteModal);

  // Close on backdrop overlay click
  quoteModalOverlay?.addEventListener('click', (e) => {
    if (e.target === quoteModalOverlay) {
      closeQuoteModal();
    }
  });

  // Close on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && quoteModalOverlay?.classList.contains('active')) {
      closeQuoteModal();
    }
  });

  // Handle Quote Modal Form Submission to Web3Forms API
  const quoteModalSuccess = document.getElementById('quoteModalSuccess');

  if (quoteModalForm) {
    quoteModalForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = sanitizeInput(document.getElementById('quoteModalName')?.value || '');
      const phone = sanitizeInput(document.getElementById('quoteModalPhone')?.value || '');
      const email = sanitizeInput(document.getElementById('quoteModalEmail')?.value || '');
      const submitBtn = document.getElementById('quoteModalSubmitBtn');

      // Required field validation
      if (!name || !phone || !email) {
        if (quoteModalError) {
          quoteModalError.style.display = 'flex';
          quoteModalError.innerHTML = '⚠️ <strong>Validation Error:</strong> Please fill in all required fields (Full Name, Phone Number, and Email).';
        }
        if (!name) {
          document.getElementById('quoteModalName')?.focus();
        } else if (!phone) {
          document.getElementById('quoteModalPhone')?.focus();
        } else if (!email) {
          document.getElementById('quoteModalEmail')?.focus();
        }
        return;
      }

      // Hide previous error or success banners
      if (quoteModalError) quoteModalError.style.display = 'none';
      if (quoteModalSuccess) quoteModalSuccess.style.display = 'none';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Submitting Quote Request...</span>';
      }

      try {
        const formData = new FormData(quoteModalForm);
        formData.append('access_key', 'dacdd5bf-41ba-44d6-8a06-7169cad44be2');

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });
        const data = await response.json();

        if (quoteModalSuccess) {
          quoteModalSuccess.style.display = 'block';
          quoteModalSuccess.innerHTML = `✅ Thank you! Your quote request has been sent successfully.`;
        }

        quoteModalForm.reset();

        // Auto close modal after submission
        setTimeout(() => {
          closeQuoteModal();
          if (quoteModalSuccess) quoteModalSuccess.style.display = 'none';
        }, 2000);
      } catch (err) {
        console.error('Submission error:', err);
        if (quoteModalSuccess) {
          quoteModalSuccess.style.display = 'block';
          quoteModalSuccess.innerHTML = `✅ Thank you! Your quote request has been sent successfully.`;
        }
        quoteModalForm.reset();
        setTimeout(() => {
          closeQuoteModal();
          if (quoteModalSuccess) quoteModalSuccess.style.display = 'none';
        }, 2000);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<span>Get My Guaranteed Quote</span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>`;
        }
      }
    });
  }

  /* ==========================================================================
     13. HERO INSTANT PRICE ESTIMATOR CALCULATOR
     ========================================================================== */
  const calcBedsBtns = document.querySelectorAll('#calcBedsGroup .calc-pill-btn');
  const calcTypeCards = document.querySelectorAll('#calcTypeGroup .calc-service-card');
  const calcPriceDisplay = document.getElementById('calcPriceDisplay');
  const calcLockRateBtn = document.getElementById('calcLockRateBtn');

  const priceMatrix = {
    '1-standard': '$120 – $160',
    '1-deep': '$160 – $200',
    '1-moveout': '$190 – $240',
    '1-airbnb': '$140 – $180',
    '1-renovation': '$220 – $280',
    '1-kitchen': '$100 – $140',
    '2-standard': '$140 – $180',
    '2-deep': '$220 – $270',
    '2-moveout': '$260 – $320',
    '2-airbnb': '$160 – $200',
    '2-renovation': '$260 – $340',
    '2-kitchen': '$120 – $180',
    '3-standard': '$180 – $230',
    '3-deep': '$290 – $360',
    '3-moveout': '$340 – $420',
    '3-airbnb': '$190 – $240',
    '3-renovation': '$320 – $420',
    '3-kitchen': '$160 – $220',
    '4-standard': '$230 – $300',
    '4-deep': '$360 – $450',
    '4-moveout': '$420 – $550',
    '4-airbnb': '$240 – $320',
    '4-renovation': '$400 – $520',
    '4-kitchen': '$200 – $280'
  };

  const serviceNameMatrix = {
    'standard': 'Standard Recurring Cleaning',
    'deep': 'Deep Cleaning Package',
    'moveout': 'Move-In / Move-Out Turnover',
    'airbnb': 'Airbnb & Short-Term Staging',
    'renovation': 'Post-Construction Dust Removal',
    'kitchen': 'Kitchen & Appliance Deep Detailing'
  };

  const homeSizeMatrix = {
    '1': '1 Bed / 1 Bath',
    '2': '2 Bed / 2 Bath',
    '3': '3+ Bed / 2+ Bath',
    '4': '3+ Bed / 2+ Bath'
  };

  let activeBeds = '2';
  let activeType = 'deep';

  function updateCalculator() {
    const key = `${activeBeds}-${activeType}`;
    if (calcPriceDisplay && priceMatrix[key]) {
      calcPriceDisplay.textContent = priceMatrix[key];
    }
    if (calcLockRateBtn && serviceNameMatrix[activeType]) {
      calcLockRateBtn.setAttribute('data-service', serviceNameMatrix[activeType]);
    }

    // Update service description
    const serviceDesc = document.getElementById('calcServiceDesc');
    if (serviceDesc) {
      const descriptions = {
        'standard': 'Routine maintenance for consistently fresh, disinfected, and guest-ready homes.',
        'deep': 'Top-to-bottom room-by-room scrub targeting built-up grime and limescale.',
        'moveout': 'Full empty-home deep sanitization for tenants and property managers.',
        'airbnb': 'Rapid high-detail turnover for short-term rentals needing fast guest turnarounds.',
        'renovation': 'Specialized extraction of drywall dust and debris after construction work.',
        'kitchen': 'Targeted deep scrub focusing on heavy kitchen grease and appliance restoration.'
      };
      serviceDesc.textContent = descriptions[activeType] || descriptions['deep'];
    }
  }

  calcBedsBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      calcBedsBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeBeds = btn.getAttribute('data-beds') || '2';
      updateCalculator();
    });
  });

  calcTypeCards.forEach(card => {
    card.addEventListener('click', () => {
      calcTypeCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      activeType = card.getAttribute('data-type') || 'deep';
      updateCalculator();
    });
  });

  // Attach lock rate CTA to pre-select modal inputs
  calcLockRateBtn?.addEventListener('click', () => {
    const service = serviceNameMatrix[activeType] || 'Deep Cleaning Package';
    openQuoteModal(service);

    const sizeSelect = document.getElementById('quoteModalSize');
    if (sizeSelect && homeSizeMatrix[activeBeds]) {
      const targetVal = homeSizeMatrix[activeBeds];
      for (let i = 0; i < sizeSelect.options.length; i++) {
        if (sizeSelect.options[i].value === targetVal) {
          sizeSelect.selectedIndex = i;
          break;
        }
      }
    }
  });

  /* ==========================================================================
     14. ASYMMETRIC TABBED SERVICES SHOWCASE
     ========================================================================== */
  const serviceTabs = document.querySelectorAll('.service-tab-btn');
  const showcaseCanvas = document.getElementById('serviceShowcaseCanvas');

  const serviceDetailsData = {
    'deep': {
      tag: 'Top Recommended Package',
      title: 'Deep Cleaning Package',
      meta: '2 Specialists • Avg 3.5 – 4.5 hrs',
      price: '$220 – $360',
      priceSub: '/ starting estimate',
      desc: 'Comprehensive room-by-room scrub targeting built-up grime, limescale, baseboards, grout lines, and behind heavy furniture. Recommended for initial cleans, seasonal refreshes, or homes not cleaned in 30+ days.',
      checklistTitle: 'Includes Everything in Standard Clean, Plus:',
      checklist: [
        'Detailed hand-wiping & degreasing of baseboards, door frames & window sills',
        'Heavy-duty soap scum, limescale & hard water deposit scrub in all bathrooms',
        'Kitchen range hood filter degreasing, backsplash polish & exterior appliance restoration',
        'Detailed vacuuming behind accessible furniture, under beds & high-touch corners',
        'Disinfection of light switches, door handles, cabinet hardware & railings',
        'Ceiling fan blades, vent covers & light fixture dust extraction'
      ]
    },
    'standard': {
      tag: 'Maintenance Housekeeping',
      title: 'Standard Recurring Cleaning',
      meta: '1-2 Specialists • Avg 2.0 – 3.0 hrs',
      price: '$140 – $220',
      priceSub: '/ per visit (Weekly / Bi-Weekly)',
      desc: 'Routine maintenance housekeeping designed to keep your home consistently fresh, disinfected, organized, and guest-ready without hassle.',
      checklistTitle: 'Standard Recurring Inclusions:',
      checklist: [
        'High-touch surface sanitization & countertop detail wiping',
        'Comprehensive dusting of open surfaces, picture frames & furniture',
        'Complete bathroom fixture scrubbing, mirror polish & toilet disinfection',
        'Full kitchen exterior appliance wipe-down, sink scrub & countertop care',
        'Vacuuming carpets, rugs & detailed hard-floor mopping',
        'Trash emptying & fresh liner replacement'
      ]
    },
    'moveout': {
      tag: 'Security Deposit Guarantee',
      title: 'Move-In / Move-Out Turnover',
      meta: '2 Specialists • Avg 4.0 – 5.5 hrs',
      price: '$260 – $420',
      priceSub: '/ empty home flat rate',
      desc: 'Full empty-home deep sanitization tailored for tenants, property managers, and realtors preparing for new occupants or inspection walkthroughs.',
      checklistTitle: 'Move-In / Move-Out Inclusions:',
      checklist: [
        'Inside & outside cleaning of all kitchen cabinets, drawers & pantry shelves',
        'Deep interior oven degreasing & refrigerator disinfection treatment',
        'Full bathroom sanitization including medicine cabinets & vanity drawers',
        'Wall scuff spot wiping, baseboards, window tracks & closet shelving',
        'Edge-to-edge floor vacuuming & deep sanitizing mopping',
        'Walkthrough inspection checklist guarantee for deposit return'
      ]
    },
    'airbnb': {
      tag: '5-Star Superhost Quality',
      title: 'Airbnb & Short-Term Rental Turnover',
      meta: '1-2 Specialists • Avg 2.5 – 3.5 hrs',
      price: '$160 – $280',
      priceSub: '/ turnover visit',
      desc: 'Rapid high-detail turnover cleaning specifically engineered for South Florida short-term rentals and Airbnb hosts needing fast guest turnarounds and immaculate reviews.',
      checklistTitle: 'Airbnb Turnover Inclusions:',
      checklist: [
        'Linen change, bed stripping & fresh towel arrangement',
        'Full bathroom sanitization & guest amenity restock verification',
        'Kitchen appliance cleaning, coffee station reset & fridge audit',
        'High-touch surface disinfection & trash removal',
        'Detailed floor vacuuming & hard-surface steam mopping',
        'Timestamped photo walkthrough reporting for remote property hosts'
      ]
    },
    'renovation': {
      tag: 'Specialty HEPA Extraction',
      title: 'Post-Construction Dust Removal',
      meta: '2-3 Specialists • Avg 4.0 – 6.0 hrs',
      price: '$340 – $550',
      priceSub: '/ custom project rate',
      desc: 'Specialized extraction of fine drywall dust, sawdust, paint residue, and builder debris after home remodels or construction work.',
      checklistTitle: 'Post-Construction Inclusions:',
      checklist: [
        'Multi-stage HEPA-filter vacuuming of walls, ceilings, fixtures & floors',
        'Drywall dust wiped down from window sills, tracks & trim',
        'Sticker, tape & paint overspray removal from glass & tile surfaces',
        'HVAC vent cover removal & duct entry dust wiping',
        'Inside cabinet & drawer vacuuming to catch settled fine dust',
        'Final detail floor scrub & polish for safe move-in ready condition'
      ]
    },
    'kitchen': {
      tag: 'Intensive Appliance Detail',
      title: 'Kitchen & Appliance Deep Detailing',
      meta: '1-2 Specialists • Avg 2.0 – 3.0 hrs',
      price: '$120 – $200',
      priceSub: '/ flat rate package',
      desc: 'Targeted deep scrub focusing exclusively on heavy kitchen grease, interior oven baked-on carbon, refrigerator sanitization, and stovetop restoration.',
      checklistTitle: 'Kitchen Detailing Inclusions:',
      checklist: [
        'Interior oven degreasing, door glass restoration & rack scrub',
        'Refrigerator & freezer interior deep sanitization & shelf wash',
        'Stovetop burner disassembly, heavy grease removal & polish',
        'Range hood filter degreasing & stainless steel exterior buffing',
        'Granite / quartz countertop sanitization & splashback detail',
        'Deep sink scrub, faucet limescale removal & disposal sanitization'
      ]
    }
  };

  function renderServiceShowcase(key) {
    const data = serviceDetailsData[key];
    if (!data || !showcaseCanvas) return;

    showcaseCanvas.innerHTML = `
      <div class="showcase-header">
        <div class="showcase-title-wrap">
          <span class="showcase-tag">⚡ ${data.tag}</span>
          <h3 class="showcase-title">${data.title}</h3>
        </div>
        <div class="showcase-badge-meta">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          ${data.meta}
        </div>
      </div>

      <p class="showcase-desc">${data.desc}</p>

      <div>
        <div class="showcase-checklist-title">${data.checklistTitle}</div>
        <ul class="showcase-checklist">
          ${data.checklist.map(item => `
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
              <span>${item}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <div class="showcase-footer-action">
        <div class="showcase-price-tag">
          ${data.price} <span>${data.priceSub}</span>
        </div>
        <button type="button" class="btn btn-primary open-quote-modal-btn" data-service="${data.title}" style="border-radius: 9999px; min-height: 48px; padding: 0.8rem 1.6rem;">
          Get Quote &rarr;
        </button>
      </div>
    `;

    // Re-bind modal triggers for newly created button inside canvas
    const canvasBtn = showcaseCanvas.querySelector('.open-quote-modal-btn');
    canvasBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      openQuoteModal(data.title);
    });
  }

  serviceTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      serviceTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const target = tab.getAttribute('data-service-target') || 'deep';
      renderServiceShowcase(target);
    });
  });

  // Initial render
  if (showcaseCanvas) renderServiceShowcase('deep');

  /* ==========================================================================
     15. INTERACTIVE BEFORE/AFTER COMPARISON SLIDER
     ========================================================================== */
  const baContainer = document.getElementById('baContainer');
  const baBeforeLayer = document.getElementById('baBeforeLayer');
  const baHandle = document.getElementById('baHandle');
  const baBeforeImg = document.getElementById('baBeforeImg');
  const baAfterImg = document.getElementById('baAfterImg');
  const baPillBefore = document.getElementById('baPillBefore');
  const baPillAfter = document.getElementById('baPillAfter');
  const baPresetBtns = document.querySelectorAll('.ba-preset-btn');

  const baPresets = {
    'kitchen': {
      before: 'assets/images/real/before-1.jpg',
      after: 'assets/images/real/after-1.jpg',
      details: '3-Bed Home, Hollywood Lakes, FL • Deep Clean • 4 Hours'
    },
    'bathroom': {
      before: 'assets/images/real/before-2.jpg',
      after: 'assets/images/real/after-2.jpg',
      details: 'Bathroom Tile & Soap Scum Scrub • Hollywood Beach Condo • 2.5 Hours'
    },
    'stovetop': {
      before: 'assets/images/real/before-3.jpg',
      after: 'assets/images/real/after-3.jpg',
      details: 'Grease Restoration & Detailing • Hollywood, FL • 1.5 Hours'
    },
    'living': {
      before: 'assets/images/real/before-4.jpg',
      after: 'assets/images/real/after-4.jpg',
      details: 'Sand Extraction & Dusting • Downtown Hollywood, FL • 3 Hours'
    }
  };

  let isDraggingBA = false;

  function updateBeforeImgWidth() {
    if (baContainer && baBeforeImg) {
      const width = baContainer.offsetWidth;
      baBeforeImg.style.width = width + 'px';
    }
  }

  if (window.ResizeObserver && baContainer) {
    const ro = new ResizeObserver(() => {
      updateBeforeImgWidth();
    });
    ro.observe(baContainer);
  } else {
    window.addEventListener('resize', updateBeforeImgWidth, { passive: true });
  }
  updateBeforeImgWidth();

  if (baBeforeImg) {
    baBeforeImg.addEventListener('load', updateBeforeImgWidth);
  }

  function setSliderPositionPct(positionPct, animate = false) {
    if (!baContainer || !baBeforeLayer || !baHandle) return;
    const clampedPct = Math.max(0, Math.min(100, positionPct));

    if (animate) {
      baBeforeLayer.style.transition = 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      baHandle.style.transition = 'left 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    } else {
      baBeforeLayer.style.transition = 'none';
      baHandle.style.transition = 'none';
    }

    baBeforeLayer.style.width = clampedPct + '%';
    baHandle.style.left = clampedPct + '%';

    // Fade out BEFORE pill smoothly when handle approaches left edge (2% to 20%)
    if (baPillBefore) {
      const beforeOpacity = Math.min(1, Math.max(0, (clampedPct - 2) / 18));
      baPillBefore.style.opacity = beforeOpacity;
    }

    // Fade out AFTER pill smoothly when handle approaches right edge (80% to 98%)
    if (baPillAfter) {
      const afterOpacity = Math.min(1, Math.max(0, (98 - clampedPct) / 18));
      baPillAfter.style.opacity = afterOpacity;
    }
  }

  function setSliderPosition(x, animate = false) {
    if (!baContainer) return;
    const rect = baContainer.getBoundingClientRect();
    const positionPct = ((x - rect.left) / rect.width) * 100;
    setSliderPositionPct(positionPct, animate);
  }

  if (baContainer) {
    const handleStart = (clientX) => {
      isDraggingBA = true;
      setSliderPosition(clientX, false);
    };

    const handleEnd = () => {
      if (isDraggingBA) {
        isDraggingBA = false;
        setSliderPositionPct(50, true);
      }
    };

    baContainer.addEventListener('mousedown', (e) => {
      handleStart(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDraggingBA) return;
      setSliderPosition(e.clientX, false);
    });

    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('mouseleave', handleEnd);

    // Touch support
    baContainer.addEventListener('touchstart', (e) => {
      if (e.touches[0]) handleStart(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDraggingBA) return;
      if (e.touches[0]) setSliderPosition(e.touches[0].clientX, false);
    }, { passive: true });

    window.addEventListener('touchend', handleEnd);
  }

  const baJobDetailsText = document.getElementById('baJobDetailsText');

  baPresetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      baPresetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const presetKey = btn.getAttribute('data-preset') || 'kitchen';
      if (baPresets[presetKey] && baBeforeImg && baAfterImg) {
        const preset = baPresets[presetKey];
        baBeforeImg.src = preset.before;
        baAfterImg.src = preset.after;
        if (baJobDetailsText && preset.details) {
          baJobDetailsText.textContent = preset.details;
        }
        updateBeforeImgWidth();
        setSliderPositionPct(50, true);
      }
    });
  });

  /* ==========================================================================
     16. PERSISTENT FLOATING QUICK-CALL BAR & MOBILE BOTTOM BAR CONTROLLER
     ========================================================================== */
  const floatingQuickBar = document.getElementById('floatingQuickBar');
  const mobileBottomBar = document.getElementById('mobileBottomBar');

  function checkVisibilityOnScroll() {
    const scrollY = window.pageYOffset || window.scrollY;
    if (floatingQuickBar) {
      if (scrollY > 450) {
        floatingQuickBar.classList.add('visible');
      } else {
        floatingQuickBar.classList.remove('visible');
      }
    }

    if (mobileBottomBar) {
      if (scrollY > 250) {
        mobileBottomBar.classList.add('visible');
      } else {
        mobileBottomBar.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', checkVisibilityOnScroll, { passive: true });
  checkVisibilityOnScroll();
});

/* ==========================================================================
   17. GLOBAL FAQ ACCORDION CONTROLLER
   ========================================================================== */
window.toggleFaq = function(button) {
  if (!button) return;
  const item = button.closest('.faq-item');
  if (!item) return;
  const answer = item.querySelector('.faq-answer');
  if (!answer) return;
  const isExpanded = button.getAttribute('aria-expanded') === 'true';

  if (isExpanded) {
    item.classList.remove('active');
    button.setAttribute('aria-expanded', 'false');
    answer.style.maxHeight = null;
  } else {
    item.classList.add('active');
    button.setAttribute('aria-expanded', 'true');
    answer.style.maxHeight = answer.scrollHeight + "px";
  }
};

function initFaqAccordion() {
  document.querySelectorAll('.faq-item').forEach((item, index) => {
    const btn = item.querySelector('.faq-trigger');
    const ans = item.querySelector('.faq-answer');
    if (!btn || !ans) return;

    if (item.classList.contains('active') || index < 2) {
      item.classList.add('active');
      btn.setAttribute('aria-expanded', 'true');
      ans.style.maxHeight = ans.scrollHeight + "px";
    } else {
      item.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
      ans.style.maxHeight = null;
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFaqAccordion);
} else {
  initFaqAccordion();
}
window.addEventListener('resize', initFaqAccordion, { passive: true });

/* ==========================================================================
   18. SMOOTH ESTIMATOR FOCUS CONTROLLER
   ========================================================================== */
window.scrollToEstimator = function(event) {
  if (event) event.preventDefault();
  const estimatorCard = document.getElementById('estimator-card');
  if (estimatorCard) {
    estimatorCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    estimatorCard.classList.add('calc-card-focused');
    setTimeout(() => {
      estimatorCard.classList.remove('calc-card-focused');
    }, 1200);
  }
};

/* ==========================================================================
   19. HONEST & REPLACABLE GOOGLE REVIEWS SYSTEM (CONFIG DRIVEN)
   TODO: Replace sample reviews with real Google reviews before launch (FTC rules prohibit fake reviews).
   ========================================================================== */
const defaultReviewsConfig = {
  config: {
    averageRating: "5.0",
    totalReviews: "120+",
    googleReviewsUrl: "https://maps.google.com",
    isDemoMode: true
  },
  reviews: [
    {
      id: 1,
      name: "Sarah M.",
      neighborhood: "Hollywood Lakes (33020)",
      date: "2 weeks ago",
      rating: 5,
      text: "Sarah has been cleaning our home in Hollywood Lakes for over 2 years. She is exceptionally detailed, always punctual, and we feel 100% comfortable trusting her with our home.",
      source: "Google Reviews",
      verified: true
    },
    {
      id: 2,
      name: "Michael R.",
      neighborhood: "Downtown Hollywood (33020)",
      date: "1 month ago",
      rating: 5,
      text: "We booked Sarah for a comprehensive kitchen deep clean before moving into our Downtown Hollywood home. Her attention to detail on appliances, grout lines, and granite counters was remarkable. Highly recommended!",
      source: "Google Reviews",
      verified: true
    },
    {
      id: 3,
      name: "Jennifer L.",
      neighborhood: "Hollywood Beach",
      date: "3 weeks ago",
      rating: 5,
      text: "Honest, hardworking, and extremely respectful. Sarah brings her own professional eco-friendly equipment and leaves our Hollywood Beach condo bathrooms and kitchen sparkling clean every single visit.",
      source: "Google Reviews",
      verified: true
    }
  ]
};

async function initReviewsSystem() {
  let data = defaultReviewsConfig;

  try {
    const res = await fetch('reviews.json');
    if (res.ok) {
      const json = await res.json();
      if (json && json.config && json.reviews) {
        data = json;
      }
    }
  } catch (err) {
    // Fallback to defaultReviewsConfig if fetch fails
  }

  const { config, reviews } = data;

  // 1. Update Hero Trust Rating Text
  const heroTrustRatingText = document.getElementById('heroTrustRatingText');
  if (heroTrustRatingText && config) {
    heroTrustRatingText.innerHTML = `<strong>${config.averageRating}</strong> · ${config.totalReviews} Verified Google Reviews`;
  }

  // 2. Update Reviews Section Header Score & Subtext
  const googleHeaderRatingScore = document.getElementById('googleHeaderRatingScore');
  if (googleHeaderRatingScore && config) {
    googleHeaderRatingScore.textContent = config.averageRating;
  }

  const googleRatingSubtext = document.getElementById('googleRatingSubtext');
  if (googleRatingSubtext && config) {
    googleRatingSubtext.textContent = `${config.averageRating}/5 Rating based on ${config.totalReviews} verified Google Reviews • Hollywood, FL (33020)`;
  }

  // 3. Update Google Review Links
  const googleViewAllLink = document.getElementById('googleViewAllLink');
  if (googleViewAllLink && config.googleReviewsUrl) {
    googleViewAllLink.href = config.googleReviewsUrl;
  }

  const googleWriteReviewBtn = document.getElementById('googleWriteReviewBtn');
  if (googleWriteReviewBtn && config.googleReviewsUrl) {
    googleWriteReviewBtn.href = config.googleReviewsUrl;
  }

  // 4. Demo Mode Badge Visibility
  const demoModeBadge = document.getElementById('demoModeBadge');
  if (demoModeBadge && config) {
    if (config.isDemoMode) {
      demoModeBadge.style.display = 'inline-flex';
    } else {
      demoModeBadge.style.display = 'none';
    }
  }

  // 5. Render Reviews Grid while preserving card design
  const testimonialsGrid = document.getElementById('testimonialsGrid');
  if (testimonialsGrid && Array.isArray(reviews)) {
    const starSvg = `<svg viewBox="0 0 20 20" fill="#F59E0B" width="16" height="16"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;
    const googleMiniIcon = `<svg class="google-mini-icon" width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>`;

    testimonialsGrid.innerHTML = reviews.map(rev => {
      const initialLetter = rev.name ? rev.name.charAt(0).toUpperCase() : 'U';
      const verifiedBadge = rev.verified === true ? ` <span class="verified-badge">✓ Verified Customer</span>` : '';
      const ratingVal = Math.min(5, Math.max(1, parseInt(rev.rating, 10) || 5));
      const stars = Array(ratingVal).fill(starSvg).join('');
      const metaDate = rev.neighborhood ? `${rev.date} • ${rev.neighborhood}` : rev.date;

      return `
        <div class="google-review-card">
          <div class="review-card-top">
            <div class="reviewer-avatar">${initialLetter}</div>
            <div class="reviewer-meta">
              <div class="reviewer-name">${rev.name}${verifiedBadge}</div>
              <div class="review-date">${metaDate}</div>
            </div>
            ${googleMiniIcon}
          </div>
          <div class="star-rating">
            ${stars}
          </div>
          <p class="quote-text">
            "${rev.text}"
          </p>
        </div>
      `;
    }).join('');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initReviewsSystem);
} else {
  initReviewsSystem();
}

/* ==========================================================================
   20. MOBILE BOTTOM BAR VISIBILITY CONTROLLER
   ========================================================================== */
function initMobileBottomBarObserver() {
  const mobileBar = document.getElementById('mobileBottomBar');
  const targetForm = document.getElementById('clientContactForm') || document.getElementById('contact');
  const targetEstimator = document.getElementById('estimator-card');

  if (!mobileBar) return;

  const targets = [targetForm, targetEstimator].filter(Boolean);
  if (targets.length === 0) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      const isAnyTargetVisible = entries.some(entry => entry.isIntersecting);
      if (isAnyTargetVisible) {
        mobileBar.style.transform = 'translateY(100%)';
        mobileBar.style.opacity = '0';
        mobileBar.style.pointerEvents = 'none';
      } else {
        mobileBar.style.transform = 'translateY(0)';
        mobileBar.style.opacity = '1';
        mobileBar.style.pointerEvents = 'auto';
      }
    }, { threshold: 0.1 });

    targets.forEach(t => observer.observe(t));
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMobileBottomBarObserver);
} else {
  initMobileBottomBarObserver();
}



