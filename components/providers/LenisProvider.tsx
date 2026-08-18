'use client';

import { useEffect, type ReactNode } from 'react';
import Lenis from 'lenis';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * Efeito 2 do orcamento — brief §6.
 *
 * `lerp: 0.09`. O padrao da biblioteca e longo demais e faz o site parecer
 * pesado; este valor e decisao fechada do brief, nao preferencia.
 *
 * `data-lenis-prevent` em toda regua horizontal (as reguas tem scroll proprio e
 * brigariam com o smooth scroll) — a propria Lenis respeita esse atributo.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const reduzirMovimento = usePrefersReducedMotion();

  useEffect(() => {
    // Regra 8: com a preferencia ligada, o Lenis nem chega a existir.
    if (reduzirMovimento) return;

    const lenis = new Lenis({
      lerp: 0.09,
      // Toque fica com o scroll nativo do sistema: interceptar gesto de dedo
      // custa fluidez e briga com as reguas horizontais.
      smoothWheel: true,
      syncTouch: false,
    });

    let frame = 0;
    const tick = (tempo: number) => {
      lenis.raf(tempo);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    // Ancoras do menu passam a ser conduzidas pelo Lenis. Sem isso o salto
    // nativo e o smooth scroll disputam a mesma rolagem.
    const aoClicar = (evento: MouseEvent) => {
      const alvo = (evento.target as HTMLElement | null)?.closest('a[href^="#"]');
      if (!(alvo instanceof HTMLAnchorElement)) return;
      const id = alvo.getAttribute('href');
      if (!id || id === '#') return;
      const destino = document.querySelector(id);
      if (!destino) return;
      evento.preventDefault();
      lenis.scrollTo(destino as HTMLElement, { offset: 0 });
    };
    document.addEventListener('click', aoClicar);

    return () => {
      document.removeEventListener('click', aoClicar);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reduzirMovimento]);

  return <>{children}</>;
}
