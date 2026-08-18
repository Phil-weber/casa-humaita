import '../globals.css';
import { Documento, metadataDoLocale } from '@/components/layout/Documento';

/**
 * Root layout do portugues — serve a raiz `/`.
 *
 * Sao tres root layouts, um por grupo de rota, porque so o root layout pode
 * declarar <html lang> e o idioma muda por rota. Nao existe `app/layout.tsx`:
 * se existisse, ele venceria os tres e o `lang` voltaria a ser fixo.
 */

export const metadata = metadataDoLocale('pt');

export { viewport } from '@/components/layout/viewport';

export default function LayoutPT({ children }: { children: React.ReactNode }) {
  return <Documento locale="pt">{children}</Documento>;
}
