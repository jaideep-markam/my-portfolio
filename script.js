'use strict';

/* ═══════════════════════════════════════════════════════
   ULTRA-PREMIUM FAST JS
═══════════════════════════════════════════════════════ */

/* ────────────────────────────────────────────
   SECURITY: FRAME-BUSTING (ANTI-CLICKJACKING)
──────────────────────────────────────────── */
try {
  if (window.top !== window.self) {
    window.top.location = window.self.location;
  }
} catch (e) { /* cross-origin frame, ignore */ }

/* ────────────────────────────────────────────
   DATA
──────────────────────────────────────────── */
const PROJECTS = [
  { id: 'p1', title: 'Ranveer Allahbadia', category: 'Talking Head', client: 'Creator / Podcast', description: 'Before & After Polish showing dynamic captions, color grading, and retention-focused cuts.', tools: 'DaVinci Resolve', videoUrl: 'https://res.cloudinary.com/dlupqyzif/video/upload/Ranveer_allhabadia_B_and_After_11_zamv2p.mp4', thumbUrl: 'https://res.cloudinary.com/dlupqyzif/video/upload/w_600,h_1066,c_fill,so_2,q_auto/Ranveer_allhabadia_B_and_After_11_zamv2p.jpg', duration: 'Short Form' },
  { id: 'p2', title: 'Scar Edit', category: 'Cinematic', client: 'Narrative Short', description: 'Focusing entirely on mood and color grading to create a highly cinematic and visceral experience.', tools: 'DaVinci Resolve', videoUrl: 'https://res.cloudinary.com/dlupqyzif/video/upload/Scar_revised_lcybah.mp4', thumbUrl: 'https://res.cloudinary.com/dlupqyzif/video/upload/w_600,h_1066,c_fill,so_2,q_auto/Scar_revised_lcybah.jpg', duration: 'Short Form' },
  { id: 'p3', title: 'Tech Review', category: 'Motion', client: 'Tech Creator', description: 'Dynamic pacing and energetic transitions to keep tech reviews engaging and snappy.', tools: 'DaVinci Resolve', videoUrl: 'https://res.cloudinary.com/dlupqyzif/video/upload/Technology_ikkj1h.mp4', thumbUrl: 'https://res.cloudinary.com/dlupqyzif/video/upload/w_600,h_1066,c_fill,so_2,q_auto/Technology_ikkj1h.jpg', duration: 'Short Form' },
  { id: 'p4', title: 'Ryna Presets', category: 'Explainer', client: 'Brand / Commercial', description: 'Clean typography and smooth animations demonstrating preset functionalities.', tools: 'DaVinci Resolve', videoUrl: 'https://res.cloudinary.com/dlupqyzif/video/upload/Preset_Explainer_by_Ryna_k75xr2.mp4', thumbUrl: 'https://res.cloudinary.com/dlupqyzif/video/upload/w_600,h_1066,c_fill,so_2,q_auto/Preset_Explainer_by_Ryna_k75xr2.jpg', duration: 'Short Form' },
  { id: 'p5', title: 'Social Media B&A', category: 'Talking Head', client: 'Social Media Creator', description: 'A full Before & After transformation showcasing tight jump cuts and color grading.', tools: 'DaVinci Resolve', videoUrl: 'https://res.cloudinary.com/dlupqyzif/video/upload/social_media_before_and_after_final_svwfho.mp4', thumbUrl: 'https://res.cloudinary.com/dlupqyzif/video/upload/w_600,h_1066,c_fill,so_2,q_auto/social_media_before_and_after_final_svwfho.jpg', duration: 'Short Form' }
];

/* ────────────────────────────────────────────
   STATE & UTILS
──────────────────────────────────────────── */
let currentView = 'home';
let activeFilter = 'All';
let currentLbIdx = 0;

const VALID_VIEWS = new Set(['home', 'work', 'process', 'contact']);

function qs(s, c = document) { return c.querySelector(s); }
function qsa(s, c = document) { return [...c.querySelectorAll(s)]; }
function safeText(str) { return document.createTextNode(str); }

/* ────────────────────────────────────────────
   FAST LOADER
──────────────────────────────────────────── */
const loader = qs('#loader');
const lProg = qs('#loader-progress');

function runLoader() {
  let p = 0;
  const int = setInterval(() => {
    p += Math.floor(Math.random() * 25) + 15;
    if (p > 100) p = 100;
    if (lProg) lProg.style.width = `${p}%`;

    if (p === 100) {
      clearInterval(int);
      setTimeout(() => {
        if(loader) {
          loader.style.opacity = '0';
          loader.style.visibility = 'hidden';
          setTimeout(() => loader.remove(), 600);
        }
      }, 300);
    }
  }, 80); // Faster tick rate
}

/* ────────────────────────────────────────────
   THEME TOGGLE
──────────────────────────────────────────── */
const themeToggle = qs('#theme-toggle');
const htmlEl = document.documentElement;
let isLight = localStorage.getItem('theme') === 'light';

function setTheme(light) {
  isLight = light;
  if (light) {
    htmlEl.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  } else {
    htmlEl.removeAttribute('data-theme');
    localStorage.setItem('theme', 'dark');
  }
}
setTheme(isLight);

themeToggle?.addEventListener('click', () => {
  setTheme(!isLight);
});

/* ────────────────────────────────────────────
   MAGNETIC BUTTONS (Zero Lag)
──────────────────────────────────────────── */
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
if (!isTouchDevice) {
  qsa('.magnetic').forEach(btn => {
    let ticking = false;
    btn.addEventListener('mousemove', e => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
          ticking = false;
        });
        ticking = true;
      }
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = `translate(0px, 0px)`;
    });
  });
}

/* ────────────────────────────────────────────
   BUILD CARDS (SKELETON & CINEMATIC)
──────────────────────────────────────────── */
function buildCard(proj, i) {
  const c = document.createElement('div');
  // Start with skeleton class for immediate load state
  c.className = 'work-card skeleton reveal delay-' + (i % 3);
  c.tabIndex = 0;
  
  const img = document.createElement('img');
  img.className = 'wc-img skeleton-media';
  img.alt = proj.title + ' – ' + proj.category;
  img.loading = 'lazy';
  
  // Skeleton logic: remove skeleton once image loads
  img.onload = () => {
    c.classList.remove('skeleton');
    img.classList.add('loaded');
  };
  // Start fetch
  img.src = proj.thumbUrl;

  const overlay = document.createElement('div');
  overlay.className = 'wc-overlay';

  const cat = document.createElement('div');
  cat.className = 'wc-cat';
  cat.appendChild(safeText(proj.category));

  const t = document.createElement('div');
  t.className = 'wc-title';
  t.appendChild(safeText(proj.title));

  overlay.appendChild(cat);
  overlay.appendChild(t);

  const play = document.createElement('div');
  play.className = 'wc-play';
  play.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256"><path d="M232.4,114.5l-136-88A15.9,15.9,0,0,0,72,40V216a15.9,15.9,0,0,0,24.4,13.5l136-88A15.9,15.9,0,0,0,232.4,114.5ZM88,202.5V53.5l115.1,74.5Z"></path></svg>`;

  c.appendChild(img);
  c.appendChild(overlay);
  c.appendChild(play);

  // Lightbox Trigger
  const fullIdx = PROJECTS.findIndex(p => p.id === proj.id);
  c.addEventListener('click', () => openLb(fullIdx));
  c.addEventListener('keydown', e => { if (e.key === 'Enter') openLb(fullIdx); });

  return c;
}

function renderGrids() {
  const homeGrid = qs('#home-showcase');
  if (homeGrid) {
    homeGrid.innerHTML = '';
    PROJECTS.slice(0, 3).forEach((p, i) => homeGrid.appendChild(buildCard(p, i)));
  }
  renderWorkGrid('All');
}

function renderWorkGrid(filter) {
  const g = qs('#portfolio-grid');
  if (!g) return;
  g.innerHTML = '';
  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === filter);
  
  filtered.forEach((p, i) => {
    g.appendChild(buildCard(p, i));
  });
  
  setTimeout(initReveal, 50);
}

/* ────────────────────────────────────────────
   LIGHTBOX
──────────────────────────────────────────── */
const lb = qs('#lightbox');
const lbVid = qs('#lb-video');
const lbVidWrap = qs('.lb-video-container');

function openLb(idx) {
  if (idx < 0 || idx >= PROJECTS.length) return;
  currentLbIdx = idx;
  const p = PROJECTS[idx];

  qs('#lb-cat').textContent = p.category;
  qs('#lb-title').textContent = p.title;
  qs('#lb-desc').textContent = p.description;
  qs('#lb-client').textContent = p.client;
  qs('#lb-tools').textContent = p.tools;
  qs('#lb-count').textContent = `${idx + 1} / ${PROJECTS.length}`;

  if (lbVid) {
    // Skeleton state for video
    lbVid.classList.remove('loaded');
    lbVidWrap?.classList.add('skeleton');
    
    lbVid.src = p.videoUrl;
    lbVid.poster = p.thumbUrl;
    lbVid.load();
    lbVid.onloadeddata = () => {
      lbVid.classList.add('loaded');
      lbVidWrap?.classList.remove('skeleton');
      lbVid.play().catch(() => {});
    };
  }

  lb?.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLb() {
  lb?.classList.remove('active');
  document.body.style.overflow = '';
  if (lbVid) {
    lbVid.pause();
    lbVid.src = '';
  }
}

qs('#lb-close')?.addEventListener('click', closeLb);
qs('#lb-backdrop')?.addEventListener('click', closeLb);
qs('#lb-prev')?.addEventListener('click', () => openLb((currentLbIdx - 1 + PROJECTS.length) % PROJECTS.length));
qs('#lb-next')?.addEventListener('click', () => openLb((currentLbIdx + 1) % PROJECTS.length));

document.addEventListener('keydown', e => {
  if (!lb?.classList.contains('active')) return;
  if (e.key === 'Escape') closeLb();
  if (e.key === 'ArrowLeft') qs('#lb-prev')?.click();
  if (e.key === 'ArrowRight') qs('#lb-next')?.click();
});

/* ────────────────────────────────────────────
   SPA NAV (Instant)
──────────────────────────────────────────── */
function navTo(view) {
  if (view === currentView || !VALID_VIEWS.has(view)) return;
  currentView = view;

  qsa('.view').forEach(v => {
    v.classList.remove('active');
    qsa('.reveal', v).forEach(r => r.classList.remove('in'));
  });
  
  const tView = qs(`#view-${view}`);
  if (tView) tView.classList.add('active');

  qsa('.nav-link, .mob-link').forEach(l => {
    l.classList.toggle('active', l.dataset.nav === view);
  });

  if (view === 'work') renderWorkGrid(activeFilter);

  closeMenu();
  window.scrollTo({ top: 0, behavior: 'instant' });
  setTimeout(initReveal, 30);
}

document.addEventListener('click', e => {
  const el = e.target.closest('[data-nav]');
  if (!el) return;
  e.preventDefault();
  const dest = el.dataset.nav;
  if (dest) navTo(dest);
});

/* ────────────────────────────────────────────
   MOBILE MENU
──────────────────────────────────────────── */
const mMenu = qs('#mob-menu');
qs('#menu-btn')?.addEventListener('click', () => {
  mMenu.classList.add('active');
  document.body.style.overflow = 'hidden';
});
qs('#mob-close')?.addEventListener('click', closeMenu);

function closeMenu() {
  mMenu?.classList.remove('active');
  if (!lb?.classList.contains('active')) document.body.style.overflow = '';
}

/* ────────────────────────────────────────────
   SCROLL / REVEAL (Hardware Accelerated)
──────────────────────────────────────────── */
const navbar = qs('#navbar');
let lastScroll = 0;
let ticking = false;

window.addEventListener('scroll', () => {
  lastScroll = window.scrollY;
  if (!ticking) {
    requestAnimationFrame(() => {
      navbar?.classList.toggle('scrolled', lastScroll > 50);
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

function initReveal() {
  const els = qsa('.reveal:not(.in)');
  const io = new IntersectionObserver(ents => {
    ents.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(e => io.observe(e));
}

/* ────────────────────────────────────────────
   FILTERS
──────────────────────────────────────────── */
qs('#filter-track')?.addEventListener('click', e => {
  const p = e.target.closest('.filter-btn');
  if (!p) return;
  qsa('.filter-btn').forEach(el => el.classList.remove('active'));
  p.classList.add('active');
  activeFilter = p.dataset.filter;
  renderWorkGrid(activeFilter);
});

/* ────────────────────────────────────────────
   INIT
──────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  runLoader();
  renderGrids();
  
  // Also handle video poster skeleton on home page
  const hVideo = qs('.video-mockup video');
  if (hVideo) {
    hVideo.onloadeddata = () => hVideo.classList.add('loaded');
  }

  setTimeout(initReveal, 250); 
});
