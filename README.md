# Tahsilet.AI website

Bilingual (Turkish / English) marketing site for Tahsilet.AI, an AI collections platform. It blends the
Stuut-derived design system (Hn + Quadrant Text fonts, bold blue/yellow/red, mascot Lotties, grain, GSAP motion)
with fullseam-style elements: warm paper background, blueprint hairlines, square-marker eyebrows, serif section
titles, product-UI mock panels, numbered steps, an FAQ accordion and a dark CTA panel. Copy comes from tahsilet.ai.

Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind v4 (tokens) + CSS Modules, GSAP 3.15
(ScrollTrigger, Draggable, Inertia), Lenis and lottie-web.

## Languages

- Routes: `/tr` and `/en`, both statically prerendered. `/` redirects using the browser's `Accept-Language`
  (Turkish by default) — see `src/proxy.ts`.
- All copy lives in `src/content/tr.ts` and `src/content/en.ts`, typed by `src/content/types.ts`. Edit text there;
  components never hard-code copy.
- The contact address (`contactEmail`) is used by the hero form, the CTA and the footer.

## Run

```bash
npm install
npm run dev          # http://localhost:3000/tr  (use `npm run dev -- -p 3123` if 3000 is taken)
npm run build && npm start
```

## Layout

```
src/app/[lang]/          root layout (fonts, metadata + hreflang, Lenis, grain) and the page (section order)
src/app/globals.css      base styles + shared primitives (page-container, section-title, blueprint, …)
src/styles/tokens.css    colour / paper / hairline / spacing / ease tokens
src/content/             tr.ts, en.ts, types.ts, index.ts (helpers: mailto, AI-assistant links)
src/proxy.ts             locale redirect for `/`
src/components/layout/   Header (+NavDropdown, language switch), Footer (+FooterMascot), AiLabel
src/components/sections/ Hero, References, Metrics, HowItWorks, ProductCapabilities, WhyTahsilet (+WhyMocks),
                         EatSection, TrustControl, Audience, Integrations, Faq, FinalCTA
src/components/animations/ LottiePlayer, MascotAnimation, ChatBubbleText, ScrollReveal
src/components/ui/       Button, Eyebrow, DemoForm
src/components/icons/    BrandWordmark (typographic "Tahsilet.AI"), AI-assistant + UI icons
public/assets/           Lotties (mascot), icons, images
```

## Forms

The hero form validates a work email (consumer domains rejected) and then opens a pre-filled email to
`contactEmail`. There is no backend; replace the hand-off in `src/components/ui/DemoForm.tsx` with an API call when
a CRM/form endpoint exists.

> Note: after editing `src/app/globals.css`, restart `next dev` if the change doesn't show up — the Tailwind
> Turbopack loader can serve a cached build of that file.

## Analysis & verification tooling

`tools/` is a separate Playwright workspace (`cd tools && npm install && npx playwright install chromium`):

| Script | Purpose |
|---|---|
| `outline.mjs <w> <h>` | DOM outline, runtime animation info, network log and screenshots of the reference |
| `computed.mjs` | computed styles of reference elements |
| `fetch-assets.py` | downloads the reference assets into `public/assets` (+ manifest) |
| `compare.mjs <w> <h> <url>` | ref vs local per-section side-by-sides, pixel diffs and height table |
| `interactions.mjs <url> <prefix>` | menu / dropdown / hover / slider / footer state captures |
| `smoke.mjs <baseUrl>` | functional smoke test of `/tr` + `/en` (redirects, overflow, images, console, menus, form, FAQ, slider, reduced motion) |
| `snapshot.mjs <url> <name>` | full-page screenshot + text/style sample of any site (used for tahsilet.ai / fullseam.com research) |

`analysis/INVENTORY.md` and `analysis/REPORT.md` document the original Stuut-replica baseline (`main` branch).
