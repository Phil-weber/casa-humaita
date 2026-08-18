import { getMensagens, type Locale } from '@/lib/i18n';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import {
  IconeCheckin,
  IconeCheckout,
  IconeHospedesMin,
  IconePets,
  IconeEnxoval,
  IconeWifi,
  IconeAr,
  IconeEstacionamento,
  IconeSeguranca,
  IconeCozinha,
  IconeLavanderia,
} from '@/components/icons/EssencialIcons';

/**
 * Secao "O essencial" — redesenhada a pedido do cliente, no registro da secao
 * "Facilities" da referencia: grade minimalista, icone pequeno em azul, rotulo
 * curto e o valor logo abaixo.
 *
 * A lista anterior era um <dl> em duas colunas, sobria demais e sem hierarquia.
 * Esta versao reaproveita a mesma linguagem de icone que ficou aprovada na ficha
 * da casa — traco de 1,2px, registro de gravura — para as duas secoes falarem a
 * mesma lingua.
 *
 * O conteudo continua sendo o do copy.md §9, palavra por palavra: os rotulos e
 * os valores nao foram reescritos, so reorganizados.
 */

const ICONES = [
  IconeCheckin,
  IconeCheckout,
  IconeHospedesMin,
  IconePets,
  IconeEnxoval,
  IconeWifi,
  IconeAr,
  IconeEstacionamento,
  IconeSeguranca,
  IconeCozinha,
  IconeLavanderia,
];

export function Essencial({ locale }: { locale: Locale }) {
  // `locale` vem por prop: componente de servidor nao le o MensagensProvider,
  // e `getMensagens()` sem argumento devolveria sempre portugues.
  const m = getMensagens(locale);

  return (
    <Section tone="light">
      <div className="container-humaita">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-h2 text-ink">{m.essentials.title}</h2>
        </div>

        {/* Onze itens em grade de quatro deixam tres orfaos na ultima fila.
            `justify-center` no flex resolve: as tres ultimas ficam centradas em
            vez de encostadas a esquerda. */}
        <ul className="mx-auto mt-16 flex max-w-5xl flex-wrap justify-center gap-x-8 gap-y-12">
          {m.essentials.items.map((item, i) => {
            const Icone = ICONES[i] ?? IconeCheckin;
            return (
              <Reveal
                as="li"
                key={item.label}
                index={i}
                className="flex w-[calc(50%-1rem)] flex-col items-center text-center sm:w-[calc(33.333%-1.4rem)] lg:w-[calc(25%-1.5rem)]"
              >
                <Icone className="h-8 w-8 text-blue/75" />
                <span className="mt-5 font-sans text-caption uppercase text-ink">{item.label}</span>
                <span className="mt-2 max-w-[22ch] font-serif text-[15px] leading-[1.5] text-faint">
                  {item.value}
                </span>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
