import styles from "./CaseStudyLabel.module.css";

/** Small yellow tag pinned to the top-right corner of a card ("Case Study", "Coming soon"). */
export function CaseStudyLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={[styles.label, className].filter(Boolean).join(" ")}>{children}</span>;
}
