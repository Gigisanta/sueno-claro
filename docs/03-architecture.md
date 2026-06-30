# Architecture

## Architecture decision

Build web/PWA first with zero backend. Keep sleep calculation as a pure library that can later be ported or mirrored in Swift.

## System overview

```text
User browser
  ├─ Static Next.js/PWA pages
  ├─ Pure sleep calculator module
  ├─ Local settings in localStorage
  ├─ Optional ads after result
  └─ SEO content pages

Later iOS app
  ├─ SwiftUI screens
  ├─ Pure SleepCalculator Swift module
  ├─ UserNotifications for reminders
  ├─ WidgetKit for widgets
  ├─ RevenueCat Purchases SDK
  └─ Local settings / App Group storage
```

## Web stack recommendation

Preferred:

- Next.js App Router.
- Static rendering/export where possible.
- TypeScript.
- No backend API in v1.
- CSS modules or minimal Tailwind; choose one, not both.
- Playwright for smoke flows.
- Vitest for pure calculation tests.

Why Next.js despite a static utility: it has strong metadata, sitemap, robots, PWA docs, and future route expansion. If the implementing agent wants even less runtime, Astro is acceptable, but docs currently assume Next.js.

## Folder structure target

```text
sueno-claro/
  app/
    [locale]/
      page.tsx
      sleep-calculator/page.tsx
      sleep-cycle-calculator/page.tsx
      bedtime-calculator/page.tsx
      nap-calculator/page.tsx
      calculadora-de-sueno/page.tsx
      ciclos-de-sueno/page.tsx
    manifest.ts
    robots.ts
    sitemap.ts
  components/
    CalculatorShell.tsx
    TimeInput.tsx
    ResultCard.tsx
    AdSlot.tsx
    Disclaimer.tsx
  lib/
    sleep/
      calculate.ts
      format.ts
      types.ts
      calculate.test.ts
    seo/
      metadata.ts
      structured-data.ts
  content/
    en/*.md
    es/*.md
  tests/
    e2e/calculator.spec.ts
  docs/
  plans/
```

## Core calculation contract

Inputs:

```ts
type Mode = 'wake-at' | 'sleep-now' | 'nap' | 'fixed-window'

type SleepSettings = {
  cycleMinutes: number // default 90
  fallAsleepMinutes: number // default 15
  minCycles: number // default 3 or 4 depending mode
  maxCycles: number // default 6
  locale: 'en' | 'es'
  timeFormat: '12h' | '24h'
}
```

Outputs:

```ts
type SleepOption = {
  targetTime: string
  cycles: number
  minutesInBed: number
  quality: 'ideal' | 'good' | 'minimum' | 'nap'
  explanationKey: string
}
```

Rules:

- Never mutate Date objects in shared state.
- Always use local timezone for user-facing times.
- Explicitly test midnight rollover.
- Treat 90-minute cycle as an approximation, not a promise.
- Keep all calculations offline.

## iOS architecture later

- SwiftUI app target.
- SleepCore Swift package/module with same calculation tests.
- RevenueCat Purchases SDK via SPM using `purchases-ios-spm`.
- Entitlement: `premium`.
- Products:
  - `premium_monthly`
  - `premium_annual`
  - `premium_lifetime` if using non-consumable/lifetime offering.
- WidgetKit reads selected profile/result from App Group storage.
- UserNotifications schedules local bedtime reminders; no server push.
- No RevenueCat on watchOS; RevenueCat docs list watchOS unsupported for Paywalls, so keep purchases in iOS app.

## Data model

Local only:

```json
{
  "settings": {
    "cycleMinutes": 90,
    "fallAsleepMinutes": 15,
    "timeFormat": "auto"
  },
  "profiles": [
    {"id":"weekday","wakeTime":"07:30","days":[1,2,3,4,5]}
  ],
  "history": [
    {"mode":"wake-at","input":"07:30","createdAt":"2026-06-30T00:00:00Z"}
  ]
}
```

No PII required.

## Performance budget

- JS bundle for calculator route: keep minimal.
- No animation framework in v1.
- No large icon pack.
- Fonts: system stack or one self-hosted variable font.
- Calculator interaction must feel instant on low-end mobile.
