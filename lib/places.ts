/**
 * Grafo da rota e os 14 lugares — portados de `reference/localizacao.html`,
 * aprovado pelo cliente.
 *
 * Correcoes obrigatorias do brief §12 aplicadas:
 *
 *  3. Distancias: `Rua das Pedras` e `Praia do Canto` estavam como 10 min;
 *     corrigidas para 8 min A PE. As demais ficam como no arquivo.
 *  4. Os `id` NAO batiam com os nomes (`id:"gorda"` rotulado "Praia do Canto",
 *     `id:"ossos"` rotulado "Praia Brava", etc.). Os NOMES estao certos, os `id`
 *     estavam errados: renomeados para corresponder aos nomes.
 *
 * Coordenadas x/y e o no de rota de cada lugar preservados exatamente como no
 * arquivo aprovado (copy.md §6). Centro de Buzios permanece fora da lista, por
 * decisao do cliente.
 */

export const AZUL = '#0170B2';
export const CASA = { x: 1110, y: 311 };

/** Nos da "estrada", todos dentro do contorno da peninsula. */
export const NOS: Record<string, { x: number; y: number; up?: string }> = {
  A: { x: 1118, y: 352 },
  W1: { x: 1042, y: 392, up: 'A' },
  W2: { x: 978, y: 400, up: 'W1' },
  W3: { x: 905, y: 392, up: 'W2' },
  W4: { x: 820, y: 418, up: 'W3' },
  W5: { x: 762, y: 500, up: 'W4' },
  W6: { x: 700, y: 655, up: 'W5' },
  S1: { x: 1030, y: 470, up: 'W2' },
  S2: { x: 1022, y: 540, up: 'S1' },
  S3: { x: 1105, y: 495, up: 'S1' },
  S4: { x: 1180, y: 450, up: 'S3' },
  E1: { x: 1165, y: 318, up: 'A' },
  E2: { x: 1205, y: 275, up: 'E1' },
  E3: { x: 1240, y: 330, up: 'E1' },
  E4: { x: 1248, y: 245, up: 'E2' },
  E5: { x: 1172, y: 215, up: 'E2' },
  E6: { x: 1185, y: 175, up: 'E5' },
  E7: { x: 1208, y: 168, up: 'E6' },
};

export type ModoDeslocamento = 'walk' | 'drive';

export interface Lugar {
  /** chave em messages.location.places */
  id: string;
  x: number;
  y: number;
  min: number;
  modo: ModoDeslocamento;
  no: string;
  /** foto revelada pelo clip-path do card — pasta `localização fotos/` */
  foto: string;
}

export const LUGARES: Lugar[] = [
  { id: 'orla-bardot', x: 1056, y: 352, min: 2, modo: 'walk', no: 'W1', foto: 'orla-l' },
  { id: 'praia-do-canto', x: 930, y: 337, min: 8, modo: 'walk', no: 'W3', foto: 'canto-l' }, // §12.3: era 10
  { id: 'rua-das-pedras', x: 988, y: 408, min: 8, modo: 'walk', no: 'W2', foto: 'rua-das-pedras-l' }, // §12.3: era 10
  { id: 'praia-dos-ossos', x: 1143, y: 218, min: 10, modo: 'walk', no: 'E5', foto: 'ossos-l' },
  { id: 'praia-da-azeda', x: 1145, y: 176, min: 15, modo: 'walk', no: 'E5', foto: 'azeda-l' },
  // `image 24.png` foi o unico arquivo sem nome de lugar, e Joao Fernandes o
  // unico lugar sem arquivo — a correspondencia e por eliminacao. CONFERIR.
  { id: 'joao-fernandes', x: 1218, y: 158, min: 5, modo: 'drive', no: 'E7', foto: 'image-24' },
  { id: 'praia-do-forno', x: 1218, y: 470, min: 5, modo: 'drive', no: 'S4', foto: 'forno-l' },
  { id: 'mirante-joao-fernandes', x: 1266, y: 243, min: 8, modo: 'drive', no: 'E4', foto: 'mirante-l' },
  { id: 'praia-brava', x: 1265, y: 362, min: 8, modo: 'drive', no: 'E3', foto: 'brava-l' },
  { id: 'praia-da-foca', x: 1155, y: 530, min: 8, modo: 'drive', no: 'S3', foto: 'foca-l' },
  { id: 'praia-da-ferradura', x: 1022, y: 576, min: 8, modo: 'drive', no: 'S2', foto: 'ferradura-l' },
  { id: 'praia-da-tartaruga', x: 795, y: 362, min: 10, modo: 'drive', no: 'W4', foto: 'tartaruga-l' },
  { id: 'porto-da-barra', x: 712, y: 550, min: 12, modo: 'drive', no: 'W5', foto: 'porto-da-barra-l' },
  { id: 'praia-de-geriba', x: 684, y: 716, min: 15, modo: 'drive', no: 'W6', foto: 'geriba-l' },
];

/** Suavizacao Catmull-Rom do arquivo aprovado — preservada integralmente. */
export function smooth(pts: [number, number][]): string {
  if (pts.length < 3) {
    const [a, b] = pts;
    if (!a || !b) return '';
    return `M ${a[0]} ${a[1]} L ${b[0]} ${b[1]}`;
  }
  let d = `M ${pts[0]![0]} ${pts[0]![1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i]!;
    const p1 = pts[i]!;
    const p2 = pts[i + 1]!;
    const p3 = pts[i + 2] ?? pts[i + 1]!;
    const t = 0.2;
    const c1x = p1[0] + (p2[0] - p0[0]) * t;
    const c1y = p1[1] + (p2[1] - p0[1]) * t;
    const c2x = p2[0] - (p3[0] - p1[0]) * t;
    const c2y = p2[1] - (p3[1] - p1[1]) * t;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2[0]} ${p2[1]}`;
  }
  return d;
}

/** Trilha da casa ate o lugar, encadeando os nos da estrada. */
export function rota(lugar: Lugar): string {
  const pts: [number, number][] = [[CASA.x, CASA.y]];
  const cadeia: { x: number; y: number }[] = [];
  let n = NOS[lugar.no];
  while (n) {
    cadeia.unshift(n);
    n = n.up ? NOS[n.up] : undefined;
  }
  for (const c of cadeia) pts.push([c.x, c.y]);
  pts.push([lugar.x, lugar.y]);

  // Remove nos redundantes muito proximos do destino.
  const out: [number, number][] = [pts[0]!];
  for (let i = 1; i < pts.length - 1; i++) {
    const p = pts[i]!;
    if (Math.hypot(p[0] - lugar.x, p[1] - lugar.y) > 34) out.push(p);
  }
  out.push(pts[pts.length - 1]!);
  return smooth(out);
}
