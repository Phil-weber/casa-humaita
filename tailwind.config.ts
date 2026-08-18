import type { Config } from 'tailwindcss';

/**
 * Sistema de tokens — brief.md §3.
 *
 * Nenhum valor aqui e invencao. Cada um vem do brief ou de um dos dois arquivos
 * aprovados pelo cliente em reference/. Onde os dois divergem, vale a decisao
 * "Misto" registrada em docs/decisoes.md:
 *   - acessibilidade e familia tipografica seguem o brief (Jost nos papeis de
 *     utilidade, piso de 11px);
 *   - tracking e line-height de assinatura ficam identicos ao arquivo aprovado.
 *
 * Unico valor derivado: o breakpoint de 768px, que o brief nao define. Usa-se o
 * `md` padrao do Tailwind, que coincide com uma das quatro larguras de QA.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        bg: '#fbfbfb',
        navy: '#0e2136',
        blue: { DEFAULT: '#0170B2', hover: '#01598e' },
        ink: '#10222e',
        body: '#4a5b66',
        faint: '#8fa4b1',
        rule: '#dbe7ef',
        'rail-track': '#eef4f8',
        // Sobre escuro — brief §3
        'on-dark': '#FFFFFF',
        'on-dark-2': 'rgba(255,255,255,.9)',
        'on-dark-rule': 'rgba(255,255,255,.18)',
      },

      fontFamily: {
        // Display e corpo. Variavel 200..700, roman + italico.
        serif: ['var(--font-newsreader)', 'Georgia', 'serif'],
        // Utilidade: caixa-alta com tracking. Eyebrow, menu, tags, unidades, botoes.
        sans: ['var(--font-jost)', 'system-ui', 'sans-serif'],
      },

      fontSize: {
        // [tamanho, { lineHeight, letterSpacing }]
        'h1-hero': ['clamp(64px, 11vw, 188px)', { lineHeight: '0.9', letterSpacing: '-0.015em' }],
        h2: ['clamp(34px, 3.6vw, 58px)', { lineHeight: '1.12', letterSpacing: '-0.01em' }],
        display: ['clamp(72px, 14vw, 260px)', { lineHeight: '0.86' }],
        manifesto: ['clamp(30px, 3.2vw, 50px)', { lineHeight: '1.3' }],
        numero: ['74px', { lineHeight: '0.86' }],
        'card-label': ['19px', { lineHeight: '1.2' }],
        'card-label-lg': ['22px', { lineHeight: '1.2' }],
        corpo: ['17px', { lineHeight: '1.65' }],
        // Papeis de utilidade — Jost, caixa-alta. Piso absoluto de 11px (CLAUDE.md §9).
        eyebrow: ['12px', { lineHeight: '1', letterSpacing: '0.22em' }],
        // O hero aprovado usa .42em. Mantido por fidelidade, decisao "Misto".
        'eyebrow-hero': ['12px', { lineHeight: '1', letterSpacing: '0.42em' }],
        caption: ['11px', { lineHeight: '1.4', letterSpacing: '0.20em' }],
        menu: ['11px', { lineHeight: '1', letterSpacing: '0.18em' }],
      },

      borderRadius: {
        // Raio de foto e card. Nada de raio medio (brief §3).
        DEFAULT: '2px',
        pill: '999px',
      },

      maxWidth: {
        container: '1680px',
        // Largura maxima do texto do manifesto — brief §7·2
        manifesto: '20em',
        // Paragrafo de intro da Localizacao, do arquivo aprovado
        intro: '520px',
      },

      spacing: {
        // Respiro vertical entre secoes — brief §3
        section: 'clamp(96px, 12vh, 180px)',
        'pad-x': 'var(--pad-x)',
      },

      height: {
        // Altura fixa do frame da regua de ambientes — brief §7·4
        rail: 'clamp(320px, 46vh, 460px)',
      },

      transitionTimingFunction: {
        // Curvas dos arquivos aprovados, preservadas.
        reveal: 'cubic-bezier(.22,.61,.36,1)',
        route: 'cubic-bezier(.33,.05,.2,1)',
      },
    },
  },
  plugins: [],
};

export default config;
