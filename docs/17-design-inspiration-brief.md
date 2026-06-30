# Design inspiration brief

## Trigger

Required before any UI implementation for landing, calculator, mobile screens, widgets, or paywall.

## Product surface

- Mobile-first web/PWA calculator.
- Later SwiftUI iOS app.
- Dark, calm, utility-first interface.
- Numeric result cards are the hero.

## Sources inspected

- sleepcalculator.com — proves core utility, but UI is dated and ad/topic links feel bolted-on.
- Sleep Foundation calculator — trust/content authority, but heavier and less app-like.
- Sleep Cycle — polished full tracker positioning, but heavier than our privacy/simple-calculator wedge.
- Dribbble/Behance sleep app searches — common visual tropes: dark backgrounds, moon gradients, soft cards, sleep graphs. Use restraint; avoid generic dreamy/AI visuals.
- Apple Human Interface Guidelines — native app/widgets/notifications should feel system-native and avoid notification abuse.

## Patterns to reuse

1. Dark bedtime-friendly palette.
2. Oversized time typography.
3. Card-based result ranking.
4. Bottom CTA for reminder/copy/share.
5. Calm explanatory microcopy.
6. System-native date/time controls where possible.

## Patterns to avoid

1. Purple-blue generic gradient blobs.
2. Fake scientific precision.
3. Dashboard overload.
4. Tracker graphs in v1.
5. Permission prompts before value.
6. Ads above the answer.

## Visual constraints

- One accent color only.
- Result cards must be readable at arm's length in bed.
- Minimum tap target 44px.
- No tiny custom wheels if native input works better.
- Spanish text must fit without clipping.

## Initial component set

- `CalculatorShell`
- `ModeTabs`
- `TimeInput`
- `ResultCard`
- `AssumptionBadge`
- `Disclaimer`
- `AdSlot`
- `PremiumPrompt`
- `LanguageSwitcher`
- `FAQBlock`

## Visual QA checklist

- iPhone SE width.
- iPhone Pro width.
- Desktop centered narrow column.
- High contrast mode.
- Reduced motion.
- Long Spanish strings.
- Result visible without scrolling on common mobile height when possible.
