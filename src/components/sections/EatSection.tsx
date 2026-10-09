import { lottie, type HomeContent } from "@/content";
import { LottiePlayer } from "@/components/animations/LottiePlayer";
import styles from "./EatSection.module.css";

/** Yellow band where the mascot munches a row of invoices (looping Lottie). */
type Props = { content: Pick<HomeContent, "eat" | "locale"> };

export function EatSection({ content }: Props) {
  return (
    <section className={`section ${styles.section}`} aria-label={content.eat.label}>
      <div className={styles.lottieDiv}>
        <LottiePlayer src={content.locale === "tr" ? lottie.eatTr : lottie.eat} className={styles.lottie} />
      </div>
    </section>
  );
}
