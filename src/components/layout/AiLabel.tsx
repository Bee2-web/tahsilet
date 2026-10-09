"use client";

import { useEffect, useState } from "react";
import { aiLinks } from "@/content/home";
import { ChatGptIcon, ClaudeIcon, GeminiIcon, GrokIcon, PerplexityIcon } from "@/components/icons/AiIcons";
import styles from "./AiLabel.module.css";

const ICONS = { ChatGPT: ChatGptIcon, Perplexity: PerplexityIcon, Claude: ClaudeIcon, Grok: GrokIcon, Gemini: GeminiIcon };

/**
 * Floating "Explore Stuut with AI" pill. Fades in 1.5s after load ("Ai Label Fade IN") and slides
 * out to the right while the footer is in view ("Footer IN/OUT").
 */
export function AiLabel() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;
    const enter = new IntersectionObserver(([entry]) => entry.isIntersecting && setHidden(true), {
      rootMargin: "0px 0px -20% 0px",
    });
    const leave = new IntersectionObserver(([entry]) => !entry.isIntersecting && setHidden(false));
    enter.observe(footer);
    leave.observe(footer);
    return () => {
      enter.disconnect();
      leave.disconnect();
    };
  }, []);

  return (
    <aside className={styles.label} data-hidden={hidden} aria-label="Explore Stuut with AI">
      <div>Explore Stuut with AI</div>
      <div className={styles.buttons}>
        {aiLinks.map(({ name, href }) => {
          const Icon = ICONS[name];
          return (
            <div key={name} className={styles.item}>
              <a href={href} className={styles.button} target="_blank" rel="noopener noreferrer" aria-label={`Ask ${name} about Stuut`}>
                <Icon />
              </a>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
