import { Link } from "../../lib/router";
import useDocumentTitle from "../../lib/useDocumentTitle";
import "./NotFound.css";

export default function NotFound() {
  useDocumentTitle("Page not found");
  return (
    <section className="not-found">
      <h1>Page not found</h1>
      <p>The page you are looking for doesn’t exist.</p>
      <Link to="/" className="not-found__link">
        Back to home
      </Link>
    </section>
  );
}
