/**
 * Orange accent dots, positioned relative to the artwork box
 * (x / y = fraction of the artwork's width / height, s = diameter as a fraction
 * of the artwork's width). The first ten are the exact ellipses from the Figma
 * Home frame; the last four are extra "tiny" dots.
 *
 * depth  – mouse-parallax strength in px (sign = direction)
 * scroll – scroll-parallax speed (px moved per px scrolled)
 * motion – idle loop: "rise" | "sink" | "pulse" | "glow" | "drift"
 * dur    – loop duration (s)
 */
export const DOTS = [
  { x: 0.0127, y: 0.1072, s: 0.0265, depth: 18, scroll: 0.12, motion: "rise", dur: 6.4 },
  { x: 0.0276, y: 0.1353, s: 0.0095, depth: 24, scroll: 0.16, motion: "glow", dur: 4.6 },
  { x: -0.0106, y: 0.172, s: 0.0159, depth: -14, scroll: 0.08, motion: "sink", dur: 7.2 },
  { x: 0.9422, y: 0.227, s: 0.0276, depth: 20, scroll: 0.1, motion: "pulse", dur: 5.8 },
  { x: 0.9512, y: 0.2449, s: 0.0095, depth: 25, scroll: 0.15, motion: "drift", dur: 4.8 },
  { x: 0.9968, y: 0.8492, s: 0.0095, depth: -16, scroll: 0.06, motion: "glow", dur: 6.8 },
  { x: 0.2778, y: 0.9094, s: 0.0159, depth: 12, scroll: 0.05, motion: "rise", dur: 7.6 },
  { x: 0.0487, y: 0.918, s: 0.0265, depth: 22, scroll: 0.09, motion: "sink", dur: 5.4 },
  { x: 0.8377, y: 0.9246, s: 0.0265, depth: -18, scroll: 0.07, motion: "pulse", dur: 6.9 },
  { x: 1.0832, y: 0.9339, s: 0.0276, depth: 15, scroll: 0.11, motion: "drift", dur: 7.9 },
  { x: 0.95, y: 0.36, s: 0.0068, depth: 25, scroll: 0.14, motion: "glow", dur: 5.1 },
  { x: 0.9, y: 0.52, s: 0.0074, depth: -20, scroll: 0.1, motion: "rise", dur: 6.2 },
  { x: 0.05, y: 0.66, s: 0.0068, depth: 16, scroll: 0.13, motion: "drift", dur: 7.4 },
  { x: 0.15, y: 0.83, s: 0.0074, depth: -12, scroll: 0.08, motion: "glow", dur: 4.4 },
];
