import { mailtoHref, type HomeContent } from "@/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ButtonLink } from "@/components/ui/Button";
import styles from "./FinalCTA.module.css";

type Props = { content: Pick<HomeContent, "cta" | "contactEmail" | "locale"> };

/** Closing call-to-action: dark blueprint panel (fullseam) with the XL yellow button (Stuut). */
export function FinalCTA({ content }: Props) {
  const { cta } = content;
  return (
    <section id={cta.id} className={`section blueprint ${styles.section}`} aria-labelledby="cta-title">
      <div className="section-padding">
        <div className="page-container">
          <div className={styles.panel}>
            <Eyebrow tone="white" className={styles.eyebrow}>
              {cta.eyebrow}
            </Eyebrow>
            <h2 id="cta-title" className={styles.title}>
              {cta.title}
            </h2>
            <p className={styles.body}>{cta.body}</p>
            <ButtonLink href={mailtoHref(content)} size="xl">
              <div>{cta.button}</div>
            </ButtonLink>
            <a className={styles.email} href={`mailto:${content.contactEmail}`}>
              {content.contactEmail}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
