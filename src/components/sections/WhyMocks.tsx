import type { HomeContent } from "@/content";
import styles from "./WhyMocks.module.css";

type Mocks = HomeContent["why"]["mocks"];

/** e-Invoice sync table (fullseam-style product UI). */
export function EInvoiceMock({ data }: { data: Mocks["einvoice"] }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.appIcon}>e</span>
        <div className={styles.headerText}>
          <span className={styles.cardTitle}>{data.title}</span>
          <span className={styles.cardMeta}>{data.source}</span>
        </div>
        <span className={styles.sync} aria-hidden="true" />
      </div>
      <div className={styles.progress} aria-hidden="true">
        <span />
      </div>
      <ul className={styles.rows}>
        {data.rows.map((row, index) => (
          <li key={row.invoice} className={styles.row} style={{ animationDelay: `${0.25 + index * 0.18}s` }}>
            <span className={styles.company}>{row.company}</span>
            <span className={styles.invoice}>{row.invoice}</span>
            <span className={styles.status} data-tone={row.tone}>
              {row.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** WhatsApp reminder and reply. */
export function WhatsAppMock({ data }: { data: Mocks["whatsapp"] }) {
  const company = data.contact.split("—").pop() ?? data.contact;
  const initials = company.replace(/[^A-ZÇĞİÖŞÜ]/g, "").slice(0, 2) || "AB";
  return (
    <div className={`${styles.card} ${styles.chat}`}>
      <div className={styles.chatHeader}>
        <span className={styles.avatar}>{initials}</span>
        <div className={styles.headerText}>
          <span className={styles.cardTitle}>{data.contact}</span>
          <span className={styles.online}>{data.online}</span>
        </div>
        <span className={styles.waMark} aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.4-.7a11.6 11.6 0 0 1-4.6-4c-.4-.5-1-1.5-1-2.8s.7-2 1-2.3c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.4 1.8 2.2 1.2 1 2.2 1.4 2.5 1.5.3.1.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.3.1.2.1.8-.1 1.4Z"
            />
          </svg>
        </span>
      </div>
      <div className={styles.thread}>
        <div className={`${styles.bubble} ${styles.out}`}>
          {data.outgoing}
          <span className={styles.meta}>
            {data.time} <span className={styles.ticks}>✓✓</span>
          </span>
        </div>
        <div className={styles.typing} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className={`${styles.bubble} ${styles.in}`}>
          {data.incoming}
          <span className={styles.meta}>{data.time}</span>
        </div>
      </div>
    </div>
  );
}

/** Voice agent call with human handoff. */
export function VoiceMock({ data }: { data: Mocks["voice"] }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={`${styles.appIcon} ${styles.callIcon}`} aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z"
            />
          </svg>
        </span>
        <div className={styles.headerText}>
          <span className={styles.cardTitle}>{data.title}</span>
          <span className={styles.cardMeta}>{data.line}</span>
        </div>
        <span className={styles.callStatus}>
          <span className={styles.recDot} aria-hidden="true" />
          {data.status}
        </span>
      </div>
      <div className={styles.wave} aria-hidden="true">
        {Array.from({ length: 28 }, (_, i) => (
          <span key={i} style={{ animationDelay: `${(i % 7) * 0.11}s` }} />
        ))}
      </div>
      <ul className={styles.transcript}>
        {data.transcript.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      <div className={styles.handoff}>{data.handoff}</div>
    </div>
  );
}
