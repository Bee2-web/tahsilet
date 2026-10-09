"use client";

import { useRef } from "react";
import { lottie, type HomeContent } from "@/content";
import { BrandWordmark } from "@/components/icons/BrandWordmark";
import { ChatBubbleText } from "@/components/animations/ChatBubbleText";
import { MascotAnimation } from "@/components/animations/MascotAnimation";
import { DemoForm } from "@/components/ui/DemoForm";
import { gsap, useGSAP } from "@/lib/gsap";
import { HERO_SCROLL } from "@/lib/animations";
import styles from "./Hero.module.css";

type Props = { content: Pick<HomeContent, "hero" | "brand" | "contactEmail" | "locale"> };

export function Hero({ content }: Props) {
  const { hero, brand } = content;
  const rootRef = useRef<HTMLElement>(null);

  // Wordmark drifts up 18rem, bubble lifts 10rem and shrinks to 50% while the hero scrolls out.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: rootRef.current, start: "bottom bottom", end: "bottom top", scrub: HERO_SCROLL.scrub },
          })
          .to(`.${styles.logo}`, { y: `${HERO_SCROLL.logoY}rem` }, 0)
          .to(`.${styles.bubbleScroll}`, { y: `${HERO_SCROLL.bubbleY}rem` }, 0)
          .to(`.${styles.bubbleDiv}`, { scale: HERO_SCROLL.bubbleScale }, 0);
      });
    },
    { scope: rootRef },
  );

  return (
    <header ref={rootRef} id="hero" className={`section ${styles.hero}`}>
      <svg className={styles.arcs} viewBox="0 0 800 800" aria-hidden="true" focusable="false">
        {[120, 200, 280, 360, 440].map((r) => (
          <circle key={r} cx="800" cy="0" r={r} />
        ))}
        <line x1="0" y1="0" x2="800" y2="800" />
      </svg>

      <div className={`section-padding ${styles.padding}`}>
        <div className="page-container">
          <div className={styles.logoDiv}>
            <div className={styles.logo}>
              <BrandWordmark name={brand.name} />
            </div>
          </div>
        </div>

        <div className={`page-container ${styles.bottomAlign}`}>
          <div className={styles.copy}>
            <div className={styles.chip}>
              <span className={styles.chipMark} />
              {hero.eyebrow}
            </div>
            <div className={styles.titleWrap}>
              <h1 className={`h-x-large ${styles.title}`}>
                {hero.title} <span className={styles.titleAccent}>{hero.titleAccent}</span>
              </h1>
            </div>
            <div className={styles.body}>
              <p className="txt-medium">{hero.body}</p>
            </div>
            <div className={styles.videoRow}>
              <a href={hero.secondaryCta.href} className={styles.textButton}>
                {hero.secondaryCta.label} <span aria-hidden="true">↓</span>
              </a>
            </div>
            <DemoForm content={content} />
            <ul className={styles.badges}>
              {hero.badges.map((badge) => (
                <li key={badge}>
                  <span className={styles.check} aria-hidden="true">
                    ✓
                  </span>
                  {badge}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.lottieDiv}>
            <MascotAnimation loadSrc={lottie.heroLoad} talkSrc={lottie.heroTalk} className={styles.mascot} />
            <div className={styles.bubbleScroll}>
              <div className={styles.bubbleDiv}>
                <div className={styles.bubblePop}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- vector speech bubble */}
                  <img src="/assets/images/bubble.svg" alt="" className={styles.bubbleImg} width={309} height={219} />
                  <ChatBubbleText lines={hero.bubbleLines} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
