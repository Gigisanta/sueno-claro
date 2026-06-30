# Sueño Claro / REMinder

Privacy-first sleep cycle calculator: web/PWA first, iOS premium later via RevenueCat.

## One-line thesis

Build the cleanest, fastest, most private sleep timing calculator on the internet: no account, no microphone, no wearable, no medical claims; monetized with gentle ads on web and optional premium in-app purchase/subscription.

## Product wedge

Existing sleep calculators prove search intent, but many are visually dated, affiliate-heavy, generic, or not app-first. Full sleep trackers like Sleep Cycle are powerful but heavier, permission-heavy, and positioned around tracking. Sueño Claro wins by being the opposite: instant, beautiful, private, and useful before asking for anything.

## Current repo state

This repository is documentation-first. It is configured for autonomous Hermes execution from research → implementation → verification.

Start here:

1. `docs/00-source-map.md` — verified sources and citations.
2. `docs/02-prd.md` — product requirements.
3. `docs/03-architecture.md` — technical architecture.
4. `docs/10-implementation-plan.md` — phased build plan.
5. `docs/11-autonomous-hermes-runbook.md` — how Hermes should execute end-to-end.
6. `docs/12-backlog.md` — implementation backlog with acceptance criteria.

## MVP scope

- Web/PWA sleep cycle calculator.
- Modes: wake at time, sleep now, nap, fixed sleep window.
- Bilingual EN/ES SEO pages.
- Local-only settings.
- Gentle ad slots after results only.
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

## Suggested implementation stack

Web v1: Next.js App Router static/PWA, TypeScript, CSS modules or Tailwind if already chosen by the implementing agent, pure deterministic sleep calculation library, static content routes, Playwright/Lighthouse checks.

iOS v2: SwiftUI, RevenueCat Purchases SDK via SPM, WidgetKit, UserNotifications, local storage, optional App Groups for widget settings.

## Build principle

PONYTAIL: simplest production-grade artifact. Free/local/native before paid/server-heavy. Delete complexity before adding features.
