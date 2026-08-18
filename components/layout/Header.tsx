'use client';

import { useEffect, useRef, useState } from 'react';
import { useMensagens } from '@/components/providers/MensagensProvider';
import type { Tone } from '@/components/ui/Section';
import { abrirReserva } from '@/components/ui/ReservaModal';
import { IconeWhatsApp } from '@/components/icons/SocialIcons';
import { SeletorIdioma } from '@/components/ui/SeletorIdioma';

/**
 * Efeito 8 do orcamento — brief §6.
 *
 *   "Transparente sempre. Cor do texto invertendo conforme `data-tone` da secao
 *    sob ele. Some ao rolar para baixo, reaparece ao rolar para cima. Sobre foto,
 *    simplesmente nao esta la."
 *
 * O ultimo ponto vale para o hero: la o cabecalho nao existe, porque o hero ja
 * traz a propria logo e o menu inicial (copy.md §1). O menu principal "aparece
 * depois do hero", nas palavras do copy.
 *
 * Por que um unico handler de scroll e nao IntersectionObserver:
 *
 *   A primeira versao usava dois observadores — um para o tom, outro para a
 *   sentinela do hero. Dois problemas praticos. O da sentinela dependia de um
 *   elemento de altura zero, cujo `isIntersecting` e inconsistente entre
 *   navegadores. E o do tom guardava `window.innerHeight` no `rootMargin`
 *   calculado na montagem, que fica obsoleto ao girar o aparelho.
 *
 *   Com doze secoes, ler os rects num unico rAF por scroll custa menos do que
 *   parece: as leituras acontecem em lote, sem escrita no meio, entao o
 *   navegador resolve tudo num layout so. Em troca, o comportamento fica
 *   deterministico e testavel.
 */

const LINHA_DE_PROVA = 32; // px a partir do topo — meio do header
const ZONA_MORTA = 4; // px — sem isso o header tremeria com o micro-ajuste do Lenis
const ALTURA_MINIMA = 120; // px — so comeca a se esconder depois disso

export function Header() {
  const m = useMensagens();
  const [tone, setTone] = useState<Tone>('dark');
  const [oculto, setOculto] = useState(false);
  const [passouDoHero, setPassouDoHero] = useState(false);
  const ultimoY = useRef(0);
  const passouAntes = useRef(false);

  useEffect(() => {
    const secoes = Array.from(document.querySelectorAll<HTMLElement>('[data-tone]'));
    const sentinela = document.querySelector<HTMLElement>('[data-hero-fim]');
    ultimoY.current = window.scrollY;
    let agendado = false;

    const medir = () => {
      agendado = false;

      // --- leituras em lote (um unico layout) ---
      const y = window.scrollY;
      const rects = secoes.map((s) => s.getBoundingClientRect());
      const topoSentinela = sentinela ? sentinela.getBoundingClientRect().top : -Infinity;

      // --- tom da secao que cruza a linha do header ---
      for (let i = 0; i < secoes.length; i++) {
        const r = rects[i];
        if (!r) continue;
        if (r.top <= LINHA_DE_PROVA && r.bottom > LINHA_DE_PROVA) {
          const t = secoes[i]?.getAttribute('data-tone');
          if (t === 'light' || t === 'dark') setTone(t);
          break;
        }
      }

      // --- o header nao existe enquanto o hero estiver na tela ---
      // Sem sentinela (paginas internas), o header esta sempre disponivel.
      setPassouDoHero(topoSentinela <= LINHA_DE_PROVA);

      // O header NAO se esconde ao descer — decisao do cliente. A unica excecao
      // e a secao de Arquitetura, que sinaliza por `data-arquitetura` no <html>:
      // la a foto ocupa a tela inteira e o cabecalho atrapalharia a leitura.
      // Duas excecoes ao "header sempre visivel": a secao de Arquitetura, onde
      // a foto ocupa a tela toda, e o modulo de fotos aberto, onde o header
      // ficava por cima do overlay e bloqueava o botao de fechar.
      const ds = document.documentElement.dataset;
      setOculto(ds.arquitetura === 'on' || ds.modulo === 'on' || ds.reserva === 'on');
      ultimoY.current = y;
    };

    const aoRolar = () => {
      if (agendado) return;
      agendado = true;
      requestAnimationFrame(medir);
    };

    medir(); // estado correto ja no primeiro quadro, sem esperar rolagem
    // O modulo de fotos trava a rolagem, entao nao haveria evento de scroll
    // para reavaliar: um observador no <html> cobre esse caso.
    const mo = new MutationObserver(medir);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-modulo', 'data-arquitetura', 'data-reserva'],
    });
    window.addEventListener('scroll', aoRolar, { passive: true });
    window.addEventListener('resize', aoRolar, { passive: true });
    return () => {
      mo.disconnect();
      window.removeEventListener('scroll', aoRolar);
      window.removeEventListener('resize', aoRolar);
    };
  }, []);

  const escuro = tone === 'dark';
  const visivel = passouDoHero && !oculto;
  const links = [
    m.nav.main.house,
    m.nav.main.arch,
    m.nav.main.location,
    m.nav.main.reviews,
    m.nav.main.buzios,
    m.nav.main.contact,
  ];

  return (
    <header
      data-tom={tone}
      data-visivel={visivel}
      // `inert` enquanto invisivel: o menu escondido nao recebe foco de teclado.
      inert={!visivel ? true : undefined}
      className="fixed inset-x-0 top-0 z-50 border-b transition-[transform,opacity,color,background-color,border-color] duration-300 ease-out"
      style={{
        color: escuro ? 'var(--on-dark)' : 'var(--ink)',
        transform: visivel ? 'translate3d(0,0,0)' : 'translate3d(0,-100%,0)',
        opacity: visivel ? 1 : 0,
        pointerEvents: visivel ? 'auto' : 'none',
        // Blur discreto + filete azul sutil. Sobre o hero o header nao existe,
        // entao o vidro so aparece depois — nunca por cima da foto de abertura.
        backdropFilter: visivel ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: visivel ? 'blur(12px)' : 'none',
        backgroundColor: escuro ? 'rgba(14,33,54,.55)' : 'rgba(251,251,251,.72)',
        borderColor: escuro ? 'rgba(255,255,255,.14)' : 'rgba(1,112,178,.18)',
      }}
    >
      <div className="container-humaita flex items-center gap-8 py-5">
        <a href="#topo" className="shrink-0" aria-label={m.site.name}>
          <img
            src={escuro ? '/brand/logo-humaita-branca.png' : '/brand/logo-humaita.png'}
            alt={m.alt.logo}
            width={597}
            height={418}
            // Era h-7 (28px) — pequena demais para uma marca. 44px no desktop.
            className="h-9 w-auto md:h-11"
          />
        </a>

        {/* TODO: falta decisao de header em mobile — ver observacao na entrega.
            Ate la os links rolam lateralmente em telas estreitas, sem menu sanfonado. */}
        <nav aria-label={m.site.name} className="rail-scroll flex-1 overflow-x-auto" data-lenis-prevent>
          <ul className="flex items-center justify-center gap-7 whitespace-nowrap">
            {links.map((link) => (
              <li key={link.href + link.label}>
                <a
                  href={link.href}
                  className="font-sans text-menu uppercase transition-opacity duration-200 ease-out hover:opacity-60"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Acoes de reserva, encostadas na direita. Ambas em contorno, na mesma
            chave discreta do resto do cabecalho: `currentColor` acompanha a
            inversao clara/escura por `data-tone`, entao nao ha cor fixa aqui. */}
        <div className="flex shrink-0 items-center gap-4">
          <SeletorIdioma variante="header" />

          {/* Fase 2: o numero de WhatsApp ainda nao foi definido. O botao existe
              e fica desabilitado, como ja acontece no rodape e no contato. */}
          <span
            aria-disabled="true"
            aria-label={m.nav.whatsapp}
            title={m.nav.whatsapp}
            className="flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-pill border border-current opacity-40"
          >
            <IconeWhatsApp className="h-[18px] w-[18px]" />
          </span>

          <button
            type="button"
            onClick={abrirReserva}
            className="rounded-pill border border-current px-5 py-2.5 font-sans text-menu uppercase transition-opacity duration-200 ease-out hover:opacity-60"
          >
            {m.nav.book}
          </button>
        </div>
      </div>
    </header>
  );
}
