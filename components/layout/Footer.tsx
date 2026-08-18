import { getMensagens, type Locale } from '@/lib/i18n';
import { Section } from '@/components/ui/Section';
import { IconeInstagram, IconeWhatsApp, IconeAirbnb } from '@/components/icons/SocialIcons';
import { SeletorIdioma } from '@/components/ui/SeletorIdioma';

/**
 * Secao 11 — rodape. Escuro (navy), brief §5 e §7.
 *
 * Logo branca · endereco · Instagram · link do Airbnb · seletor de idioma com PT
 * ativo e EN/ES visiveis e desabilitados · no canto, `Criado por` seguido de
 * logo_lp.png (branca pura, so funciona sobre escuro — assets.md §2).
 */
export function Footer({ locale }: { locale: Locale }) {
  // `locale` vem por prop: componente de servidor nao le o MensagensProvider,
  // e `getMensagens()` sem argumento devolveria sempre portugues.
  const m = getMensagens(locale);

  return (
    <Section tone="dark" id="rodape" aria-label={m.site.name}>
      <div className="container-humaita">
        <div className="flex flex-col gap-14 md:flex-row md:items-start md:justify-between md:gap-10">
          {/* marca + endereco */}
          <div className="flex flex-col gap-6">
            <img
              src="/brand/logo-humaita-branca.png"
              alt={m.alt.logo}
              width={597}
              height={418}
              // `self-start`: sem isso o flex-column estica a imagem ate a
              // largura do container e quebra a proporcao da logo.
              className="h-10 w-auto self-start"
              loading="lazy"
            />
            <address className="max-w-xs not-italic text-corpo text-on-dark-2">
              {m.footer.address}
            </address>
          </div>

          {/* links externos */}
          <nav className="flex flex-col gap-4" aria-label={m.footer.instagram}>
            <a
              href={m.site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 font-sans text-menu uppercase transition-opacity duration-200 ease-out hover:opacity-60"
            >
              <IconeInstagram className="h-[18px] w-[18px]" />
              {m.footer.instagram}
            </a>
            <a
              href={m.site.airbnbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 font-sans text-menu uppercase transition-opacity duration-200 ease-out hover:opacity-60"
            >
              <IconeAirbnb className="h-[18px] w-[18px]" />
              {m.footer.airbnb}
            </a>
            {/* Fase 2: o numero ainda nao foi definido, entao o item existe e
                fica desabilitado, em vez de levar a lugar nenhum. */}
            <span
              aria-disabled="true"
              className="flex cursor-not-allowed items-center gap-3 font-sans text-menu uppercase opacity-45"
            >
              <IconeWhatsApp className="h-[18px] w-[18px]" />
              {m.footer.whatsapp}
            </span>
          </nav>

          {/* Seletor de idioma. Era uma lista com EN e ES desabilitados, porque
              so o portugues existia; agora os tres estao publicados e viraram
              links de verdade, pelo mesmo componente do hero e do cabecalho. */}
          <SeletorIdioma variante="footer" className="text-on-dark" />
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-on-dark-rule pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-caption uppercase text-on-dark-2">{m.footer.rights}</p>

          {/* credito, em corpo pequeno, no canto */}
          {/* `eyebrow` (12px) e o maior tamanho de texto utilitario que existe
              na escala do brief — `caption` e `menu` sao ambos 11px. Subir mais
              exigiria criar um token novo, e o CLAUDE.md proibe inventar
              tamanho fora dos que o brief fixou. */}
          <p className="flex items-center gap-5 font-sans text-eyebrow uppercase text-on-dark-2">
            {m.footer.credit}
            <img
              src="/brand/logo-lp.png"
              alt={m.alt.creditLogo}
              width={500}
              height={500}
              className="h-24 w-auto md:h-28"
              loading="lazy"
            />
          </p>
        </div>
      </div>
    </Section>
  );
}
