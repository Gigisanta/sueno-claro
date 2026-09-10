"use client";

import { useEffect, useLayoutEffect, useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";
import { calculate, safeSettings } from "../lib/sleep/calculate";
import { createCalendar } from "../lib/sleep/calendar";
import type {
  CalculatorMode,
  CalculationOutcome,
  LocalTime,
  SleepOption,
} from "../lib/sleep/types";
import { readSharedSettings } from "../lib/privacy";
import { usePrivacy } from "./PrivacyProvider";
import { AdSlot } from "./AdSlot";

type Locale = "en" | "es";
type Field = "wakeAt" | "bedAt" | "napAt";
const modes: CalculatorMode[] = ["wake", "sleepNow", "nap", "window"];
const copy = {
  en: {
    modes: ["Wake up", "Sleep now", "Nap", "Time window"],
    questions: [
      "When do you need to wake up?",
      "Heading to bed now?",
      "When will your nap start?",
      "How much time do you have?",
    ],
    wakeAt: "Wake up",
    bedAt: "Go to bed",
    napAt: "Start nap",
    date: "Date",
    time: "Time",
    settings: "Adjust your estimates",
    latency: "Time to fall asleep (minutes)",
    cycle: "Estimated cycle (minutes)",
    format: "Time format",
    calculate: "Calculate",
    results: "Your estimated times",
    bed: "Go to bed at",
    wake: "Wake up at",
    sleep: "estimated sleep",
    inBed: "in bed",
    short: "Under 7 hours of sleep",
    share: "Share plan",
    copy: "Copy link",
    calendar: "Calendar reminder",
    calculated: "Calculated at",
    refreshed: "Time has moved on. Update your calculation when you are ready.",
    update: "Update to now",
    earlier: "First occurrence",
    later: "Second occurrence",
    choose: "Choose an occurrence",
    occurrence: "This time occurs twice",
    now: "The current time is captured when you calculate.",
    note: "Estimates for adults, not a guarantee of rest. Sleep cycles vary. Prioritize enough sleep and a regular schedule.",
    copied: "Link copied.",
    failed: "Automatic copying is unavailable. Copy the link below.",
    manual: "Plan link",
    ready: " options calculated.",
    invalid: "Enter a valid date and time.",
    nonexistent:
      "This local time does not exist because the clocks change. Choose another time.",
    ambiguous:
      "Clocks go back at this time. Choose the first or second occurrence.",
    "window-too-short":
      "This window cannot fit a complete estimated cycle after time to fall asleep. Choose a longer window.",
    "window-too-long": "Choose a window of 24 hours or less.",
    settingError:
      "Use 0–60 minutes to fall asleep and a cycle of 70–120 minutes.",
    zone: "Times use your device’s time zone:",
    reminder:
      "Downloads a calendar event. Your calendar controls notifications; this website is not an alarm.",
    napShort: "Short nap · 20 minutes in bed",
    napLong: "Long nap · estimated cycle",
  },
  es: {
    modes: ["Despertar", "Dormir ahora", "Siesta", "Ventana"],
    questions: [
      "¿A qué hora necesitas despertarte?",
      "¿Te vas a acostar ahora?",
      "¿Cuándo empieza tu siesta?",
      "¿De cuánto tiempo dispones?",
    ],
    wakeAt: "Despertarse",
    bedAt: "Acostarse",
    napAt: "Empezar la siesta",
    date: "Fecha",
    time: "Hora",
    settings: "Ajustar las estimaciones",
    latency: "Tiempo para dormirte (minutos)",
    cycle: "Ciclo estimado (minutos)",
    format: "Formato de hora",
    calculate: "Calcular",
    results: "Tus horarios estimados",
    bed: "Acostarse a las",
    wake: "Despertarse a las",
    sleep: "de sueño estimado",
    inBed: "en cama",
    short: "Menos de 7 horas de sueño",
    share: "Compartir plan",
    copy: "Copiar enlace",
    calendar: "Recordatorio de calendario",
    calculated: "Calculado a las",
    refreshed: "Ha pasado tiempo. Actualiza el cálculo cuando estés listo.",
    update: "Actualizar a ahora",
    earlier: "Primera ocurrencia",
    later: "Segunda ocurrencia",
    choose: "Elige una ocurrencia",
    occurrence: "Esta hora ocurre dos veces",
    now: "La hora actual se toma al pulsar Calcular.",
    note: "Estimaciones para adultos, sin garantía de descanso. Los ciclos varían. Prioriza dormir suficiente y mantener horarios regulares.",
    copied: "Enlace copiado.",
    failed: "No se pudo copiar automáticamente. Copia el enlace de abajo.",
    manual: "Enlace del plan",
    ready: " opciones calculadas.",
    invalid: "Introduce una fecha y una hora válidas.",
    nonexistent:
      "Esta hora local no existe por el cambio horario. Elige otra hora.",
    ambiguous:
      "El reloj retrocede a esta hora. Elige la primera o segunda ocurrencia.",
    "window-too-short":
      "La ventana no permite un ciclo estimado completo después de la latencia. Elige una ventana más larga.",
    "window-too-long": "Elige una ventana de 24 horas o menos.",
    settingError:
      "Usa entre 0 y 60 minutos para dormirte y ciclos de 70 a 120 minutos.",
    zone: "Los horarios usan la zona horaria de tu dispositivo:",
    reminder:
      "Descarga un evento. Tu calendario controla las notificaciones; esta web no es una alarma.",
    napShort: "Siesta corta · 20 minutos en cama",
    napLong: "Siesta larga · ciclo estimado",
  },
};
const localDate = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const localTime = (d: Date) =>
  `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
const empty: LocalTime = { date: "", time: "" };

export function CalculatorShell({
  lang = "en",
  initialMode = "wake",
}: {
  lang?: Locale;
  initialMode?: CalculatorMode;
}) {
  const c = copy[lang];
  const privacy = usePrivacy();
  const [mode, setMode] = useState<CalculatorMode>(initialMode);
  const [fields, setFields] = useState<Record<Field, LocalTime>>({
    wakeAt: empty,
    bedAt: empty,
    napAt: empty,
  });
  const [latency, setLatency] = useState("15");
  const [cycle, setCycle] = useState("90");
  const [format, setFormat] = useState<"24h" | "12h">("24h");
  const [outcome, setOutcome] = useState<CalculationOutcome | null>(null);
  const [stale, setStale] = useState(false);
  const [zone, setZone] = useState("");
  const [status, setStatus] = useState("");
  const [manualLink, setManualLink] = useState("");
  useLayoutEffect(() => {
    const now = new Date();
    const wake = new Date(now);
    wake.setHours(7, 30, 0, 0);
    if (wake <= now) wake.setDate(wake.getDate() + 1);
    const bed = new Date(now);
    bed.setHours(23, 0, 0, 0);
    const params = readSharedSettings(location.href);
    const defaults: Record<Field, LocalTime> = {
      wakeAt: { date: localDate(wake), time: "07:30" },
      bedAt: { date: localDate(bed), time: "23:00" },
      napAt: { date: localDate(now), time: localTime(now) },
    };
    for (const [field, key] of [
      ["wakeAt", "wake"],
      ["bedAt", "bed"],
      ["napAt", "nap"],
    ] as const) {
      if (params.has(key)) defaults[field].time = params.get(key)!;
      const date = params.get(`${key}Date`) ?? params.get("date");
      if (date) defaults[field].date = date;
      const occurrence = params.get(`${key}Occurrence`);
      if (occurrence === "earlier" || occurrence === "later")
        defaults[field].occurrence = occurrence;
    }
    // Old links contained wall times only. Interpret an overnight window as the next day,
    // while keeping explicit dates strict (including an intentionally insufficient window).
    if (
      params.get("mode") === "window" &&
      !params.has("wakeDate") &&
      !params.has("bedDate") &&
      !params.has("date")
    ) {
      defaults.bedAt.date = localDate(now);
      defaults.wakeAt.date = localDate(now);
      if (defaults.wakeAt.time <= defaults.bedAt.time) {
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        defaults.wakeAt.date = localDate(tomorrow);
      }
    }
    setFields(defaults);
    const sharedMode = params.get("mode");
    if (modes.includes(sharedMode as CalculatorMode))
      setMode(sharedMode as CalculatorMode);
    const settings = safeSettings({
      sleepLatencyMinutes: params.has("latency")
        ? Number(params.get("latency"))
        : 15,
      cycleLengthMinutes: params.has("cycle")
        ? Number(params.get("cycle"))
        : 90,
      timeFormat: params.get("format") === "12h" ? "12h" : "24h",
    });
    setLatency(String(settings.sleepLatencyMinutes));
    setCycle(String(settings.cycleLengthMinutes));
    setFormat(settings.timeFormat);
    setZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);
  useEffect(() => {
    const visibility = () => {
      if (
        document.visibilityState === "visible" &&
        mode === "sleepNow" &&
        outcome
      )
        setStale(true);
    };
    document.addEventListener("visibilitychange", visibility);
    return () => document.removeEventListener("visibilitychange", visibility);
  }, [mode, outcome]);
  const clear = () => {
    setOutcome(null);
    setStatus("");
    setManualLink("");
    setStale(false);
  };
  const event = (name: string) => {
    if (privacy.analyticsAllowed) track(name, { mode, language: lang });
  };
  function run(e?: FormEvent) {
    e?.preventDefault();
    const result = calculate({
      mode,
      now: new Date(),
      ...fields,
      settings: {
        sleepLatencyMinutes: latency.trim() ? Number(latency) : NaN,
        cycleLengthMinutes: cycle.trim() ? Number(cycle) : NaN,
        timeFormat: format,
      },
    });
    setOutcome(result);
    setStale(false);
    setStatus(
      result.results.length ? `${result.results.length}${c.ready}` : "",
    );
    if (result.results.length) event("calculation_completed");
  }
  function change(
    field: Field,
    key: "date" | "time" | "occurrence",
    value: string,
  ) {
    clear();
    setFields((previous) => ({
      ...previous,
      [field]: {
        ...previous[field],
        ...(key === "occurrence" ? {} : { occurrence: undefined }),
        [key]: value,
      },
    }));
  }
  const time = (iso: string) =>
    new Intl.DateTimeFormat(lang, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: format === "12h",
    }).format(new Date(iso));
  const date = (iso: string) =>
    new Intl.DateTimeFormat(lang, {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));
  const duration = (minutes: number) =>
    `${Math.floor(minutes / 60) ? `${Math.floor(minutes / 60)} h ` : ""}${minutes % 60 || minutes === 0 ? `${minutes % 60} min` : ""}`.trim();
  function link() {
    const params = new URLSearchParams({ mode, latency, cycle, format });
    for (const [field, key] of [
      ["wakeAt", "wake"],
      ["bedAt", "bed"],
      ["napAt", "nap"],
    ] as const) {
      if (
        (mode === "wake" && field === "wakeAt") ||
        (mode === "window" && field !== "napAt") ||
        (mode === "nap" && field === "napAt")
      ) {
        params.set(key, fields[field].time);
        params.set(`${key}Date`, fields[field].date);
        if (fields[field].occurrence)
          params.set(`${key}Occurrence`, fields[field].occurrence!);
      }
    }
    return `${location.origin}${location.pathname}#sleep=${params}`;
  }
  async function copyLink(url: string) {
    try {
      if (!navigator.clipboard) throw new Error("unavailable");
      await navigator.clipboard.writeText(url);
      setStatus(c.copied);
      event("share");
    } catch {
      setManualLink(url);
      setStatus(c.failed);
    }
  }
  async function share() {
    const url = link();
    if (navigator.share) {
      try {
        await navigator.share({ title: "SleepLike", url });
        event("share");
        return;
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
      }
    }
    await copyLink(url);
  }
  function calendar(option: SleepOption) {
    if (!outcome) return;
    const url = URL.createObjectURL(
      new Blob([createCalendar(option, lang, outcome.calculatedAt)], {
        type: "text/calendar;charset=utf-8",
      }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = `sleeplike-${option.id}.ics`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    event("reminder_download");
  }
  function input(field: Field) {
    const issue = outcome?.issues.find((item) => item.field === field);
    return (
      <fieldset className="date-time-field" key={field}>
        <legend>{c[field]}</legend>
        <div className="date-time-inputs">
          <label htmlFor={`${field}-date`}>
            {c.date}
            <input
              id={`${field}-date`}
              type="date"
              required
              value={fields[field].date}
              onChange={(e) => change(field, "date", e.target.value)}
              aria-invalid={!!issue}
              aria-describedby={issue ? `${field}-error` : undefined}
            />
          </label>
          <label htmlFor={`${field}-time`}>
            {c.time}
            <input
              id={`${field}-time`}
              type="time"
              required
              value={fields[field].time}
              onChange={(e) => change(field, "time", e.target.value)}
              aria-invalid={!!issue}
              aria-describedby={issue ? `${field}-error` : undefined}
            />
          </label>
        </div>
        {(issue?.code === "ambiguous" || fields[field].occurrence) && (
          <label htmlFor={`${field}-occurrence`}>
            {c.occurrence}
            <select
              id={`${field}-occurrence`}
              value={fields[field].occurrence ?? ""}
              onChange={(e) => change(field, "occurrence", e.target.value)}
            >
              <option value="">{c.choose}</option>
              <option value="earlier">{c.earlier}</option>
              <option value="later">{c.later}</option>
            </select>
          </label>
        )}
        {issue && (
          <p className="field-error" id={`${field}-error`}>
            {c[issue.code]}
          </p>
        )}
      </fieldset>
    );
  }
  return (
    <section
      id="calculator"
      className="calculator"
      aria-label={lang === "es" ? "Calculadora de sueño" : "Sleep calculator"}
    >
      <div
        className="mode-grid"
        role="group"
        aria-label={lang === "es" ? "Modo de cálculo" : "Calculation mode"}
      >
        {modes.map((item, index) => (
          <button
            key={item}
            type="button"
            aria-pressed={mode === item}
            onClick={() => {
              clear();
              setMode(item);
            }}
          >
            {c.modes[index]}
          </button>
        ))}
      </div>
      <form onSubmit={run} noValidate>
        <h2 className="calculator-question">
          {c.questions[modes.indexOf(mode)]}
        </h2>
        {mode === "window" && input("bedAt")}
        {(mode === "wake" || mode === "window") && input("wakeAt")}
        {mode === "nap" && input("napAt")}
        {mode === "sleepNow" && <p className="now-note">{c.now}</p>}
        <details className="settings">
          <summary>
            {c.settings}
            <span aria-hidden="true">+</span>
          </summary>
          <div className="settings-grid">
            <label htmlFor="latency">
              {c.latency}
              <input
                id="latency"
                type="number"
                min="0"
                max="60"
                step="1"
                value={latency}
                onChange={(e) => {
                  clear();
                  setLatency(e.target.value);
                }}
              />
            </label>
            <label htmlFor="cycle">
              {c.cycle}
              <input
                id="cycle"
                type="number"
                min="70"
                max="120"
                step="1"
                value={cycle}
                onChange={(e) => {
                  clear();
                  setCycle(e.target.value);
                }}
              />
            </label>
            <label htmlFor="time-format">
              {c.format}
              <select
                id="time-format"
                value={format}
                onChange={(e) => {
                  clear();
                  setFormat(e.target.value as "24h" | "12h");
                }}
              >
                <option value="24h">24 h</option>
                <option value="12h">12 h</option>
              </select>
            </label>
          </div>
        </details>
        {outcome?.issues.some((i) => i.field === "settings") && (
          <p className="field-error" role="alert">
            {c.settingError}
          </p>
        )}
        <button type="submit" className="calculate-button">
          {c.calculate}
          <span aria-hidden="true">↗</span>
        </button>
      </form>
      <p className="calculation-note">{c.note}</p>
      <p className="timezone">
        {c.zone} {zone || "—"}
      </p>
      <p role="status" className="status-message">
        {status}
      </p>
      {outcome && outcome.results.length > 0 && (
        <section className="results" aria-labelledby="results-heading">
          <div className="results-heading">
            <h2 id="results-heading">{c.results}</h2>
            <p>
              {c.calculated}{" "}
              <time dateTime={outcome.calculatedAt}>
                {time(outcome.calculatedAt)} · {date(outcome.calculatedAt)}
              </time>
            </p>
          </div>
          {stale && (
            <div className="stale-note">
              <p>{c.refreshed}</p>
              <button onClick={() => run()}>{c.update}</button>
            </div>
          )}
          <ol className="results-list">
            {outcome.results.map((option, index) => (
              <li className="result" key={option.id}>
                <span className="result-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="result-body">
                  <p className="eyebrow">
                    {option.kind === "bedtime" ? c.bed : c.wake}
                  </p>
                  <time className="result-time" dateTime={option.target}>
                    {time(option.target)}
                  </time>
                  <p className="result-date">{date(option.target)}</p>
                  <p className="result-duration">
                    {!(mode === "nap" && option.inBedMinutes === 20) && (
                      <>
                        {duration(option.sleepMinutes)} {c.sleep}
                        <span> · </span>
                      </>
                    )}
                    {duration(option.inBedMinutes)} {c.inBed}
                  </p>
                  <p className="result-interval">
                    {time(option.bedtime)} → {time(option.wakeTime)}
                  </p>
                  {mode === "nap" ? (
                    <p className="result-tag">
                      {option.inBedMinutes === 20 ? c.napShort : c.napLong}
                    </p>
                  ) : option.sleepMinutes < 420 ? (
                    <p className="short-sleep">{c.short}</p>
                  ) : null}
                  <button
                    className="text-button"
                    type="button"
                    onClick={() => calendar(option)}
                  >
                    {c.calendar}
                    <span aria-hidden="true"> ↓</span>
                  </button>
                </div>
              </li>
            ))}
          </ol>
          <p className="reminder-note">{c.reminder}</p>
          <div className="share-actions">
            <button type="button" onClick={() => void share()}>
              {c.share}
            </button>
            <button type="button" onClick={() => void copyLink(link())}>
              {c.copy}
            </button>
          </div>
          {manualLink && (
            <label htmlFor="manual-link">
              {c.manual}
              <input
                id="manual-link"
                value={manualLink}
                readOnly
                onFocus={(e) => e.target.select()}
              />
            </label>
          )}
          <AdSlot placement="result" eligible locale={lang} />
        </section>
      )}
    </section>
  );
}
