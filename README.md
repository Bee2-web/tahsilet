# Stuut.ai homepage replica

A close replica of the homepage at https://www.stuut.ai/, built with Next.js 16 (App Router), React 19, TypeScript,
Tailwind v4 (tokens and theme) plus CSS Modules, GSAP 3.15 (ScrollTrigger, Draggable, Inertia), Lenis and lottie-web.

## Run

```bash
npm install
npm run dev          # http://localhost:3000  (use `npm run dev -- -p 3123` if 3000 is taken)
npm run build && npm start
```

## Layout

```
src/app/                 layout (fonts, metadata, Lenis, grain), page (section order), globals.css
src/styles/tokens.css    colour/spacing/ease tokens + per-breakpoint spacing modes
src/content/home.ts      all verbatim copy, links, logo/testimonial data
src/lib/                 gsap registration, animation constants, Lenis access, media-query hook, form placeholder
src/components/layout/   Header (+NavDropdown), Footer (+FooterMascot, CurrentYear), AiLabel
src/components/sections/ Hero, TrustedBy, Metrics, ProductCapabilities, Differentiation, EatSection,
                         Testimonials, Integrations, FinalCTA
src/components/animations/ LottiePlayer, MascotAnimation, ChatBubbleText, ScrollReveal
src/components/ui/       Button, Eyebrow, CaseStudyLabel, DemoForm, VideoPopup
src/components/icons/    wordmark + icons generated from the reference SVGs
public/assets/           Lotties, logos, portraits, icons (sources in ASSETS.md)
src/fonts/               Hn (500/700/800) + Quadrant Text (400) woff2
```

Sizes, spacing and breakpoints (991 / 767 / 479px) mirror the reference stylesheet, so each component has its own
CSS Module. Shared primitives (`section`, `section-padding`, `page-container`, `h-x-large`, `txt-medium`) live in
`@layer components` in `globals.css`.

## Placeholders

- **Demo form** (`src/lib/forms.ts`): validates the email and rejects consumer domains exactly as the reference does,
  but `submitDemoRequest` is not connected to a backend. It always returns `not-connected`, and the UI says the
  request was not sent. Wire it to your CRM/form endpoint there.
- **Video popup**: the reference only loads the YouTube embed after cookie consent (ConsentPro). This build has no
  consent manager, so it loads the privacy-enhanced (`youtube-nocookie`) embed when the popup opens.
- Links to secondary pages point at the live stuut.ai URLs; those pages are out of scope.

## Analysis & verification tooling

`tools/` is a separate Playwright workspace (`cd tools && npm install && npx playwright install chromium`):

| Script | Purpose |
|---|---|
| `outline.mjs <w> <h>` | DOM outline, runtime animation info, network log and screenshots of the reference |
| `computed.mjs` | computed styles of reference elements |
| `fetch-assets.py` | downloads the reference assets into `public/assets` (+ manifest) |
| `compare.mjs <w> <h> <url>` | ref vs local per-section side-by-sides, pixel diffs and height table |
| `interactions.mjs <url> <prefix>` | menu / dropdown / hover / slider / footer state captures |
| `smoke.mjs <url>` | functional smoke test (overflow, images, console, menu, form, popup, slider, reduced motion) |

Findings are written up in `analysis/INVENTORY.md` (spec) and `analysis/REPORT.md` (results).
