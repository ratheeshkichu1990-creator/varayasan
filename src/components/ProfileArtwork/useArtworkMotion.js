import { useEffect } from "react";

const lerp = (a, b, t) => a + (b - a) * t;

/**
 * Mouse + scroll parallax for the profile artwork.
 * Writes three CSS custom properties on the stage element — --mx, --my
 * (pointer offset, -1…1) and --sy (scroll, px) — from a single rAF loop that
 * only runs while values are still settling. All movement is done in CSS with
 * translate3d, so no layout is touched.
 */
export default function useArtworkMotion(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)");
    if (reduced.matches || !desktop.matches) return undefined;

    const target = { x: 0, y: 0, s: 0 };
    const current = { x: 0, y: 0, s: 0 };
    let raf = 0;
    let idle = 0;
    let visible = true;

    const write = () => {
      el.style.setProperty("--mx", current.x.toFixed(4));
      el.style.setProperty("--my", current.y.toFixed(4));
      el.style.setProperty("--sy", current.s.toFixed(1));
    };

    const tick = () => {
      current.x = lerp(current.x, target.x, 0.075);
      current.y = lerp(current.y, target.y, 0.075);
      current.s = lerp(current.s, target.s, 0.14);
      write();
      const settled =
        Math.abs(current.x - target.x) < 0.001 &&
        Math.abs(current.y - target.y) < 0.001 &&
        Math.abs(current.s - target.s) < 0.1;
      raf = settled ? 0 : requestAnimationFrame(tick);
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onPointer = (e) => {
      if (!visible) return;
      // Normalised offset of the cursor from the viewport centre.
      target.x = Math.max(-1, Math.min(1, (e.clientX / window.innerWidth) * 2 - 1));
      target.y = Math.max(-1, Math.min(1, (e.clientY / window.innerHeight) * 2 - 1));
      kick();
      clearTimeout(idle);
      // When the mouse stops, ease everything back to rest.
      idle = setTimeout(() => {
        target.x = 0;
        target.y = 0;
        kick();
      }, 1400);
    };

    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      kick();
    };

    const onScroll = () => {
      if (!visible) return;
      target.s = Math.min(window.scrollY, 1600);
      kick();
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(el);

    window.addEventListener("pointermove", onPointer, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(idle);
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, [ref]);
}
