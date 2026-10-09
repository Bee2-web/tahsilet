"use client";

import { useEffect, useRef } from "react";
import type { AnimationItem } from "lottie-web";
import { LottiePlayer } from "@/components/animations/LottiePlayer";
import { FOOTER, prefersReducedMotion } from "@/lib/animations";

/**
 * "Footer IN/OUT": when the footer is 20% into view the pop-up mascot plays through once
 * (5s, after .6s); once the footer has fully left the viewport it rewinds to frame 0.
 */
export function FooterMascot({ src, className }: { src: string; className: string }) {
  const animationRef = useRef<AnimationItem | null>(null);
  const timerRef = useRef<number | undefined>(undefined);
  const inViewRef = useRef(false);

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;

    const play = () => {
      const animation = animationRef.current;
      if (!animation || prefersReducedMotion()) return;
      window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        animation.setSpeed(animation.getDuration(false) / FOOTER.lottieDuration);
        animation.goToAndPlay(0, true);
      }, FOOTER.lottieDelay * 1000);
    };

    const enter = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !inViewRef.current) {
          inViewRef.current = true;
          play();
        }
      },
      { rootMargin: "0px 0px -20% 0px" },
    );
    const leave = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting && inViewRef.current) {
        inViewRef.current = false;
        window.clearTimeout(timerRef.current);
        animationRef.current?.goToAndStop(0, true);
      }
    });
    enter.observe(footer);
    leave.observe(footer);
    return () => {
      enter.disconnect();
      leave.disconnect();
      window.clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <LottiePlayer
      src={src}
      className={className}
      loop={false}
      autoplay={false}
      pauseOffscreen={false}
      reducedMotionFrame={75}
      onReady={(animation) => {
        animationRef.current = animation;
        if (inViewRef.current && !prefersReducedMotion()) animation.goToAndPlay(0, true);
      }}
    />
  );
}
