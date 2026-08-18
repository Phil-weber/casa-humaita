/**
 * Gera public/textures/plaster.png — brief.md §3.
 *
 * Tile de 200x200, grao monocromatico, para uso como background-repeat a 3% de
 * opacidade sobre o branco. Referencia conceitual: reboco branco de parede.
 *
 * O tile precisa ser costurado (seamless): a rede de ruido de valor faz wrap-around
 * nos dois eixos, e 200 e divisivel por 25 e por 50, entao a lattice fecha exatamente
 * na borda. Sem blur — qualquer filtro espacial criaria emenda visivel na repeticao.
 *
 * NUNCA usar feTurbulence em runtime: recalcula por frame e mata o mobile (brief §3).
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SIZE = 200;
const OUT = path.resolve(import.meta.dirname, '..', 'public', 'textures', 'plaster.png');

/** PRNG com semente fixa: o tile e reproduzivel entre builds. */
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Ruido de valor numa lattice que da wrap — e isso que mantem o tile costurado. */
function valueNoise(cells, rand) {
  const g = Array.from({ length: cells }, () => Array.from({ length: cells }, rand));
  const at = (x, y) => g[((y % cells) + cells) % cells][((x % cells) + cells) % cells];
  const smooth = (t) => t * t * (3 - 2 * t); // smoothstep
  return (px, py) => {
    const fx = (px / SIZE) * cells;
    const fy = (py / SIZE) * cells;
    const x0 = Math.floor(fx), y0 = Math.floor(fy);
    const tx = smooth(fx - x0), ty = smooth(fy - y0);
    const a = at(x0, y0) * (1 - tx) + at(x0 + 1, y0) * tx;
    const b = at(x0, y0 + 1) * (1 - tx) + at(x0 + 1, y0 + 1) * tx;
    return a * (1 - ty) + b * ty;
  };
}

const rand = mulberry32(0x48554d41); // "HUMA"
const coarse = valueNoise(25, rand); // 8px por celula
const medium = valueNoise(50, rand); // 4px por celula

const buf = Buffer.alloc(SIZE * SIZE);
for (let y = 0; y < SIZE; y++) {
  for (let x = 0; x < SIZE; x++) {
    // Tres oitavas: duas de lattice (o corpo do reboco) e uma por pixel (o grao).
    const n = coarse(x, y) * 0.5 + medium(x, y) * 0.3 + rand() * 0.2;
    // Faixa 40..215 em torno de 128: a 3% sobre o branco isso rende um grao
    // discreto, entre #F8 e #FE, sem tingir o fundo.
    buf[y * SIZE + x] = Math.round(40 + n * 175);
  }
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
await sharp(buf, { raw: { width: SIZE, height: SIZE, channels: 1 } })
  // 8 niveis bastam: a 3% sobre o branco o grao ocupa ~6 valores de RGB no
  // resultado final, entao quantizar mais fino so aumentaria o arquivo.
  .png({ compressionLevel: 9, palette: true, colours: 8 })
  .toFile(OUT);

const kb = (fs.statSync(OUT).size / 1024).toFixed(1);
console.log(`plaster.png  ${SIZE}x${SIZE}  ${kb}KB  (seamless, 3 oitavas, semente fixa)`);
