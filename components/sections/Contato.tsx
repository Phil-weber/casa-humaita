import { getMensagens, type Locale } from '@/lib/i18n';
import { Section } from '@/components/ui/Section';

/**
 * Secao 10 — Contato. Escuro.
 *
 * Redesenhada a pedido do cliente, na direcao da referencia do Lovable: navy
 * mais claro que o rodape, formulario em cartao proprio a direita para ganhar
 * destaque, e tres botoes minimalistas — Airbnb, Instagram e WhatsApp.
 *
 * O contraste entre esta secao e o rodape e proposital: o navy daqui e um degrau
 * acima do navy do rodape, entao o cartao do formulario avanca e o rodape recua.
 *
 * Continua SEM FUNCAO (CLAUDE.md regra 4): nenhum `onSubmit`, nenhum `fetch`,
 * nenhuma integracao. Todos os campos e o botao ficam `disabled`. O texto de
 * apoio ja descreve o comportamento da fase 2 — ligar depois e trocar um
 * handler, nao refazer a secao.
 */

/** Glifo do WhatsApp, desenhado aqui para nao depender de biblioteca de icones. */
function IconeWhatsApp({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.91-2.2-.24-.57-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.16 8.16 0 0 1-1.25-4.38c0-4.54 3.7-8.24 8.25-8.24a8.19 8.19 0 0 1 8.23 8.25c0 4.54-3.7 8.23-8.24 8.23z" />
    </svg>
  );
}

export function Contato({ locale }: { locale: Locale }) {
  // `locale` vem por prop: componente de servidor nao le o MensagensProvider,
  // e `getMensagens()` sem argumento devolveria sempre portugues.
  const m = getMensagens(locale);

  const campos = [
    { id: 'nome', label: m.contact.soon.form.name, type: 'text', span: 'sm:col-span-2' },
    { id: 'checkin', label: m.contact.soon.form.checkin, type: 'date', span: '' },
    { id: 'checkout', label: m.contact.soon.form.checkout, type: 'date', span: '' },
    { id: 'hospedes', label: m.contact.soon.form.guests, type: 'number', span: 'sm:col-span-2' },
  ];

  return (
    <Section
      id="contato"
      tone="dark"
      // Um degrau acima do navy do rodape: e o que faz o cartao do formulario
      // avancar e o rodape recuar, sem precisar de borda.
      className="!bg-[#123a63]"
    >
      <div className="container-humaita grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:gap-20">
        <div>
          <p className="font-sans text-eyebrow uppercase text-on-dark-2">{m.contact.eyebrow}</p>
          <h2 className="mt-6 max-w-[14ch] font-serif text-h2 text-on-dark">{m.contact.title}</h2>
          <p className="mt-6 max-w-md font-serif text-corpo text-on-dark-2">{m.contact.subtitle}</p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={m.site.airbnbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-pill border border-white/30 px-7 py-3.5 font-sans text-caption uppercase text-on-dark transition-colors duration-200 ease-out hover:bg-white hover:text-ink"
            >
              {m.contact.airbnbCta}
            </a>
            <a
              href={m.site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-pill border border-white/30 px-7 py-3.5 font-sans text-caption uppercase text-on-dark transition-colors duration-200 ease-out hover:bg-white hover:text-ink"
            >
              {m.contact.instaCta}
            </a>
            {/* Fase 2: o numero de WhatsApp ainda nao foi definido, entao o
                botao existe, e visivel e fica desabilitado. */}
            <span
              aria-disabled="true"
              aria-label={m.contact.whatsappCta}
              className="inline-flex h-[46px] w-[46px] cursor-not-allowed items-center justify-center rounded-pill border border-white/30 text-on-dark opacity-50"
            >
              <IconeWhatsApp className="h-5 w-5" />
            </span>
          </div>
        </div>

        {/* Cartao do formulario — reservado, construido e desabilitado. */}
        <form
          aria-label={m.contact.formTitle}
          className="rounded border border-white/15 bg-white/[0.06] p-8 backdrop-blur-sm md:p-10"
        >
          <h3 className="font-serif text-card-label-lg text-on-dark">{m.contact.formTitle}</h3>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
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
                  className="cursor-not-allowed rounded border border-white/20 bg-white/[0.04] px-4 py-3 font-serif text-corpo text-on-dark placeholder:text-white/40 disabled:opacity-70"
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
    </Section>
  );
}
