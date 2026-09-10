/** Public identifiers only. Ads stay off until approval and complete configuration. */
const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID ?? "";
const result = process.env.NEXT_PUBLIC_ADSENSE_RESULT_SLOT ?? "";
const article = process.env.NEXT_PUBLIC_ADSENSE_ARTICLE_SLOT ?? "";
const cmpSrc = process.env.NEXT_PUBLIC_GOOGLE_CMP_SRC ?? "";
function validCmp(): boolean {
  try {
    const u = new URL(cmpSrc);
    return (
      u.protocol === "https:" &&
      u.hostname === "fundingchoicesmessages.google.com" &&
      u.pathname === "/i/" + publisherId.replace("ca-", "")
    );
  } catch {
    return false;
  }
}
export const monetization = {
  publisherId,
  cmpSrc,
  slots: { result, article },
  enabled:
    process.env.NEXT_PUBLIC_ADS_APPROVED === "true" &&
    /^ca-pub-\d{16}$/.test(publisherId) &&
    /^\d+$/.test(result) &&
    /^\d+$/.test(article) &&
    validCmp(),
};
export const isPublicProduction = (host: string) =>
  process.env.NEXT_PUBLIC_VERCEL_ENV !== "preview" &&
  host === "sleeplike.maat.work";
