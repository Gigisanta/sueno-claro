import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const routes = ['', '/sleep-calculator', '/bedtime-calculator', '/nap-calculator', '/calculadora-de-sueno', '/ciclos-de-sueno'];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://sueno-claro.vercel.app${route}`,
    lastModified: new Date('2026-06-30'),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
