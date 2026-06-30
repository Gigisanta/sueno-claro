import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ServiceWorkerRegistration } from '../components/ServiceWorkerRegistration';

export const metadata: Metadata = {
  metadataBase: new URL('https://sueno-claro.vercel.app'),
  title: {
    default: 'Sueño Claro — Sleep Cycle Calculator',
    template: '%s · Sueño Claro',
  },
  description: 'A private sleep cycle calculator for bedtime, wake-up times and naps. No account, no microphone, no tracking.',
  applicationName: 'Sueño Claro',
  keywords: ['sleep calculator', 'bedtime calculator', 'wake up calculator', 'calculadora de sueño', 'ciclos de sueño'],
  openGraph: {
    title: 'Sueño Claro — Sleep Cycle Calculator',
    description: 'Plan your sleep around estimated cycles without accounts, microphone access or tracking.',
    url: 'https://sueno-claro.vercel.app',
    siteName: 'Sueño Claro',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sueño Claro — Sleep Cycle Calculator',
    description: 'A fast, private sleep cycle calculator.',
  },
};

export const viewport: Viewport = {
  themeColor: '#07111f',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><ServiceWorkerRegistration />{children}</body>
    </html>
  );
}
