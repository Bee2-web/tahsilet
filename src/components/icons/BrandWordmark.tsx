import styles from "./BrandWordmark.module.css";

type Props = { name: string; suffix: string; className?: string; label?: string };

/**
 * Typographic "Tahsilet.AI" wordmark: the name in Quadrant (serif) with the ".AI" suffix in Hn Extra Bold,
 * echoing the serif + display pairing of the original design. It scales to its container's width via
 * container query units, so it works as nav logo, hero headline and footer signature.
 */
export function BrandWordmark({ name, suffix, className, label }: Props) {
  return (
    <span className={[styles.wrap, className].filter(Boolean).join(" ")} role="img" aria-label={label ?? `${name}${suffix}`}>
      <span className={styles.mark} aria-hidden="true">
        <span className={styles.name}>{name}</span>
        <span className={styles.suffix}>{suffix}</span>
      </span>
    </span>
  );
}
