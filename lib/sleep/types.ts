export type CalculatorMode = 'wake' | 'sleepNow' | 'nap' | 'window';

export type Locale = 'en' | 'es';

export interface LocalTime {
  date: string;
  time: string;
  occurrence?: 'earlier' | 'later';
}

export interface SleepSettings {
  sleepLatencyMinutes: number;
  cycleLengthMinutes: number;
  timeFormat: '24h' | '12h';
}

export interface CalculationInput {
  mode: CalculatorMode;
  now: Date;
  wakeAt?: LocalTime;
  bedAt?: LocalTime;
  napAt?: LocalTime;
  settings: SleepSettings;
}

export interface SleepOption {
  id: string;
  target: string;
  bedtime: string;
  wakeTime: string;
  sleepMinutes: number;
  inBedMinutes: number;
  cycles: number;
  kind: 'bedtime' | 'wake' | 'nap';
}

export interface InputIssue {
  field: 'wakeAt' | 'bedAt' | 'napAt' | 'settings';
  code: 'invalid' | 'nonexistent' | 'ambiguous' | 'window-too-short' | 'window-too-long';
  choices?: string[];
}

export interface CalculationOutcome {
  results: SleepOption[];
  issues: InputIssue[];
  calculatedAt: string;
}
