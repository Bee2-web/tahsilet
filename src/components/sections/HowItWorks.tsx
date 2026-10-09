"use client";

import { useRef } from "react";
import type { HomeContent } from "@/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { gsap, useGSAP } from "@/lib/gsap";
import styles from "./HowItWorks.module.css";

type Props = { content: Pick<HomeContent, "howItWorks"> };

const channelTone = (channel: string) => {
  const c = channel.toLowerCase();
  if (c.includes("+")) return "mixed";
  if (c.includes("whatsapp")) return "whatsapp";
  if (c.includes("sesli") || c.includes("voice")) return "voice";
  return "email";
};

/** Numbered steps on blueprint hairlines + a dark "sample flow" panel that walks through each reminder. */
export function HowItWorks({ content }: Props) {
  const { howItWorks } = content;
  const rootRef = useRef<HTMLElement>(null);

  // The flow panel "runs": each step lights up in turn while the progress rail fills, then loops.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const rows = gsap.utils.toArray<HTMLElement>(`.${styles.flowRow}`);
        const rail = rootRef.current?.querySelector(`.${styles.railFill}`);
        if (!rail || !rows.length) return;
        const tl = gsap.timeline({
          repeat: -1,
          repeatDelay: 1.2,
          paused: true,
          scrollTrigger: {
            trigger: `.${styles.panel}`,
            start: "top 85%",
            end: "bottom top",
            onToggle: (self) => (self.isActive ? tl.play() : tl.pause()),
          },
        });
        tl.set(rows, { attr: { "data-state": "idle" } }).set(rail, { scaleY: 0 });
        rows.forEach((row, index) => {
          tl.set(row, { attr: { "data-state": "active" } }, index * 1.1)
            .to(rail, { scaleY: (index + 1) / rows.length, duration: 0.6, ease: "power2.out" }, index * 1.1)
            .set(row, { attr: { "data-state": "done" } }, index * 1.1 + 1);
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} id={howItWorks.id} className={`section blueprint ${styles.section}`} aria-labelledby="how-title">
      <div className="section-padding">
        <div className={`page-container ${styles.container}`}>
          <div className={styles.header}>
            <div>
              <Eyebrow>{howItWorks.eyebrow}</Eyebrow>
              <h2 id="how-title" className="section-title">
                {howItWorks.title}
              </h2>
            </div>
            <p className="section-lede">{howItWorks.body}</p>
          </div>

          <div className={styles.grid}>
            <ol className={styles.steps}>
              {howItWorks.steps.map((step, index) => (
                <li key={step.title} className={styles.step}>
                  <span className={styles.stepIndex}>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepBody}>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className={styles.panel}>
              <div className={styles.panelHeader}>
                <span className={styles.panelTitle}>
                  <span className={styles.liveDot} aria-hidden="true" />
                  {howItWorks.flow.title}
                </span>
                <span className={styles.badge}>{howItWorks.flow.badge}</span>
              </div>
              <div className={styles.flowWrap}>
                <span className={styles.rail} aria-hidden="true">
                  <span className={styles.railFill} />
                </span>
                <ol className={styles.flow}>
                {howItWorks.flow.steps.map((step, index) => (
                  <li key={step.when} className={styles.flowRow} data-state="done">
                    <span className={styles.flowIndex}>{index + 1}</span>
                    <span className={styles.flowWhen}>{step.when}</span>
                    <span className={styles.channel} data-tone={channelTone(step.channel)}>
                      {step.channel}
                    </span>
                  </li>
                ))}
                </ol>
              </div>
              <p className={styles.caption}>{howItWorks.flow.caption}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
