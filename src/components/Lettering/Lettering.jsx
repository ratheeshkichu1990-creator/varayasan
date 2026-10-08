import hiIAm from "../../assets/images/lettering/hi-i-am.svg";
import varayasan from "../../assets/images/lettering/varayasan.svg";
import "./Lettering.css";

/**
 * "Hi, I am / VARAYASAN" set in Hogfish (a licensed display face) in Figma.
 * Traced to SVG so it renders identically everywhere; the real text is kept for
 * screen readers and search engines.
 */
export default function Lettering({ as: Tag = "h1", className = "" }) {
  return (
    <Tag className={`lettering ${className}`.trim()}>
      <span className="sr-only">Hi, I am Varayasan</span>
      <img className="lettering__hi" src={hiIAm} width="100" height="38" alt="" aria-hidden="true" />
      <img className="lettering__name" src={varayasan} width="653" height="153" alt="" aria-hidden="true" />
    </Tag>
  );
}
