export const LOCALES = ["tr", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "tr";

export const isLocale = (value: string): value is Locale => (LOCALES as readonly string[]).includes(value);

export type Link = { label: string; href: string };

export type DropdownItem = {
  label: string;
  description: string;
  icon: string;
  href?: string;
  comingSoon?: boolean;
};

export type NavDropdownData = { label: string; columns: DropdownItem[][] };
export type NavItem = Link | NavDropdownData;

export type Step = { title: string; body: string };

export type FlowStep = { when: string; channel: string };

export type Stat = { value: string; label: string; source: string };

export type Capability = { title: string; description: string };

export type TrustCard = { title: string; body: string; icon: string; tag: string };

export type Audience = { value: string; label: string };

export type Faq = { question: string; answer: string };

export type HomeContent = {
  locale: Locale;
  meta: { title: string; description: string };
  brand: { name: string; suffix: string; homeLabel: string };
  contactEmail: string;
  announcement: Link;
  nav: {
    label: string;
    items: NavItem[];
    demo: Link;
    languageSwitch: { label: string; href: string; ariaLabel: string };
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    body: string;
    secondaryCta: Link;
    emailPlaceholder: string;
    emailLabel: string;
    submitLabel: string;
    formLabel: string;
    blockedEmailMessage: string;
    mailtoOpened: string;
    badges: string[];
    bubbleLines: string[];
  };
  references: { eyebrow: string; title: string; companies: string[] };
  metrics: { eyebrow: string; stats: Stat[]; callout: string };
  howItWorks: {
    id: string;
    eyebrow: string;
    title: string;
    body: string;
    steps: Step[];
    flow: { title: string; badge: string; steps: FlowStep[]; caption: string };
  };
  capabilities: { id: string; eyebrow: string; items: Capability[] };
  why: {
    id: string;
    eyebrow: string;
    title: string;
    body: string;
    steps: Step[];
    mocks: {
      einvoice: { title: string; source: string; rows: { company: string; invoice: string; status: string; tone: "ok" | "due" | "late" }[] };
      whatsapp: { contact: string; online: string; outgoing: string; incoming: string; time: string };
      voice: { title: string; line: string; status: string; transcript: string[]; handoff: string };
    };
  };
  eat: { label: string };
  trust: { id: string; eyebrow: string; title: string; body: string; cards: TrustCard[]; prev: string; next: string; carouselLabel: string };
  audience: { eyebrow: string; title: string; body: string; items: Audience[] };
  integrations: { eyebrow: string; title: string; body: string; systems: string[] };
  faq: { eyebrow: string; title: string; body: string; items: Faq[] };
  cta: { id: string; eyebrow: string; title: string; body: string; button: string };
  footer: {
    navLabel: string;
    languageTitle: string;
    tagline: string;
    columns: { title: string; links: Link[] }[];
    rights: string;
    madeIn: string;
  };
  aiLabel: { label: string; ask: string };
};
