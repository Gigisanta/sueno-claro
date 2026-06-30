import { describe, expect, it } from 'vitest';
import { calculateBedtimes, calculateNaps, calculateWakeTimes, calculateWindow, safeSettings } from './calculate';
import { formatDuration, formatMinutes, minutesUntil, parseTimeToMinutes } from './format';

const settings = { sleepLatencyMinutes: 15, cycleLengthMinutes: 90, timeFormat: '24h' as const };

describe('time helpers', () => {
  it('parses and formats 24h and 12h times', () => {
    expect(parseTimeToMinutes('07:30')).toBe(450);
    expect(formatMinutes(23 * 60 + 45)).toBe('23:45');
    expect(formatMinutes(0, '12h')).toBe('12:00 AM');
    expect(formatMinutes(13 * 60 + 5, '12h')).toBe('1:05 PM');
  });

  it('normalizes across midnight', () => {
    expect(formatMinutes(-15)).toBe('23:45');
    expect(minutesUntil(23 * 60, 6 * 60)).toBe(420);
    expect(formatDuration(465)).toBe('7h 45m');
  });
});

describe('sleep calculations', () => {
  it('calculates bedtime options before a wake target', () => {
    const [best, good] = calculateBedtimes({ wakeTime: '07:30', settings });
    expect(best.time).toBe('22:15');
    expect(best.cycles).toBe(6);
    expect(best.timeInBedMinutes).toBe(555);
    expect(good.time).toBe('23:45');
  });

  it('calculates wake times from a deterministic now', () => {
    const now = new Date('2026-06-30T23:50:00');
    const [best] = calculateWakeTimes({ now, settings });
    expect(best.time).toBe('09:05');
  });

  it('calculates naps without making the power nap a full sleep cycle', () => {
    const [power, full] = calculateNaps({ startTime: '14:10', settings });
    expect(power.time).toBe('14:30');
    expect(power.cycles).toBe(0);
    expect(full.time).toBe('15:55');
  });

  it('calculates the best fit inside an overnight window', () => {
    const [fit, next] = calculateWindow({ bedTime: '23:00', wakeTime: '06:30', settings });
    expect(fit.time).toBe('05:15');
    expect(fit.cycles).toBe(4);
    expect(next.time).toBe('06:45');
  });

  it('clamps unsafe settings to wellness guardrails', () => {
    expect(safeSettings({ sleepLatencyMinutes: -5, cycleLengthMinutes: 999 })).toEqual({
      sleepLatencyMinutes: 0,
      cycleLengthMinutes: 120,
      timeFormat: '24h',
    });
  });
});
