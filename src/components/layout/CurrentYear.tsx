"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** Current year, resolved in the browser like the reference's `[data-current-year]` script. */
export function CurrentYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => null,
  );
  return <span suppressHydrationWarning>{year ?? ""}</span>;
}
