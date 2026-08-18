import type { Locale } from '@/lib/i18n';
import { Section } from '@/components/ui/Section';
import { Hero } from '@/components/sections/Hero';
import { Manifesto } from '@/components/sections/Manifesto';
import { VitrineCards } from '@/components/sections/VitrineCards';
import { RoomsRail } from '@/components/sections/RoomsRail';
import { Arquitetura } from '@/components/sections/Arquitetura';
import { Localizacao } from '@/components/sections/Localizacao';
import { Avaliacoes } from '@/components/sections/Avaliacoes';
import { Buzios } from '@/components/sections/Buzios';
import { Essencial } from '@/components/sections/Essencial';
import { Contato } from '@/components/sections/Contato';

/**
 * Corpo da home, compartilhado pelos tres idiomas. Cada rota (`/`, `/en/`,
 * `/es/`) e um arquivo de tres linhas que so passa o locale para ca.
 *
 * A ordem foi revista pelo cliente:
 *
 *   hero -> manifesto -> VITRINE -> comodos -> FICHA (linha)
 *        -> arquitetura -> localizacao -> avaliacoes -> conheca -> essencial
 *        -> contato -> rodape
 *
 * Duas mudancas em relacao ao brief §5: a vitrine de cards entra entre o
 * manifesto e "A casa", e a ficha deixa de ser secao propria para virar uma
 * linha fina entre os comodos e a Arquitetura.
 *
 * Quem e componente de SERVIDOR recebe `locale` por prop, porque `getMensagens()`
 * sem argumento devolveria sempre PT. Quem e de CLIENTE le pelo
 * `MensagensProvider`, que ja recebe o dicionario certo no Documento — por isso
 * Hero, Vitrine, RoomsRail, Arquitetura, Localizacao e Avaliacoes nao aparecem
 * aqui com prop nenhuma.
 *
 * A secao 11 (rodape) vive no Documento, porque acompanha todas as rotas.
 */
export function HomeSecoes({ locale }: { locale: Locale }) {
  return (
    <>
      {/* 1 · Hero — escuro */}
      <div id="topo">
        <Hero />
      </div>
      {/* Sentinela lida pelo Header: sobre o hero o cabecalho nao existe. */}
      <div data-hero-fim aria-hidden="true" />

      {/* 2 · Manifesto — claro */}
      <Manifesto locale={locale} />

      {/* 2b · Vitrine de cards empilhados — claro.
          Com textura, como o resto do site: sem ela esta secao ficava um bloco
          de branco chapado no meio da pagina. */}
      <Section tone="light" semRespiro>
        <VitrineCards />
      </Section>

      {/* 4 · A regua de ambientes — claro · ASSINATURA */}
      <Section id="ambientes" tone="light">
        <RoomsRail />
      </Section>

      {/* 5 · Arquitetura — escuro */}
      <Arquitetura />

      {/* 6 · Localizacao — claro */}
      <Section id="localizacao" tone="light" semRespiro className="py-section">
        <Localizacao />
      </Section>

      {/* 7 · Avaliacoes — claro */}
      <Section id="avaliacoes" tone="light">
        <Avaliacoes />
      </Section>

      {/* 8 · Conheca Buzios — claro */}
      <Buzios locale={locale} />

      {/* 9 · O essencial — claro */}
      <Essencial locale={locale} />

      {/* 10 · Contato — escuro */}
      <Contato locale={locale} />
    </>
  );
}
