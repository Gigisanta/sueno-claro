# UX, IA, brand and accessibility

## Design principle

Quiet utility. The product should feel like a premium alarm-clock companion, not a wellness content farm.

## Visual direction

- Background: deep navy / near-black.
- Surface cards: slightly lighter navy/charcoal.
- Accent: warm amber or soft cyan, one accent only.
- Typography: large numeric times, clear hierarchy, system font or one restrained font.
- Motion: minimal micro-transitions only.
- No glassmorphism, 3D or generic AI visuals.

## Information architecture

Primary nav is nearly invisible:

1. Calculator
2. Nap
3. Learn
4. Settings

On web, route-level SEO pages can map to the same calculator shell with contextual copy.

## Main screen wireframe

```text
[Logo] Sueño Claro                         [ES/EN]

Wake up between cycles.
No account. No microphone. No tracking.

[ segmented control ] Wake up at | Sleep now | Nap | Window

I want to wake up at
[ 07 : 30 ] [AM/PM]

[ Calculate ]

Results
┌──────────────────────────────┐
│ 22:15  Best · 6 cycles       │
│ 7h 45m in bed incl. 15m prep │
└──────────────────────────────┘
┌──────────────────────────────┐
│ 23:45  Good · 5 cycles       │
└──────────────────────────────┘

Assumes 90-min cycles and 15 min to fall asleep.
[Set reminder] [Copy] [Change assumptions]

Sponsored card appears here only after result.
```

## Accessibility

- All time controls must be keyboard-accessible.
- Use native inputs where possible before custom wheels.
- Color contrast >= WCAG AA, target AAA for time text.
- Result cards must include text labels, not color-only quality indicators.
- Support reduced motion.
- Use `aria-live="polite"` for newly computed results.
- Language tags for EN/ES pages.

## Ad placement rules

Allowed:

- Native card below results.
- Footer display ad after educational copy.
- Sponsor block on Learn pages.

Forbidden:

- Interstitials.
- Video ads.
- Sticky overlays over controls/results.
- Ads before first result.
- Fake UI buttons.

## Paywall tone

Do not guilt-trip. Premium copy:

> Upgrade for a calmer routine: no ads, saved schedules, reminders, widgets, and custom sleep assumptions.

Avoid:

- “You will sleep badly unless you pay.”
- Medical improvement claims.
- Countdown pressure.

## Brand names

Shortlist:

- sleeplike — current brand.
- REMinder — best global pun, but less clear in Spanish.
- WakeWell — clean but generic.
- Ciclo — strong Spanish but possibly broad.

Repo used Sueño Claro as working name; renamed to sleeplike mid-2026.

## Delegated UX additions

### Progressive personalization

The calculator must work without onboarding. Ask optional questions only after value:

1. After first result: custom fall-asleep time.
2. When saving a routine: age band and weekday/weekend profile.
3. When enabling reminders: notification permission.

### Inputs

Prefer native time inputs/pickers for accessibility. Custom wheels require keyboard, screen-reader, and mobile QA before use.

### Result visual hierarchy

- Biggest element: recommended time.
- Second: cycle count and time in bed.
- Third: assumption/disclaimer.
- Optional: timeline visualization.

### Accessibility acceptance

- Touch targets >= 44px.
- Visible labels; placeholders are not labels.
- Result updates announced with `aria-live=polite`.
- Reduced motion respected.
- Long Spanish strings tested on 375px width.
