import { openPage } from './lib.mjs';
const OUT = '/private/tmp/claude-501/-Users-omar-Bee2AI-tahsilet/fd65073a-e713-41fa-8960-da84243ef1d2/scratchpad/logos/';
for (const [name, url] of Object.entries({ nalbantoglu: 'https://www.nalbantoglu.eu/', apesan: 'https://apesan.co/' })) {
  try {
    const { browser, page } = await openPage(url, { width: 1440, height: 900, block: false });
    await page.waitForTimeout(3000);
    const info = await page.evaluate(() => {
      const abs = (u) => { try { return new URL(u, location.href).href; } catch { return u; } };
      const c = [];
      document.querySelectorAll('img, svg').forEach((el) => {
        const r = el.getBoundingClientRect();
        const d = `${el.className?.baseVal ?? el.className} ${el.getAttribute('alt') ?? ''} ${el.getAttribute('src') ?? ''} ${el.closest('[class*=logo i],[id*=logo i],[class*=brand i],header,a[href="/"],a[href$=".eu/"],a[href$=".co/"]') ? 'CTX' : ''}`;
        if (/logo|brand|CTX/i.test(d) && r.width > 30 && r.top < 300) c.push({ tag: el.tagName, src: el.tagName === 'IMG' ? abs(el.currentSrc || el.src) : el.outerHTML.slice(0, 160), box: [r.x, r.y, r.width, r.height].map(Math.round), d: d.slice(0, 100) });
      });
      return { title: document.title, cands: c.slice(0, 6) };
    });
    console.log(`\n### ${name}\n${JSON.stringify(info, null, 1)}`);
    await page.screenshot({ path: `${OUT}${name}-header.png`, clip: { x: 0, y: 0, width: 1440, height: 260 } });
    await browser.close();
  } catch (e) { console.log(`\n### ${name} FAILED ${e.message.slice(0, 160)}`); }
}
