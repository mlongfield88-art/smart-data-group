import Lenis from 'lenis';

let lenis: Lenis | null = null;
let rafId: number | null = null;

export function initSmoothScroll() {
  if (lenis) {
    lenis.destroy();
  }
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
  }

  lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time: number) {
    lenis?.raf(time);
    rafId = requestAnimationFrame(raf);
  }

  rafId = requestAnimationFrame(raf);
}

export function getLenis() {
  return lenis;
}
