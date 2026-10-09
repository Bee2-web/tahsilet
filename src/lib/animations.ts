/**
 * Animation constants ported from the reference's Webflow IX2/IX3 interactions and inline scripts.
 * See analysis/INVENTORY.md ("Animation spec") for the source of every value.
 */

export const EASE = {
  outCubic: "power2.out",
  outQuart: "power3.out",
  inOutCubic: "power2.inOut",
  inCubic: "power2.in",
  /** Webflow "swingTo" = back.out(1.70158) */
  swingTo: "back.out(1.7)",
  backOut: "back.out(1.7)",
  power4Out: "power4.out",
  /** Webflow "ease" (CSS ease) */
  webflow: "power1.inOut",
} as const;

/** Hero entrance timeline ("Load - Home", a-181). Seconds. */
export const HERO_LOAD = {
  logoDuration: 1,
  mascotDelay: 0.4,
  mascotDuration: 1,
  /** Group 3 starts after group 2 (1.4s) + its own 1s delay. */
  talkSwapAt: 2.4,
  bubbleScaleDuration: 0.4,
  bubbleFadeDuration: 0.3,
} as const;

/** Chat bubble word pop-in (inline script "CHAT BUBBLE WORD POP-IN"). Milliseconds. */
export const CHAT_BUBBLE = {
  startDelay: 2200,
  cycleDuration: 4200,
  wordDelay: 40,
  fadeOutDuration: 300,
  popInDuration: 80,
} as const;

/** Hero scroll ("Home Hero Scroll", a-170): rem offsets at 100% progress. */
export const HERO_SCROLL = {
  logoY: -18,
  bubbleY: -10,
  bubbleScale: 0.5,
  /** Webflow smoothing 65 ≈ GSAP scrub lag */
  scrub: 0.6,
} as const;

/** Fraction of the viewport that drives header state changes. */
export const HEADER_TRIGGERS = {
  /** Banner collapses once the 100svh hero trigger is <80% visible. */
  bannerCollapse: 0.8,
  /** Navbar turns solid once the hero is <61% visible. */
  navSolid: 0.61,
} as const;

export const LOGO_REVEAL = { y: "4rem", stagger: 0.1, duration: 0.5, start: "top 96%" } as const;

export const STAT_REVEAL = {
  numberY: "24rem",
  numberRotate: 18,
  numberDuration: 1.2,
  labelY: "2rem",
  labelDuration: 0.7,
  labelDelay: 0.5,
  start: "top 80%",
} as const;

export const OFFER_CARD = {
  mouseRangeVw: 22,
  scrollRangeSvh: 45,
  /** Webflow smoothing 88 on mouse move */
  mouseLag: 0.9,
} as const;

export const SLIDER = { minScale: 0.45, maxRotation: -8, arrowSpeed: 0.55, wheelSensitivity: 1.8 } as const;

export const FOOTER = { lottieDelay: 0.6, lottieDuration: 5, labelOut: 0.4, labelIn: 0.6 } as const;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
