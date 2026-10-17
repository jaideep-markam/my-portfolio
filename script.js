'use strict';

/* ═══════════════════════════════════════════════════════
   JAIDEEP MARKAM — PREMIUM PORTFOLIO INTERACTION ENGINE
   Awwwards-Caliber Video Editor & Motion Design Portfolio
═══════════════════════════════════════════════════════ */

// Security Control: Framing defense (clickjacking protection) is enforced via HTTP headers
// (Content-Security-Policy: frame-ancestors 'self' and X-Frame-Options: SAMEORIGIN).

/* ── DATA: CURATED CLIENT PROJECTS ── */
const PROJECTS = [
  { 
    id: 'p1', 
    title: 'Ryan Herric — Before & After Cut', 
    category: 'Talking Head', 
    client: 'Ryan Herric / Creator', 
    description: 'High-impact dialogue edit featuring hook-first pacing, dynamic animated captions, punch-in framing, and DaVinci Studio color grading.', 
    tools: 'DaVinci Resolve Studio', 
    videoUrl: 'https://res.cloudinary.com/dlupqyzif/video/upload/v1792056551/1._Ryan_Herric_B_A_m0iv9b.mov', 
    thumbUrl: 'https://res.cloudinary.com/dlupqyzif/video/upload/w_600,h_1066,c_fill,so_2,q_auto/v1792056551/1._Ryan_Herric_B_A_m0iv9b.jpg', 
    duration: 'Short Form' 
  },
  { 
    id: 'p2', 
    title: 'Scar — Podcast Dialogue Cut', 
    category: 'Podcast', 
    client: 'Narrative Storytelling Podcast', 
    description: 'Engaging podcast cutdown with atmospheric audio ducking, tight conversational cadence, kinetic subtitle emphasis, and rich filmic contrast.', 
    tools: 'DaVinci Resolve Studio', 
    videoUrl: 'https://res.cloudinary.com/dlupqyzif/video/upload/v1792056607/2._Scar_B_A_idxrkn.mov', 
    thumbUrl: 'https://res.cloudinary.com/dlupqyzif/video/upload/w_600,h_1066,c_fill,so_2,q_auto/v1792056607/2._Scar_B_A_idxrkn.jpg', 
    duration: 'Short Form' 
  },
  { 
    id: 'p3', 
    title: 'Talking Head 01', 
    category: 'Talking Head', 
    client: 'Finance & Growth Creator', 
    description: 'Hook-first pacing, dynamic animated typography, color grading, and retention-focused zoom cuts engineered to maximize 30-second completion rates.', 
    tools: 'DaVinci Resolve Studio', 
    videoUrl: 'https://res.cloudinary.com/dlupqyzif/video/upload/v1781975459/Talking_head_01_zjyryy.mp4', 
    thumbUrl: 'https://res.cloudinary.com/dlupqyzif/video/upload/w_600,h_1066,c_fill,so_2,q_auto/v1781975459/Talking_head_01_zjyryy.jpg', 
    duration: 'Short Form' 
  },
  { 
    id: 'p4', 
    title: 'Real Estate Luxury Showcase', 
    category: 'Real Estate', 
    client: 'Luxury Architectural Group', 
    description: 'High-end architectural property walkthrough showcasing seamless whip transitions, dynamic speed ramping, and warm golden-hour color correction.', 
    tools: 'DaVinci Resolve Studio', 
    videoUrl: 'https://res.cloudinary.com/dlupqyzif/video/upload/v1781975409/Real_estate_01_ynt3up.mp4', 
    thumbUrl: 'https://res.cloudinary.com/dlupqyzif/video/upload/w_600,h_1066,c_fill,so_2,q_auto/v1781975409/Real_estate_01_ynt3up.jpg', 
    duration: 'Short Form' 
  },
  { 
    id: 'p6', 
    title: 'AI Cinematic Story 01', 
    category: 'AI Cinematic', 
    client: 'Generative Film Studio', 
    description: 'Groundbreaking AI-generated sci-fi narrative blending generative visual synthesis with traditional cinematic camera movement and sound design.', 
    tools: 'DaVinci Resolve + Midjourney', 
    youtubeId: 'uudT2F2l-gU', 
    thumbUrl: 'https://img.youtube.com/vi/uudT2F2l-gU/maxresdefault.jpg', 
    duration: 'Short Form',
    hidden: true
  },
  { 
    id: 'p7', 
    title: 'AI Cinematic Story 02', 
    category: 'AI Cinematic', 
    client: 'Sci-Fi Creative Producer', 
    description: 'Dark fantasy visual sequence with customized film grain, chromatic aberration, and atmospheric Foley audio designed for repeat loops.', 
    tools: 'DaVinci Resolve + AI Synthesis', 
    youtubeId: 'T6zQ7lCraSk', 
    thumbUrl: 'https://img.youtube.com/vi/T6zQ7lCraSk/maxresdefault.jpg', 
    duration: 'Short Form',
    hidden: true
  },
  { 
    id: 'p8', 
    title: 'AI Cinematic Story 03', 
    category: 'AI Cinematic', 
    client: 'AI Storytelling Lab', 
    description: 'Emotional narrative arc built with generative character animation, deep cinematic depth-of-field, and orchestral soundtrack alignment.', 
    tools: 'DaVinci Resolve + Runway', 
    youtubeId: 'PPLybYzjh4c', 
    thumbUrl: 'https://img.youtube.com/vi/PPLybYzjh4c/maxresdefault.jpg', 
    duration: 'Short Form',
    hidden: true
  },
  { 
    id: 'p9', 
    title: 'AI Cinematic Story 04', 
    category: 'AI Cinematic', 
    client: 'Digital Worldbuilders', 
    description: 'High-impact futuristic concept reel with aggressive optical transitions, sound synthesis, and rich color contrast.', 
    tools: 'DaVinci Resolve Studio', 
    youtubeId: 'zp8lbroxpIM', 
    thumbUrl: 'https://img.youtube.com/vi/zp8lbroxpIM/maxresdefault.jpg', 
    duration: 'Short Form',
    hidden: true
  }
];

// Active visible projects (All native video files: Talking Head, Podcast, Real Estate — hiding external YouTube links)
const VISIBLE_PROJECTS = PROJECTS.filter(p => !p.hidden);

/* ── DOM UTILITIES ── */
function qs(s, c = document) { return c.querySelector(s); }
function qsa(s, c = document) { return [...c.querySelectorAll(s)]; }
function safeText(str) { return document.createTextNode(str); }

/* ── STATE ── */
let currentLbIdx = 0;
let activeFilter = 'All';

/* ── 1. PRELOADER ── */
function initLoader() {
  const loader = qs('#loader');
  const lProg = qs('#loader-progress');
  if (!loader || !lProg) return;

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 20) + 18;
    if (progress > 100) progress = 100;
    lProg.style.width = `${progress}%`;

    if (progress === 100) {
      clearInterval(interval);
      setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        setTimeout(() => loader.remove(), 400);
      }, 200);
    }
  }, 50);

  // Mobile safety watchdog: ensure page is never stuck if throttled
  setTimeout(() => {
    if (document.contains(loader)) {
      clearInterval(interval);
      loader.style.opacity = '0';
      loader.style.visibility = 'hidden';
      setTimeout(() => loader.remove(), 300);
    }
  }, 1800);
}

/* ── 2. THEME CONTROLLER ── */
function initTheme() {
  const themeToggle = qs('#theme-toggle');
  const htmlEl = document.documentElement;
  let isLight = localStorage.getItem('theme') === 'light';

  function applyTheme(light) {
    isLight = light;
    if (light) {
      htmlEl.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    } else {
      htmlEl.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
    }
  }

  applyTheme(isLight);

  themeToggle?.addEventListener('click', () => {
    applyTheme(!isLight);
  });
}

/* ── 3. HERO VIDEO & TIMECODE HUD ── */
function initHeroVideo() {
  const heroVideo = qs('#hero-video');
  const timecodeEl = qs('#hero-timecode');

  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.play().catch(() => {
      window.addEventListener('touchstart', () => {
        heroVideo.muted = true;
        heroVideo.play().catch(() => {});
      }, { once: true });
    });

    heroVideo.addEventListener('timeupdate', () => {
      if (!timecodeEl) return;
      const t = heroVideo.currentTime || 0;
      const mins = String(Math.floor(t / 60)).padStart(2, '0');
      const secs = String(Math.floor(t % 60)).padStart(2, '0');
      const frames = String(Math.floor((t % 1) * 24)).padStart(2, '0');
      timecodeEl.textContent = `00:${mins}:${secs}:${frames}`;
    });
  }
}

/* ── 4. INTERACTIVE BEFORE / AFTER SLIDER ── */
function initBeforeAfterSlider() {
  const slider = qs('#comparison-slider');
  const afterLayer = qs('#comp-after-layer');
  const handle = qs('#comp-handle');

  if (!slider || !afterLayer || !handle) return;

  let isDragging = false;

  function updatePosition(clientX) {
    const rect = slider.getBoundingClientRect();
    let x = clientX - rect.left;
    let percent = (x / rect.width) * 100;

    // Clamp between 5% and 95%
    if (percent < 5) percent = 5;
    if (percent > 95) percent = 95;

    afterLayer.style.width = `${percent}%`;
    handle.style.left = `${percent}%`;
    handle.setAttribute('aria-valuenow', Math.round(percent));
  }

  // Mouse Events
  slider.addEventListener('mousedown', e => {
    isDragging = true;
    updatePosition(e.clientX);
  });

  window.addEventListener('mousemove', e => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Touch Events for Mobile
  slider.addEventListener('touchstart', e => {
    isDragging = true;
    if (e.touches[0]) updatePosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchmove', e => {
    if (!isDragging) return;
    if (e.touches[0]) updatePosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchcancel', () => {
    isDragging = false;
  });

  // Keyboard accessibility
  handle.addEventListener('keydown', e => {
    const current = parseFloat(handle.style.left) || 50;
    if (e.key === 'ArrowLeft') {
      const next = Math.max(5, current - 5);
      afterLayer.style.width = `${next}%`;
      handle.style.left = `${next}%`;
    } else if (e.key === 'ArrowRight') {
      const next = Math.min(95, current + 5);
      afterLayer.style.width = `${next}%`;
      handle.style.left = `${next}%`;
    }
  });
}

/* ── 5. PORTFOLIO CARDS & RENDERING ── */
function buildCard(proj, index) {
  const card = document.createElement('div');
  card.className = 'work-card skeleton reveal delay-' + (index % 3);
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `Play ${proj.title} edit`);

  // Thumbnail Image
  const img = document.createElement('img');
  img.className = 'wc-img skeleton-media';
  img.alt = `${proj.title} — ${proj.category}`;
  img.loading = 'lazy';
  img.src = proj.thumbUrl;

  img.onload = () => {
    card.classList.remove('skeleton');
    img.classList.add('loaded');
  };

  // Overlay & Content
  const overlay = document.createElement('div');
  overlay.className = 'wc-overlay';

  const cat = document.createElement('div');
  cat.className = 'wc-cat';
  cat.appendChild(safeText(proj.category));

  const title = document.createElement('h3');
  title.className = 'wc-title';
  title.appendChild(safeText(proj.title));

  const details = document.createElement('div');
  details.className = 'wc-details';

  const clientSpan = document.createElement('span');
  clientSpan.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M230.9,212a120.7,120.7,0,0,0-67.1-54.2,72,72,0,1,0-71.6,0A120.7,120.7,0,0,0,25.1,212a8,8,0,0,0,13.8,8,104.1,104.1,0,0,1,178.2,0,8,8,0,1,0,13.8-8ZM72,96a56,56,0,1,1,56,56A56,56,0,0,1,72,96Z"></path></svg>`;
  clientSpan.appendChild(safeText(' ' + proj.client));

  const toolSpan = document.createElement('span');
  toolSpan.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M226.8,69.2a8,8,0,0,0-6.3-3.2H199.4l-16.2-28a8.1,8.1,0,0,0-6.9-4H79.7a8.1,8.1,0,0,0-6.9,4L56.6,66H37.5a8,8,0,0,0-6.9,12l96.5,166.7a8,8,0,0,0,13.8,0L237.4,78A8,8,0,0,0,226.8,69.2ZM128,216.7,48.1,78.5,86.6,50h82.8l38.5,28.5Z"></path></svg>`;
  toolSpan.appendChild(safeText(' ' + proj.tools));

  details.appendChild(clientSpan);
  details.appendChild(toolSpan);

  overlay.appendChild(cat);
  overlay.appendChild(title);
  overlay.appendChild(details);

  // Play Button
  const play = document.createElement('div');
  play.className = 'wc-play';
  play.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256"><path d="M232.4,114.5l-136-88A15.9,15.9,0,0,0,72,40V216a15.9,15.9,0,0,0,24.4,13.5l136-88A15.9,15.9,0,0,0,232.4,114.5ZM88,202.5V53.5l115.1,74.5Z"></path></svg>`;

  card.appendChild(img);
  card.appendChild(overlay);
  card.appendChild(play);

  // YouTube Badge for AI Storytelling
  if (proj.youtubeId) {
    const ytBadge = document.createElement('div');
    ytBadge.className = 'wc-yt-badge';
    ytBadge.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M234.3,74.5A24,24,0,0,0,217.5,57.7C196.9,52,128,52,128,52s-68.9,0-89.5,5.7A24,24,0,0,0,21.7,74.5C16,95.1,16,128,16,128s0,32.9,5.7,53.5a24,24,0,0,0,16.8,16.8C59.1,204,128,204,128,204s68.9,0,89.5-5.7a24,24,0,0,0,16.8-16.8C240,160.9,240,128,240,128S240,95.1,234.3,74.5ZM104,160V96l56,32Z"></path></svg> YouTube Shorts`;
    card.appendChild(ytBadge);
  }

  // Click & Keyboard Actions
  const fullIdx = VISIBLE_PROJECTS.findIndex(p => p.id === proj.id);
  card.addEventListener('click', () => openLb(fullIdx));
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLb(fullIdx);
    }
  });

  return card;
}

function renderPortfolioGrid(filter = 'All') {
  const grid = qs('#portfolio-grid');
  if (!grid) return;

  grid.innerHTML = '';
  const filtered = filter === 'All' ? VISIBLE_PROJECTS : VISIBLE_PROJECTS.filter(p => p.category === filter);

  filtered.forEach((p, i) => {
    grid.appendChild(buildCard(p, i));
  });

  setTimeout(initReveal, 40);
}

function initFilters() {
  const track = qs('#filter-track');
  if (!track) return;

  const allBtn = qs('.filter-btn[data-filter="All"]', track);
  if (allBtn) {
    allBtn.textContent = `All Works (${VISIBLE_PROJECTS.length})`;
  }

  track.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    qsa('.filter-btn', track).forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    activeFilter = btn.dataset.filter || 'All';
    renderPortfolioGrid(activeFilter);
  });
}

/* ── 6. CINEMATIC LIGHTBOX MODAL ── */
const lb = qs('#lightbox');
const lbVid = qs('#lb-video');
const lbIframe = qs('#lb-iframe');
const lbVidWrap = qs('#lb-video-container');

let activeElementBeforeModal = null;

function openLb(idx) {
  if (idx < 0 || idx >= VISIBLE_PROJECTS.length) return;
  
  // Accessibility Control: Save focus location before opening modal dialog
  activeElementBeforeModal = document.activeElement;
  currentLbIdx = idx;
  const p = VISIBLE_PROJECTS[idx];

  const catEl = qs('#lb-cat');
  const titleEl = qs('#lb-title');
  const descEl = qs('#lb-desc');
  const clientEl = qs('#lb-client');
  const toolsEl = qs('#lb-tools');
  const formatEl = qs('#lb-format');
  const countEl = qs('#lb-count');

  if (catEl) catEl.textContent = p.category;
  if (titleEl) titleEl.textContent = p.title;
  if (descEl) descEl.textContent = p.description;
  if (clientEl) clientEl.textContent = p.client;
  if (toolsEl) toolsEl.textContent = p.tools;
  if (formatEl) formatEl.textContent = p.duration;
  if (countEl) countEl.textContent = `${idx + 1} / ${VISIBLE_PROJECTS.length}`;

  if (p.youtubeId) {
    // YouTube Embed
    if (lbVid) { lbVid.pause(); lbVid.src = ''; lbVid.style.display = 'none'; }
    if (lbIframe) {
      lbIframe.style.display = 'block';
      lbIframe.src = `https://www.youtube.com/embed/${p.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
    }
    lbVidWrap?.classList.remove('skeleton');
  } else {
    // Cloudinary Video Player (Universal MP4 & MOV compatibility)
    if (lbIframe) { lbIframe.src = ''; lbIframe.style.display = 'none'; }
    if (lbVid) {
      lbVid.style.display = 'block';
      lbVid.classList.remove('loaded');
      lbVidWrap?.classList.add('skeleton');

      // Android/Chromium mobile support: ensure MP4 stream is used if MOV is unsupported
      const isApple = /iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent);
      let playUrl = p.videoUrl;
      if (!isApple && playUrl.endsWith('.mov')) {
        playUrl = playUrl.replace(/\.mov$/i, '.mp4');
      }

      lbVid.src = playUrl;
      lbVid.poster = p.thumbUrl;
      lbVid.load();

      const onReady = () => {
        lbVid.classList.add('loaded');
        lbVidWrap?.classList.remove('skeleton');
        lbVid.play().catch(() => {});
      };

      lbVid.onloadeddata = onReady;
      lbVid.oncanplay = onReady;

      lbVid.onerror = () => {
        // Fallback: If .mov failed, try universal .mp4
        if (lbVid.src && lbVid.src.endsWith('.mov')) {
          lbVid.src = lbVid.src.replace(/\.mov$/i, '.mp4');
          lbVid.load();
          lbVid.play().catch(() => {});
        } else {
          lbVidWrap?.classList.remove('skeleton');
        }
      };
    }
  }

  lb?.classList.add('active');
  lb?.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Set initial focus to close button
  setTimeout(() => qs('#lb-close')?.focus(), 60);
}

function closeLb() {
  lb?.classList.remove('active');
  lb?.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (lbVid) {
    lbVid.pause();
    lbVid.removeAttribute('src');
    lbVid.load();
    lbVid.style.display = 'block';
  }
  if (lbIframe) { lbIframe.src = ''; lbIframe.style.display = 'none'; }

  // Accessibility Control: Restore focus to triggering element
  if (activeElementBeforeModal && typeof activeElementBeforeModal.focus === 'function') {
    activeElementBeforeModal.focus();
  }
}

window.openLb = openLb;
window.closeLb = closeLb;

qs('#lb-close')?.addEventListener('click', closeLb);
qs('#lb-backdrop')?.addEventListener('click', closeLb);
qs('#lb-prev')?.addEventListener('click', () => openLb((currentLbIdx - 1 + VISIBLE_PROJECTS.length) % VISIBLE_PROJECTS.length));
qs('#lb-next')?.addEventListener('click', () => openLb((currentLbIdx + 1) % VISIBLE_PROJECTS.length));

document.addEventListener('keydown', e => {
  if (!lb?.classList.contains('active')) return;
  if (e.key === 'Escape') closeLb();
  if (e.key === 'ArrowLeft') qs('#lb-prev')?.click();
  if (e.key === 'ArrowRight') qs('#lb-next')?.click();

  // Accessibility Control: Focus trap inside modal dialog
  if (e.key === 'Tab') {
    const focusable = qsa('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])', lb);
    if (focusable.length > 0) {
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }
});

/* ── 7. NAVBAR SCROLLSPY & STICKY STATE ── */
function initScrollSpy() {
  const navbar = qs('#navbar');
  const navLinks = qsa('.nav-link');
  const sections = qsa('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Sticky shadow & blur
    navbar?.classList.toggle('scrolled', scrollY > 50);

    // Active link highlighting
    let currentId = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 180;
      const height = sec.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      link.classList.toggle('active', href === `#${currentId}`);
    });
  }, { passive: true });
}

/* ── 8. MOBILE MENU ── */
function initMobileMenu() {
  const menuBtn = qs('#menu-btn');
  const mobMenu = qs('#mob-menu');
  const mobClose = qs('#mob-close');
  const mobLinks = qsa('.mob-link');

  function openMenu() {
    mobMenu?.classList.add('active');
    mobMenu?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobMenu?.classList.remove('active');
    mobMenu?.setAttribute('aria-hidden', 'true');
    if (!lb?.classList.contains('active')) {
      document.body.style.overflow = '';
    }
  }

  menuBtn?.addEventListener('click', openMenu);
  mobClose?.addEventListener('click', closeMenu);
  mobLinks.forEach(link => link.addEventListener('click', closeMenu));
}

/* ── 9. INTERACTIVE INQUIRY FORM ── */
function initInquiryForm() {
  const form = qs('#project-form');
  const formatPills = qsa('#format-pill-group .form-pill');
  const volumePills = qsa('#volume-pill-group .form-pill');
  const successMsg = qs('#form-success');

  // Pill Toggles
  function setupPills(pills) {
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
      });
    });
  }

  setupPills(formatPills);
  setupPills(volumePills);

  // Form Submit Handler
  form?.addEventListener('submit', e => {
    e.preventDefault();

    // Security Control: Validating and sanitizing inputs to prevent CRLF mail header injection
    const rawName = qs('#form-name')?.value || '';
    const cleanName = rawName.replace(/[\r\n]/g, ' ').trim().slice(0, 80);

    const rawEmail = qs('#form-email')?.value || '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cleanEmail = emailRegex.test(rawEmail.trim()) ? rawEmail.trim().slice(0, 100) : '';

    const rawLink = qs('#form-link')?.value || '';
    const cleanLink = rawLink.replace(/[\r\n]/g, ' ').trim().slice(0, 200) || 'Not provided';

    const activeFormat = qs('#format-pill-group .form-pill.active')?.dataset.val || 'Short-Form';
    const activeVolume = qs('#volume-pill-group .form-pill.active')?.dataset.val || '12-16 videos';

    const rawNotes = qs('#form-notes')?.value || '';
    const cleanNotes = rawNotes.slice(0, 1200);

    if (!cleanEmail) {
      alert('Please enter a valid work email address.');
      return;
    }

    // Security Control: URL encode all components to prevent parameter injection
    const subject = encodeURIComponent(`Custom Offer Request: ${cleanName || 'New Creator'} (${activeFormat})`);
    const body = encodeURIComponent(
      `Hi Jaideep,\n\nI'm requesting a custom offer for video editing services.\n\n` +
      `• Name / Brand: ${cleanName || 'Not provided'}\n` +
      `• Work Email: ${cleanEmail}\n` +
      `• Channel / Social: ${cleanLink}\n` +
      `• Content Format: ${activeFormat}\n` +
      `• Target Monthly Volume: ${activeVolume}\n` +
      `• Project Goals & Scope:\n${cleanNotes}\n\n` +
      `Looking forward to receiving your custom proposal!`
    );

    const mailtoUrl = `mailto:jaideep.markam@gmail.com?subject=${subject}&body=${body}`;

    if (successMsg) {
      // Mobile Support: Provide an explicit clickable fallback in case browser blocks mailto invocation
      successMsg.innerHTML = '✓ Inquiry prepared! Opening your mail app... If it didn\'t open automatically, <a href="' + mailtoUrl + '" style="color:var(--accent-primary);text-decoration:underline;font-weight:600;">click here to launch mail</a>.';
      successMsg.style.display = 'block';
    }

    // Launch immediately inside user gesture to avoid mobile browser popup blockers
    window.location.href = mailtoUrl;
  });
}

/* ── 10. MAGNETIC BUTTON INTERACTIONS ── */
function initMagneticButtons() {
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouch) return;

  qsa('.magnetic').forEach(btn => {
    let ticking = false;
    btn.addEventListener('mousemove', e => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          btn.style.transform = `translate(${x * 0.16}px, ${y * 0.16}px)`;
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

/* ── 11. SCROLL REVEAL OBSERVER ── */
function initReveal() {
  const revealElements = qsa('.reveal:not(.in)');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => observer.observe(el));
}

/* ── 12. SMOOTH SCROLL ENGINE FOR ALL BUTTONS & LINKS ── */
function initSmoothScroll() {
  // Explicitly bind Hero Showreel button
  const showreelBtn = qs('#hero-showreel-btn');
  showreelBtn?.addEventListener('click', () => {
    openLb(0);
  });

  // Handle all internal anchor buttons and links
  qsa('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;

      const target = qs(hash);
      if (target) {
        e.preventDefault();

        // If mobile drawer is open, close it first and restore scroll
        const mobMenu = qs('#mob-menu');
        if (mobMenu?.classList.contains('active')) {
          mobMenu.classList.remove('active');
          mobMenu.setAttribute('aria-hidden', 'true');
          if (!lb?.classList.contains('active')) {
            document.body.style.overflow = '';
          }
        }

        // Calculate offset with fixed floating navbar (90px desktop, 75px mobile)
        const navOffset = window.innerWidth <= 768 ? 75 : 90;
        const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navOffset;

        window.scrollTo({
          top: Math.max(0, targetPos),
          behavior: 'smooth'
        });

        // Update active nav link highlighting
        qsa('.nav-link').forEach(nl => {
          nl.classList.toggle('active', nl.getAttribute('href') === hash);
        });

        if (history.pushState) {
          history.pushState(null, null, hash);
        }
      }
    });
  });
}

/* ── DOM READY INITIALIZATION ── */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initTheme();
  initHeroVideo();
  initBeforeAfterSlider();
  renderPortfolioGrid('All');
  initFilters();
  initScrollSpy();
  initMobileMenu();
  initInquiryForm();
  initMagneticButtons();
  initSmoothScroll();
  setTimeout(initReveal, 200);
});
