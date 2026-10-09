import type { HomeContent } from "@/content";
import { StaggerReveal } from "@/components/animations/ScrollReveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import styles from "./Integrations.module.css";

type Props = { content: Pick<HomeContent, "integrations"> };

/** Supported Turkish ERP / accounting systems as a typographic tile grid. */
export function Integrations({ content }: Props) {
  const { integrations } = content;
  return (
    <section id="integrations" className={`section blueprint ${styles.section}`} aria-labelledby="stack-title">
      <div className="section-padding">
        <div className="page-container container-center-text">
          <Eyebrow className={styles.eyebrow}>{integrations.eyebrow}</Eyebrow>
          <div className={styles.titleWrap}>
            <h2 id="stack-title" className={`section-title ${styles.title}`}>
              {integrations.title}
            </h2>
          </div>
          <p className="section-lede">{integrations.body}</p>
          <div className={styles.wrap}>
            <StaggerReveal className={styles.list} role="list">
              {integrations.systems.map((system) => (
                <div key={system} className={styles.item} role="listitem">
                  <span className={styles.name}>{system}</span>
                </div>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
