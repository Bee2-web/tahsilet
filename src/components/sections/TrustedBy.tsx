import Image from "next/image";
import { trustedBy } from "@/content/home";
import { StaggerReveal } from "@/components/animations/ScrollReveal";
import { CaseStudyLabel } from "@/components/ui/CaseStudyLabel";
import styles from "./TrustedBy.module.css";

export function TrustedBy() {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="trusted-title">
      <div className="section-padding">
        <div className="page-container container-center-text">
          <div className={styles.titleWrap}>
            <h2 id="trusted-title" className={`h-x-large ${styles.title}`}>
              {trustedBy.title[0]}
              <br />
              {trustedBy.title[1]}
            </h2>
          </div>
          <div className={styles.wrap}>
            <StaggerReveal className={styles.list} role="list">
              {trustedBy.logos.map((logo) => {
                const img = (
                  <Image src={logo.src} alt={logo.name} width={735} height={340} unoptimized className={styles.img} />
                );
                return (
                  <div key={logo.name} className={styles.item} role="listitem">
                    {logo.caseStudy ? (
                      <a href={logo.caseStudy} className={`${styles.card} ${styles.cardLink}`}>
                        {img}
                        <CaseStudyLabel>Case Study</CaseStudyLabel>
                      </a>
                    ) : (
                      <div className={styles.card}>{img}</div>
                    )}
                  </div>
                );
              })}
            </StaggerReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
