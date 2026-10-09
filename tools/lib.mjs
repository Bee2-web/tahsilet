import { chromium } from 'playwright';

export const REF_URL = 'https://www.stuut.ai/';
export const VIEWPORTS = [
  [1920, 1080], [1440, 900], [1280, 800], [1024, 768], [768, 1024], [390, 844], [375, 812],
];
const BLOCKED = /consentpro\.com|intellimize\.co|googletagmanager|google-analytics|hotjar|hs-scripts|hubspot|clarity\.ms|linkedin|doubleclick|facebook/;

export async function openPage(url, { width = 1440, height = 900, reducedMotion = 'no-preference', block = true } = {}) {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
    reducedMotion,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36',
  });
  if (block) await context.route((url) => url.hostname !== 'localhost' && BLOCKED.test(url.hostname), (r) => r.abort());
  const page = await context.newPage();
  const consoleMsgs = [];
  page.on('console', (m) => consoleMsgs.push(`[${m.type()}] ${m.text()}`));
  page.on('pageerror', (e) => consoleMsgs.push(`[pageerror] ${e.message}`));
  await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 });
  await page.evaluate(() => document.fonts.ready);
  return { browser, context, page, consoleMsgs };
}

/** Scroll slowly through the page so lazy content and scroll triggers fire. */
export async function slowScroll(page, step = 300, delay = 120) {
  await page.evaluate(async ({ step, delay }) => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    let y = 0;
    while (y < document.documentElement.scrollHeight) {
      y += step;
      window.scrollTo(0, y);
      await sleep(delay);
    }
    await sleep(800);
    window.scrollTo(0, 0);
    await sleep(800);
  }, { step, delay });
}
