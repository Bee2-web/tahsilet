import styles from "./GrainOverlay.module.css";

/** Full-viewport animated film grain (SVG turbulence filter), as on the reference. */
export function GrainOverlay() {
  return (
    <>
      <svg className={styles.defs} aria-hidden="true" focusable="false">
        <filter id="grainy">
          <feTurbulence type="turbulence" baseFrequency="0.9" numOctaves={4} seed={2} />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div className={styles.noise} aria-hidden="true" />
    </>
  );
}
