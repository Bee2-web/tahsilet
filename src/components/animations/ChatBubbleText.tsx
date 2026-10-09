"use client";

import { useEffect, useRef, useState } from "react";
import { CHAT_BUBBLE, prefersReducedMotion } from "@/lib/animations";
import styles from "./ChatBubbleText.module.css";

type State = { line: number; words: number; fading: boolean; started: boolean };

/**
 * Multilingual speech-bubble copy. Port of the reference's "CHAT BUBBLE WORD POP-IN" script:
 * after a 2.2s delay each line pops in word by word (40ms apart, 80ms pop), holds until 4.2s
 * have elapsed, fades out over 300ms, then the next language starts. Pauses off-screen.
 */
export function ChatBubbleText({ lines }: { lines: string[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>({ line: 0, words: 0, fading: false, started: false });
  const tokens = lines.map((line) => line.split(/(\s+)/));

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = prefersReducedMotion();
    const wordLists = lines.map((line) => line.split(/(\s+)/));

    let timer: number | undefined;
    let paused = true;
    let hasStarted = false;
    let line = 0;
    let words = 0;
    let phase: "popping" | "holding" | "fading" = "popping";
    let cycleStart = 0;
    let pending: (() => void) | null = null;

    const wait = (ms: number, next: () => void) => {
      pending = next;
      timer = window.setTimeout(() => {
        pending = null;
        if (!paused) next();
      }, ms);
    };

    const step = () => {
      if (paused) return;
      const total = wordLists[line].length;
      if (phase === "popping") {
        if (words === 0) cycleStart = performance.now();
        if (reduced) words = total;
        if (words < total) {
          words += 1;
          setState({ line, words, fading: false, started: true });
          wait(CHAT_BUBBLE.wordDelay, step);
        } else {
          setState({ line, words: total, fading: false, started: true });
          phase = "holding";
          step();
        }
      } else if (phase === "holding") {
        const remaining = CHAT_BUBBLE.cycleDuration - (performance.now() - cycleStart) - CHAT_BUBBLE.fadeOutDuration;
        phase = "fading";
        wait(Math.max(0, remaining), step);
      } else {
        setState((s) => ({ ...s, fading: true }));
        wait(CHAT_BUBBLE.fadeOutDuration, () => {
          line = (line + 1) % wordLists.length;
          words = 0;
          phase = "popping";
          setState({ line, words: 0, fading: false, started: false });
          wait(50, step);
        });
      }
    };

    const resume = () => {
      if (!paused) return;
      paused = false;
      if (!hasStarted) {
        hasStarted = true;
        wait(CHAT_BUBBLE.startDelay, step);
      } else if (pending) {
        const next = pending;
        pending = null;
        next();
      } else {
        step();
      }
    };

    const pause = () => {
      paused = true;
      window.clearTimeout(timer);
    };

    let inView = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView && !document.hidden) resume();
        else pause();
      },
      { threshold: 0.1, rootMargin: "50px" },
    );
    observer.observe(root);
    const onVisibility = () => (document.hidden || !inView ? pause() : resume());
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      pause();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [lines]);

  const current = tokens[state.line];

  return (
    <div ref={rootRef} className={styles.questions} aria-live="off">
      <p className="sr-only-focusable">{lines[0]}</p>
      {state.started && (
        <div className={styles.question} data-fading={state.fading} aria-hidden="true">
          <div className={styles.text}>
            {current.slice(0, state.words).map((word, index) =>
              /^\s+$/.test(word) ? (
                word
              ) : (
                <span key={`${state.line}-${index}`} className={styles.word}>
                  {word}
                </span>
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
}
