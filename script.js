/* --------- Init AOS (scroll animations) --------- */
if (typeof AOS !== 'undefined') {
  AOS.init({ duration: 800, once: true, offset: 80, easing: 'ease-in-out' });
}

/* --------- Typed.js name effect --------- */
if (typeof Typed !== 'undefined') {
  new Typed('#typed-name', {
    strings: ['Nayira Abdelwahab'],
    typeSpeed: 65,
    backSpeed: 20,
    showCursor: true,
    cursorChar: '|',
    startDelay: 200,
    loop: false
  });
}

/* --------- Sticky navbar shadow + back-to-top --------- */
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) navbar.style.boxShadow = '0 8px 30px rgba(12,18,40,0.06)';
  else navbar.style.boxShadow = 'none';

  if (window.scrollY > 400) backToTop.style.display = 'block';
  else backToTop.style.display = 'none';
});

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* --------- Mobile nav toggle --------- */
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
navToggle.addEventListener('click', () => {
  if (getComputedStyle(navLinks).display === 'flex') {
    navLinks.style.display = 'none';
  } else {
    navLinks.style.display = 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.padding = '10px';
  }
});

/* --------- Smooth internal link scrolling (for older browsers) --------- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // close mobile nav if open
      if (window.innerWidth < 720 && getComputedStyle(navLinks).display === 'flex') {
        navLinks.style.display = 'none';
      }
    }
  });
});

/* --------- Contact form (client-side simulation) --------- */
const form = document.getElementById('contact-form');
const feedback = document.getElementById('form-feedback');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const name = (fd.get('name') || '').trim();
    const email = (fd.get('email') || '').trim();
    const msg = (fd.get('message') || '').trim();

    if (!name || !email || !msg) {
      showFeedback('Please fill all fields.', 'error');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showFeedback('Please enter a valid email address.', 'error');
      return;
    }

    showFeedback('Sending...', 'info');
    setTimeout(() => {
      showFeedback('Thank you! Your message has been sent.', 'success');
      form.reset();
    }, 900);
  });
}

function showFeedback(text, type) {
  if (!feedback) return;
  feedback.textContent = text;
  feedback.style.color = type === 'error' ? '#D14343' : (type === 'success' ? '#0b8454' : '#6b7280');
}

/* --------- Set current year in footer --------- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* --------- Small nicety: subtle watermark shrink on scroll --------- */
const watermark = document.querySelector('.name-watermark');
window.addEventListener('scroll', () => {
  if (!watermark) return;
  const s = window.scrollY;
  if (s > 120) {
    watermark.style.opacity = '0.04';
    watermark.style.transform = 'rotate(-8deg) scale(.9)';
  } else {
    watermark.style.opacity = '0.08';
    watermark.style.transform = 'rotate(-10deg) scale(1)';
  }
});
