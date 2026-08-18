import { getMensagens, type Locale } from '@/lib/i18n';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Photo } from '@/components/ui/Photo';
import type { ImagemId } from '@/lib/images.generated';

/**
 * Secao 8 — Conheca Buzios. Claro.
 *
 * Brief §7·8: H2 em duas linhas de display, a segunda em peso mais leve com
 * filete abaixo. A direita, texto curto de intro em Jost caixa-alta.
 *
 * Abaixo, o zigue-zague: filete vertical dividindo a pagina em duas colunas, e
 * filetes horizontais DESALINHADOS entre as colunas — e o desalinhamento que
 * produz o zigue-zague. Os cards da direita entram deslocados para baixo.
 *
 * Contagem LISTADA, nunca contagem de visualizacoes: site novo tem zero, e numero
 * inventado e falso.
 *
 * O `+` aponta para as paginas de guia, que nao entram nesta fase: link inativo
 * com `aria-disabled`.
 *
 * PENDENCIAS REGISTRADAS (docs/decisoes.md D7 e A1):
 *  - O 4o card ("casamento", incluido no escopo pelo cliente) nao tem copy:
 *    faltam titulo, tag e contagem. Nao pode ser construido sem essas strings.
 *  - O brief pede "o ano em tom mais claro" na assinatura, mas o copy.md nao
 *    define ano nenhum para os cards. Omitido em vez de inventado.
 */

const CAPAS: Record<string, ImagemId> = {
  gastronomia: 'vitrine-gastronomia',
  praias: 'vitrine-praias',
  passeios: 'orla-clean', // era vitrine-regiao — troca do cliente
  casamento: 'vitrine-casamento',
};

export function Buzios({ locale }: { locale: Locale }) {
  // `locale` vem por prop: componente de servidor nao le o MensagensProvider,
  // e `getMensagens()` sem argumento devolveria sempre portugues.
  const m = getMensagens(locale);

  return (
    <Section id="buzios" tone="light" className="!pt-[clamp(56px,7vh,96px)]">
      <div className="container-humaita">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-20">
          <h2 className="font-serif text-h2 text-ink">
            <span className="block">{m.buzios.title.line1}</span>
            <span className="mt-1 block border-b border-rule pb-4 font-light text-faint">
              {m.buzios.title.line2}
            </span>
          </h2>
          <p className="max-w-sm font-sans text-caption uppercase leading-[2] text-body">
            {m.buzios.intro}
          </p>
        </div>

        {/* Zigue-zague: filete vertical central, cards alternando de coluna. */}
        <ul className="mt-14 grid gap-x-16 md:grid-cols-2 md:border-l md:border-rule">
          {m.buzios.cards.map((card, i) => {
            const capa = CAPAS[card.id];
            const daDireita = i % 2 === 1;
            return (
              <Reveal
                as="li"
                key={card.id}
                index={i}
                className={[
                  'border-t border-rule',
                  // O deslocamento vertical da coluna da direita e o que
                  // desalinha os filetes e cria o zigue-zague.
                  daDireita ? 'md:col-start-2 md:mt-16' : 'md:col-start-1',
                ].join(' ')}
              >
                <article className="group relative flex flex-col gap-6 py-10 transition-transform duration-300 ease-out md:px-8 md:hover:-translate-y-1">
                  {capa && (
                    <div className="overflow-hidden rounded">
                      <Photo
                        id={capa}
                        alt={m.alt.fotos[capa as keyof typeof m.alt.fotos] ?? card.title}
                        sizes="(max-width: 768px) 100vw, 45vw"
                        className="aspect-[4/3] w-full max-w-[420px] object-cover"
                      />
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <h3 className="max-w-[12ch] font-serif text-h2 text-ink">{card.title}</h3>
                      <p className="mt-5 font-sans text-caption uppercase text-faint">
                        {m.buzios.signature}
                      </p>
                    </div>
                    {card.count && (
                      <span className="shrink-0 font-sans text-caption uppercase text-faint">
                        {card.count}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex items-center rounded-pill border border-rule px-4 py-2 font-sans text-caption uppercase text-blue">
                      {card.tag}
                    </span>

                    {/* Fase 2: inativo. Em touch o `+` fica sempre visivel; no
                        desktop ele aparece no hover, conforme o brief. */}
                    <span
                      role="link"
                      aria-disabled="true"
                      aria-label={m.buzios.cardCta}
                      className="flex h-11 w-11 cursor-not-allowed items-center justify-center rounded-pill border border-rule text-faint opacity-100 transition-opacity duration-200 ease-out md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100"
                    >
                      <span aria-hidden="true">+</span>
                    </span>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
