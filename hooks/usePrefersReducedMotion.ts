'use client';

import { useSyncExternalStore } from 'react';

/**
 * Regra 8 do CLAUDE.md: `prefers-reduced-motion` respeitado nos oito efeitos,
 * sem excecao. Quando ativo, o conteudo aparece direto — sem preloader, sem pan,
 * sem parallax, sem expansao.
 *
 * useSyncExternalStore em vez de useEffect: o valor ja sai correto no primeiro
 * render do cliente, entao nao ha um quadro de animacao antes da preferencia ser
 * lida. Durante o prerender estatico assume-se `true` (o estado mais conservador),
 * o que garante que quem tem a preferencia ligada nunca chega a ver movimento.
 */

const QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(callback: () => void): () => void {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot(): boolean {
  return true;
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
