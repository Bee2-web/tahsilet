/**
 * Demo-request helpers. The form currently hands off to the visitor's email client (see DemoForm);
 * replace that with a POST to your CRM / form endpoint when one exists.
 */

/** Consumer / disposable domains rejected by the work-email check. */
const BLOCKED_DOMAINS = new Set([
  "gmail.com", "googlemail.com",
  "hotmail.com", "hotmail.co.uk", "outlook.com", "live.com", "msn.com",
  "yahoo.com", "yahoo.co.uk", "ymail.com", "rocketmail.com",
  "aol.com", "icloud.com", "me.com", "mac.com",
  "proton.me", "protonmail.com", "gmx.com", "gmx.net", "mail.com",
  "zoho.com", "yandex.com", "yandex.com.tr", "pm.me",
  "mailinator.com", "guerrillamail.com", "10minutemail.com",
  "trashmail.com", "temp-mail.org", "getnada.com", "yopmail.com",
]);

export function isBlockedEmail(email: string) {
  const at = email.trim().toLowerCase().lastIndexOf("@");
  return at !== -1 && BLOCKED_DOMAINS.has(email.trim().toLowerCase().slice(at + 1));
}
