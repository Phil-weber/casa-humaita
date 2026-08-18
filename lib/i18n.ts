import pt from '@/messages/pt.json';
import en from '@/messages/en.json';
import es from '@/messages/es.json';

/**
 * Arquitetura de idiomas — brief.md §9.
 *
 * Os tres idiomas estao publicados. O site inteiro le `Mensagens`, nunca uma
 * string literal, entao acrescentar EN e ES custou traduzir os JSON e passar o
 * locale adiante — nao houve refatoracao de componente, que era exatamente o que
 * o §9 queria evitar pagar depois.
 *
 * Nota de arquitetura (aprovada): com `output: 'export'` nao ha middleware nem
 * rewrite, entao PT e servido na raiz em vez de `/pt`, e EN e ES entram como
 * pastas irmas. Cada idioma tem seu proprio root layout — sao tres grupos de
 * rota em `app/`, porque so o root layout pode declarar <html lang>, e o lang
 * precisa mudar por idioma.
 *
 * `Mensagens` continua derivado do PT: e ele que define o contrato de chaves, e
 * o TypeScript quebra o build se en.json ou es.json divergir.
 */

export const LOCALES = ['pt', 'en', 'es'] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_PADRAO: Locale = 'pt';

/** Idiomas com traducao publicada. Alimenta o hreflang e o seletor de idioma. */
export const LOCALES_PUBLICADOS: readonly Locale[] = ['pt', 'en', 'es'];

export type Mensagens = typeof pt;

const DICIONARIOS: Record<Locale, Mensagens> = { pt, en, es };

export function getMensagens(locale: Locale = LOCALE_PADRAO): Mensagens {
  return DICIONARIOS[locale] ?? pt;
}

/** Codigo BCP-47 para o atributo `lang` e para o Open Graph. */
export const TAG_IDIOMA: Record<Locale, string> = {
  pt: 'pt-BR',
  en: 'en',
  es: 'es',
};

/**
 * Caminho da home em cada idioma. PT fica na raiz por decisao do §9, entao nao
 * ha `/pt`. `trailingSlash: true` no next.config exige a barra final.
 */
export function caminhoDoLocale(locale: Locale): string {
  return locale === LOCALE_PADRAO ? '/' : `/${locale}/`;
}

/** Mapa de alternates para o hreflang, com os tres idiomas publicados. */
export function idiomasAlternativos(): Record<string, string> {
  return Object.fromEntries(
    LOCALES_PUBLICADOS.map((l) => [TAG_IDIOMA[l], caminhoDoLocale(l)]),
  );
}

/** Datas e numeros por Intl, nunca escritos a mao — brief §9. */
export function formatarNumero(valor: number, locale: Locale = LOCALE_PADRAO): string {
  return new Intl.NumberFormat(locale === 'pt' ? 'pt-BR' : locale).format(valor);
}

/**
 * TODO: falta o dominio de producao — nao consta em nenhum dos documentos.
 * Necessario para canonical, hreflang, sitemap.xml e Open Graph (brief §10).
 * Definir em NEXT_PUBLIC_SITE_URL no build; ate la, os metadados ficam relativos.
 */
export const URL_SITE = process.env.NEXT_PUBLIC_SITE_URL ?? '';
