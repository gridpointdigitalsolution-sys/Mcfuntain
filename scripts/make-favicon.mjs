import sharp from 'sharp';
import fs from 'fs';

const SRC = 'public/images/brand/logo-dark.png';   // transparent, 3375x3375
const NAVY = { r: 21, g: 35, b: 63, alpha: 1 };      // #15233F brand navy

// Emblem crop (gold M + blue chalice), excludes the text below.
const crop = { left: 900, top: 430, width: 1575, height: 1575 };

async function emblem(size, pad) {
  const inner = Math.round(size * (1 - pad * 2));
  const mark = await sharp(SRC)
    .extract(crop)
    .resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  const off = Math.round(size * pad);
  return sharp({ create: { width: size, height: size, channels: 4, background: NAVY } })
    .composite([{ input: mark, top: off, left: off }])
    .png()
    .toBuffer();
}

function roundedMask(size, radius) {
  return Buffer.from(
    `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="#fff"/></svg>`
  );
}

async function roundedTile(size, pad, radius) {
  const base = await emblem(size, pad);
  const mask = await sharp(roundedMask(size, radius)).png().toBuffer();
  return sharp(base).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();
}

const icon512 = await roundedTile(512, 0.16, 96);
fs.writeFileSync('src/app/icon.png', icon512);

const apple = await roundedTile(180, 0.14, 38);
fs.writeFileSync('src/app/apple-icon.png', apple);

// favicon.ico: embed a 48x48 PNG inside an ICO container (modern browsers OK).
const png48 = await emblem(48, 0.12);
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
const dir = Buffer.alloc(16);
dir.writeUInt8(48, 0); dir.writeUInt8(48, 1);
dir.writeUInt16LE(1, 4); dir.writeUInt16LE(32, 6);
dir.writeUInt32LE(png48.length, 8); dir.writeUInt32LE(6 + 16, 12);
fs.writeFileSync('src/app/favicon.ico', Buffer.concat([header, dir, png48]));

console.log('OK icon.png', icon512.length, 'apple', apple.length, 'ico', 6 + 16 + png48.length);
