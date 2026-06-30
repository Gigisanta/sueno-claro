import { CalculatorShell } from './CalculatorShell';
import { PageChrome } from './PageChrome';

export function LandingContent({ lang = 'en' }: { lang?: 'en' | 'es' }) {
  const baseUrl = lang === 'es' ? 'https://sueno-claro.vercel.app/calculadora-de-sueno' : 'https://sueno-claro.vercel.app/sleep-calculator';
  const structuredData = [{
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Sueño Claro',
    url: baseUrl,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  }];
  return (
    <PageChrome lang={lang}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <CalculatorShell lang={lang} />
    </PageChrome>
  );
}
