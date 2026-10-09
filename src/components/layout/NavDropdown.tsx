"use client";

import { useId } from "react";
import type { DropdownItem, NavDropdownData } from "@/content";
import { ChevronIcon } from "@/components/icons/UiIcons";
import headerStyles from "./Header.module.css";
import styles from "./NavDropdown.module.css";

type Props = {
  data: NavDropdownData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Desktop dropdowns open on hover (Webflow `data-hover="true"`); tablet/mobile toggle on tap. */
  hoverEnabled: boolean;
  /** Called when a link inside the panel is followed (closes the mobile menu). */
  onNavigate?: () => void;
};

function DropdownLink({ item, onNavigate }: { item: DropdownItem; onNavigate?: () => void }) {
  const inner = (
    <>
      <span className={`${styles.icon} ${item.comingSoon ? styles.comingSoonIcon : ""}`}>
        {/* eslint-disable-next-line @next/next/no-img-element -- tiny decorative SVG */}
        <img src={item.icon} alt="" width={64} height={64} />
      </span>
      <span className={styles.linkContent}>
        <span className={styles.titleRow}>
          <span>{item.label}</span>
          {item.comingSoon && <span className={styles.comingSoon}>*Coming Soon</span>}
        </span>
        <span className={styles.description}>{item.description}</span>
      </span>
    </>
  );

  return item.href ? (
    <a href={item.href} className={styles.link} onClick={onNavigate}>
      {inner}
    </a>
  ) : (
    <div className={styles.link} aria-disabled="true">
      {inner}
    </div>
  );
}

export function NavDropdown({ data, open, onOpenChange, hoverEnabled, onNavigate }: Props) {
  const listId = useId();

  return (
    <div
      className={styles.dropdown}
      data-open={open}
      onMouseEnter={hoverEnabled ? () => onOpenChange(true) : undefined}
      onMouseLeave={hoverEnabled ? () => onOpenChange(false) : undefined}
      onKeyDown={(event) => {
        if (event.key === "Escape") onOpenChange(false);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) onOpenChange(false);
      }}
    >
      <button
        type="button"
        className={`${headerStyles.navlink} ${styles.toggle}`}
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => onOpenChange(!open)}
      >
        <span>{data.label}</span>
        <span className={styles.arrow}>
          <ChevronIcon />
        </span>
      </button>
      <div id={listId} className={styles.list} role="group" aria-label={data.label}>
        <div className={styles.content}>
          {data.columns.map((column, index) => (
            <div key={index} className={styles.column}>
              {column.map((item) => (
                <DropdownLink
                  key={item.label}
                  item={item}
                  onNavigate={() => {
                    onOpenChange(false);
                    onNavigate?.();
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
