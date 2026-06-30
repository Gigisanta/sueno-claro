# Source map

Date: 2026-06-30

> **Note:** App was renamed from "Sueño Claro" to "sleeplike" mid-2026.
> Domain changed from `sueno-claro.vercel.app` to `sleeplike.maat.work`.
> Research below remains applicable.

## Verified primary sources

### Subscription app market / RevenueCat

- RevenueCat State of Subscription Apps 2026: https://www.revenuecat.com/state-of-subscription-apps/
  - Dataset: over 115,000 apps, over $16B revenue, more than 1B transactions.
  - New subscription app launches: ~2,000/month in Jan 2022 to 14,700+/month by Jan 2026.
  - Health & Fitness D14 RPI: $0.48 median; D60 RPI: $0.66 median.
  - Hard paywall D14 RPI: $2.32 median vs low-priced freemium $0.27; D60 hard paywall $3.09 vs freemium $0.38.
  - Health & Fitness Y1 RLTV per payer: $35.64 median; Business $35.48; Productivity $24.95.
- RevenueCat iOS installation: https://www.revenuecat.com/docs/getting-started/installation/ios
  - iOS SDK via Swift Package Manager; use `purchases-ios-spm`, RevenueCat and RevenueCatUI packages.
  - Paywalls require supported SDK versions and iOS 15+.
- RevenueCat entitlements: https://www.revenuecat.com/docs/getting-started/entitlements
- RevenueCat paywalls: https://www.revenuecat.com/docs/tools/paywalls
- RevenueCat Web Purchase Links: https://www.revenuecat.com/docs/web/web-purchase-links

### Mobile/app market

- Sensor Tower State of Mobile 2025: https://sensortower.com/blog/2025-state-of-mobile-consumers-usd150-billion-spent-on-mobile-highlights
  - 2024 global IAP/subscription/paid app/game spend reached $150B, +13% YoY.
  - Downloads roughly flat at 136B; monetization and retention matter more than raw downloads.
- Sensor Tower Health & Fitness 2025: https://sensortower.com/blog/state-of-mobile-health-and-fitness-in-2025
  - Health & Fitness achieved record downloads and IAP revenue in 2024.
  - January 2025 IAP revenue reached an all-time high at $385M.

### Sleep demand and science

- CDC/NCHS short sleep duration 2024: https://www.cdc.gov/nchs/products/databriefs/db559.htm
  - 30.5% of U.S. adults slept less than 7 hours on average.
  - 15.4% had trouble falling asleep; 18.1% had trouble staying asleep.
- CDC Sleep basics: https://www.cdc.gov/sleep/about/index.html
- Sleep Foundation sleep duration: https://www.sleepfoundation.org/how-sleep-works/how-much-sleep-do-we-really-need
- Sleep Foundation stages of sleep: https://www.sleepfoundation.org/how-sleep-works/stages-of-sleep
- Sleep Foundation napping: https://www.sleepfoundation.org/sleep-hygiene/napping
- UK Biobank / Sleep regularity study: https://www.ukbiobank.ac.uk/publications/sleep-regularity-is-a-stronger-predictor-of-mortality-risk-than-sleep-duration-a-prospective-cohort-study/
  - Sleep regularity was a stronger predictor of mortality risk than sleep duration in the study cohort.

### Competitors inspected

- sleepcalculator.com: https://sleepcalculator.com/
- Sleep Foundation calculator: https://www.sleepfoundation.org/sleep-calculator
- Calculator.net sleep calculator: https://www.calculator.net/sleep-calculator.html
- Sleepopolis/Sleepytime: https://sleepopolis.com/calculators/sleep/
- Sleep Cycle: https://sleepcycle.com/ and https://apps.apple.com/us/app/sleep-cycle-tracker-sounds/id320606217
- Sleep Time: https://apps.apple.com/us/app/sleep-time-cycle-alarm-clock/id555564825

### Web/PWA/SEO technical sources

- Google Search SEO starter guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google structured data introduction: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- web.dev PWA learning path: https://web.dev/learn/pwa/
- web.dev install criteria: https://web.dev/articles/install-criteria
- Next.js PWA guide: https://nextjs.org/docs/app/guides/progressive-web-apps
- Next.js sitemap convention: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
- Next.js robots convention: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
- Next.js metadata generation: https://nextjs.org/docs/app/api-reference/functions/generate-metadata

## Tooling gap

Context7 quota was exhausted during setup. Official web docs were used instead. Future implementation agents should retry Context7 for exact package/version docs when coding begins.

## Delegated-research secondary sources to verify before production use

These sources were surfaced by async research agents. Use them for lead generation and competitive context, not as final authority until rechecked in-browser during implementation.
