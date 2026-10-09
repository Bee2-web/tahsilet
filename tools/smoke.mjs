// Usage: node smoke.mjs [url] — functional smoke test of the local build across viewports.
import { chromium } from 'playwright';
import { VIEWPORTS } from './lib.mjs';

const url = process.argv[2] ?? 'http://localhost:3124/';
const results = [];
const check = (name, ok, detail = '') => results.push({ name, ok, detail });

const browser = await chromium.launch();
for (const [width, height] of [...VIEWPORTS, [1280, 800], [375, 812]].filter((v, i, a) => a.findIndex((x) => x[0] === v[0]) === i)) {
  const context = await browser.newContext({ viewport: { width, height } });
  const page = await context.newPage();
  const problems = [];
  // Messages and requests from inside the third-party YouTube embed are not part of the page under test.
  const thirdParty = (u) => /youtube|ytimg|ggpht|gstatic|googleapis|doubleclick/.test(u || '');
  page.on('console', (m) => ['error', 'warning'].includes(m.type()) && !thirdParty(m.location().url) && problems.push(`${m.type()}: ${m.text().slice(0, 160)}`));
  page.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`));
  page.on('requestfailed', (r) => !thirdParty(r.url()) && problems.push(`requestfailed: ${r.url()}`));
  page.on('response', (r) => r.status() >= 400 && !thirdParty(r.url()) && problems.push(`HTTP ${r.status()}: ${r.url()}`));
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
  });
  await page.waitForTimeout(1200);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  check(`${width}: no horizontal overflow`, overflow <= 0, `scrollWidth - innerWidth = ${overflow}`);
  const broken = await page.evaluate(() => [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src));
  check(`${width}: no broken images`, broken.length === 0, broken.join(', '));
  const lotties = await page.evaluate(() => document.querySelectorAll('[aria-hidden="true"] > svg[preserveAspectRatio]').length);
  check(`${width}: lotties rendered`, lotties >= 3, `${lotties} lottie svgs`);

  if (width <= 991) {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    await page.click('button[aria-controls="main-menu"]');
    await page.waitForTimeout(900);
    const menuVisible = await page.isVisible('#main-menu >> text=Partnerships');
    await page.click('#main-menu button:has-text("Platform")');
    await page.waitForTimeout(400);
    const ddVisible = await page.isVisible('#main-menu >> text=Autonomous outreach that actually collects.');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(1000);
    const closed = !(await page.isVisible('#main-menu'));
    check(`${width}: mobile menu open/dropdown/close`, menuVisible && ddVisible && closed, `${menuVisible}/${ddVisible}/${closed}`);
  } else {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1200);
    await page.hover('#main-menu button:has-text("Learn")');
    await page.waitForTimeout(600);
    check(`${width}: Learn dropdown opens on hover`, await page.isVisible('text=Practical playbooks for order-to-cash.'));
  }

  // Form: consumer email rejected, work email reaches the (unconnected) placeholder handler.
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.fill('input[name="email"]', 'someone@gmail.com');
  await page.click('form button[type="submit"]');
  const msg = await page.$eval('input[name="email"]', (el) => el.validationMessage);
  check(`${width}: blocks consumer email`, msg === 'Please use your work email.', msg);
  await page.fill('input[name="email"]', 'cfo@acme-industrial.com');
  await page.click('form button[type="submit"]');
  await page.waitForTimeout(300);
  check(`${width}: placeholder submit reports not-connected`, await page.isVisible('text=isn’t connected to a backend'));

  // Video popup
  await page.click('button:has-text("Watch How It Works")');
  await page.waitForTimeout(900);
  const dialog = await page.isVisible('[role="dialog"] iframe');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(800);
  check(`${width}: video popup opens & closes`, dialog && !(await page.isVisible('[role="dialog"]')), String(dialog));

  if (width === 1440) {
    const slider = page.locator('[aria-roledescription="carousel"]');
    await slider.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const before = await page.$eval('[aria-roledescription="carousel"] [role="list"]', (el) => el.style.transform);
    const box = await slider.boundingBox();
    await page.mouse.move(box.x + 600, box.y + 200);
    await page.mouse.down();
    await page.mouse.move(box.x + 100, box.y + 200, { steps: 12 });
    await page.mouse.up();
    await page.waitForTimeout(1500);
    const after = await page.$eval('[aria-roledescription="carousel"] [role="list"]', (el) => el.style.transform);
    check('1440: testimonial drag moves & snaps', before !== after, `${before} -> ${after}`);
  }
  check(`${width}: clean console/network`, problems.length === 0, problems.slice(0, 6).join(' | '));
  await context.close();
}

// Reduced motion: content visible without animations.
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  const state = await page.evaluate(() => {
    const bubble = document.querySelector('img[src="/assets/images/bubble.svg"]').parentElement;
    const stat = [...document.querySelectorAll('div')].find((d) => d.textContent === '$3B+');
    return { bubble: getComputedStyle(bubble).opacity, statTransform: getComputedStyle(stat).transform, lenis: document.documentElement.classList.contains('lenis') };
  });
  check('reduced motion: bubble visible, stats static, no smooth scroll', state.bubble === '1' && state.statTransform === 'none' && !state.lenis, JSON.stringify(state));
  await context.close();
}
await browser.close();

for (const r of results) console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.ok || !r.detail ? '' : `  — ${r.detail}`}`);
console.log(`\n${results.filter((r) => r.ok).length}/${results.length} passed`);
