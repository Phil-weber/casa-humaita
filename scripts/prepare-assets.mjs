/**
 * Pipeline de imagem — assets.md §5, brief.md §11.
 *
 * Le as fotos das pastas originais do cliente (que ficam intocadas), escreve
 * AVIF + WebP responsivos em public/images/ e emite lib/images.generated.ts com
 * largura e altura de cada arquivo.
 *
 * Duas regras que o brief impoe e este script faz cumprir mecanicamente:
 *
 *   1. NUNCA gerar variante acima da resolucao nativa. 38 das 57 fotos estao em
 *      720px. Upscale em build e proibido — a escada de larguras e sempre
 *      truncada no nativo.
 *   2. width/height explicitos em toda <img>. O manifesto gerado aqui e a unica
 *      fonte dessas medidas, entao CLS = 0 sem ninguem digitar numero a mao.
 *
 * As duplicatas exatas (s-2 = s-1, j-4 = j-1, por hash MD5) sao descartadas,
 * conforme assets.md §1.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT_DIR = path.join(ROOT, 'public', 'images');
const MANIFEST = path.join(ROOT, 'lib', 'images.generated.ts');

/** Escada de larguras. Truncada no nativo — nunca acima. */
const LADDER = [360, 480, 720, 960, 1200, 1600, 1952, 2560];

/** Duplicatas exatas, assets.md §1. */
const DESCARTAR = new Set(['s-2', 'j-4']);

/** Pastas de origem do cliente -> prefixo de id. O id sai do proprio nome do arquivo. */
const FONTES = [
  { dir: 'sala', grupo: 'sala' },
  { dir: 'cozinha', grupo: 'cozinha' },
  { dir: 'quartos', grupo: 'quartos' },
  { dir: 'banheiros', grupo: 'banheiros' },
  { dir: 'churrasqueira+piscina', grupo: 'churrasqueira-piscina' },
  { dir: 'jardim', grupo: 'jardim' },
  { dir: 'Exteriores', grupo: 'exteriores' },
  { dir: 'vitrine', grupo: 'vitrine' },
  // As 14 fotos dos cards da Localizacao, entregues em 500x282.
  { dir: 'localização fotos', grupo: 'localizacao' },
  // Hero e mapa ficam em .assetsrc/ e nao em public/: sao os dois arquivos
  // pesados do projeto (8,1MB e 1,2MB) e o site serve apenas as variantes
  // AVIF/WebP geradas aqui. Deixa-los em public/ os embarcaria no export.
  { dir: '.assetsrc', grupo: 'marca' },
];

/** Tira acento e espaco: nome de arquivo que sobrevive a host estatico e URL. */
function normalizarId(nome) {
  return nome
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const registros = [];
let pulados = 0;

for (const fonte of FONTES) {
  const dirAbs = path.join(ROOT, fonte.dir);
  if (!fs.existsSync(dirAbs)) {
    console.warn(`  aviso: pasta ausente, ignorada — ${fonte.dir}`);
    continue;
  }
  for (const arquivo of fs.readdirSync(dirAbs)) {
    if (!/\.(jpe?g|png|webp|avif)$/i.test(arquivo)) continue;
    const id = normalizarId(path.parse(arquivo).name);
    if (fonte.apenas && !fonte.apenas.includes(id)) continue;
    if (DESCARTAR.has(id)) { pulados++; continue; }
    registros.push({ id, grupo: fonte.grupo, src: path.join(dirAbs, arquivo) });
  }
}

// Um id so pode aparecer uma vez: se a mesma foto existir em duas pastas de
// origem, o manifesto sairia com chave duplicada e nao compilaria.
const vistos = new Set();
const unicos = [];
for (const r of registros) {
  if (vistos.has(r.id)) {
    console.warn(`  aviso: id repetido, ignorado — ${r.id} (${r.src})`);
    continue;
  }
  vistos.add(r.id);
  unicos.push(r);
}
registros.length = 0;
registros.push(...unicos);

registros.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));

fs.mkdirSync(OUT_DIR, { recursive: true });

const manifesto = [];
let bytesEntrada = 0;
let bytesSaida = 0;

for (const reg of registros) {
  const img = sharp(reg.src, { limitInputPixels: false });
  const meta = await img.metadata();
  const nativoW = meta.width;
  const nativoH = meta.height;
  bytesEntrada += fs.statSync(reg.src).size;

  // Escada truncada no nativo, com o nativo sempre incluido.
  const larguras = [...new Set([...LADDER.filter((w) => w < nativoW), nativoW])].sort((a, b) => a - b);

  for (const w of larguras) {
    const h = Math.round((nativoH / nativoW) * w);
    const base = sharp(reg.src, { limitInputPixels: false }).resize(w, h, { fit: 'fill' });

    const avif = path.join(OUT_DIR, `${reg.id}-${w}.avif`);
    const webp = path.join(OUT_DIR, `${reg.id}-${w}.webp`);

    // Incremental: so recodifica se a saida nao existe ou o original mudou.
    // Sem isso, cada rodada re-encoda as ~70 fotos inteiras.
    const mtimeOrigem = fs.statSync(reg.src).mtimeMs;
    const atual = (p) => fs.existsSync(p) && fs.statSync(p).mtimeMs >= mtimeOrigem;

    if (!atual(avif)) await base.clone().avif({ quality: 52, effort: 6 }).toFile(avif);
    if (!atual(webp)) await base.clone().webp({ quality: 80 }).toFile(webp);
    bytesSaida += fs.statSync(avif).size + fs.statSync(webp).size;
  }

  manifesto.push({ id: reg.id, grupo: reg.grupo, w: nativoW, h: nativoH, larguras });
  process.stdout.write(`  ${reg.id.padEnd(22)} ${String(nativoW).padStart(4)}x${String(nativoH).toString().padEnd(4)}  ${larguras.join(' ')}\n`);
}

// ---- manifesto TypeScript -------------------------------------------------

const linhas = manifesto
  .map((m) => `  '${m.id}': { id: '${m.id}', grupo: '${m.grupo}', w: ${m.w}, h: ${m.h}, larguras: [${m.larguras.join(', ')}] },`)
  .join('\n');

fs.mkdirSync(path.dirname(MANIFEST), { recursive: true });
fs.writeFileSync(
  MANIFEST,
  `// GERADO POR scripts/prepare-assets.mjs — NAO EDITAR A MAO.
// Rode \`npm run assets\` para regenerar.
//
// Fonte unica de width/height de toda imagem do site. E o que garante CLS = 0
// sem ninguem digitar medida a mao, e o que impede srcset acima do nativo.

export interface ImagemMeta {
  /** id do acervo, ex.: 'q-8', 'cozinha-1' */
  id: string;
  /** pasta de origem no acervo do cliente */
  grupo: string;
  /** largura nativa em px — teto absoluto de exibicao */
  w: number;
  /** altura nativa em px */
  h: number;
  /** larguras geradas, sempre <= w */
  larguras: number[];
}

export const IMAGENS = {
${linhas}
} as const satisfies Record<string, ImagemMeta>;

export type ImagemId = keyof typeof IMAGENS;
`,
  'utf8',
);

const mb = (n) => (n / 1024 / 1024).toFixed(1);
console.log(`\n${manifesto.length} imagens · ${pulados} duplicatas descartadas`);
console.log(`entrada ${mb(bytesEntrada)}MB  ->  saida ${mb(bytesSaida)}MB em todas as variantes`);
console.log(`manifesto: lib/images.generated.ts`);
