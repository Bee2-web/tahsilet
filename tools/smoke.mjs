// Usage: node smoke.mjs [baseUrl] — functional smoke test of the Tahsilet site (both locales, several viewports).
import { chromium } from 'playwright';

const base = (process.argv[2] ?? 'http://localhost:3124').replace(/\/$/, '');
const results = [];
const check = (name, ok, detail = '') => results.push({ name, ok, detail });

const LOCALES = {
  tr: { product: 'Ürün', productItem: 'Alacaklarınızı sizin adınıza takip eden AI ajanı.', blocked: 'Lütfen şirket e-posta adresinizi kullanın.', switchTo: 'EN', faq: 'Müşterilerimle hangi kanallardan iletişim kuruyor?', next: 'Sonraki' },
  en: { product: 'Product', productItem: 'An AI agent that follows up on receivables for you.', blocked: 'Please use your company email address.', switchTo: 'TR', faq: 'Which channels does it use to reach my customers?', next: 'Next' },
};
const VIEWPORTS = [[1920, 1080], [1440, 900], [1024, 768], [768, 1024], [390, 844], [375, 812]];

const browser = await chromium.launch();

// Root redirect honours Accept-Language.
for (const [lang, header] of [['tr', 'tr-TR,tr;q=0.9'], ['en', 'en-US,en;q=0.9']]) {
  const ctx = await browser.newContext({ extraHTTPHeaders: { 'accept-language': header } });
  const page = await ctx.newPage();
  await page.goto(`${base}/`);
  check(`/ redirects to /${lang} for ${header.split(',')[0]}`, new URL(page.url()).pathname === `/${lang}`, page.url());
  await ctx.close();
}

for (const [lang, t] of Object.entries(LOCALES)) {
  for (const [width, height] of VIEWPORTS) {
    const context = await browser.newContext({ viewport: { width, height } });
    const page = await context.newPage();
    const problems = [];
    page.on('console', (m) => ['error', 'warning'].includes(m.type()) && problems.push(`${m.type()}: ${m.text().slice(0, 160)}`));
    page.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`));
    page.on('requestfailed', (r) => problems.push(`requestfailed: ${r.url()}`));
    page.on('response', (r) => r.status() >= 400 && problems.push(`HTTP ${r.status()}: ${r.url()}`));
    await page.goto(`${base}/${lang}`, { waitUntil: 'networkidle' });
    const tag = `${lang} ${width}`;
    check(`${tag}: <html lang>`, (await page.getAttribute('html', 'lang')) === lang);

    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += 400) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 50));
      }
    });
    await page.waitForTimeout(1000);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    check(`${tag}: no horizontal overflow`, overflow <= 0, `overflow ${overflow}px`);
    const broken = await page.evaluate(() => [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src));
    check(`${tag}: no broken images`, broken.length === 0, broken.join(', '));
    const lotties = await page.evaluate(() => document.querySelectorAll('[aria-hidden="true"] > svg[preserveAspectRatio]').length);
    check(`${tag}: mascot lotties rendered`, lotties >= 3, `${lotties}`);
    const leftovers = await page.evaluate(() => /stuut/i.test(document.body.innerText));
    check(`${tag}: no leftover "Stuut" text`, !leftovers);

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1200);
    if (width <= 991) {
      await page.click('button[aria-controls="main-menu"]');
      await page.waitForTimeout(900);
      await page.click(`#main-menu button:has-text("${t.product}")`);
      await page.waitForTimeout(400);
      const dd = await page.isVisible(`#main-menu >> text=${t.productItem}`);
      await page.keyboard.press('Escape');
      await page.waitForTimeout(1000);
      check(`${tag}: mobile menu + dropdown`, dd && !(await page.isVisible('#main-menu')), String(dd));
    } else {
      await page.hover(`#main-menu button:has-text("${t.product}")`);
      await page.waitForTimeout(600);
      check(`${tag}: product dropdown on hover`, await page.isVisible(`text=${t.productItem}`));
      await page.mouse.move(10, 600);
    }

    // Work-email validation (no submission happens for blocked domains).
    await page.fill('input[name="email"]', 'someone@gmail.com');
    await page.click('form button[type="submit"]');
    const msg = await page.$eval('input[name="email"]', (el) => el.validationMessage);
    check(`${tag}: blocks consumer email`, msg === t.blocked, msg);

    // FAQ accordion toggles.
    const faq = page.locator(`button:has-text("${t.faq}")`);
    await faq.scrollIntoViewIfNeeded();
    await faq.click();
    await page.waitForTimeout(500);
    check(`${tag}: FAQ opens`, (await faq.getAttribute('aria-expanded')) === 'true');

    // Language switch link points to the other locale.
    const switchHref = await page.getAttribute(`#main-menu a[hreflang="${t.switchTo.toLowerCase()}"]`, 'href');
    check(`${tag}: language switch`, switchHref === `/${t.switchTo.toLowerCase()}`, switchHref);

    if (width === 1440) {
      const list = page.locator('[aria-roledescription="carousel"] [role="list"]');
      await list.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      const before = await list.evaluate((el) => el.style.transform);
      await page.click(`button[aria-label="${t.next}"]`);
      await page.waitForTimeout(900);
      const after = await list.evaluate((el) => el.style.transform);
      check(`${tag}: trust slider advances`, before !== after, `${before} -> ${after}`);
    }
    check(`${tag}: clean console/network`, problems.length === 0, problems.slice(0, 5).join(' | '));
    await context.close();
  }
}

// Reduced motion renders final states.
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto(`${base}/tr`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  const state = await page.evaluate(() => ({
    bubble: getComputedStyle(document.querySelector('img[src="/assets/images/bubble.svg"]').parentElement).opacity,
    lenis: document.documentElement.classList.contains('lenis'),
  }));
  check('reduced motion: bubble visible, no smooth scroll', state.bubble === '1' && !state.lenis, JSON.stringify(state));
  await context.close();
}
await browser.close();

for (const r of results) console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.ok || !r.detail ? '' : `  — ${r.detail}`}`);
console.log(`\n${results.filter((r) => r.ok).length}/${results.length} passed`);
