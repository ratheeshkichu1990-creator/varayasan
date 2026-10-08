import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Gallery from "./pages/Gallery/Gallery";
import About from "./pages/About/About";
import NotFound from "./pages/NotFound/NotFound";
import { useLocation } from "./lib/router";
import "./App.css";

const ROUTES = {
  "/": { Page: Home, tone: "default" },
  "/gallery": { Page: Gallery, tone: "gallery" },
  "/about": { Page: About, tone: "default" },
};

export default function App() {
  const { pathname } = useLocation();
  const { Page, tone } = ROUTES[pathname] ?? { Page: NotFound, tone: "default" };

  return (
    <>
      <a
        href="#main"
        className="skip-link"
        onClick={(e) => {
          e.preventDefault();
          const main = document.getElementById("main");
          main?.focus();
          main?.scrollIntoView();
        }}
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className={`main main--${tone}`} key={pathname}>
        <Page />
      </main>
    </>
  );
}
