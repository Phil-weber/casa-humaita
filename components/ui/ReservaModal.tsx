'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useMensagens } from '@/components/providers/MensagensProvider';
import { IconeWhatsApp } from '@/components/icons/SocialIcons';

/**
 * Modulo flutuante de reserva — pedido do cliente para dar mais visibilidade ao
 * "reservar agora".
 *
 * Mesma linguagem do modulo de fotos (RoomsLightbox): o site continua visivel
 * atras, escurecido e desfocado, entao o overlay le como SEGUNDO PLANO e nao
 * como outra pagina. Nao ocupa a tela toda — e um cartao centrado.
 *
 * O formulario e o mesmo da secao "Reserve direto com a gente", e continua SEM
 * FUNCAO (CLAUDE.md regra 4): nenhum `onSubmit`, nenhum `fetch`, todos os campos
 * e o botao `disabled`. Ligar depois e trocar um handler.
 *
 * Por que um evento de janela e nao um contexto: quem abre o modulo sao dois
 * componentes distantes na arvore — o cabecalho e o botao sobre a foto da
 * Arquitetura — e a pagina e montada por um Server Component. Um provider
 * exigiria envolver a arvore inteira num client boundary so para carregar um
 * booleano. O evento mantem o custo onde ele deve ficar.
 */

const EVENTO = 'humaita:reserva';

/** Abre o modulo de reserva de qualquer ponto do site. */
export function abrirReserva() {
  window.dispatchEvent(new CustomEvent(EVENTO));
}

export function ReservaModal() {
  const m = useMensagens();
  const [aberto, setAberto] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const fecharRef = useRef<HTMLButtonElement>(null);

  const fechar = useCallback(() => setAberto(false), []);

  useEffect(() => {
    const abrir = () => setAberto(true);
    window.addEventListener(EVENTO, abrir);
    return () => window.removeEventListener(EVENTO, abrir);
  }, []);

  // Esc fecha, foco preso, rolagem travada e cabecalho retirado enquanto aberto.
  useEffect(() => {
    if (!aberto) return;
    const anterior = document.activeElement as HTMLElement | null;
    const travaScroll = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.dataset.reserva = 'on';
    fecharRef.current?.focus();

    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        fechar();
        return;
      }
      if (e.key !== 'Tab') return;
      const foco = overlayRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!foco || foco.length === 0) return;
      const primeiro = foco[0]!;
      const ultimo = foco[foco.length - 1]!;
      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primeiro.focus();
      }
    };

    document.addEventListener('keydown', aoTeclar);
    return () => {
      document.removeEventListener('keydown', aoTeclar);
      document.body.style.overflow = travaScroll;
      delete document.documentElement.dataset.reserva;
      anterior?.focus?.();
    };
  }, [aberto, fechar]);

  if (!aberto) return null;

  const campos = [
    { id: 'r-nome', label: m.contact.soon.form.name, type: 'text', span: 'sm:col-span-2' },
    { id: 'r-checkin', label: m.contact.soon.form.checkin, type: 'date', span: '' },
    { id: 'r-checkout', label: m.contact.soon.form.checkout, type: 'date', span: '' },
    { id: 'r-hospedes', label: m.contact.soon.form.guests, type: 'number', span: 'sm:col-span-2' },
  ];

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={m.contact.title}
      className="fixed inset-0 z-[70] flex items-center justify-center p-5"
      // O site fica visivel por tras, so recuado: escurecimento leve e desfoque.
      style={{
        backgroundColor: 'rgba(14,33,54,.72)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
      }}
      // Clique fora fecha. `currentTarget` garante que so o proprio fundo conta.
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) fechar();
      }}
    >
      <div className="max-h-[92vh] w-full max-w-[520px] overflow-y-auto rounded border border-white/15 bg-[#123a63]/95 p-8 shadow-[0_30px_80px_rgba(4,18,32,.45)] md:p-10">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="font-sans text-eyebrow uppercase text-on-dark-2">{m.contact.eyebrow}</p>
            {/* `card-label-lg` e nao `h2`: o h2 e um clamp que chega a 58px e
                estouraria a largura de 520px do cartao. */}
            <h2 className="mt-4 font-serif text-card-label-lg text-on-dark">{m.contact.title}</h2>
          </div>
          <button
            ref={fecharRef}
            type="button"
            onClick={fechar}
            aria-label={m.contact.modalClose}
            className="-mr-2 -mt-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-pill border border-white/25 text-on-dark transition-colors duration-200 ease-out hover:bg-white hover:text-ink"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <p className="mt-5 font-serif text-corpo text-on-dark-2">{m.contact.subtitle}</p>

        <form aria-label={m.contact.formTitle} className="mt-8">
          <div className="grid gap-5 sm:grid-cols-2">
            {campos.map((campo) => (
              <div key={campo.id} className={`flex flex-col gap-2 ${campo.span}`}>
                <label htmlFor={campo.id} className="font-sans text-caption uppercase text-on-dark-2">
                  {campo.label}
                </label>
                <input
                  id={campo.id}
                  name={campo.id}
                  type={campo.type}
                  disabled
                  className="cursor-not-allowed rounded border border-white/20 bg-white/[0.04] px-4 py-3 font-serif text-corpo text-on-dark disabled:opacity-70"
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled
            className="mt-7 flex w-full cursor-not-allowed items-center justify-center gap-3 rounded bg-white py-4 font-serif text-card-label text-ink opacity-80"
          >
            <IconeWhatsApp className="h-[18px] w-[18px]" />
            {m.contact.soon.form.submit}
          </button>

          <p className="mt-4 text-center font-sans text-caption normal-case tracking-normal text-on-dark-2">
            {m.contact.formHint}
          </p>
        </form>
      </div>
    </div>
  );
}
