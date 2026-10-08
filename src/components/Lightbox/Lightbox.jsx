import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ChevronIcon, CloseIcon } from "../Icons/Icons";
import "./Lightbox.css";

/**
 * Fullscreen viewer. items: [{ src, alt, title, subtitle, width, height }].
 * Keyboard: ←/→ to browse, Esc to close. Focus is trapped and restored on close.
 */
export default function Lightbox({ items, index, onClose, onIndexChange }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const open = index !== null && index >= 0 && index < items.length;
  const count = items.length;

  const go = useCallback(
    (step) => onIndexChange((index + step + count) % count),
    [index, count, onIndexChange],
  );

  // Latest handlers in a ref so the open/close effect below runs only once per opening.
  const handlers = useRef({});
  handlers.current = { go, onClose, count };

  useEffect(() => {
    if (!open) return undefined;
    const previouslyFocused = document.activeElement;
    document.body.classList.add("is-locked");
    closeRef.current?.focus();

    const onKey = (e) => {
      const { go: step, onClose: close, count: n } = handlers.current;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight" && n > 1) step(1);
      else if (e.key === "ArrowLeft" && n > 1) step(-1);
      else if (e.key === "Tab") {
        const focusables = dialogRef.current?.querySelectorAll("button");
        if (!focusables?.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("is-locked");
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, [open]);

  // Preload neighbours so browsing feels instant.
  useEffect(() => {
    if (!open || count < 2) return;
    [items[(index + 1) % count], items[(index - 1 + count) % count]].forEach((it) => {
      const img = new Image();
      img.src = it.src;
    });
  }, [open, index, items, count]);

  if (!open) return null;
  const item = items[index];

  return createPortal(
    <div
      ref={dialogRef}
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={item.title || "Image preview"}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button ref={closeRef} type="button" className="lightbox__btn lightbox__close" onClick={onClose} aria-label="Close preview">
        <CloseIcon />
      </button>

      {count > 1 && (
        <button type="button" className="lightbox__btn lightbox__prev" onClick={() => go(-1)} aria-label="Previous image">
          <ChevronIcon direction="left" />
        </button>
      )}

      <figure className="lightbox__figure" key={item.src}>
        <img src={item.src} alt={item.alt} width={item.width} height={item.height} />
        {(item.title || item.subtitle) && (
          <figcaption className="lightbox__caption">
            {item.title && <span className="lightbox__title">{item.title}</span>}
            {item.subtitle && <span className="lightbox__subtitle">{item.subtitle}</span>}
            <span className="lightbox__count" aria-hidden="true">
              {index + 1} / {count}
            </span>
          </figcaption>
        )}
      </figure>

      {count > 1 && (
        <button type="button" className="lightbox__btn lightbox__next" onClick={() => go(1)} aria-label="Next image">
          <ChevronIcon />
        </button>
      )}
    </div>,
    document.body,
  );
}
