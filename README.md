# VARAYASAN — Portfolio

React + Vite build of the VARAYASAN Figma designs (Home, Gallery, About Us).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview
```

Routes: `/`, `/gallery` (supports `?category=painting|digital|pencil|works`), `/about`.

## Deployment (GitHub Pages + varayasan.com)

- Every push to `main` runs `.github/workflows/deploy.yml`: `npm ci` → `npm run build` → publishes `dist/` to GitHub Pages.
- `vite.config.js` uses `base: "/"` because the site is served from the domain root.
- `public/CNAME` contains `varayasan.com`; `public/.nojekyll` stops Jekyll processing.
- After each build, `scripts/spa-routes.js` copies `index.html` to `gallery.html`, `about.html` and `404.html`,
  so https://varayasan.com/gallery and /about load directly, and unknown URLs show the site's own "Page not found" view.
  Add a new route to `ROUTES` in that file when you add a page.

## Where things live

- `src/styles/variables.css` — colours, fonts, sidebar width (from the Figma file)
- `src/data/site.js` — nav, contact email, social URLs, About copy (**replace the placeholders**)
- `src/data/artworks.js` — gallery artworks and filter categories
- `src/lib/router.jsx` — tiny History-API router (no react-router dependency)
- `src/components/*` — Navbar (desktop sidebar + mobile top bar/menu), Lettering, Masonry,
  GalleryCard, Lightbox, Logo, Icons

## Adding an artwork

1. Put the image in `src/assets/images/gallery/` (WebP, ~1600px on the long edge is ideal).
2. Import it in `src/data/artworks.js` and add an entry with its pixel `width`/`height` and a
   `category` (`painting`, `digital`, `pencil` or `works`).

## Notes

- Fonts: IBM Plex Sans and Arima load from Google Fonts. The "Hi, I am / VARAYASAN" lettering
  uses Hogfish (a commercial display font), so it is traced to SVG in
  `src/assets/images/lettering/` and the real text is kept for screen readers.
- Images were exported from the Figma frames at 1x. Replace them with the original artwork
  files (same filenames) for sharper results on retina screens.
