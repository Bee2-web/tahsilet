/**
 * Demo-request form handling.
 *
 * FRONTEND PLACEHOLDER: the reference posts to Webflow Forms (with Turnstile + HubSpot). This replica
 * has no backend, so `submitDemoRequest` never reports success. Wire it to a real endpoint here.
 */

/** Consumer / disposable domains the reference rejects ("Please use your work email."). */
const BLOCKED_DOMAINS = new Set([
  "gmail.com", "googlemail.com",
  "hotmail.com", "hotmail.co.uk", "outlook.com", "live.com", "msn.com",
  "yahoo.com", "yahoo.co.uk", "ymail.com", "rocketmail.com",
  "aol.com", "icloud.com", "me.com", "mac.com",
  "proton.me", "protonmail.com", "gmx.com", "gmx.net", "mail.com",
  "zoho.com", "yandex.com", "pm.me",
  "mailinator.com", "guerrillamail.com", "10minutemail.com",
  "trashmail.com", "temp-mail.org", "getnada.com", "yopmail.com",
]);

export const WORK_EMAIL_MESSAGE = "Please use your work email.";

export function isBlockedEmail(email: string) {
  const at = email.trim().toLowerCase().lastIndexOf("@");
  return at !== -1 && BLOCKED_DOMAINS.has(email.trim().toLowerCase().slice(at + 1));
}

export type SubmitResult = { ok: true } | { ok: false; reason: "not-connected" | "network" };

export async function submitDemoRequest(email: string): Promise<SubmitResult> {
  // TODO(backend): POST { email, utm_* } to the CRM / form endpoint and return { ok: true } on success.
  void email;
  return { ok: false, reason: "not-connected" };
}
