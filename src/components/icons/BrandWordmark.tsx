import styles from "./BrandWordmark.module.css";

type Props = { name: string; suffix?: string; className?: string; label?: string };

/**
 * Typographic wordmark: the name in Quadrant (serif), optionally followed by a ".AI" suffix in Hn Extra Bold
 * (used in the header only). It scales to its container's width via container query units. Each part
 * carries `data-part` so the header can animate them separately.
 */
export function BrandWordmark({ name, suffix, className, label }: Props) {
  return (
    <span className={[styles.wrap, className].filter(Boolean).join(" ")} role="img" aria-label={label ?? `${name}${suffix ?? ""}`}>
      <span className={styles.mark} data-suffix={Boolean(suffix)} aria-hidden="true">
        <span className={styles.name} data-part="name">
          {name}
        </span>
        {suffix && (
          <span className={styles.suffix} data-part="suffix">
            {suffix}
          </span>
        )}
      </span>
    </span>
  );
}
