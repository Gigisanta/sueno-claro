import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ServiceWorkerRegistration } from '../components/ServiceWorkerRegistration';

export const metadata: Metadata = {
  metadataBase: new URL('https://sleeplike.maat.work'),
  title: {
    default: 'sleeplike — Sleep Cycle Calculator',
    template: '%s · sleeplike',
  },
  description: 'A private sleep cycle calculator for bedtime, wake-up times and naps. No account, no microphone, no tracking.',
  applicationName: 'sleeplike',
  alternates: {
    canonical: '/',
    languages: {
      en: '/sleep-calculator',
      es: '/calculadora-de-sueno',
    },
  },
  keywords: ['sleep calculator', 'bedtime calculator', 'wake up calculator', 'calculadora de sueño', 'ciclos de sueño'],
  openGraph: {
    title: 'sleeplike — Sleep Cycle Calculator',
    description: 'Plan your sleep around estimated cycles without accounts, microphone access or tracking.',
    url: 'https://sleeplike.maat.work',
    siteName: 'sleeplike',
    type: 'website',
    images: [{ url: '/og.svg', width: 1200, height: 630, alt: 'sleeplike private sleep calculator preview' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'sleeplike — Sleep Cycle Calculator',
    description: 'A fast, private sleep cycle calculator.',
    images: ['/og.svg'],
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
