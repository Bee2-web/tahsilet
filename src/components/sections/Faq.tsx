"use client";

import { useId, useState } from "react";
import type { HomeContent } from "@/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import styles from "./Faq.module.css";

type Props = { content: Pick<HomeContent, "faq"> };

/** fullseam-style FAQ: sticky intro on the left, hairline accordion on the right (one item open at a time). */
export function Faq({ content }: Props) {
  const { faq } = content;
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section className={`section blueprint ${styles.section}`} aria-labelledby="faq-title">
      <div className="section-padding">
        <div className={`page-container ${styles.container}`}>
          <div className={styles.intro}>
            <Eyebrow>{faq.eyebrow}</Eyebrow>
            <h2 id="faq-title" className="section-title">
              {faq.title}
            </h2>
            <p className="section-lede">{faq.body}</p>
          </div>
          <div className={styles.list}>
            {faq.items.map((item, index) => {
              const isOpen = open === index;
              const panelId = `${baseId}-panel-${index}`;
              const buttonId = `${baseId}-button-${index}`;
              return (
                <div key={item.question} className={styles.item} data-open={isOpen}>
                  <h3 className={styles.heading}>
                    <button
                      id={buttonId}
                      type="button"
                      className={styles.question}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : index)}
                    >
                      <span>{item.question}</span>
                      <span className={styles.plus} aria-hidden="true" />
                    </button>
                  </h3>
                  <div id={panelId} role="region" aria-labelledby={buttonId} className={styles.panel}>
                    <div className={styles.panelInner}>
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
