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


/** maatwork-brand-metadata: maatwork-mw-20260901 */
const maatWorkBrandMetadata: Metadata = {
  metadataBase: new URL("https://sleeplike.maat.work"),
  icons: {
    icon: [
      { url: '/icon-mw.svg?v=maatwork-mw-20260901', type: 'image/svg+xml' },
      { url: '/favicon-mw-32.png?v=maatwork-mw-20260901', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-mw.ico?v=maatwork-mw-20260901', type: 'image/x-icon' },
    ],
    shortcut: ['/favicon-mw.ico?v=maatwork-mw-20260901'],
    apple: [{ url: '/apple-touch-mw.png?v=maatwork-mw-20260901', sizes: '180x180', type: 'image/png' }],
    other: [{ rel: 'mask-icon', url: '/mask-mw.svg?v=maatwork-mw-20260901', color: '#0A0A11' }],
  },
  manifest: '/manifest.webmanifest?v=maatwork-mw-20260901',
  openGraph: {
    type: 'website',
    siteName: 'MaatWork',
    title: "sleeplike",
    description: "Experiencia de descanso y bienestar",
    images: [{ url: '/og-image.png?v=maatwork-mw-20260901', width: 1200, height: 630, alt: "sleeplike · MaatWork" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "sleeplike",
    description: "Experiencia de descanso y bienestar",
    images: ['/twitter-image.png?v=maatwork-mw-20260901'],
  },
}
Object.assign(metadata, maatWorkBrandMetadata)
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><ServiceWorkerRegistration />{children}</body>
    </html>
  );
}
