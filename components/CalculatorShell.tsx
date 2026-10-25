"use client";

import { useEffect, useLayoutEffect, useMemo, useState, type FormEvent } from "react";
import { ArrowRightIcon, CalendarIcon } from "@radix-ui/react-icons";
import { track } from "@vercel/analytics";
import { calculate, nextLocalTime, safeSettings } from "../lib/sleep/calculate";
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
import { NightPicture } from "./NightPicture";

import type { Locale } from "../lib/i18n";
import type { LocaleCopy } from "../lib/locales/en";
type Field = "wakeAt" | "bedAt" | "napAt";
const modes: CalculatorMode[] = ["wake", "sleepNow", "nap", "window"];
const localDate = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const localTime = (d: Date) =>
  `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
const empty: LocalTime = { date: "", time: "" };

export function CalculatorShell({
  lang,
  copy: c,
  taste: t,
  reminders,
  advertisement,
  initialMode = "wake",
}: {
  lang: Locale;
  copy: LocaleCopy["calculator"];
  taste: LocaleCopy["taste"];
  reminders: LocaleCopy["reminders"];
  advertisement: string;
  initialMode?: CalculatorMode;
}) {
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
  // Dates exist only after the client effect below; the sentence waits for it.
  const [ready, setReady] = useState(false);
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
    const sharedMode = params.get("mode");
    const restoredMode = modes.includes(sharedMode as CalculatorMode) ? sharedMode : initialMode;
    // Clock-only wake links choose a valid future occurrence using the core's
    // local-time parser. Explicit dates and other planning modes stay strict.
    if (restoredMode === "wake" && !params.has("wakeDate") && !params.has("date") && params.has("wake")) {
      const nextWake = nextLocalTime(defaults.wakeAt.time, now, defaults.wakeAt.occurrence);
      if (nextWake) defaults.wakeAt = nextWake;
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
    setReady(true);
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
      new Blob([createCalendar(option, reminders, outcome.calculatedAt)], {
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
  // Every input change clears `outcome`, so a present outcome always matches the
  // inputs and carries the clock of the latest Calculate / Update to now.
  const estimate = useMemo(() => {
    if (!ready) return null;
    return calculate({
      mode,
      now: new Date(),
      ...fields,
      settings: {
        sleepLatencyMinutes: latency.trim() ? Number(latency) : NaN,
        cycleLengthMinutes: cycle.trim() ? Number(cycle) : NaN,
        timeFormat: format,
      },
    });
  }, [ready, mode, fields, latency, cycle, format]);
  const sentenceSource = outcome?.results.length ? outcome : estimate;
  const sentenceOption = sentenceSource?.results.find(
    (option) => option.sleepMinutes === Number(cycle) * 5,
  ) ?? sentenceSource?.results[0];
  function timeInput(field: Field) {
    const issue = outcome?.issues.find((item) => item.field === field);
    return (
      <input
        id={`${field}-time`}
        type="time"
        required
        value={fields[field].time}
        onChange={(e) => change(field, "time", e.target.value)}
        aria-label={`${c[field]} · ${c.time}`}
        aria-invalid={!!issue}
        aria-describedby={issue ? `${field}-error` : undefined}
      />
    );
  }
  useEffect(() => {
    if (!outcome?.results.length || !window.matchMedia("(max-width: 1023px)").matches) return;
    document.getElementById("results-heading")?.scrollIntoView({
      block: "start",
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }, [outcome]);
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
      className={`calculator ${outcome?.results.length ? "has-results" : "awaiting-results"}`}
      aria-label={c.label}
    >
      <div className="mode-grid" role="group" aria-label={c.mode}>
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
        <div className={`sleep-sentence sentence-${mode}`}>
          <div className="sentence-start">
            {mode === "sleepNow" ? (
              <span>{t.sleepNow}</span>
            ) : (
              <>
                <label htmlFor={`${mode === "nap" ? "napAt" : mode === "window" ? "bedAt" : "wakeAt"}-time`}>
                  {mode === "nap" ? t.napAt : mode === "window" ? t.windowFrom : t.wakeAt}
                </label>
                {timeInput(mode === "nap" ? "napAt" : mode === "window" ? "bedAt" : "wakeAt")}
              </>
            )}
          </div>
          <div className="sentence-finish">
            <NightPicture alt={t.nightAlt} inline />
            <span className="sentence-arrow" aria-hidden="true">→</span>
            {mode === "window" ? (
              <label className="sentence-end" htmlFor="wakeAt-time">
                {t.windowTo} {timeInput("wakeAt")}
              </label>
            ) : (
              <span className="sentence-end" aria-live="polite" aria-atomic="true">
                {mode === "wake" ? t.inBedBy : mode === "nap" ? t.napUntil : t.wakeAround}{" "}
                {sentenceOption ? (
                  <time dateTime={sentenceOption.target}>
                    {new Intl.DateTimeFormat(lang, { hour: "2-digit", minute: "2-digit", hour12: format === "12h" }).formatToParts(new Date(sentenceOption.target)).map((part, index) =>
                      part.type === "dayPeriod" ? <small key={index}>{part.value}</small> : <span key={index}>{part.value}</span>
                    )}
                  </time>
                ) : <span>—</span>}
              </span>
            )}
          </div>
        </div>
        <p className="sentence-caption">
          {t.estimate}
          {sentenceOption && (
            <>
              {!(mode === "nap" && sentenceOption.inBedMinutes === 20) && ` · ${duration(sentenceOption.sleepMinutes)} ${c.sleep}`}
              {` · ${duration(sentenceOption.inBedMinutes)} ${c.inBed}`}
            </>
          )}
        </p>
        <div className="calculator-controls">
          <div className="planning-dates">
            <h2 className="calculator-question">{c.questions[modes.indexOf(mode)]}</h2>
            <div className="planning-date-fields">
              {mode === "window" && input("bedAt")}
              {(mode === "wake" || mode === "window") && input("wakeAt")}
              {mode === "nap" && input("napAt")}
              {mode === "sleepNow" && <p className="now-note">{c.now}</p>}
            </div>
          </div>
          <div className="planning-actions">
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
          <ArrowRightIcon aria-hidden="true" />
        </button>
          </div>
        </div>
      </form>
      <p className="calculation-note">{c.note}</p>
      <p className="timezone">{c.zone} {zone}</p>
      <p role="status" className="status-message">{status}</p>
      {(!outcome || outcome.results.length === 0) && (
        <aside className="results-preview" aria-label={c.how}>
          <h2>{c.previewHeading}</h2>
          <p>{c.previewIntro}</p>
          <dl className="estimate-summary">
            <div><dt>{c.previewLatency}</dt><dd>{latency || "0"}<span> min</span></dd></div>
            <div><dt>{c.previewCycle}</dt><dd>{cycle || "0"}<span> min</span></dd></div>
          </dl>
          <p className="preview-footnote">{c.previewNote}</p>
        </aside>
      )}
      {outcome && outcome.results.length > 0 && (
        <section className="results" aria-labelledby="results-heading">
          <div className="results-heading">
            <div className="results-title-row"><h2 id="results-heading">{c.results}</h2><a className="edit-calculation" href="#calculator">{c.edit}</a></div>
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
            {outcome.results.map((option) => (
              <li className={`result ${mode !== "nap" && option.sleepMinutes < 420 ? "result-short" : ""}`} key={option.id}>
                <div className="result-body">
                  <p className="result-label">
                    {option.kind === "bedtime" ? c.bed : c.wake}
                  </p>
                  <time className="result-time" dateTime={option.target}>
                    {new Intl.DateTimeFormat(lang, { hour: "2-digit", minute: "2-digit", hour12: format === "12h" }).formatToParts(new Date(option.target)).map((part, i) =>
                      part.type === "dayPeriod" ? <small key={i}>{part.value}</small> : <span key={i}>{part.value}</span>
                    )}
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
                    <CalendarIcon aria-hidden="true" />
                    {c.calendar}
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
          <AdSlot placement="result" eligible label={advertisement} />
        </section>
      )}
    </section>
  );
}
