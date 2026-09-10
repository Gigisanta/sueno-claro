import { describe, expect, it } from 'vitest';
import ICAL from 'ical.js';
import { createCalendar } from './calendar';
import type { SleepOption } from './types';

const option: SleepOption = {
  id: 'wake-6',
  target: '2026-07-01T02:15:00.000Z',
  bedtime: '2026-07-01T02:15:00.000Z',
  wakeTime: '2026-07-01T11:30:00.000Z',
  sleepMinutes: 540,
  inBedMinutes: 555,
  cycles: 6,
  kind: 'bedtime',
};

function parsedEvent(ics: string): ICAL.Component {
  const calendar = new ICAL.Component(ICAL.parse(ics));
  const event = calendar.getFirstSubcomponent('vevent');
  if (!event) throw new Error('Expected a VEVENT');
  return event;
}

function property(event: ICAL.Component, name: string): string {
  const value = event.getFirstPropertyValue(name);
  if (value === null || value === undefined) throw new Error(`Expected ${name}`);
  return String(value);
}

describe('createCalendar', () => {
  it('creates parseable CRLF ICS with UTC timing and a stable target UID', () => {
    const ics = createCalendar(option, 'en', '2026-06-30T12:00:00.000Z');
    const event = parsedEvent(ics);

    expect(ics).toContain('\r\nBEGIN:VEVENT\r\n');
    expect(ics.endsWith('\r\n')).toBe(true);
    expect(ics.replace(/\r\n/g, '')).not.toMatch(/[\r\n]/);
    expect(property(event, 'uid')).toBe(`sleeplike-${option.target}`);
    expect(property(event, 'dtstamp')).toBe('2026-06-30T12:00:00Z');
    expect(property(event, 'dtstart')).toBe('2026-07-01T02:15:00Z');
    expect(property(event, 'dtend')).toBe('2026-07-01T02:20:00Z');
    expect(property(event, 'summary')).toBe('Bedtime reminder');
  });

  it('localizes the target action for Spanish wake and nap reminders', () => {
    const wake = createCalendar({ ...option, kind: 'wake', target: option.wakeTime }, 'es', '2026-06-30T12:00:00Z');
    const nap = createCalendar({ ...option, kind: 'nap', target: option.wakeTime }, 'es', '2026-06-30T12:00:00Z');
    const shortNap = createCalendar({
      ...option,
      kind: 'nap',
      target: option.wakeTime,
      inBedMinutes: 20,
      sleepMinutes: 20,
    }, 'en', '2026-06-30T12:00:00Z');

    expect(property(parsedEvent(wake), 'summary')).toBe('Recordatorio de despertar');
    expect(property(parsedEvent(nap), 'summary')).toBe('Recordatorio de siesta');
    expect(property(parsedEvent(shortNap), 'description')).toContain('20 minutes in bed');
    expect(property(parsedEvent(shortNap), 'description')).toContain('no sleep-latency estimate');
  });
});
