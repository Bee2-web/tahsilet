"use client";

import { useState, type FormEvent } from "react";
import { mailtoHref, type HomeContent } from "@/content";
import { isBlockedEmail } from "@/lib/forms";
import { buttonClass } from "./Button";
import styles from "./DemoForm.module.css";

type Props = { content: Pick<HomeContent, "hero" | "contactEmail" | "locale"> };

/**
 * Hero demo request. Validates a work email (consumer domains rejected), then opens a pre-filled email
 * to the Tahsilet contact address — no backend required. Swap `submitDemoRequest` in lib/forms.ts for a
 * CRM/API call when one exists.
 */
export function DemoForm({ content }: Props) {
  const { hero } = content;
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const input = form.elements.namedItem("email") as HTMLInputElement;
    input.setCustomValidity(isBlockedEmail(input.value) ? hero.blockedEmailMessage : "");
    if (!form.reportValidity()) return;
    window.location.href = mailtoHref(content, input.value.trim());
    setSent(true);
  };

  return (
    <div className={styles.demoForm}>
      <form className={styles.content} onSubmit={onSubmit} aria-label={hero.formLabel}>
        <input
          className={styles.field}
          name="email"
          type="email"
          placeholder={hero.emailPlaceholder}
          aria-label={hero.emailLabel}
          autoComplete="email"
          required
          onInput={(event) => event.currentTarget.setCustomValidity("")}
        />
        <button type="submit" className={buttonClass("blue", "default", styles.submit)}>
          {hero.submitLabel}
        </button>
      </form>
      {sent && (
        <p className={styles.notice} role="status">
          {hero.mailtoOpened} <a href={`mailto:${content.contactEmail}`}>{content.contactEmail}</a>
        </p>
      )}
    </div>
  );
}
