"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap, useGSAP } from "@/lib/gsap";
import { lockScroll } from "@/lib/scroll";
import styles from "./VideoPopup.module.css";

type Props = { open: boolean; onClose: () => void; src: string; title: string };

/**
 * "Watch How It Works" overlay. Timeline mirrors the reference: backdrop fades in (.3s power2.out),
 * the card scales .8→1 with back.out(1.7). The reference gates the YouTube embed behind its cookie
 * banner; this replica has no consent manager, so the privacy-enhanced embed loads when opened.
 */
export function VideoPopup({ open, onClose, src, title }: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setMounted(true);
      if (open) setVisible(true);
    });
    return () => cancelAnimationFrame(id);
  }, [open]);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || !visible) return;
      const card = root.querySelector(`.${styles.wrapper}`);
      if (open) {
        gsap
          .timeline()
          .fromTo(root, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" })
          .fromTo(card, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }, "-=0.2");
        closeRef.current?.focus();
      } else {
        gsap
          .timeline({ onComplete: () => setVisible(false) })
          .to(card, { scale: 0.8, opacity: 0, duration: 0.3, ease: "power2.in" })
          .to(root, { opacity: 0, duration: 0.3, ease: "power2.in" }, "-=0.2");
      }
    },
    { dependencies: [open, visible], scope: rootRef },
  );

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!mounted || !visible) return null;

  return createPortal(
    <section
      ref={rootRef}
      className={styles.popup}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={styles.wrapper}>
        <button ref={closeRef} type="button" className={styles.close} onClick={onClose} aria-label="Close video">
          {/* eslint-disable-next-line @next/next/no-img-element -- decorative SVG icon */}
          <img src="/assets/icons/close.svg" alt="" width={24} height={24} />
        </button>
        <div className={styles.video}>
          {open && (
            <iframe
              src={src}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </section>,
    document.body,
  );
}
