// Usage: node montage.mjs <in.png> <out.png> <sliceHeight> [startY] [count] [gap]
// Cuts a tall screenshot into vertical slices and lays them side by side for review.
import fs from 'node:fs';
import { PNG } from 'pngjs';

const [input, output, sliceArg, startArg = '0', countArg = '0', gapArg = '12'] = process.argv.slice(2);
const src = PNG.sync.read(fs.readFileSync(input));
const sliceH = Number(sliceArg);
const startY = Number(startArg);
const gap = Number(gapArg);
const maxCount = Math.ceil((src.height - startY) / sliceH);
const count = Math.min(Number(countArg) || maxCount, maxCount);

const out = new PNG({ width: count * src.width + (count - 1) * gap, height: sliceH });
out.data.fill(255);
for (let i = 0; i < count; i++) {
  const y0 = startY + i * sliceH;
  const h = Math.min(sliceH, src.height - y0);
  PNG.bitblt(src, out, 0, y0, src.width, h, i * (src.width + gap), 0);
}
fs.writeFileSync(output, PNG.sync.write(out));
console.log(`${count} slices -> ${output}`);
