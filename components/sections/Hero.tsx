'use client';

import { useEffect, useRef } from 'react';
import { useMensagens } from '@/components/providers/MensagensProvider';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { IMAGENS } from '@/lib/images.generated';
import { SeletorIdioma } from '@/components/ui/SeletorIdioma';
import { abrirReserva } from '@/components/ui/ReservaModal';

/**
 * Secao 1 — Hero. Escuro. Porte fiel de `reference/hero.html`, aprovado pelo
 * cliente, com as cinco correcoes obrigatorias do brief §12:
 *
 *  1. Progresso pelo rect do proprio hero, nao pelo scroll da pagina inteira.
 *     No prototipo isolado a pagina era so o hero; com a home completa embaixo,
 *     `scrollY / scrollHeight` espalharia o pan por toda a altura do site e o
 *     hero praticamente nao andaria.
 *  2. `object-position` -> `translate3d`. Animar object-position nao e acelerado
 *     por GPU e trava no Safari mobile.
 *  3. Links do menu de 9px para 11px, mantendo o tracking.
 *  4. `scroll-behavior: smooth` removido do html (feito em globals.css).
 *  5. Todo o resto identico: escala tipografica, contador, barra, legenda em .72,
 *     posicao da logo, vinheta.
 *
 * O lerp de 0.07 vem da prop `smoothness` do arquivo aprovado — e diferente do
 * Lenis (0.09) de proposito: o pan atrasa um pouco em relacao a pagina, e e isso
 * que da a sensacao de peso da imagem.
 */

const PROFUNDIDADE_VH = 340; // brief §7·1
const LERP = 0.07;
const LEGENDA_EM = 0.72; // brief §6
const HERO = IMAGENS['hero-casa-humaita'];

export function Hero() {
  const m = useMensagens();
  const reduzir = usePrefersReducedMotion();

  const raizRef = useRef<HTMLDivElement>(null);
  const panRef = useRef<HTMLDivElement>(null);
  const tituloRef = useRef<HTMLDivElement>(null);
  const contadorRef = useRef<HTMLSpanElement>(null);
  const barraRef = useRef<HTMLSpanElement>(null);
  const dicaRef = useRef<HTMLSpanElement>(null);
  const legendaRef = useRef<HTMLDivElement>(null);
  const vinhetaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduzir) return;

    const raiz = raizRef.current;
    const pan = panRef.current;
    if (!raiz || !pan) return;

    let atual = 0;
    let alvo = 0;
    let frame = 0;
    const limitar = (v: number) => Math.min(1, Math.max(0, v));

    const medirAlvo = () => {
      // Correcao §12.1 — progresso relativo ao container do hero.
      const r = raiz.getBoundingClientRect();
      const percurso = r.height - window.innerHeight;
      alvo = percurso > 0 ? limitar(-r.top / percurso) : 0;
    };

    const tick = () => {
      medirAlvo();
      atual += (alvo - atual) * LERP;
      const p = atual;

      // Correcao §12.2 — translate3d, nao object-position.
      const excedente = pan.offsetHeight - window.innerHeight;
      pan.style.transform = `translate3d(0, ${(-p * Math.max(0, excedente)).toFixed(1)}px, 0)`;

      const t = tituloRef.current;
      if (t) {
        t.style.transform = `translate3d(0, ${(-p * 90).toFixed(1)}px, 0) scale(${(1 - p * 0.1).toFixed(4)})`;
        t.style.opacity = (1 - limitar((p - 0.28) / 0.32)).toFixed(3);
      }
      if (contadorRef.current) {
        contadorRef.current.textContent = String(Math.round(p * 100)).padStart(2, '0');
      }
      if (barraRef.current) barraRef.current.style.width = `${(p * 100).toFixed(1)}%`;
      if (dicaRef.current) dicaRef.current.style.opacity = (0.85 * (1 - limitar(p / 0.2))).toFixed(3);
      if (legendaRef.current) {
        legendaRef.current.style.opacity = limitar((p - LEGENDA_EM) / 0.2).toFixed(3);
      }
      if (vinhetaRef.current) vinhetaRef.current.style.opacity = (0.75 + 0.25 * p).toFixed(3);

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduzir]);

  const linksMenu = [m.nav.hero.rooms, m.nav.hero.contact];
  const srcset = (ext: 'avif' | 'webp') =>
    HERO.larguras.map((w) => `/images/hero-casa-humaita-${w}.${ext} ${w}w`).join(', ');

  return (
    <div
      ref={raizRef}
      data-tone="dark"
      className="relative w-full bg-navy text-on-dark"
      style={{ height: reduzir ? '100vh' : `${PROFUNDIDADE_VH}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Camada que desliza. A imagem tem, no minimo, 130vh de altura, entao
            sempre sobra percurso para o pan — inclusive em tela estreita, onde a
            proporcao nativa sozinha nao bastaria. */}
        <div
          ref={panRef}
          className="absolute inset-x-0 top-0 will-change-transform"
          style={{ height: `max(130vh, ${((HERO.h / HERO.w) * 100).toFixed(2)}vw)` }}
        >
          <picture>
            <source type="image/avif" srcSet={srcset('avif')} sizes="100vw" />
            <source type="image/webp" srcSet={srcset('webp')} sizes="100vw" />
            <img
              src={`/images/hero-casa-humaita-1200.webp`}
              alt={m.alt.hero}
              width={HERO.w}
              height={HERO.h}
              sizes="100vw"
              className="h-full w-full object-cover"
              fetchPriority="high"
              decoding="sync"
              draggable={false}
            />
          </picture>
        </div>

        <div
          ref={vinhetaRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(6,20,34,0.34) 0%, rgba(6,20,34,0.04) 34%, rgba(6,20,34,0) 62%, rgba(6,20,34,0.42) 100%)',
            opacity: 0.75,
          }}
        />

        {/* Passagem para a secao clara. Sem isso o hero termina numa aresta dura
            entre a foto e o branco. Este degrade dissolve a base da imagem no
            fundo da secao seguinte, entao a virada acontece dentro do hero e nao
            existe mais "linha" separando as duas. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[38vh]"
          style={{
            background:
              'linear-gradient(180deg, rgba(251,251,251,0) 0%, rgba(251,251,251,0.06) 42%, rgba(251,251,251,0.42) 74%, rgba(251,251,251,0.88) 92%, #fbfbfb 100%)',
          }}
        />

        {/* Grade do arquivo aprovado: topo / centro / base */}
        <div className="absolute inset-0 grid grid-rows-[auto_1fr_auto] px-5 py-10 md:px-12">
          {/* topo — logo e menu inicial */}
          <div className="flex items-start justify-between gap-6 md:gap-10">
            <img
              src="/brand/logo-humaita-branca.png"
              alt={m.alt.logo}
              width={597}
              height={418}
              className="w-[92px] self-start opacity-95 md:w-[132px]"
              fetchPriority="high"
            />
            {/* Bloco alinhado a direita: a linha de "Reserve sua estadia" fecha
                exatamente na mesma coluna em que terminam os dois links abaixo,
                porque os tres compartilham a mesma caixa e `items-end`. */}
            <div className="flex flex-col items-end gap-4 text-right">
              {/* A largura de 7em faz "Reserve sua estadia" quebrar em duas
                  linhas sozinho, sem partir a string. O sublinhado fica na borda
                  do bloco, entao termina na mesma coluna dos dois links abaixo. */}
              {/* Era uma ancora para #contato. Virou botao: abre o mesmo modulo
                  de reserva do cabecalho e da foto da Arquitetura, para os tres
                  caminhos de reserva do site levarem ao mesmo formulario. */}
              <button
                type="button"
                onClick={abrirReserva}
                className="group relative block w-[7em] pb-[3px] text-left font-serif text-[19px] font-normal leading-[1.15] tracking-[0.01em]"
              >
                {m.nav.hero.book.label}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-px origin-right scale-x-100 bg-white/80 transition-transform duration-300 ease-out group-hover:scale-x-0 group-focus-visible:scale-x-0"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-white transition-transform delay-150 duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
              </button>

              <div className="flex flex-col items-end gap-2">
                {linksMenu.map((link) => (
                  <a
                    key={link.href + link.label}
                    href={link.href}
                    // Correcao §12.3 — era 9px no arquivo aprovado.
                    className="group relative font-sans text-menu uppercase"
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1 right-0 h-px w-full origin-right scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100 group-focus-visible:origin-left group-focus-visible:scale-x-100"
                    />
                  </a>
                ))}
              </div>

              {/* Seletor de idioma fechando a coluna da direita. `self-stretch`
                  faz o bloco assumir a largura da coluna — que e a do link mais
                  largo, "Reserve sua estadia" — e e isso que alinha as letras do
                  PT|EN|ES com as dos dois links acima. Filete separando para
                  nao ser lido como um terceiro item do menu. */}
              <div className="mt-1 self-stretch border-t border-white/25 pt-3.5">
                <SeletorIdioma variante="hero" />
              </div>
            </div>
          </div>

          {/* centro — titulo */}
          <div className="flex flex-col items-center justify-center text-center">
            <div ref={tituloRef} className="will-change-[transform,opacity]">
              <div className="mb-[22px] font-sans text-eyebrow-hero uppercase opacity-85">
                {m.hero.eyebrow}
              </div>
              <h1 className="text-balance font-serif text-h1-hero font-light">{m.hero.title}</h1>
              <p className="mt-3.5 font-serif text-[clamp(20px,2.4vw,34px)] font-light italic opacity-90">
                {m.hero.subtitle}
              </p>
            </div>
          </div>

          {/* base — contador, barra, dica e legenda */}
          <div className="flex items-end justify-between gap-6 md:gap-10">
            <div className="flex items-center gap-3.5 font-sans text-caption uppercase">
              <span ref={contadorRef} className="tabular-nums opacity-75">
                {m.hero.counter}
              </span>
              <span className="relative block h-px w-24 overflow-hidden bg-white/35">
                <span ref={barraRef} className="absolute left-0 top-0 h-full w-0 bg-white" />
              </span>
              <span ref={dicaRef} className="opacity-85">
                {m.hero.scroll}
              </span>
            </div>

            <div
              ref={legendaRef}
              className="max-w-[320px] text-right font-sans text-caption uppercase leading-[1.9]"
              style={{ opacity: reduzir ? 1 : 0 }}
            >
              {m.hero.caption}
              <br />
              <a
                href={m.hero.captionCta.href}
                className="border-b border-white/70 pb-0.5 transition-opacity duration-200 ease-out hover:opacity-70"
              >
                {m.hero.captionCta.label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
