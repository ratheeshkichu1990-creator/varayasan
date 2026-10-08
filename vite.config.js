import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import spaRoutes from "./scripts/spa-routes.js";

// Production: GitHub Pages with the custom domain varayasan.com (served from the
// domain root), so every asset URL is absolute from "/".
export default defineConfig({
  base: "/",
  plugins: [react(), spaRoutes()],
  // Dev/preview server: serve index.html for /gallery and /about on refresh.
  appType: "spa",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
  },
});
