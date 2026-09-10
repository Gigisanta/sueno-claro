import type { Locale, SleepOption } from './types';

const CRLF = '\r\n';
const EVENT_DURATION_MINUTES = 5;

const REMINDER_COPY: Record<Locale, Record<SleepOption['kind'], { summary: string; description: string }>> = {
  en: {
    bedtime: {
      summary: 'Bedtime reminder',
      description: 'Time to go to bed.',
    },
    wake: {
      summary: 'Wake-up reminder',
      description: 'Time to wake up.',
    },
    nap: {
      summary: 'Nap reminder',
      description: 'Time to wake up from your nap.',
    },
  },
  es: {
    bedtime: {
      summary: 'Recordatorio de hora de dormir',
      description: 'Es hora de ir a dormir.',
    },
    wake: {
      summary: 'Recordatorio de despertar',
      description: 'Es hora de despertar.',
    },
    nap: {
      summary: 'Recordatorio de siesta',
      description: 'Es hora de despertar de la siesta.',
    },
  },
};

export function createCalendar(option: SleepOption, locale: Locale, createdAt: string): string {
  const target = parseIso(option.target, 'target');
  const timestamp = parseIso(createdAt, 'createdAt');
  const end = new Date(target.getTime() + EVENT_DURATION_MINUTES * 60_000);
  const copy = reminderCopy(option, locale);
  const uid = `sleeplike-${escapeText(option.target)}`;

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//sleeplike//Sleep reminders//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${formatIcsUtc(timestamp)}`,
    `DTSTART:${formatIcsUtc(target)}`,
    `DTEND:${formatIcsUtc(end)}`,
    `SUMMARY:${escapeText(copy.summary)}`,
    `DESCRIPTION:${escapeText(copy.description)}`,
    'END:VEVENT',
    'END:VCALENDAR',
    '',
  ].join(CRLF);
}

function reminderCopy(option: SleepOption, locale: Locale): { summary: string; description: string } {
  if (option.kind === 'nap' && option.inBedMinutes === 20) {
    return locale === 'es'
      ? {
          summary: 'Recordatorio de siesta corta',
          description: 'Siesta corta: 20 minutos en cama; sin estimación de latencia para dormir.',
        }
      : {
          summary: 'Short nap reminder',
          description: 'Short nap: 20 minutes in bed; no sleep-latency estimate.',
        };
  }
  return REMINDER_COPY[locale][option.kind];
}

function parseIso(value: string, field: string): Date {
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) throw new RangeError(`Invalid ${field} ISO timestamp`);
  return date;
}

function formatIcsUtc(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

function escapeText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\r\n|\r|\n/g, '\\n')
    .replace(/([;,])/g, '\\$1');
}
