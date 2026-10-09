// Usage: node compare.mjs [width] [height] [localUrl]
// Captures the reference and the local build at one viewport, then writes per-section
// side-by-side images (ref | local), pixel-diff percentages and a section height table.
import fs from 'node:fs';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { openPage, slowScroll, REF_URL } from './lib.mjs';

const width = Number(process.argv[2] ?? 1440);
const height = Number(process.argv[3] ?? 900);
const localUrl = process.argv[4] ?? 'http://localhost:3000/';
const out = new URL(`../analysis/compare/${width}/`, import.meta.url).pathname;
fs.mkdirSync(out, { recursive: true });

async function capture(url, label) {
  const { browser, page, consoleMsgs } = await openPage(url, { width, height });
  await page.waitForTimeout(3000);
  await slowScroll(page, 250, 90);
  // Freeze continuous effects so both captures are comparable.
  await page.addStyleTag({ content: '.noise-overlay,[class*="GrainOverlay-module"][class*="__noise"]{display:none!important}' });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1200);
  const sections = await page.evaluate(() =>
    [...document.querySelectorAll('main > *')].map((el) => {
      const r = el.getBoundingClientRect();
      return { tag: el.tagName.toLowerCase(), cls: String(el.className).slice(0, 40), y: Math.round(r.top + scrollY), h: Math.round(r.height) };
    }),
  );
  const file = `${out}${label}-full.png`;
  await page.screenshot({ path: file, fullPage: true });
  const docH = await page.evaluate(() => document.documentElement.scrollHeight);
  await browser.close();
  return { sections, png: PNG.sync.read(fs.readFileSync(file)), docH, consoleMsgs };
}

const [ref, local] = await Promise.all([capture(REF_URL, 'ref'), capture(localUrl, 'local')]);
console.log(`viewport ${width}x${height}  doc height ref=${ref.docH} local=${local.docH}`);
const n = Math.max(ref.sections.length, local.sections.length);
for (let i = 0; i < n; i++) {
  const a = ref.sections[i];
  const b = local.sections[i];
  if (!a || !b) {
    console.log(i, 'missing', a?.cls, b?.cls);
    continue;
  }
  const h = Math.min(a.h, b.h, a.y + a.h <= ref.png.height ? a.h : ref.png.height - a.y, local.png.height - b.y);
  const w = width;
  const ca = new PNG({ width: w, height: h });
  const cb = new PNG({ width: w, height: h });
  PNG.bitblt(ref.png, ca, 0, a.y, w, h, 0, 0);
  PNG.bitblt(local.png, cb, 0, b.y, w, h, 0, 0);
  const diff = new PNG({ width: w, height: h });
  const mismatch = pixelmatch(ca.data, cb.data, diff.data, w, h, { threshold: 0.15 });
  const side = new PNG({ width: w * 2 + 10, height: Math.max(a.h, b.h) });
  side.data.fill(255);
  PNG.bitblt(ref.png, side, 0, a.y, w, Math.min(a.h, ref.png.height - a.y), 0, 0);
  PNG.bitblt(local.png, side, 0, b.y, w, Math.min(b.h, local.png.height - b.y), w + 10, 0);
  const name = `${String(i).padStart(2, '0')}-${a.cls.split(' ').slice(-1)[0] || a.tag}`;
  fs.writeFileSync(`${out}${name}.png`, PNG.sync.write(side));
  fs.writeFileSync(`${out}${name}-diff.png`, PNG.sync.write(diff));
  console.log(
    `${name.padEnd(28)} ref y=${a.y} h=${a.h}  local y=${b.y} h=${b.h}  Δh=${b.h - a.h}  diff=${((mismatch / (w * h)) * 100).toFixed(1)}%`,
  );
}
const errors = local.consoleMsgs.filter((m) => /error|warn/i.test(m));
if (errors.length) console.log('local console:\n' + errors.join('\n'));
