// One-off: optimize Home-slideshow PNGs -> WebP for the hero slider.
// Keeps transparency, resizes tall bottles down, big file-size win.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const SRC = 'F:/Pst G Neeew Web Site Mcfuntain/McFuntain web/Home slideshow';
const OUT = 'F:/Pst G Neeew Web Site Mcfuntain/McFuntain web/mcfuntain-website/public/images/hero';

// chosen flagship slides: source-number -> output slug (new 2026-06-09 bottles, no flower frames)
const slides = [
  { n: 1, slug: 'longevity-30' },
  { n: 2, slug: 'womb-renewal' },
  { n: 3, slug: 'libido-support' },
  { n: 4, slug: 'glucose-balance' },
  { n: 5, slug: 'cogniboost' },
  { n: 6, slug: 'belly-fat-balance' },
];

await mkdir(OUT, { recursive: true });

for (const { n, slug } of slides) {
  const inPath = join(SRC, `${n}.png`);
  const outPath = join(OUT, `${slug}.webp`);
  const info = await sharp(inPath)
    .resize({ height: 1100, withoutEnlargement: true }) // bottles are tall; cap height
    .webp({ quality: 82, alphaQuality: 90, effort: 6 })
    .toFile(outPath);
  console.log(`${slug}.webp  ${(info.size / 1024).toFixed(0)} KB  ${info.width}x${info.height}`);
}
console.log('done');
