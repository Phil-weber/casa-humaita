'use client';

import { useLocale, useMensagens } from '@/components/providers/MensagensProvider';
import { LOCALES_PUBLICADOS, caminhoDoLocale, TAG_IDIOMA, type Locale } from '@/lib/i18n';

/**
 * Seletor de idioma — PT | EN | ES.
 *
 * Um componente para os tres lugares onde ele aparece: o menu do hero, o
 * cabecalho pos-hero e o rodape. As variantes mudam so a escala e o espacamento;
 * a cor sai de `currentColor`, entao ele funciona igual sobre a foto escura do
 * hero e sobre o vidro claro do cabecalho, sem precisar saber do tom.
 *
 * Sao ancoras de verdade, e nao botoes com router: com `output: 'export'` cada
 * idioma e um documento estatico proprio (`/`, `/en/`, `/es/`). Navegar por link
 * mantem o historico, o "abrir em nova aba" e o rastreamento dos buscadores.
 *
 * `hrefLang` em cada link fecha o par com o `alternates.languages` do metadata:
 * um diz ao buscador que a alternativa existe, o outro confirma no corpo.
 */

type Variante = 'hero' | 'header' | 'footer';

/**
 * A variante `hero` ocupa a LARGURA INTEIRA da coluna e distribui os cinco itens
 * (tres rotulos + dois filetes) por igual. E o que faz o P de "PT" cair na mesma
 * coluna do V de "Veja os comodos" e o S de "ES" fechar junto com o S de
 * "contatos" — antes so a borda direita coincidia, e o bloco ficava 40px mais
 * curto que os links de cima.
 *
 * Sobe tambem de `menu` (11px) para `eyebrow` (12px), que e o maior tamanho de
 * texto utilitario que existe na escala do brief.
 */
const ESCALA: Record<Variante, string> = {
  hero: 'w-full justify-between text-eyebrow',
  header: 'gap-2 text-menu',
  footer: 'gap-3 text-menu',
};

export function SeletorIdioma({
  variante = 'header',
  className = '',
}: {
  variante?: Variante;
  className?: string;
}) {
  const m = useMensagens();
  const atual = useLocale();

  return (
    <ul
      className={`flex items-center font-sans uppercase ${ESCALA[variante]} ${className}`}
      // Um `aria-label` fixo em ingles seria a unica string do site fora do
      // dicionario; `site.name` ja identifica o grupo sem inventar texto.
      aria-label={m.site.name}
    >
      {LOCALES_PUBLICADOS.flatMap((locale, i) => {
        const ativo = locale === atual;
        const rotulo = m.footer.lang[locale as Locale];

        // O filete e um item IRMAO, e nao um pedaco do rotulo. So assim o
        // `justify-between` da variante `hero` distribui os cinco elementos por
        // igual; se ele morasse dentro do <li>, os tres blocos se espalhariam e
        // os separadores ficariam colados nos rotulos.
        const separador =
          i > 0 ? (
            <li key={`${locale}-sep`} aria-hidden="true" className="select-none opacity-30">
              |
            </li>
          ) : null;

        return [
          separador,
          <li key={locale} className="flex items-center">
            {ativo ? (
              // O idioma corrente nao e link: nao ha para onde ir, e um link que
              // aponta para a pagina atual so atrapalha quem navega por teclado.
              <span aria-current="true" className="opacity-100">
                {rotulo}
              </span>
            ) : (
              <a
                href={caminhoDoLocale(locale)}
                hrefLang={TAG_IDIOMA[locale]}
                lang={TAG_IDIOMA[locale]}
                // `py-2 -my-2` cresce a area de toque de 12px para 28px sem
                // mexer no layout: a margem negativa devolve o que o padding
                // ocupou. O texto tem 12px e o dedo nao tem — o alvo precisa
                // ser maior que a letra num site que roda sobretudo no celular.
                className="-my-2 py-2 opacity-50 transition-opacity duration-200 ease-out hover:opacity-100 focus-visible:opacity-100"
              >
                {rotulo}
              </a>
            )}
          </li>,
        ];
      })}
    </ul>
  );
}
