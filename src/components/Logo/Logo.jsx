import { LOGO_PATH, LOGO_VIEWBOX } from "./logoPath";

/** VARAYASAN maze monogram. Inherits `color`, so it works on light and dark. */
export default function Logo({ className = "", title = "VARAYASAN" }) {
  return (
    <svg className={className} viewBox={LOGO_VIEWBOX} role="img" aria-label={title} focusable="false">
      <path fill="currentColor" fillRule="evenodd" d={LOGO_PATH} />
    </svg>
  );
}
