import { localizedPaths, type Locale } from '../i18n';
import { localeCopy } from '../locales';
import { getPage } from './pages';

export interface GuideExampleCard {
  title: string;
  summary: string;
  href: string;
  facts: { label: string; value: string }[];
}

export interface GuideExamplesContent {
  afterSectionId: string;
  heading: string;
  intro: string;
  action: string;
  note: string;
  cards: GuideExampleCard[];
}

type GuideTopic = 'cycles' | 'duration' | 'latency' | 'schedule';
const englishSections: Record<GuideTopic, string> = { cycles: 'ninety-minute-planning', duration: 'example-week', latency: 'simple-arithmetic', schedule: 'weekly-example' };
const spanishSections: Record<GuideTopic, string> = { cycles: 'planificar-con-90', duration: 'ejemplo-semanal', latency: 'aritmetica-simple', schedule: 'ejemplo-semanal' };

// Public examples assume a day without a clock change. The actual calculator
// resolves each visitor's selected date and local time zone.
function card(locale: Locale, text: { title: string; summary: string }, wake: string, inBed: string, latency: number): GuideExampleCard {
  const c = localeCopy[locale].examples;
  const params = new URLSearchParams({ mode: 'wake', wake, latency: String(latency), cycle: '90', format: '24h' });
  return {
    ...text,
    href: `${localizedPaths[locale].bedtime}#sleep=${params}`,
    facts: [
      { label: c.wake, value: wake },
      { label: c.inBed, value: inBed },
      { label: c.sleep, value: c.duration },
      { label: c.allowance, value: `${latency} min` },
    ],
  };
}

export function getGuideExamples(path: string): GuideExamplesContent | undefined {
  const page = getPage(path);
  if (!page || page.kind !== 'guide') return;
  const topic = page.key;
  if (topic !== 'cycles' && topic !== 'duration' && topic !== 'latency' && topic !== 'schedule') return;
  const locale = page.locale;
  const c = localeCopy[locale].examples;
  const content: GuideExamplesContent = {
    afterSectionId: (locale === 'es' ? spanishSections : englishSections)[topic],
    heading: c.heading,
    intro: c[`${topic}Intro`],
    action: c.action,
    note: c.note,
    cards: [],
  };
  switch (topic) {
    case 'cycles':
      content.cards = [card(locale, c.cycles, '07:00', '23:15', 15)];
      break;
    case 'duration':
      content.cards = [card(locale, c.durationCard, '06:45', '23:00', 15)];
      break;
    case 'latency':
      content.cards = [card(locale, c.latency15, '07:00', '23:15', 15), card(locale, c.latency30, '07:00', '23:00', 30)];
      break;
    case 'schedule':
      content.cards = [card(locale, c.weekday, '06:30', '22:45', 15), card(locale, c.weekend, '07:15', '23:30', 15)];
      break;
  }
  return content;
}
