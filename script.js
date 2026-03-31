'use strict';

/* ═══════════════════════════════════════════════════════
   JAIDEEP MARKAM — PORTFOLIO  v4.0
   Full SPA Engine · Dark/Light Theme · Real Projects
═══════════════════════════════════════════════════════ */

/* ────────────────────────────────────────────
   PROJECT DATA
──────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 'p1',
    title: 'Ranveer Allahbadia',
    category: 'Talking Head',
    client: 'Creator / Podcast',
    description: 'Before & After Polish showing dynamic captions, color grading, and retention-focused cuts for high-engagement platforms.',
    tools: ['DaVinci Resolve'],
    videoUrl: 'https://res.cloudinary.com/dlupqyzif/video/upload/v1772958118/Ranveer_allhabadia_B_and_After_11_zamv2p.mp4',
    thumbUrl: 'https://res.cloudinary.com/dlupqyzif/video/upload/w_600,h_1066,c_fill,so_2,q_auto/v1772958118/Ranveer_allhabadia_B_and_After_11_zamv2p.jpg',
    duration: 'Short Form'
  },
  {
    id: 'p2',
    title: 'Scar Edit',
    category: 'Cinematic',
    client: 'Narrative Short',
    description: 'Focusing entirely on mood and color grading to create a highly cinematic and visceral short-form experience.',
    tools: ['DaVinci Resolve'],
    videoUrl: 'https://res.cloudinary.com/dlupqyzif/video/upload/v1772958122/Scar_revised_lcybah.mp4',
    thumbUrl: 'https://res.cloudinary.com/dlupqyzif/video/upload/w_600,h_1066,c_fill,so_2,q_auto/v1772958122/Scar_revised_lcybah.jpg',
    duration: 'Short Form'
  },
  {
    id: 'p3',
    title: 'Tech Review',
    category: 'Motion',
    client: 'Tech Creator',
    description: 'Dynamic pacing and energetic transitions to keep tech reviews engaging, snappy, and algorithm-friendly.',
    tools: ['DaVinci Resolve'],
    videoUrl: 'https://res.cloudinary.com/dlupqyzif/video/upload/v1772958206/Technology_ikkj1h.mp4',
    thumbUrl: 'https://res.cloudinary.com/dlupqyzif/video/upload/w_600,h_1066,c_fill,so_2,q_auto/v1772958206/Technology_ikkj1h.jpg',
    duration: 'Short Form'
  },
  {
    id: 'p4',
    title: 'Ryna Presets',
    category: 'Explainer',
    client: 'Brand / Commercial',
    description: 'Clean typography and smooth animations demonstrating preset functionalities for a digital product launch.',
    tools: ['DaVinci Resolve'],
    videoUrl: 'https://res.cloudinary.com/dlupqyzif/video/upload/v1772961785/Preset_Explainer_by_Ryna_k75xr2.mp4',
    thumbUrl: 'https://res.cloudinary.com/dlupqyzif/video/upload/w_600,h_1066,c_fill,so_2,q_auto/v1772961785/Preset_Explainer_by_Ryna_k75xr2.jpg',
    duration: 'Short Form'
  }
];

/* ────────────────────────────────────────────
   STATE
──────────────────────────────────────────── */
let currentView = 'home';
let currentProjectId = null;
let activeFilter = 'All';

// Fix #4 — Allowlist of valid navigation destinations.
// Rejects any data-nav value not on this list, blocking navigation hijacking.
const VALID_VIEWS = new Set(['home', 'work', 'project', 'process']);

// Fix #5 — Allowlist of valid theme values.
// Prevents DOM attribute injection if localStorage is tampered with.
const VALID_THEMES = new Set(['dark', 'light']);

/* ────────────────────────────────────────────
   UTILS
──────────────────────────────────────────── */
function qs(sel, scope = document) { return scope.querySelector(sel); }
function qsa(sel, scope = document) { return [...scope.querySelectorAll(sel)]; }

function playIcon() {
  return `<div class="play-ring">
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="white">
      <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>
  </div>`;
}

function toolIcon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`;
}

/* ────────────────────────────────────────────
   CARD BUILDER
──────────────────────────────────────────── */
function buildCard(project, isFeatured = false) {
  const div = document.createElement('div');
  div.className = 'video-card';
  div.dataset.projectId = project.id;
  div.dataset.category = project.category;
  div.setAttribute('role', 'button');
  // Fix #1 — aria-label uses setAttribute, which auto-encodes special characters.
  div.setAttribute('aria-label', 'View project: ' + project.title);
  div.tabIndex = 0;

  const shortDesc = isFeatured
    ? project.description.split(' ').slice(0, 8).join(' ') + '\u2026'
    : project.description;

  // Fix #1 — Build card entirely via DOM API. No dynamic data is ever passed to
  // innerHTML, eliminating the XSS injection surface on project title, thumb URL,
  // category, and description fields.
  const img = document.createElement('img');
  img.src = project.thumbUrl;          // Safe: browser treats src as a URL, not HTML
  img.alt = project.title;             // Safe: alt is a plain-text attribute
  img.loading = 'lazy';

  const badge = document.createElement('span');
  badge.className = 'card-cat-badge';
  badge.textContent = project.category; // textContent never interprets HTML tags

  // playIcon() is a static, hardcoded SVG string — not derived from any data field.
  const playBtn = document.createElement('div');
  playBtn.className = 'card-play-btn';
  playBtn.innerHTML = playIcon();

  const cardInfo = document.createElement('div');
  cardInfo.className = 'card-info';

  const cardTitle = document.createElement('div');
  cardTitle.className = 'card-info-title';
  cardTitle.textContent = project.title; // textContent prevents script injection

  const cardDesc = document.createElement('div');
  cardDesc.className = 'card-info-desc';
  cardDesc.textContent = shortDesc;      // textContent prevents script injection

  cardInfo.appendChild(cardTitle);
  cardInfo.appendChild(cardDesc);
  div.appendChild(img);
  div.appendChild(badge);
  div.appendChild(playBtn);
  div.appendChild(cardInfo);

  div.addEventListener('click', () => navigateTo('project', project.id));
  div.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') navigateTo('project', project.id); });

  // Cursor effect
  div.addEventListener('mouseenter', () => { qs('#cursor')?.classList.add('big'); qs('#cursorFollower')?.classList.add('big'); });
  div.addEventListener('mouseleave', () => { qs('#cursor')?.classList.remove('big'); qs('#cursorFollower')?.classList.remove('big'); });

  return div;
}

/* ────────────────────────────────────────────
   RENDER VIEWS
──────────────────────────────────────────── */
function renderFeaturedGrid() {
  const grid = qs('#featuredGrid');
  if (!grid) return;
  grid.innerHTML = '';
  PROJECTS.slice(0, 3).forEach(p => grid.appendChild(buildCard(p, true)));
}

function renderPortfolioGrid(filter = 'All') {
  const grid = qs('#portfolioGrid');
  if (!grid) return;

  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === filter);
  grid.innerHTML = '';
  filtered.forEach((p, i) => {
    const card = buildCard(p);
    card.style.opacity = '0';
    card.style.transform = 'translateY(18px)';
    grid.appendChild(card);
    requestAnimationFrame(() => {
      setTimeout(() => {
        card.style.transition = 'opacity .45s ease, transform .45s ease, box-shadow .5s, border-color .35s, transform .5s';
        card.style.opacity = '1';
        card.style.transform = '';
      }, i * 70);
    });
  });
}

function renderProjectDetail(id) {
  // Fix #6 — Reject null/non-string IDs before the lookup to prevent state corruption.
  // A null id would leave the panel blank without resetting currentProjectId cleanly.
  if (!id || typeof id !== 'string') return;
  const project = PROJECTS.find(p => p.id === id);
  if (!project) return;

  qs('#projectCat').textContent = project.category;
  qs('#projectTitle').textContent = project.title;
  qs('#projectDesc').textContent = project.description;
  qs('#projectClient').textContent = project.client;
  qs('#projectFormat').textContent = project.duration;

  const video = qs('#projectVideo');
  video.src = project.videoUrl;
  video.poster = project.thumbUrl;
  video.load();

  // Fix #2 — Build tool chips via DOM API. Tool names are written with textContent
  // so a value like '<script>alert(1)</script>' is rendered as literal text, not executed.
  const toolsList = qs('#toolsList');
  toolsList.innerHTML = '';
  project.tools.forEach(t => {
    const chip = document.createElement('span');
    chip.className = 'tool-chip';
    const iconEl = document.createElement('span');
    iconEl.innerHTML = toolIcon(); // Safe: toolIcon() is a static, hardcoded SVG string
    const nameEl = document.createElement('span');
    nameEl.textContent = t;        // textContent prevents HTML injection in tool names
    chip.appendChild(iconEl);
    chip.appendChild(nameEl);
    toolsList.appendChild(chip);
  });
}

/* ────────────────────────────────────────────
   SPA NAVIGATION
──────────────────────────────────────────── */
function navigateTo(view, projectId = null) {
  if (view === currentView && view !== 'project') return;

  // Pause any playing video
  const prevVideo = qs('#projectVideo');
  if (prevVideo) prevVideo.pause();

  currentView = view;
  // Fix #6 — Only update currentProjectId when a valid, non-null string is provided.
  // Prevents a crafted data-nav='project' element from nulling out the current project.
  if (projectId !== null && typeof projectId === 'string') currentProjectId = projectId;
  // Guard: if we somehow reach the project view with no loaded ID, fall back to work.
  if (view === 'project' && !currentProjectId) { navigateTo('work'); return; }

  // Show / hide views
  qsa('.view').forEach(v => v.classList.remove('active'));
  const targetView = qs(`#view${capitalise(view)}`);
  if (targetView) {
    targetView.classList.add('active');
    targetView.style.animation = 'none';
    requestAnimationFrame(() => {
      targetView.style.animation = '';
    });
  }

  // Update nav
  updateNavActive(view);

  // Render content
  if (view === 'work') renderPortfolioGrid(activeFilter);
  if (view === 'project') renderProjectDetail(currentProjectId);

  // Close mobile menu
  closeMobileMenu();

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Re-observe reveals
  setTimeout(initReveal, 100);
}

function capitalise(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function updateNavActive(view) {
  qsa('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.nav === view);
  });
}

/* ────────────────────────────────────────────
   BIND NAVIGATION BUTTONS
──────────────────────────────────────────── */
function bindNavButtons() {
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-nav]');
    if (!el) return;
    e.preventDefault();
    const dest = el.dataset.nav;
    // Fix #4 — Validate destination against the allowlist before navigating.
    // An injected element with data-nav='arbitrary-value' will be silently ignored.
    if (dest && VALID_VIEWS.has(dest)) navigateTo(dest);
  });
}

/* ────────────────────────────────────────────
   SCROLL → NAVBAR STYLE
──────────────────────────────────────────── */
(function () {
  const nav = qs('#navbar');
  function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 60); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ────────────────────────────────────────────
   MOBILE MENU
──────────────────────────────────────────── */
function closeMobileMenu() {
  qs('#hamBtn')?.classList.remove('open');
  qs('#mobOverlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

(function () {
  const btn = qs('#hamBtn');
  const overlay = qs('#mobOverlay');
  if (!btn || !overlay) return;

  btn.addEventListener('click', () => {
    const isOpen = overlay.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      btn.classList.add('open');
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });
})();

/* ────────────────────────────────────────────
   THEME TOGGLE
──────────────────────────────────────────── */
(function () {
  const btn = qs('#themeToggle');
  const root = document.documentElement;

  // Fix #5 — Validate the stored theme against an allowlist before writing it to the
  // DOM. A tampered localStorage value like '" onmouseover="evil()' is rejected,
  // and the theme safely defaults to 'dark'.
  const stored = localStorage.getItem('jm-theme');
  const saved = VALID_THEMES.has(stored) ? stored : 'dark';
  root.setAttribute('data-theme', saved);

  btn?.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('jm-theme', next);
  });
})();

/* ────────────────────────────────────────────
   FILTER PILLS (WORK VIEW)
──────────────────────────────────────────── */
(function () {
  qs('#filterBar')?.addEventListener('click', e => {
    const pill = e.target.closest('.filter-pill');
    if (!pill) return;
    qsa('.filter-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    activeFilter = pill.dataset.filter;
    renderPortfolioGrid(activeFilter);
  });
})();

/* ────────────────────────────────────────────
   CUSTOM CURSOR
──────────────────────────────────────────── */
(function () {
  const dot  = qs('#cursor');
  const ring = qs('#cursorFollower');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  // Fix #7 — Gate the RAF loop on page visibility. The loop was running 60fps
  // continuously even when the tab was in the background, wasting CPU and battery.
  let pageVisible = !document.hidden;
  document.addEventListener('visibilitychange', () => {
    pageVisible = !document.hidden;
  });

  (function tick() {
    if (pageVisible) {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
    }
    requestAnimationFrame(tick);
  })();

  const interactables = 'a, button, .nav-link, .filter-pill, .view-all-btn, .back-btn, .workflow-step, .contact-link, .theme-btn';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(interactables)) {
      dot.classList.add('big');
      ring.classList.add('big');
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(interactables)) {
      dot.classList.remove('big');
      ring.classList.remove('big');
    }
  });
})();

/* ────────────────────────────────────────────
   HERO GLOW PARALLAX
──────────────────────────────────────────── */
(function () {
  const ga = qs('.hero-glow-a');
  const gb = qs('.hero-glow-b');
  if (!ga) return;

  document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - .5) * 30;
    const y = (e.clientY / window.innerHeight - .5) * 20;
    ga.style.transform = `translateX(calc(-50% + ${x}px)) translateY(${y}px)`;
    if (gb) gb.style.transform = `translate(${-x * .45}px, ${-y * .45}px)`;
  }, { passive: true });
})();

/* ────────────────────────────────────────────
   SCROLL REVEAL
──────────────────────────────────────────── */
function initReveal() {
  const els = qsa('.reveal-up, .reveal-fade');
  if (!els.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => { el.classList.remove('in'); io.observe(el); });
}

/* ────────────────────────────────────────────
   FOOTER YEAR
──────────────────────────────────────────── */
const yearEl = qs('#footerYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ────────────────────────────────────────────
   INIT
──────────────────────────────────────────── */
(function init() {
  bindNavButtons();
  renderFeaturedGrid();
  renderPortfolioGrid();
  initReveal();
  navigateTo('home');
})();
