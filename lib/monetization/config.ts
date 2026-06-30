/**
 * Monetization configuration for sleeplike.
 *
 * All revenue hooks in one place. Toggle on/off, swap ad networks,
 * or change affiliate tags without touching component code.
 */

import type { CalculatorMode } from '../sleep/types';

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
  /** Show email capture form (ConvertKit / Mailchimp) */
  showEmailCapture: boolean;
  /** ConvertKit form ID (from your CK dashboard) */
  convertKitFormId: string;
}

export const monetization: MonetizationConfig = {
  adNetwork: null,
  carbonServe: 'CESIVK5Y',
  carbonPlacement: 'sleeplikemaatwork',
  ethicalAdsId: '',
  amazonTag: 'sleeplike-20',
  kofiUsername: 'sleeplike',
  showAffiliateLinks: true,
  showEmailCapture: false,
  convertKitFormId: '',
};

export function amazonUrl(asin: string): string {
  return `https://www.amazon.com/dp/${asin}?tag=${monetization.amazonTag}`;
}

export function kofiUrl(): string {
  return `https://ko-fi.com/${monetization.kofiUsername}`;
}

export function carbonAdsUrl(): string | null {
  if (!monetization.adNetwork || monetization.adNetwork !== 'carbon') return null;
  return `//cdn.carbonads.com/carbon.js?serve=${monetization.carbonServe}&placement=${monetization.carbonPlacement}`;
}

/* ─── Contextual products by mode ─── */

export interface AffiliateProduct {
  asin: string;
  label: string;
  labelEs: string;
  emoji: string;
}

const products: Record<CalculatorMode, AffiliateProduct[]> = {
  wake: [
    { asin: 'B0BXXX', label: 'Weighted blanket for deep sleep',       labelEs: 'Manta con peso para sueño profundo', emoji: '🛏' },
    { asin: 'B0CYYY', label: 'Blue light blocking glasses',           labelEs: 'Lentes bloqueadores de luz azul',     emoji: '👓' },
    { asin: 'B0AZZZ', label: 'Melatonin gummies for sleep aid',       labelEs: 'Gomitas de melatonina',               emoji: '💊' },
  ],
  sleepNow: [
    { asin: 'B0CYYY', label: 'White noise machine',                   labelEs: 'Máquina de ruido blanco',             emoji: '🔊' },
    { asin: 'B0AZZZ', label: 'Smart alarm clock with sunrise',        labelEs: 'Despertador con amanecer simulado',   emoji: '⏰' },
    { asin: 'B0BXXX', label: 'Blackout sleep mask',                   labelEs: 'Antifaz para dormir',                 emoji: '😴' },
  ],
  nap: [
    { asin: 'B0AZZZ', label: 'Travel sleep mask',                     labelEs: 'Antifaz de viaje',                    emoji: '😴' },
    { asin: 'B0BXXX', label: 'Neck pillow for power naps',            labelEs: 'Almohada de viaje para siestas',      emoji: '🛏' },
    { asin: 'B0CYYY', label: 'White noise machine (travel size)',     labelEs: 'Máquina de ruido blanco portátil',    emoji: '🔊' },
  ],
  window: [
    { asin: 'B0BXXX', label: 'Premium mattress topper',               labelEs: 'Cubrecolchón premium',                emoji: '🛏' },
    { asin: 'B0CYYY', label: 'Cooling gel pillow',                    labelEs: 'Almohada de gel refrigerante',        emoji: '🛌' },
    { asin: 'B0AZZZ', label: 'Sleep tracking smart ring',             labelEs: 'Anillo inteligente de sueño',         emoji: '💍' },
  ],
};

export function productsForMode(mode: CalculatorMode, lang: 'en' | 'es'): AffiliateProduct[] {
  return products[mode].map(p => ({
    ...p,
    label: lang === 'es' ? p.labelEs : p.label,
  }));
}
