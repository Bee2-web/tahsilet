"use client";

import { useCallback, useRef, useState } from "react";
import { hero, lottie } from "@/content/home";
import { Wordmark } from "@/components/icons/Wordmark";
import { ChatBubbleText } from "@/components/animations/ChatBubbleText";
import { MascotAnimation } from "@/components/animations/MascotAnimation";
import { DemoForm } from "@/components/ui/DemoForm";
import { VideoPopup } from "@/components/ui/VideoPopup";
import { gsap, useGSAP } from "@/lib/gsap";
import { HERO_SCROLL } from "@/lib/animations";
import styles from "./Hero.module.css";

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const closeVideo = useCallback(() => setVideoOpen(false), []);

  // "Home Hero Scroll": wordmark drifts up 18rem, bubble lifts 10rem and shrinks to 50%
  // while the hero scrolls out (progress 0 when fully in view → 1 when it has left).
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
      <div className={`section-padding ${styles.padding}`}>
        <div className="page-container">
          <div className={styles.logoDiv}>
            <div className={styles.logo}>
              <Wordmark aria-label="Stuut Technologies" role="img" aria-hidden={undefined} />
            </div>
          </div>
        </div>

        <div className={`page-container ${styles.bottomAlign}`}>
          <div className={styles.copy}>
            <div className={styles.titleWrap}>
              <h1 className="h-x-large">{hero.title}</h1>
            </div>
            <div className={styles.body}>
              <p className="txt-medium">{hero.body}</p>
            </div>
            <div className={styles.videoRow}>
              <button type="button" className={styles.textButton} onClick={() => setVideoOpen(true)}>
                {hero.videoLabel}
              </button>
            </div>
            <DemoForm placeholder={hero.emailPlaceholder} submitLabel={hero.submitLabel} submittingLabel={hero.submittingLabel} />
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
      <VideoPopup open={videoOpen} onClose={closeVideo} src={hero.videoSrc} title={hero.videoLabel} />
    </header>
  );
}
