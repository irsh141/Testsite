document.addEventListener('DOMContentLoaded', function () {
  var header = document.querySelector('header.site');
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');

  // sticky header shadow
  window.addEventListener('scroll', function () {
    header.classList.toggle('scrolled', window.scrollY > 10);
  });

  // mobile menu
  burger.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  document.querySelectorAll('.has-dd > a').forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (window.innerWidth <= 860) {
        e.preventDefault();
        a.parentElement.classList.toggle('open');
      }
    });
  });

  // reveal on scroll
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  // counters
  var cio = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var el = en.target, end = parseFloat(el.dataset.count), dec = el.dataset.dec ? 1 : 0, n = 0;
      var step = end / 60;
      var t = setInterval(function () {
        n += step;
        if (n >= end) { n = end; clearInterval(t); }
        el.textContent = n.toFixed(dec) + (el.dataset.suffix || '');
      }, 22);
      cio.unobserve(el);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('[data-count]').forEach(function (el) { cio.observe(el); });

  // contact form -> opens WhatsApp with the filled details
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var msg = 'Hi GMB Expert! My name is ' + d.get('name') +
        '. Business: ' + d.get('business') +
        '. Interested in: ' + d.get('service') +
        '. Email: ' + d.get('email') + ', Phone: ' + d.get('phone') +
        '. Message: ' + d.get('message');
      var out = document.getElementById('formMsg');
      out.textContent = 'Thanks ' + d.get('name') + '! Opening WhatsApp so we can reply faster…';
      window.open('https://wa.me/' + form.dataset.wa + '?text=' + encodeURIComponent(msg), '_blank');
      form.reset();
    });
  }

  // blog category filter
  var chips = document.querySelectorAll('[data-filter]');
  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      chips.forEach(function (x) { x.classList.remove('btn-dark'); x.classList.add('btn-line'); });
      c.classList.add('btn-dark'); c.classList.remove('btn-line');
      document.querySelectorAll('[data-cat]').forEach(function (card) {
        card.style.display = (c.dataset.filter === 'all' || card.dataset.cat === c.dataset.filter) ? '' : 'none';
      });
    });
  });
});
