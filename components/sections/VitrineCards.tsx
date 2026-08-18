'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useMensagens } from '@/components/providers/MensagensProvider';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { IMAGENS, type ImagemId } from '@/lib/images.generated';

/**
 * Vitrine — pilha de cards fixados que encolhem conforme a rolagem.
 *
 * Portado de `sticky-scroll-cards` (componentry.dev). Tres adaptacoes
 * obrigatorias em relacao ao original:
 *
 *  1. O original embrulha tudo num `<ReactLenis root>` proprio. O projeto ja tem
 *     um LenisProvider no layout — dois roots disputariam a mesma rolagem.
 *     Removido: a pagina inteira ja roda no Lenis com lerp .09 do brief.
 *  2. `framer-motion` -> `motion/react`, que e a biblioteca do projeto.
 *  3. As imagens padrao do original sao do Unsplash. Proibido pelo CLAUDE.md —
 *     entram as fotos do acervo, pelo pipeline AVIF/WebP com width/height.
 *
 * O rotulo do card tambem sobe de 10px para 11px, piso do CLAUDE.md regra 9.
 */

const TILT = [-1.25, 0.85, -0.65, 1.35, -0.9];

function Card({
  foto,
  titulo,
  index,
  total,
  container,
  reduzir,
}: {
  foto: ImagemId;
  titulo: string;
  index: number;
  total: number;
  container: React.RefObject<HTMLDivElement | null>;
  reduzir: boolean;
}) {
  const { scrollYProgress } = useScroll({ target: container, offset: ['start start', 'end end'] });
  const inicio = total > 1 ? index / (total + 1) : 0;
  const escalaFinal = Math.max(0.56, 1 - (total - index - 1) * 0.095);
  const scale = useTransform(scrollYProgress, [inicio, 1], reduzir ? [1, 1] : [1, escalaFinal]);

  const meta = IMAGENS[foto];
  const srcset = (ext: 'avif' | 'webp') =>
    meta.larguras.map((w) => `/images/${foto}-${w}.${ext} ${w}w`).join(', ');

  return (
    <section className="sticky top-0 grid h-[88vh] place-items-center">
      <motion.figure
        className="relative m-0 origin-top overflow-hidden rounded bg-white"
        style={{
          scale,
          rotate: reduzir ? 0 : TILT[index % TILT.length],
          // O original usava `calc(-5vh + 160px + i*22px)`, o que empurrava os
          // ultimos cards para fora da tela — era isso que cortava a foto e a
          // legenda. Um degrau de 18px por card mantem a pilha visivel e o card
          // inteiro dentro do campo de visao.
          top: `${index * 18}px`,
          boxShadow: '0 2px 5px rgb(0 0 0 / 0.06), 0 18px 48px rgb(0 0 0 / 0.13)',
        }}
      >
        <div className="p-2.5 pb-0">
          <picture>
            <source
              type="image/avif"
              srcSet={srcset('avif')}
              sizes="(min-width: 2133px) 640px, (min-width: 1533px) 30vw, min(78vw, 460px)"
            />
            <source
              type="image/webp"
              srcSet={srcset('webp')}
              sizes="(min-width: 2133px) 640px, (min-width: 1533px) 30vw, min(78vw, 460px)"
            />
            <img
              src={`/images/${foto}-720.webp`}
              alt={titulo}
              width={meta.w}
              height={meta.h}
              // O card cresce so a partir do monitor grande. O `clamp` interno
              // fica preso em 460px ate ~1533px de viewport, entao celular e
              // notebook nao mudam em nada; dai para cima acompanha 30vw.
              //
              // O teto de 640px nao e estetico: quatro das cinco fotos da
              // vitrine (j-3, p-5, s-8, e-5) so tem 720px nativos, e o pipeline
              // nao faz upscale. Passar disso amoleceria a imagem.
              //
              // A altura repete a mesma escada para manter a proporcao ~1.58
              // que o card ja tinha (460x290).
              className="block h-[clamp(210px,32vw,clamp(290px,19vw,404px))] w-[min(78vw,clamp(460px,30vw,640px))] object-cover"
              loading={index < 2 ? 'eager' : 'lazy'}
              draggable={false}
            />
          </picture>
        </div>
        <figcaption className="grid h-11 place-items-center px-4 font-sans text-menu uppercase text-faint">
          {titulo}
        </figcaption>
      </motion.figure>
    </section>
  );
}

export function VitrineCards() {
  const m = useMensagens();
  const reduzir = usePrefersReducedMotion();
  const container = useRef<HTMLDivElement>(null);

  return (
    // O original tinha pt-[50vh] pb-[100vh] — 150vh de vao branco, meia tela
    // antes do primeiro card e uma tela inteira depois do ultimo. Era a origem
    // dos tres buracos que apareciam: antes do rotulo, entre o rotulo e os
    // cards, e entre esta secao e "A casa". Reduzido ao minimo que o efeito
    // ainda precisa para completar a escala do ultimo card.
    <div ref={container} className="relative flex w-full flex-col items-center pb-[10vh] pt-[7vh]">
      <div className="flex flex-col items-center gap-3 pb-[2vh]">
        <p className="font-sans text-caption uppercase text-faint">{m.vitrine.hint}</p>
        <span className="h-10 w-px bg-gradient-to-b from-rule to-transparent" />
      </div>

      {m.vitrine.cards.map((card, i) => (
        <Card
          key={card.foto}
          foto={card.foto as ImagemId}
          titulo={card.titulo}
          index={i}
          total={m.vitrine.cards.length}
          container={container}
          reduzir={reduzir}
        />
      ))}
    </div>
  );
}
