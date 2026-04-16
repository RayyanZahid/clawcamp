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

  // IntersectionObserver: mark visible slide, trigger reveals + ember convergence
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio >= 0.5) {
        const idx = slides.indexOf(entry.target);
        if (idx !== -1) {
          currentIndex = idx;
          updateChrome(idx);
          entry.target.classList.add('--visible');
          // If this slide has an ember stage, schedule convergence
          const stage = entry.target.querySelector('.ember-stage');
          if (stage && !stage.dataset.converged) {
            stage.dataset.converged = 'pending';
            setTimeout(() => {
              stage.classList.add('--converged');
              stage.dataset.converged = 'true';
            }, 1900);
          }
        }
      }
    });
  }, {
    root: deck,
    threshold: [0.5, 0.75],
  });

  // Generate ember particles for any .ember-stage[data-ember-count] on page
  document.querySelectorAll('.ember-stage').forEach((stage) => {
    if (stage.dataset.emberInit) return;
    const count = parseInt(stage.dataset.emberCount || '36', 10);
    const spread = parseFloat(stage.dataset.emberSpread || '90');
    const margin = (100 - spread) / 2;

    // Parse target (single point, or list of "x%,y%" separated by space)
    const targets = (stage.dataset.emberTargets || '50%,50%').split(/\s+/).filter(Boolean);

    for (let i = 0; i < count; i++) {
      const e = document.createElement('div');
      e.className = 'ember';
      const sx = margin + Math.random() * spread;
      const sy = margin + Math.random() * spread;
      const dx = (Math.random() - 0.5) * 18;
      const dy = (Math.random() - 0.5) * 18;
      e.style.setProperty('--sx', sx + '%');
      e.style.setProperty('--sy', sy + '%');
      e.style.setProperty('--dx', dx.toFixed(1) + 'px');
      e.style.setProperty('--dy', dy.toFixed(1) + 'px');
      e.style.setProperty('--delay', Math.floor(Math.random() * 700) + 'ms');

      // Pick a target from the list (round-robin)
      const target = targets[i % targets.length];
      const [tx, ty] = target.split(',');
      e.style.setProperty('--tx', tx.trim());
      e.style.setProperty('--ty', (ty || '50%').trim());
      e.style.setProperty('--cdelay', Math.floor(i * 18) + 'ms');
      stage.appendChild(e);
    }
    stage.dataset.emberInit = 'true';
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

  // Click to advance — but only a clean click, never a text-selection drag.
  // Track mousedown position; ignore if the cursor moved (drag) or if
  // anything is selected by the time we release.
  let mouseDownX = 0;
  let mouseDownY = 0;
  let mouseDownAt = 0;

  document.addEventListener('mousedown', (e) => {
    mouseDownX = e.clientX;
    mouseDownY = e.clientY;
    mouseDownAt = Date.now();
  });

  document.addEventListener('click', (e) => {
    // Skip interactive + selectable content surfaces.
    if (e.target.closest('a, button, .code-block, .kbd, input, textarea, h1, h2, h3, h4, p, blockquote, li, code, pre, .quote, .move__desc, .callout__body, .loop__meta, .slide__body')) return;

    // Skip if the user is dragging (text selection).
    const dx = Math.abs(e.clientX - mouseDownX);
    const dy = Math.abs(e.clientY - mouseDownY);
    if (dx > 6 || dy > 6) return;

    // Skip if there's an active selection (double-click words, triple-click paragraphs).
    const sel = window.getSelection && window.getSelection();
    if (sel && sel.toString().length > 0) return;

    // Skip modifier-key clicks (copy menus, etc.).
    if (e.shiftKey || e.metaKey || e.ctrlKey || e.altKey) return;

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
