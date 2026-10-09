"use client";

import { useEffect, useRef, useState } from "react";
import { differentiation } from "@/content/home";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LottiePlayer } from "@/components/animations/LottiePlayer";
import styles from "./Differentiation.module.css";

/**
 * Sticky media + scrolling steps. Ported from the reference's two "how it works" observers:
 * a step becomes active inside the 60–65% viewport band (others fade to .25) and the matching
 * Lottie pane cross-fades in (.5s); a second, centred band (45–55%) also drives the media pane.
 */
export function Differentiation() {
  const rootRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [activePane, setActivePane] = useState(0);

  useEffect(() => {
    const steps = rootRef.current?.querySelectorAll<HTMLElement>("[data-step]");
    if (!steps?.length) return;
    const indexOf = (el: Element) => Number((el as HTMLElement).dataset.step);

    const stepObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setActiveStep(indexOf(entry.target));
          setActivePane(indexOf(entry.target));
        });
      },
      { rootMargin: "-60% 0px -35% 0px", threshold: 0 },
    );
    const paneObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActivePane(indexOf(entry.target));
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    steps.forEach((step) => {
      stepObserver.observe(step);
      paneObserver.observe(step);
    });
    return () => {
      stepObserver.disconnect();
      paneObserver.disconnect();
    };
  }, []);

  return (
    <section ref={rootRef} className={`section bg-blue-grid ${styles.section}`} aria-labelledby="different-title">
      <div className={styles.padding}>
        <div className={`page-container ${styles.copy}`}>
          <Eyebrow tone="white" strong>
            {differentiation.eyebrow}
          </Eyebrow>
          <div className={styles.titleRow}>
            <h3 id="different-title" className={`h-x-large ${styles.title}`}>
              {differentiation.title[0]}
              <br />
              {differentiation.title[1]}
            </h3>
          </div>

          <div className={styles.split}>
            <div className={styles.media} aria-hidden="true">
              {differentiation.steps.map((step, index) => (
                <div key={step.title} className={styles.pane} data-active={activePane === index}>
                  <div className={styles.frame}>
                    <LottiePlayer src={step.lottie} lazy className={styles.lottie} />
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.content}>
              {differentiation.steps.map((step, index) => (
                <div key={step.title}>
                  <div className={styles.mediaCopy} aria-hidden="true">
                    <div className={styles.frame}>
                      <LottiePlayer src={step.lottie} lazy className={styles.lottie} />
                    </div>
                  </div>
                  <div data-step={index} className={styles.step} data-active={activeStep === index}>
                    <div className={styles.stepInner}>
                      <h3 className="h-x-large">{step.title}</h3>
                      <p className={`txt-medium ${styles.stepBody}`}>{step.body}</p>
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
