// Usage: node interactions.mjs [url] [prefix] — captures menu/dropdown/hover/scroll states for comparison.
import fs from 'node:fs';
import { openPage, REF_URL } from './lib.mjs';

const url = process.argv[2] ?? REF_URL;
const prefix = process.argv[3] ?? 'ref';
const out = new URL('../analysis/shots/states/', import.meta.url).pathname;
fs.mkdirSync(out, { recursive: true });
const LOCAL = !url.includes('stuut.ai');
const mod = (m, c) => `[class*="${m}-module"][class*="__${c}"]`;
const S = LOCAL
  ? {
      menu: 'button[aria-controls="main-menu"]',
      dd: mod('NavDropdown', 'dropdown'),
      stats: mod('Metrics', 'stats'),
      offerWrap: mod('ProductCapabilities', 'wrap'),
      offerButton: mod('ProductCapabilities', 'button'),
      slider: mod('Testimonials', 'wrap'),
      next: 'button[aria-label="Next testimonial"]',
    }
  : {
      menu: '.menu-button',
      dd: '.dd-2',
      stats: '.stats-div',
      offerWrap: '.offer-wrap',
      offerButton: '.offer-button',
      slider: '.overlapping-slider__wrap',
      next: '[data-overlap-slider-button="next"]',
    };
const shot = (page, name) => page.screenshot({ path: `${out}${prefix}-${name}.png` });

// Mobile menu
{
  const { browser, page } = await openPage(url, { width: 390, height: 844 });
  await page.waitForTimeout(3000);
  await page.click(S.menu);
  for (const t of [120, 350, 1200]) {
    await page.waitForTimeout(t === 120 ? 120 : t - 120);
    await shot(page, `menu-390-${t}`);
  }
  await page.click(S.menu);
  await page.waitForTimeout(1200);
  await shot(page, 'menu-390-closed');
  await browser.close();
}

// Desktop dropdowns, hovers and scroll states
{
  const { browser, page } = await openPage(url, { width: 1440, height: 900 });
  await page.waitForTimeout(500);
  await shot(page, 'hero-0500');
  await page.waitForTimeout(1500);
  await shot(page, 'hero-2000');
  await page.waitForTimeout(1500);
  await shot(page, 'hero-3500');
  await page.hover(`${S.dd} >> nth=0`);
  await page.waitForTimeout(700);
  await shot(page, 'dd-platform');
  await page.hover(`${S.dd} >> nth=1`);
  await page.waitForTimeout(700);
  await shot(page, 'dd-learn');
  await page.mouse.move(200, 600);
  await page.waitForTimeout(600);
  for (const y of [150, 400, 700]) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(900);
    await shot(page, `scroll-${y}`);
  }
  // stats & offers
  await page.evaluate((sel) => document.querySelector(sel).scrollIntoView({ block: 'center' }), S.stats);
  await page.waitForTimeout(400);
  await shot(page, 'stats-0400');
  await page.waitForTimeout(1400);
  await shot(page, 'stats-1800');
  await page.evaluate((sel) => document.querySelector(sel).scrollIntoView({ block: 'center' }), S.offerWrap);
  await page.waitForTimeout(900);
  const btn = await page.$(`${S.offerButton} >> nth=1`);
  const box = await btn.boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 });
  await page.waitForTimeout(700);
  await shot(page, 'offer-hover');
  await page.mouse.move(1300, box.y + box.height / 2, { steps: 4 });
  await page.waitForTimeout(400);
  await page.mouse.move(40, 120, { steps: 2 });
  await page.waitForTimeout(800);
  // testimonials next
  await page.evaluate((sel) => document.querySelector(sel).scrollIntoView({ block: 'center' }), S.slider);
  await page.waitForTimeout(900);
  await page.click(S.next);
  await page.waitForTimeout(250);
  await shot(page, 'slider-next-0250');
  await page.waitForTimeout(700);
  await shot(page, 'slider-next-0950');
  // footer
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(2500);
  await shot(page, 'footer-2500');
  await page.waitForTimeout(4000);
  await shot(page, 'footer-6500');
  await browser.close();
}
console.log('done');
