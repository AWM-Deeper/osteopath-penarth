/* ============================================================
   LANGDON OSTEOPATHY — APP.JS
   Smooth interactions: navigation, scroll reveals, FAQ accordion
   ============================================================ */

(function () {
  'use strict';

  // ---- DOM READY ----
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initHeader();
    initMobileNav();
    initSmoothScroll();
    initScrollReveal();
    initFAQAccordion();
    initStaggerDelays();
  }

  /* ========================================
     HEADER — Scroll state
     ======================================== */
  function initHeader() {
    var header = document.getElementById('site-header');
    if (!header) return;

    var scrollThreshold = 60;

    function onScroll() {
      if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run on load
  }

  /* ========================================
     MOBILE NAV — Hamburger toggle
     ======================================== */
  function initMobileNav() {
    var hamburger = document.getElementById('hamburger');
    var nav = document.getElementById('main-nav');
    if (!hamburger || !nav) return;

    hamburger.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close nav when a link is clicked
    var links = nav.querySelectorAll('.nav-link');
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ========================================
     SMOOTH SCROLL — For anchor links
     ======================================== */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href === '#') return;

        var target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();

        var header = document.getElementById('site-header');
        var headerHeight = header ? header.offsetHeight : 0;
        var targetTop = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

        window.scrollTo({
          top: targetTop,
          behavior: 'smooth'
        });
      });
    });
  }

  /* ========================================
     SCROLL REVEAL — Intersection Observer
     ======================================== */
  function initScrollReveal() {
    var reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    // Fallback for browsers without IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      reveals.forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ========================================
     STAGGER DELAYS — Auto-assign to grids
     ======================================== */
  function initStaggerDelays() {
    // Treatment cards
    var treatmentCards = document.querySelectorAll('.treatment-card');
    treatmentCards.forEach(function (card, i) {
      card.classList.add('reveal-delay-' + ((i % 3) + 1));
    });

    // Testimonial cards
    var testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(function (card, i) {
      card.classList.add('reveal-delay-' + ((i % 2) + 1));
    });

    // FAQ items
    var faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(function (item, i) {
      item.classList.add('reveal-delay-' + ((i % 3) + 1));
    });
  }

  /* ========================================
     FAQ ACCORDION — Collapsible items
     ======================================== */
  function initFAQAccordion() {
    var faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(function (item) {
      var question = item.querySelector('.faq-question');
      if (!question) return;

      question.addEventListener('click', function () {
        var isActive = item.classList.contains('active');

        // Close all other items
        faqItems.forEach(function (otherItem) {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            var otherBtn = otherItem.querySelector('.faq-question');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current item
        item.classList.toggle('active');
        question.setAttribute('aria-expanded', !isActive);
      });
    });
  }

})();

/* ========== BOOKING LIGHTBOX ========== */
(function () {
  var lightbox = document.getElementById('booking');
  if (!lightbox) return;
  var clinikoBookings = document.getElementById('cliniko-81309195');
  var openTriggers = document.querySelectorAll('[data-book-now]');
  var closeTriggers = lightbox.querySelectorAll('[data-close-booking]');

  function openBooking(e) {
    if (e) e.preventDefault();
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('booking-modal-open');
  }
  function closeBooking() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('booking-modal-open');
  }

  openTriggers.forEach(function (t) { t.addEventListener('click', openBooking); });
  closeTriggers.forEach(function (t) { t.addEventListener('click', closeBooking); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeBooking();
  });

  window.addEventListener('message', function (e) {
    if (typeof e.data !== 'string' || !clinikoBookings) return;
    if (e.data.search('cliniko-bookings-resize') > -1) {
      var height = Number(e.data.split(':')[1]);
      clinikoBookings.style.height = height + 'px';
    }
    if (e.data.search('cliniko-bookings-page') > -1) {
      clinikoBookings.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
})();
