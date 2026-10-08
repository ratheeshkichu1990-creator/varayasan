/**
 * Minimal router (Home / Gallery / About only need path + query).
 * Kept in-house to avoid an extra dependency; API mirrors react-router's basics.
 *
 * Uses clean History-API URLs by default. Set `window.__HASH_ROUTER__ = true`
 * before the app loads to use #/path URLs instead (for static hosts that cannot
 * rewrite every path to index.html, e.g. the shareable preview).
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const RouterContext = createContext(null);
const HASH = typeof window !== "undefined" && window.__HASH_ROUTER__ === true;

export function normalisePath(path) {
  if (!path) return "/";
  const trimmed = path.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

/** The app-level path + query currently shown. */
function currentAppUrl() {
  if (HASH) return window.location.hash.replace(/^#/, "") || "/";
  return window.location.pathname + window.location.search;
}

function parse(appUrl) {
  const url = new URL(appUrl, "http://app.local");
  return { pathname: normalisePath(url.pathname), search: url.search };
}

/** href attribute for an app path. */
export const hrefFor = (to) => (HASH ? `#${to}` : to);

export function Router({ children }) {
  const [location, setLocation] = useState(() => parse(currentAppUrl()));

  useEffect(() => {
    const sync = () => setLocation(parse(currentAppUrl()));
    window.addEventListener("popstate", sync);
    if (HASH) window.addEventListener("hashchange", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, []);

  const navigate = useCallback((to, { replace = false, scroll = true } = {}) => {
    const next = parse(to);
    const nextUrl = next.pathname + next.search;
    if (nextUrl !== currentAppUrl()) {
      const browserUrl = HASH ? `${window.location.pathname}${window.location.search}#${nextUrl}` : nextUrl;
      window.history[replace ? "replaceState" : "pushState"]({}, "", browserUrl);
      setLocation(next);
    }
    if (scroll) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const value = useMemo(() => ({ location, navigate }), [location, navigate]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useLocation() {
  return useContext(RouterContext).location;
}

export function useNavigate() {
  return useContext(RouterContext).navigate;
}

export function useSearchParams() {
  const { location, navigate } = useContext(RouterContext);
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const setParams = useCallback(
    (next) => {
      const qs = new URLSearchParams(next).toString();
      navigate(`${location.pathname}${qs ? `?${qs}` : ""}`, { replace: true, scroll: false });
    },
    [location.pathname, navigate],
  );
  return [params, setParams];
}

const isModifiedClick = (e) => e.metaKey || e.altKey || e.ctrlKey || e.shiftKey || e.button !== 0;

export function Link({ to, onClick, target, ...rest }) {
  const navigate = useNavigate();
  const handleClick = (e) => {
    onClick?.(e);
    if (e.defaultPrevented || isModifiedClick(e) || (target && target !== "_self")) return;
    e.preventDefault();
    navigate(to);
  };
  return <a href={hrefFor(to)} onClick={handleClick} target={target} {...rest} />;
}

export function NavLink({ to, className = "", activeClassName = "is-active", ...rest }) {
  const { pathname } = useLocation();
  const isActive = parse(to).pathname === pathname;
  return (
    <Link
      to={to}
      className={`${className} ${isActive ? activeClassName : ""}`.trim()}
      aria-current={isActive ? "page" : undefined}
      {...rest}
    />
  );
}
