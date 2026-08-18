/**
 * Icones da secao "O essencial" — mesmo registro dos seis da ficha da casa:
 * traco de 1,2px, `currentColor`, sem preenchimento, sensacao de bico de pena.
 *
 * Nao usar biblioteca de icones (brief §7·3): Lucide, Feather e Heroicons tem
 * traco uniforme moderno e brigam com o passaro da logo.
 */

const base = {
  viewBox: '0 0 40 40',
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
};

type P = { className?: string };

/** Check-in — relogio com o ponteiro na entrada da tarde. */
export function IconeCheckin({ className }: P) {
  return (
    <svg {...base} className={className}>
      <circle cx="20" cy="20" r="12.4" />
      <path d="M20 12.6V20l5.4 3.2" />
    </svg>
  );
}

/** Checkout — relogio com seta de saida. */
export function IconeCheckout({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M24.6 9.6a12.4 12.4 0 1 0 5.6 8.2" />
      <path d="M20 12.6V20l5 2.4" />
      <path d="M27 8.4v5.2h-5.2" />
    </svg>
  );
}

/** Hospedes — duas figuras. */
export function IconeHospedesMin({ className }: P) {
  return (
    <svg {...base} className={className}>
      <circle cx="16.4" cy="15.4" r="4.2" />
      <path d="M8.8 29.2c0-4.2 3.4-7.4 7.6-7.4s7.6 3.2 7.6 7.4" />
      <circle cx="27.4" cy="17.2" r="3.1" />
      <path d="M32.8 29.2c0-3.1-2.4-5.6-5.4-5.6" />
    </svg>
  );
}

/** Animais — pata. */
export function IconePets({ className }: P) {
  return (
    <svg {...base} className={className}>
      <ellipse cx="14.4" cy="15.6" rx="2.6" ry="3.4" />
      <ellipse cx="25.6" cy="15.6" rx="2.6" ry="3.4" />
      <ellipse cx="9.6" cy="22.4" rx="2.3" ry="3" />
      <ellipse cx="30.4" cy="22.4" rx="2.3" ry="3" />
      <path d="M20 21.6c4.1 0 7.2 3 7.2 6.2 0 2.3-1.9 3.6-4.1 3.6-1.3 0-2.1-.6-3.1-.6s-1.8.6-3.1.6c-2.2 0-4.1-1.3-4.1-3.6 0-3.2 3.1-6.2 7.2-6.2Z" />
    </svg>
  );
}

/** Enxoval — pilha de toalhas dobradas, vista de frente. */
export function IconeEnxoval({ className }: P) {
  return (
    <svg {...base} className={className}>
      <rect x="8.6" y="11.4" width="22.8" height="6.2" rx="3.1" />
      <rect x="8.6" y="17.6" width="22.8" height="6.2" rx="3.1" />
      <rect x="8.6" y="23.8" width="22.8" height="6.2" rx="3.1" />
      <path d="M13.2 11.4v6.2M13.2 17.6v6.2M13.2 23.8v6.2" />
    </svg>
  );
}

/** Wi-Fi — arcos. */
export function IconeWifi({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M7.6 17.2a18 18 0 0 1 24.8 0" />
      <path d="M12.4 22.2a11.2 11.2 0 0 1 15.2 0" />
      <path d="M16.9 27a4.8 4.8 0 0 1 6.2 0" />
      <circle cx="20" cy="30.8" r=".9" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Climatizacao — aparelho de ar e o sopro. */
export function IconeAr({ className }: P) {
  return (
    <svg {...base} className={className}>
      <rect x="7.6" y="10.4" width="24.8" height="8.6" rx="2.2" />
      <path d="M12 15h16" />
      <path d="M13.4 23.4c0 2-2 2-2 4M20 23.4c0 2.4-2.2 2.4-2.2 4.8M26.6 23.4c0 2-2 2-2 4" />
    </svg>
  );
}

/** Estacionamento — carro de traco. */
export function IconeEstacionamento({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M8.4 25.4v-4l2.6-6.2a2 2 0 0 1 1.9-1.2h14.2a2 2 0 0 1 1.9 1.2l2.6 6.2v4" />
      <path d="M8.4 21.4h23.2" />
      <circle cx="13.6" cy="25.4" r="2.2" />
      <circle cx="26.4" cy="25.4" r="2.2" />
    </svg>
  );
}

/** Seguranca — distintivo (escudo com selo ao centro). */
export function IconeSeguranca({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M20 7.8l10.4 3.8v8.2c0 6-4.3 10.4-10.4 12.4-6.1-2-10.4-6.4-10.4-12.4v-8.2z" />
      <circle cx="20" cy="18.6" r="3.6" />
      <path d="M17.4 21.8l-1 5 3.6-2 3.6 2-1-5" />
    </svg>
  );
}

/** Cozinha — panela com vapor. */
export function IconeCozinha({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M9.4 19.4h21.2v5.4a5 5 0 0 1-5 5H14.4a5 5 0 0 1-5-5z" />
      <path d="M7.4 19.4h25.2" />
      <path d="M16.4 15.6c0-1.8 1.8-1.8 1.8-3.6M23 15.6c0-1.8 1.8-1.8 1.8-3.6" />
    </svg>
  );
}

/** Area de servico — maquina de lavar. */
export function IconeLavanderia({ className }: P) {
  return (
    <svg {...base} className={className}>
      <rect x="10.4" y="8.6" width="19.2" height="22.8" rx="2.4" />
      <circle cx="20" cy="22.4" r="5.6" />
      <path d="M10.4 14.6h19.2" />
      <circle cx="25.4" cy="11.6" r=".9" fill="currentColor" stroke="none" />
    </svg>
  );
}
