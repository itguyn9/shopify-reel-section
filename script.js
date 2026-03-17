(function() {
  // Hero Counters
  function animateCounter(id, end) {
    let start = 0;
    const duration = 2000;
    const step = 20;
    const increment = end / (duration / step);
    const el = document.getElementById(id);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        el.textContent = end;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(start);
      }
    }, step);
  }
  animateCounter('stores', 120);
  animateCounter('engagement', 45);

  // Before/After Slider
  const slider = document.getElementById('slider');
  const handle = document.querySelector('.slider-handle');
  const afterImg = document.querySelector('.after-img');
  let isDragging = false;

  function setPosition(e) {
    const rect = slider.getBoundingClientRect();
    let clientX = e.touches ? e.touches[0].clientX : e.clientX;
    let pos = ((clientX - rect.left) / rect.width) * 100;
    pos = Math.min(100, Math.max(0, pos));
    handle.style.left = pos + '%';
    afterImg.style.clipPath = `polygon(0 0, ${pos}% 0, ${pos}% 100%, 0 100%)`;
    handle.setAttribute('aria-valuenow', Math.round(pos));
  }

  handle.addEventListener('mousedown', () => isDragging = true);
  handle.addEventListener('touchstart', (e) => { e.preventDefault(); isDragging = true; });
  document.addEventListener('mouseup', () => isDragging = false);
  document.addEventListener('touchend', () => isDragging = false);
  document.addEventListener('mousemove', (e) => isDragging && setPosition(e));
  document.addEventListener('touchmove', (e) => isDragging && setPosition(e));

  // Keyboard
  handle.addEventListener('keydown', (e) => {
    let current = parseFloat(handle.getAttribute('aria-valuenow') || 50);
    if (e.key === 'ArrowLeft') current = Math.max(0, current - 5);
    else if (e.key === 'ArrowRight') current = Math.min(100, current + 5);
    else return;
    e.preventDefault();
    handle.style.left = current + '%';
    afterImg.style.clipPath = `polygon(0 0, ${current}% 0, ${current}% 100%, 0 100%)`;
    handle.setAttribute('aria-valuenow', current);
  });

  // Testimonials Carousel with dots
  const track = document.getElementById('carouselTrack');
  const prev = document.getElementById('prevBtn');
  const next = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('carouselDots');
  const cards = document.querySelectorAll('.testimonial-card');
  let index = 0;
  const total = cards.length;
  let autoSlide = setInterval(() => move(1), 4000);

  // Create dots
  cards.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.addEventListener('click', () => {
      index = i;
      updateCarousel();
      resetAuto();
    });
    dotsContainer.appendChild(dot);
  });
  const dots = document.querySelectorAll('.dot');
  dots[0].classList.add('active');

  function updateCarousel() {
    const cardWidth = cards[0].offsetWidth + 30; // gap 30px
    track.style.transform = `translateX(-${index * cardWidth}px)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  }

  function move(direction) {
    index += direction;
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    updateCarousel();
  }

  prev.addEventListener('click', () => { move(-1); resetAuto(); });
  next.addEventListener('click', () => { move(1); resetAuto(); });

  function resetAuto() {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => move(1), 4000);
  }

  // Handle resize
  window.addEventListener('resize', updateCarousel);

  // FAQ Accordion
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const expanded = q.getAttribute('aria-expanded') === 'true' ? false : true;
      q.setAttribute('aria-expanded', expanded);
      const answer = q.nextElementSibling;
      answer.classList.toggle('show', expanded);
    });
  });

  // Countdown Timer (7 days from now)
  const countdownEl = document.getElementById('countdown');
  const end = new Date();
  end.setDate(end.getDate() + 7);
  const endTime = end.getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const diff = endTime - now;
    if (diff <= 0) {
      countdownEl.textContent = 'Offer ended';
      return;
    }
    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
    const minutes = Math.floor((diff % (1000*60*60)) / (1000*60));
    const seconds = Math.floor((diff % (1000*60)) / 1000);
    countdownEl.textContent = `⏳ Offer ends in ${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Back to top button
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();