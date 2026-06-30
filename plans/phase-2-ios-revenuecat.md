# Phase 2 — iOS + RevenueCat plan

## Goal

A SwiftUI iOS app that reuses the same product logic and unlocks premium convenience via RevenueCat.

## Steps

1. Create SwiftUI app target.
2. Port SleepCore calculation logic.
3. Add local settings and profiles.
4. Add UserNotifications for bedtime reminders.
5. Add WidgetKit for next bedtime/wake time.
6. Install RevenueCat via SPM.
7. Configure `premium` entitlement and offerings.
8. Add paywall, purchase, restore.
9. Sandbox test purchase/restore.

## Blockers requiring user/account access

- Apple Developer account.
- RevenueCat project setup.
- App Store Connect products.

## Acceptance

- Premium unlock verified from sandbox.
- Restore purchases verified.
- No microphone or HealthKit permissions requested unless explicitly added in a later ADR.
