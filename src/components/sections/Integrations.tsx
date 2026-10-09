import Image from "next/image";
import { integrations } from "@/content/home";
import { StaggerReveal } from "@/components/animations/ScrollReveal";
import styles from "./Integrations.module.css";

export function Integrations() {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="stack-title">
      <div className="section-padding">
        <div className="page-container container-center-text">
          <div className={styles.titleWrap}>
            <h2 id="stack-title" className={`h-x-large ${styles.title}`}>
              {integrations.title}
            </h2>
          </div>
          <p className="txt-medium">{integrations.body}</p>
          <div className={styles.wrap}>
            <StaggerReveal className={styles.list} role="list">
              {integrations.logos.map((logo) => (
                <div key={logo.name} className={styles.item} role="listitem">
                  <div className={styles.card}>
                    <Image src={logo.src} alt={logo.name} width={735} height={340} unoptimized className={styles.img} />
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
