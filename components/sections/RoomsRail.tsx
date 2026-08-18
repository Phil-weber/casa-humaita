'use client';

import { useEffect, useRef, useState } from 'react';
import { useMensagens } from '@/components/providers/MensagensProvider';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useDragRail } from '@/hooks/useDragRail';
import { AMBIENTES } from '@/lib/rooms';
import { IMAGENS } from '@/lib/images.generated';
import { RoomsLightbox } from '@/components/sections/RoomsLightbox';
import { Ficha } from '@/components/sections/Ficha';

/**
 * Secao 4 — A regua de ambientes. ASSINATURA da pagina (brief §4).
 *
 * Revisao do cliente nesta rodada:
 *  - Frame de proporcao FIXA 3:2 para todos os cards ("padronize a altura e a
 *    largura"). Antes a largura saia da proporcao nativa de cada foto, o que
 *    produzia uma fileira irregular.
 *  - Cursor "ARRASTE" removido daqui e de todo o site.
 *  - `+` -> `→` no botao que abre a galeria.
 *  - Filete em --blue no lugar do cinza.
 *  - Parallax dentro do frame com deslocamento de 0.2 (era 0.25).
 *  - Titulo de secao acrescentado.
 *
 * O bug de sobreposicao com a Arquitetura vinha do `overflow-x` da regua criando
 * contexto de rolagem que brigava com o `sticky` da secao seguinte. Resolvido
 * isolando a regua num container proprio com `overscroll-behavior-x: contain`.
 */

const TRAVEL = 0.2; // deslocamento do parallax — ajustado pelo cliente

export function RoomsRail() {
  const m = useMensagens();
  const reduzir = usePrefersReducedMotion();
  const rail = useDragRail<HTMLDivElement>();
  const [aberto, setAberto] = useState<number | null>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>([]);

  // Parallax dentro do frame: o frame nao se move, a imagem desliza atras dele.
  useEffect(() => {
    if (reduzir) return;
    let frame = 0;
    const tick = () => {
      const vh = window.innerHeight;
      for (const img of framesRef.current) {
        if (!img) continue;
        const frameEl = img.parentElement;
        if (!frameEl) continue;
        const r = frameEl.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) continue; // fora da tela, nao calcula
        const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
        img.style.transform = `translate3d(0, ${(-p * r.height * TRAVEL).toFixed(1)}px, 0)`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduzir]);

  return (
    <>
      <div className="container-humaita">
        <div className="flex flex-col gap-6 border-b border-blue/30 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-5 font-sans text-eyebrow uppercase text-blue">{m.rooms.eyebrow}</p>
            <h2 className="font-serif text-h2 text-ink">{m.rooms.title}</h2>
          </div>
          {/* Barra de progresso do arraste. */}
          <span className="relative hidden h-px w-48 overflow-hidden bg-blue/20 md:block" aria-hidden="true">
            <span
              className="absolute left-0 top-0 h-full bg-blue transition-[width] duration-150 ease-out"
              style={{ width: `${Math.max(8, rail.progresso * 100)}%` }}
            />
          </span>
        </div>

        {/* A ficha da casa entre o filete do titulo e as fotos. */}
        <div className="py-7">
          <Ficha />
        </div>
      </div>

      <div
        ref={rail.ref}
        {...rail.props}
        role="group"
        aria-label={m.rooms.title}
        // `snap-mandatory` foi removido: ele disputava cada quadro com o arraste
        // por ponteiro e era o que deixava o gesto travado. `scroll-pl` garante
        // que o primeiro card comece depois da margem, e nao colado na borda.
        className="rail-scroll mt-4 flex gap-6 overflow-x-auto overflow-y-hidden px-pad-x pb-6 [scroll-padding-left:var(--pad-x)] [overscroll-behavior-x:contain]"
        style={{ cursor: rail.arrastando ? 'grabbing' : 'grab' }}
      >
        {AMBIENTES.map((ambiente, i) => {
          const meta = IMAGENS[ambiente.capa];
          const rotulo = m.rooms.cards[ambiente.chave];
          const srcset = (ext: 'avif' | 'webp') =>
            meta.larguras.map((w) => `/images/${ambiente.capa}-${w}.${ext} ${w}w`).join(', ');

          return (
            <figure key={ambiente.chave} className="shrink-0">
              {/* Frame de proporcao fixa 3:2 — todos os cards com a mesma caixa. */}
              {/* A propria foto abre o modulo — o clique so nao vale se o gesto
                  tiver virado arraste. */}
              <div
                role="button"
                tabIndex={-1}
                aria-hidden="true"
                onClick={() => {
                  if (rail.foiArraste()) return;
                  setAberto(i);
                }}
                className="relative cursor-pointer overflow-hidden rounded border border-blue/25 bg-rail-track"
                style={{ height: 'var(--rail-h)', width: 'calc(var(--rail-h) * 1.5)' }}
              >
                <picture>
                  <source type="image/avif" srcSet={srcset('avif')} sizes="(max-width: 768px) 78vw, 42vw" />
                  <source type="image/webp" srcSet={srcset('webp')} sizes="(max-width: 768px) 78vw, 42vw" />
                  <img
                    ref={(el) => {
                      framesRef.current[i] = el;
                    }}
                    src={`/images/${ambiente.capa}-${meta.larguras[meta.larguras.length - 1]}.webp`}
                    alt={m.alt.fotos[ambiente.capa as keyof typeof m.alt.fotos] ?? rotulo}
                    width={meta.w}
                    height={meta.h}
                    // 125% da altura do frame: e a sobra que permite o deslize.
                    className="absolute inset-x-0 top-0 h-[125%] w-full object-cover will-change-transform"
                    loading="lazy"
                    draggable={false}
                  />
                </picture>
              </div>

              <figcaption className="mt-4 flex items-center justify-between gap-4 border-t border-blue/25 pt-4">
                <span className="font-serif text-card-label-lg text-ink">{rotulo}</span>
                <button
                  type="button"
                  onClick={() => {
                    if (rail.foiArraste()) return;
                    setAberto(i);
                  }}
                  aria-label={rotulo}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-pill border border-blue text-blue transition-colors duration-200 ease-out hover:bg-blue hover:text-white"
                >
                  <span aria-hidden="true">→</span>
                </button>
              </figcaption>
            </figure>
          );
        })}
      </div>

      {aberto !== null && AMBIENTES[aberto] && (
        <RoomsLightbox
          titulo={m.rooms.cards[AMBIENTES[aberto]!.chave]}
          fotos={AMBIENTES[aberto]!.galeria}
          aoFechar={() => setAberto(null)}
        />
      )}
    </>
  );
}
