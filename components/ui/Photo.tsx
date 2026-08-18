import { IMAGENS, type ImagemId } from '@/lib/images.generated';

/**
 * Toda foto do site passa por aqui — assets.md §5, CLAUDE.md "definicao de pronto".
 *
 * Garante de uma vez, e sem ninguem precisar lembrar:
 *
 *   - AVIF com fallback WebP, nesta ordem de preferencia;
 *   - `srcset` responsivo que nunca ultrapassa a resolucao nativa (38 das 57
 *     fotos estao em 720px — pedir mais que isso so entrega borrao);
 *   - `width`/`height` explicitos vindos do manifesto gerado no build, o que
 *     reserva a caixa antes do download e mantem CLS = 0;
 *   - `loading="lazy"` por padrao. So o hero passa `priority` (brief §11).
 *
 * `alt` e obrigatorio no tipo: sem ele o componente nao compila.
 */

interface PhotoProps {
  id: ImagemId;
  /** Descritivo, escrito para quem nao ve a foto. Nunca marketing (copy.md §12). */
  alt: string;
  /** Larguras de exibicao por breakpoint, ex.: '(max-width: 768px) 100vw, 690px'. */
  sizes: string;
  className?: string;
  /** Exclusivo do hero: carrega cedo e com prioridade alta. */
  priority?: boolean;
  /** `alt=""` marca a imagem como decorativa; use so quando o texto ao lado ja diz tudo. */
  decorativa?: boolean;
}

export function Photo({ id, alt, sizes, className, priority = false, decorativa = false }: PhotoProps) {
  const meta = IMAGENS[id];
  const srcset = (ext: 'avif' | 'webp') =>
    meta.larguras.map((w) => `/images/${id}-${w}.${ext} ${w}w`).join(', ');

  // Fallback para quem ignora srcset: uma largura intermediaria, nunca a maior.
  const fallback = meta.larguras.find((w) => w >= 1200) ?? meta.larguras[meta.larguras.length - 1];

  return (
    <picture>
      <source type="image/avif" srcSet={srcset('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcset('webp')} sizes={sizes} />
      <img
        src={`/images/${id}-${fallback}.webp`}
        alt={decorativa ? '' : alt}
        width={meta.w}
        height={meta.h}
        sizes={sizes}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        // eslint-disable-next-line @next/next/no-img-element
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        draggable={false}
      />
    </picture>
  );
}
