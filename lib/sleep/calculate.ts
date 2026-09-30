import type {
  CalculationInput,
  CalculationOutcome,
  InputIssue,
  LocalTime,
  SleepOption,
  SleepSettings,
} from './types';

const CYCLE_COUNTS = [6, 5, 4, 3] as const;
const NAP_SLEEP_MINUTES = [20, 90] as const;

const DEFAULT_SLEEP_LATENCY_MINUTES = 15;
const DEFAULT_CYCLE_LENGTH_MINUTES = 90;
const MIN_SLEEP_LATENCY_MINUTES = 0;
const MAX_SLEEP_LATENCY_MINUTES = 60;
const MIN_CYCLE_LENGTH_MINUTES = 70;
const MAX_CYCLE_LENGTH_MINUTES = 120;

const MINUTES_PER_HOUR = 60;
const MINUTES_PER_DAY = 24 * MINUTES_PER_HOUR;
const MILLISECONDS_PER_MINUTE = 60_000;
const MILLISECONDS_PER_DAY = MINUTES_PER_DAY * MILLISECONDS_PER_MINUTE;
const OFFSET_SCAN_RADIUS = 3 * MILLISECONDS_PER_DAY;
const OFFSET_SCAN_STEP = 15 * MILLISECONDS_PER_MINUTE;

type LocalTimeField = 'wakeAt' | 'bedAt' | 'napAt';

interface DateParts {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
}

interface ParsedLocalTime {
  date?: Date;
  issue?: InputIssue;
}

/**
 * Keep user-controlled settings in the range supported by the calculator.
 * The calculator also applies this normalization internally so direct callers
 * cannot produce negative durations or divide by an unsafe cycle length.
 */
export function safeSettings(partial: Partial<SleepSettings> = {}): SleepSettings {
  const sleepLatencyMinutes = Number.isFinite(partial.sleepLatencyMinutes)
    ? Math.round(partial.sleepLatencyMinutes as number)
    : DEFAULT_SLEEP_LATENCY_MINUTES;
  const cycleLengthMinutes = Number.isFinite(partial.cycleLengthMinutes)
    ? Math.round(partial.cycleLengthMinutes as number)
    : DEFAULT_CYCLE_LENGTH_MINUTES;

  return {
    sleepLatencyMinutes: clamp(
      sleepLatencyMinutes,
      MIN_SLEEP_LATENCY_MINUTES,
      MAX_SLEEP_LATENCY_MINUTES,
    ),
    cycleLengthMinutes: clamp(
      cycleLengthMinutes,
      MIN_CYCLE_LENGTH_MINUTES,
      MAX_CYCLE_LENGTH_MINUTES,
    ),
    timeFormat: partial.timeFormat === '12h' ? '12h' : '24h',
  };
}

/** Resolve a clock-only link to a future local occurrence, including DST folds/gaps. */
export function nextLocalTime(
  time: string,
  now: Date,
  occurrence?: LocalTime['occurrence'],
): LocalTime | undefined {
  if (
    !(now instanceof Date) || !Number.isFinite(now.getTime()) ||
    (occurrence !== undefined && occurrence !== 'earlier' && occurrence !== 'later')
  ) return;

  // Walk calendar days at noon so crossing a midnight gap cannot normalize the
  // requested clock. Missing clocks are resolved by the same parser as calculate.
  const day = new Date(now);
  day.setHours(12, 0, 0, 0);
  for (let attempt = 0; attempt < 8; attempt += 1) {
    const date = `${String(day.getFullYear()).padStart(4, '0')}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
    const parsed = parseLocalTime({ date, time }, 'wakeAt');
    if (parsed.issue?.code === 'invalid') return;
    const candidates = parsed.date
      ? [parsed.date]
      : parsed.issue?.code === 'ambiguous'
        ? parsed.issue.choices!.map((iso) => new Date(iso))
        : [];
    const indices = occurrence === 'earlier'
      ? [0]
      : occurrence === 'later'
        ? [candidates.length - 1]
        : candidates.length > 1 ? [0, candidates.length - 1] : [0];
    for (const index of indices) {
      if (candidates[index]?.getTime() > now.getTime()) {
        return {
          date,
          time,
          ...(candidates.length > 1 ? { occurrence: index === 0 ? 'earlier' as const : 'later' as const } : {}),
        };
      }
    }
    day.setDate(day.getDate() + 1);
  }
}

export function calculate(input: CalculationInput): CalculationOutcome {
  const calculatedAt = toIsoOrEpoch(input.now);
  if (!(input.now instanceof Date) || !Number.isFinite(input.now.getTime())) {
    return withCalculatedAt(calculatedAt, emptyCalculation({ field: 'settings', code: 'invalid' }));
  }

  const settingsIssue = validateSettings(input.settings);
  if (settingsIssue) {
    return withCalculatedAt(calculatedAt, emptyCalculation(settingsIssue));
  }

  const settings = safeSettings(input.settings);

  switch (input.mode) {
    case 'wake':
      return withCalculatedAt(calculatedAt, calculateWake(input.wakeAt, settings));
    case 'sleepNow':
      return withCalculatedAt(calculatedAt, calculateSleepNow(input.now, settings));
    case 'nap':
      return withCalculatedAt(calculatedAt, calculateNap(input.napAt, settings));
    case 'window':
      return withCalculatedAt(calculatedAt, calculateWindow(input.bedAt, input.wakeAt, settings));
    default:
      return withCalculatedAt(calculatedAt, {
        results: [],
        issues: [{ field: 'settings', code: 'invalid' }],
      });
  }
}

function calculateWake(
  wakeAt: LocalTime | undefined,
  settings: SleepSettings,
): Pick<CalculationOutcome, 'results' | 'issues'> {
  const parsedWake = parseLocalTime(wakeAt, 'wakeAt');
  if (parsedWake.issue || !parsedWake.date) return emptyCalculation(parsedWake.issue!);

  const wakeTime = parsedWake.date;
  const results = CYCLE_COUNTS.map((cycles) => {
    const sleepMinutes = cycles * settings.cycleLengthMinutes;
    const inBedMinutes = sleepMinutes + settings.sleepLatencyMinutes;
    const bedtime = addMinutes(wakeTime, -inBedMinutes);

    return makeOption({
      id: `wake-${cycles}`,
      target: bedtime,
      bedtime,
      wakeTime,
      sleepMinutes,
      inBedMinutes,
      cycles,
      kind: 'bedtime',
    });
  });

  return { results, issues: [] };
}

function calculateSleepNow(
  now: Date,
  settings: SleepSettings,
): Pick<CalculationOutcome, 'results' | 'issues'> {
  if (!(now instanceof Date) || !Number.isFinite(now.getTime())) {
    return emptyCalculation({ field: 'settings', code: 'invalid' });
  }

  const bedtime = new Date(now.getTime());
  const results = CYCLE_COUNTS.map((cycles) => {
    const sleepMinutes = cycles * settings.cycleLengthMinutes;
    const inBedMinutes = sleepMinutes + settings.sleepLatencyMinutes;
    const wakeTime = addMinutes(bedtime, inBedMinutes);

    return makeOption({
      id: `sleep-now-${cycles}`,
      target: wakeTime,
      bedtime,
      wakeTime,
      sleepMinutes,
      inBedMinutes,
      cycles,
      kind: 'wake',
    });
  });

  return { results, issues: [] };
}

function calculateNap(
  napAt: LocalTime | undefined,
  settings: SleepSettings,
): Pick<CalculationOutcome, 'results' | 'issues'> {
  const parsedNap = parseLocalTime(napAt, 'napAt');
  if (parsedNap.issue || !parsedNap.date) return emptyCalculation(parsedNap.issue!);

  const bedtime = parsedNap.date;
  const results = NAP_SLEEP_MINUTES.map((sleepMinutes) => {
    // The 20-minute policy is explicitly time-in-bed-only: it has no latency.
    const includesLatency = sleepMinutes !== 20;
    const inBedMinutes = sleepMinutes + (includesLatency ? settings.sleepLatencyMinutes : 0);
    const wakeTime = addMinutes(bedtime, inBedMinutes);
    const cycles = sleepMinutes < settings.cycleLengthMinutes
      ? 0
      : Math.round(sleepMinutes / settings.cycleLengthMinutes);

    return makeOption({
      id: `nap-${sleepMinutes}`,
      target: wakeTime,
      bedtime,
      wakeTime,
      sleepMinutes,
      inBedMinutes,
      cycles,
      kind: 'nap',
    });
  });

  return { results, issues: [] };
}

function calculateWindow(
  bedAt: LocalTime | undefined,
  wakeAt: LocalTime | undefined,
  settings: SleepSettings,
): Pick<CalculationOutcome, 'results' | 'issues'> {
  const parsedBed = parseLocalTime(bedAt, 'bedAt');
  const parsedWake = parseLocalTime(wakeAt, 'wakeAt');
  const inputIssues = [parsedBed.issue, parsedWake.issue].filter(
    (issue): issue is InputIssue => Boolean(issue),
  );
  if (inputIssues.length > 0 || !parsedBed.date || !parsedWake.date) {
    return { results: [], issues: inputIssues };
  }

  const bedTime = parsedBed.date;
  const wakeLimit = parsedWake.date;
  const windowMinutes = elapsedMinutes(bedTime, wakeLimit);

  if (windowMinutes <= 0 || windowMinutes <= settings.sleepLatencyMinutes) {
    return emptyCalculation({ field: 'wakeAt', code: 'window-too-short' });
  }
  if (windowMinutes > MINUTES_PER_DAY) {
    return emptyCalculation({ field: 'wakeAt', code: 'window-too-long' });
  }

  const cycles = Math.floor(
    (windowMinutes - settings.sleepLatencyMinutes) / settings.cycleLengthMinutes,
  );
  if (cycles < 1) {
    return emptyCalculation({ field: 'wakeAt', code: 'window-too-short' });
  }

  const sleepMinutes = cycles * settings.cycleLengthMinutes;
  const inBedMinutes = settings.sleepLatencyMinutes + sleepMinutes;
  const wakeTime = addMinutes(bedTime, inBedMinutes);
  if (wakeTime.getTime() > wakeLimit.getTime()) {
    return emptyCalculation({ field: 'wakeAt', code: 'window-too-short' });
  }

  return {
    results: [
      makeOption({
        id: `window-${cycles}`,
        target: wakeTime,
        bedtime: bedTime,
        wakeTime,
        sleepMinutes,
        inBedMinutes,
        cycles,
        kind: 'wake',
      }),
    ],
    issues: [],
  };
}

function parseLocalTime(
  value: LocalTime | undefined,
  field: LocalTimeField,
): ParsedLocalTime {
  if (
    !value ||
    typeof value.date !== 'string' ||
    typeof value.time !== 'string' ||
    (value.occurrence !== undefined && value.occurrence !== 'earlier' && value.occurrence !== 'later')
  ) {
    return { issue: { field, code: 'invalid' } };
  }

  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.date);
  const timeMatch = /^(\d{2}):(\d{2})$/.exec(value.time);
  if (!dateMatch || !timeMatch) return { issue: { field, code: 'invalid' } };

  const parts: DateParts = {
    year: Number(dateMatch[1]),
    month: Number(dateMatch[2]),
    day: Number(dateMatch[3]),
    hour: Number(timeMatch[1]),
    minute: Number(timeMatch[2]),
  };
  const civilMilliseconds = createCivilMilliseconds(parts);
  if (civilMilliseconds === undefined) return { issue: { field, code: 'invalid' } };

  const candidates = findLocalCandidates(parts, civilMilliseconds);
  if (candidates.length === 0) return { issue: { field, code: 'nonexistent' } };
  if (candidates.length > 1 && value.occurrence === undefined) {
    return {
      issue: {
        field,
        code: 'ambiguous',
        choices: candidates.map((candidate) => candidate.toISOString()),
      },
    };
  }

  const candidateIndex = value.occurrence === 'later' ? candidates.length - 1 : 0;
  return { date: new Date(candidates[candidateIndex].getTime()) };
}

function createCivilMilliseconds(parts: DateParts): number | undefined {
  const civil = new Date(0);
  civil.setUTCFullYear(parts.year, parts.month - 1, parts.day);
  civil.setUTCHours(parts.hour, parts.minute, 0, 0);

  if (
    civil.getUTCFullYear() !== parts.year ||
    civil.getUTCMonth() !== parts.month - 1 ||
    civil.getUTCDate() !== parts.day ||
    civil.getUTCHours() !== parts.hour ||
    civil.getUTCMinutes() !== parts.minute
  ) {
    return undefined;
  }
  return civil.getTime();
}

function findLocalCandidates(parts: DateParts, civilMilliseconds: number): Date[] {
  const offsets = new Set<number>();
  for (
    let delta = -OFFSET_SCAN_RADIUS;
    delta <= OFFSET_SCAN_RADIUS;
    delta += OFFSET_SCAN_STEP
  ) {
    offsets.add(new Date(civilMilliseconds + delta).getTimezoneOffset());
  }

  const candidates = [...offsets]
    .map((offset) => new Date(civilMilliseconds + offset * MILLISECONDS_PER_MINUTE))
    .filter((candidate) => hasLocalParts(candidate, parts))
    .sort((left, right) => left.getTime() - right.getTime());

  return candidates.filter(
    (candidate, index) => index === 0 || candidate.getTime() !== candidates[index - 1].getTime(),
  );
}

function hasLocalParts(date: Date, parts: DateParts): boolean {
  return (
    date.getFullYear() === parts.year &&
    date.getMonth() === parts.month - 1 &&
    date.getDate() === parts.day &&
    date.getHours() === parts.hour &&
    date.getMinutes() === parts.minute &&
    date.getSeconds() === 0 &&
    date.getMilliseconds() === 0
  );
}

function validateSettings(value: SleepSettings | undefined): InputIssue | undefined {
  if (!value || typeof value !== 'object') return { field: 'settings', code: 'invalid' };
  if (
    !Number.isFinite(value.sleepLatencyMinutes) ||
    value.sleepLatencyMinutes < MIN_SLEEP_LATENCY_MINUTES ||
    value.sleepLatencyMinutes > MAX_SLEEP_LATENCY_MINUTES ||
    !Number.isFinite(value.cycleLengthMinutes) ||
    value.cycleLengthMinutes < MIN_CYCLE_LENGTH_MINUTES ||
    value.cycleLengthMinutes > MAX_CYCLE_LENGTH_MINUTES ||
    (value.timeFormat !== '24h' && value.timeFormat !== '12h')
  ) {
    return { field: 'settings', code: 'invalid' };
  }
  return undefined;
}

function makeOption(params: {
  id: string;
  target: Date;
  bedtime: Date;
  wakeTime: Date;
  sleepMinutes: number;
  inBedMinutes: number;
  cycles: number;
  kind: SleepOption['kind'];
}): SleepOption {
  return {
    id: params.id,
    target: params.target.toISOString(),
    bedtime: params.bedtime.toISOString(),
    wakeTime: params.wakeTime.toISOString(),
    sleepMinutes: params.sleepMinutes,
    inBedMinutes: params.inBedMinutes,
    cycles: params.cycles,
    kind: params.kind,
  };
}

function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * MILLISECONDS_PER_MINUTE);
}

function elapsedMinutes(start: Date, end: Date): number {
  return (end.getTime() - start.getTime()) / MILLISECONDS_PER_MINUTE;
}

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, value));
}

function emptyCalculation(issue: InputIssue): Pick<CalculationOutcome, 'results' | 'issues'> {
  return { results: [], issues: [issue] };
}

function withCalculatedAt(
  calculatedAt: string,
  calculation: Pick<CalculationOutcome, 'results' | 'issues'>,
): CalculationOutcome {
  return { ...calculation, calculatedAt };
}

function toIsoOrEpoch(value: Date): string {
  return value instanceof Date && Number.isFinite(value.getTime())
    ? value.toISOString()
    : new Date(0).toISOString();
}
