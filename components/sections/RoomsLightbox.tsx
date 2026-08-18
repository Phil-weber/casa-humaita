'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useMensagens } from '@/components/providers/MensagensProvider';
import { useDragRail } from '@/hooks/useDragRail';
import { IMAGENS, type ImagemId } from '@/lib/images.generated';

/**
 * Modulo de visualizacao ampliada — brief §7·4.
 *
 * Reescrito na revisao do cliente. O que mudou e por que:
 *
 *  - O fundo deixou de ser `--navy` chapado. Agora o site continua visivel por
 *    tras, com escurecimento e desfoque — o overlay le como segundo plano, e nao
 *    como outra pagina.
 *  - O header sumia por baixo do overlay e ainda capturava clique, entao o botao
 *    de fechar ficava inalcancavel. Agora o modulo sinaliza por `data-modulo` no
 *    <html> e o header se retira enquanto ele estiver aberto.
 *  - Altura das fotos padronizada: todas no mesmo frame, sem discrepancia entre
 *    horizontal e vertical.
 *  - Arraste destravado (o `useDragRail` so captura o ponteiro depois do limiar).
 *
 * Continua funcionando com um item so — a Suite 1 tem uma unica foto e nao tem
 * banheiro no acervo: nesse caso, sem setas e sem contador.
 */

interface Props {
  titulo: string;
  fotos: ImagemId[];
  aoFechar: () => void;
}

export function RoomsLightbox({ titulo, fotos, aoFechar }: Props) {
  const m = useMensagens();
  const rail = useDragRail<HTMLDivElement>();
  const overlayRef = useRef<HTMLDivElement>(null);
  const fecharRef = useRef<HTMLButtonElement>(null);
  const [indice, setIndice] = useState(0);

  const unico = fotos.length === 1;

  const irPara = useCallback(
    (i: number) => {
      const el = rail.ref.current;
      const alvo = el?.children[i] as HTMLElement | undefined;
      if (!el || !alvo) return;
      el.scrollTo({ left: alvo.offsetLeft - (el.clientWidth - alvo.offsetWidth) / 2, behavior: 'smooth' });
      setIndice(i);
    },
    [rail.ref],
  );

  // Esc fecha, setas navegam.
  useEffect(() => {
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        aoFechar();
        return;
      }
      if (unico) return;
      if (e.key === 'ArrowRight') irPara(Math.min(indice + 1, fotos.length - 1));
      if (e.key === 'ArrowLeft') irPara(Math.max(indice - 1, 0));
    };
    document.addEventListener('keydown', aoTeclar);
    return () => document.removeEventListener('keydown', aoTeclar);
  }, [aoFechar, indice, fotos.length, irPara, unico]);

  // Foco preso, rolagem da pagina travada e header retirado enquanto aberto.
  useEffect(() => {
    fecharRef.current?.focus();
    const anterior = document.activeElement as HTMLElement | null;
    const travaScroll = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.dataset.modulo = 'on';

    const prender = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const foco = overlayRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
      );
      if (!foco?.length) return;
      const primeiro = foco[0];
      const ultimo = foco[foco.length - 1];
      if (!primeiro || !ultimo) return;
      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primeiro.focus();
      }
    };
    document.addEventListener('keydown', prender);
    return () => {
      document.removeEventListener('keydown', prender);
      document.body.style.overflow = travaScroll;
      delete document.documentElement.dataset.modulo;
      anterior?.focus?.();
    };
  }, []);

  // Indice acompanha a posicao do arraste.
  useEffect(() => {
    const el = rail.ref.current;
    if (!el || unico) return;
    const aoRolar = () => {
      const centro = el.scrollLeft + el.clientWidth / 2;
      let melhor = 0;
      let menor = Infinity;
      Array.from(el.children).forEach((c, i) => {
        const filho = c as HTMLElement;
        const meio = filho.offsetLeft + filho.offsetWidth / 2;
        const d = Math.abs(meio - centro);
        if (d < menor) {
          menor = d;
          melhor = i;
        }
      });
      setIndice(melhor);
    };
    el.addEventListener('scroll', aoRolar, { passive: true });
    return () => el.removeEventListener('scroll', aoRolar);
  }, [rail.ref, unico]);

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={titulo}
      className="fixed inset-0 z-[90] flex flex-col"
      // O site continua atras: escurecimento + desfoque, em vez de cor chapada.
      style={{ backgroundColor: 'rgba(14,33,54,.82)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)' }}
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) aoFechar();
      }}
    >
      <div className="flex shrink-0 items-center justify-between gap-6 px-5 py-6 text-on-dark md:px-12">
        <span className="font-serif text-card-label-lg">{titulo}</span>
        <div className="flex items-center gap-6">
          {!unico && (
            <span className="font-sans text-caption uppercase tabular-nums text-on-dark-2">
              {m.lightbox.counter
                .replace('{current}', String(indice + 1).padStart(2, '0'))
                .replace('{total}', String(fotos.length).padStart(2, '0'))}
            </span>
          )}
          <button
            ref={fecharRef}
            type="button"
            onClick={aoFechar}
            className="flex h-11 items-center gap-3 rounded-pill border border-white/30 px-5 font-sans text-menu uppercase text-on-dark transition-colors duration-200 ease-out hover:bg-white hover:text-ink"
          >
            {m.lightbox.close}
            <span aria-hidden="true">✕</span>
          </button>
        </div>
      </div>

      <div
        ref={rail.ref}
        {...rail.props}
        aria-label={titulo}
        className="flex flex-1 items-center gap-6 overflow-x-auto overflow-y-hidden px-5 pb-8 md:px-12 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
        style={{ cursor: unico ? 'default' : rail.arrastando ? 'grabbing' : 'grab' }}
      >
        {fotos.map((idFoto) => {
          const meta = IMAGENS[idFoto];
          const srcset = (ext: 'avif' | 'webp') =>
            meta.larguras.map((w) => `/images/${idFoto}-${w}.${ext} ${w}w`).join(', ');
          return (
            <figure
              key={idFoto}
              // Altura padronizada: todas as fotos no mesmo frame, entao vertical
              // e horizontal ficam alinhadas pela mesma linha de base.
              className="relative m-0 flex h-[clamp(280px,58vh,540px)] shrink-0 items-center overflow-hidden rounded"
              style={{ aspectRatio: '3 / 2' }}
            >
              <picture>
                <source type="image/avif" srcSet={srcset('avif')} sizes="(max-width: 768px) 86vw, 52vw" />
                <source type="image/webp" srcSet={srcset('webp')} sizes="(max-width: 768px) 86vw, 52vw" />
                <img
                  src={`/images/${idFoto}-${meta.larguras[meta.larguras.length - 1]}.webp`}
                  alt={m.alt.fotos[idFoto as keyof typeof m.alt.fotos] ?? titulo}
                  width={meta.w}
                  height={meta.h}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </picture>
            </figure>
          );
        })}
      </div>

      {!unico && (
        <div className="flex shrink-0 items-center justify-center gap-4 pb-8">
          <button
            type="button"
            onClick={() => irPara(Math.max(indice - 1, 0))}
            disabled={indice === 0}
            aria-label={m.lightbox.prev}
            className="flex h-11 w-11 items-center justify-center rounded-pill border border-white/30 text-on-dark transition-colors duration-200 ease-out hover:bg-white hover:text-ink disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-on-dark"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            onClick={() => irPara(Math.min(indice + 1, fotos.length - 1))}
            disabled={indice === fotos.length - 1}
            aria-label={m.lightbox.next}
            className="flex h-11 w-11 items-center justify-center rounded-pill border border-white/30 text-on-dark transition-colors duration-200 ease-out hover:bg-white hover:text-ink disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-on-dark"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      )}
    </div>
  );
}
