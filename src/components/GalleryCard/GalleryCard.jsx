import "./GalleryCard.css";

export default function GalleryCard({ artwork, categoryLabel, onOpen, eager = false }) {
  return (
    <button
      type="button"
      className="gcard"
      style={{ aspectRatio: `${artwork.width} / ${artwork.height}` }}
      onClick={onOpen}
      aria-label={`${artwork.title} (${categoryLabel}): view larger`}
    >
      <img
        src={artwork.src}
        alt={artwork.alt}
        width={artwork.width}
        height={artwork.height}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
      />
      <span className="gcard__caption" aria-hidden="true">
        <span className="gcard__title">{artwork.title}</span>
        <span className="gcard__category">{categoryLabel}</span>
      </span>
    </button>
  );
}
