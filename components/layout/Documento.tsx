import type { Metadata } from 'next';
import {
  getMensagens,
  idiomasAlternativos,
  caminhoDoLocale,
  TAG_IDIOMA,
  URL_SITE,
  type Locale,
} from '@/lib/i18n';
import { MensagensProvider } from '@/components/providers/MensagensProvider';
import { LenisProvider } from '@/components/providers/LenisProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ReservaModal } from '@/components/ui/ReservaModal';

/**
 * Documento raiz, compartilhado pelos tres idiomas.
 *
 * Por que existe: no App Router so o root layout pode declarar <html> e <body>,
 * e o `lang` precisa mudar por idioma. A saida e ter tres root layouts, um por
 * grupo de rota — `app/(pt)`, `app/(en)`, `app/(es)`. Para nao triplicar o
 * documento, os tres chamam este componente e passam so o locale.
 *
 * `metadataDoLocale` faz o mesmo pelo lado dos metadados: canonical proprio,
 * hreflang apontando para os tres, e Open Graph no idioma certo.
 */

export function metadataDoLocale(locale: Locale): Metadata {
  const m = getMensagens(locale);

  return {
    title: m.meta.home.title,
    description: m.meta.home.description,
    ...(URL_SITE ? { metadataBase: new URL(URL_SITE) } : {}),
    alternates: {
      canonical: caminhoDoLocale(locale),
      languages: idiomasAlternativos(),
    },
    openGraph: {
      type: 'website',
      locale: locale === 'pt' ? 'pt_BR' : locale,
      siteName: m.site.name,
      title: m.meta.home.title,
      description: m.meta.home.description,
    },
    robots: { index: true, follow: true },
  };
}

export function Documento({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const m = getMensagens(locale);

  return (
    // `suppressHydrationWarning` so na tag <html>, e so por causa de extensao
    // de navegador: varias (gravador de tela, gerenciador de senha, tradutor)
    // carimbam um atributo aqui antes do React hidratar. O HTML do servidor nao
    // tem como prever isso, e o React acusa divergencia.
    //
    // O flag vale APENAS para os atributos deste elemento, e nao desce pela
    // arvore: qualquer divergencia real dentro da pagina continua sendo
    // reportada. E a saida documentada do Next para este caso.
    <html lang={TAG_IDIOMA[locale]} suppressHydrationWarning>
      {/* eslint-disable-next-line @next/next/no-head-element --
          A regra existe para impedir <head> dentro de uma pagina; aqui isto E o
          corpo de um root layout, so extraido para um componente porque os tres
          idiomas o compartilham. `next/head` e da Pages Router e nao se aplica. */}
      <head>
        {/* Fontes acima da dobra. O italico do subtitulo carrega com swap: sao
            140KB para uma linha, nao vale bloquear a pintura por ele. */}
        <link
          rel="preload"
          href="/fonts/newsreader-variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/jost-variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <MensagensProvider m={m} locale={locale}>
          <a
            href="#conteudo"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-3 focus:font-sans focus:text-menu focus:uppercase focus:text-ink"
          >
            {m.a11y.pularParaConteudo}
          </a>

          <LenisProvider>
            <Header />
            <main id="conteudo" aria-label={m.a11y.conteudoPrincipal}>
              {children}
            </main>
            <Footer locale={locale} />
            {/* Montado uma vez so, fora do <main>: e chamado tanto pelo botao do
                cabecalho quanto pelo botao sobre a foto da Arquitetura. */}
            <ReservaModal />
          </LenisProvider>
        </MensagensProvider>
      </body>
    </html>
  );
}
