# Backlog

## P0 — Planning and repo foundation

- [x] Create documentation scaffold.
- [x] Create PRD/architecture/runbook/backlog.
- [x] Create ADRs.

## P1 — Core web calculator

### B-001: Initialize web app

Acceptance:

- Next.js TypeScript project exists.
- `npm run build` passes.
- `npm run test` or chosen test command exists.

### B-002: Pure sleep calculation library

Acceptance:

- Supports wake-at, sleep-now, nap, fixed-window.
- Unit tests cover midnight rollover, custom latency, custom cycle length.
- No DOM/framework dependency.

### B-003: Mobile-first calculator UI

Acceptance:

- User can complete all modes.
- Results show cycles, time in bed, assumptions.
- Accessible labels and keyboard flow.

### B-004: Bilingual copy and disclaimers

Acceptance:

- EN/ES product copy exists.
- Disclaimer visible near educational explanation.
- No medical claims.

## P2 — SEO/PWA

### B-005: Route and metadata system

Acceptance:

- EN/ES SEO routes exist.
- Unique title/description/canonical.
- Sitemap/robots generated.

### B-006: PWA manifest

Acceptance:

- Manifest valid.
- App installable in supported browsers.
- Offline fallback considered; calculator works after first load if feasible.

### B-007: Structured data

Acceptance:

- WebApplication schema on app pages.
- FAQPage schema only where visible FAQ exists.
- Validated with structured data tooling.

## P3 — Monetization web

### B-008: Ad abstraction

Acceptance:

- `AdSlot` renders only after result or in content footer.
- Easy to disable.
- Does not block first paint.

### B-009: Analytics events

Acceptance:

- Event interface exists.
- Does not send exact times by default.
- Calculator works if analytics fails.

## P4 — iOS/RevenueCat

### B-010: SwiftUI app shell

Acceptance:

- Main calculator works with local calculation.
- No account/backend.

### B-011: RevenueCat entitlement

Acceptance:

- SDK configured.
- `premium` entitlement unlocks remove ads/custom settings/widgets.
- Sandbox purchase and restore verified.

### B-012: Notifications and widgets

Acceptance:

- Local bedtime reminder scheduling works.
- Widget shows next recommended bedtime/wake time.

## P5 — Launch

### B-013: QA and visual audit

Acceptance:

- Lighthouse/browser checks pass.
- Screenshots captured.
- Accessibility blockers fixed.

### B-014: App Store/web launch assets

Acceptance:

- Privacy policy.
- App Store copy.
- Screenshots.
- Support URL.
