import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "../../lib/router";
import { NAV_EXTRAS, NAV_LINKS, SOCIAL_LINKS } from "../../data/site";
import Logo from "../Logo/Logo";
import { CloseIcon, MenuIcon, SOCIAL_ICONS } from "../Icons/Icons";
import "./Navbar.css";

function NavList({ onNavigate }) {
  const { shop, contact } = NAV_EXTRAS;
  return (
    <ul className="nav-list">
      {NAV_LINKS.map((link, i) => (
        <li key={link.to} style={{ "--i": i }}>
          <NavLink to={link.to} className="nav-list__link" onClick={onNavigate}>
            {link.label}
          </NavLink>
        </li>
      ))}
      <li style={{ "--i": 3 }}>
        <span className="nav-list__link nav-list__link--muted" aria-disabled="true">
          {shop.label} <small>{shop.note}</small>
        </span>
      </li>
      <li style={{ "--i": 4 }}>
        <a className="nav-list__link" href={contact.href}>
          {contact.label}
        </a>
      </li>
    </ul>
  );
}

function SocialList() {
  return (
    <ul className="social-list">
      {SOCIAL_LINKS.map(({ id, label, href }) => {
        const Icon = SOCIAL_ICONS[id];
        const external = href.startsWith("http");
        return (
          <li key={id}>
            <a
              href={href}
              aria-label={id === "mail" ? "Email VARAYASAN" : `VARAYASAN on ${label}`}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <Icon />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Figma: fixed white sidebar (310px @1792) on desktop; 56px top bar with a
 * slide-in menu below 1024px.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return undefined;
    document.body.classList.add("is-locked");
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.classList.remove("is-locked");
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="sidebar">
        <div className="sidebar__top">
          <Link to="/" className="sidebar__logo" aria-label="VARAYASAN — home">
            <Logo />
          </Link>
          <nav aria-label="Primary">
            <NavList />
          </nav>
        </div>
        <SocialList />
      </aside>

      {/* Tablet / mobile top bar */}
      <header className={`topbar ${open ? "is-open" : ""}`}>
        <Link to="/" className="topbar__logo" aria-label="VARAYASAN — home">
          <Logo />
        </Link>
        <button
          type="button"
          className="topbar__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </header>

      <div id="mobile-menu" className={`mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open} inert={!open}>
        <nav aria-label="Primary">
          <NavList onNavigate={() => setOpen(false)} />
        </nav>
        <SocialList />
      </div>
    </>
  );
}
