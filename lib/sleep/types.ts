export type CalculatorMode = 'wake' | 'sleepNow' | 'nap' | 'window';

export interface SleepSettings {
  sleepLatencyMinutes: number;
  cycleLengthMinutes: number;
  timeFormat: '24h' | '12h';
}

export interface SleepResult {
  id: string;
  time: string;
  minutesFromMidnight: number;
  cycles: number;
  timeInBedMinutes: number;
  quality: 'best' | 'good' | 'minimum' | 'nap';
  title: string;
  description: string;
}

export interface WakeCalculationInput {
  wakeTime: string;
  settings: SleepSettings;
}

export interface SleepNowInput {
  now?: Date;
  settings: SleepSettings;
}

export interface NapInput {
  startTime: string;
  settings: SleepSettings;
}

export interface WindowInput {
  bedTime: string;
  wakeTime: string;
  settings: SleepSettings;
}
