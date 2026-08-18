import '../globals.css';
import { Documento, metadataDoLocale } from '@/components/layout/Documento';

/** Root layout do espanhol — serve `/es/`. Ver a nota em `app/(pt)/layout.tsx`. */

export const metadata = metadataDoLocale('es');

export { viewport } from '@/components/layout/viewport';

export default function LayoutES({ children }: { children: React.ReactNode }) {
  return <Documento locale="es">{children}</Documento>;
}
