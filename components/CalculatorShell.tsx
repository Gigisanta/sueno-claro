'use client';

import { useEffect, useMemo, useState } from 'react';
import { calculateBedtimes, calculateNaps, calculateWakeTimes, calculateWindow, safeSettings } from '../lib/sleep/calculate';
import type { CalculatorMode, SleepResult } from '../lib/sleep/types';
import { formatDuration } from '../lib/sleep/format';

type Mode = CalculatorMode;

const copy = {
  en: {
    eyebrow: 'Sleep window planner',
    title: 'Your sleep windows',
    lead: 'Answer one timing question. Adjust assumptions only if you need to. Results appear with the trade-off clearly labeled.',
    modes: {
      wake: ['Wake up at', 'Find bedtimes that land between cycles'],
      sleepNow: ['Sleep now', 'Calculate wake-up options from this moment'],
      nap: ['Nap', 'Choose a short or full-cycle nap'],
      window: ['Fixed window', 'Estimate cycles inside limited time'],
    },
    wakeLabel: 'I want to wake up at',
    bedLabel: 'I can go to bed at',
    napLabel: 'Nap starts at',
    latency: 'Fall-asleep time',
    cycle: 'Cycle length',
    format: 'Time format',
    calculate: 'Calculate windows',
    beforeTitle: 'Ready when you are',
    beforeBody: 'Pick a mode and tap calculate. Sponsored space is hidden until after you get a useful result.',
    results: 'Recommended windows',
    best: 'Best fit',
    assumptions: 'Approximate cycles only — not medical sleep-stage tracking.',
    regularity: 'Choose the earliest realistic option you can repeat. Regularity beats a perfect one-off bedtime.',
    disclaimer: 'Educational wellness tool only. Real sleep cycles vary by person and night, often roughly 70–120 minutes. If you have persistent insomnia, excessive daytime sleepiness, loud snoring, gasping or breathing pauses, talk to a qualified clinician.',
    sponsored: 'Sponsored space — shown only after the result. Core calculator stays free.',
    copy: 'Copy',
    share: 'Share',
    calendar: 'Calendar',
    copied: 'Copied',
  },
  es: {
    eyebrow: 'Planificador de sueño',
    title: 'Tus ventanas de sueño',
    lead: 'Respondé una pregunta horaria. Ajustá supuestos solo si hace falta. Los resultados muestran el trade-off sin humo.',
    modes: {
      wake: ['Despertar a', 'Encontrá horarios para acostarte entre ciclos'],
      sleepNow: ['Dormir ahora', 'Calculá opciones para despertar desde ahora'],
      nap: ['Siesta', 'Elegí una siesta corta o de ciclo completo'],
      window: ['Ventana fija', 'Estimá ciclos dentro de poco tiempo'],
    },
    wakeLabel: 'Quiero despertarme a las',
    bedLabel: 'Puedo acostarme a las',
    napLabel: 'La siesta empieza a las',
    latency: 'Tiempo para dormirme',
    cycle: 'Duración del ciclo',
    format: 'Formato horario',
    calculate: 'Calcular ventanas',
    beforeTitle: 'Listo cuando vos quieras',
    beforeBody: 'Elegí un modo y calculá. El espacio patrocinado queda oculto hasta después de darte un resultado útil.',
    results: 'Ventanas recomendadas',
    best: 'Mejor opción',
    assumptions: 'Ciclos aproximados — no tracking médico de etapas de sueño.',
    regularity: 'Elegí la opción realista más temprana que puedas repetir. La regularidad gana a una hora perfecta aislada.',
    disclaimer: 'Herramienta educativa de bienestar. Los ciclos reales varían por persona y noche, muchas veces alrededor de 70–120 minutos. Si tenés insomnio persistente, somnolencia excesiva, ronquidos fuertes, jadeos o pausas respiratorias, consultá a un profesional.',
    sponsored: 'Espacio patrocinado — aparece solo después del resultado. La calculadora core sigue gratis.',
    copy: 'Copiar',
    share: 'Compartir',
    calendar: 'Calendario',
    copied: 'Copiado',
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

  return (
    <section id="calculator" className="calculator-card" aria-labelledby="calculator-title">
      <div className="calculator-head">
        <div>
          <p className="eyebrow"><span aria-hidden="true">✦</span>{c.eyebrow}</p>
          <h2 id="calculator-title" className="section-title">{c.title}</h2>
          <p className="section-copy">{c.lead}</p>
        </div>
        <div className="cycle-badge" aria-label={`${settings.cycleLengthMinutes} minute cycles`}>{settings.cycleLengthMinutes}m<br /><span>cycles</span></div>
      </div>

      <div className="mode-grid" role="group" aria-label="Calculator mode">
        {(Object.keys(c.modes) as Mode[]).map((item) => (
          <button key={item} type="button" className="mode-button" aria-pressed={mode === item} onClick={() => setMode(item)}>
            <span aria-hidden="true">{modeIcons[item]}</span>
            <strong>{c.modes[item][0]}</strong>
            <small>{c.modes[item][1]}</small>
          </button>
        ))}
      </div>

      <div className="form-grid">
        {mode !== 'sleepNow' && mode !== 'nap' ? (
          <div className="field featured-field">
            <label htmlFor="wake-time">{c.wakeLabel}</label>
            <input id="wake-time" name="wake-time" autoComplete="off" className="input time-input" type="time" value={wakeTime} suppressHydrationWarning onChange={(event) => setWakeTime(event.target.value)} />
          </div>
        ) : null}
        {mode === 'window' ? (
          <div className="field featured-field">
            <label htmlFor="bed-time">{c.bedLabel}</label>
            <input id="bed-time" name="bed-time" autoComplete="off" className="input time-input" type="time" value={bedTime} suppressHydrationWarning onChange={(event) => setBedTime(event.target.value)} />
          </div>
        ) : null}
        {mode === 'nap' ? (
          <div className="field featured-field">
            <label htmlFor="nap-time">{c.napLabel}</label>
            <input id="nap-time" name="nap-time" autoComplete="off" className="input time-input" type="time" value={napTime} suppressHydrationWarning onChange={(event) => setNapTime(event.target.value)} />
          </div>
        ) : null}
        <div className="field">
          <label htmlFor="latency">{c.latency}</label>
          <select id="latency" name="latency" autoComplete="off" className="select" value={latency} onChange={(event) => setLatency(Number(event.target.value))}>
            {[0, 5, 10, 15, 20, 30, 45, 60].map((value) => <option key={value} value={value}>{value} min</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="cycle">{c.cycle}</label>
          <select id="cycle" name="cycle" autoComplete="off" className="select" value={cycleLength} onChange={(event) => setCycleLength(Number(event.target.value))}>
            {[70, 80, 90, 100, 110, 120].map((value) => <option key={value} value={value}>{value} min</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="format">{c.format}</label>
          <select id="format" name="format" autoComplete="off" className="select" value={timeFormat} onChange={(event) => setTimeFormat(event.target.value as '24h' | '12h')}>
            <option value="24h">24h</option>
            <option value="12h">12h AM/PM</option>
          </select>
        </div>
      </div>

      <div className="actions">
        <button type="button" className="button primary calculate-button" onClick={calculate}>{c.calculate}</button>
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
              {results.map((result, index) => (
                <article key={result.id} className={`result-card ${result.quality === 'best' ? 'best' : ''}`}>
                  <div className="result-rank">{String(index + 1).padStart(2, '0')}</div>
                  <div className="result-main">
                    <div className="result-time">{result.time}</div>
                    <span className="result-label">{result.quality === 'best' ? c.best : result.quality === 'nap' ? 'Nap' : result.quality}</span>
                  </div>
                  <div className="result-detail"><strong>{result.title}</strong><br />{result.description} · {formatDuration(result.timeInBedMinutes)} total.</div>
                  <div className="result-actions">
                    <button type="button" className="icon-button" onClick={() => void copyResult(result)} aria-label={`${c.copy} ${result.time}`}>{copied === result.id ? '✓' : '⧉'}</button>
                    <a className="icon-button" href={currentShareUrl(result)} aria-label={`${c.share} ${result.time}`}>↗</a>
                    <a className="icon-button" href={createCalendarHref(result, lang)} download={`sueno-claro-${result.id}.ics`} aria-label={`${c.calendar} ${result.time}`}>＋</a>
                  </div>
                </article>
              ))}
            </div>
            <p className="disclaimer">{c.disclaimer}</p>
            <div className="ad-slot" data-testid="post-result-ad">{c.sponsored}</div>
          </>
        ) : (
          <div className="pre-result-card">
            <strong>{c.beforeTitle}</strong>
            <p>{c.beforeBody}</p>
            <p className="disclaimer">{c.disclaimer}</p>
          </div>
        )}
      </div>
    </section>
  );
}
