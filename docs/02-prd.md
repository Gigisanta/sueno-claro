# PRD — sleeplike / REMinder

> **Note:** App was renamed from "Sueño Claro" to "sleeplike" mid-2026.
> The product concept below remains accurate.

## Status

Draft v1 for autonomous implementation.

## Problem

People often know when they must wake up, but do not know when to go to bed to avoid waking in the middle of a sleep cycle. Existing simple tools are useful but visually weak; full sleep trackers are heavier than needed and ask for more trust than a simple timing question requires.

## Product goal

Provide an instant, privacy-first sleep timing calculator that helps users choose practical bedtime/wake-up options using common sleep-cycle assumptions, with clear caveats and no medical claims.

## Success criteria

### User outcomes

- User gets useful sleep/wake options in under 10 seconds.
- User understands assumptions: fall-asleep latency and approximate cycle length.
- User can set a reminder/alarm path without creating an account.
- User sees no ad before receiving the result.

### Business outcomes

- Web pages index cleanly and acquire organic traffic.
- Free product supports ads without degrading trust.
- Premium features are valuable enough for optional app purchase/subscription.
- Core product requires no server cost in v1.

## MVP features

### Calculator modes

1. Wake-up target: “I want to wake up at HH:MM.”
2. Sleep now: “If I go to bed now, wake me at…”
3. Nap: 20-minute power nap, 90-minute full-cycle nap, custom nap window.
4. Fixed window: “I have X hours available.”

### Result format

Each result shows:

- Suggested time.
- Number of cycles.
- Total time in bed.
- Label: ideal, good, minimum, nap.
- Explanation of assumptions.
- CTA: set reminder / open alarm / copy / share.

### Settings

Free defaults:

- Fall-asleep latency: 15 minutes.
- Sleep cycle: 90 minutes.
- Time format: auto locale, toggle 12/24h.

Premium later:

- Custom latency.
- Custom cycle length.
- Weekday/weekend profiles.
- Shift worker profiles.
- Widgets.
- No ads.

## Non-goals v1

- Medical advice.
- Sleep diagnosis.
- Insomnia treatment.
- Sleep apnea/snore detection.
- Microphone permissions.
- Wearable integrations.
- Account/login.
- Backend data sync.
- AI coach.

## User stories

| ID | Story | Acceptance criteria |
|---|---|---|
| U-001 | As a user with a wake time, I want bedtime suggestions | Enter wake time → receive 4-6 bedtime options sorted by quality |
| U-002 | As a user going to bed now, I want alarm suggestions | Press sleep now → receive wake options based on current local time |
| U-003 | As a user taking a nap, I want non-groggy options | Nap mode shows 20m and 90m options with caveat |
| U-004 | As a privacy-conscious user, I want no account/tracking required | Core app works offline/client-side |
| U-005 | As a premium user, I want reminders/widgets | Later iOS app supports notifications/widgets behind entitlement |

## Acceptance gates

- Core calculations have unit tests including midnight rollover and 12/24h formatting.
- App works with JavaScript enabled and produces accessible labels/forms.
- No network required for core calculation.
- Lighthouse target: Performance >= 95, Accessibility >= 95, SEO >= 95 on key pages.
- Copy includes educational disclaimer.
