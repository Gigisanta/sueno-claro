# Sueño Claro / REMinder

Privacy-first sleep cycle calculator: web/PWA first, iOS premium later via RevenueCat.

- Production: https://sueno-claro.vercel.app
- GitHub: https://github.com/Gigisanta/sueno-claro
- Core promise: no account, no microphone, no tracking, no backend in v1.

## What is live

Sueño Claro is a static Next.js 16 PWA that calculates practical sleep windows locally in the browser.

Modes:

- Wake-up target → suggested bedtimes.
- Sleep now → suggested wake-up times.
- Nap → short and full-cycle nap options.
- Fixed window → estimated cycles inside a constrained sleep window.

SEO routes:

- `/sleep-calculator`
- `/bedtime-calculator`
- `/nap-calculator`
- `/calculadora-de-sueno`
- `/ciclos-de-sueno`
- `/siesta`

## Product wedge

Existing sleep calculators prove search intent, but many are visually dated, affiliate-heavy, generic, or not app-first. Full sleep trackers are heavier and permission-heavy. Sueño Claro wins by being instant, calm, private, bilingual, and useful before asking for anything.

## MVP scope

- Web/PWA sleep cycle calculator.
- Bilingual EN/ES SEO pages.
- Local-only deterministic calculation.
- Shareable result URLs.
- Gentle sponsored slot only after results.
- No backend in v1.
- Later iOS app: SwiftUI + RevenueCat + widgets + notifications + remove ads.

## Non-goals for v1

- Sleep tracking.
- Microphone/snore detection.
- Wearables.
- AI coach.
- Medical diagnosis/treatment claims.
- Account system.
- Backend.
- Aggressive paywall.

## Development

```bash
npm install
npm run lint
npm run test
npm run build
npm run e2e
```

Production smoke:

```bash
node scripts/prod_smoke.mjs https://sueno-claro.vercel.app
```

## Documentation

Start here:

1. `docs/00-source-map.md` — verified sources and citations.
2. `docs/02-prd.md` — product requirements.
3. `docs/03-architecture.md` — technical architecture.
4. `docs/10-implementation-plan.md` — phased build plan.
5. `docs/11-autonomous-hermes-runbook.md` — autonomous execution runbook.
6. `docs/12-backlog.md` — implementation backlog with acceptance criteria.
7. `docs/19-launch-assets.md` — launch copy and distribution checklist.

## Build principle

PONYTAIL: simplest production-grade artifact. Free/local/native before paid/server-heavy. Delete complexity before adding features.
