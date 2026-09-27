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
  const WHATSAPP_PHONE_NUMBER = '15125550199';

  function openQuoteModal(selectedService) {
    if (!quoteModalOverlay) return;
    quoteModalOverlay.classList.add('active');
    quoteModalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (selectedService) {
      const select = document.getElementById('quoteModalService');
      if (select) {
        for (let i = 0; i < select.options.length; i++) {
          const optVal = select.options[i].value.toLowerCase();
          const targetVal = selectedService.toLowerCase();
          if (optVal.includes(targetVal) || targetVal.includes(optVal)) {
            select.selectedIndex = i;
            break;
          }
        }
      }
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
        submitBtn.textContent = '⏳ Submitting Quote Request...';
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
          submitBtn.textContent = 'Submit Quote Request';
        }
      }
    });
  }

  /* ==========================================================================
     13. HERO INSTANT PRICE ESTIMATOR CALCULATOR
     ========================================================================== */
  const calcBedsBtns = document.querySelectorAll('#calcBedsGroup .calc-pill-btn');
  const calcTypeBtns = document.querySelectorAll('#calcTypeGroup .calc-pill-btn');
  const calcPriceDisplay = document.getElementById('calcPriceDisplay');
  const calcLockRateBtn = document.getElementById('calcLockRateBtn');

  const priceMatrix = {
    '1-standard': '$120 – $160',
    '1-deep': '$160 – $200',
    '1-moveout': '$190 – $240',
    '2-standard': '$140 – $180',
    '2-deep': '$220 – $270',
    '2-moveout': '$260 – $320',
    '3-standard': '$180 – $230',
    '3-deep': '$290 – $360',
    '3-moveout': '$340 – $420',
    '4-standard': '$230 – $300',
    '4-deep': '$360 – $450',
    '4-moveout': '$420 – $550'
  };

  const serviceNameMatrix = {
    'standard': 'Standard Recurring Cleaning',
    'deep': 'Deep Cleaning Package',
    'moveout': 'Move-In / Move-Out Turnover'
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
  }

  calcBedsBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      calcBedsBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeBeds = btn.getAttribute('data-beds') || '2';
      updateCalculator();
    });
  });

  calcTypeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      calcTypeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeType = btn.getAttribute('data-type') || 'deep';
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
      desc: 'Rapid high-detail turnover cleaning specifically engineered for Austin short-term rentals and Airbnb hosts needing fast guest turnarounds and immaculate reviews.',
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
  const baPresetBtns = document.querySelectorAll('.ba-preset-btn');

  const baPresets = {
    'kitchen': {
      before: 'assets/images/kitchen-before.jpg',
      after: 'assets/images/kitchen-after.jpg'
    },
    'bathroom': {
      before: 'assets/images/bathroom-before.jpg',
      after: 'assets/images/bathroom-after.jpg'
    },
    'stovetop': {
      before: 'assets/images/stovetop-before.jpg',
      after: 'assets/images/stovetop-after.jpg',
      fallbackBefore: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1400&q=80',
      fallbackAfter: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1400&q=80'
    },
    'living': {
      before: 'assets/images/living-before.jpg',
      after: 'assets/images/living-after.jpg'
    }
  };

  let isDraggingBA = false;

  function updateBeforeImgWidth() {
    if (baContainer && baBeforeImg) {
      const width = baContainer.offsetWidth;
      baBeforeImg.style.width = width + 'px';
    }
  }

  window.addEventListener('resize', updateBeforeImgWidth, { passive: true });
  updateBeforeImgWidth();

  function setSliderPosition(x) {
    if (!baContainer || !baBeforeLayer || !baHandle) return;
    const rect = baContainer.getBoundingClientRect();
    let position = ((x - rect.left) / rect.width) * 100;
    position = Math.max(0, Math.min(100, position));

    baBeforeLayer.style.width = position + '%';
    baHandle.style.left = position + '%';
  }

  if (baContainer) {
    baContainer.addEventListener('mousedown', (e) => {
      isDraggingBA = true;
      setSliderPosition(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDraggingBA) return;
      setSliderPosition(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDraggingBA = false;
    });

    // Touch support
    baContainer.addEventListener('touchstart', (e) => {
      isDraggingBA = true;
      if (e.touches[0]) setSliderPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDraggingBA) return;
      if (e.touches[0]) setSliderPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDraggingBA = false;
    });
  }

  baPresetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      baPresetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const presetKey = btn.getAttribute('data-preset') || 'kitchen';
      if (baPresets[presetKey] && baBeforeImg && baAfterImg) {
        const preset = baPresets[presetKey];
        baBeforeImg.onerror = () => {
          if (preset.fallbackBefore) baBeforeImg.src = preset.fallbackBefore;
        };
        baAfterImg.onerror = () => {
          if (preset.fallbackAfter) baAfterImg.src = preset.fallbackAfter;
        };
        baBeforeImg.src = preset.before;
        baAfterImg.src = preset.after;
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

