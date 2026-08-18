'use client';

import { useMensagens } from '@/components/providers/MensagensProvider';
import { useDragRail } from '@/hooks/useDragRail';

/**
 * Secao 7 — Avaliacoes. Claro.
 *
 * Bloco superior centralizado: H2, subtitulo com 4,91/5, logo do Airbnb ao lado e
 * "+40 avaliacoes". Abaixo, duas colunas: a esquerda as aspas em display, o
 * titulo e os controles; a direita a faixa horizontal de 10 cards.
 *
 * Cada card: cinco estrelas, texto, nome, origem ou tempo no Airbnb, data.
 * SEM foto de rosto (brief §7·7). Credito com link para o anuncio, uma vez.
 *
 * Os textos sao dos hospedes, publicados no Airbnb. Foram encurtados, nunca
 * reescritos. As palavras "sonho" e "deslumbrante" nos cards 5 e 6 sao citacao,
 * nao texto nosso — nao editar a fala do hospede para caber no vocabulario
 * proibido (copy.md §7).
 *
 * A logo do Airbnb usa o asset oficial, sem alterar cor nem proporcao.
 */
export function Avaliacoes() {
  const m = useMensagens();
  const rail = useDragRail<HTMLDivElement>();

  return (
    <>
      <div className="container-humaita">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 className="font-serif text-h2 text-ink">{m.reviews.title}</h2>
          <p className="mt-6 flex flex-wrap items-center justify-center gap-3 font-serif text-corpo text-body">
            <span className="font-serif text-card-label-lg text-ink">{m.reviews.rating}</span>
            <img
              src="/brand/airbnb.webp"
              alt={m.alt.airbnb}
              width={960}
              height={300}
              className="h-5 w-auto"
              loading="lazy"
            />
            <span>{m.reviews.count}</span>
          </p>
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-16">
          {/* coluna esquerda — aspas, titulo e controles */}
          <div className="flex flex-col">
            <span aria-hidden="true" className="font-serif text-[120px] leading-[0.6] text-rule">
              &ldquo;
            </span>
            <h3 className="mt-6 font-serif text-h2 text-ink">{m.reviews.quoteTitle}</h3>

            <div className="mt-10 flex items-center gap-4">
              <button
                type="button"
                onClick={() => rail.ref.current?.scrollBy({ left: -360, behavior: 'smooth' })}
                aria-label={m.lightbox.prev}
                className="flex h-11 w-11 items-center justify-center rounded-pill border border-rule text-ink transition-colors duration-200 ease-out hover:border-blue hover:text-blue"
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                type="button"
                onClick={() => rail.ref.current?.scrollBy({ left: 360, behavior: 'smooth' })}
                aria-label={m.lightbox.next}
                className="flex h-11 w-11 items-center justify-center rounded-pill border border-rule text-ink transition-colors duration-200 ease-out hover:border-blue hover:text-blue"
              >
                <span aria-hidden="true">→</span>
              </button>
              <span className="relative ml-2 h-px flex-1 overflow-hidden bg-rule" aria-hidden="true">
                <span
                  className="absolute left-0 top-0 h-full bg-blue transition-[width] duration-150 ease-out"
                  style={{ width: `${Math.max(6, rail.progresso * 100)}%` }}
                />
              </span>
            </div>

            <p className="mt-10 font-sans text-caption uppercase text-faint">
              {m.reviews.credit}{' '}
              <a
                href={m.site.airbnbUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-faint text-blue transition-colors duration-200 ease-out hover:border-blue"
              >
                {m.reviews.creditLink}
              </a>
            </p>
          </div>

          {/* coluna direita — faixa de cards */}
            <div
              ref={rail.ref}
              {...rail.props}
              role="group"
              aria-label={m.reviews.title}
              className="rail-scroll flex gap-6 overflow-x-auto overflow-y-hidden pb-4"
              style={{ cursor: rail.arrastando ? 'grabbing' : 'grab' }}
            >
              {m.reviews.items.map((item, i) => (
                <figure
                  key={`${item.name}-${i}`}
                  className="flex w-[300px] shrink-0 flex-col justify-between rounded border border-rule p-8 md:w-[340px]"
                >
                  <div>
                    <span className="font-sans text-caption tracking-[0.3em] text-blue" aria-label={`${item.stars}/5`}>
                      <span aria-hidden="true">{'★'.repeat(item.stars)}</span>
                    </span>
                    <blockquote className="mt-6 font-serif text-corpo text-body">{item.text}</blockquote>
                  </div>
                  <figcaption className="mt-8">
                    <span className="block font-serif text-card-label text-ink">{item.name}</span>
                    <span className="mt-1 block font-sans text-caption uppercase text-faint">
                      {item.meta}
                      {item.date ? ` · ${item.date}` : ''}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
        </div>
      </div>
    </>
  );
}
