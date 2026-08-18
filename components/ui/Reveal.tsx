'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * Efeito 6 do orcamento — brief §6.
 *
 * IntersectionObserver, dispara uma vez (`once`), deslocamento de 6px + opacidade,
 * escalonamento maximo de 60ms entre itens. Nunca em loop, nunca ao rolar de volta.
 *
 * Decisoes de implementacao:
 *
 * - A transicao e CSS, nao JS. Animacao CSS roda fora da main thread e continua
 *   fluida enquanto o navegador carrega imagem; o observador so troca um atributo.
 *   Isso tambem mantem o efeito fora do orcamento de 200KB de JS.
 * - Um unico observador compartilhado por toda a pagina, em vez de um por item.
 * - So `opacity` e `transform` mudam: sem layout, sem paint.
 * - Curva `cubic-bezier(.22,.61,.36,1)` — e a mesma do arquivo de Localizacao
 *   aprovado pelo cliente, entao a pagina inteira desacelera do mesmo jeito.
 * - 500ms: entrada de conteudo vista uma vez so, num site de tom contido. Curto
 *   demais vira pisca; longo demais faz o scroll parecer preso.
 * - Com `prefers-reduced-motion`, o conteudo ja nasce visivel — o observador nem
 *   e criado (CLAUDE.md regra 8).
 */

const MARGEM = '0px 0px -12% 0px';
const STAGGER_MS = 60; // teto do brief §6.6
const DURACAO_MS = 500;

type Observador = {
  observe: (el: Element) => void;
  unobserve: (el: Element) => void;
};

let observadorCompartilhado: Observador | null = null;
const callbacks = new WeakMap<Element, () => void>();

function obterObservador(): Observador | null {
  if (typeof IntersectionObserver === 'undefined') return null;
  if (!observadorCompartilhado) {
    const io = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          callbacks.get(entrada.target)?.();
          io.unobserve(entrada.target); // once: true
        }
      },
      { rootMargin: MARGEM, threshold: 0 },
    );
    observadorCompartilhado = io;
  }
  return observadorCompartilhado;
}

export function Reveal({
  children,
  as: Tag = 'div',
  index = 0,
  className = '',
}: {
  children: ReactNode;
  /** Elemento renderizado. Use para nao quebrar a semantica do contexto. */
  as?: ElementType;
  /** Posicao na cascata. O atraso satura em 60ms x 6 para listas longas. */
  index?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduzirMovimento = usePrefersReducedMotion();
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    if (reduzirMovimento) {
      setVisivel(true);
      return;
    }
    const el = ref.current;
    const io = obterObservador();
    if (!el || !io) {
      setVisivel(true); // sem suporte: mostra, nunca esconde
      return;
    }
    callbacks.set(el, () => setVisivel(true));
    io.observe(el);
    return () => {
      callbacks.delete(el);
      io.unobserve(el);
    };
  }, [reduzirMovimento]);

  const animar = !reduzirMovimento && !visivel;

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: animar ? 0 : 1,
        transform: animar ? 'translate3d(0, var(--reveal-y), 0)' : 'translate3d(0, 0, 0)',
        transition: reduzirMovimento
          ? undefined
          : `opacity ${DURACAO_MS}ms cubic-bezier(.22,.61,.36,1) ${Math.min(index, 6) * STAGGER_MS}ms, transform ${DURACAO_MS}ms cubic-bezier(.22,.61,.36,1) ${Math.min(index, 6) * STAGGER_MS}ms`,
        willChange: animar ? 'opacity, transform' : undefined,
      }}
    >
      {children}
    </Tag>
  );
}
