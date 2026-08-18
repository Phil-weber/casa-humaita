import { getMensagens, type Locale } from '@/lib/i18n';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Secao 2 — Manifesto. Claro. Pausa, sem foto de ambiente.
 *
 * Brief §7·2: passaro pequeno e discreto no topo (~86px, opacidade ~.5), abaixo o
 * texto em Newsreader clamp(30px,3.2vw,50px), line-height 1.3, largura maxima 20em,
 * italico em "inteira" e em "Só a vista".
 *
 * "Esta secao so funciona se estiver vazia" — por isso o respiro extra alem do
 * ritmo padrao, e nenhum outro elemento.
 *
 * O italico vem marcado em `messages/pt.json` como segmento com `em: true`, e vira
 * <em> de verdade — nao <i>. E enfase semantica, nao estilo (copy.md).
 */
export function Manifesto({ locale }: { locale: Locale }) {
  // `locale` vem por prop: componente de servidor nao le o MensagensProvider,
  // e `getMensagens()` sem argumento devolveria sempre portugues.
  const m = getMensagens(locale);

  return (
    <Section tone="light" className="pb-[clamp(64px,7vh,96px)] pt-[clamp(120px,15vh,200px)]">
      <div className="container-humaita flex flex-col items-center text-center">
        <Reveal>
          <img
            src="/brand/passaro-logo.png"
            alt={m.alt.passaro}
            width={597}
            height={418}
            className="mb-9 w-[86px] opacity-50"
            loading="lazy"
          />
        </Reveal>

        <Reveal index={1}>
          {/* `em` continua sendo enfase semantica (vira <em>, nunca <i>). O azul
              e so cor: quem nao ve a cor nao perde informacao, porque a enfase
              esta na marcacao. */}
          <p className="max-w-manifesto text-balance font-serif text-manifesto text-ink">
            {m.manifesto.linhas.map((linha, i) => (
              <span key={i} className="block">
                {linha.map((seg, j) => {
                  const azul = 'azul' in seg && seg.azul ? 'text-blue' : undefined;
                  return 'em' in seg && seg.em ? (
                    <em key={j} className={azul}>
                      {seg.t}
                    </em>
                  ) : (
                    <span key={j} className={azul}>
                      {seg.t}
                    </span>
                  );
                })}
              </span>
            ))}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
