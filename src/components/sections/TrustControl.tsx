"use client";

import { useRef } from "react";
import type { HomeContent } from "@/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons/UiIcons";
import { Draggable, gsap, useGSAP } from "@/lib/gsap";
import { EASE, SLIDER } from "@/lib/animations";
import styles from "./TrustControl.module.css";

type Props = { content: Pick<HomeContent, "trust"> };

export function TrustControl({ content }: Props) {
  const { trust } = content;
  const rootRef = useRef<HTMLElement>(null);
  const controls = useRef<{ prev: () => void; next: () => void }>({ prev: () => {}, next: () => {} });

  // Overlapping slider: the list is dragged/thrown with inertia and snaps per card; cards that scroll
  // past the left edge stay pinned, shrink to 45% and tilt -8° around 75% / centre.
  useGSAP(
    () => {
      const root = rootRef.current;
      const wrap = root?.querySelector<HTMLElement>(`.${styles.collection}`);
      const list = root?.querySelector<HTMLElement>(`.${styles.list}`);
      const slides = gsap.utils.toArray<HTMLElement>(`.${styles.item}`, root);
      if (!root || !wrap || !list || !slides.length) return;

      let spacing = 0;
      let maxDrag = 0;
      let dragX = 0;
      let currentIndex = 0;
      let active = false;
      let wheelTimeout: number | undefined;
      const state = { value: 0 };

      const clamp = (value: number) => (maxDrag <= 0 ? 0 : Math.min(Math.max(value, 0), maxDrag));

      const update = () => {
        gsap.set(list, { x: -dragX });
        slides.forEach((slide, i) => {
          const local = Math.max(0, dragX - i * spacing);
          const t = spacing > 0 ? Math.min(local / spacing, 1) : 0;
          gsap.set(slide, {
            x: local,
            scale: 1 - (1 - SLIDER.minScale) * t,
            rotation: SLIDER.maxRotation * t,
            transformOrigin: "75% center",
          });
        });
      };

      const [draggable] = Draggable.create(list, {
        type: "x",
        bounds: { minX: 0, maxX: 0 },
        inertia: true,
        maxDuration: 1,
        allowEventDefault: true,
        dragClickables: true,
        snap: (raw: number) => -Math.round(clamp(-raw) / (spacing || 1)) * spacing,
        onDrag() {
          dragX = clamp(-this.x);
          update();
          gsap.killTweensOf(state);
        },
        onThrowUpdate() {
          dragX = clamp(-this.x);
          update();
        },
        onDragEnd() {
          currentIndex = Math.round(dragX / (spacing || 1));
        },
        onThrowComplete() {
          currentIndex = Math.round(dragX / (spacing || 1));
        },
      });

      const recalc = () => {
        const gap = parseFloat(getComputedStyle(slides[0]).marginRight) || 0;
        spacing = slides[0].offsetWidth + gap;
        maxDrag = spacing * (slides.length - 1);
        dragX = clamp(dragX);
        draggable.applyBounds({ minX: -maxDrag, maxX: 0 });
        update();
      };

      const goToSlide = (index: number) => {
        currentIndex = Math.max(0, Math.min(index, slides.length - 1));
        state.value = dragX;
        gsap.killTweensOf(state);
        gsap.to(state, {
          value: currentIndex * spacing,
          duration: SLIDER.arrowSpeed,
          ease: EASE.power4Out,
          onUpdate: () => {
            dragX = state.value;
            update();
          },
        });
        wrap.setAttribute("aria-label", `${trust.carouselLabel} — ${currentIndex + 1} / ${slides.length}`);
      };

      controls.current = {
        prev: () => goToSlide(currentIndex - 1),
        next: () => goToSlide(currentIndex + 1),
      };

      // Horizontal trackpad / shift+wheel moves the slider, then snaps after 150ms of rest.
      const onWheel = (event: WheelEvent) => {
        if (!active) return;
        let delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : 0;
        if (delta === 0 && event.shiftKey) delta = event.deltaY;
        if (Math.abs(event.deltaY) > Math.abs(event.deltaX) * 1.5 && !event.shiftKey) return;
        if (delta === 0) return;
        event.preventDefault();
        window.clearTimeout(wheelTimeout);
        state.value = dragX;
        gsap.killTweensOf(state);
        gsap.to(state, {
          value: clamp(dragX + delta * SLIDER.wheelSensitivity),
          duration: 0.1,
          ease: "power2.out",
          onUpdate: () => {
            dragX = state.value;
            update();
          },
          onComplete: () => {
            wheelTimeout = window.setTimeout(() => goToSlide(Math.round(dragX / spacing)), 150);
          },
        });
      };

      const onKey = (event: KeyboardEvent) => {
        if (!active) return;
        const target = event.target as HTMLElement | null;
        if (target?.closest("input, textarea, select, [contenteditable]")) return;
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          controls.current.prev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          controls.current.next();
        }
      };

      const io = new IntersectionObserver(([entry]) => (active = entry.isIntersecting), { threshold: 0.25 });
      io.observe(wrap);
      const ro = new ResizeObserver(recalc);
      ro.observe(root);
      wrap.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("keydown", onKey);
      recalc();

      return () => {
        draggable.kill();
        io.disconnect();
        ro.disconnect();
        wrap.removeEventListener("wheel", onWheel);
        window.removeEventListener("keydown", onKey);
        window.clearTimeout(wheelTimeout);
      };
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} id={trust.id} className={`section bg-blue-grid ${styles.section}`} aria-labelledby="trust-title">
      <div className="section-padding">
        <div className="page-container">
          <div className={styles.header}>
            <div>
              <Eyebrow tone="white">{trust.eyebrow}</Eyebrow>
              <h2 id="trust-title" className="section-title">
                {trust.title}
              </h2>
            </div>
            <p className={`section-lede ${styles.lede}`}>{trust.body}</p>
          </div>
          <div className={styles.toolbar}>
            <div className={styles.arrows}>
              <button type="button" className={styles.arrow} aria-label={trust.prev} onClick={() => controls.current.prev()}>
                <ArrowLeftIcon />
              </button>
              <button type="button" className={styles.arrow} aria-label={trust.next} onClick={() => controls.current.next()}>
                <ArrowRightIcon />
              </button>
            </div>
          </div>
          <div className={styles.wrap}>
            <div className={styles.collection} role="region" aria-roledescription="carousel" aria-label={trust.carouselLabel}>
              <div className={styles.list} role="list">
                {trust.cards.map((card, index) => (
                  <div key={card.title} className={styles.item} role="listitem">
                    <article className={styles.card}>
                      <div className={styles.cardTop}>
                        <div className={styles.icon}>
                          {/* eslint-disable-next-line @next/next/no-img-element -- decorative SVG icon */}
                          <img src={card.icon} alt="" width={64} height={64} draggable={false} />
                        </div>
                        <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
                      </div>
                      <h3 className={styles.cardTitle}>{card.title}</h3>
                      <p className={styles.body}>{card.body}</p>
                      <div className={styles.footer}>
                        <span className={styles.tag}>{card.tag}</span>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
