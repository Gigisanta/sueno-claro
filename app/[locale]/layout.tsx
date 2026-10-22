import type { Viewport } from 'next';
import { notFound } from 'next/navigation';
import '../globals.css';
import { RootDocument } from '../../components/RootDocument';
import { localeFromPrefix } from '../../lib/i18n';

export const viewport: Viewport = {
  themeColor: '#161918', colorScheme: 'dark', width: 'device-width', initialScale: 1,
};

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const locale = localeFromPrefix((await params).locale);
  if (!locale) notFound();
  return <RootDocument locale={locale}>{children}</RootDocument>;
}
