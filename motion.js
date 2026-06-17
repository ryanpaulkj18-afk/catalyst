/* ============================================================
   CATALYST WORKFLOWS — Motion & interaction layer
   Shared across all pages. Progressive: degrades gracefully.
   ============================================================ */
(function () {
  'use strict';
  window.__motionReady = true;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Mobile nav toggle ---------- */
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* ---------- Scroll progress bar ---------- */
  var bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);

  /* ---------- Hero spotlight + parallax ---------- */
  var hero = document.querySelector('.hero');
  var grid = document.querySelector('.hero__grid-bg');
  if (hero) {
    var spot = document.createElement('div');
    spot.className = 'hero__spot';
    hero.insertBefore(spot, hero.firstChild);
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      hero.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      hero.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var st = window.pageYOffset || document.documentElement.scrollTop || 0;
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? Math.min(st / h * 100, 100) : 0) + '%';
      if (grid && !reduce) grid.style.transform = 'translateY(' + (st * 0.12) + 'px)';
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Hero reveal on load (guaranteed-visible end state) ---------- */
  var heroEls = [].slice.call(document.querySelectorAll('.hero__content > *'));
  if (heroEls.length) {
    if (reduce) {
      heroEls.forEach(function (el) { el.classList.add('is-in'); });
    } else {
      heroEls.forEach(function (el, i) { el.style.transitionDelay = (90 + i * 100) + 'ms'; });
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          heroEls.forEach(function (el) { el.classList.add('is-in'); });
        });
      });
    }
  }

  /* ---------- Scroll reveal ---------- */
  var sel = '.section .eyebrow, .section .section-title, .section .section-intro, ' +
    '.card, .feature, .pillar, .tl-step, .case-card, .big-case, .check, ' +
    '.stat, .roi, .split__statement, .footer__cta, .marquee';
  var els = [].slice.call(document.querySelectorAll(sel));

  if (reduce || !('IntersectionObserver' in window)) {
    els.forEach(function (e) { e.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        var i = 0;
        if (el.parentNode) {
          var sibs = [].slice.call(el.parentNode.children).filter(function (c) {
            return els.indexOf(c) > -1;
          });
          i = Math.max(0, sibs.indexOf(el));
        }
        el.style.transitionDelay = (Math.min(i, 6) * 75) + 'ms';
        el.classList.add('is-in');
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- Count-up numbers ---------- */
  function runCount(el) {
    var to = parseInt(el.getAttribute('data-to'), 10) || 0;
    var dur = 1200, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(to * eased);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var counters = [].slice.call(document.querySelectorAll('.count'));
  if (counters.length) {
    if (reduce || !('IntersectionObserver' in window)) {
      counters.forEach(function (c) { c.textContent = c.getAttribute('data-to'); });
    } else {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { runCount(en.target); cio.unobserve(en.target); }
        });
      }, { threshold: 0.6 });
      counters.forEach(function (c) { cio.observe(c); });
    }
  }
})();
