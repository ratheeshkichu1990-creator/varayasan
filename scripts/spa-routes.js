import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

/** Client-side routes that must load directly (e.g. https://varayasan.com/gallery). */
export const ROUTES = ["gallery", "about"];

/**
 * Copies the built index.html so GitHub Pages can serve every route:
 *   dist/gallery.html, dist/about.html → /gallery, /about load with HTTP 200
 *   dist/404.html                      → any other URL still boots the app,
 *                                        which shows its own "Page not found" view
 */
export function writeSpaFallbacks(outDir, routes = ROUTES) {
  const index = resolve(outDir, "index.html");
  if (!existsSync(index)) throw new Error(`spa-routes: ${index} not found`);
  const written = [];
  for (const name of [...routes.map((r) => `${r}.html`), "404.html"]) {
    copyFileSync(index, resolve(outDir, name));
    written.push(name);
  }
  return written;
}

/** Vite plugin wrapper (runs after the production build only). */
export default function spaRoutes(routes = ROUTES) {
  let outDir = "dist";
  return {
    name: "varayasan-spa-routes",
    apply: "build",
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const files = writeSpaFallbacks(outDir, routes);
      this.info?.(`SPA fallbacks written: ${files.join(", ")}`);
    },
  };
}
