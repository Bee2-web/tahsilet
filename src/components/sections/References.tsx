import type { CSSProperties } from "react";
import Image from "next/image";
import type { HomeContent } from "@/content";
import { StaggerReveal } from "@/components/animations/ScrollReveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import styles from "./References.module.css";

type Props = { content: Pick<HomeContent, "references"> };

/** Tahsilet's reference customers as logo cards (Stuut card style on a blueprint grid). */
export function References({ content }: Props) {
  const { references } = content;
  return (
    <section className={`section blueprint ${styles.section}`} aria-labelledby="references-title">
      <div className="section-padding">
        <div className="page-container container-center-text">
          <Eyebrow className={styles.eyebrow}>{references.eyebrow}</Eyebrow>
          <h2 id="references-title" className={`section-title ${styles.title}`}>
            {references.title}
          </h2>
          <div className={styles.wrap}>
            <StaggerReveal className={styles.list} role="list">
              {references.companies.map((company) => (
                <div key={company.name} className={styles.item} role="listitem">
                  <div className={styles.card}>
                    <div className={styles.logo} style={{ "--logo-scale": company.scale ?? 1 } as CSSProperties}>
                      <Image src={company.logo} alt={company.name} fill sizes="12rem" unoptimized className={styles.logoImg} />
                    </div>
                  </div>
                </div>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
