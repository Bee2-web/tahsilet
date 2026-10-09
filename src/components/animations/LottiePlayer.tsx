"use client";

import { useEffect, useRef } from "react";
import type { AnimationItem } from "lottie-web";
import { prefersReducedMotion } from "@/lib/animations";

type LottieModule = typeof import("lottie-web/build/player/lottie_light");

let lottieModule: Promise<LottieModule> | null = null;
const dataCache = new Map<string, Promise<string>>();

const loadLottie = () => (lottieModule ??= import("lottie-web/build/player/lottie_light"));

/** Fetch once per src; each instance parses its own copy because lottie mutates animationData. */
function loadData(src: string) {
  let pending = dataCache.get(src);
  if (!pending) {
    pending = fetch(src).then((res) => {
      if (!res.ok) throw new Error(`Lottie ${src}: ${res.status}`);
      return res.text();
    });
    dataCache.set(src, pending);
  }
  return pending.then((text) => JSON.parse(text) as object);
}

export type LottiePlayerProps = {
  src: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  /** Load only when the container approaches the viewport (Webflow `data-loading="lazy"`). */
  lazy?: boolean;
  /** Pause looping playback while off-screen to save CPU. */
  pauseOffscreen?: boolean;
  /** Frame shown when the user prefers reduced motion. */
  reducedMotionFrame?: number;
  onReady?: (animation: AnimationItem) => void;
};

export function LottiePlayer({
  src,
  className,
  loop = true,
  autoplay = true,
  lazy = false,
  pauseOffscreen = true,
  reducedMotionFrame = 0,
  onReady,
}: LottiePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const onReadyRef = useRef(onReady);

  useEffect(() => {
    onReadyRef.current = onReady;
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animation: AnimationItem | null = null;
    let cancelled = false;
    let started = false;
    let visible = !lazy;
    const reduced = prefersReducedMotion();
    const shouldPlay = autoplay && !reduced;

    const start = async () => {
      started = true;
      const [lottie, animationData] = await Promise.all([loadLottie(), loadData(src)]);
      if (cancelled) return;
      animation = lottie.default.loadAnimation({
        container,
        renderer: "svg",
        loop,
        autoplay: shouldPlay && visible,
        animationData,
        rendererSettings: { preserveAspectRatio: "xMidYMid meet", progressiveLoad: true },
      });
      if (reduced) animation.goToAndStop(reducedMotionFrame, true);
      onReadyRef.current?.(animation);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !started && !cancelled) {
          void start();
          return;
        }
        if (!animation || !shouldPlay || !pauseOffscreen || !loop) return;
        if (visible) animation.play();
        else animation.pause();
      },
      { rootMargin: "200px 0px" },
    );

    if (lazy) observer.observe(container);
    else {
      void start();
      observer.observe(container);
    }

    return () => {
      cancelled = true;
      observer.disconnect();
      animation?.destroy();
    };
  }, [src, loop, autoplay, lazy, pauseOffscreen, reducedMotionFrame]);

  return <div ref={containerRef} className={className} aria-hidden="true" />;
}
