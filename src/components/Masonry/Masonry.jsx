import { useLayoutEffect, useMemo, useRef, useState } from "react";
import "./Masonry.css";

/** Columns from the container width (Figma: 3 on desktop, 2 on mobile). */
const columnsFor = (width) => (width >= 880 ? 3 : 2);

/**
 * Column masonry. Items are dealt in reading order into the currently shortest
 * column (by aspect ratio), so heights stay balanced and images keep their
 * natural proportions.
 */
export default function Masonry({ items, renderItem, columns: forced }) {
  const ref = useRef(null);
  const [width, setWidth] = useState(1200);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    setWidth(el.clientWidth);
    const ro = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const count = forced ?? columnsFor(width);

  const cols = useMemo(() => {
    const out = Array.from({ length: count }, () => ({ items: [], h: 0 }));
    items.forEach((item, index) => {
      const target = out.reduce((min, c) => (c.h < min.h - 0.01 ? c : min), out[0]);
      target.items.push({ item, index });
      target.h += item.height / item.width;
    });
    return out;
  }, [items, count]);

  return (
    <div ref={ref} className="masonry" style={{ "--cols": count }}>
      {cols.map((col, c) => (
        <div key={c} className="masonry__col">
          {col.items.map(({ item, index }) => (
            <div key={item.id} className="masonry__item" style={{ "--delay": `${Math.min(index, 8) * 60}ms` }}>
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
