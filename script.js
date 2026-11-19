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
