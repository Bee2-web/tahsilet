import type { ComponentPropsWithoutRef } from "react";
import styles from "./Button.module.css";

type Variant = "yellow" | "blue";
type Size = "default" | "nav" | "xl";

type ButtonLinkProps = ComponentPropsWithoutRef<"a"> & { variant?: Variant; size?: Size };

export function buttonClass(variant: Variant = "yellow", size: Size = "default", extra?: string) {
  return [styles.button, variant === "blue" && styles.blue, size === "nav" && styles.nav, size === "xl" && styles.xl, extra]
    .filter(Boolean)
    .join(" ");
}

/** Bordered Quadrant button (yellow default, blue variant), rendered as a link. */
export function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
  return <a className={buttonClass(variant, size, className)} {...props} />;
}
