"use client";

import { useRef, useState } from "react";
import type { Capability, HomeContent } from "@/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE, OFFER_CARD } from "@/lib/animations";
import styles from "./ProductCapabilities.module.css";

const HOVER_QUERY = "(min-width: 992px) and (hover: hover) and (prefers-reduced-motion: no-preference)";

/** "Offer Hover - Simpler" in/out keyframes for an item's fixed description card. */
function animateCard(overlay: HTMLElement | null, show: boolean) {
  if (!overlay || !window.matchMedia(HOVER_QUERY).matches) return;
  gsap.killTweensOf(overlay);
  if (show) {
    gsap.set(overlay, { display: "flex" });
    gsap.fromTo(
      overlay,
      { yPercent: 11, scale: 0.5, rotate: -8, opacity: 0 },
      { yPercent: 0, scale: 1, rotate: 0, duration: 0.5, ease: EASE.outCubic },
    );
    gsap.to(overlay, { opacity: 1, duration: 0.3, ease: EASE.webflow });
  } else {
    gsap.to(overlay, { yPercent: -11, scale: 0.5, rotate: -8, duration: 0.5, ease: EASE.webflow });
    gsap.to(overlay, {
      opacity: 0,
      duration: 0.3,
      ease: EASE.webflow,
      onComplete: () => {
        gsap.set(overlay, { display: "none", yPercent: 11 });
      },
    });
  }
}

function CapabilityPill({ item }: { item: Capability }) {
  return (
    <div className={styles.button}>
      <div>{item.title}</div>
      <span className="sr-only-focusable">{item.description}</span>
    </div>
  );
}

type Props = { content: Pick<HomeContent, "capabilities"> };

export function ProductCapabilities({ content }: Props) {
  const { capabilities } = content;
  const rootRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(HOVER_QUERY, () => {
        const cards = gsap.utils.toArray<HTMLElement>(`.${styles.card}`);
        // "Offer P Div Movement": cards track the pointer horizontally across ±22vw.
        const xTo = gsap.quickTo(cards, "x", { duration: OFFER_CARD.mouseLag, ease: EASE.outQuart });
        const onMove = (event: PointerEvent) => {
          xTo(((event.clientX / window.innerWidth) * 2 - 1) * (OFFER_CARD.mouseRangeVw / 100) * window.innerWidth);
        };
        window.addEventListener("pointermove", onMove);
        // "Offer Section Scroll": cards travel 45svh → -45svh while the list crosses the viewport.
        gsap.fromTo(
          cards,
          { y: () => (window.innerHeight * OFFER_CARD.scrollRangeSvh) / 100 },
          {
            y: () => (-window.innerHeight * OFFER_CARD.scrollRangeSvh) / 100,
            ease: "none",
            scrollTrigger: {
              trigger: `.${styles.wrap}`,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
        return () => window.removeEventListener("pointermove", onMove);
      });
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      id={capabilities.id}
      className={`section blueprint ${styles.section}`}
      aria-label={capabilities.eyebrow}
    >
      <div className="section-padding">
        <div className="page-container">
          <Eyebrow>{capabilities.eyebrow}</Eyebrow>
          <div className={styles.wrap}>
            <div className={styles.list} role="list">
              {capabilities.items.map((item, index) => (
                <div
                  key={item.title}
                  role="listitem"
                  className={styles.item}
                  data-dimmed={hovered !== null && hovered !== index}
                  onMouseEnter={(event) => {
                    if (window.matchMedia(HOVER_QUERY).matches) setHovered(index);
                    animateCard(event.currentTarget.querySelector(`.${styles.fixed}`), true);
                  }}
                  onMouseLeave={(event) => {
                    setHovered(null);
                    animateCard(event.currentTarget.querySelector(`.${styles.fixed}`), false);
                  }}
                >
                  <CapabilityPill item={item} />
                  <div className={styles.fixed} aria-hidden="true">
                    <div className={styles.card}>
                      <p>{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
