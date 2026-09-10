import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SleepLike',
    short_name: 'SleepLike',
    description: 'Private sleep cycle calculator for bedtime, wake-up times and naps.',
    start_url: '/',
    display: 'standalone',
    background_color: '#161918',
    theme_color: '#161918',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'maskable' },
    ],
  };
}
