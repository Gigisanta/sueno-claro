/** Public identifiers only. Ads stay off until approval and complete configuration. */
const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID ?? "";
const result = process.env.NEXT_PUBLIC_ADSENSE_RESULT_SLOT ?? "";
const article = process.env.NEXT_PUBLIC_ADSENSE_ARTICLE_SLOT ?? "";
const adsenseSrc = publisherId
  ? `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(publisherId)}`
  : "";
export const monetization = {
  publisherId,
  adsenseSrc,
  slots: { result, article },
  enabled:
    process.env.NEXT_PUBLIC_ADS_APPROVED === "true" &&
    /^ca-pub-\d{16}$/.test(publisherId) &&
    /^\d+$/.test(result) &&
    /^\d+$/.test(article),
};
export const isPublicProduction = (host: string) =>
  process.env.NEXT_PUBLIC_VERCEL_ENV !== "preview" &&
  host === "sleeplike.maat.work";
