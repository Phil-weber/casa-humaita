import '../globals.css';
import { Documento, metadataDoLocale } from '@/components/layout/Documento';

/** Root layout do ingles — serve `/en/`. Ver a nota em `app/(pt)/layout.tsx`. */

export const metadata = metadataDoLocale('en');

export { viewport } from '@/components/layout/viewport';

export default function LayoutEN({ children }: { children: React.ReactNode }) {
  return <Documento locale="en">{children}</Documento>;
}
