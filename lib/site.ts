export const SITE_URL = "https://sleeplike.maat.work";
export const isPreview = process.env.VERCEL_ENV === "preview";
export type Locale = "en" | "es";
export const homePath = (locale: Locale) =>
  locale === "es" ? "/calculadora-de-sueno" : "/";
