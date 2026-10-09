"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { setLenis } from "@/lib/scroll";

/** Lenis smooth scrolling with the reference's settings, synced to ScrollTrigger. */
export function SmoothScroll() {
  // Lottie/image loads change the page height after ScrollTrigger measured it; keep positions fresh.
  useEffect(() => {
    let timer: number | undefined;
    let lastHeight = document.body.scrollHeight;
    const observer = new ResizeObserver(() => {
      if (document.body.scrollHeight === lastHeight) return;
      lastHeight = document.body.scrollHeight;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    });
    observer.observe(document.body);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.7, gestureOrientation: "vertical" });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
