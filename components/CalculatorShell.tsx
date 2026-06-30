'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { calculateBedtimes, calculateNaps, calculateWakeTimes, calculateWindow, safeSettings } from '../lib/sleep/calculate';
import type { CalculatorMode, SleepResult } from '../lib/sleep/types';
import { formatDuration } from '../lib/sleep/format';
import { monetization, carbonAdsUrl, amazonUrl, productsForMode } from '../lib/monetization/config';

type Mode = CalculatorMode;

const copy = {
  en: {
    modes: {
      wake: ['☀', 'Wake up'],
      sleepNow: ['☾', 'Sleep now'],
      nap: ['◐', 'Nap'],
      window: ['⌁', 'Window'],
    },
    modeDesc: {
      wake: 'What time do you want to wake up?',
      sleepNow: 'Calculates your ideal wake-up times if you go to bed now.',
      nap: 'How long should you nap for optimal rest?',
      window: 'Finds restful sleep windows within your available time.',
    },
    wakeLabel: 'Wake at',
    bedLabel: 'Bed at',
    napLabel: 'Nap at',
    latency: 'Fall asleep',
    cycle: 'Cycle',
    best: 'Best',
    cycles: 'cycles',
    disclaimer: 'Educational tool. Sleep cycles vary (70–120 min).',
    sponsored: 'Sponsored',
    support: 'Support sleeplike',
    donate: 'Buy me a coffee',
    affiliate: 'As an Amazon Associate we earn from qualifying purchases.',
    copy: 'Copy',
    share: 'Share',
    copied: '✓',
    now: 'now',
  },
  es: {
    modes: {
      wake: ['☀', 'Despertar'],
      sleepNow: ['☾', 'Dormir'],
      nap: ['◐', 'Siesta'],
      window: ['⌁', 'Ventana'],
    },
    modeDesc: {
      wake: '¿A qué hora querés despertarte?',
      sleepNow: 'Calculá a qué hora te despertás si te dormís ahora.',
      nap: '¿Cuánto deberías dormir la siesta?',
      window: 'Encontrá ventanas de sueño en tu tiempo disponible.',
    },
    wakeLabel: 'Despertar',
    bedLabel: 'Acostarse',
    napLabel: 'Siesta',
    latency: 'Dormirse',
    cycle: 'Ciclo',
    best: 'Mejor',
    cycles: 'ciclos',
    disclaimer: 'Herramienta educativa. Los ciclos varían (70–120 min).',
    sponsored: 'Patrocinado',
    support: 'Apoyá sleeplike',
    donate: 'Invitame un café',
    affiliate: 'Como Asociado de Amazon ganamos con compras calificadas.',
    copy: 'Copiar',
    share: 'Compartir',
    copied: '✓',
    now: 'ahora',
  },
} as const;

const modeIcons: Record<Mode, string> = { wake: '☀', sleepNow: '☾', nap: '◐', window: '⌁' };
const modeLabels: Record<Mode, string> = { wake: 'Wake', sleepNow: 'Sleep', nap: 'Nap', window: 'Window' };
const modeLabelsEs: Record<Mode, string> = { wake: 'Despertar', sleepNow: 'Dormir', nap: 'Siesta', window: 'Ventana' };
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
  const [wakeTime, setWakeTime] = useState('--:--');
  const [bedTime, setBedTime] = useState('--:--');
  const [napTime, setNapTime] = useState('--:--');
  const [latency, setLatency] = useState(defaultSettings.sleepLatencyMinutes);
  const [cycleLength, setCycleLength] = useState(defaultSettings.cycleLengthMinutes);
  const [timeFormat, setTimeFormat] = useState<'24h' | '12h'>('24h');
  const [mounted, setMounted] = useState(false);

  // Set real time once mounted (avoids hydration mismatch)
  useEffect(() => {
    const now = nowTime();
    setWakeTime(now);
    setNapTime(now);
    setBedTime(() => {
      const h = new Date().getHours();
      return `${String(h < 12 ? 23 : h).padStart(2, '0')}:00`;
    });
    setMounted(true);
  }, []);

  // Read URL params on mount
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
  }, []);

  // Reset to "now" when switching to sleepNow mode
  useEffect(() => {
    if (mode === 'sleepNow') {
      setWakeTime(nowTime());
    }
  }, [mode]);

  // Keep URL in sync with state
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('mode', mode);
    if (mode !== 'sleepNow') url.searchParams.set('wake', wakeTime);
    if (mode === 'window') url.searchParams.set('bed', bedTime);
    if (mode === 'nap') url.searchParams.set('nap', napTime);
    url.searchParams.set('latency', String(latency));
    url.searchParams.set('cycle', String(cycleLength));
    url.searchParams.set('format', timeFormat);
    window.history.replaceState(null, '', url);
  }, [mode, wakeTime, bedTime, napTime, latency, cycleLength, timeFormat]);

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

  const displayTime = mode === 'sleepNow' ? nowTime() : (mode === 'nap' ? napTime : wakeTime);

  function handleTimeChange(value: string) {
    if (mode === 'nap') setNapTime(value);
    else setWakeTime(value);
  }

  async function copyResult(result: SleepResult) {
    const shareUrl = window.location.href;
    const text = `${result.time} — ${result.title}. ${result.description} ${shareUrl}`;
    await navigator.clipboard?.writeText(text).catch(() => undefined);
    setCopied(result.id);
    window.setTimeout(() => setCopied(null), 1400);
  }
  const [copied, setCopied] = useState<string | null>(null);

  return (
    <section id="calculator" aria-label="Sleep calculator">
      {/* App title */}
      <div className="app-title">sleeplike</div>

      {/* Mode selector — iOS segmented control */}
      <div className="mode-grid" role="group" aria-label="Calculator mode">
        {(Object.keys(modeIcons) as Mode[]).map((item) => (
          <button key={item} type="button" className="mode-button" aria-pressed={mode === item} onClick={() => setMode(item)}>
            <span aria-hidden="true">{modeIcons[item]}</span>
            <span>{(lang === 'es' ? modeLabelsEs : modeLabels)[item]}</span>
          </button>
        ))}
      </div>

      {/* Mode description — live-updating */}
      <div className="mode-desc">{c.modeDesc[mode]}</div>

      {/* iOS grouped form — always visible */}
      <div className="form-group">
        <div className="form-row">
          <label>{mode === 'nap' ? c.napLabel : c.wakeLabel}</label>
          <input
            autoComplete="off"
            className="time-input"
            type="time"
            value={displayTime}
            suppressHydrationWarning
            onChange={(e) => handleTimeChange(e.target.value)}
          />
          {mode === 'sleepNow' && <span className="time-now">{c.now}</span>}
        </div>

        {mode === 'window' ? (
          <div className="form-row">
            <label>{c.bedLabel}</label>
            <input autoComplete="off" className="time-input" type="time" value={bedTime} suppressHydrationWarning onChange={(e) => setBedTime(e.target.value)} />
          </div>
        ) : null}

        <div className="form-row">
          <label>{c.latency}</label>
          <select className="select" value={latency} onChange={(e) => setLatency(Number(e.target.value))}>
            {[0, 5, 10, 15, 20, 30, 45, 60].map((v) => <option key={v} value={v}>{v} min</option>)}
          </select>
        </div>

        <div className="form-row">
          <label>{c.cycle}</label>
          <select className="select" value={cycleLength} onChange={(e) => setCycleLength(Number(e.target.value))}>
            {[70, 80, 90, 100, 110, 120].map((v) => <option key={v} value={v}>{v} min</option>)}
          </select>
        </div>

        <div className="form-row format-row" onClick={() => setTimeFormat(timeFormat === '24h' ? '12h' : '24h')}>
          <label>Format</label>
          <span className="format-value">{timeFormat === '24h' ? '24-Hour' : '12-Hour'}</span>
        </div>
      </div>

      {/* Results + monetization — only after mount (avoids hydration mismatch) */}
      {mounted && (
        <>
          <div className="result-zone" aria-live="polite">
            <div className="results-section">
              {results.map((result, index) => (
                <div key={result.id} className={`result-item ${result.quality === 'best' ? 'best' : ''}`}>
                  <div className={`result-rank ${result.quality === 'best' ? 'result-rank-star' : ''}`}>
                    {index === 0 && result.quality === 'best' ? '★' : `${index + 1}`}
                  </div>
                  <div className="result-info">
                    <div className="result-time">{result.time}</div>
                    <div className="result-meta">
                      {result.quality === 'best' ? <><span className="result-label">{c.best}</span> · </> : null}
                      {formatDuration(result.timeInBedMinutes)} · {result.cycles ?? '?'} {c.cycles}
                    </div>
                  </div>
                  <div className="result-actions">
                    <button type="button" className="icon-btn" onClick={() => void copyResult(result)} aria-label={`${c.copy} ${result.time}`}>{copied === result.id ? c.copied : '⧉'}</button>
                    <a className="icon-btn" href={`#share-${result.id}`} onClick={(e) => { e.preventDefault(); window.open(window.location.href, '_blank'); }} aria-label={`${c.share} ${result.time}`}>↗</a>
                    <a className="icon-btn" href={createCalendarHref(result, lang)} download={`sleeplike-${result.id}.ics`} aria-label="Calendar">+</a>
                  </div>
                </div>
              ))}
            </div>

            <div className="ad-slot" data-ad-slot="true">
              <span className="ad-label">{c.sponsored}</span>
              {monetization.adNetwork === 'carbon' ? (
                <div id="_carbonads_js">
                  <script async type="text/javascript" src={carbonAdsUrl()!} />
                </div>
              ) : (
                <div className="ad-placeholder"><span>📢</span></div>
              )}
            </div>

            {monetization.showAffiliateLinks && (
              <div className="affiliate-products">
                <span className="ad-label">{c.support}</span>
                <div className="product-links">
                  {productsForMode(mode, lang as 'en' | 'es').map((p) => (
                    <a key={p.asin} className="product-link" href={amazonUrl(p.asin)} target="_blank" rel="nofollow sponsored">
                      <span>{p.emoji}</span>
                      <span>{p.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {monetization.showEmailCapture && (
              <div className="email-capture">
                <span className="ad-label">{lang === 'es' ? 'Tips de sueño' : 'Sleep tips'}</span>
                <form className="email-form" action={`https://convertkit.com/forms/${monetization.convertKitFormId}/subscriptions`} method="post" target="_blank">
                  <input className="email-input" type="email" name="email" placeholder={lang === 'es' ? 'tu@email.com' : 'your@email.com'} required />
                  <button type="submit" className="email-submit">{lang === 'es' ? 'Suscribirme' : 'Subscribe'}</button>
                </form>
              </div>
            )}
          </div>

          <p className="disclaimer">{c.disclaimer}</p>
          <p className="affiliate">{c.affiliate}</p>
        </>
      )}
    </section>
  );
}
