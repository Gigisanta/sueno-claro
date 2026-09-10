import { describe, expect, it } from 'vitest';
import { calculate, safeSettings } from './calculate';
import type { CalculationInput, SleepSettings } from './types';

process.env.TZ = 'America/New_York';

const settings: SleepSettings = {
  sleepLatencyMinutes: 15,
  cycleLengthMinutes: 90,
  timeFormat: '24h',
};

function localTime(date: string, time: string, occurrence?: 'earlier' | 'later') {
  return { date, time, ...(occurrence ? { occurrence } : {}) };
}

function input(overrides: Partial<CalculationInput>): CalculationInput {
  return {
    mode: 'wake',
    now: new Date('2026-06-30T12:00:00.000Z'),
    settings,
    ...overrides,
  };
}

function localParts(iso: string): string {
  const date = new Date(iso);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

describe('safeSettings', () => {
  it('uses defaults and clamps unsafe values', () => {
    expect(safeSettings({})).toEqual({
      sleepLatencyMinutes: 15,
      cycleLengthMinutes: 90,
      timeFormat: '24h',
    });
    expect(safeSettings({ sleepLatencyMinutes: -5, cycleLengthMinutes: 999 })).toEqual({
      sleepLatencyMinutes: 0,
      cycleLengthMinutes: 120,
      timeFormat: '24h',
    });
    expect(safeSettings({ sleepLatencyMinutes: 12.6, cycleLengthMinutes: 88.4, timeFormat: '12h' })).toEqual({
      sleepLatencyMinutes: 13,
      cycleLengthMinutes: 88,
      timeFormat: '12h',
    });
  });
});

describe('calculate', () => {
  it('returns a settings issue and no results for NaN or out-of-range settings', () => {
    const emptyLatency = calculate(input({
      wakeAt: localTime('2026-07-01', '07:30'),
      settings: { ...settings, sleepLatencyMinutes: Number.NaN },
    }));
    expect(emptyLatency.results).toEqual([]);
    expect(emptyLatency.issues).toEqual([{ field: 'settings', code: 'invalid' }]);

    const invalidCycle = calculate(input({
      wakeAt: localTime('2026-07-01', '07:30'),
      settings: { ...settings, cycleLengthMinutes: 121 },
    }));
    expect(invalidCycle.results).toEqual([]);
    expect(invalidCycle.issues).toEqual([{ field: 'settings', code: 'invalid' }]);
  });

  it('returns no results for an injected invalid now value', () => {
    const outcome = calculate(input({
      wakeAt: localTime('2026-07-01', '07:30'),
      now: new Date(Number.NaN),
    }));

    expect(outcome.results).toEqual([]);
    expect(outcome.issues).toEqual([{ field: 'settings', code: 'invalid' }]);
  });

  it('calculates six and five cycle bedtimes for a dated 07:30 wake target', () => {
    const outcome = calculate(input({
      wakeAt: localTime('2026-07-01', '07:30'),
    }));

    expect(outcome.issues).toEqual([]);
    expect(outcome.calculatedAt).toBe('2026-06-30T12:00:00.000Z');
    expect(outcome.results).toHaveLength(4);
    expect(outcome.results[0]).toMatchObject({
      id: 'wake-6',
      target: outcome.results[0].bedtime,
      bedtime: expect.any(String),
      wakeTime: expect.any(String),
      sleepMinutes: 540,
      inBedMinutes: 555,
      cycles: 6,
      kind: 'bedtime',
    });
    expect(localParts(outcome.results[0].bedtime)).toBe('2026-06-30 22:15');
    expect(localParts(outcome.results[1].bedtime)).toBe('2026-06-30 23:45');
    expect(localParts(outcome.results[0].wakeTime)).toBe('2026-07-01 07:30');
  });

  it('preserves the date across midnight and leap day calculations', () => {
    const midnight = calculate(input({
      wakeAt: localTime('2026-07-01', '00:15'),
    }));
    expect(localParts(midnight.results[0].bedtime)).toBe('2026-06-30 15:00');

    const leapDay = calculate(input({
      wakeAt: localTime('2028-02-29', '07:30'),
    }));
    expect(localParts(leapDay.results[0].wakeTime)).toBe('2028-02-29 07:30');
    expect(localParts(leapDay.results[0].bedtime)).toBe('2028-02-28 22:15');
  });

  it('uses actual elapsed time over the spring DST transition', () => {
    const outcome = calculate(input({
      wakeAt: localTime('2026-03-08', '07:30'),
    }));

    expect(localParts(outcome.results[0].bedtime)).toBe('2026-03-07 21:15');
    expect(outcome.results[0].inBedMinutes).toBe(555);
  });

  it('uses actual elapsed time over the fall DST transition', () => {
    const outcome = calculate(input({
      wakeAt: localTime('2026-11-01', '07:30'),
    }));

    expect(localParts(outcome.results[0].bedtime)).toBe('2026-10-31 23:15');
    expect(outcome.results[0].inBedMinutes).toBe(555);
  });

  it('rejects a nonexistent spring DST wall time', () => {
    const outcome = calculate(input({
      wakeAt: localTime('2026-03-08', '02:30'),
    }));

    expect(outcome.results).toEqual([]);
    expect(outcome.issues).toEqual([{ field: 'wakeAt', code: 'nonexistent' }]);
  });

  it('requires an occurrence for a repeated fall DST wall time', () => {
    const ambiguous = calculate(input({
      wakeAt: localTime('2026-11-01', '01:30'),
    }));
    expect(ambiguous.results).toEqual([]);
    expect(ambiguous.issues[0]).toMatchObject({ field: 'wakeAt', code: 'ambiguous' });
    expect(ambiguous.issues[0].choices).toHaveLength(2);
    expect(ambiguous.issues[0].choices?.[0]).toBe('2026-11-01T05:30:00.000Z');
    expect(ambiguous.issues[0].choices?.[1]).toBe('2026-11-01T06:30:00.000Z');

    const earlier = calculate(input({
      wakeAt: localTime('2026-11-01', '01:30', 'earlier'),
    }));
    const later = calculate(input({
      wakeAt: localTime('2026-11-01', '01:30', 'later'),
    }));
    expect(earlier.results[0].wakeTime).toBe('2026-11-01T05:30:00.000Z');
    expect(later.results[0].wakeTime).toBe('2026-11-01T06:30:00.000Z');
  });

  it('uses the exact now instant for sleep-now results', () => {
    const now = new Date('2026-06-30T23:50:42.123-04:00');
    const outcome = calculate(input({ mode: 'sleepNow', now }));
    const best = outcome.results[0];

    expect(best.bedtime).toBe(now.toISOString());
    expect(best.target).toBe(best.wakeTime);
    expect(best.wakeTime).toBe('2026-07-01T13:05:42.123Z');
    expect(best.sleepMinutes).toBe(540);
    expect(best.inBedMinutes).toBe(555);
    expect(best.kind).toBe('wake');
  });

  it('returns only the 20 and 90 minute nap policies', () => {
    const outcome = calculate(input({
      mode: 'nap',
      napAt: localTime('2026-07-01', '14:10'),
    }));

    expect(outcome.results.map((result) => result.sleepMinutes)).toEqual([20, 90]);
    expect(outcome.results[0]).toMatchObject({
      target: outcome.results[0].wakeTime,
      bedtime: outcome.results[0].bedtime,
      inBedMinutes: 20,
      cycles: 0,
      kind: 'nap',
    });
    expect(localParts(outcome.results[0].wakeTime)).toBe('2026-07-01 14:30');
    expect(outcome.results[1]).toMatchObject({ inBedMinutes: 105, cycles: 1 });
    expect(localParts(outcome.results[1].wakeTime)).toBe('2026-07-01 15:55');
  });

  it('fits complete cycles without overshooting a constrained window', () => {
    const outcome = calculate(input({
      mode: 'window',
      bedAt: localTime('2026-07-01', '23:00'),
      wakeAt: localTime('2026-07-02', '06:30'),
    }));

    expect(outcome.issues).toEqual([]);
    expect(outcome.results).toHaveLength(1);
    expect(outcome.results[0]).toMatchObject({
      target: outcome.results[0].wakeTime,
      bedtime: outcome.results[0].bedtime,
      sleepMinutes: 360,
      inBedMinutes: 375,
      cycles: 4,
      kind: 'wake',
    });
    expect(localParts(outcome.results[0].wakeTime)).toBe('2026-07-02 05:15');

    const tight = calculate(input({
      mode: 'window',
      bedAt: localTime('2026-07-01', '23:00'),
      wakeAt: localTime('2026-07-02', '01:00'),
    }));
    expect(tight.results).toHaveLength(1);
    expect(localParts(tight.results[0].wakeTime)).toBe('2026-07-02 00:45');
    expect(new Date(tight.results[0].wakeTime).getTime()).toBeLessThanOrEqual(
      new Date('2026-07-02T01:00:00-04:00').getTime(),
    );
  });

  it('rejects equal or too-short windows instead of treating them as a full day', () => {
    const equal = calculate(input({
      mode: 'window',
      bedAt: localTime('2026-07-01', '23:00'),
      wakeAt: localTime('2026-07-01', '23:00'),
    }));
    expect(equal.results).toEqual([]);
    expect(equal.issues).toEqual([{ field: 'wakeAt', code: 'window-too-short' }]);

    const noCycle = calculate(input({
      mode: 'window',
      bedAt: localTime('2026-07-01', '23:00'),
      wakeAt: localTime('2026-07-02', '00:44'),
    }));
    expect(noCycle.results).toEqual([]);
    expect(noCycle.issues).toEqual([{ field: 'wakeAt', code: 'window-too-short' }]);
  });

  it('uses elapsed time when a window selects two distinct DST occurrences', () => {
    const outcome = calculate(input({
      mode: 'window',
      bedAt: localTime('2026-11-01', '01:15', 'earlier'),
      wakeAt: localTime('2026-11-01', '01:15', 'later'),
      settings: { ...settings, sleepLatencyMinutes: 0 },
    }));

    expect(outcome.results).toEqual([]);
    expect(outcome.issues).toEqual([{ field: 'wakeAt', code: 'window-too-short' }]);
  });

  it('limits windows to 24 elapsed hours and allows exactly one day', () => {
    const exactlyOneDay = calculate(input({
      mode: 'window',
      bedAt: localTime('2026-07-01', '08:00'),
      wakeAt: localTime('2026-07-02', '08:00'),
    }));
    expect(exactlyOneDay.issues).toEqual([]);
    expect(exactlyOneDay.results[0].inBedMinutes).toBe(1365);

    const tooLong = calculate(input({
      mode: 'window',
      bedAt: localTime('2026-07-01', '08:00'),
      wakeAt: localTime('2026-07-02', '08:01'),
    }));
    expect(tooLong.results).toEqual([]);
    expect(tooLong.issues).toEqual([{ field: 'wakeAt', code: 'window-too-long' }]);
  });

  it('reports malformed and calendar-invalid local inputs without throwing', () => {
    const invalidDate = calculate(input({
      wakeAt: localTime('2026-02-29', '07:30'),
    }));
    expect(invalidDate).toMatchObject({ results: [], issues: [{ field: 'wakeAt', code: 'invalid' }] });

    const invalidTime = calculate(input({
      mode: 'nap',
      napAt: localTime('2026-07-01', '24:00'),
    }));
    expect(invalidTime).toMatchObject({ results: [], issues: [{ field: 'napAt', code: 'invalid' }] });

    const missingWindowEnd = calculate(input({
      mode: 'window',
      bedAt: localTime('2026-07-01', '23:00'),
    }));
    expect(missingWindowEnd).toMatchObject({ results: [], issues: [{ field: 'wakeAt', code: 'invalid' }] });
  });

  it('retains the time-format setting without changing ISO calculation results', () => {
    const twentyFourHour = calculate(input({
      wakeAt: localTime('2026-07-01', '07:30'),
      settings: { ...settings, timeFormat: '24h' },
    }));
    const twelveHour = calculate(input({
      wakeAt: localTime('2026-07-01', '07:30'),
      settings: { ...settings, timeFormat: '12h' },
    }));

    expect(twelveHour.results).toEqual(twentyFourHour.results);
    expect(safeSettings({ ...settings, timeFormat: '12h' }).timeFormat).toBe('12h');
  });
});
