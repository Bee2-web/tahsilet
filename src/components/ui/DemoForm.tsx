"use client";

import { useState, type FormEvent } from "react";
import { isBlockedEmail, submitDemoRequest, WORK_EMAIL_MESSAGE } from "@/lib/forms";
import { buttonClass } from "./Button";
import styles from "./DemoForm.module.css";

type Props = { placeholder: string; submitLabel: string; submittingLabel: string };

type Status = { kind: "idle" } | { kind: "submitting" } | { kind: "error"; message: string };

/** Hero email-capture form with the reference's work-email validation. Submission is a documented placeholder. */
export function DemoForm({ placeholder, submitLabel, submittingLabel }: Props) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const input = form.elements.namedItem("email") as HTMLInputElement;
    input.setCustomValidity(isBlockedEmail(input.value) ? WORK_EMAIL_MESSAGE : "");
    if (!form.reportValidity()) return;

    setStatus({ kind: "submitting" });
    const result = await submitDemoRequest(input.value);
    setStatus(
      result.ok
        ? { kind: "idle" }
        : {
            kind: "error",
            message:
              result.reason === "not-connected"
                ? "This form isn’t connected to a backend yet, so your request was not sent."
                : "Something went wrong. Please try again.",
          },
    );
  };

  return (
    <div className={styles.demoForm}>
      <form className={styles.content} onSubmit={onSubmit} noValidate={false} aria-label="Request a demo">
        <input
          className={styles.field}
          name="email"
          type="email"
          placeholder={placeholder}
          aria-label="Work email"
          autoComplete="email"
          required
          onInput={(event) => event.currentTarget.setCustomValidity("")}
        />
        <button type="submit" className={buttonClass("blue", "default", styles.submit)} disabled={status.kind === "submitting"}>
          {status.kind === "submitting" ? submittingLabel : submitLabel}
        </button>
        {/* Matches the reference's Turnstile slot, which adds one flex gap. */}
        <div aria-hidden="true" />
      </form>
      {status.kind === "error" && (
        <p className={styles.error} role="status">
          {status.message}
        </p>
      )}
    </div>
  );
}
