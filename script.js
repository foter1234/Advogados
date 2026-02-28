  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.addEventListener('load', () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  });

  const heroVideo = document.querySelector('.hero-video-bg');
  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.defaultMuted = true;
    heroVideo.playsInline = true;

    const tryStartHeroVideo = () => {
      const playPromise = heroVideo.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {});
      }
    };

    if (heroVideo.readyState < 2) {
      heroVideo.load();
    }

    tryStartHeroVideo();
    heroVideo.addEventListener('loadeddata', tryStartHeroVideo, { once: true });

    const kickStartOnInteraction = () => {
      tryStartHeroVideo();
    };

    window.addEventListener('touchstart', kickStartOnInteraction, { passive: true, once: true });
    window.addEventListener('pointerdown', kickStartOnInteraction, { passive: true, once: true });
  }

  // Header scroll behavior
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // Hamburger menu
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });
  // Close mobile menu on link click
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, (entry.target.dataset.delay || 0) * 1);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 3) * 0.1}s`;
    observer.observe(el);
  });

  const ratingToggleBtn = document.getElementById('ratingToggleBtn');
  if (ratingToggleBtn) {
    ratingToggleBtn.addEventListener('click', () => {
      const isActive = ratingToggleBtn.classList.toggle('is-active');
      ratingToggleBtn.setAttribute('aria-pressed', String(isActive));
    });
  }