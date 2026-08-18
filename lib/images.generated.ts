// GERADO POR scripts/prepare-assets.mjs — NAO EDITAR A MAO.
// Rode `npm run assets` para regenerar.
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
  'armacao': { id: 'armacao', grupo: 'vitrine', w: 1024, h: 763, larguras: [360, 480, 720, 960, 1024] },
  'azeda-clean': { id: 'azeda-clean', grupo: 'vitrine', w: 2528, h: 1684, larguras: [360, 480, 720, 960, 1200, 1600, 1952, 2528] },
  'azeda-l': { id: 'azeda-l', grupo: 'localizacao', w: 500, h: 282, larguras: [360, 480, 500] },
  'b-1': { id: 'b-1', grupo: 'banheiros', w: 1200, h: 800, larguras: [360, 480, 720, 960, 1200] },
  'b-2': { id: 'b-2', grupo: 'banheiros', w: 720, h: 540, larguras: [360, 480, 720] },
  'b-3': { id: 'b-3', grupo: 'banheiros', w: 720, h: 540, larguras: [360, 480, 720] },
  'b-4': { id: 'b-4', grupo: 'banheiros', w: 1200, h: 898, larguras: [360, 480, 720, 960, 1200] },
  'b-5': { id: 'b-5', grupo: 'banheiros', w: 1200, h: 900, larguras: [360, 480, 720, 960, 1200] },
  'b-6': { id: 'b-6', grupo: 'banheiros', w: 1200, h: 800, larguras: [360, 480, 720, 960, 1200] },
  'brava-l': { id: 'brava-l', grupo: 'localizacao', w: 500, h: 282, larguras: [360, 480, 500] },
  'c-1': { id: 'c-1', grupo: 'churrasqueira-piscina', w: 720, h: 480, larguras: [360, 480, 720] },
  'c-2': { id: 'c-2', grupo: 'churrasqueira-piscina', w: 720, h: 540, larguras: [360, 480, 720] },
  'canto-l': { id: 'canto-l', grupo: 'localizacao', w: 500, h: 281, larguras: [360, 480, 500] },
  'cozinha-1': { id: 'cozinha-1', grupo: 'cozinha', w: 1200, h: 900, larguras: [360, 480, 720, 960, 1200] },
  'cozinha-2': { id: 'cozinha-2', grupo: 'cozinha', w: 720, h: 540, larguras: [360, 480, 720] },
  'cozinha-3': { id: 'cozinha-3', grupo: 'cozinha', w: 720, h: 540, larguras: [360, 480, 720] },
  'cozinha-4': { id: 'cozinha-4', grupo: 'cozinha', w: 1200, h: 900, larguras: [360, 480, 720, 960, 1200] },
  'cozinha-5': { id: 'cozinha-5', grupo: 'cozinha', w: 720, h: 480, larguras: [360, 480, 720] },
  'cozinha-6': { id: 'cozinha-6', grupo: 'cozinha', w: 720, h: 480, larguras: [360, 480, 720] },
  'e-1': { id: 'e-1', grupo: 'exteriores', w: 720, h: 405, larguras: [360, 480, 720] },
  'e-2': { id: 'e-2', grupo: 'exteriores', w: 720, h: 1080, larguras: [360, 480, 720] },
  'e-3': { id: 'e-3', grupo: 'exteriores', w: 1024, h: 572, larguras: [360, 480, 720, 960, 1024] },
  'e-4': { id: 'e-4', grupo: 'exteriores', w: 720, h: 480, larguras: [360, 480, 720] },
  'e-5': { id: 'e-5', grupo: 'exteriores', w: 720, h: 463, larguras: [360, 480, 720] },
  'e-6': { id: 'e-6', grupo: 'exteriores', w: 1200, h: 800, larguras: [360, 480, 720, 960, 1200] },
  'ferradura-l': { id: 'ferradura-l', grupo: 'localizacao', w: 500, h: 282, larguras: [360, 480, 500] },
  'foca-l': { id: 'foca-l', grupo: 'localizacao', w: 500, h: 282, larguras: [360, 480, 500] },
  'forno-l': { id: 'forno-l', grupo: 'localizacao', w: 500, h: 282, larguras: [360, 480, 500] },
  'foto-arquitetura': { id: 'foto-arquitetura', grupo: 'exteriores', w: 1952, h: 2176, larguras: [360, 480, 720, 960, 1200, 1600, 1952] },
  'geriba-l': { id: 'geriba-l', grupo: 'localizacao', w: 500, h: 282, larguras: [360, 480, 500] },
  'hero-casa-humaita': { id: 'hero-casa-humaita', grupo: 'marca', w: 1952, h: 2176, larguras: [360, 480, 720, 960, 1200, 1600, 1952] },
  'j-1': { id: 'j-1', grupo: 'jardim', w: 720, h: 1080, larguras: [360, 480, 720] },
  'j-2': { id: 'j-2', grupo: 'jardim', w: 720, h: 579, larguras: [360, 480, 720] },
  'j-3': { id: 'j-3', grupo: 'jardim', w: 720, h: 480, larguras: [360, 480, 720] },
  'j-5': { id: 'j-5', grupo: 'jardim', w: 1200, h: 900, larguras: [360, 480, 720, 960, 1200] },
  'j-6': { id: 'j-6', grupo: 'jardim', w: 720, h: 1070, larguras: [360, 480, 720] },
  'j-7': { id: 'j-7', grupo: 'jardim', w: 720, h: 540, larguras: [360, 480, 720] },
  'joao-fernandes-l': { id: 'joao-fernandes-l', grupo: 'localizacao', w: 500, h: 282, larguras: [360, 480, 500] },
  'livraria-clean': { id: 'livraria-clean', grupo: 'vitrine', w: 2528, h: 1686, larguras: [360, 480, 720, 960, 1200, 1600, 1952, 2528] },
  'mapa': { id: 'mapa', grupo: 'marca', w: 1920, h: 1080, larguras: [360, 480, 720, 960, 1200, 1600, 1920] },
  'mirante-l': { id: 'mirante-l', grupo: 'localizacao', w: 500, h: 282, larguras: [360, 480, 500] },
  'orla-clean': { id: 'orla-clean', grupo: 'vitrine', w: 2528, h: 1686, larguras: [360, 480, 720, 960, 1200, 1600, 1952, 2528] },
  'orla-l': { id: 'orla-l', grupo: 'localizacao', w: 500, h: 281, larguras: [360, 480, 500] },
  'ossos-l': { id: 'ossos-l', grupo: 'localizacao', w: 500, h: 282, larguras: [360, 480, 500] },
  'p-1': { id: 'p-1', grupo: 'churrasqueira-piscina', w: 1200, h: 900, larguras: [360, 480, 720, 960, 1200] },
  'p-2': { id: 'p-2', grupo: 'churrasqueira-piscina', w: 720, h: 540, larguras: [360, 480, 720] },
  'p-3': { id: 'p-3', grupo: 'churrasqueira-piscina', w: 720, h: 540, larguras: [360, 480, 720] },
  'p-4': { id: 'p-4', grupo: 'churrasqueira-piscina', w: 1200, h: 900, larguras: [360, 480, 720, 960, 1200] },
  'p-5': { id: 'p-5', grupo: 'churrasqueira-piscina', w: 720, h: 405, larguras: [360, 480, 720] },
  'p-6': { id: 'p-6', grupo: 'churrasqueira-piscina', w: 720, h: 540, larguras: [360, 480, 720] },
  'p-7': { id: 'p-7', grupo: 'churrasqueira-piscina', w: 720, h: 540, larguras: [360, 480, 720] },
  'porto-da-barra-l': { id: 'porto-da-barra-l', grupo: 'localizacao', w: 500, h: 282, larguras: [360, 480, 500] },
  'q-1': { id: 'q-1', grupo: 'quartos', w: 1200, h: 1600, larguras: [360, 480, 720, 960, 1200] },
  'q-2': { id: 'q-2', grupo: 'quartos', w: 1200, h: 900, larguras: [360, 480, 720, 960, 1200] },
  'q-3': { id: 'q-3', grupo: 'quartos', w: 720, h: 480, larguras: [360, 480, 720] },
  'q-4': { id: 'q-4', grupo: 'quartos', w: 720, h: 539, larguras: [360, 480, 720] },
  'q-5': { id: 'q-5', grupo: 'quartos', w: 1200, h: 800, larguras: [360, 480, 720, 960, 1200] },
  'q-6': { id: 'q-6', grupo: 'quartos', w: 1200, h: 900, larguras: [360, 480, 720, 960, 1200] },
  'q-7': { id: 'q-7', grupo: 'quartos', w: 720, h: 540, larguras: [360, 480, 720] },
  'q-8': { id: 'q-8', grupo: 'quartos', w: 1200, h: 800, larguras: [360, 480, 720, 960, 1200] },
  'q-9': { id: 'q-9', grupo: 'quartos', w: 720, h: 480, larguras: [360, 480, 720] },
  'q-10': { id: 'q-10', grupo: 'quartos', w: 720, h: 497, larguras: [360, 480, 720] },
  'q-11': { id: 'q-11', grupo: 'quartos', w: 720, h: 480, larguras: [360, 480, 720] },
  'rua-das-pedras-l': { id: 'rua-das-pedras-l', grupo: 'localizacao', w: 500, h: 282, larguras: [360, 480, 500] },
  's-1': { id: 's-1', grupo: 'sala', w: 720, h: 960, larguras: [360, 480, 720] },
  's-3': { id: 's-3', grupo: 'sala', w: 720, h: 540, larguras: [360, 480, 720] },
  's-4': { id: 's-4', grupo: 'sala', w: 1200, h: 1604, larguras: [360, 480, 720, 960, 1200] },
  's-5': { id: 's-5', grupo: 'sala', w: 720, h: 478, larguras: [360, 480, 720] },
  's-6': { id: 's-6', grupo: 'sala', w: 1200, h: 800, larguras: [360, 480, 720, 960, 1200] },
  's-7': { id: 's-7', grupo: 'sala', w: 1200, h: 900, larguras: [360, 480, 720, 960, 1200] },
  's-8': { id: 's-8', grupo: 'sala', w: 720, h: 540, larguras: [360, 480, 720] },
  's-9': { id: 's-9', grupo: 'sala', w: 720, h: 540, larguras: [360, 480, 720] },
  's-10': { id: 's-10', grupo: 'sala', w: 720, h: 540, larguras: [360, 480, 720] },
  's-11': { id: 's-11', grupo: 'sala', w: 1200, h: 805, larguras: [360, 480, 720, 960, 1200] },
  's-12': { id: 's-12', grupo: 'sala', w: 720, h: 480, larguras: [360, 480, 720] },
  's-13': { id: 's-13', grupo: 'sala', w: 720, h: 480, larguras: [360, 480, 720] },
  's-14': { id: 's-14', grupo: 'sala', w: 720, h: 540, larguras: [360, 480, 720] },
  'tartaruga-l': { id: 'tartaruga-l', grupo: 'localizacao', w: 500, h: 282, larguras: [360, 480, 500] },
  'vista-clean': { id: 'vista-clean', grupo: 'vitrine', w: 2528, h: 1684, larguras: [360, 480, 720, 960, 1200, 1600, 1952, 2528] },
  'vitrine-casamento': { id: 'vitrine-casamento', grupo: 'vitrine', w: 1170, h: 780, larguras: [360, 480, 720, 960, 1170] },
  'vitrine-gastronomia': { id: 'vitrine-gastronomia', grupo: 'vitrine', w: 4640, h: 6160, larguras: [360, 480, 720, 960, 1200, 1600, 1952, 2560, 4640] },
  'vitrine-praias': { id: 'vitrine-praias', grupo: 'vitrine', w: 1920, h: 1280, larguras: [360, 480, 720, 960, 1200, 1600, 1920] },
  'vitrine-regiao': { id: 'vitrine-regiao', grupo: 'vitrine', w: 1200, h: 800, larguras: [360, 480, 720, 960, 1200] },
} as const satisfies Record<string, ImagemMeta>;

export type ImagemId = keyof typeof IMAGENS;
