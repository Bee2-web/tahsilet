import { lottie } from "@/content/home";
import { LottiePlayer } from "@/components/animations/LottiePlayer";
import styles from "./EatSection.module.css";

/** Yellow band where the mascot munches a row of invoices (looping Lottie). */
export function EatSection() {
  return (
    <section className={`section ${styles.section}`} aria-label="Stuut eating invoices">
      <div className={styles.lottieDiv}>
        <LottiePlayer src={lottie.eat} className={styles.lottie} />
      </div>
    </section>
  );
}
