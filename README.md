# sleeplike

> **September 2026 rework:** the current implementation and release gates are documented in [docs/13-launch-2026-09.md](docs/13-launch-2026-09.md). Earlier roadmap sections below are historical.

Sleep planning calculator for adults. Seven-language static web app/PWA.

Open source under the [MIT License](LICENSE). The calculator, interface and
content pipeline can be inspected, run and adapted without sending sleep data
to an application backend.

**Production:** https://sleeplike.maat.work  
**GitHub:** https://github.com/Gigisanta/sueno-claro

No account, microphone or application backend. Calculations stay in the browser. Aggregate analytics are optional; advertising remains disabled pending approval and consent validation. See [organic discovery and automated SEO checks](docs/15-organic-discovery.md).

## Languages

All 12 page topics are available in English, Spanish, Brazilian Portuguese,
French, German, Italian and Indonesian (84 canonical pages). Existing
English/Spanish URLs are unchanged; prefixed language roots are `/pt-br`, `/fr`,
`/de`, `/it` and `/id`. Each page has a native HTML language switcher linking to
the same topic in all seven languages. HTML and sitemap publish reciprocal
alternates and English `x-default`; the five prefixed locales default to 24-hour time.

Routing lives in `lib/i18n.ts`, complete editorial catalogs in `lib/content/`,
and interface dictionaries in `lib/locales/`. Only current-language copy is
passed to interactive components. The build validates actual exported metadata
and all language alternates; browser tests exercise calculation in each locale.
Advertising approval stays **false**; adding languages does not authorize ads
or change consent behavior. No indexing, traffic or medical benefit is promised.

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
npm ci
PLAYWRIGHT_SKIP_BROWSER_GC=1 npx playwright install chromium webkit
NEXT_PUBLIC_ADS_APPROVED=false make verify
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
