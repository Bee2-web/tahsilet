// Usage: node computed.mjs <width> <height> [--menu] <selector>...  — prints box + key computed styles from the reference.
import { openPage, REF_URL } from './lib.mjs';

const args = process.argv.slice(2);
const width = Number(args.shift());
const height = Number(args.shift());
const openMenu = args[0] === '--menu' ? (args.shift(), true) : false;
const { browser, page } = await openPage(REF_URL, { width, height });
await page.waitForTimeout(2600);
if (openMenu) {
  await page.click('.menu-button');
  await page.waitForTimeout(1500);
}
const props = ['display', 'position', 'fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'color', 'backgroundColor', 'padding', 'margin', 'gap', 'borderBottom', 'border', 'borderRadius', 'width', 'height', 'transform', 'opacity'];
for (const sel of args) {
  const res = await page.evaluate(({ sel, props }) => {
    const els = [...document.querySelectorAll(sel)].slice(0, 2);
    return els.map((el) => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return { box: [Math.round(r.x), Math.round(r.y + scrollY), Math.round(r.width), Math.round(r.height)].join(','), ...Object.fromEntries(props.map((p) => [p, cs[p]])) };
    });
  }, { sel, props });
  console.log(`\n## ${sel}`);
  for (const r of res) console.log(Object.entries(r).filter(([, v]) => v && v !== 'none' && v !== 'normal' && v !== '0px' && v !== 'auto').map(([k, v]) => `${k}: ${String(v).slice(0, 70)}`).join(' | '));
}
await browser.close();
