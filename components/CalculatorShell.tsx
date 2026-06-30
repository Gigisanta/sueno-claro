'use client';

import { useEffect, useMemo, useState } from 'react';
import { calculateBedtimes, calculateNaps, calculateWakeTimes, calculateWindow, safeSettings } from '../lib/sleep/calculate';
import type { CalculatorMode, SleepResult } from '../lib/sleep/types';
import { formatDuration } from '../lib/sleep/format';

type Mode = CalculatorMode;

const copy = {
  en: {
    modes: {
      wake: ['☀', 'Wake up'],
      sleepNow: ['☾', 'Sleep now'],
      nap: ['◐', 'Nap'],
      window: ['⌁', 'Window'],
    },
    wakeLabel: 'Wake at',
    bedLabel: 'Bed at',
    napLabel: 'Nap at',
    latency: 'Latency',
    cycle: 'Cycle',
    calculate: 'Calculate',
    beforePrompt: 'Select your time and tap Calculate',
    results: 'Results',
    best: 'Best',
    cycles: 'cycles',
    disclaimer: 'Educational wellness tool. Sleep cycles vary (70–120 min). Not medical advice.',
    copy: 'Copy',
    share: 'Share',
    copied: '✓',
  },
  es: {
    modes: {
      wake: ['☀', 'Despertar'],
      sleepNow: ['☾', 'Dormir'],
      nap: ['◐', 'Siesta'],
      window: ['⌁', 'Ventana'],
    },
    wakeLabel: 'Despertar',
    bedLabel: 'Acostarse',
    napLabel: 'Siesta a las',
    latency: 'Latencia',
    cycle: 'Ciclo',
    calculate: 'Calcular',
    beforePrompt: 'Elegí tu horario y calculá',
    results: 'Resultados',
    best: 'Mejor',
    cycles: 'ciclos',
    disclaimer: 'Herramienta educativa. Los ciclos varían (70–120 min). No reemplaza consejo médico.',
    copy: 'Copiar',
    share: 'Compartir',
    copied: '✓',
  },
} as const;

const modeIcons: Record<Mode, string> = { wake: '☀', sleepNow: '☾', nap: '◐', window: '⌁' };
const defaultSettings = safeSettings({ sleepLatencyMinutes: 15, cycleLengthMinutes: 90, timeFormat: '24h' });

function nowTime() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}

function createCalendarHref(result: SleepResult, lang: 'en' | 'es') {
  const title = encodeURIComponent(lang === 'es' ? `Dormir: ${result.time}` : `Sleep: ${result.time}`);
  const details = encodeURIComponent(result.description);
  return `data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ASUMMARY:${title}%0ADESCRIPTION:${details}%0AEND:VEVENT%0AEND:VCALENDAR`;
}

function validTime(value: string | null): value is string {
  return /^\d{2}:\d{2}$/.test(value ?? '');
}

function parseMode(value: string | null): Mode | null {
  return value === 'wake' || value === 'sleepNow' || value === 'nap' || value === 'window' ? value : null;
}

export function CalculatorShell({ lang = 'en' }: { lang?: 'en' | 'es' }) {
  const c = copy[lang];
  const [mode, setMode] = useState<Mode>('wake');
  const [wakeTime, setWakeTime] = useState('07:30');
  const [bedTime, setBedTime] = useState('23:00');
  const [napTime, setNapTime] = useState('14:00');
  const [latency, setLatency] = useState(defaultSettings.sleepLatencyMinutes);
  const [cycleLength, setCycleLength] = useState(defaultSettings.cycleLengthMinutes);
  const [timeFormat, setTimeFormat] = useState<'24h' | '12h'>('24h');
  const [hasCalculated, setHasCalculated] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryMode = parseMode(params.get('mode'));
    const wake = params.get('wake');
    const bed = params.get('bed');
    const nap = params.get('nap');
    const queryLatency = params.has('latency') ? Number(params.get('latency')) : Number.NaN;
    const queryCycle = params.has('cycle') ? Number(params.get('cycle')) : Number.NaN;
    const queryFormat = params.get('format');

    if (queryMode) setMode(queryMode);
    if (validTime(wake)) setWakeTime(wake);
    if (validTime(bed)) setBedTime(bed);
    if (validTime(nap)) setNapTime(nap);
    if (Number.isFinite(queryLatency)) setLatency(queryLatency);
    if (Number.isFinite(queryCycle)) setCycleLength(queryCycle);
    if (queryFormat === '12h' || queryFormat === '24h') setTimeFormat(queryFormat);
    if (queryMode || validTime(wake) || validTime(bed) || validTime(nap)) setHasCalculated(true);
  }, []);

  const settings = useMemo(() => safeSettings({ sleepLatencyMinutes: latency, cycleLengthMinutes: cycleLength, timeFormat }), [latency, cycleLength, timeFormat]);
  const results = useMemo(() => {
    try {
      if (mode === 'wake') return calculateBedtimes({ wakeTime, settings });
      if (mode === 'sleepNow') return calculateWakeTimes({ settings });
      if (mode === 'nap') return calculateNaps({ startTime: napTime, settings });
      return calculateWindow({ bedTime, wakeTime, settings });
    } catch {
      return [];
    }
  }, [bedTime, mode, napTime, settings, wakeTime]);

  function currentShareUrl(result?: SleepResult) {
    const url = new URL(window.location.href);
    url.searchParams.set('mode', mode);
    if (mode !== 'sleepNow' && mode !== 'nap') url.searchParams.set('wake', wakeTime);
    if (mode === 'window') url.searchParams.set('bed', bedTime);
    if (mode === 'nap') url.searchParams.set('nap', napTime);
    url.searchParams.set('latency', String(settings.sleepLatencyMinutes));
    url.searchParams.set('cycle', String(settings.cycleLengthMinutes));
    url.searchParams.set('format', settings.timeFormat);
    if (result) url.searchParams.set('result', result.time);
    return url.toString();
  }

  function calculate() {
    const nextBedTime = mode === 'sleepNow' ? nowTime() : bedTime;
    if (mode === 'sleepNow') setBedTime(nextBedTime);
    setHasCalculated(true);
    const url = new URL(window.location.href);
    url.searchParams.set('mode', mode);
    if (mode !== 'sleepNow' && mode !== 'nap') url.searchParams.set('wake', wakeTime);
    if (mode === 'window') url.searchParams.set('bed', nextBedTime);
    if (mode === 'nap') url.searchParams.set('nap', napTime);
    url.searchParams.set('latency', String(settings.sleepLatencyMinutes));
    url.searchParams.set('cycle', String(settings.cycleLengthMinutes));
    url.searchParams.set('format', settings.timeFormat);
    window.history.replaceState(null, '', url);
  }

  async function copyResult(result: SleepResult) {
    const shareUrl = currentShareUrl(result);
    const text = `${result.time} — ${result.title}. ${result.description} ${shareUrl}`;
    await navigator.clipboard?.writeText(text).catch(() => undefined);
    setCopied(result.id);
    window.setTimeout(() => setCopied(null), 1400);
  }

  function timeInputValue(): string {
    if (mode === 'sleepNow') return nowTime();
    if (mode === 'nap') return napTime;
    if (mode === 'window') return wakeTime;
    return wakeTime;
  }

  function timeInputLabel(): string {
    if (mode === 'wake') return c.wakeLabel;
    if (mode === 'sleepNow') return c.wakeLabel;
    if (mode === 'nap') return c.napLabel;
    return c.wakeLabel;
  }

  function handleTimeChange(value: string) {
    if (mode === 'nap') setNapTime(value);
    else setWakeTime(value);
  }

  function showBedField(): boolean {
    return mode === 'window';
  }

  return (
    <section id="calculator" aria-label="Sleep calculator">
      {/* Mode selector */}
      <div className="mode-grid" role="group" aria-label="Calculator mode">
        {(Object.keys(c.modes) as Mode[]).map((item) => (
          <button key={item} type="button" className="mode-button" aria-pressed={mode === item} onClick={() => setMode(item)}>
            <span aria-hidden="true">{modeIcons[item]}</span>
            <span>{c.modes[item][1]}</span>
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div className="form-grid">
        <div className="field">
          <label htmlFor="primary-time">{timeInputLabel()}</label>
          <input
            id="primary-time"
            autoComplete="off"
            className="input time-input"
            type="time"
            value={timeInputValue()}
            suppressHydrationWarning
            onChange={(e) => handleTimeChange(e.target.value)}
          />
        </div>

        {showBedField() ? (
          <div className="field">
            <label htmlFor="bed-time">{c.bedLabel}</label>
            <input id="bed-time" autoComplete="off" className="input time-input" type="time" value={bedTime} suppressHydrationWarning onChange={(e) => setBedTime(e.target.value)} />
          </div>
        ) : null}

        <div className="settings-row">
          <div className="field">
            <label htmlFor="latency">{c.latency}</label>
            <select id="latency" className="select" value={latency} onChange={(e) => setLatency(Number(e.target.value))}>
              {[0, 5, 10, 15, 20, 30, 45, 60].map((v) => <option key={v} value={v}>{v}m</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="cycle">{c.cycle}</label>
            <select id="cycle" className="select" value={cycleLength} onChange={(e) => setCycleLength(Number(e.target.value))}>
              {[70, 80, 90, 100, 110, 120].map((v) => <option key={v} value={v}>{v}m</option>)}
            </select>
          </div>
        </div>

        <div className="field">
          <label>Format</label>
          <div className="format-toggle" role="group" aria-label="Time format">
            {(['24h', '12h'] as const).map((fmt) => (
              <button key={fmt} type="button" className="format-btn" aria-pressed={timeFormat === fmt} onClick={() => setTimeFormat(fmt)}>{fmt}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Calculate */}
      <div className="actions">
        <button type="button" className="btn btn-primary" onClick={calculate}>{c.calculate}</button>
      </div>

      {/* Results */}
      <div className="result-zone" aria-live="polite">
        {hasCalculated ? (
          <>
            <span className="result-section-title">{c.results}</span>
            <div className="result-list">
              {results.map((result, index) => (
                <article key={result.id} className={`result-card ${result.quality === 'best' ? 'best' : ''}`}>
                  <div className="result-rank">{index === 0 && result.quality === 'best' ? '★' : String(index + 1).padStart(2, '0')}</div>
                  <div className="result-info">
                    <div className="result-time">{result.time}</div>
                    <div className="result-meta">
                      {result.quality === 'best' ? <><span className="result-label">{c.best}</span> · </> : null}
                      {formatDuration(result.timeInBedMinutes)} · {result.cycles ?? '?'} {c.cycles}
                    </div>
                  </div>
                  <div className="result-actions">
                    <button type="button" className="icon-btn" onClick={() => void copyResult(result)} aria-label={`${c.copy} ${result.time}`}>{copied === result.id ? c.copied : '⧉'}</button>
                    <a className="icon-btn" href={currentShareUrl(result)} aria-label={`${c.share} ${result.time}`}>↗</a>
                    <a className="icon-btn" href={createCalendarHref(result, lang)} download={`sueno-claro-${result.id}.ics`} aria-label="Calendar">+</a>
                  </div>
                </article>
              ))}
            </div>
            <p className="disclaimer">{c.disclaimer}</p>
          </>
        ) : (
          <div className="pre-result">
            {c.beforePrompt}
          </div>
        )}
      </div>
    </section>
  );
}
