import { CalculatorShell } from './CalculatorShell';
import { PageChrome } from './PageChrome';

export function LandingContent({ lang = 'en' }: { lang?: 'en' | 'es' }) {
  const baseUrl = lang === 'es' ? 'https://sleeplike.maat.work/calculadora-de-sueno' : 'https://sleeplike.maat.work/sleep-calculator';
  const structuredData = [{
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'sleeplike',
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
