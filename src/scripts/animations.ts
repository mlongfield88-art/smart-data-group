import gsap from 'gsap';

// Use IntersectionObserver instead of ScrollTrigger to avoid
// Lenis/GSAP ticker sync issues. More reliable across ViewTransitions.

let observer: IntersectionObserver | null = null;

export function initAnimations() {
  // Disconnect previous observer
  if (observer) {
    observer.disconnect();
  }

  // Set initial hidden states immediately (before observer fires)
  document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
    gsap.set(el, { opacity: 0, y: 50 });
  });

  document.querySelectorAll<HTMLElement>('.clip-reveal').forEach((el) => {
    gsap.set(el, { clipPath: 'inset(100% 0% 0% 0%)' });
  });

  document.querySelectorAll<HTMLElement>('.text-mask-reveal').forEach((el) => {
    el.querySelectorAll<HTMLElement>('.line').forEach((line) => {
      gsap.set(line, { yPercent: 110 });
    });
  });

  document.querySelectorAll<HTMLElement>('.stagger-reveal').forEach((el) => {
    Array.from(el.children).forEach((child) => {
      gsap.set(child, { opacity: 0, y: 40 });
    });
  });

  document.querySelectorAll<HTMLElement>('.line-grow').forEach((el) => {
    gsap.set(el, { scaleX: 0, transformOrigin: 'left center' });
  });

  // Create a single IntersectionObserver
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target as HTMLElement;
        observer?.unobserve(el); // once

        if (el.classList.contains('reveal')) {
          gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
        }

        if (el.classList.contains('clip-reveal')) {
          gsap.to(el, {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.2,
            ease: 'power4.inOut',
          });
        }

        if (el.classList.contains('text-mask-reveal')) {
          const lines = el.querySelectorAll('.line');
          gsap.to(lines, {
            yPercent: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: 'power3.out',
          });
        }

        if (el.classList.contains('stagger-reveal')) {
          gsap.to(Array.from(el.children), {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
          });
        }

        if (el.classList.contains('line-grow')) {
          gsap.to(el, { scaleX: 1, duration: 1.2, ease: 'power3.inOut' });
        }

        if (el.classList.contains('counter')) {
          const target = parseInt(el.dataset.target || '0', 10);
          const suffix = el.dataset.suffix || '';
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = Math.round(obj.val) + suffix;
            },
          });
        }
      });
    },
    { threshold: 0.05 }
  );

  // Observe all animated elements
  const selectors = '.reveal, .clip-reveal, .text-mask-reveal, .stagger-reveal, .line-grow, .counter';
  document.querySelectorAll<HTMLElement>(selectors).forEach((el) => {
    observer!.observe(el);
  });

  // --- Parallax (scroll-driven, uses scroll event) ---
  setupParallax();
}

function setupParallax() {
  const els = document.querySelectorAll<HTMLElement>('.parallax');
  if (!els.length) return;

  function onScroll() {
    const scrollY = window.scrollY;
    els.forEach((el) => {
      const speed = parseFloat(el.dataset.speed || '0.15');
      const rect = el.getBoundingClientRect();
      const offset = (rect.top + scrollY - window.innerHeight / 2) * speed;
      el.style.transform = `translateY(${offset}px)`;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
