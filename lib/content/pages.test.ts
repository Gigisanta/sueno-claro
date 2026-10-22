import { describe, expect, it } from 'vitest';
import { getPage, pages, type ContentPage } from './pages';
import { locales, localizedPaths } from '../i18n';

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
  it('contains all twelve page topics in each of the six languages', () => {
    const expectedPaths = [
      ...englishProductPaths,
      ...spanishProductPaths,
      ...englishLegalPaths,
      ...spanishLegalPaths,
    ];

    expect(pages).toHaveLength(72);
    expect(pages.filter((page) => page.locale === 'en' || page.locale === 'es').map((page) => page.path).sort()).toEqual(expectedPaths.sort());
    expect(new Set(pages.map((page) => page.path)).size).toBe(72);
    for (const locale of locales) {
      const localized = pages.filter((page) => page.locale === locale);
      expect(localized, locale).toHaveLength(12);
      expect(new Set(localized.map((page) => page.key)).size, locale).toBe(12);
      expect(localized.filter((page) => page.kind === 'tool'), locale).toHaveLength(3);
      expect(localized.filter((page) => page.kind === 'guide'), locale).toHaveLength(4);
      expect(localized.filter((page) => page.kind === 'legal'), locale).toHaveLength(5);
    }
  });

  it('keeps every translation group complete and related links in the same language', () => {
    for (const page of pages) {
      expect(getPage(page.path)).toBe(page);
      expect(page.path, page.path).toBe(localizedPaths[page.locale][page.key]);
      const translations = pages.filter((candidate) => candidate.key === page.key);
      expect(new Set(translations.map((translation) => translation.locale)), page.path).toEqual(new Set(locales));
      for (const relatedPath of page.related) {
        expect(getPage(relatedPath), `${page.path} links to ${relatedPath}`).toBeDefined();
        expect(getPage(relatedPath)?.locale, `${page.path} links to ${relatedPath}`).toBe(page.locale);
      }
    }
  });

  it('uses the requested modes and content length bands', () => {

    for (const page of pages) {
      if (page.kind === 'tool') {
        expect(page.mode).toBe(page.key === 'nap' ? 'nap' : 'wake');
        if (page.locale === 'en' || page.locale === 'es') {
          expect(contentWords(page), page.path).toBeGreaterThanOrEqual(250);
          expect(contentWords(page), page.path).toBeLessThanOrEqual(400);
        }
      } else {
        expect(page.mode, page.path).toBeUndefined();
      }

      if (page.kind === 'guide' && (page.locale === 'en' || page.locale === 'es')) {
        expect(contentWords(page), page.path).toBeGreaterThanOrEqual(500);
        expect(contentWords(page), page.path).toBeLessThanOrEqual(750);
      }
    }
  });

  it('preserves the complete English editorial structure in every new translation', () => {
    for (const page of pages.filter((candidate) => candidate.locale !== 'en' && candidate.locale !== 'es')) {
      const original = pages.find((candidate) => candidate.locale === 'en' && candidate.key === page.key)!;
      expect(page.sections.map((section) => section.id), page.path).toEqual(original.sections.map((section) => section.id));
      for (const [index, section] of page.sections.entries()) {
        const source = original.sections[index];
        expect(section.paragraphs.length, `${page.path}#${section.id}`).toBe(source.paragraphs.length);
        expect(section.bullets?.length, `${page.path}#${section.id}`).toBe(source.bullets?.length);
        expect(section.table?.rows.map((row) => row.length), `${page.path}#${section.id}`).toEqual(source.table?.rows.map((row) => row.length));
        expect(section.table?.headers.length, `${page.path}#${section.id}`).toBe(source.table?.headers.length);
        expect([section.heading, ...section.paragraphs, ...(section.bullets ?? [])].every((text) => text.trim().length > 0), page.path).toBe(true);
      }
      expect(page.sources.map((source) => source.url), page.path).toEqual(original.sources.map((source) => source.url));
    }
  });

  it('keeps primary science sources on product and guide pages', () => {
    for (const page of pages.filter((candidate) => candidate.kind !== 'legal')) {
      const sources = page.sources.map((source) => new URL(source.url));
      const expectedHosts = ['www.nhlbi.nih.gov', 'www.cdc.gov'];
      if (page.key === 'schedule') expectedHosts.push('archive.cdc.gov');
      expect(new Set(sources.map((source) => source.hostname)), page.path).toEqual(new Set(expectedHosts));
      for (const source of sources) {
        expect(source.protocol, page.path).toBe('https:');
        expect(source.username + source.password, page.path).toBe('');
      }
    }
  });

  it('distinguishes the worked time-in-bed interval from estimated sleep in every locale', () => {
    const examples = [
      ['en', '2:45 a.m.', '7:33 a.m.', '4 hours 48 minutes', '4 hours 33 minutes', 'not a measurement'],
      ['es', '02:45', '07:33', '4 horas 48 minutos', '4 horas 33 minutos', 'no una medición'],
      ['pt-BR', '02:45', '07:33', '4 horas e 48 minutos', '4 horas e 33 minutos', 'não uma medição'],
      ['fr', '02:45', '07:33', '4 heures 48 minutes', '4 heures 33 minutes', 'pas une mesure'],
      ['de', '02:45', '07:33', '4 Stunden und 48 Minuten', '4 Stunden und 33 Minuten', 'keine Messung'],
      ['it', '02:45', '07:33', '4 ore e 48 minuti', '4 ore e 33 minuti', 'non una misurazione'],
    ];
    for (const [locale, ...terms] of examples) {
      const page = pages.find((candidate) => candidate.locale === locale && candidate.key === 'home')!;
      const example = page.sections.flatMap((section) => section.paragraphs).find((text) => text.includes(terms[0]));
      expect(example, page.path).toBeDefined();
      for (const term of terms) expect(example, page.path).toContain(term);
    }
  });

  it('cites official night-shift guidance and preserves safety cautions in all six schedules', () => {
    const cautions = {
      en: ['cannot adapt your circadian rhythms', 'Do not drive when sleepy', 'occupational health'],
      es: ['no adapta tus ritmos circadianos', 'No conduzcas con sueño', 'salud laboral'],
      'pt-BR': ['não adapta seus ritmos circadianos', 'Não dirija com sono', 'saúde ocupacional'],
      fr: ['ni adapter tes rythmes circadiens', 'Ne conduis pas si tu somnoles', 'santé au travail'],
      de: ['weder deinen zirkadianen Rhythmus anpassen', 'Fahre nicht, wenn du schläfrig bist', 'betriebsärztlich'],
      it: ['non adatta i ritmi circadiani', 'Non guidare se hai sonno', 'medicina del lavoro'],
    };
    for (const locale of locales) {
      const page = getPage(localizedPaths[locale].schedule)!;
      const section = page.sections.find((candidate) => candidate.id === 'night-shift');
      expect(section, page.path).toBeDefined();
      for (const caution of cautions[locale]) expect(section?.paragraphs.join(' '), page.path).toContain(caution);
      expect(page.sources.map((source) => source.url), page.path).toContain(
        'https://archive.cdc.gov/www_cdc_gov/niosh/work-hour-training-for-nurses/longhours/mod9/05.html',
      );
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

  it('uses valid revision dates without backdating new translations', () => {
    for (const page of pages) {
      expect(page.updated, page.path).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(new Date(page.updated).toISOString().slice(0, 10), page.path).toBe(page.updated);
      const original = pages.find((candidate) => candidate.locale === 'en' && candidate.key === page.key)!;
      expect(page.updated >= original.updated, page.path).toBe(true);
    }
  });
});
