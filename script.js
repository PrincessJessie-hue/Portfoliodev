/**
 * Portfolio — script.js
 * Handles: mobile nav, scroll-based header, active nav link highlighting.
 */

// =============================================
// DOM References
// =============================================

const header     = document.getElementById('site-header');
const navToggle  = document.getElementById('navToggle');
const navLinks   = document.getElementById('navLinks');
const allNavLinks = document.querySelectorAll('.nav-link');

// =============================================
// Mobile Navigation
// =============================================

/**
 * Toggles the mobile navigation open/closed.
 */
const toggleMobileMenu = () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen.toString());
};

/**
 * Closes the mobile menu (called when a link is clicked or outside click).
 */
const closeMobileMenu = () => {
  navLinks.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
};

navToggle.addEventListener('click', toggleMobileMenu);

// Close the menu when any nav link is clicked
navLinks.addEventListener('click', (e) => {
  if (e.target.classList.contains('nav-link')) {
    closeMobileMenu();
  }
});

// Close menu if user clicks outside of it
document.addEventListener('click', (e) => {
  const isInsideNav = header.contains(e.target);
  if (!isInsideNav && navLinks.classList.contains('open')) {
    closeMobileMenu();
  }
});

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks.classList.contains('open')) {
    closeMobileMenu();
    navToggle.focus();
  }
});

// =============================================
// Scroll Behaviours
// =============================================

/**
 * Adds a border to the header once the user scrolls past the top.
 */
const handleHeaderScroll = () => {
  const scrolled = window.scrollY > 10;
  header.classList.toggle('scrolled', scrolled);
};

/**
 * Highlights the nav link that matches the currently visible section.
 * Uses IntersectionObserver for performance (no scroll event math).
 */
const initActiveNavTracking = () => {
  // Collect all sections that correspond to nav links
  const sections = document.querySelectorAll('section[id]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const activeId = entry.target.id;

        allNavLinks.forEach((link) => {
          const isActive = link.getAttribute('href') === `#${activeId}`;
          link.classList.toggle('active', isActive);
        });
      });
    },
    {
      // Trigger when a section hits the top ~30% of the viewport
      rootMargin: '-30% 0px -65% 0px',
    }
  );

  sections.forEach((section) => observer.observe(section));
};

// =============================================
// Init
// =============================================

window.addEventListener('scroll', handleHeaderScroll, { passive: true });
initActiveNavTracking();