"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { HomeContent } from "@/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { EInvoiceMock, VoiceMock, WhatsAppMock } from "./WhyMocks";
import styles from "./WhyTahsilet.module.css";

type Props = { content: Pick<HomeContent, "why"> };

/**
 * Sticky media + scrolling steps. A step becomes active inside the 60–65% viewport band (others fade
 * to .25) and the matching product mock cross-fades in; a centred 45–55% band also drives the pane.
 */
export function WhyTahsilet({ content }: Props) {
  const { why } = content;
  const rootRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [activePane, setActivePane] = useState(0);

  const mocks: ReactNode[] = [
    <EInvoiceMock key="einvoice" data={why.mocks.einvoice} />,
    <WhatsAppMock key="whatsapp" data={why.mocks.whatsapp} />,
    <VoiceMock key="voice" data={why.mocks.voice} />,
  ];

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
    <section ref={rootRef} id={why.id} className={`section bg-blue-grid ${styles.section}`} aria-labelledby="why-title">
      <div className={styles.padding}>
        <div className={`page-container ${styles.copy}`}>
          <Eyebrow tone="white" strong>
            {why.eyebrow}
          </Eyebrow>
          <div className={styles.titleRow}>
            <h2 id="why-title" className={`section-title ${styles.title}`}>
              {why.title}
            </h2>
            <p className={`section-lede ${styles.lede}`}>{why.body}</p>
          </div>

          <div className={styles.split}>
            <div className={styles.media} aria-hidden="true">
              {mocks.map((mock, index) => (
                <div key={index} className={styles.pane} data-active={activePane === index}>
                  {/* Re-keying on activation replays the mock's entrance animation. */}
                  <div key={activePane === index ? "active" : "idle"} className={styles.frame}>
                    {mock}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.content}>
              {why.steps.map((step, index) => (
                <div key={step.title}>
                  <div className={styles.mediaCopy} aria-hidden="true">
                    <div className={styles.frame}>{mocks[index]}</div>
                  </div>
                  <div data-step={index} className={styles.step} data-active={activeStep === index}>
                    <div className={styles.stepInner}>
                      <span className={styles.stepNumber}>{String(index + 1).padStart(2, "0")}</span>
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
