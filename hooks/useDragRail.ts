'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Primitiva de arraste horizontal — usada pelas tres reguas do site
 * (ambientes, localizacao e avaliacoes). Um lugar so para acertar:
 *
 *  - Pointer Events, nunca mouse-only (CLAUDE.md regra 6). O arquivo aprovado de
 *    Localizacao escutava `mousemove`/`mouseup` na window, o que deixava a regua
 *    morta no celular.
 *  - `setPointerCapture`, para o arraste continuar se o dedo sair do elemento.
 *  - Limiar que separa arraste de clique: sem ele, todo arraste terminaria
 *    abrindo o card que estava sob o dedo.
 *  - Inercia curta apos soltar, por velocidade — coerente com o lerp curto do Lenis.
 *  - Setas do teclado, com a regua focavel (CLAUDE.md regra 9).
 *  - `data-lenis-prevent` fica no elemento, senao o smooth scroll briga com o
 *    scroll horizontal (brief §12, correcao 2 da Localizacao).
 */

const LIMIAR_CLIQUE = 6; // px — abaixo disso e clique, nao arraste
const ATRITO = 0.94; // desaceleracao por quadro
const VELOCIDADE_MINIMA = 0.08; // px/ms — abaixo disso a inercia para
const PASSO_TECLADO = 320; // px por seta

export function useDragRail<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [arrastando, setArrastando] = useState(false);
  const [progresso, setProgresso] = useState(0);

  const estado = useRef({
    ativo: false,
    pointerId: -1,
    xInicial: 0,
    scrollInicial: 0,
    movido: 0,
    ultimoX: 0,
    ultimoT: 0,
    velocidade: 0,
    frameInercia: 0,
  });

  const medirProgresso = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgresso(max > 0 ? el.scrollLeft / max : 0);
  }, []);

  const pararInercia = useCallback(() => {
    if (estado.current.frameInercia) {
      cancelAnimationFrame(estado.current.frameInercia);
      estado.current.frameInercia = 0;
    }
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<T>) => {
      // Multi-touch: ignora dedos adicionais depois que o arraste comecou.
      if (estado.current.ativo) return;
      // Botao secundario nao arrasta.
      if (e.pointerType === 'mouse' && e.button !== 0) return;

      const el = ref.current;
      if (!el) return;
      pararInercia();

      const s = estado.current;
      s.ativo = true;
      s.pointerId = e.pointerId;
      s.xInicial = e.clientX;
      s.scrollInicial = el.scrollLeft;
      s.movido = 0;
      s.ultimoX = e.clientX;
      s.ultimoT = e.timeStamp;
      s.velocidade = 0;

      // A captura do ponteiro NAO acontece aqui. Capturar ja no `pointerdown`
      // redireciona todos os eventos seguintes para a regua, e o `click` do
      // botao que abre a galeria nunca chegava ao botao — era por isso que o
      // modulo ampliado nao abria. A captura passa a ser feita no `pointermove`,
      // e so depois que o dedo/mouse anda mais que o limiar.
      setArrastando(true);
    },
    [pararInercia],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<T>) => {
      const s = estado.current;
      if (!s.ativo || e.pointerId !== s.pointerId) return;
      const el = ref.current;
      if (!el) return;

      const dx = e.clientX - s.xInicial;
      s.movido = Math.max(s.movido, Math.abs(dx));

      // Captura tardia: so quando o gesto vira arraste de fato. Assim o clique
      // simples continua chegando ao botao do card.
      if (s.movido > LIMIAR_CLIQUE && !el.hasPointerCapture(e.pointerId)) {
        el.setPointerCapture(e.pointerId);
      }

      el.scrollLeft = s.scrollInicial - dx;

      const dt = e.timeStamp - s.ultimoT;
      if (dt > 0) s.velocidade = (e.clientX - s.ultimoX) / dt;
      s.ultimoX = e.clientX;
      s.ultimoT = e.timeStamp;

      medirProgresso();
    },
    [medirProgresso],
  );

  const encerrar = useCallback(
    (e: React.PointerEvent<T>) => {
      const s = estado.current;
      if (!s.ativo || e.pointerId !== s.pointerId) return;
      const el = ref.current;
      s.ativo = false;
      s.pointerId = -1;
      setArrastando(false);
      if (el?.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
      if (!el) return;

      // Inercia curta. O toque ja tem momentum nativo do sistema; isto vale
      // sobretudo para o arraste com mouse, que sem isso para seco.
      if (e.pointerType === 'mouse' && Math.abs(s.velocidade) > VELOCIDADE_MINIMA) {
        let v = s.velocidade * 16; // px por quadro a 60fps
        const glide = () => {
          v *= ATRITO;
          el.scrollLeft -= v;
          medirProgresso();
          if (Math.abs(v) > 0.5) {
            s.frameInercia = requestAnimationFrame(glide);
          } else {
            s.frameInercia = 0;
          }
        };
        s.frameInercia = requestAnimationFrame(glide);
      }
    },
    [medirProgresso],
  );

  /** Use para nao disparar o clique do card quando o gesto foi arraste. */
  const foiArraste = useCallback(() => estado.current.movido > LIMIAR_CLIQUE, []);

  const onKeyDown = useCallback((e: React.KeyboardEvent<T>) => {
    const el = ref.current;
    if (!el) return;
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    el.scrollBy({ left: e.key === 'ArrowRight' ? PASSO_TECLADO : -PASSO_TECLADO, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    medirProgresso();
    el.addEventListener('scroll', medirProgresso, { passive: true });
    window.addEventListener('resize', medirProgresso);
    return () => {
      el.removeEventListener('scroll', medirProgresso);
      window.removeEventListener('resize', medirProgresso);
      pararInercia();
    };
  }, [medirProgresso, pararInercia]);

  return {
    ref,
    arrastando,
    progresso,
    foiArraste,
    /** Espalhe no elemento da regua. */
    props: {
      onPointerDown,
      onPointerMove,
      onPointerUp: encerrar,
      onPointerCancel: encerrar,
      onKeyDown,
      tabIndex: 0,
      // `data-lenis-prevent` foi REMOVIDO. O brief §6.2 pedia esse atributo em
      // toda regua horizontal, mas ele faz o Lenis ignorar a roda do mouse
      // sobre o elemento inteiro — e como a regua so rola na horizontal, a
      // pagina simplesmente parava de descer quando o ponteiro estava sobre
      // ela. Sem o atributo, a roda vertical volta para o Lenis e o arraste
      // horizontal continua funcionando, porque ele e feito por Pointer Events
      // e nao depende da roda. Divergencia registrada em docs/decisoes.md.
    },
  };
}
