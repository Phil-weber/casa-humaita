/**
 * Gera as fontes self-hosted em woff2, com subset latino.
 *
 * Newsreader  — variavel 200..700, roman + italico. Origem: reference/ (zip aprovado pelo cliente).
 * Jost        — variavel 100..900. Origem: repositorio oficial google/fonts, licenca OFL.
 *
 * O subset cobre pt-BR, en e es. Os eixos variaveis sao preservados: o brief usa
 * Newsreader em 300/400 e Jost em 500, e a pagina precisa dos dois no mesmo arquivo.
 */
import fs from 'node:fs';
import path from 'node:path';
import subsetFont from 'subset-font';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'public', 'fonts');

/** Caracteres cobertos. Basico + Latin-1 + os sinais que o site usa de fato. */
const CHARS = [
  // ASCII imprimivel
  ...Array.from({ length: 0x7e - 0x20 + 1 }, (_, i) => String.fromCharCode(0x20 + i)),
  // Latin-1 Supplement: acentuacao de pt/es/fr
  ...Array.from({ length: 0xff - 0xa0 + 1 }, (_, i) => String.fromCharCode(0xa0 + i)),
  // Sinais usados no copy e na interface
  '–', '—',           // – —
  '‘', '’',           // ' '
  '“', '”',           // " "
  '…',                     // …
  '·',                     // ·  separador do eyebrow
  '→', '←',           // → ←  setas das reguas
  '°',                     // °  180deg
  '★', '☆',           // ★ ☆  estrelas das avaliacoes
  '©',                     // ©  rodape
].join('');

/** Os .ttf de origem vivem em .fontsrc/ e nao sao publicados. */
const SRC = path.join(ROOT, '.fontsrc');

const JOBS = [
  { src: path.join(SRC, 'Newsreader.ttf'), out: 'newsreader-variable.woff2', label: 'Newsreader roman' },
  { src: path.join(SRC, 'Newsreader-Italic.ttf'), out: 'newsreader-italic-variable.woff2', label: 'Newsreader italico' },
  { src: path.join(SRC, 'jost.ttf'), out: 'jost-variable.woff2', label: 'Jost' },
];

let total = 0;
for (const job of JOBS) {
  if (!fs.existsSync(job.src)) {
    console.error(`FALTA: ${job.src}`);
    process.exitCode = 1;
    continue;
  }
  const original = fs.readFileSync(job.src);
  const subset = await subsetFont(original, CHARS, { targetFormat: 'woff2' });
  fs.writeFileSync(path.join(OUT, job.out), subset);
  const before = Math.round(original.length / 1024);
  const after = Math.round(subset.length / 1024);
  total += subset.length;
  console.log(`${job.label.padEnd(20)} ${String(before).padStart(4)}KB ttf -> ${String(after).padStart(3)}KB woff2  (${job.out})`);
}

console.log(`\nTotal servido ao navegador: ${Math.round(total / 1024)}KB em 3 arquivos.`);
