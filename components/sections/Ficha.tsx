'use client';

import { useMensagens } from '@/components/providers/MensagensProvider';
import {
  IconeHospedes,
  IconeSuites,
  IconeCamas,
  IconeBanheiros,
  IconePiscina,
  IconeVista,
} from '@/components/icons/FichaIcons';

/**
 * A ficha da casa — brief §7·3, redesenhada duas vezes a pedido do cliente.
 *
 * Primeiro era uma secao inteira, ocupando uma tela. Depois virou uma faixa
 * entre a regua e a Arquitetura, e ficava deslocada ali no meio. Agora ela vive
 * DENTRO da secao "Descubra nossa casa", entre o filete do titulo e a fileira de
 * fotos — que e o unico lugar onde a informacao e util sem competir com nada.
 *
 * Registro sutil: numero e rotulo na mesma linha de base, icone de traco fino em
 * azul antes de cada par, filetes verticais discretos separando. Sem caixa, sem
 * fundo proprio, sem respiro de secao — ela e uma legenda, nao um bloco.
 *
 * Os icones sao os mesmos seis desenhados a mao (traco 1,2px, registro de
 * gravura do passaro da logo). Nenhuma biblioteca de icones, conforme o brief.
 */
export function Ficha() {
  // Le pelo provider, e nao por `getMensagens()`: a Ficha e usada dentro do
  // RoomsRail, que e `'use client'` — entao ela ja roda no cliente, e
  // `getMensagens()` sem argumento devolveria portugues nos tres idiomas.
  const m = useMensagens();

  const itens = [
    { ...m.facts.guests, Icone: IconeHospedes },
    { ...m.facts.suites, Icone: IconeSuites },
    { ...m.facts.beds, Icone: IconeCamas },
    { ...m.facts.baths, Icone: IconeBanheiros },
    { ...m.facts.pool, Icone: IconePiscina },
    { ...m.facts.view, Icone: IconeVista },
  ];

  return (
    <ul className="flex flex-wrap items-center gap-x-8 gap-y-5 md:gap-x-10 lg:justify-between">
      {itens.map((item) => (
        <li key={item.label} className="flex items-center gap-2.5">
          <item.Icone className="h-[22px] w-[22px] shrink-0 text-blue/70" />
          <span className="flex items-baseline gap-1.5">
            <span className="font-serif text-[19px] leading-none text-ink">{item.value}</span>
            <span className="font-sans text-caption uppercase text-faint">{item.label}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
