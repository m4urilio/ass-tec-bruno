// ============================================================
// BRUNO ASSISTÊNCIA TÉCNICA — MAIN JS
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---------- HAMBURGER ----------
  const hamburger = document.getElementById('hamburger');
  const navMobile  = document.getElementById('nav-mobile');

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMobile.classList.toggle('open');
  });

  navMobile?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMobile.classList.remove('open');
    });
  });

  // ---------- HEADER SCROLL ----------
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // ---------- ACTIVE NAV ----------
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav .nav__link');

  const setActiveNav = () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
    });
  };

  window.addEventListener('scroll', setActiveNav, { passive: true });

  // ---------- SCROLL REVEAL ----------
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  // Auto-add reveal to key elements
  const autoReveal = [
    { sel: '.service-card',     delay: true },
    { sel: '.step-card',        delay: true },
    { sel: '.trust-card',       delay: true },
    { sel: '.advantage-item',   delay: true },
    { sel: '.hero__card',       delay: true },
    { sel: '.section__head',    delay: false },
    { sel: '.trust-content',    delay: false },
    { sel: '.advantages-content', delay: false },
  ];

  autoReveal.forEach(({ sel, delay }) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      if (!el.hasAttribute('data-reveal')) {
        el.setAttribute('data-reveal', '');
        if (delay) el.setAttribute('data-reveal-delay', String((i % 4) + 1));
      }
    });
  });

  document.querySelectorAll('[data-reveal]').forEach(el => revealObs.observe(el));

  // ---------- GALLERY CAROUSEL ----------
  const carousel = document.getElementById('gallery-carousel');
  if (carousel) {
    const track  = carousel.querySelector('.carousel__track');
    const slides = [...carousel.querySelectorAll('.carousel__slide')];
    const dots   = [...carousel.querySelectorAll('.carousel__dot')];
    const total  = slides.length;
    let current  = 0;
    let timer;

    const goTo = (idx) => {
      dots[current].classList.remove('active');
      current = ((idx % total) + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots[current].classList.add('active');
    };

    const startAuto = () => { timer = setInterval(() => goTo(current + 1), 3000); };
    const stopAuto  = () => clearInterval(timer);

    carousel.querySelector('.carousel__btn--prev').addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
    carousel.querySelector('.carousel__btn--next').addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });
    dots.forEach((dot, i) => dot.addEventListener('click', () => { stopAuto(); goTo(i); startAuto(); }));

    carousel.addEventListener('mouseenter', stopAuto);
    carousel.addEventListener('mouseleave', startAuto);

    goTo(0);
    startAuto();
  }

  // ---------- SMOOTH SCROLL ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = header.offsetHeight + 8;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    });
  });

});
