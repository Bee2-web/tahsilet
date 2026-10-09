// Usage: node snapshot.mjs <url> <name> [width] [height] — full-page screenshot + visible text + style sample of any site.
import fs from 'node:fs';
import { openPage, slowScroll } from './lib.mjs';

const [url, name, w = '1440', h = '900'] = process.argv.slice(2);
const out = new URL(`../analysis/sources/${name}/`, import.meta.url).pathname;
fs.mkdirSync(out, { recursive: true });
const { browser, page } = await openPage(url, { width: Number(w), height: Number(h) });
await page.waitForTimeout(2500);
await slowScroll(page, 300, 120);
await page.waitForTimeout(1000);
await page.screenshot({ path: `${out}full-${w}.png`, fullPage: true });
const data = await page.evaluate(() => {
  const text = document.body.innerText;
  const sample = (sel) => [...document.querySelectorAll(sel)].slice(0, 6).map((el) => {
    const cs = getComputedStyle(el);
    return `${el.tagName} "${el.innerText.trim().slice(0, 50)}" | ${cs.fontFamily.slice(0, 50)} ${cs.fontSize}/${cs.lineHeight} w${cs.fontWeight} ls${cs.letterSpacing} color ${cs.color}`;
  });
  const bgs = [...new Set([...document.querySelectorAll('section, header, footer, main > div, body')].map((el) => getComputedStyle(el).backgroundColor))].slice(0, 20);
  return { title: document.title, lang: document.documentElement.lang, text, h1: sample('h1'), h2: sample('h2'), h3: sample('h3'), p: sample('p'), buttons: sample('a[class*=button], button, .btn'), bgs, height: document.documentElement.scrollHeight };
});
fs.writeFileSync(`${out}text-${w}.txt`, data.text);
fs.writeFileSync(`${out}styles-${w}.json`, JSON.stringify({ ...data, text: undefined }, null, 2));
console.log(name, w, 'height', data.height, 'title', data.title, 'lang', data.lang);
await browser.close();
