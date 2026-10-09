// Usage: node localize-lottie.mjs <word> <out.json>
// Replaces the outlined "Invoice" lettering on each invoice in stuut-eat.json with <word>, set in Hn
// (the same face as the original lettering), centred on the original word and sitting on its baseline.
import fs from 'node:fs';
import opentype from 'opentype.js';
import wawoff2 from 'wawoff2';

const [word = 'Fatura', outName = 'stuut-eat-tr.json'] = process.argv.slice(2);
const LOTTIE_DIR = new URL('../public/assets/lottie/', import.meta.url).pathname;
const FONT_DIR = new URL('../src/fonts/', import.meta.url).pathname;

// Geometry of the original word, measured from the "I" bar and the outermost glyphs (layer units).
const CAP_HEIGHT = 23.43;
const BASELINE_Y = -14.762 + CAP_HEIGHT / 2;
const STEM_RATIO = 4.87 / CAP_HEIGHT;
const CENTER_X = (-49.1 + 48.3) / 2;
const COLOR = [0.086274509804, 0.396078431373, 0.709803921569, 1];

async function loadFont(name) {
  // Copy out of the decoder's WebAssembly memory before the next call reuses it.
  const buf = Uint8Array.from(await wawoff2.decompress(fs.readFileSync(`${FONT_DIR}${name}.woff2`)));
  return opentype.parse(buf.buffer);
}

// Pick the Hn weight whose "I" stem/cap ratio is closest to the original lettering (decoded sequentially).
const candidates = [];
for (const name of ['Hn-Medium', 'Hn-Bold', 'Hn-ExtraBold']) {
  const font = await loadFont(name);
  const bb = font.charToGlyph('I').getBoundingBox();
  candidates.push({ name, font, diff: Math.abs((bb.x2 - bb.x1) / font.tables.os2.sCapHeight - STEM_RATIO) });
}
const { name: fontName, font } = candidates.sort((a, b) => a.diff - b.diff)[0];
const fontSize = (CAP_HEIGHT / font.tables.os2.sCapHeight) * font.unitsPerEm;

// Lay the word out, then centre it horizontally on the original word.
// The original lettering is tracked slightly tight.
const layout = { letterSpacing: -0.035, kerning: true };
const probe = font.getPath(word, 0, 0, fontSize, layout).getBoundingBox();
const offsetX = CENTER_X - (probe.x1 + probe.x2) / 2;
const path = font.getPath(word, offsetX, BASELINE_Y, fontSize, layout);

// opentype commands → Lottie bezier contours (vertices with relative in/out tangents).
const contours = [];
let cur = null;
let last = null;
for (const c of path.commands) {
  if (c.type === 'M') {
    cur = { v: [[c.x, c.y]], i: [[0, 0]], o: [[0, 0]] };
    contours.push(cur);
  } else if (c.type === 'L') {
    cur.v.push([c.x, c.y]);
    cur.i.push([0, 0]);
    cur.o.push([0, 0]);
  } else if (c.type === 'C' || c.type === 'Q') {
    const [c1x, c1y, c2x, c2y] =
      c.type === 'C'
        ? [c.x1, c.y1, c.x2, c.y2]
        : [last[0] + (2 / 3) * (c.x1 - last[0]), last[1] + (2 / 3) * (c.y1 - last[1]), c.x + (2 / 3) * (c.x1 - c.x), c.y + (2 / 3) * (c.y1 - c.y)];
    cur.o[cur.o.length - 1] = [c1x - last[0], c1y - last[1]];
    cur.v.push([c.x, c.y]);
    cur.i.push([c2x - c.x, c2y - c.y]);
    cur.o.push([0, 0]);
  } else if (c.type === 'Z' && cur.v.length > 1) {
    // Fold a duplicated closing vertex back onto the first one.
    const a = cur.v[0];
    const b = cur.v[cur.v.length - 1];
    if (Math.hypot(a[0] - b[0], a[1] - b[1]) < 1e-6) {
      cur.i[0] = cur.i.pop();
      cur.v.pop();
      cur.o.pop();
    }
  }
  if ('x' in c) last = [c.x, c.y];
}

const round = (n) => Math.round(n * 1000) / 1000;
const toLottie = (pts) => pts.map(([x, y]) => [round(x), round(y)]);
const tr = { ty: 'tr', p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 }, sk: { a: 0, k: 0 }, sa: { a: 0, k: 0 }, nm: 'Transform' };
const wordGroup = {
  ty: 'gr',
  nm: `Word ${word}`,
  it: [
    ...contours.map((ct, idx) => ({ ty: 'sh', nm: `Contour ${idx + 1}`, ks: { a: 0, k: { c: true, v: toLottie(ct.v), i: toLottie(ct.i), o: toLottie(ct.o) } } })),
    // Even-odd fill so counters (a, e…) stay open.
    { ty: 'fl', nm: 'Fill 1', c: { a: 0, k: COLOR }, o: { a: 0, k: 100 }, r: 2 },
    tr,
  ],
};

const data = JSON.parse(fs.readFileSync(`${LOTTIE_DIR}stuut-eat.json`, 'utf8'));
let replaced = 0;
for (const layer of data.layers) {
  if (layer.ty !== 4 || !/^Group( \d+)?$/.test(layer.nm)) continue;
  const idx = layer.shapes.findIndex((s) => s.nm === 'Group 1' && s.ty === 'gr');
  if (idx === -1) continue;
  layer.shapes[idx] = structuredClone(wordGroup);
  replaced++;
}
fs.writeFileSync(`${LOTTIE_DIR}${outName}`, JSON.stringify(data));
console.log(`"${word}" set in ${fontName} at ${round(fontSize)}u, ${contours.length} contours, replaced on ${replaced} invoices -> ${outName}`);
