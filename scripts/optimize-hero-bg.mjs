// One-off: optimize hero background images (desktop + mobile) -> WebP.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const OUT = 'F:/Pst G Neeew Web Site Mcfuntain/McFuntain web/mcfuntain-website/public/images/hero';
await mkdir(OUT, { recursive: true });

const jobs = [
  {
    src: 'C:/Users/cbnot/Downloads/for slide show/New bk/to use/used/ChatGPT Image Jun 8, 2026, 02_47_49 PM (2).png',
    out: 'bg-desktop.webp',
    width: 1920,
  },
  {
    src: 'C:/Users/cbnot/Downloads/for slide show/New bk/to use/used/ChatGPT Image Jun 8, 2026, 02_47_52 PM (7).png',
    out: 'bg-mobile.webp',
    width: 1080,
  },
];

for (const { src, out, width } of jobs) {
  const outPath = join(OUT, out);
  const info = await sharp(src)
    .resize({ width, withoutEnlargement: false })
    .webp({ quality: 80, effort: 6 })
    .toFile(outPath);
  console.log(`${out}  ${(info.size / 1024).toFixed(0)} KB  ${info.width}x${info.height}`);
}
console.log('done');
