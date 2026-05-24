// ========== SCROLL REVEAL ANIMATIONS ==========
function initScrollReveal() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((el) => {
    observer.observe(el);
  });
}

// ========== SMOOTH NAV SCROLL ==========
function initNavScroll() {
  let lastScroll = 0;
  const nav = document.querySelector('nav');

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      nav.style.background = 'rgba(255, 255, 255, 0.45)';
      nav.style.boxShadow = '0 12px 30px -10px rgba(122, 28, 44, 0.05)';
    } else {
      nav.style.background = 'rgba(255, 255, 255, 0.28)';
      nav.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
  });
}

// ========== NAV HAMBURGER ==========
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');

  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('active');
    toggle.innerHTML = links.classList.contains('active')
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  // Close on link click
  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('active');
      toggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });
}

// ========== ACTIVE NAV LINK ==========
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach((section) => {
      const top = section.offsetTop - 150;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.style.color = link.getAttribute('href') === `#${current}`
        ? 'var(--text)' : 'var(--text-secondary)';
    });
  });
}

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initNavScroll();
  initMobileMenu();
  initActiveNav();
});
