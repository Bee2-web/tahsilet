"use client";

import { useRef } from "react";
import type { HomeContent } from "@/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE, STAT_REVEAL } from "@/lib/animations";
import styles from "./Metrics.module.css";

type Props = { content: Pick<HomeContent, "metrics"> };

export function Metrics({ content }: Props) {
  const { metrics } = content;
  const rootRef = useRef<HTMLElement>(null);

  // "Stat Item IN": each card's number rises 24rem while un-rotating 18°, then its label fades up.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(`.${styles.stat}`).forEach((card) => {
          const number = card.querySelector(`.${styles.number}`);
          const label = card.querySelector(`.${styles.caption}`);
          gsap.set(number, { y: STAT_REVEAL.numberY, rotate: STAT_REVEAL.numberRotate });
          gsap.set(label, { y: STAT_REVEAL.labelY, opacity: 0 });
          gsap
            .timeline({ scrollTrigger: { trigger: card, start: STAT_REVEAL.start, once: true } })
            .to(number, { y: 0, rotate: 0, duration: STAT_REVEAL.numberDuration, ease: EASE.outQuart }, 0)
            .to(label, { y: 0, opacity: 1, duration: STAT_REVEAL.labelDuration, ease: EASE.outCubic }, STAT_REVEAL.labelDelay);
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className={`section ${styles.section}`} aria-label={metrics.eyebrow}>
      <div className={`section-padding ${styles.top}`}>
        <div className="page-container">
          <Eyebrow tone="white">{metrics.eyebrow}</Eyebrow>
          <div className={styles.stats}>
            {metrics.stats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <div className={styles.number}>{stat.value}</div>
                <div className={styles.caption}>
                  <div className={styles.label}>{stat.label}</div>
                  {stat.source && <div className={styles.source}>{stat.source}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={`section-padding ${styles.bottom}`}>
        <div className="page-container">
          <div className={styles.callout}>
            <div>{metrics.callout}</div>
          </div>
        </div>
        <div className={styles.halfBlue} />
      </div>
    </section>
  );
}
