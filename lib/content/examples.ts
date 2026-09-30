import type { Locale } from './pages';

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
const guides: Record<string, { locale: Locale; topic: GuideTopic; section: string }> = {
  '/sleep-cycles': { locale: 'en', topic: 'cycles', section: 'ninety-minute-planning' },
  '/ciclos-de-sueno': { locale: 'es', topic: 'cycles', section: 'planificar-con-90' },
  '/how-much-sleep': { locale: 'en', topic: 'duration', section: 'example-week' },
  '/cuantas-horas-dormir': { locale: 'es', topic: 'duration', section: 'ejemplo-semanal' },
  '/sleep-latency': { locale: 'en', topic: 'latency', section: 'simple-arithmetic' },
  '/cuanto-tardo-en-dormirme': { locale: 'es', topic: 'latency', section: 'aritmetica-simple' },
  '/sleep-schedule': { locale: 'en', topic: 'schedule', section: 'weekly-example' },
  '/horario-de-sueno': { locale: 'es', topic: 'schedule', section: 'ejemplo-semanal' },
};

// Public worked examples, not a visitor's plan. The clock values assume a day
// without a clock change; the calculator uses the visitor's selected local date.
function card(locale: Locale, title: string, summary: string, wake: string, inBed: string, latency: number): GuideExampleCard {
  const es = locale === 'es';
  const params = new URLSearchParams({ mode: 'wake', wake, latency: String(latency), cycle: '90', format: '24h' });
  return {
    title,
    summary,
    href: `${es ? '/hora-de-dormir' : '/bedtime-calculator'}#sleep=${params}`,
    facts: [
      { label: es ? 'Despertar' : 'Wake up', value: wake },
      { label: es ? 'Entrar en la cama' : 'Get into bed', value: inBed },
      { label: es ? 'Sueño estimado' : 'Estimated sleep', value: es ? '7 h 30 min' : '7 hours 30 minutes' },
      { label: es ? 'Margen para dormirte' : 'Settling allowance', value: `${latency} min` },
    ],
  };
}

export function getGuideExamples(path: string): GuideExamplesContent | undefined {
  const guide = guides[path];
  if (!guide) return;
  const { locale, topic } = guide;
  const es = locale === 'es';
  const content: GuideExamplesContent = {
    afterSectionId: guide.section,
    heading: es ? 'Prueba el ejemplo con tu horario' : 'Try the example with your schedule',
    intro: '',
    action: es ? 'Probar en la calculadora' : 'Try in the calculator',
    note: es
      ? 'Ejemplos con cinco ciclos de 90 minutos y sin cambio de hora: no predicen tus etapas de sueño. La calculadora abre estos valores para que puedas cambiar la hora, la fecha y el margen; no los guarda. Prioriza suficiente tiempo para dormir y revisa el día seleccionado.'
      : 'These examples use five 90-minute cycles and no clock change; they do not predict your sleep stages. The calculator opens these values so you can change the time, date, and allowance; it does not save them. Prioritize enough time for sleep and check the selected day.',
    cards: [],
  };
  switch (topic) {
    case 'cycles':
      content.intro = es
        ? 'Cinco ciclos estimados son 7 horas y 30 minutos de sueño. El margen de 15 minutos se suma al tiempo en cama; la calculadora también muestra otras duraciones para comparar.'
        : 'Five estimated cycles are 7 hours 30 minutes of sleep. The 15-minute allowance adds to time in bed; the calculator also shows other durations to compare.';
      content.cards = [card(locale,
        es ? 'Despertar a las 07:00' : 'Wake at 07:00',
        es ? '23:15 a 07:00 son 7 horas y 45 minutos en cama, incluidos los 15 minutos de transición.' : '23:15 to 07:00 is 7 hours 45 minutes in bed, including the 15-minute transition.',
        '07:00', '23:15', 15)];
      break;
    case 'duration':
      content.intro = es
        ? 'Reproduce la cuenta de la semana del ejemplo: el tiempo en cama incluye la transición y puede ser mayor que el sueño estimado.'
        : 'Reproduce the example-week calculation: time in bed includes settling and can be longer than estimated sleep.';
      content.cards = [card(locale,
        es ? 'La alarma de las 06:45' : 'The 06:45 alarm',
        es ? 'Entrar en la cama a las 23:00 deja 7 horas y 45 minutos hasta la alarma. Restar el margen deja 7 horas y 30 minutos de sueño estimado.' : 'Getting into bed at 23:00 leaves 7 hours 45 minutes until the alarm. Subtracting the allowance leaves 7 hours 30 minutes of estimated sleep.',
        '06:45', '23:00', 15)];
      break;
    case 'latency':
      content.intro = es
        ? 'Mantén el despertar y el sueño estimado iguales. Al aumentar el margen, la hora de entrar en la cama se adelanta; no se convierte ese margen en sueño.'
        : 'Keep the wake time and estimated sleep the same. A longer allowance moves the in-bed time earlier; the allowance does not become sleep.';
      content.cards = [
        card(locale, es ? 'Margen de 15 minutos' : '15-minute allowance',
          es ? '7 horas y 45 minutos en cama para este ejemplo.' : '7 hours 45 minutes in bed for this example.', '07:00', '23:15', 15),
        card(locale, es ? 'Margen de 30 minutos' : '30-minute allowance',
          es ? '8 horas en cama con el mismo sueño estimado.' : '8 hours in bed with the same estimated sleep.', '07:00', '23:00', 30),
      ];
      break;
    case 'schedule':
      content.intro = es
        ? 'Compara dos mañanas con 45 minutos de diferencia. Aquí se estiman 7 horas y 30 minutos de sueño; el plan de ocho horas explicado arriba reserva más tiempo.'
        : 'Compare two mornings 45 minutes apart. This comparison estimates 7 hours 30 minutes of sleep; the eight-hour plan above reserves more time.';
      content.cards = [
        card(locale, es ? 'Mañana entre semana' : 'Weekday morning',
          es ? 'Una alarma a las 06:30 deja la hora estimada en cama a las 22:45.' : 'A 06:30 alarm places the estimated in-bed time at 22:45.', '06:30', '22:45', 15),
        card(locale, es ? 'Mañana del fin de semana' : 'Weekend morning',
          es ? 'Con la alarma a las 07:15, la hora en cama pasa a las 23:30. La oportunidad sigue siendo de 7 horas y 45 minutos.' : 'With a 07:15 alarm, the in-bed time becomes 23:30. The opportunity remains 7 hours 45 minutes.', '07:15', '23:30', 15),
      ];
      break;
  }
  return content;
}
