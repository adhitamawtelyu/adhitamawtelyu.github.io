// ========== THREE.JS PARTICLE BACKGROUND ==========
let scene, camera, renderer, particles, mouseX = 0, mouseY = 0;

function initThree() {
  const canvas = document.getElementById('three-canvas');

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 30;

  renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Particles geometry
  const count = 2000;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  const color1 = new THREE.Color('#4F46E5');
  const color2 = new THREE.Color('#2563EB');
  const color3 = new THREE.Color('#0EA5E9');

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    // Spread particles in a sphere
    const radius = 20 + Math.random() * 15;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = radius * Math.cos(phi);

    // Random colors from palette
    const choice = Math.random();
    let c;
    if (choice < 0.4) c = color1;
    else if (choice < 0.7) c = color2;
    else c = color3;

    colors[i3] = c.r;
    colors[i3 + 1] = c.g;
    colors[i3 + 2] = c.b;

    sizes[i] = 0.05 + Math.random() * 0.15;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const material = new THREE.PointsMaterial({
    size: 0.12,
    vertexColors: true,
    transparent: true,
    opacity: 0.45,
    blending: THREE.NormalBlending,
    sizeAttenuation: true,
  });

  particles = new THREE.Points(geometry, material);
  scene.add(particles);

  // Additional smaller particle ring
  const ringCount = 800;
  const ringPos = new Float32Array(ringCount * 3);
  for (let i = 0; i < ringCount; i++) {
    const i3 = i * 3;
    const angle = Math.random() * Math.PI * 2;
    const r = 18 + Math.random() * 8;
    const y = (Math.random() - 0.5) * 25;
    ringPos[i3] = r * Math.cos(angle);
    ringPos[i3 + 1] = y;
    ringPos[i3 + 2] = r * Math.sin(angle);
  }
  const ringGeo = new THREE.BufferGeometry();
  ringGeo.setAttribute('position', new THREE.BufferAttribute(ringPos, 3));
  const ringMat = new THREE.PointsMaterial({
    size: 0.06,
    color: 0x4F46E5,
    transparent: true,
    opacity: 0.25,
    blending: THREE.NormalBlending,
    sizeAttenuation: true,
  });
  const ring = new THREE.Points(ringGeo, ringMat);
  scene.add(ring);

  animate();
}

function animate() {
  requestAnimationFrame(animate);

  if (particles) {
    particles.rotation.y += 0.0003;
    particles.rotation.x += 0.0001;

    // Subtle mouse parallax
    particles.rotation.x += (mouseY * 0.0001 - particles.rotation.x) * 0.01;
    particles.rotation.y += (mouseX * 0.0001 - particles.rotation.y) * 0.01;
  }

  renderer.render(scene, camera);
}

// Mouse tracking
document.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth) * 2 - 1;
  mouseY = (e.clientY / window.innerHeight) * 2 - 1;
});

// Resize
window.addEventListener('resize', () => {
  if (!camera || !renderer) return;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

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
      nav.style.background = 'rgba(249, 250, 251, 0.92)';
      nav.style.borderBottom = '1px solid var(--border)';
    } else {
      nav.style.background = 'rgba(249, 250, 251, 0.85)';
      nav.style.borderBottom = '1px solid var(--border)';
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
  // Check if Three.js is loaded
  if (typeof THREE !== 'undefined') {
    initThree();
  } else {
    console.warn('Three.js not loaded');
  }

  initScrollReveal();
  initNavScroll();
  initMobileMenu();
  initActiveNav();
});
