import { useEffect } from "react";
import { site } from "../config/site";

const BRAND = `${site.name}${site.nameAccent}`;

/** Встановлює <title> вкладки. Без аргументу — дефолтний заголовок бренду. */
export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — ${BRAND}` : `${BRAND} — ${site.tagline}`;
  }, [title]);
}
