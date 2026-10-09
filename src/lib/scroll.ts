import type Lenis from "lenis";

let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

/** Pause/resume page scrolling (menus, video popup). Falls back to overflow when Lenis is off. */
export function lockScroll(locked: boolean) {
  if (instance) {
    if (locked) instance.stop();
    else instance.start();
  } else {
    document.documentElement.style.overflow = locked ? "hidden" : "";
  }
}

export function scrollToElement(target: HTMLElement | string) {
  const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  if (!el) return;
  if (instance) instance.scrollTo(el);
  else el.scrollIntoView({ behavior: "smooth" });
}
