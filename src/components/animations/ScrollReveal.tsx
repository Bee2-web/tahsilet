"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE, LOGO_REVEAL } from "@/lib/animations";

type Props = { className?: string; children: ReactNode; role?: string };

/**
 * Staggered rise-in for grid children — the reference's IX3 `[fade-in="true"]` interaction:
 * opacity 0→1, y 4rem→0, stagger .1s, back.out(1.7), played once when the list reaches 96% of the viewport.
 */
export function StaggerReveal({ className, children, role }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = ref.current?.children;
      if (!items?.length) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          items,
          { opacity: 0, y: LOGO_REVEAL.y },
          {
            opacity: 1,
            y: 0,
            duration: LOGO_REVEAL.duration,
            ease: EASE.backOut,
            stagger: LOGO_REVEAL.stagger,
            scrollTrigger: { trigger: ref.current, start: LOGO_REVEAL.start, once: true },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className} role={role}>
      {children}
    </div>
  );
}
