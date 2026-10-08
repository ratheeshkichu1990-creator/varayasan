import { useCallback, useEffect, useRef, useState } from "react";
import artwork from "../../assets/images/home/profile-art.webp";
import collageBg from "../../assets/images/home/home-collage-bg.webp";
import maskHair from "../../assets/images/home/mask-hair.png";
import maskCircle from "../../assets/images/home/mask-circle.png";
import useArtworkMotion from "./useArtworkMotion";
import { DOTS } from "./dots";
import "./ProfileArtwork.css";

const ALT =
  "Pen-and-ink self portrait of Varayasan: his profile emerges from flowing hair that pours into a dreamscape of corals, an eye, a vinyl record, a book, a camera and a shell holding the earth";

/** The "slow wind" hair layer only runs where it is cheap and wanted. */
function useWind() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    );
    const update = () => setOn(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return on;
}

/**
 * Drives the wind filter. The hair layer is re-filtered on the CPU, so it is
 * updated ~15×/s (motion is slow, steps are sub-pixel) while the float itself
 * stays on the compositor at full frame rate. Pauses when off-screen.
 */
function useWindLoop(on, stageRef, turbRef, dispRef, onTooSlow) {
  useEffect(() => {
    if (!on) return undefined;
    let raf = 0;
    let last = 0;
    let visible = true;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    if (stageRef.current) io.observe(stageRef.current);
    const start = performance.now();
    // Safety net: if the device can't hold a smooth frame rate with the filter
    // running, drop the wind effect (the float and dots keep going).
    const samples = [];
    let prev = start;
    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      if (samples.length < 150 && visible && !document.hidden) {
        samples.push(now - prev);
        if (samples.length === 150) {
          const mean = samples.reduce((a, b) => a + b, 0) / samples.length;
          if (mean > 20) onTooSlow();
        }
      }
      prev = now;
      if (!visible || document.hidden || now - last < 66) return;
      last = now;
      const t = (now - start) / 1000;
      const wave = (period) => Math.sin((t / period) * Math.PI * 2);
      const fx = 0.0035 + 0.00035 * (1 + wave(16));
      const fy = 0.011 + 0.0009 * (1 + wave(13));
      turbRef.current?.setAttribute("baseFrequency", `${fx.toFixed(5)} ${fy.toFixed(5)}`);
      dispRef.current?.setAttribute("scale", (6 + 3 * wave(9)).toFixed(2));
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [on, stageRef, turbRef, dispRef, onTooSlow]);
}

/**
 * Animated Home hero: the original artwork (untouched pixels) floats over the
 * Figma doodle collage, with a breathing black circle, wind in the outer hair
 * and floating orange dots. Mouse + scroll parallax on desktop only.
 */
export default function ProfileArtwork() {
  const stageRef = useRef(null);
  const turbRef = useRef(null);
  const dispRef = useRef(null);
  const [tooSlow, setTooSlow] = useState(false);
  const disableWind = useCallback(() => setTooSlow(true), []);
  const wind = useWind() && !tooSlow;
  useArtworkMotion(stageRef);
  useWindLoop(wind, stageRef, turbRef, dispRef, disableWind);

  const style = {
    "--mask-hair": `url(${maskHair})`,
    "--mask-circle": `url(${maskCircle})`,
  };

  return (
    <div ref={stageRef} className={`pa ${wind ? "pa--wind" : ""}`} style={style}>
      <img className="pa__bg" src={collageBg} width="1482" height="2362" alt="" aria-hidden="true" decoding="async" />

      <div className="pa__field">
        {/* Artwork: parallax → entrance → float */}
        <div className="pa__art-par">
          <div className="pa__art-enter">
            <div className="pa__art-float">
              <img
                className="pa__img pa__img--core"
                src={artwork}
                width="943"
                height="2262"
                alt={ALT}
                fetchPriority="high"
                decoding="async"
              />
              {wind && (
                <div className="pa__hair" aria-hidden="true">
                  <img className="pa__img pa__img--hair" src={artwork} width="943" height="2262" alt="" />
                </div>
              )}
              <div className="pa__circle" aria-hidden="true">
                <span className="pa__glow" />
              </div>
            </div>
          </div>
        </div>

        {/* Orange accent dots: parallax → staggered entrance → idle loop */}
        <div className="pa__dots" aria-hidden="true">
          {DOTS.map((d, i) => (
            <span
              key={i}
              className="pa__dot-par"
              style={{
                "--x": d.x,
                "--xm": Math.min(0.97, Math.max(0.03, d.x)),
                "--y": d.y,
                "--s": d.s,
                "--depth": d.depth,
                "--scroll": d.scroll,
              }}
            >
              <span className="pa__dot-in" style={{ "--delay": `${0.1 + i * 0.12}s` }}>
                <span
                  className={`pa__dot pa__dot--${d.motion}`}
                  style={{ "--dur": `${d.dur}s`, "--phase": `${-(i * 0.73) % d.dur}s` }}
                />
              </span>
            </span>
          ))}
        </div>
      </div>

      {wind && (
        <svg className="pa__defs" width="0" height="0" aria-hidden="true" focusable="false">
          <filter id="pa-wind" x="-4%" y="-2%" width="108%" height="104%" colorInterpolationFilters="sRGB">
            <feTurbulence ref={turbRef} type="fractalNoise" baseFrequency="0.0035 0.011" numOctaves="1" seed="7" result="noise" />
            <feDisplacementMap ref={dispRef} in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
      )}
    </div>
  );
}
