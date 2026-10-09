# Stuut.ai homepage — reference inventory

Captured 2026-10-09 from https://www.stuut.ai/ (Webflow site `6a071561c8d2a321a5d0a044`, page `…a030`).
Sources: rendered screenshots (`analysis/shots/`), DOM outlines (`analysis/outline.*.txt`), the site stylesheet
(`analysis/ref/home.css`, filtered to homepage classes), the inline behaviour scripts (`analysis/ref/inline-scripts.js`)
and the Webflow IX2/IX3 interaction config (`analysis/ref/ix2-home.json`).

## Stack observed
Webflow + GSAP 3.15 (ScrollTrigger, Draggable, InertiaPlugin, Observer) + Lenis (`lerp .1, wheelMultiplier .7`,
not connected to ScrollTrigger) + Webflow's bundled lottie-web (svg renderer). Third-party scripts excluded from the
replica: ConsentPro/Finsweet consent, Intellimize, GTM/GA, reb2b, HubSpot.

## Global tokens
| Token | Value |
|---|---|
| blue / light-blue / lighter-blue / lightest-blue | `#1665b5` / `#2f85db` / `#accef1` / `#d5e7f8` |
| grey / white / red / red-hover | `#e3e3e3` / `#fff` / `#d6380e` / `#b43513` |
| yellow / beige / green | `#f2f56f` / `#e6886e` / `#1db050` |
| radii | small .3rem, large .5rem, x-large 1rem |
| gutters | s 1rem, m 2rem, l 4rem, xl 6rem; page margin 2rem; max container 100rem |
| fonts | `Hn` 500/700/800 (headings/UI), `Quadrant Text` 400 (body, buttons) |
| body font-size | `1vw`; 14px between 992–1400px; 16px ≥1600px (em-based sizes depend on it) |
| breakpoints | ≤991 (tablet, nav collapses), ≤767, ≤479 |

Global effects: fixed film-grain overlay (`feTurbulence` baseFrequency .9, 4 octaves, desaturated; 200%×200%,
opacity .28, `steps(4)` 0.2s jitter keyframes); blue sections use a 2.9rem grid SVG with `background-attachment: fixed`.

## Sections (order)
1. **Fixed header** — red announcement banner ("Stuut raises a $52.5M Series B led by Insight Partners" →),
   navbar (logo hidden at top, links Case Studies / Platform▾ / Partnerships / Learn▾ / About, CTA "Demo Request"
   (yellow) + "Login" (blue)). Dropdowns: white card, 2 columns, icon tiles; 50%-blue page overlay.
2. **Hero** (grey, ≥100svh) — giant "Stuut Technologies" wordmark SVG; H1 "Your AR coworker for order-to-cash";
   body copy; "Watch How It Works" text button (opens YouTube popup); yellow email form ("Your Work Email" /
   "Request Demo"); mascot Lottie bottom-right with yellow speech bubble cycling EN/ES/IT/DE lines.
   Floating "Explore Stuut with AI" pill (ChatGPT, Perplexity, Claude, Grok, Gemini) fixed bottom-right.
3. **Trusted by** (grey) — "Stuut clocks in at the / world’s leading enterprises"; 6 logo cards (2 with "Case Study" tag).
4. **By the numbers** (red) — eyebrow; 3 yellow stat cards ($3B+ / 40% / 47%); callout "Live in 3 days. Cash flow in 7."
   straddling red→blue (half-blue background).
5. **Capabilities** (grey) — eyebrow "Everything from order to cash, handled"; 6 giant blue pill buttons
   (2 "Coming soon"), centered flex-wrap.
6. **What makes Stuut different** (blue grid) — eyebrow, "It used to take a village. Now it takes Stuut.";
   sticky left media (3 Lottie frames cross-fading) + right column of 3 steps (80vh each).
   Tablet/mobile: media sticky column hidden, a Lottie frame shows above each step.
7. **Eat** (yellow) — full-width Lottie of the mascot eating invoices.
8. **Testimonials** (blue grid) — eyebrow "WE’VE GOT THE RECEIPTS", prev/next arrows, 11 quote cards in an
   overlapping draggable slider.
9. **Integrations** (grey) — "A new coworker for your existing stack" + copy + 20 logos, 5 columns.
10. **CTA** (red) — "Let Stuut take it from here", copy, giant yellow "REQUEST DEMO" button.
11. **Footer** (blue) — two link rows, socials, © year, wordmark, investor line, pop-up mascot Lottie.

## Animation spec
| # | Element | Trigger | From → To | Duration / delay / ease |
|---|---|---|---|---|
| 1 | `.hero-logo-div` | page load | y 110svh, rot -15° → 0 | 1.0s outQuart (y), outCubic (rot) |
| 2 | hero copy column (`.load-1`)* | load | y 110svh, rot -10°, α0 → 0 | 1.0s, delay .2s; α .3s |
| 3 | `.home-lottie-div.load-2` | load | y 110svh, rot -8°, α0 → 0 | 1.0s, delay .4s; α .3s |
| 4 | mascot | load | Jumping-Loop (2.4s loop) → Talk-Loop (3.03s loop) | swap at ≈2.4s |
| 5 | `.bubble-div` | load | α0 scale .4 → α1 scale 1 | at ≈2.4s; scale .4s `swingTo`, α .3s |
| 6 | bubble text | 2.2s after load, visible only | words appended every 40ms with 80ms pop (scale .8→1.02→1, y 4px) | each line 4.2s incl. .3s fade; loops EN→ES→IT→DE |
| 7 | hero scroll | scroll 0→hero height (smoothing 65) | wordmark y 0→-18rem; bubble y 0→-10rem, scale 1→.5 | scrubbed |
| 8 | banner | scrollY > ~0.2vh / < ~0.15vh | height auto↔0, content α | .3s outCubic / inOutQuad |
| 9 | navbar | hero <61% visible | transparent → white bg + blue border; logo y -8rem → 0 | .2s; logo .5s outCubic (in) / .4s easeInOut (out) |
| 10 | AI label | load | α0 → 1 | .3s after 1.5s |
| 11 | logo cards (both grids) | top 96% | α0, y 4rem → 0, stagger .1 | GSAP default .5s, back.out(1.7) |
| 12 | stat cards | 20% in view | number y 24rem rot 18° → 0; label α0 y 2rem → 0 | 1.2s outQuart; label .7s delay .5s |
| 13 | capability hover | mouseenter | siblings α→.25 (.25s); yellow description card (fixed, centered) display flex, y 11%→0, scale .5→1, rot -8°→0, α→1 | .5s outCubic, α .3s |
| 14 | capability leave | mouseleave | card y→-11%, scale .5, rot -8°, α0 then hide | .5s ease |
| 15 | description card | mouse X (smoothing 88) | x -22vw → 22vw | continuous |
| 16 | description card | offer list scroll progress | y 45svh → -45svh | continuous |
| 17 | differentiation | step crosses viewport band (rootMargin -60% 0 -35%) | active step α1 (others .25); matching media pane α | .5s ease |
| 18 | testimonials | drag / arrows / ←→ keys / horizontal wheel | list x; passed cards x+=local, scale →.45, rot →-8°, origin 75% center | arrows .55s power4.out, inertia snap |
| 19 | footer | footer 20% in view | AI label x → 130% (.4s easeInOut); Pop-Up Lottie plays once over 5s after .6s | out: label back .6s outCubic, Lottie reset |
| 20 | dropdown | hover | arrow rot 180° (.3s); card y 1rem→0, scale .92→1, α (.5s outCubic); overlay α | close .3s |
| 21 | mobile menu | burger | menu slides from top (.65s ease-out-cubic); lines rotate ±45° (.7s cubic-bezier(.444,.014,.117,1.002)); links y 15rem→0 (.75s outCubic); CTAs y 15rem α0 → (.7s, delay .1s) | close reverses |
| 22 | video popup | "Watch How It Works" | bg α .3s, wrapper scale .8→1 α (.5s back.out(1.7)) | Esc/overlay/close |
| — | hovers (CSS) | | buttons swap yellow↔blue (.25s); nav link underline; logo-card-link border red; AI items yellow + scale 1.06 (.2s); arrows border yellow | |
| — | continuous | | grain jitter; Eat Lottie (2.1s loop); 3 HIW Lotties loop | |

*`.load-1` is not present on the homepage DOM, so only the wordmark and mascot column animate in.

## Responsive notes
- ≤991: burger menu (yellow full-screen panel, 1.8rem links with blue bottom borders, stacked CTAs);
  hero mascot block moves above the headline (relative, 34svh); stats 4rem numbers; capability pills 3rem;
  description cards disabled; differentiation becomes a stack with media above each step.
- ≤767: stats stack; logo grids 2 columns (customers, flex) / 3 columns (integrations); AI label hidden;
  quote cards 90vw; Eat Lottie 150% wide offset -50%.
- ≤479: form stacks; numbers 6rem; capability pills 2rem.
- 992–1160: logo grids forced to 3 columns.
