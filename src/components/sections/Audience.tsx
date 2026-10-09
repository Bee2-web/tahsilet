import type { HomeContent } from "@/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { StaggerReveal } from "@/components/animations/ScrollReveal";
import styles from "./Audience.module.css";

type Props = { content: Pick<HomeContent, "audience"> };

/** "Who it's for" — four profile cells on a hairline grid. */
export function Audience({ content }: Props) {
  const { audience } = content;
  return (
    <section className={`section blueprint ${styles.section}`} aria-labelledby="audience-title">
      <div className="section-padding">
        <div className={`page-container ${styles.container}`}>
          <div className={styles.header}>
            <div>
              <Eyebrow>{audience.eyebrow}</Eyebrow>
              <h2 id="audience-title" className="section-title">
                {audience.title}
              </h2>
            </div>
            <p className="section-lede">{audience.body}</p>
          </div>
          <StaggerReveal className={styles.grid} role="list">
            {audience.items.map((item, index) => (
              <div key={item.value} className={styles.cell} role="listitem">
                <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.value}>{item.value}</span>
                <span className={styles.label}>{item.label}</span>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </div>
    </section>
  );
}
