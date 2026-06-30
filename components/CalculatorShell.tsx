'use client';

import { useMemo, useState } from 'react';
import { calculateBedtimes, calculateNaps, calculateWakeTimes, calculateWindow, safeSettings } from '../lib/sleep/calculate';
import type { CalculatorMode, SleepResult } from '../lib/sleep/types';
import { formatDuration } from '../lib/sleep/format';

type Mode = CalculatorMode;

const copy = {
  en: {
    eyebrow: 'Private sleep-cycle calculator',
    title: 'Wake between cycles, not in the middle of one.',
    lead: 'Plan bedtime, wake-up time, naps and tight sleep windows with a fast calculator that needs no account, microphone or tracking.',
    modes: { wake: 'Wake up at', sleepNow: 'Sleep now', nap: 'Nap', window: 'Fixed window' },
    wakeLabel: 'I want to wake up at',
    bedLabel: 'I can go to bed at',
    napLabel: 'Nap starts at',
    latency: 'Fall-asleep time',
    cycle: 'Cycle length',
    format: 'Time format',
    calculate: 'Calculate times',
    results: 'Your sleep windows',
    assumptions: 'Assumes approximate sleep cycles, not medical sleep-stage tracking.',
    regularity: 'A consistent sleep/wake schedule matters at least as much as one calculated time.',
    disclaimer: 'Educational wellness tool only. Real sleep cycles vary by person and night, often roughly 70–120 minutes. If you have persistent insomnia, excessive daytime sleepiness, loud snoring, gasping or breathing pauses, talk to a qualified clinician.',
    sponsored: 'Sponsored space appears only after you receive your result. Core calculator stays free.',
    copy: 'Copy',
    calendar: 'Calendar',
    copied: 'Copied',
  },
  es: {
    eyebrow: 'Calculadora privada de ciclos de sueño',
    title: 'Despertate entre ciclos, no en el medio.',
    lead: 'Planificá cuándo dormir, despertar, hacer siesta o encajar una ventana corta sin cuenta, micrófono ni tracking.',
    modes: { wake: 'Despertar a', sleepNow: 'Dormir ahora', nap: 'Siesta', window: 'Ventana fija' },
    wakeLabel: 'Quiero despertarme a las',
    bedLabel: 'Puedo acostarme a las',
    napLabel: 'La siesta empieza a las',
    latency: 'Tiempo para dormirme',
    cycle: 'Duración del ciclo',
    format: 'Formato horario',
    calculate: 'Calcular horarios',
    results: 'Tus ventanas de sueño',
    assumptions: 'Usa ciclos aproximados, no tracking médico de etapas de sueño.',
    regularity: 'La regularidad al dormir y despertar importa tanto como un horario calculado.',
    disclaimer: 'Herramienta educativa de bienestar. Los ciclos reales varían por persona y noche, muchas veces alrededor de 70–120 minutos. Si tenés insomnio persistente, somnolencia excesiva, ronquidos fuertes, jadeos o pausas respiratorias, consultá a un profesional.',
    sponsored: 'El espacio patrocinado aparece recién después del resultado. La calculadora core sigue gratis.',
    copy: 'Copiar',
    calendar: 'Calendario',
    copied: 'Copiado',
  },
} as const;

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

  function calculate() {
    if (mode === 'sleepNow') setBedTime(nowTime());
    setHasCalculated(true);
  }

  async function copyResult(result: SleepResult) {
    const text = `${result.time} — ${result.title}. ${result.description}`;
    await navigator.clipboard?.writeText(text).catch(() => undefined);
    setCopied(result.id);
    window.setTimeout(() => setCopied(null), 1400);
  }

  return (
    <section id="calculator" className="calculator-card" aria-labelledby="calculator-title">
      <p className="eyebrow">{c.eyebrow}</p>
      <h2 id="calculator-title" className="section-title">{c.results}</h2>
      <p className="section-copy">{c.lead}</p>

      <div className="mode-grid" role="group" aria-label="Calculator mode">
        {(Object.keys(c.modes) as Mode[]).map((item) => (
          <button key={item} type="button" className="mode-button" aria-pressed={mode === item} onClick={() => setMode(item)}>
            {c.modes[item]}
          </button>
        ))}
      </div>

      <div className="form-grid">
        {mode !== 'sleepNow' && mode !== 'nap' ? (
          <div className="field">
            <label htmlFor="wake-time">{c.wakeLabel}</label>
            <input id="wake-time" className="input" type="time" value={wakeTime} suppressHydrationWarning onChange={(event) => setWakeTime(event.target.value)} />
          </div>
        ) : null}
        {mode === 'window' ? (
          <div className="field">
            <label htmlFor="bed-time">{c.bedLabel}</label>
            <input id="bed-time" className="input" type="time" value={bedTime} suppressHydrationWarning onChange={(event) => setBedTime(event.target.value)} />
          </div>
        ) : null}
        {mode === 'nap' ? (
          <div className="field">
            <label htmlFor="nap-time">{c.napLabel}</label>
            <input id="nap-time" className="input" type="time" value={napTime} suppressHydrationWarning onChange={(event) => setNapTime(event.target.value)} />
          </div>
        ) : null}
        <div className="field">
          <label htmlFor="latency">{c.latency}</label>
          <select id="latency" className="select" value={latency} onChange={(event) => setLatency(Number(event.target.value))}>
            {[0, 5, 10, 15, 20, 30, 45, 60].map((value) => <option key={value} value={value}>{value} min</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="cycle">{c.cycle}</label>
          <select id="cycle" className="select" value={cycleLength} onChange={(event) => setCycleLength(Number(event.target.value))}>
            {[70, 80, 90, 100, 110, 120].map((value) => <option key={value} value={value}>{value} min</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="format">{c.format}</label>
          <select id="format" className="select" value={timeFormat} onChange={(event) => setTimeFormat(event.target.value as '24h' | '12h')}>
            <option value="24h">24h</option>
            <option value="12h">12h AM/PM</option>
          </select>
        </div>
      </div>

      <div className="actions">
        <button type="button" className="button primary" onClick={calculate}>{c.calculate}</button>
        <span className="helper">{c.assumptions}</span>
      </div>

      <div className="result-zone" aria-live="polite">
        {hasCalculated ? (
          <>
            <div className="result-header">
              <div>
                <h3>{c.results}</h3>
                <p>{c.regularity}</p>
              </div>
              <p>{settings.cycleLengthMinutes}m cycles · {settings.sleepLatencyMinutes}m latency</p>
            </div>
            <div className="result-list">
              {results.map((result) => (
                <article key={result.id} className={`result-card ${result.quality === 'best' ? 'best' : ''}`}>
                  <div className="result-time">{result.time}</div>
                  <div>
                    <span className="result-label">{result.quality === 'best' ? 'Best' : result.quality === 'nap' ? 'Nap' : result.quality}</span>
                    <div className="result-detail"><strong>{result.title}</strong><br />{result.description} · {formatDuration(result.timeInBedMinutes)} total.</div>
                  </div>
                  <div className="result-actions">
                    <button type="button" className="icon-button" onClick={() => void copyResult(result)} aria-label={`${c.copy} ${result.time}`}>{copied === result.id ? '✓' : '⧉'}</button>
                    <a className="icon-button" href={createCalendarHref(result, lang)} download={`sueno-claro-${result.id}.ics`} aria-label={`${c.calendar} ${result.time}`}>↗</a>
                  </div>
                </article>
              ))}
            </div>
            <p className="disclaimer">{c.disclaimer}</p>
            <div className="ad-slot" data-testid="post-result-ad">{c.sponsored}</div>
          </>
        ) : (
          <p className="disclaimer">{c.disclaimer}</p>
        )}
      </div>
    </section>
  );
}
