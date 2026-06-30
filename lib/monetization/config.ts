/**
 * Monetization configuration for sleeplike.
 *
 * All revenue hooks in one place. Toggle on/off, swap ad networks,
 * or change affiliate tags without touching component code.
 */

export interface MonetizationConfig {
  /** Ad network — set to 'carbon', 'ethicalads', or null to disable */
  adNetwork: 'carbon' | 'ethicalads' | null;
  /** Carbon Ads serve ID (from your Carbon Ads dashboard) */
  carbonServe: string;
  /** Carbon Ads placement ID (your domain/subdomain) */
  carbonPlacement: string;
  /** EthicalAds publisher ID */
  ethicalAdsId: string;
  /** Amazon Associates tracking tag */
  amazonTag: string;
  /** Ko-fi username for donation link */
  kofiUsername: string;
  /** Show contextual affiliate product links after results */
  showAffiliateLinks: boolean;
}

export const monetization: MonetizationConfig = {
  adNetwork: null,           // ← Set to 'carbon' or 'ethicalads' when you register
  carbonServe: 'CESIVK5Y',   // ← Replace with your Carbon Ads serve ID
  carbonPlacement: 'sleeplikemaatwork', // ← Replace with your placement
  ethicalAdsId: '',          // ← Set when you register
  amazonTag: 'sleeplike-20', // ← Replace with your Amazon tag
  kofiUsername: 'sleeplike', // ← Replace with your Ko-fi username
  showAffiliateLinks: true,  // ← Toggle contextual product links
};

/**
 * Returns the Amazon affiliate URL for a given product ASIN.
 */
export function amazonUrl(asins: string): string {
  return `https://www.amazon.com/dp/${asins}?tag=${monetization.amazonTag}`;
}

/**
 * Returns the Ko-fi donate URL.
 */
export function kofiUrl(): string {
  return `https://ko-fi.com/${monetization.kofiUsername}`;
}

/**
 * Returns the Carbon Ads script URL.
 */
export function carbonAdsUrl(): string | null {
  if (!monetization.adNetwork || monetization.adNetwork !== 'carbon') return null;
  return `//cdn.carbonads.com/carbon.js?serve=${monetization.carbonServe}&placement=${monetization.carbonPlacement}`;
}

/**
 * Sleep-related products for contextual affiliate links.
 * Shown after the user gets their sleep results.
 */
export const sleepProducts = {
  en: [
    { asin: 'B0BXXX', label: 'Weighted blanket for better sleep', emoji: '🛏' },
    { asin: 'B0CYYY', label: 'White noise machine', emoji: '🔊' },
    { asin: 'B0AZZZ', label: 'Smart alarm clock with sunrise', emoji: '⏰' },
  ],
  es: [
    { asin: 'B0BXXX', label: 'Manta con peso para dormir mejor', emoji: '🛏' },
    { asin: 'B0CYYY', label: 'Máquina de ruido blanco', emoji: '🔊' },
    { asin: 'B0AZZZ', label: 'Despertador inteligente con amanecer', emoji: '⏰' },
  ],
};
