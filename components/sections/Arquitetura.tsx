'use client';

import { useEffect, useRef } from 'react';
import { useMensagens } from '@/components/providers/MensagensProvider';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { IMAGENS } from '@/lib/images.generated';
import { abrirReserva } from '@/components/ui/ReservaModal';

/**
 * Secao 5 — Arquitetura. Escuro (--navy). Efeito 5 do orcamento.
 *
 * Revisao do cliente nesta rodada:
 *  - Foto trocada para `foto-arquitetura` (1952x2176 vertical), no lugar de `e-4`.
 *    Isso resolve a pendencia A3: a foto antiga tinha 720x480 e ficava mole ao ir
 *    a full-bleed. Esta tem resolucao para a tela inteira.
 *  - Bordas arredondadas que vao se abrindo conforme a imagem cresce.
 *  - Comportamento inspirado no era-residence: o enquadramento COMECA NA CASA e,
 *    conforme o bloco cresce, a moldura revela o ceu acima dela. A palavra
 *    ARQUITETURA entra suavemente sobre o ceu, atras da casa.
 *
 * Como o "revelar o ceu" funciona: a foto e vertical (casa embaixo, ceu em cima).
 * No inicio o bloco e estreito e a imagem esta ancorada na parte de baixo
 * (`object-position: center 100%`) — ve-se a casa. Conforme o bloco cresce, a
 * ancora sobe para o centro/topo, e o ceu entra em quadro. E o mesmo movimento
 * de "afastar a camera" do site de referencia, feito so com object-position, que
 * aqui nao custa caro porque muda uma vez por quadro num unico elemento.
 */

// 380vh: o bloco termina de crescer cedo e sobra percurso longo para percorrer
// a foto inteira em full-bleed.
//
// O CORTE NO FIM DA FOTO estava aqui: existia um bloco de texto `absolute
// bottom-0` ocupando o rodape destes 380vh. Como o `p` do efeito e medido sobre
// a altura TOTAL da secao, os ultimos quadros do pan caiam atras desse painel
// opaco — a foto nunca chegava ao chao da piscina, era tapada antes. O painel
// foi removido e o texto passou para dentro da propria foto.
const PROFUNDIDADE_VH = 380;
const CRESCE_ATE = 0.3; // aos 30% do percurso o bloco ja e full-bleed
const PALAVRA_EM = 0.22; // a palavra se forma enquanto o quadro sobe para o ceu
const DESCE_DE = 0.35; // a partir daqui a camera desce: ceu -> casa -> piscina
const TEXTO_EM = 0.72; // o paragrafo entra na parte final da descida
const INICIO_Y = 45; // enquadramento inicial: parte de cima da casa
const LARGURA_INICIAL = 46; // %
const FOTO = IMAGENS['foto-arquitetura'];

export function Arquitetura() {
  const m = useMensagens();
  const reduzir = usePrefersReducedMotion();

  const raizRef = useRef<HTMLElement>(null);
  const blocoRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const palavraRef = useRef<HTMLDivElement>(null);
  const textoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduzir) return;
    const raiz = raizRef.current;
    if (!raiz) return;

    let frame = 0;
    const limitar = (v: number) => Math.min(1, Math.max(0, v));

    const tick = () => {
      const r = raiz.getBoundingClientRect();
      const percurso = r.height - window.innerHeight;
      const p = percurso > 0 ? limitar(-r.top / percurso) : 0;

      // Fase 1 (0 -> 30%): o bloco cresce de 46% ate full-bleed, e o
      // enquadramento SOBE do topo da casa (45%) para o ceu (0%).
      const cresc = limitar(p / CRESCE_ATE);

      const bloco = blocoRef.current;
      if (bloco) {
        bloco.style.width = `${(LARGURA_INICIAL + (100 - LARGURA_INICIAL) * cresc).toFixed(2)}%`;
        bloco.style.height = `${(58 + 42 * cresc).toFixed(2)}vh`;
        // Bordas se abrindo conforme cresce, ate quase reto no full-bleed.
        bloco.style.borderRadius = `${(22 - 20 * cresc).toFixed(1)}px`;
      }

      // Fase 2 (35% -> 100%): com a palavra ja formada sobre o ceu, a camera
      // DESCE — ceu, telhado, fachada, jardim — e termina no ponto mais baixo
      // da foto, o chao da piscina. E o mesmo sentido do pan do hero.
      const descida = limitar((p - DESCE_DE) / (1 - DESCE_DE));
      const enquadramento = p < DESCE_DE ? INICIO_Y * (1 - cresc) : 100 * descida;

      const img = imgRef.current;
      if (img) img.style.objectPosition = `center ${enquadramento.toFixed(1)}%`;

      // O paragrafo entra no trecho final da descida, quando o quadro ja esta
      // na altura das espreguicadeiras, e fica ate o fim do percurso.
      const texto = textoRef.current;
      if (texto) {
        const entrada = limitar((p - TEXTO_EM) / 0.13);
        texto.style.opacity = entrada.toFixed(3);
        texto.style.transform = `translate3d(0, ${((1 - entrada) * 22).toFixed(1)}px, 0)`;
      }

      const palavra = palavraRef.current;
      if (palavra) {
        // Entra enquanto o quadro sobe para o ceu e some quando a descida
        // comeca a trazer o telhado para dentro do quadro.
        const entrada = limitar((p - PALAVRA_EM) / 0.14);
        const saida = 1 - limitar((p - 0.46) / 0.16);
        palavra.style.opacity = (entrada * saida * 0.95).toFixed(3);
        palavra.style.transform = `translate3d(0, ${((1 - entrada) * 26).toFixed(1)}px, 0)`;
        palavra.style.letterSpacing = `${(0.16 - 0.14 * entrada).toFixed(3)}em`;
      }

      // Header sumindo so nesta secao, para nao competir com a foto.
      document.documentElement.dataset.arquitetura = p > 0.04 && p < 0.98 ? 'on' : 'off';

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      delete document.documentElement.dataset.arquitetura;
    };
  }, [reduzir]);

  const srcset = (ext: 'avif' | 'webp') =>
    FOTO.larguras.map((w) => `/images/foto-arquitetura-${w}.${ext} ${w}w`).join(', ');

  return (
    <section
      ref={raizRef}
      id="arquitetura"
      data-tone="light"
      className="relative w-full bg-bg text-ink"
      style={{ height: reduzir ? 'auto' : `${PROFUNDIDADE_VH}vh` }}
    >
      {/* `textura` no PALCO, e nao na secao: o palco e a unica superficie que
          chega a ser vista, e e ele que precisa casar com as secoes vizinhas.
          Sem isso a cor era a mesma (--bg) mas o reboco faltava, e a emenda
          aparecia — era essa a diferenca de fundo que sobrava. */}
      <div
        className={
          reduzir
            ? 'textura relative flex w-full items-center justify-center bg-bg py-section'
            : 'textura sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-bg'
        }
      >
        <div
          ref={blocoRef}
          className="relative z-10 overflow-hidden"
          style={{
            width: reduzir ? '100%' : `${LARGURA_INICIAL}%`,
            height: reduzir ? 'auto' : '58vh',
            borderRadius: reduzir ? '2px' : '22px',
          }}
        >
          <picture>
            <source type="image/avif" srcSet={srcset('avif')} sizes="100vw" />
            <source type="image/webp" srcSet={srcset('webp')} sizes="100vw" />
            <img
              ref={imgRef}
              src={`/images/foto-arquitetura-1200.webp`}
              alt={m.alt.arquitetura}
              width={FOTO.w}
              height={FOTO.h}
              className="h-full w-full object-cover"
              style={{ objectPosition: reduzir ? 'center 50%' : `center ${INICIO_Y}%` }}
              loading="lazy"
              draggable={false}
            />
          </picture>

          {/* A palavra fica ATRAS da casa: entra sobre o ceu, na metade de cima. */}
          <div
            ref={palavraRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-[14%] flex justify-center"
            style={{ opacity: reduzir ? 0.95 : 0 }}
          >
            <span className="px-4 text-center font-serif text-display font-light text-white">
              {m.arch.display}
            </span>
          </div>

          {/* O paragrafo mora DENTRO da foto, no canto inferior esquerdo, na
              altura das espreguicadeiras — nao numa secao propria. Vinheta curta
              atras do texto: sem ela o serifado branco some no verde do jardim,
              e o contraste cai abaixo do piso de acessibilidade. */}
          <div
            ref={textoRef}
            className="pointer-events-none absolute inset-x-0 bottom-0"
            style={{ opacity: reduzir ? 1 : 0 }}
          >
            <div className="relative w-full">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-[130%] bg-gradient-to-t from-[rgba(6,26,44,.72)] via-[rgba(6,26,44,.34)] to-transparent"
              />
              {/* Texto a esquerda e botao a direita, na MESMA linha de base —
                  dai o `items-end` e o padding inferior compartilhado. O botao
                  volta a receber ponteiro (`pointer-events-auto`), que o
                  involucro desliga para nao roubar o scroll sobre a foto. */}
              <div className="relative flex flex-col items-start gap-8 px-pad-x pb-[clamp(2.5rem,7vh,5rem)] pt-16 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
                <p className="max-w-[54ch] font-serif text-corpo text-white/95">{m.arch.texto}</p>

                <button
                  type="button"
                  onClick={abrirReserva}
                  className="pointer-events-auto inline-flex shrink-0 items-center gap-3 rounded-pill border border-white/70 bg-transparent px-7 py-3.5 font-sans text-caption uppercase text-white transition-colors duration-300 ease-out hover:bg-white hover:text-ink"
                >
                  <span>{m.arch.cta}</span>
                  <span aria-hidden="true" className="text-sm tracking-normal">
                    →
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* O titulo continua existindo para leitor de tela e para a estrutura de
          headings da pagina — so nao ocupa mais um painel proprio. */}
      <h2 className="sr-only">{m.arch.titulo}</h2>
    </section>
  );
}
