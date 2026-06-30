# Launch follow-up audit — delegated findings integration

Date: 2026-06-30
Production URL: https://sueno-claro.vercel.app

## Integrated findings

Late delegated reports were compared against the deployed MVP. The useful deltas were integrated as production changes rather than left as notes.

### UX / sharing

- Added shareable calculator URLs with mode, time, latency, cycle length, format, and selected result.
- Opening a share URL auto-renders the result state without showing pre-result ads.
- Kept result list vertical and mobile-first; no hard paywall added.

### SEO / acquisition

- Added WebApplication + FAQPage JSON-LD.
- Added OpenGraph/Twitter preview image asset.
- Added Spanish `/siesta` route and linked it from Spanish navigation.
- Kept bilingual SEO routes static and backend-free.

### Vercel / static constraints

- Static export remains intact.
- No serverless function, database, tracker, account, microphone permission, or paid API was added.

### Monetization / paywall

- Rejected hard paywall for v1 web. Core calculator remains free.
- Sponsored placement remains after the result only.
- RevenueCat remains deferred to iOS/native premium phase.

## Verification gates

Commands run after integration:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npm run e2e`
- `make validate-docs`
- `node scripts/prod_smoke.mjs https://sueno-claro.vercel.app` after deploy

## Remaining external blocker

Real distribution through Gio-owned social accounts still requires account access or manual posting. Zero-cost SEO and GitHub/Vercel surfaces are handled from this repo.
