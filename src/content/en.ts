import type { HomeContent } from "./types";
import { referenceCompanies } from "./references";

/** English copy, translated from the Turkish site content. */
export const en: HomeContent = {
  locale: "en",
  meta: {
    title: "Tahsilet.AI — AI-Powered Collections Platform",
    description:
      "Tahsilet.AI is an AI collections platform for mid-sized Turkish exporters and manufacturers — wired directly into e-Invoice and designed for KVKK and İYS compliance.",
  },
  brand: { name: "Tahsilet", suffix: ".AI", homeLabel: "Tahsilet.AI home" },
  contactEmail: "info@tahsilet.ai",
  announcement: { label: "Our early access program is open — introduce Tahsilet.AI to your business", href: "#contact" },
  nav: {
    label: "Main menu",
    items: [
      {
        label: "Product",
        columns: [
          [
            {
              label: "Collections Engine",
              description: "An AI agent that follows up on receivables for you.",
              icon: "/assets/icons/nav/collections.svg",
              href: "#product",
            },
            {
              label: "e-Invoice Integration",
              description: "Invoice and due-date data straight from the GİB network.",
              icon: "/assets/icons/nav/payments.svg",
              href: "#why-tahsilet",
            },
          ],
          [
            {
              label: "Trust & Control",
              description: "Never touches payment details, logs every step.",
              icon: "/assets/icons/nav/security.svg",
              href: "#trust",
            },
            {
              label: "Audit Trail",
              description: "Every message, call and reply on record.",
              icon: "/assets/icons/nav/disputes.svg",
              href: "#trust",
            },
          ],
        ],
      },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Why Tahsilet", href: "#why-tahsilet" },
      { label: "Trust & Control", href: "#trust" },
      { label: "Contact", href: "#contact" },
    ],
    demo: { label: "Request a Demo", href: "#contact" },
    languageSwitch: { label: "TR", href: "/tr", ariaLabel: "Türkçeye geç" },
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  hero: {
    eyebrow: "AI-powered collections platform",
    title: "Free up your working capital.",
    titleAccent: "Get your receivables paid on time.",
    body: "Tahsilet.AI is an AI collections platform built for mid-sized Turkish exporters and manufacturers, speaking directly to e-Invoice. It follows up on your receivables by email, WhatsApp and voice call — in your brand's name, by your rules.",
    secondaryCta: { label: "See How It Works", href: "#how-it-works" },
    emailPlaceholder: "Your work email",
    emailLabel: "Work email address",
    submitLabel: "Request a Demo",
    formLabel: "Demo request",
    blockedEmailMessage: "Please use your company email address.",
    mailtoOpened: "Your email app is open — just hit send. If it didn't open, write to us at:",
    badges: ["e-Invoice / e-Archive ready", "Designed for KVKK & İYS", "Built for Türkiye"],
    bubbleLines: [
      "While you were sleeping, I chased down 47 overdue invoices!",
      "ABC Ltd. sent a payment today.",
      "WhatsApp reminder sent — waiting for a reply.",
      "Due +7 days: switched channels and messaged on WhatsApp.",
    ],
  },
  references: {
    eyebrow: "Our references",
    title: "Companies that trust us",
    companies: referenceCompanies,
  },
  metrics: {
    eyebrow: "Why now",
    stats: [
      {
        value: "33%",
        label: "Roughly one in three businesses in Türkiye name access to finance as their biggest obstacle.",
        source: "Source: World Bank data",
      },
      { value: "40%", label: "More cash flow" },
      { value: "47%", label: "Reduction in DSO" },
    ],
    callout: "Built for the way Türkiye does business.",
  },
  howItWorks: {
    id: "how-it-works",
    eyebrow: "How it works",
    title: "Your flow, run by AI from first reminder to payment",
    body: "The Collections Engine follows up on your receivables automatically by email, WhatsApp and voice call — in your brand's name and within the rules you set.",
    steps: [
      {
        title: "You design the flow",
        body: "You decide which reminder goes out on which channel and how many days apart. Sequence email, WhatsApp and voice calls in any order you like.",
      },
      {
        title: "Fed straight from e-Invoice",
        body: "Invoice, due date and payment status come directly from the e-Invoice/e-Archive network — whichever accounting software you use.",
      },
      {
        title: "Limits live in the system, not in your hands",
        body: "However aggressive the flow you configure, contact frequency has a platform-level cap — in line with KVKK's principle of proportionality.",
      },
    ],
    flow: {
      title: "Sample flow",
      badge: "Configurable",
      steps: [
        { when: "Due −3 days", channel: "Email" },
        { when: "Due +3 days", channel: "Email" },
        { when: "Due +7 days", channel: "WhatsApp" },
        { when: "Due +10 days", channel: "Email + WhatsApp" },
        { when: "Due +14 days", channel: "Voice Call" },
      ],
      caption: "Each step only kicks in if the previous one gets no reply.",
    },
  },
  capabilities: {
    id: "product",
    eyebrow: "Collections Engine — every channel, your rules",
    items: [
      {
        title: "Email",
        description: "Sends personalised reminders before and after the due date, in your brand's voice.",
      },
      {
        title: "WhatsApp",
        description: "Brings the most natural B2B channel in Türkiye into the flow — the one our competitors ignore.",
      },
      {
        title: "Voice Call",
        description: "The AI agent calls your customer over licensed local carriers; it never takes payment details and routes sensitive steps to your team.",
      },
      {
        title: "e-Invoice",
        description: "Invoice, due date and payment status come from GİB's e-Invoice/e-Archive network — no extra IT project needed.",
      },
      {
        title: "Audit Trail",
        description: "Every message sent, call made and reply received is on record — so you can prove it when you need to.",
      },
      {
        title: "Human in the Loop",
        description: "Anything the system can't decide, or any dispute, is routed to your team within a set time.",
      },
    ],
  },
  why: {
    id: "why-tahsilet",
    eyebrow: "Why Tahsilet",
    title: "Not general-purpose. Built for Türkiye.",
    body: "None of the international competitors we reviewed were designed around e-Invoice, Turkish ERPs or KVKK/İYS regulation. We're building for Türkiye from the ground up.",
    steps: [
      {
        title: "Native e-Invoice / e-Archive integration",
        body: "Whatever accounting software you run (Logo, Netsis, Mikro, Paraşüt), your data foundation is GİB's e-Invoice/e-Archive network — not a general-purpose tool.",
      },
      {
        title: "WhatsApp, a channel we don't ignore",
        body: "None of the competitors we studied use WhatsApp — they all focus on email, SMS and voice. We bring Türkiye's most natural B2B channel into the flow.",
      },
      {
        title: "Local infrastructure, local trust",
        body: "Our voice and messaging infrastructure runs through licensed local carriers such as Netgsm — your calls go out over a reliable, local line.",
      },
    ],
    mocks: {
      einvoice: {
        title: "e-Invoice sync",
        source: "GİB e-Invoice / e-Archive",
        rows: [
          { company: "Demir Makina A.Ş.", invoice: "TSL2026000184", status: "Paid", tone: "ok" },
          { company: "ABC Ltd.", invoice: "TSL2026000191", status: "Due +3", tone: "due" },
          { company: "Ege Tekstil", invoice: "TSL2026000207", status: "Due +14", tone: "late" },
          { company: "Kuzey Ambalaj", invoice: "TSL2026000212", status: "Due −3", tone: "due" },
        ],
      },
      whatsapp: {
        contact: "Accounts — ABC Ltd.",
        online: "online",
        outgoing:
          "Hello, invoice TSL2026000191 for 12,450 TRY was due 3 days ago. Could you share your payment plan with us?",
        incoming: "Hi, the payment will go out this Friday. 👍",
        time: "10:42",
      },
      voice: {
        title: "Voice call",
        line: "Local line · Netgsm",
        status: "Call in progress",
        transcript: [
          "AI agent: I'm calling about your overdue invoice.",
          "Customer: We dispute it — I'd like to speak to your manager.",
        ],
        handoff: "Dispute detected → routed to your team",
      },
    },
  },
  eat: { label: "Tahsilet keeps track of your invoices" },
  trust: {
    id: "trust",
    eyebrow: "Trust & control",
    title: "AI that works without touching your money",
    body: "Letting an AI agent speak to your customers on your behalf is a big step of trust. That's why we design the system to be controllable and auditable from day one.",
    cards: [
      {
        title: "Never touches payment details",
        body: "Under no circumstances does the voice agent take payment details or make a binding commitment — every sensitive step is handed to a person.",
        icon: "/assets/icons/nav/security.svg",
        tag: "Security",
      },
      {
        title: "Every step on record",
        body: "Every message sent, call made and reply received is kept in a complete audit trail — you can see it, and prove it when needed.",
        icon: "/assets/icons/nav/disputes.svg",
        tag: "Audit",
      },
      {
        title: "Frequency is always capped",
        body: "The platform puts a fixed ceiling on contact frequency — no flow configuration can exceed it. KVKK's proportionality principle is enforced at product level.",
        icon: "/assets/icons/nav/credit.svg",
        tag: "KVKK & İYS",
      },
      {
        title: "A human is always in the loop",
        body: "Anything the system can't decide, or any disputed case, is routed to your team within a predefined time — no exception silently disappears.",
        icon: "/assets/icons/nav/collections.svg",
        tag: "Control",
      },
    ],
    prev: "Previous",
    next: "Next",
    carouselLabel: "Trust and control principles",
  },
  audience: {
    eyebrow: "Who it's for",
    title: "Built for mid-sized exporters and manufacturers",
    body: "Tahsilet.AI is designed first for companies facing the same problems in their own industry.",
    items: [
      { value: "200M+ TRY", label: "Annual revenue" },
      { value: "Export / Manufacturing", label: "Mostly B2B customer base" },
      { value: "Regular Invoicing", label: "Using e-Invoice / e-Archive" },
      { value: "Manual Process", label: "Tracking collections in Excel or by phone today" },
    ],
  },
  integrations: {
    eyebrow: "Integrations",
    title: "Integrated with your ERP and accounting systems",
    body: "Whatever accounting or ERP software you use, Tahsilet.AI syncs your invoices and collection data in one click — no extra IT project or data migration required.",
    systems: ["SAP", "Logo", "Mikro", "Uyumsoft", "Netsis", "Luca", "Dia", "Canias", "Rota", "Nebim"],
  },
  faq: {
    eyebrow: "FAQ",
    title: "What teams ask before switching to Tahsilet.AI",
    body: "What you need to know about an AI speaking to your customers on your behalf.",
    items: [
      {
        question: "Which ERP and accounting systems does it work with?",
        answer:
          "It works with the system you already use, including SAP, Logo, Mikro, Uyumsoft, Netsis, Luca, Dia, Canias, Rota and Nebim. Because the data foundation is GİB's e-Invoice/e-Archive network, no extra IT project is needed.",
      },
      {
        question: "Which channels does it use to reach my customers?",
        answer: "Email, WhatsApp and voice calls. You decide which reminder goes out on which channel and how many days apart.",
      },
      {
        question: "Does the AI agent take payment details?",
        answer:
          "No. The voice agent never takes payment details or makes binding commitments; every sensitive step is handed to a person.",
      },
      {
        question: "Is it KVKK and İYS compliant?",
        answer:
          "Yes, the system is designed around KVKK and İYS regulation. Contact frequency has a fixed platform-level cap that no flow can exceed.",
      },
      {
        question: "What happens when the system can't decide?",
        answer:
          "Any case the system can't decide, or any dispute, is routed to your team within a predefined time. No exception silently disappears.",
      },
    ],
  },
  cta: {
    id: "contact",
    eyebrow: "Early access",
    title: "Introduce Tahsilet.AI to your business",
    body: "Let's review your processes together and show you how Tahsilet.AI can add value to your collections. Get in touch and let's talk.",
    button: "Contact us by email",
  },
  footer: {
    navLabel: "Footer",
    languageTitle: "Language",
    tagline: "AI-powered collections for mid-sized exporters and manufacturers in Türkiye.",
    columns: [
      {
        title: "Product",
        links: [
          { label: "Collections Engine", href: "#product" },
          { label: "How It Works", href: "#how-it-works" },
          { label: "Integrations", href: "#integrations" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "Why Tahsilet", href: "#why-tahsilet" },
          { label: "Trust & Control", href: "#trust" },
          { label: "Contact", href: "#contact" },
        ],
      },
    ],
    rights: "Tahsilet.AI — All rights reserved.",
    madeIn: "Made in Türkiye, for Türkiye.",
  },
  aiLabel: { label: "Explore Tahsilet with AI", ask: "Ask {name} about Tahsilet" },
};
