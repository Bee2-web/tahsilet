# Replica report: stuut.ai homepage

Verified 2026-10-09 against https://www.stuut.ai/, using the production build (`next build && next start`).

## How fidelity was measured
`tools/compare.mjs` loads the live reference and the local build in headless Chromium at the same viewport. It
scrolls through the page so every reveal fires, hides the animated grain on both, takes full-page screenshots and
compares each `main > *` section: its y position, its height, and a pixel diff (pixelmatch, threshold 0.15).
Side-by-side images are written to `analysis/compare/<width>/`.

| Viewport | Doc height ref / local | Section heights | Pixel diff per section |
|---|---|---|---|
| 1920×1080 | 10185 / 10185 | all equal | 0.0–1.4% (Eat Lottie 3.4%) |
| 1440×900 | 9476 / 9476 | all equal | 0.0–2.4% (Eat Lottie 6.5%) |
| 1280×800 | 9055 / 9055 | all equal | 0.0–2.6% (Eat Lottie 4.1%) |
| 1024×768 | 9341 / 9341 | all equal | 0.0–2.4% (Eat Lottie 3.7%) |
| 768×1024 | 9730 / 9730 | all equal | 0.0–2.9% (Eat Lottie 4.8%) |
| 390×844 | 8481 / 8479 | ≤1px | 0.0–4.2% |
| 375×812 | 8526 / 8524 | ≤1px | 0.0–4.1% |

The remaining non-zero diffs come from **animation phase**, not layout: which Lottie frame each side was on, which
language the speech bubble was showing, and where the logo-reveal stagger was when the screenshot was taken.

Interaction states were captured on both sites with `tools/interactions.mjs` and reviewed side by side
(`analysis/shots/states/pairs/`). Covered:
- hero at 0.5s, 2s and 3.5s
- banner/navbar at scroll positions 150, 400 and 700
- Platform/Learn dropdowns
- mobile menu frames
- stat reveal mid-way and settled
- capability hover card
- testimonial slider after "next"
- footer

## Section status (all complete)
| Section | Notes |
|---|---|
| Header | Banner collapse; transparent→white navbar with logo drop-in; hover dropdowns with page overlay; tablet/mobile slide-down yellow menu with hamburger→X and accordion dropdowns |
| Hero | Wordmark, H1, copy, "Watch How It Works" popup, email form, Jumping→Talk mascot Lotties, multilingual bubble (EN/ES/IT/DE) |
| Trusted by | 6 logo cards, 2 "Case Study" tags, staggered rise-in |
| By the numbers | 3 stat cards with rotate/rise reveal; red→blue callout |
| Capabilities | 6 pills (2 "Coming soon"), sibling dimming, fixed yellow description card that tracks the cursor (±22vw) and the scroll (±45svh) |
| What makes Stuut different | Sticky Lottie media with cross-fade + step activation band; stacked Lotties on ≤991px |
| Eat band | Looping "Stuut eats invoices" Lottie |
| Testimonials | 11 cards; overlapping slider (drag + inertia snap, arrows, ←/→ keys, horizontal wheel; passed cards shrink to 45% and tilt −8°) |
| Integrations | 20 logos, 5→3 columns, staggered rise-in |
| Final CTA | "Let Stuut take it from here", XL yellow button |
| Footer | Links, socials, © year, wordmark, pop-up mascot Lottie played once on entry |
| Floating AI pill | Fades in at 1.5s; slides out while the footer is visible; hidden ≤767px |

## Animations replicated (sources: Webflow IX2/IX3 config + inline scripts)
1. **Load sequence:** the wordmark rises 110svh and un-rotates from −15°. The mascot column follows 0.4s later from −8°. At 2.4s the Talk Lottie replaces the Jumping one and the bubble pops in (`back.out(1.7)`).
2. **Bubble text:** words pop in every 40ms (80ms pop). Each line holds for 4.2s with a 0.3s fade, cycles through the four languages and pauses when off-screen.
3. **Hero scroll (scrubbed):** the wordmark moves −18rem; the bubble moves −10rem and shrinks to 0.5.
4. **Header:** the banner collapses (0.3s) and the navbar fades to white (0.2s) while the logo drops in (0.5s outCubic).
5. **Logo grids:** rise in by 4rem with a 0.1s stagger, `back.out(1.7)`.
6. **Stat cards:** the number rises 24rem and un-rotates from 18° (1.2s outQuart); the label follows at 0.5s.
7. **Capability hover:** siblings fade to 0.25. The card scales from 0.5, rotates from −8° and rises 11% (0.5s outCubic). On exit it lifts −11% and fades.
8. **Differentiation:** steps activate inside the 60–65% viewport band (others fade to 0.25), and the media panes cross-fade (0.5s).
9. **Testimonials:** a port of the overlap-slider maths (spacing, local offset, scale/rotation, origin 75% centre), with arrow tweens at 0.55s `power4.out`.
10. **Footer:** the pop-up Lottie plays once over 5s after a 0.6s delay and rewinds when the footer leaves.
11. **Dropdowns:** the chevron flips (rotateX 180°) and the card scales from 0.92 and rises 1rem (0.5s outCubic). On mobile, links rise 15rem, CTAs follow, and the hamburger lines rotate ±45° on `cubic-bezier(.444,.014,.117,1.002)`.
12. **Continuous:** film grain (`steps(4)` jitter at 0.2s), the Eat loop and the three HIW loops (paused off-screen).
13. **Smooth scrolling:** Lenis with the reference settings (lerp 0.1, wheelMultiplier 0.7).
14. **Hovers:** buttons, nav underline, red case-study border, AI buttons (yellow, scale 1.06), arrows, social links.
15. **`prefers-reduced-motion`:** Lenis is off, Lotties hold a static frame, scroll and entrance animations are skipped, and the content shows in its final state.

## Assets requiring alternatives
None. All Lotties, logos, portraits, icons and fonts are the reference files (see `ASSETS.md`). The inline SVGs
(wordmark, AI icons, glyphs) were converted to React components.

## Known remaining differences
- **Video popup** loads the `youtube-nocookie` embed directly. The reference shows a "cookies needed" placeholder until the visitor consents through its consent manager, which isn't replicated.
- **Third-party scripts were deliberately left out:** cookie banner/preferences, Intellimize personalisation, analytics, HubSpot and Turnstile.
- **Footer mascot timing differs slightly.** The reference drives it with Webflow's Lottie-scrub action; the replica uses `goToAndPlay` with a speed matched to 5s.
- **Menu slide easing is approximated.** The mobile menu slide uses GSAP `power2.out` / `power1.inOut`, which approximates Webflow's nav easing (`ease-out-cubic` / `ease-in-out-quad`).
- **Lenis now drives ScrollTrigger.** It is synced through `gsap.ticker`, whereas the reference left that connection commented out. This doesn't change any visuals; it keeps the scrubbed hero animation smooth.

## Interactions that need a backend
- **Hero email form** (`src/lib/forms.ts`, `submitDemoRequest`): validation is real, but submission is an explicit
  placeholder that never reports success.
- **All "Demo Request" / "Request demo" / "Login" links** point at stuut.ai / the Stuut dashboard.

## Checks
- `npm run build`, `tsc --noEmit` and `eslint` are clean.
- `tools/smoke.mjs` on the production build passes 58/58 at 1920 / 1440 / 1280 / 1024 / 768 / 390 / 375:
  - no horizontal overflow
  - no broken images
  - Lotties render
  - no page console errors or warnings, and no failed first-party requests
  - dropdowns and the mobile menu work (including Escape to close)
  - consumer email domains are rejected
  - the form placeholder message appears
  - the video popup opens and closes (including Escape)
  - testimonial drag snaps
  - the reduced-motion pass shows final states
