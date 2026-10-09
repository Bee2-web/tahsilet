// Usage: node outline.mjs [width] [height] — dumps DOM outline, assets, runtime animation info and a full-page screenshot.
import fs from 'node:fs';
import { openPage, slowScroll, REF_URL } from './lib.mjs';

const width = Number(process.argv[2] ?? 1440);
const height = Number(process.argv[3] ?? 900);
const out = new URL('../analysis/', import.meta.url).pathname;
fs.mkdirSync(`${out}shots`, { recursive: true });

const { browser, page, consoleMsgs } = await openPage(REF_URL, { width, height });
const responses = [];
page.on('response', (r) => responses.push({ url: r.url(), status: r.status(), type: r.request().resourceType() }));
await slowScroll(page);
await page.waitForTimeout(1500);

const outline = await page.evaluate(() => {
  const lines = [];
  const walk = (el, depth) => {
    if (depth > 9) return;
    const cs = getComputedStyle(el);
    if (cs.display === 'none') return;
    const r = el.getBoundingClientRect();
    const cls = (el.getAttribute('class') || '').trim().replace(/\s+/g, '.');
    const own = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join(' ').trim();
    const extra = [];
    if (el.tagName === 'IMG') extra.push(`src=${(el.currentSrc || el.src).split('/').pop()}`);
    if (el.tagName === 'A') extra.push(`href=${el.getAttribute('href')}`);
    if (el.dataset && Object.keys(el.dataset).length) extra.push(`data=${JSON.stringify(el.dataset)}`);
    lines.push(`${'  '.repeat(depth)}<${el.tagName.toLowerCase()}${cls ? '.' + cls : ''}> [${Math.round(r.x)},${Math.round(r.y + scrollY)} ${Math.round(r.width)}x${Math.round(r.height)}]${extra.length ? ' ' + extra.join(' ') : ''}${own ? ' "' + own.slice(0, 160) + '"' : ''}`);
    if (['svg', 'script', 'style'].includes(el.tagName.toLowerCase())) return;
    for (const c of el.children) walk(c, depth + 1);
  };
  walk(document.body, 0);
  return lines.join('\n');
});
fs.writeFileSync(`${out}outline.${width}.txt`, outline);

const runtime = await page.evaluate(() => {
  const info = {};
  const safe = (o, n = 400) => {
    const seen = new WeakSet();
    try {
      return JSON.stringify(o ?? {}, (k, v) => {
        if (k.startsWith('_') || k === 'parent' || k === 'scrollTrigger') return undefined;
        if (v instanceof Element) return `${v.tagName}.${v.className}`;
        if (typeof v === 'function') return 'fn';
        if (v && typeof v === 'object') { if (seen.has(v)) return '[circ]'; seen.add(v); }
        return v;
      }).slice(0, n);
    } catch (e) { return String(e); }
  };
  const ST = window.ScrollTrigger;
  if (ST) {
    info.scrollTriggers = ST.getAll().map((t) => ({
      trigger: t.trigger ? (t.trigger.className || t.trigger.tagName) : null,
      start: t.start, end: t.end, pin: !!t.pin, pinTarget: t.pin ? t.pin.className : null,
      scrub: t.vars.scrub ?? null, toggleActions: t.vars.toggleActions ?? null,
      startVar: String(t.vars.start ?? ''), endVar: String(t.vars.end ?? ''), once: !!t.vars.once,
      anim: t.animation ? { duration: t.animation.duration(), targets: (t.animation.getChildren ? t.animation.getChildren(true, true, false).flatMap((c) => c.targets?.() ?? []) : t.animation.targets?.() ?? []).slice(0, 6).map((e) => e.className || e.tagName || String(e)), vars: safe(t.animation.vars) } : null,
    }));
  }
  if (window.gsap) {
    info.globalTweens = window.gsap.globalTimeline.getChildren(true, true, true).slice(0, 120).map((t) => ({
      type: t.constructor.name || (t.getChildren ? 'Timeline' : 'Tween'), duration: t.duration(), delay: t.delay(), repeat: t.repeat(), yoyo: t.yoyo?.(),
      ease: t.vars?.ease ? String(t.vars.ease) : null,
      targets: (t.targets?.() ?? []).slice(0, 4).map((e) => (e instanceof Element ? `${e.tagName}.${e.className}` : String(e))),
      vars: safe(t.vars, 300),
    }));
  }
  if (window.lottie?.getRegisteredAnimations) {
    info.lotties = window.lottie.getRegisteredAnimations().map((a) => ({
      name: a.animationData?.nm, path: a.path, file: a.fileName, loop: a.loop, autoplay: a.autoplay, frames: a.totalFrames, fr: a.frameRate,
      w: a.animationData?.w, h: a.animationData?.h, renderer: a.renderer?.rendererType, wrapper: a.wrapper?.className, isPaused: a.isPaused,
    }));
  }
  info.lenis = !!(window.lenis || window.Lenis);
  if (window.lenis) info.lenisOpts = safe(Object.fromEntries(Object.entries(window.lenis.options).filter(([k, v]) => v !== window && !(v instanceof Element))), 800);
  return info;
});
fs.writeFileSync(`${out}runtime.${width}.json`, JSON.stringify(runtime, null, 2));
fs.writeFileSync(`${out}network.${width}.json`, JSON.stringify(responses, null, 2));
fs.writeFileSync(`${out}console.${width}.txt`, consoleMsgs.join('\n'));

await page.screenshot({ path: `${out}shots/ref-full-${width}.png`, fullPage: true });
await page.screenshot({ path: `${out}shots/ref-top-${width}.png` });
console.log('done', width, 'height', await page.evaluate(() => document.documentElement.scrollHeight));
await browser.close();
