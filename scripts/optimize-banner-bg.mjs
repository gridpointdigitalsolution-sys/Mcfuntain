// Fetch dark tropical leaves photo (Unsplash free license), convert to webp for PremiumOfferBanner bg.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

const OUT = 'F:/Pst G Neeew Web Site Mcfuntain/McFuntain web/mcfuntain-website/public/images/banner/leaves-bg.webp';
const SRC = 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=2000&q=85&fm=jpg&auto=format';

console.log('Fetching:', SRC);
const res = await fetch(SRC);
if (!res.ok) throw new Error(`HTTP ${res.status}`);
const buf = Buffer.from(await res.arrayBuffer());
console.log(`Downloaded ${(buf.length / 1024).toFixed(0)} KB`);

await mkdir(dirname(OUT), { recursive: true });

const info = await sharp(buf)
  .resize({ width: 1800, withoutEnlargement: true })
  .modulate({ brightness: 0.95, saturation: 1.05 })
  .webp({ quality: 78, effort: 6 })
  .toFile(OUT);

console.log(`leaves-bg.webp  ${(info.size / 1024).toFixed(0)} KB  ${info.width}x${info.height}`);
