/* ============================================================
   TRAVELOOP — Premium Animations & Interactive Effects
   Enhanced with smooth scroll reveals, parallax, and ambient effects
   ============================================================ */

(function () {
  'use strict';

  /* ── 1. SMOOTH SCROLL REVEAL WITH STAGGERED ANIMATION ── */
  function initScrollReveal() {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    const selectors = [
      '.panel', '.trip-card', '.activity-card', '.city-card',
      '.metrics-grid article', '.section-block', '.page-heading',
      '.welcome-banner', '.timeline-item', '.note-card', '.auth-panel'
    ];

    selectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el, i) => {
        el.classList.add('reveal');
        el.style.setProperty('--reveal-index', i);
        io.observe(el);
      });
    });
  }

  /* ── 2. INJECT ANIMATION KEYFRAMES ── */
  function injectAnimationKeyframes() {
    const style = document.createElement('style');
    style.textContent = `
      .reveal {
        opacity: 0;
        transform: translateY(20px) scale(0.95);
        transition: all 600ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        transition-delay: calc(var(--reveal-index) * 60ms);
      }

      .reveal.visible {
        opacity: 1;
        transform: translateY(0) scale(1);
      }

      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
      }

      @keyframes shimmer {
        0%, 100% { background-position: -1000px 0; }
        50% { background-position: 1000px 0; }
      }

      @keyframes pulse-glow {
        0%, 100% { 
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
          transform: scale(1);
        }
        50% { 
          box-shadow: 0 0 40px rgba(59, 130, 246, 0.6);
          transform: scale(1.02);
        }
      }

      @keyframes fade-in-up {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes slide-in-right {
        from {
          opacity: 0;
          transform: translateX(-30px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes blob {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(30px, -50px) scale(1.1); }
        66% { transform: translate(-20px, 20px) scale(0.9); }
      }

      h1, h2, h3 {
        animation: fade-in-up 0.8s ease-out;
      }

      .primary-button {
        transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
      }

      .primary-button:hover {
        animation: pulse-glow 1.5s ease-in-out;
      }
    `;
    document.head.appendChild(style);
  }

  /* ── 3. ADVANCED CARD PARALLAX & TILT ── */
  function initCardTilt() {
    const cards = document.querySelectorAll('.trip-card, .city-card, .activity-card, .panel.featured-trip');
    
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const angleX = (y - centerY) / 10;
        const angleY = (centerX - x) / 10;

        card.style.perspective = '1000px';
        card.style.transform = `
          perspective(1000px)
          rotateX(${angleX}deg)
          rotateY(${angleY}deg)
          translateZ(20px)
          scale(1.02)
        `;

        const lighting = card.querySelector('::before');
        if (lighting) {
          const lightX = (x / rect.width) * 100;
          const lightY = (y / rect.height) * 100;
          lighting.style.backgroundPosition = `${lightX}% ${lightY}%`;
        }
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ── 4. FLOATING PARTICLES WITH EMOJI ── */
  const TRAVEL_ICONS = ['✈️', '🌴', '🗺️', '⛵', '🏖️', '🏔️', '🌅', '🧳', '🎒', '🗼', '🌊', '🏝️', '🎭', '🏰'];

  function spawnParticle() {
    const icon = document.createElement('span');
    icon.textContent = TRAVEL_ICONS[Math.floor(Math.random() * TRAVEL_ICONS.length)];
    
    const startX = Math.random() * 100;
    const duration = 8 + Math.random() * 6;
    const delay = Math.random() * 0.5;
    
    icon.style.cssText = `
      position: fixed;
      left: ${startX}%;
      bottom: -100px;
      font-size: ${0.8 + Math.random() * 1.5}rem;
      opacity: 0;
      pointer-events: none;
      z-index: 1;
      user-select: none;
      animation: particleRise ${duration}s ease-out ${delay}s forwards;
      filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));
    `;

    document.body.appendChild(icon);
    setTimeout(() => icon.remove(), (duration + delay) * 1000 + 500);
  }

  // Particle rise animation keyframe
  if (!document.getElementById('particleRise')) {
    const style = document.createElement('style');
    style.id = 'particleRise';
    style.textContent = `
      @keyframes particleRise {
        0% {
          transform: translateY(0) translateX(0) rotate(0deg) scale(0.8);
          opacity: 0;
        }
        10% {
          opacity: 0.7;
        }
        90% {
          opacity: 0.3;
        }
        100% {
          transform: translateY(-100vh) translateX(${(Math.random() > 0.5 ? '' : '-')}40px) rotate(${(Math.random() > 0.5 ? '' : '-')}360deg) scale(1);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  let particleInterval = null;

  function startParticles() {
    if (particleInterval) return;
    spawnParticle();
    particleInterval = setInterval(() => {
      if (document.visibilityState !== 'hidden') {
        spawnParticle();
      }
    }, 2500);
  }

  function stopParticles() {
    if (particleInterval) {
      clearInterval(particleInterval);
      particleInterval = null;
    }
  }

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') stopParticles();
    else startParticles();
  });

  /* ── 5. BUTTON CLICK RIPPLE EFFECT ── */
  function addRippleEffect() {
    document.addEventListener('click', (e) => {
      const button = e.target.closest('.primary-button, .secondary-button, .icon-button');
      if (!button) return;

      const ripple = document.createElement('span');
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        pointer-events: none;
        animation: ripple 600ms ease-out forwards;
      `;

      button.style.position = 'relative';
      button.style.overflow = 'hidden';
      button.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });

    if (!document.getElementById('rippleKeyframes')) {
      const style = document.createElement('style');
      style.id = 'rippleKeyframes';
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  /* ── 6. SMOOTH SCROLL HIGHLIGHTING ── */
  function initSmoothScroll() {
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
        scroll-padding-top: 100px;
      }

      ::-webkit-scrollbar {
        width: 10px;
      }

      ::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.05);
      }

      ::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, #3b82f6, #10b981);
        border-radius: 10px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(180deg, #2563eb, #059669);
      }
    `;
    document.head.appendChild(style);
  }

  /* ── 7. COUNTER ANIMATION FOR METRICS ── */
  function animateCounters() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          entry.target.classList.add('counted');
          animateNumber(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.metrics-grid strong').forEach((el) => {
      observer.observe(el);
    });
  }

  function animateNumber(el) {
    const raw = el.textContent.trim();
    const num = parseFloat(raw.replace(/[^0-9.]/g, ''));
    const suffix = raw.replace(/[0-9.]/g, '');

    if (isNaN(num) || num <= 0) return;

    let start = null;
    const duration = 1200;

    function step(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.round(eased * num * 10) / 10;
      el.textContent = (Number.isInteger(num) ? Math.round(current) : current.toFixed(1)) + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  /* ── 8. REFRESH REVEAL ON ROUTE CHANGE ── */
  function refreshReveal() {
    setTimeout(() => {
      document.querySelectorAll('.reveal:not(.visible)').forEach((el, i) => {
        el.style.setProperty('--reveal-index', i);
      });

      const newEls = document.querySelectorAll(
        '.panel:not(.reveal), .trip-card:not(.reveal), ' +
        '.activity-card:not(.reveal), .metrics-grid article:not(.reveal), ' +
        '.note-card:not(.reveal), .timeline-item:not(.reveal)'
      );

      newEls.forEach((el, i) => {
        el.classList.add('reveal');
        el.style.setProperty('--reveal-index', i);
        
        const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            el.classList.add('visible');
            observer.disconnect();
          }
        }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

        observer.observe(el);
      });
    }, 100);
  }

  /* ── 9. INITIALIZE ALL ANIMATIONS ── */
  function init() {
    injectAnimationKeyframes();
    initScrollReveal();
    initCardTilt();
    addRippleEffect();
    initSmoothScroll();
    animateCounters();
    startParticles();

    // Watch for route changes
    window.addEventListener('hashchange', refreshReveal);
    const observer = new MutationObserver(refreshReveal);
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose refresh function globally if needed
  window.refreshAnimations = refreshReveal;
})();
      if (y > 80 && y > last) {
        topbar.style.minHeight = '56px';
        topbar.style.padding = '8px 28px';
      } else if (y < 60) {
        topbar.style.minHeight = '';
        topbar.style.padding = '';
      }
      last = y;
    }, { passive: true });
  }

  /* ── 8. Active route change listener ── */
  const _origSetRoute = window.setRoute;
  // Patch setRoute to re-trigger animations (safe check)
  const patchRouteObserver = new MutationObserver(() => {
    refreshReveal();
    animateCounters();
    animateCTAs();

    // Particles only on dashboard/search
    const active = document.querySelector('.view.active');
    const activeId = active ? active.id : '';
    if (['dashboard', 'search', 'login'].includes(activeId)) {
      startParticles();
    } else {
      stopParticles();
    }
  });

  patchRouteObserver.observe(document.body, { childList: false, subtree: false, attributes: true, attributeFilter: ['class'] });

  // Watch for any data-view active changes
  document.querySelectorAll('[data-view]').forEach((el) => {
    const mo = new MutationObserver(() => {
      refreshReveal();
      animateCounters();
      animateCTAs();
    });
    mo.observe(el, { attributes: true, attributeFilter: ['class'] });
  });

  /* ── Init on DOM ready ── */
  function init() {
    initScrollReveal();
    initCardTilt();
    animateCTAs();
    animateCounters();
    initTopbarScroll();
    startParticles();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // Defer slightly to let app.js renderAll() finish
    setTimeout(init, 350);
  }
})();
