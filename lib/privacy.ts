export interface TcfData {
  cmpStatus?: string;
  eventStatus?: string;
  purpose?: {
    consents?: Record<string, boolean>;
    legitimateInterests?: Record<string, boolean>;
  };
  vendor?: { consents?: Record<string, boolean> };
  listenerId?: number;
}
export function permitsNonPersonalizedAds(
  data: TcfData,
  success: boolean,
): boolean {
  return (
    !!data &&
    success &&
    data.cmpStatus === "loaded" &&
    ["tcloaded", "useractioncomplete"].includes(data.eventStatus ?? "") &&
    data.purpose?.consents?.["1"] === true &&
    data.vendor?.consents?.["755"] === true &&
    ["2", "7", "9", "10"].every(
      (id) =>
        data.purpose?.consents?.[id] === true ||
        data.purpose?.legitimateInterests?.[id] === true,
    )
  );
}
export function publicPageUrl(value: string): string {
  const url = new URL(value, "https://sleeplike.maat.work");
  url.search = "";
  url.hash = "";
  return url.toString();
}
export const CALCULATOR_KEYS = [
  "mode",
  "wake",
  "bed",
  "nap",
  "latency",
  "cycle",
  "format",
  "date",
  "bedDate",
  "wakeDate",
  "napDate",
  "wakeOccurrence",
  "bedOccurrence",
  "napOccurrence",
];
export function readSharedSettings(value: string): URLSearchParams {
  const url = new URL(value);
  const source = url.hash.startsWith("#sleep=")
    ? new URLSearchParams(url.hash.slice(7))
    : url.searchParams;
  const result = new URLSearchParams();
  for (const key of CALCULATOR_KEYS) {
    const item = source.get(key);
    if (item !== null) result.set(key, item);
  }
  return result;
}
