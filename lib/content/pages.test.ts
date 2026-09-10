import { describe, expect, it } from 'vitest';
import { getPage, pages, type ContentPage } from './pages';

const englishProductPaths = [
  '/',
  '/bedtime-calculator',
  '/nap-calculator',
  '/sleep-cycles',
  '/how-much-sleep',
  '/sleep-latency',
  '/sleep-schedule',
];

const spanishProductPaths = [
  '/calculadora-de-sueno',
  '/hora-de-dormir',
  '/siesta',
  '/ciclos-de-sueno',
  '/cuantas-horas-dormir',
  '/cuanto-tardo-en-dormirme',
  '/horario-de-sueno',
];

const englishLegalPaths = ['/about', '/contact', '/privacy', '/terms', '/methodology'];
const spanishLegalPaths = ['/acerca-de', '/contacto', '/privacidad', '/terminos', '/metodologia'];

const sourceUrls = [
  'https://www.nhlbi.nih.gov/health/sleep/stages-of-sleep',
  'https://www.nhlbi.nih.gov/health/sleep/healthy-sleep',
  'https://www.cdc.gov/sleep/about/',
];

function contentWords(page: ContentPage): number {
  const values = [
    page.intro,
    ...page.sections.flatMap((section) => [
      ...section.paragraphs,
      ...(section.bullets ?? []),
      ...(section.table?.headers ?? []),
      ...(section.table?.rows.flat() ?? []),
    ]),
  ];

  return values.join(' ').trim().split(/\s+/u).length;
}

function pageText(page: ContentPage): string {
  return [
    page.title,
    page.description,
    page.heading,
    page.intro,
    ...page.sections.flatMap((section) => [
      section.heading,
      ...section.paragraphs,
      ...(section.bullets ?? []),
      ...(section.table?.headers ?? []),
      ...(section.table?.rows.flat() ?? []),
    ]),
  ].join(' ');
}

describe('content catalog', () => {
  it('contains exactly the agreed bilingual product and legal routes', () => {
    const expectedPaths = [
      ...englishProductPaths,
      ...spanishProductPaths,
      ...englishLegalPaths,
      ...spanishLegalPaths,
    ];

    expect(pages).toHaveLength(24);
    expect(new Set(pages.map((page) => page.path))).toEqual(new Set(expectedPaths));
    expect(new Set(pages.map((page) => page.path)).size).toBe(expectedPaths.length);
    expect(pages.filter((page) => page.locale === 'en')).toHaveLength(12);
    expect(pages.filter((page) => page.locale === 'es')).toHaveLength(12);
    expect(pages.filter((page) => page.kind === 'tool')).toHaveLength(6);
    expect(pages.filter((page) => page.kind === 'guide')).toHaveLength(8);
    expect(pages.filter((page) => page.kind === 'legal')).toHaveLength(10);
  });

  it('keeps every language pair symmetric and every related link in the catalog', () => {
    for (const page of pages) {
      expect(getPage(page.path)).toBe(page);
      expect(getPage(page.pairPath)?.pairPath).toBe(page.path);
      for (const relatedPath of page.related) {
        expect(getPage(relatedPath), `${page.path} links to ${relatedPath}`).toBeDefined();
      }
    }
  });

  it('uses the requested modes and content length bands', () => {
    const expectedModes: Record<string, 'wake' | 'nap'> = {
      '/': 'wake',
      '/bedtime-calculator': 'wake',
      '/nap-calculator': 'nap',
      '/calculadora-de-sueno': 'wake',
      '/hora-de-dormir': 'wake',
      '/siesta': 'nap',
    };

    for (const page of pages) {
      if (page.kind === 'tool') {
        expect(page.mode).toBe(expectedModes[page.path]);
        expect(contentWords(page), page.path).toBeGreaterThanOrEqual(250);
        expect(contentWords(page), page.path).toBeLessThanOrEqual(400);
      } else {
        expect(page.mode, page.path).toBeUndefined();
      }

      if (page.kind === 'guide') {
        expect(contentWords(page), page.path).toBeGreaterThanOrEqual(500);
        expect(contentWords(page), page.path).toBeLessThanOrEqual(750);
      }
    }
  });

  it('keeps primary science sources on product and guide pages', () => {
    for (const page of pages.filter((candidate) => candidate.kind !== 'legal')) {
      for (const url of sourceUrls) {
        expect(page.sources.map((source) => source.url), page.path).toContain(url);
      }
    }
  });

  it('states the privacy and methodology boundaries explicitly', () => {
    const privacyText = pageText(getPage('/privacy')!);
    const spanishPrivacyText = pageText(getPage('/privacidad')!);
    const methodologyText = pageText(getPage('/methodology')!);
    const spanishMethodologyText = pageText(getPage('/metodologia')!);

    expect(privacyText).toContain('If advertising is enabled');
    expect(privacyText).toContain('Vercel Analytics');
    expect(privacyText).toContain('aggregated form');
    expect(privacyText).toContain('Privacy preferences control in the footer');
    expect(privacyText).toContain('only after your consent');
    expect(privacyText).not.toContain('without consent');
    expect(privacyText).toContain('opt out');
    expect(spanishPrivacyText).toContain('Si se habilita publicidad');
    expect(spanishPrivacyText).toContain('Vercel Analytics');
    expect(spanishPrivacyText).toContain('anuncios no personalizados');
    expect(spanishPrivacyText).toContain('control Preferencias de privacidad del pie de página');
    expect(spanishPrivacyText).toContain('únicamente después de tu consentimiento');
    expect(spanishPrivacyText).not.toContain('sin consentimiento');
    expect(methodologyText).toContain('four planning modes');
    expect(methodologyText).toContain('snapshot of the local time now');
    expect(methodologyText).toContain('does not forecast future sleep stages');
    expect(spanishMethodologyText).toContain('Los cuatro modos de planificación');
    expect(spanishMethodologyText).toContain('captura de la hora local actual');
    expect(spanishMethodologyText).toContain('no pronostica etapas futuras del sueño');
  });

  it('uses one update date and does not import app or core code', () => {
    expect(new Set(pages.map((page) => page.updated))).toEqual(new Set(['2026-09-10']));
  });
});
