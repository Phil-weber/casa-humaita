import type { ReactNode } from 'react';

/**
 * Envelope de secao — brief §5.
 *
 * Cada secao declara `data-tone`, e e isso que o header le para inverter a cor
 * do proprio texto. O ritmo claro/escuro da home esta fixado no brief:
 *
 *   0 preloader claro · 1 hero escuro · 2 manifesto claro · 3 ficha claro
 *   4 regua claro · 5 arquitetura escuro · 6 localizacao claro
 *   7 avaliacoes claro · 8 conheca claro · 9 essencial claro
 *   10 contato escuro · 11 rodape escuro
 *
 * A textura de reboco entra so nas secoes claras: ela existe para dar
 * profundidade ao branco puro, e o branco e decisao fechada do cliente.
 */

export type Tone = 'light' | 'dark';

interface SectionProps {
  id?: string;
  tone: Tone;
  /** Opcional durante o andaime: as secoes da Etapa 2 chegam uma por vez. */
  children?: ReactNode;
  className?: string;
  /** Desliga o respiro vertical padrao para secoes que controlam a propria altura. */
  semRespiro?: boolean;
  /** Desliga a textura numa secao clara (ex.: quando a foto ocupa tudo). */
  semTextura?: boolean;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

export function Section({
  id,
  tone,
  children,
  className = '',
  semRespiro = false,
  semTextura = false,
  ...aria
}: SectionProps) {
  const escura = tone === 'dark';
  const comTextura = !escura && !semTextura;

  return (
    <section
      id={id}
      data-tone={tone}
      className={[
        'relative isolate',
        escura ? 'bg-navy text-on-dark' : 'bg-bg text-ink',
        comTextura ? 'textura' : '',
        semRespiro ? '' : 'py-section',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...aria}
    >
      {/* z-10 mantem o conteudo acima do pseudo-elemento da textura. */}
      <div className="relative z-10">{children}</div>
    </section>
  );
}
