import type { ImagemId } from '@/lib/images.generated';
import type { Mensagens } from '@/lib/i18n';

/**
 * Regua de ambientes e galerias do modulo ampliado.
 *
 * Mapeamento redefinido pelo cliente. As CAPAS nao mudam; o que muda e o
 * conteudo de cada galeria, agora agrupado por comodo e com os banheiros
 * acompanhando a suite correspondente:
 *
 *   b-1, b-2, b-3 -> suite principal
 *   b-4, b-5      -> suite 2
 *   b-6           -> suite 3
 *   suite 1 nao tem foto de banheiro no acervo.
 *
 * `s-2` e `j-4` sao duplicatas exatas de `s-1` e `j-1` (mesmo hash MD5) e foram
 * descartadas no pipeline — por isso nao aparecem nas listas abaixo.
 *
 * O frame da regua e 3:2 fixo para todos, a pedido do cliente. `q-1` e a unica
 * vertical e entra por `object-cover`.
 */

export interface Ambiente {
  /** chave em messages.rooms.cards */
  chave: keyof Mensagens['rooms']['cards'];
  /** foto de capa da regua — nao alterar */
  capa: ImagemId;
  /** galeria do modulo ampliado, capa primeiro */
  galeria: ImagemId[];
}

export const AMBIENTES: Ambiente[] = [
  {
    chave: 'view',
    capa: 'e-6',
    galeria: ['e-6', 'e-1', 'j-3', 'p-4'],
  },
  {
    chave: 'living',
    capa: 's-10',
    galeria: ['s-10', 's-1', 's-3', 's-4', 's-6', 's-7', 's-8', 's-9', 's-11', 's-12', 's-13', 's-14', 's-5'],
  },
  {
    chave: 'kitchen',
    capa: 'cozinha-1',
    galeria: ['cozinha-1', 'cozinha-2', 'cozinha-3', 'cozinha-4', 'cozinha-5', 'cozinha-6'],
  },
  {
    chave: 'master',
    capa: 'q-8',
    galeria: ['q-8', 'q-6', 'q-7', 'q-9', 'q-10', 'q-11', 'b-1', 'b-2', 'b-3'],
  },
  {
    // Unica foto do acervo, e sem banheiro. O modulo ampliado funciona com um
    // item so: sem setas, sem contador.
    chave: 'suite1',
    capa: 'q-3',
    galeria: ['q-3'],
  },
  {
    chave: 'suite2',
    capa: 'q-1',
    galeria: ['q-1', 'b-4', 'b-5'],
  },
  {
    chave: 'suite3',
    capa: 'q-5',
    galeria: ['q-5', 'q-4', 'b-6'],
  },
  {
    chave: 'pool',
    capa: 'e-5',
    galeria: ['e-5', 'p-1', 'p-2', 'p-3', 'p-4', 'p-5', 'p-6', 'p-7'],
  },
  {
    chave: 'grill',
    capa: 'c-1',
    galeria: ['c-1', 'c-2'],
  },
  {
    chave: 'garden',
    capa: 'p-3',
    galeria: ['p-3', 'j-1', 'j-2', 'j-3', 'j-5', 'j-7', 'j-6'],
  },
];
