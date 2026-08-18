'use client';

import { useCallback, useState } from 'react';
import { useMensagens } from '@/components/providers/MensagensProvider';
import { useDragRail } from '@/hooks/useDragRail';
import { LUGARES, rota, type Lugar } from '@/lib/places';
import { IMAGENS } from '@/lib/images.generated';

const srcsetMapa = (ext: 'avif' | 'webp') =>
  IMAGENS['mapa'].larguras.map((w) => `/images/mapa-${w}.${ext} ${w}w`).join(', ');

/**
 * Secao 6 — Localizacao. Claro. Porte fiel de `reference/localizacao.html`.
 *
 * Correcoes obrigatorias do brief §12:
 *
 *  1. Hover-only -> Pointer Events. O arquivo usava onMouseEnter/onMouseLeave nos
 *     pins e escutava mousemove/mouseup na window para o arraste. No celular nada
 *     disso existia: os 14 pins ficavam mortos, nenhuma rota aparecia e a regua
 *     nao arrastava. No toque, um toque no pin seleciona e outro desmarca.
 *  2. `data-lenis-prevent` na regua (vem do useDragRail).
 *  3. Distancias corrigidas (em lib/places.ts).
 *  4. `id` renomeados para bater com os nomes (em lib/places.ts).
 *  5. Etiqueta dos pins era 'Helvetica Neue' -> Jost.
 *  6. Texto de intro substituido pelo do copy.md §6.
 *  7. `style-hover` (construto do Claude Design, nao e HTML) -> classe CSS.
 *  8. mapa.png em 1920x1080 exibido ate 1680px — levemente mole em retina.
 *     Mantido por ora; trocar por SVG quando houver.
 *
 * Preservados: o grafo de nos, a funcao smooth(), o clip-path do card, o pin que
 * centraliza o card correspondente, a animacao revealRoute e o trailDrift.
 *
 * PENDENCIA A4: as fotos dos 14 cards nao existem no assets.md. O clip-path esta
 * construido e funcional; o slot fica vazio ate as fotos chegarem.
 */
export function Localizacao() {
  const m = useMensagens();
  const rail = useDragRail<HTMLDivElement>();
  const [ativo, setAtivo] = useState<string | null>(null);

  const lugarAtivo = LUGARES.find((l) => l.id === ativo) ?? null;

  /** Selecao a partir do pin: centraliza o card correspondente na regua. */
  const doPin = useCallback(
    (lugar: Lugar, i: number) => {
      // No toque, um toque seleciona e outro desmarca (§12.1).
      setAtivo((atual) => (atual === lugar.id ? null : lugar.id));
      const el = rail.ref.current;
      const card = el?.children[i] as HTMLElement | undefined;
      if (!el || !card) return;
      const alvo = card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2;
      el.scrollTo({ left: Math.max(0, alvo), behavior: 'smooth' });
    },
    [rail.ref],
  );

  return (
    <>
      <div className="container-humaita flex flex-wrap items-start justify-between gap-12">
        <div className="max-w-[680px]">
          <p className="mb-[22px] font-sans text-eyebrow uppercase text-blue">{m.location.eyebrow}</p>
          <h2 className="text-pretty font-serif text-h2 text-ink">{m.location.title}</h2>
          <p className="mt-[22px] max-w-intro text-pretty font-serif text-corpo text-body">
            {m.location.intro}
          </p>
        </div>
        <p className="pt-2.5 font-sans text-caption uppercase text-faint">{m.location.region}</p>
      </div>

      {/* Mapa mais estreito que a coluna: em largura total a proporcao 1920x1080
          tornava a secao alta demais.

          A arte tem 9,1% de faixa vazia no topo e 14,4% na base (bbox da tinta:
          y 98..924 de 1080), entao o mapa PARECE distante do texto mesmo
          encostado nele. A margem negativa voltou — mas agora e segura: a arte
          e transparente e o <img> e `pointer-events-none`, entao a sobra de cima
          passa por cima do paragrafo sem tapar nem bloquear nada. Recortar o
          `aspect` seria a outra saida, e desalinharia todos os pinos, que sao
          posicionados em % do container de 1920x1080.

          Nao passar de -mt-12: o pino mais alto esta em y=158 (14,6% da altura)
          e a logo em 5,1% — acima disso eles comecam a encostar no texto. */}
      <div className="container-humaita -mt-6 md:-mt-12">
        <div className="relative mx-auto aspect-[1920/1080] w-full max-w-[1120px]">
          {/* A arte do mapa agora e transparente: so o traco em azul tem pixel,
              98,4% da imagem e alfa zero. Antes era uma chapa opaca de 1920x1080
              em #FBFBFB — a mesma cor do fundo, mas comprimida com perdas, e o
              ruido do codec desenhava um retangulo visivel sobre o fundo chapado
              do CSS. Sem chapa, o fundo da secao passa direto e nao ha o que
              destoar. Original guardado em .assetsrc/mapa-chapa-opaca.png.bak. */}
          <picture>
            <source type="image/avif" srcSet={srcsetMapa('avif')} sizes="(max-width: 1120px) 100vw, 1120px" />
            <source type="image/webp" srcSet={srcsetMapa('webp')} sizes="(max-width: 1120px) 100vw, 1120px" />
            <img
              src="/images/mapa-1200.webp"
              alt={m.alt.mapa}
              width={1920}
              height={1080}
              className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain"
              loading="lazy"
              draggable={false}
            />
          </picture>
          <img
            src="/brand/mapa-logo.png"
            alt=""
            width={300}
            height={300}
            className="pointer-events-none absolute w-[15.6%] select-none"
            style={{ left: '74.2%', top: '5.1%' }}
            loading="lazy"
            draggable={false}
          />

          <svg
            viewBox="0 0 1920 1080"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          >
            {/* trilha ambiente — trailDrift */}
            <path
              d="M 1126 308 C 1200 344 1288 330 1348 288 C 1392 258 1408 240 1440 236"
              fill="none"
              stroke="var(--blue)"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeDasharray="2.5 13"
              opacity={lugarAtivo ? 0.2 : 0.85}
              className="animate-[trailDrift_24s_linear_infinite] transition-opacity duration-500 ease-out"
            />
            {lugarAtivo && (
              <>
                <mask id="routeReveal" maskUnits="userSpaceOnUse">
                  <path
                    key={lugarAtivo.id}
                    d={rota(lugarAtivo)}
                    pathLength={1000}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="16"
                    strokeLinecap="round"
                    strokeDasharray="1000"
                    className="animate-[revealRoute_1.15s_cubic-bezier(.33,.05,.2,1)_forwards]"
                    style={{ strokeDashoffset: 1000 }}
                  />
                </mask>
                <path
                  d={rota(lugarAtivo)}
                  mask="url(#routeReveal)"
                  fill="none"
                  stroke="var(--blue)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="3 13"
                  opacity="0.9"
                />
              </>
            )}
          </svg>

          {LUGARES.map((lugar, i) => {
            const on = lugar.id === ativo;
            // Etiqueta vai para baixo quando outro pin estiver logo abaixo.
            const bloqueado = LUGARES.some(
              (o) => o.id !== lugar.id && Math.abs(o.x - lugar.x) < 170 && o.y - lugar.y > 0 && o.y - lugar.y < 120,
            );
            const nome = m.location.places[lugar.id as keyof typeof m.location.places];

            return (
              <div
                key={lugar.id}
                className="absolute w-[2.6%] -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${lugar.x / 19.2}%`, top: `${lugar.y / 10.8}%`, zIndex: on ? 6 : 4 }}
              >
                <button
                  type="button"
                  // §12.1 — Pointer Events, funciona por toque e por mouse.
                  onPointerEnter={(e) => {
                    if (e.pointerType === 'mouse') doPin(lugar, i);
                  }}
                  onPointerLeave={(e) => {
                    if (e.pointerType === 'mouse') setAtivo(null);
                  }}
                  onClick={() => doPin(lugar, i)}
                  aria-pressed={on}
                  aria-label={nome}
                  className="block aspect-square w-full transition-transform duration-[350ms] ease-reveal"
                  style={{ transform: `scale(${on ? 1.32 : 1})` }}
                >
                  <svg viewBox="0 0 44 44" className="block h-full w-full overflow-visible">
                    <circle cx="22" cy="22" r="21" fill={on ? 'var(--blue)' : '#ffffff'} stroke="var(--blue)" strokeWidth="1.1" />
                    <circle cx="22" cy="19" r="4.4" fill="none" stroke={on ? '#ffffff' : 'var(--blue)'} strokeWidth="1.6" />
                    <line x1="22" y1="24" x2="22" y2="31.5" stroke={on ? '#ffffff' : 'var(--blue)'} strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>

                <span
                  aria-hidden="true"
                  // §12.5 — era Helvetica Neue.
                  className="pointer-events-none absolute left-1/2 z-[8] -translate-x-1/2 whitespace-nowrap bg-white/95 px-2.5 pb-1 pt-1.5 font-sans text-menu uppercase text-[#12384f] shadow-[0_2px_10px_rgba(18,56,79,.10)] transition-[opacity,transform] duration-300 ease-out"
                  style={{
                    [bloqueado ? 'bottom' : 'top']: '118%',
                    opacity: on ? 1 : 0,
                    transform: `translateX(-50%) translateY(${on ? '0' : bloqueado ? '4px' : '-4px'})`,
                  }}
                >
                  {nome}
                </span>
              </div>
            );
          })}
        </div>

        {/* Sobe para dentro dos 14,4% de faixa vazia na base da arte — encurta a
            secao e traz a regua de cards para perto do mapa, que era o pedido. */}
        <div className="-mt-6 flex justify-center pb-8 pt-0 md:-mt-14">
          <a
            href="https://maps.app.goo.gl/tZLsvDnRaLq1HGqc9"
            target="_blank"
            rel="noopener noreferrer"
            // §12.7 — `style-hover` virou classe.
            className="inline-flex items-center gap-3.5 rounded-pill border border-blue bg-blue px-[34px] py-[17px] font-sans text-caption uppercase text-white transition-colors duration-[350ms] ease-out hover:bg-white hover:text-blue"
          >
            <span>{m.location.mapCta}</span>
            <span aria-hidden="true" className="text-sm tracking-normal">
              →
            </span>
          </a>
        </div>
      </div>

        <div
          ref={rail.ref}
          {...rail.props}
          role="group"
          aria-label={m.location.title}
          className="rail-scroll flex overflow-x-auto overflow-y-hidden border-t border-rule"
          style={{ cursor: rail.arrastando ? 'grabbing' : 'grab' }}
        >
          {LUGARES.map((lugar) => {
            const on = lugar.id === ativo;
            const nome = m.location.places[lugar.id as keyof typeof m.location.places];
            return (
              <button
                key={lugar.id}
                type="button"
                onPointerEnter={(e) => {
                  if (e.pointerType === 'mouse') setAtivo(lugar.id);
                }}
                onPointerLeave={(e) => {
                  if (e.pointerType === 'mouse') setAtivo(null);
                }}
                onClick={() => {
                  if (rail.foiArraste()) return;
                  setAtivo((atual) => (atual === lugar.id ? null : lugar.id));
                }}
                aria-pressed={on}
                className="relative flex h-[230px] min-w-[288px] shrink-0 flex-col justify-between overflow-hidden border-r border-rule bg-bg text-left"
              >
                {/* Revelacao por clip-path — preservada do arquivo aprovado.
                    Pendencia A4 encerrada: as 14 fotos chegaram e entram aqui,
                    sob o mesmo degrade azul que o arquivo original usava. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 z-[1] transition-[clip-path] duration-[750ms] ease-reveal"
                  style={{ clipPath: `circle(${on ? '160%' : '0%'} at 86% 84%)` }}
                >
                  <picture>
                    <source type="image/avif" srcSet={`/images/${lugar.foto}-500.avif`} />
                    <source type="image/webp" srcSet={`/images/${lugar.foto}-500.webp`} />
                    <img
                      src={`/images/${lugar.foto}-500.webp`}
                      alt=""
                      width={500}
                      height={282}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                      draggable={false}
                    />
                  </picture>
                  <span className="absolute inset-0 bg-gradient-to-b from-[rgba(1,112,178,.10)] to-[rgba(4,34,54,.34)]" />
                </span>

                <span className="relative z-[2] flex items-start gap-2.5 px-[30px] pt-[34px]">
                  <span
                    className="font-serif text-numero transition-colors duration-[400ms] ease-out"
                    style={{ color: on ? '#ffffff' : 'var(--ink)' }}
                  >
                    {lugar.min}
                  </span>
                  <span
                    // §12 + piso de 11px: o arquivo aprovado usava 10px.
                    className="pt-1.5 font-sans text-caption uppercase transition-colors duration-[400ms] ease-out"
                    style={{ color: on ? 'var(--on-dark-2)' : 'var(--faint)' }}
                  >
                    {lugar.modo === 'walk' ? m.location.unit.walk : m.location.unit.drive}
                  </span>
                </span>

                <span className="relative z-[2] flex items-center justify-between gap-4 px-[30px] pb-[30px]">
                  <span
                    className="font-serif text-card-label-lg transition-colors duration-[400ms] ease-out"
                    style={{ color: on ? '#ffffff' : 'var(--ink)', textShadow: on ? '0 1px 12px rgba(0,0,0,.35)' : 'none' }}
                  >
                    {nome}
                  </span>
                  <span
                    className="h-[38px] w-[38px] shrink-0 transition-transform duration-[400ms] ease-out"
                    style={{ transform: `scale(${on ? 1.08 : 1})` }}
                  >
                    <svg viewBox="0 0 44 44" className="block h-full w-full">
                      <circle cx="22" cy="22" r="21" fill={on ? '#ffffff' : 'transparent'} stroke={on ? '#ffffff' : '#bcd3e2'} strokeWidth="1.1" />
                      <circle cx="22" cy="19" r="4.4" fill="none" stroke={on ? 'var(--blue)' : '#bcd3e2'} strokeWidth="1.6" />
                      <line x1="22" y1="24" x2="22" y2="31.5" stroke={on ? 'var(--blue)' : '#bcd3e2'} strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
    </>
  );
}
