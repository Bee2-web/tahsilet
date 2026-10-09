"use client";

import { useEffect, useState } from "react";
import { aiAssistantHref, aiAssistants, type HomeContent } from "@/content";
import { ChatGptIcon, ClaudeIcon, GeminiIcon, GrokIcon, PerplexityIcon } from "@/components/icons/AiIcons";
import styles from "./AiLabel.module.css";

const ICONS = { ChatGPT: ChatGptIcon, Perplexity: PerplexityIcon, Claude: ClaudeIcon, Grok: GrokIcon, Gemini: GeminiIcon };

type Props = { content: Pick<HomeContent, "aiLabel" | "locale"> };

/**
 * Floating "Explore Tahsilet with AI" pill. Fades in 1.5s after load and slides out to the right while
 * the footer is in view.
 */
export function AiLabel({ content }: Props) {
  const { aiLabel, locale } = content;
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
    <aside className={styles.label} data-hidden={hidden} aria-label={aiLabel.label}>
      <div>{aiLabel.label}</div>
      <div className={styles.buttons}>
        {aiAssistants.map((name) => {
          const Icon = ICONS[name];
          return (
            <div key={name} className={styles.item}>
              <a
                href={aiAssistantHref(name, locale)}
                className={styles.button}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={aiLabel.ask.replace("{name}", name)}
              >
                <Icon />
              </a>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
