export interface TcfData {
  cmpStatus?: string;
  eventStatus?: string;
  purpose?: {
    consents?: Partial<Record<string, boolean>>;
    legitimateInterests?: Partial<Record<string, boolean>>;
  };
  vendor?: {
    consents?: Partial<Record<string, boolean>>;
    legitimateInterests?: Partial<Record<string, boolean>>;
  };
  publisher?: {
    restrictions?: Partial<Record<string, Partial<Record<string, number>>>>;
  };
  listenerId?: number;
}
export function permitsNonPersonalizedAds(
  data: TcfData,
  success: boolean,
): boolean {
  if (
    !data || !success || data.cmpStatus !== "loaded" ||
    !["tcloaded", "useractioncomplete"].includes(data.eventStatus ?? "") ||
    data.purpose?.consents?.["1"] !== true ||
    data.vendor?.consents?.["755"] !== true
  ) return false;

  // Google always requires consent for purpose 1; restrictions cannot expand it.
  const deviceRestriction = data.publisher?.restrictions?.["1"]?.["755"];
  if (deviceRestriction !== undefined && deviceRestriction !== 1) return false;

  // Google defaults these flexible purposes to LI. Only a publisher restriction
  // requiring consent switches the legal basis; both purpose and vendor must agree.
  // https://support.google.com/adsense/answer/9804260?hl=en
  return ["2", "7", "9", "10"].every((id) => {
    const restriction = data.publisher?.restrictions?.[id]?.["755"];
    if (restriction === 1) return data.purpose?.consents?.[id] === true;
    if (restriction !== undefined && restriction !== 2) return false;
    return data.purpose?.legitimateInterests?.[id] === true &&
      data.vendor?.legitimateInterests?.["755"] === true;
  });
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
