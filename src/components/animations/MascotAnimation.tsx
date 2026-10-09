"use client";

import { useEffect, useState } from "react";
import { LottiePlayer } from "./LottiePlayer";
import { HERO_LOAD, prefersReducedMotion } from "@/lib/animations";

type Props = { loadSrc: string; talkSrc: string; className: string };

/**
 * Hero mascot: the Jumping loop plays while the hero animates in, then (as in the reference's
 * "Load - Home" interaction) it is swapped for the Talk loop when the speech bubble pops up.
 */
export function MascotAnimation({ loadSrc, talkSrc, className }: Props) {
  const [talking, setTalking] = useState(false);

  useEffect(() => {
    const delay = prefersReducedMotion() ? 0 : HERO_LOAD.talkSwapAt * 1000;
    const id = window.setTimeout(() => setTalking(true), delay);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <>
      {!talking && (
        <div className={className} data-active="true">
          <LottiePlayer src={loadSrc} />
        </div>
      )}
      <div className={className} data-active={talking}>
        <LottiePlayer src={talkSrc} />
      </div>
    </>
  );
}
