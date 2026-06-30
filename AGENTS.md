# AGENTS.md — sleeplike autonomous execution contract

## Mission

Maintain and evolve sleeplike: a privacy-first sleep cycle calculator, web/PWA first, iOS premium later via RevenueCat.

## Mandatory reading order

1. `README.md`
2. `docs/00-source-map.md`
3. `docs/02-prd.md`
4. `docs/03-architecture.md`
5. `docs/10-implementation-plan.md`
6. `docs/11-autonomous-hermes-runbook.md`
7. `docs/12-backlog.md`

## Current state (2026-06-30)

- **Domain:** https://sleeplike.maat.work
- **App name:** sleeplike (was "Sueño Claro")
- **Design:** iOS-native dark with gold accent (#f5c842)
- **Monetization:** Ad slot, Amazon affiliates, Ko-fi donate — all configurable via `lib/monetization/config.ts`
- **Zero backend:** pure static Next.js export on Vercel

## Execution rules

- Keep v1 zero-backend.
- Core calculator must be deterministic, unit-tested, and framework-independent.
- Do not add AI, accounts, trackers, databases, or microphone permissions in v1.
- Do not block the core calculator behind a paywall.
- Ads are allowed only after the result or in clearly separated content areas.
- All health copy must be wellness/educational and include a non-medical disclaimer.
- Monetization toggles live in `lib/monetization/config.ts` — do not hardcode revenue hooks in components.

## Verification gates before claiming done

- Typecheck passes.
- Unit tests for sleep calculation pass.
- Build/export passes.
- Production smoke test passes (Chromium + WebKit).
- No ad appears before a user gets a result.
- No network call is required for the core calculator.
- Git status is clean after commit.

## Communication

Report concrete files changed and real command output. Do not say "done" without verification evidence.
