'use strict';

/* ═══════════════════════════════════════════════════════
   MASTERPIECE PORTFOLIO JS
═══════════════════════════════════════════════════════ */

/* ── SECURITY: FRAME-BUSTING ── */
try {
  if (window.top !== window.self) {
    window.top.location = window.self.location;
  }
} catch (e) { /* cross-origin frame */ }

/* ── DATA ── */
const PROJECTS = [
  { id: 'p1', title: 'Talking Head 01', category: 'Talking Head', client: 'Content Creator', description: 'Dynamic captions, color grading, and retention-focused cuts.', tools: 'DaVinci Resolve', videoUrl: 'https://res.cloudinary.com/dlupqyzif/video/upload/v1781975459/Talking_head_01_zjyryy.mp4', thumbUrl: 'https://res.cloudinary.com/dlupqyzif/video/upload/w_600,h_1066,c_fill,so_2,q_auto/v1781975459/Talking_head_01_zjyryy.jpg', duration: 'Short Form' },
  { id: 'p2', title: 'Ryan Talking Head', category: 'Talking Head', client: 'Podcast', description: 'Engaging podcast clip with optimized pacing, smooth zooms, and dynamic visuals.', tools: 'DaVinci Resolve', videoUrl: 'https://res.cloudinary.com/dlupqyzif/video/upload/v1781975444/Ryan_talking_head_rkgte9.mp4', thumbUrl: 'https://res.cloudinary.com/dlupqyzif/video/upload/w_600,h_1066,c_fill,so_2,q_auto/v1781975444/Ryan_talking_head_rkgte9.jpg', duration: 'Short Form' },
  { id: 'p3', title: 'Scar New Podcast Clip', category: 'Podcast', client: 'Narrative Short', description: 'Focusing entirely on mood and color grading to create a highly cinematic and visceral experience.', tools: 'DaVinci Resolve', videoUrl: 'https://res.cloudinary.com/dlupqyzif/video/upload/v1781975468/Scar_new_podcast_clip_gsygmq.mp4', thumbUrl: 'https://res.cloudinary.com/dlupqyzif/video/upload/w_600,h_1066,c_fill,so_2,q_auto/v1781975468/Scar_new_podcast_clip_gsygmq.jpg', duration: 'Short Form' },
  { id: 'p4', title: 'Education Podcast Clip', category: 'Podcast', client: 'EdTech Brand', description: 'Clean typography and smooth motion graphics to explain complex concepts.', tools: 'DaVinci Resolve', videoUrl: 'https://res.cloudinary.com/dlupqyzif/video/upload/v1781975464/Education_podcast_clip_jjur6i.mp4', thumbUrl: 'https://res.cloudinary.com/dlupqyzif/video/upload/w_600,h_1066,c_fill,so_2,q_auto/v1781975464/Education_podcast_clip_jjur6i.jpg', duration: 'Short Form' },
  { id: 'p5', title: 'Real Estate 01', category: 'Real Estate', client: 'Real Estate Agency', description: 'A premium property tour showcasing seamless transitions and high-end color grading.', tools: 'DaVinci Resolve', videoUrl: 'https://res.cloudinary.com/dlupqyzif/video/upload/v1781975409/Real_estate_01_ynt3up.mp4', thumbUrl: 'https://res.cloudinary.com/dlupqyzif/video/upload/w_600,h_1066,c_fill,so_2,q_auto/v1781975409/Real_estate_01_ynt3up.jpg', duration: 'Short Form' },
  { id: 'p6', title: 'AI Cinematic Story 01', category: 'AI Cinematic', client: 'AI Storytelling', description: 'Cinematic AI-driven short film blending generative visuals with powerful storytelling and motion.', tools: 'DaVinci Resolve', youtubeId: 'uudT2F2l-gU', thumbUrl: 'https://img.youtube.com/vi/uudT2F2l-gU/maxresdefault.jpg', duration: 'Short Form' },
  { id: 'p7', title: 'AI Cinematic Story 02', category: 'AI Cinematic', client: 'AI Storytelling', description: 'A visually stunning AI-generated narrative with precise color control and dynamic pacing.', tools: 'DaVinci Resolve', youtubeId: 'T6zQ7lCraSk', thumbUrl: 'https://img.youtube.com/vi/T6zQ7lCraSk/maxresdefault.jpg', duration: 'Short Form' },
  { id: 'p8', title: 'AI Cinematic Story 03', category: 'AI Cinematic', client: 'AI Storytelling', description: 'Emotionally charged AI visual story with immersive sound design and cinematic color grading.', tools: 'DaVinci Resolve', youtubeId: 'PPLybYzjh4c', thumbUrl: 'https://img.youtube.com/vi/PPLybYzjh4c/maxresdefault.jpg', duration: 'Short Form' },
  { id: 'p9', title: 'AI Cinematic Story 04', category: 'AI Cinematic', client: 'AI Storytelling', description: 'High-impact AI cinematic edit with bold transitions, rich texture, and narrative depth.', tools: 'DaVinci Resolve', youtubeId: 'zp8lbroxpIM', thumbUrl: 'https://img.youtube.com/vi/zp8lbroxpIM/maxresdefault.jpg', duration: 'Short Form' }
];

/* ── STATE & UTILS ── */
let currentView = 'home';
let activeFilter = 'All';
let currentLbIdx = 0;

const VALID_VIEWS = new Set(['home', 'work', 'process', 'contact']);

function qs(s, c = document) { return c.querySelector(s); }
function qsa(s, c = document) { return [...c.querySelectorAll(s)]; }
function safeText(str) { return document.createTextNode(str); }

/* ── LOADER ── */
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
        if (loader) {
          loader.style.opacity = '0';
          loader.style.visibility = 'hidden';
          setTimeout(() => loader.remove(), 600);
        }
      }, 300);
    }
  }, 80);
}

/* ── HERO VIDEO AUTOPLAY ── */
const heroVideo = qs('#hero-video');
if (heroVideo) {
  heroVideo.muted = true;
  heroVideo.play().catch(() => {
    window.addEventListener('touchstart', () => {
      heroVideo.muted = true;
      heroVideo.play().catch(() => {});
    }, { once: true });

    window.addEventListener('scroll', () => {
      heroVideo.muted = true;
      heroVideo.play().catch(() => {});
    }, { once: true });
  });
}

/* ── THEME ── */
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

/* ── MAGNETIC BUTTONS ── */
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
          btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
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

/* ── BUILD CARDS ── */
function buildCard(proj, i) {
  const c = document.createElement('div');
  c.className = 'work-card skeleton reveal delay-' + (i % 3);
  c.tabIndex = 0;

  const img = document.createElement('img');
  img.className = 'wc-img skeleton-media';
  img.alt = proj.title + ' — ' + proj.category;
  img.loading = 'lazy';

  img.onload = () => {
    c.classList.remove('skeleton');
    img.classList.add('loaded');
  };
  img.src = proj.thumbUrl;

  const overlay = document.createElement('div');
  overlay.className = 'wc-overlay';

  const content = document.createElement('div');
  content.className = 'wc-content';

  const cat = document.createElement('div');
  cat.className = 'wc-cat';
  cat.appendChild(safeText(proj.category));

  const t = document.createElement('div');
  t.className = 'wc-title';
  t.appendChild(safeText(proj.title));

  const details = document.createElement('div');
  details.className = 'wc-details';

  const clientSpan = document.createElement('span');
  clientSpan.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M230.9,212a120.7,120.7,0,0,0-67.1-54.2,72,72,0,1,0-71.6,0A120.7,120.7,0,0,0,25.1,212a8,8,0,0,0,13.8,8,104.1,104.1,0,0,1,178.2,0,8,8,0,1,0,13.8-8ZM72,96a56,56,0,1,1,56,56A56,56,0,0,1,72,96Z"></path></svg>`;
  clientSpan.appendChild(safeText(' ' + proj.client));

  const toolSpan = document.createElement('span');
  toolSpan.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M226.8,69.2a8,8,0,0,0-6.3-3.2H199.4l-16.2-28a8.1,8.1,0,0,0-6.9-4H79.7a8.1,8.1,0,0,0-6.9,4L56.6,66H37.5a8,8,0,0,0-6.9,12l96.5,166.7a8,8,0,0,0,13.8,0L237.4,78A8,8,0,0,0,226.8,69.2Z"></path></svg>`;
  toolSpan.appendChild(safeText(' ' + proj.tools));

  details.appendChild(clientSpan);
  details.appendChild(toolSpan);

  content.appendChild(cat);
  content.appendChild(t);
  content.appendChild(details);
  overlay.appendChild(content);

  const play = document.createElement('div');
  play.className = 'wc-play';
  play.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256"><path d="M232.4,114.5l-136-88A15.9,15.9,0,0,0,72,40V216a15.9,15.9,0,0,0,24.4,13.5l136-88A15.9,15.9,0,0,0,232.4,114.5ZM88,202.5V53.5l115.1,74.5Z"></path></svg>`;

  c.appendChild(img);
  c.appendChild(overlay);
  c.appendChild(play);

  const fullIdx = PROJECTS.findIndex(p => p.id === proj.id);

  if (proj.youtubeId) {
    // YouTube: open directly in new tab (embedding disabled on these videos)
    const ytUrl = `https://youtube.com/shorts/${proj.youtubeId}`;
    c.addEventListener('click', () => window.open(ytUrl, '_blank', 'noopener,noreferrer'));
    c.addEventListener('keydown', e => { if (e.key === 'Enter') window.open(ytUrl, '_blank', 'noopener,noreferrer'); });
    // Add a small YouTube badge to the card
    const ytBadge = document.createElement('div');
    ytBadge.className = 'wc-yt-badge';
    ytBadge.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="#fff"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> Watch on YouTube`;
    c.appendChild(ytBadge);
  } else {
    c.addEventListener('click', () => openLb(fullIdx));
    c.addEventListener('keydown', e => { if (e.key === 'Enter') openLb(fullIdx); });
  }

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

/* ── LIGHTBOX ── */
const lb = qs('#lightbox');
const lbVid = qs('#lb-video');
const lbIframe = qs('#lb-iframe');
const lbVidWrap = qs('#lb-video-container');

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

  if (p.youtubeId) {
    // YouTube mode
    if (lbVid) { lbVid.pause(); lbVid.src = ''; lbVid.style.display = 'none'; }
    if (lbIframe) {
      lbIframe.style.display = 'block';
      lbIframe.src = `https://www.youtube.com/embed/${p.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
    }
    lbVidWrap?.classList.remove('skeleton');
  } else {
    // Native video mode
    if (lbIframe) { lbIframe.src = ''; lbIframe.style.display = 'none'; }
    if (lbVid) {
      lbVid.style.display = 'block';
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
  }

  lb?.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLb() {
  lb?.classList.remove('active');
  document.body.style.overflow = '';
  if (lbVid) { lbVid.pause(); lbVid.src = ''; lbVid.style.display = 'block'; }
  if (lbIframe) { lbIframe.src = ''; lbIframe.style.display = 'none'; }
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

/* ── SPA NAV ── */
function navTo(view) {
  if (!VALID_VIEWS.has(view)) return;

  if (view === currentView) {
    closeMenu();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

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

/* ── MOBILE MENU ── */
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

/* ── SCROLL / REVEAL ── */
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

/* ── FILTERS ── */
qs('#filter-track')?.addEventListener('click', e => {
  const p = e.target.closest('.filter-btn');
  if (!p) return;
  qsa('.filter-btn').forEach(el => el.classList.remove('active'));
  p.classList.add('active');
  activeFilter = p.dataset.filter;
  renderWorkGrid(activeFilter);
});

/* ── INIT ── */
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
