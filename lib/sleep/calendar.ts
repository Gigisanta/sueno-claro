import type { SleepOption } from './types';
import type { LocaleCopy } from '../locales/en';

const CRLF = '\r\n';
const EVENT_DURATION_MINUTES = 5;


export function createCalendar(option: SleepOption, reminders: LocaleCopy['reminders'], createdAt: string): string {
  const target = parseIso(option.target, 'target');
  const timestamp = parseIso(createdAt, 'createdAt');
  const end = new Date(target.getTime() + EVENT_DURATION_MINUTES * 60_000);
  const copy = option.kind === 'nap' && option.inBedMinutes === 20 ? reminders.shortNap : reminders[option.kind];
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
