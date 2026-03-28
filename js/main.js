/* ================================================================
   SYNCLEAD.IO — Main JavaScript
   Navigation, scroll effects, animations, FAQ accordion
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initFaqAccordion();
  initContactForm();
  initSmoothScroll();
  setActiveNav();
});

/* ── Navbar Scroll Effect & Mobile Toggle ─────────────────────── */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  const actions = document.querySelector('.nav-actions');

  // Scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });

  // Mobile toggle
  if (toggle) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      links.classList.toggle('active');
      if (actions) actions.classList.toggle('active');
      document.body.style.overflow = toggle.classList.contains('active') ? 'hidden' : '';
    });

    // Close on link click
    if (links) {
      links.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          toggle.classList.remove('active');
          links.classList.remove('active');
          if (actions) actions.classList.remove('active');
          document.body.style.overflow = '';
        });
      });
    }
  }
}

/* ── Scroll Reveal (IntersectionObserver) ─────────────────────── */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ── FAQ Accordion ────────────────────────────────────────────── */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const wasActive = item.classList.contains('active');

        // Close all others
        faqItems.forEach(other => other.classList.remove('active'));

        // Toggle current
        if (!wasActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

/* ── Contact Form Handler ─────────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    // Simulate submission
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = 'Message Sent ✓';
      submitBtn.style.background = 'linear-gradient(135deg, #10B981, #059669)';

      setTimeout(() => {
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
      }, 2500);
    }, 1200);
  });
}

/* ── Smooth Scroll for Anchor Links ───────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ── Set Active Nav Link ──────────────────────────────────────── */
function setActiveNav() {
  const path = window.location.pathname;
  const links = document.querySelectorAll('.nav-links a');

  links.forEach(link => {
    const href = link.getAttribute('href');
    // Handle both relative paths
    if (href === '/' || href === '/index.html' || href === './index.html') {
      if (path === '/' || path.endsWith('/index.html') || path === '') {
        // Only mark Home as active if we're actually on the homepage
        const segments = path.split('/').filter(Boolean);
        if (segments.length === 0 || (segments.length === 1 && segments[0] === 'index.html')) {
          link.classList.add('active');
        }
      }
    } else {
      // For subpages, check if current path contains the href directory
      const hrefDir = href.replace(/\/index\.html$/, '').replace(/^\.\//, '').replace(/\/$/, '');
      if (hrefDir && path.includes(hrefDir)) {
        link.classList.add('active');
      }
    }
  });
}

/* ── Pricing Toggle (Monthly/Yearly) — future enhancement ─────── */
function initPricingToggle() {
  const toggle = document.getElementById('pricing-toggle');
  if (!toggle) return;

  toggle.addEventListener('change', () => {
    const isYearly = toggle.checked;
    document.querySelectorAll('[data-monthly]').forEach(el => {
      el.textContent = isYearly ? el.dataset.yearly : el.dataset.monthly;
    });
  });
}
