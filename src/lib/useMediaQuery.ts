"use client";

import { useSyncExternalStore } from "react";

/** Subscribes to a CSS media query. Returns `serverFallback` during SSR/hydration. */
export function useMediaQuery(query: string, serverFallback = false) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverFallback,
  );
}

export const DESKTOP_QUERY = "(min-width: 992px)";
