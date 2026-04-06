// ─── Nav active state ─────────────────────────────────
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ─── Mobile hamburger ─────────────────────────────────
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.classList.remove('open');
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      toggle.classList.remove('open');
    }
  });
}

// ─── Lightbox ─────────────────────────────────────────
const lightbox     = document.getElementById('lightbox');
const lightboxIframe = document.getElementById('lightbox-iframe');
const lightboxClose  = document.querySelector('.lightbox-close');

function openLightbox(src) {
  if (!lightbox || !lightboxIframe) return;
  lightboxIframe.src = src;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightbox || !lightboxIframe) return;
  lightbox.classList.remove('active');
  lightboxIframe.src = '';
  document.body.style.overflow = '';
}

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

if (lightbox) {
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

// ─── Video card click handlers ────────────────────────
document.querySelectorAll('[data-video]').forEach(el => {
  el.addEventListener('click', () => {
    openLightbox(el.dataset.video);
  });
});

// ─── Thumbnail click-to-load ──────────────────────────
document.querySelectorAll('.video-ratio[data-src]').forEach(ratio => {
  ratio.addEventListener('click', () => {
    const src = ratio.dataset.src;
    ratio.innerHTML = `<iframe src="${src}" allowfullscreen allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" style="position:absolute;inset:0;width:100%;height:100%;border:none;"></iframe>`;
    ratio.removeAttribute('data-src');
    ratio.style.cursor = 'default';
  });
});

// ─── Fade-in on scroll ───────────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.card, .ig-card, .project-item, .client-group, .video-block').forEach(el => {
  observer.observe(el);
});
