import styles from "./Eyebrow.module.css";

type Props = { children: React.ReactNode; tone?: "blue" | "white"; strong?: boolean; className?: string };

/** Dot + uppercase label used above most sections ("BY THE NUMBERS", …). */
export function Eyebrow({ children, tone = "blue", strong = false, className }: Props) {
  return (
    <div className={[styles.eyebrow, tone === "white" && styles.white, className].filter(Boolean).join(" ")}>
      <div className={styles.dot} />
      <h2 className={styles.text}>{strong ? <strong>{children}</strong> : children}</h2>
    </div>
  );
}
