export const locales = ['en', 'es', 'pt-BR', 'fr', 'de', 'it', 'id'] as const;
export type Locale = (typeof locales)[number];
export type PageKey = 'home' | 'bedtime' | 'nap' | 'cycles' | 'duration' | 'latency' | 'schedule' | 'about' | 'contact' | 'privacy' | 'terms' | 'methodology';

export const localeInfo: Record<Locale, { name: string; openGraph: string; prefix: string }> = {
  en: { name: 'English', openGraph: 'en_US', prefix: '' },
  es: { name: 'Español', openGraph: 'es_ES', prefix: '' },
  'pt-BR': { name: 'Português (Brasil)', openGraph: 'pt_BR', prefix: 'pt-br' },
  fr: { name: 'Français', openGraph: 'fr_FR', prefix: 'fr' },
  de: { name: 'Deutsch', openGraph: 'de_DE', prefix: 'de' },
  it: { name: 'Italiano', openGraph: 'it_IT', prefix: 'it' },
  id: { name: 'Bahasa Indonesia', openGraph: 'id_ID', prefix: 'id' },
};

export const localizedPaths: Record<Locale, Record<PageKey, string>> = {
  en: { home: '/', bedtime: '/bedtime-calculator', nap: '/nap-calculator', cycles: '/sleep-cycles', duration: '/how-much-sleep', latency: '/sleep-latency', schedule: '/sleep-schedule', about: '/about', contact: '/contact', privacy: '/privacy', terms: '/terms', methodology: '/methodology' },
  es: { home: '/calculadora-de-sueno', bedtime: '/hora-de-dormir', nap: '/siesta', cycles: '/ciclos-de-sueno', duration: '/cuantas-horas-dormir', latency: '/cuanto-tardo-en-dormirme', schedule: '/horario-de-sueno', about: '/acerca-de', contact: '/contacto', privacy: '/privacidad', terms: '/terminos', methodology: '/metodologia' },
  'pt-BR': { home: '/pt-br', bedtime: '/pt-br/hora-de-dormir', nap: '/pt-br/calculadora-de-cochilo', cycles: '/pt-br/ciclos-do-sono', duration: '/pt-br/quantas-horas-dormir', latency: '/pt-br/tempo-para-adormecer', schedule: '/pt-br/horario-de-sono', about: '/pt-br/sobre', contact: '/pt-br/contato', privacy: '/pt-br/privacidade', terms: '/pt-br/termos', methodology: '/pt-br/metodologia' },
  fr: { home: '/fr', bedtime: '/fr/heure-du-coucher', nap: '/fr/calculateur-de-sieste', cycles: '/fr/cycles-du-sommeil', duration: '/fr/combien-d-heures-dormir', latency: '/fr/temps-d-endormissement', schedule: '/fr/horaires-de-sommeil', about: '/fr/a-propos', contact: '/fr/contact', privacy: '/fr/confidentialite', terms: '/fr/conditions', methodology: '/fr/methodologie' },
  de: { home: '/de', bedtime: '/de/schlafenszeit', nap: '/de/mittagsschlaf-rechner', cycles: '/de/schlafzyklen', duration: '/de/wie-viel-schlaf', latency: '/de/einschlafdauer', schedule: '/de/schlafrhythmus', about: '/de/ueber-uns', contact: '/de/kontakt', privacy: '/de/datenschutz', terms: '/de/nutzungsbedingungen', methodology: '/de/methodik' },
  it: { home: '/it', bedtime: '/it/ora-di-andare-a-letto', nap: '/it/calcolatore-pisolino', cycles: '/it/cicli-del-sonno', duration: '/it/quante-ore-dormire', latency: '/it/tempo-per-addormentarsi', schedule: '/it/orari-del-sonno', about: '/it/chi-siamo', contact: '/it/contatti', privacy: '/it/privacy', terms: '/it/condizioni', methodology: '/it/metodologia' },
  id: { home: '/id', bedtime: '/id/waktu-tidur', nap: '/id/kalkulator-tidur-siang', cycles: '/id/siklus-tidur', duration: '/id/berapa-jam-tidur', latency: '/id/waktu-untuk-tertidur', schedule: '/id/jadwal-tidur', about: '/id/tentang', contact: '/id/kontak', privacy: '/id/privasi', terms: '/id/ketentuan', methodology: '/id/metodologi' },
};

export const homePath = (locale: Locale) => localizedPaths[locale].home;
export function alternatePaths(key: PageKey): Record<Locale | 'x-default', string> {
  return {
    en: localizedPaths.en[key],
    es: localizedPaths.es[key],
    'pt-BR': localizedPaths['pt-BR'][key],
    fr: localizedPaths.fr[key],
    de: localizedPaths.de[key],
    it: localizedPaths.it[key],
    id: localizedPaths.id[key],
    'x-default': localizedPaths.en[key],
  };
}
export function localeFromPrefix(prefix: string): Locale | undefined {
  if (!prefix) return;
  return locales.find((locale) => localeInfo[locale].prefix === prefix);
}
