/**
 * Glifos das redes para o rodape, em `currentColor` — brancos sobre o navy.
 *
 * Nota sobre o Airbnb: o brief §7·7 manda usar o asset oficial "sem alterar cor
 * ou proporcao", e essa regra continua valendo na secao de Avaliacoes, onde a
 * logo colorida esta preservada. Aqui no rodape o cliente pediu as tres marcas
 * em branco, para conjugarem com o texto — o Belo monocromatico e uma variante
 * prevista pela propria marca. Divergencia registrada em docs/decisoes.md.
 */

type P = { className?: string };

const base = {
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  'aria-hidden': true,
  focusable: false,
};

/** Instagram — camera de contorno. */
export function IconeInstagram({ className }: P) {
  return (
    <svg {...base} fill="none" stroke="currentColor" strokeWidth={1.5} className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** WhatsApp — balao com fone. */
export function IconeWhatsApp({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.91-2.2-.24-.57-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.16 8.16 0 0 1-1.25-4.38c0-4.54 3.7-8.24 8.25-8.24a8.19 8.19 0 0 1 8.23 8.25c0 4.54-3.7 8.23-8.24 8.23z" />
    </svg>
  );
}

/** Airbnb — o Belo, em variante monocromatica. */
export function IconeAirbnb({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M12 2.2c-1.3 0-2.2.7-2.9 2.1-.5 1-1.6 3.2-3 6.1-.5 1-1 2-1.4 2.9-.5 1-.8 1.7-.9 2.1-.3.9-.4 1.6-.4 2.2 0 2.4 1.8 4.2 4.2 4.2 1.6 0 3.2-.8 4.4-2.2 1.2 1.4 2.8 2.2 4.4 2.2 2.4 0 4.2-1.8 4.2-4.2 0-.6-.1-1.3-.4-2.2-.1-.4-.4-1.1-.9-2.1-.4-.9-.9-1.9-1.4-2.9-1.4-2.9-2.5-5.1-3-6.1-.7-1.4-1.6-2.1-2.9-2.1zm0 1.7c.6 0 1 .3 1.4 1.2.5 1 1.6 3.1 3 6 .5 1 .9 2 1.3 2.8.5 1 .7 1.6.8 1.9.2.7.3 1.2.3 1.6 0 1.5-1 2.5-2.5 2.5-1.2 0-2.5-.7-3.4-1.9 1.4-1.8 2.3-3.5 2.3-5.1 0-1.9-1.4-3.3-3.2-3.3s-3.2 1.4-3.2 3.3c0 1.6.9 3.3 2.3 5.1-.9 1.2-2.2 1.9-3.4 1.9-1.5 0-2.5-1-2.5-2.5 0-.4.1-.9.3-1.6.1-.3.3-.9.8-1.9.4-.8.8-1.8 1.3-2.8 1.4-2.9 2.5-5 3-6 .4-.9.8-1.2 1.4-1.2zm0 7.4c.9 0 1.5.7 1.5 1.6 0 1.1-.6 2.4-1.5 3.7-.9-1.3-1.5-2.6-1.5-3.7 0-.9.6-1.6 1.5-1.6z" />
    </svg>
  );
}
