import { finalCta } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";
import styles from "./FinalCTA.module.css";

export function FinalCTA() {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="cta-title">
      <div className="section-padding">
        <div className="page-container container-center-text">
          <div className={styles.titleWrap}>
            <h2 id="cta-title" className={styles.title}>
              {finalCta.title}
            </h2>
          </div>
          <p className="txt-medium">{finalCta.body}</p>
          <ButtonLink href={finalCta.button.href} size="xl">
            <div>{finalCta.button.label}</div>
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
