import { useEffect } from "react";
import { SITE_NAME } from "../data/site";

export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — ${SITE_NAME}` : SITE_NAME;
  }, [title]);
}
