import { formatDuration, formatMinutes, minutesUntil, normalizeMinutes, parseTimeToMinutes } from './format';
import type { NapInput, SleepNowInput, SleepResult, WakeCalculationInput, WindowInput } from './types';

const CORE_CYCLES = [6, 5, 4, 3] as const;
const NAP_OPTIONS = [20, 90, 110] as const;

function resultQuality(cycles: number): SleepResult['quality'] {
  if (cycles >= 6) return 'best';
  if (cycles >= 5) return 'good';
  return 'minimum';
}

function makeResult(params: {
  id: string;
  minutes: number;
  cycles: number;
  timeInBedMinutes: number;
  quality?: SleepResult['quality'];
  format: '24h' | '12h';
  title: string;
  description: string;
}): SleepResult {
  return {
    id: params.id,
    time: formatMinutes(params.minutes, params.format),
    minutesFromMidnight: normalizeMinutes(params.minutes),
    cycles: params.cycles,
    timeInBedMinutes: params.timeInBedMinutes,
    quality: params.quality ?? resultQuality(params.cycles),
    title: params.title,
    description: params.description,
  };
}

export function calculateBedtimes({ wakeTime, settings }: WakeCalculationInput): SleepResult[] {
  const wakeMinutes = parseTimeToMinutes(wakeTime);
  return CORE_CYCLES.map((cycles) => {
    const sleepMinutes = cycles * settings.cycleLengthMinutes;
    const bedtime = wakeMinutes - sleepMinutes - settings.sleepLatencyMinutes;
    return makeResult({
      id: `wake-${cycles}`,
      minutes: bedtime,
      cycles,
      timeInBedMinutes: sleepMinutes + settings.sleepLatencyMinutes,
      format: settings.timeFormat,
      title: cycles >= 6 ? 'Best recovery window' : cycles === 5 ? 'Strong practical option' : 'Shorter night option',
      description: `${formatDuration(sleepMinutes + settings.sleepLatencyMinutes)} in bed including ${settings.sleepLatencyMinutes}m to fall asleep.`,
    });
  });
}

export function calculateWakeTimes({ now = new Date(), settings }: SleepNowInput): SleepResult[] {
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  return CORE_CYCLES.map((cycles) => {
    const sleepMinutes = cycles * settings.cycleLengthMinutes;
    const wake = currentMinutes + settings.sleepLatencyMinutes + sleepMinutes;
    return makeResult({
      id: `now-${cycles}`,
      minutes: wake,
      cycles,
      timeInBedMinutes: sleepMinutes + settings.sleepLatencyMinutes,
      format: settings.timeFormat,
      title: cycles >= 6 ? 'Best wake-up target' : cycles === 5 ? 'Good wake-up target' : 'Minimum wake-up target',
      description: `If you start now, this allows ${cycles} full estimated cycles.`,
    });
  });
}

export function calculateNaps({ startTime, settings }: NapInput): SleepResult[] {
  const startMinutes = parseTimeToMinutes(startTime);
  return NAP_OPTIONS.map((duration) => {
    const includesLatency = duration !== 20;
    const wake = startMinutes + duration + (includesLatency ? settings.sleepLatencyMinutes : 0);
    const cycles = duration >= settings.cycleLengthMinutes ? Math.round(duration / settings.cycleLengthMinutes) : 0;
    return makeResult({
      id: `nap-${duration}`,
      minutes: wake,
      cycles,
      timeInBedMinutes: duration + (includesLatency ? settings.sleepLatencyMinutes : 0),
      quality: 'nap',
      format: settings.timeFormat,
      title: duration === 20 ? 'Power nap' : duration === 90 ? 'Full-cycle nap' : 'Long recovery nap',
      description: duration === 20 ? 'Short enough to reduce grogginess risk for many people.' : `Includes ${duration}m of sleep time plus ${settings.sleepLatencyMinutes}m to fall asleep.`,
    });
  });
}

export function calculateWindow({ bedTime, wakeTime, settings }: WindowInput): SleepResult[] {
  const bed = parseTimeToMinutes(bedTime);
  const wake = parseTimeToMinutes(wakeTime);
  const available = Math.max(0, minutesUntil(bed, wake) - settings.sleepLatencyMinutes);
  const cycles = Math.floor(available / settings.cycleLengthMinutes);
  const idealWake = bed + settings.sleepLatencyMinutes + cycles * settings.cycleLengthMinutes;
  const nextCycleWake = bed + settings.sleepLatencyMinutes + (cycles + 1) * settings.cycleLengthMinutes;
  return [
    makeResult({
      id: 'window-fit',
      minutes: idealWake,
      cycles,
      timeInBedMinutes: settings.sleepLatencyMinutes + cycles * settings.cycleLengthMinutes,
      format: settings.timeFormat,
      title: cycles >= 5 ? 'Best fit inside your window' : 'Best fit, but short',
      description: `${cycles} estimated cycles fit before your target wake time.`,
    }),
    makeResult({
      id: 'window-next',
      minutes: nextCycleWake,
      cycles: cycles + 1,
      timeInBedMinutes: settings.sleepLatencyMinutes + (cycles + 1) * settings.cycleLengthMinutes,
      format: settings.timeFormat,
      title: 'Next full cycle',
      description: 'Use this if your schedule can move later.',
    }),
  ];
}

export function safeSettings(settings: Partial<{ sleepLatencyMinutes: number; cycleLengthMinutes: number; timeFormat: '24h' | '12h' }>) {
  const latency = Number.isFinite(settings.sleepLatencyMinutes) ? Number(settings.sleepLatencyMinutes) : 15;
  const cycle = Number.isFinite(settings.cycleLengthMinutes) ? Number(settings.cycleLengthMinutes) : 90;
  return {
    sleepLatencyMinutes: Math.min(60, Math.max(0, Math.round(latency))),
    cycleLengthMinutes: Math.min(120, Math.max(70, Math.round(cycle))),
    timeFormat: settings.timeFormat === '12h' ? '12h' : '24h',
  } as const;
}
