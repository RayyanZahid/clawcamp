// ClawCamp — presentation runtime
// Keyboard nav, reveal on slide-in, progress bar, counter.

(function () {
  const deck = document.querySelector('.deck');
  const slides = Array.from(document.querySelectorAll('.slide'));
  const progressFill = document.querySelector('.progress-fill');
  const counterCurrent = document.querySelector('[data-counter="current"]');
  const counterTotal = document.querySelector('[data-counter="total"]');

  if (!deck || slides.length === 0) return;

  if (counterTotal) counterTotal.textContent = String(slides.length).padStart(2, '0');

  let currentIndex = 0;

  function setIndex(idx) {
    idx = Math.max(0, Math.min(slides.length - 1, idx));
    currentIndex = idx;
    const slide = slides[idx];
    slide.scrollIntoView({ behavior: 'smooth', block: 'start' });
    updateChrome(idx);
  }

  function updateChrome(idx) {
    if (counterCurrent) counterCurrent.textContent = String(idx + 1).padStart(2, '0');
    if (progressFill) {
      const ratio = slides.length <= 1 ? 1 : idx / (slides.length - 1);
      progressFill.style.transform = `scaleX(${ratio})`;
    }
  }

  // IntersectionObserver: mark visible slide, trigger reveals
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio >= 0.5) {
        const idx = slides.indexOf(entry.target);
        if (idx !== -1) {
          currentIndex = idx;
          updateChrome(idx);
          entry.target.classList.add('--visible');
        }
      }
    });
  }, {
    root: deck,
    threshold: [0.5, 0.75],
  });

  slides.forEach((s) => io.observe(s));

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    // Don't hijack typing
    if (e.target.matches('input, textarea')) return;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
      case ' ':
      case 'PageDown':
      case 'n':
      case 'N':
        e.preventDefault();
        setIndex(currentIndex + 1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
      case 'PageUp':
      case 'p':
      case 'P':
        e.preventDefault();
        setIndex(currentIndex - 1);
        break;
      case 'Home':
        e.preventDefault();
        setIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setIndex(slides.length - 1);
        break;
      case 'f':
      case 'F':
        if (!e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          toggleFullscreen();
        }
        break;
      default:
        if (/^[1-9]$/.test(e.key)) {
          const idx = parseInt(e.key, 10) - 1;
          if (idx < slides.length) {
            e.preventDefault();
            setIndex(idx);
          }
        }
    }
  });

  // Click to advance on left/right halves
  document.addEventListener('click', (e) => {
    if (e.target.closest('a, button, .code-block, .kbd')) return;
    const x = e.clientX;
    const mid = window.innerWidth / 2;
    if (x > mid) setIndex(currentIndex + 1);
    else setIndex(currentIndex - 1);
  });

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }

  // Wheel nudge — big scroll events advance one slide
  let wheelLock = false;
  deck.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaY) < 40) return;
    if (wheelLock) return;
    wheelLock = true;
    setTimeout(() => { wheelLock = false; }, 700);
  }, { passive: true });

  // Touch swipe
  let touchStartY = 0;
  deck.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  deck.addEventListener('touchend', (e) => {
    const delta = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(delta) < 60) return;
    setIndex(currentIndex + (delta < 0 ? 1 : -1));
  }, { passive: true });

  // Initial chrome update
  updateChrome(0);
})();
