// ========== SCROLL REVEAL ==========
function initScrollReveal() {
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((el) => observer.observe(el));
}

// ========== NAV SCROLL ==========
function initNavScroll() {
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.pageYOffset > 80 ? '0 1px 4px rgba(0,0,0,0.04)' : 'none';
  });
}

// ========== MOBILE MENU ==========
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    links.classList.toggle('active');
    toggle.innerHTML = links.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
  });
  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('active');
      toggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });
}

// ========== ACTIVE NAV LINK ==========
function initActiveNav() {
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
  const setActive = () => {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 180) current = section.getAttribute('id');
    });
    navLinks.forEach((link) => {
      link.style.color = link.getAttribute('href') === `#${current}` ? 'var(--text)' : 'var(--text-secondary)';
    });
  };
  window.addEventListener('scroll', setActive);
  setActive();
}

// ========== GRID / SPREADSHEET VIEW TOGGLE ==========
function initViewToggle() {
  const btnGrid = document.getElementById('btn-grid-view');
  const btnTable = document.getElementById('btn-table-view');
  const gridView = document.getElementById('projects-visual-grid');
  const tableView = document.getElementById('projects-table-view');
  const notableSection = document.getElementById('notable-projects-visual-section');
  if (!btnGrid || !btnTable || !gridView || !tableView) return;
  btnGrid.addEventListener('click', () => {
    btnGrid.classList.add('active'); btnTable.classList.remove('active');
    gridView.style.display = 'grid'; tableView.style.display = 'none';
    if (notableSection) notableSection.style.display = 'block';
  });
  btnTable.addEventListener('click', () => {
    btnTable.classList.add('active'); btnGrid.classList.remove('active');
    gridView.style.display = 'none'; tableView.style.display = 'block';
    if (notableSection) notableSection.style.display = 'none';
  });
}

// ========== SVG NODE HOVER ==========
function initSvgNodes() {
  document.querySelectorAll('.svg-node').forEach((node) => {
    node.addEventListener('mouseenter', function() {
      this.querySelectorAll('rect').forEach(r => r.setAttribute('filter', 'brightness(1.05)'));
    });
    node.addEventListener('mouseleave', function() {
      this.querySelectorAll('rect').forEach(r => r.removeAttribute('filter'));
    });
  });
}

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initNavScroll();
  initMobileMenu();
  initActiveNav();
  initViewToggle();
  initSvgNodes();
});
