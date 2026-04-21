// ============================================
// BIRTHDAY WEBSITE - Ayaa dari Afaa
// JavaScript - Animations & Interactions
// ============================================

// ---- State ----
let currentSlide = 1;
let totalSlides = 4;
let musicPlaying = false;
let confettiAnimId = null;

// ---- Init on DOM Ready ----
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  createPetals();
  setTimeout(() => {
    animateSlide1();
  }, 300);
});

// ============================================
// SLIDE NAVIGATION
// ============================================
function goToSlide(num) {
  const slide = document.getElementById(`slide-${num}`);
  if (!slide) return;

  slide.scrollIntoView({ behavior: 'smooth', block: 'start' });
  currentSlide = num;

  // Trigger slide-specific animations
  if (num === 2) animateSlide2();
  if (num === 3) animateSlide3();
  if (num === 4) {
    setTimeout(() => {
      startConfetti();
    }, 500);
  }
}

// Intersection Observer for scroll-triggered animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      const num = parseInt(id.replace('slide-', ''));
      currentSlide = num;
      if (num === 2) animateSlide2();
      if (num === 3) animateSlide3();
      if (num === 4) setTimeout(() => startConfetti(), 500);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.slide').forEach(s => observer.observe(s));

// ============================================
// SLIDE ANIMATIONS
// ============================================
function animateSlide1() {
  const title = document.querySelectorAll('.main-title');
  const nameTag = document.querySelector('.name-tag');
  const subTitle = document.querySelector('.sub-title');
  const btn = document.querySelector('#btn-slide1');

  title.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    setTimeout(() => {
      el.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 400 + i * 200);
  });

  [nameTag, subTitle, btn].forEach((el, i) => {
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    setTimeout(() => {
      el.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 900 + i * 200);
  });
}

function animateSlide2() {
  const letter = document.querySelector('.letter-container');
  if (!letter) return;

  letter.style.opacity = '0';
  letter.style.transform = 'translateY(40px) scale(0.95)';
  setTimeout(() => {
    letter.style.transition = 'all 0.9s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    letter.style.opacity = '1';
    letter.style.transform = 'translateY(0) scale(1)';
  }, 100);

  // Typewriter for greeting
  const greeting = document.querySelector('.letter-greeting');
  if (greeting) {
    const text = greeting.textContent;
    greeting.textContent = '';
    let i = 0;
    setTimeout(() => {
      const interval = setInterval(() => {
        greeting.textContent += text[i];
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 50);
    }, 500);
  }
}

function animateSlide3() {
  const cards = document.querySelectorAll('.wish-card');
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px) scale(0.8)';
    setTimeout(() => {
      card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0) scale(1)';
    }, 100 + i * 150);
  });
}

// ============================================
// PARTICLES
// ============================================
function createParticles() {
  const container = document.getElementById('particles');
  const colors = [
    'rgba(233,30,140,0.6)',
    'rgba(181,123,238,0.6)',
    'rgba(247,201,72,0.5)',
    'rgba(255,133,179,0.5)',
    'rgba(124,58,237,0.5)',
  ];

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const size = Math.random() * 6 + 3;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const duration = Math.random() * 15 + 8;
    const delay = Math.random() * 15;

    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      left: ${left}%;
      animation-duration: ${duration}s;
      animation-delay: -${delay}s;
      box-shadow: 0 0 ${size * 2}px ${color};
    `;

    container.appendChild(particle);
  }
}

// ============================================
// PETALS
// ============================================
function createPetals() {
  const container = document.getElementById('petals');
  const petals = ['🌸', '🌺', '✿', '❀', '🌹', '💮'];

  for (let i = 0; i < 18; i++) {
    const petal = document.createElement('div');
    petal.classList.add('petal');
    petal.textContent = petals[Math.floor(Math.random() * petals.length)];

    const left = Math.random() * 100;
    const duration = Math.random() * 10 + 7;
    const delay = Math.random() * 10;
    const size = Math.random() * 0.8 + 0.7;

    petal.style.cssText = `
      left: ${left}%;
      animation-duration: ${duration}s;
      animation-delay: -${delay}s;
      font-size: ${size}rem;
    `;

    container.appendChild(petal);
  }
}

// ============================================
// CONFETTI
// ============================================
function startConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = [];
  const colors = ['#ff85b3', '#b57bee', '#f7c948', '#ff1493', '#7c3aed', '#fff', '#ff69b4'];
  const shapes = ['circle', 'rect', 'triangle'];

  // Create confetti pieces
  for (let i = 0; i < 130; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 10 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      speed: Math.random() * 4 + 1.5,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.15,
      drift: (Math.random() - 0.5) * 2,
      opacity: 1,
      decay: Math.random() * 0.003 + 0.001,
    });
  }

  let frame = 0;

  function drawPiece(p) {
    ctx.save();
    ctx.globalAlpha = p.opacity;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.fillStyle = p.color;

    if (p.shape === 'circle') {
      ctx.beginPath();
      ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (p.shape === 'rect') {
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    } else {
      ctx.beginPath();
      ctx.moveTo(0, -p.size / 2);
      ctx.lineTo(p.size / 2, p.size / 2);
      ctx.lineTo(-p.size / 2, p.size / 2);
      ctx.closePath();
      ctx.fill();
    }

    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frame++;

    pieces.forEach(p => {
      p.y += p.speed;
      p.x += p.drift;
      p.rotation += p.rotationSpeed;
      if (frame > 120) p.opacity -= p.decay;

      // Wrap around
      if (p.y > canvas.height + 20) p.y = -20;
      if (p.x > canvas.width + 20) p.x = -20;
      if (p.x < -20) p.x = canvas.width + 20;

      drawPiece(p);
    });

    // Stop when all faded (after ~500 frames)
    if (frame > 600) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    confettiAnimId = requestAnimationFrame(animate);
  }

  if (confettiAnimId) cancelAnimationFrame(confettiAnimId);
  animate();
}

// ============================================
// MUSIC
// ============================================
function toggleMusic() {
  const audio = document.getElementById('bg-music');
  const btn = document.getElementById('music-btn');

  if (!audio) return;

  if (musicPlaying) {
    audio.pause();
    musicPlaying = false;
    btn.classList.add('paused');
    btn.title = 'Putar musik';
  } else {
    audio.volume = 0.35;
    audio.play().catch(() => {
      console.log('Autoplay blocked. User interaction required.');
    });
    musicPlaying = true;
    btn.classList.remove('paused');
    btn.title = 'Pause musik';
  }
}

// ============================================
// KEYBOARD NAVIGATION
// ============================================
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown' && currentSlide < totalSlides) {
    goToSlide(currentSlide + 1);
  }
  if (e.key === 'ArrowUp' && currentSlide > 1) {
    goToSlide(currentSlide - 1);
  }
});

// ============================================
// TOUCH NAVIGATION
// ============================================
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchend', (e) => {
  const diff = touchStartY - e.changedTouches[0].clientY;
  if (Math.abs(diff) > 50) {
    if (diff > 0 && currentSlide < totalSlides) {
      goToSlide(currentSlide + 1);
    } else if (diff < 0 && currentSlide > 1) {
      goToSlide(currentSlide - 1);
    }
  }
}, { passive: true });

// ============================================
// RESIZE HANDLER
// ============================================
window.addEventListener('resize', () => {
  const canvas = document.getElementById('confetti-canvas');
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});
