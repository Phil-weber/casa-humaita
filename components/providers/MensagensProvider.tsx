'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { Locale, Mensagens } from '@/lib/i18n';

/**
 * Disponibiliza o dicionario para componentes de cliente.
 * Componentes de servidor chamam `getMensagens()` direto, sem passar por aqui.
 *
 * Regra 5 do CLAUDE.md: nenhuma string literal em JSX. Tudo entra por este canal.
 */

interface Contexto {
  m: Mensagens;
  locale: Locale;
}

const MensagensContext = createContext<Contexto | null>(null);

export function MensagensProvider({
  m,
  locale,
  children,
}: {
  m: Mensagens;
  locale: Locale;
  children: ReactNode;
}) {
  return <MensagensContext.Provider value={{ m, locale }}>{children}</MensagensContext.Provider>;
}

export function useMensagens(): Mensagens {
  const ctx = useContext(MensagensContext);
  if (!ctx) throw new Error('useMensagens precisa estar dentro de <MensagensProvider>.');
  return ctx.m;
}

export function useLocale(): Locale {
  const ctx = useContext(MensagensContext);
  if (!ctx) throw new Error('useLocale precisa estar dentro de <MensagensProvider>.');
  return ctx.locale;
}
