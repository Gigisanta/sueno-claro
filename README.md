# sleeplike

Privacy-first sleep cycle calculator. Web/PWA. iOS later via RevenueCat.

**Production:** https://sleeplike.maat.work  
**GitHub:** https://github.com/Gigisanta/sueno-claro

No account, no microphone, no tracking, no backend in v1.

## What it does

Calculates practical sleep windows locally in the browser:

- **Wake up** → suggested bedtimes
- **Sleep now** → suggested wake-up times
- **Nap** → short and full-cycle nap options
- **Fixed window** → estimated cycles inside constrained time

## Stack

- Next.js 16 App Router (static export)
- TypeScript
- Pure sleep calculation module (framework-independent, unit-tested)
- Vitest + Playwright
- Hosted on Vercel

## Current state (2026-06-30)

- iOS-native dark design (SF Pro, frosted glass, gold accent)
- Segmented control mode selector
- Contextual affiliate products per mode
- Post-result ad slot (Carbon Ads ready)
- Ko-fi donate link
- Bilingual EN/ES
- 13 static routes including SEO pages
- Production smoke tests pass Chromium + WebKit

## Development

```bash
npm install
npm run lint
npm run test
npm run build
node scripts/prod_smoke.mjs       # against production
node scripts/prod_smoke.mjs http://localhost:3000  # against local
```

## Monetization

All revenue hooks in `lib/monetization/config.ts`. Toggle on/off without code changes:

- `adNetwork`: 'carbon' | 'ethicalads' | null
- `amazonTag`: your Amazon Associates tag
- `showAffiliateLinks`: contextual product links per calculator mode
- `showEmailCapture`: ConvertKit-ready newsletter signup
- `kofiUsername`: Ko-fi donation link

## Documentation

See `docs/` directory. Key files:

- `00-source-map.md` — research sources
- `02-prd.md` — product requirements
- `03-architecture.md` — system architecture
- `10-implementation-plan.md` — build plan
- `12-backlog.md` — remaining work
