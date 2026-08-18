/**
 * Seis icones desenhados a mao para a ficha — brief §7·3.
 *
 * Traco de 1,2px, `currentColor` (usado em var(--blue)), sem preenchimento, no
 * mesmo registro de gravura do passaro da logo: linha fina, sensacao de bico de pena.
 *
 * Nao usar biblioteca de icones. Lucide, Feather e Heroicons tem traco uniforme
 * moderno e brigam com a logo — o brief e explicito nisso.
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

/** Hospedes — tres figuras, a do meio adiante. */
export function IconeHospedes({ className }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <circle cx="20" cy="14.5" r="4.2" />
      <path d="M12.4 29.5c0-4.2 3.4-7.2 7.6-7.2s7.6 3 7.6 7.2" />
      <circle cx="10.2" cy="17.4" r="3.1" />
      <path d="M4.6 29.5c0-3.2 2.4-5.6 5.6-5.6" />
      <circle cx="29.8" cy="17.4" r="3.1" />
      <path d="M35.4 29.5c0-3.2-2.4-5.6-5.6-5.6" />
    </svg>
  );
}

/** Suites — porta entreaberta com maçaneta. */
export function IconeSuites({ className }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <path d="M10.5 8.5h13.2l6 2.6v20.4H10.5z" />
      <path d="M23.7 8.5v23" />
      <circle cx="20.6" cy="20.4" r="1" />
      <path d="M8 31.5h24" />
    </svg>
  );
}

/** Camas — cabeceira, colchao e travesseiro. */
export function IconeCamas({ className }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <path d="M6 27.5V14" />
      <path d="M34 27.5v-8.2" />
      <path d="M6 19.3h28" />
      <path d="M6 23.6h28" />
      <path d="M10.6 19.3v-3.1a1.6 1.6 0 0 1 1.6-1.6h5.4a1.6 1.6 0 0 1 1.6 1.6v3.1" />
      <path d="M8.4 27.5v2.6M31.6 27.5v2.6" />
    </svg>
  );
}

/** Banheiros — torneira e fio d'agua. */
export function IconeBanheiros({ className }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <path d="M14 9.5v6.4" />
      <path d="M11 9.5h6" />
      <path d="M14 15.9h9.4a3 3 0 0 1 3 3v1.7" />
      <path d="M22.4 24.2h8.4" />
      <path d="M26.6 20.6v3.6" />
      <path d="M9 27.4h14.6" />
      <path d="M11.4 30.9h9.8" />
    </svg>
  );
}

/** Piscina — lamina d'agua em duas ondas. */
export function IconePiscina({ className }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <path d="M5 22.6c2.5 0 2.5 2.2 5 2.2s2.5-2.2 5-2.2 2.5 2.2 5 2.2 2.5-2.2 5-2.2 2.5 2.2 5 2.2 2.5-2.2 5-2.2" />
      <path d="M5 28.8c2.5 0 2.5 2.2 5 2.2s2.5-2.2 5-2.2 2.5 2.2 5 2.2 2.5-2.2 5-2.2 2.5 2.2 5 2.2 2.5-2.2 5-2.2" />
      <path d="M13.4 20.4V11a2 2 0 0 1 2-2h1.8" />
      <path d="M26.6 20.4V11a2 2 0 0 0-2-2h-1.8" />
      <path d="M13.4 14.6h13.2" />
    </svg>
  );
}

/** Vista — sol sobre a linha do horizonte, com o arco de 180 graus. */
export function IconeVista({ className }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <path d="M5 25.5h30" />
      <path d="M9.6 25.5a10.4 10.4 0 0 1 20.8 0" />
      <circle cx="20" cy="21.6" r="4.1" />
      <path d="M8 30.2h7.4M19.2 30.2h12.8" />
    </svg>
  );
}
