import { useMemo, useState } from "react";
import Masonry from "../../components/Masonry/Masonry";
import GalleryCard from "../../components/GalleryCard/GalleryCard";
import Lightbox from "../../components/Lightbox/Lightbox";
import { GridIcon, ListIcon } from "../../components/Icons/Icons";
import { useSearchParams } from "../../lib/router";
import { ARTWORKS, CATEGORIES, categoryLabel } from "../../data/artworks";
import useDocumentTitle from "../../lib/useDocumentTitle";
import useMediaQuery from "../../lib/useMediaQuery";
import "./Gallery.css";

export default function Gallery() {
  useDocumentTitle("Gallery");
  const [params, setParams] = useSearchParams();
  const requested = params.get("category");
  const category = CATEGORIES.some((c) => c.id === requested) ? requested : "all";
  const [view, setView] = useState("grid");
  const [active, setActive] = useState(null);
  const isMobile = useMediaQuery("(max-width: 767px)");

  const visible = useMemo(
    () => (category === "all" ? ARTWORKS : ARTWORKS.filter((a) => a.category === category)),
    [category],
  );

  const lightboxItems = useMemo(
    () => visible.map((a) => ({ ...a, subtitle: categoryLabel(a.category) })),
    [visible],
  );

  const select = (id) => {
    setActive(null);
    setParams(id === "all" ? {} : { category: id });
  };

  return (
    <section className="gallery">
      <h1 className="sr-only">Gallery</h1>

      <div className="chips" role="group" aria-label="Filter artworks by category">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`chip ${c.id === category ? "is-active" : ""}`}
            aria-pressed={c.id === category}
            onClick={() => select(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="gallery__body">
        <div className="gallery__bar">
          <p className="gallery__count" aria-live="polite">
            {visible.length} {visible.length === 1 ? "artwork" : "artworks"}
          </p>
          <div className="view-toggle" role="group" aria-label="Layout">
            <button type="button" aria-pressed={view === "grid"} aria-label="Grid view" onClick={() => setView("grid")}>
              <GridIcon />
            </button>
            <button type="button" aria-pressed={view === "list"} aria-label="List view" onClick={() => setView("list")}>
              <ListIcon />
            </button>
          </div>
        </div>

        <div className="gallery__grid" key={`${category}-${view}`}>
          {visible.length ? (
            <Masonry
              items={visible}
              columns={isMobile && view === "list" ? 1 : undefined}
              renderItem={(artwork, i) => (
                <GalleryCard
                  artwork={artwork}
                  categoryLabel={categoryLabel(artwork.category)}
                  eager={i < 3}
                  onOpen={() => setActive(i)}
                />
              )}
            />
          ) : (
            <p className="gallery__empty">New pieces in this category are coming soon.</p>
          )}
        </div>
      </div>

      <Lightbox items={lightboxItems} index={active} onClose={() => setActive(null)} onIndexChange={setActive} />
    </section>
  );
}
