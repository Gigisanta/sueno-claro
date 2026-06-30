# Delegated deep-research addendum

Date: 2026-06-30
Batch: `deleg_9e82e040`

## Parent validation stance

The six delegated reports are useful but not accepted wholesale. The parent validation flagged absolute/secondary-source claims. This addendum integrates the findings that are compatible with the source map and product strategy, and explicitly rejects recommendations that would damage the privacy-first/free-core positioning.

## Integrated findings

### SEO and acquisition

- Spanish SEO is a stronger early wedge than generic English terms: fewer dedicated competitors and more shallow one-page tools.
- Add programmatic SEO after the core calculator works, not before. Start with 20-40 high-intent pages, then expand toward wake-time/bedtime matrices if Search Console shows impressions.
- Useful clusters beyond the initial docs: caffeine cutoff, sleep debt, chronotype, jet lag, shift work. These should be treated as future calculator modules, not v1 scope.
- Create linkable assets: embeddable calculator widget, downloadable wake-time table, and data report once anonymous aggregate usage exists.

### Competitor/product audit

- The market gap is the middle between simple web calculators and heavy trackers: personalized but still private/simple.
- Add planned support for age band, custom sleep latency, custom cycle length, naps, and shift-work caveats.
- Avoid Sleep Cycle/Sleep Time positioning around accuracy of sleep-stage detection. Accuracy/privacy complaints around microphone/accelerometer tracking strengthen the “calculator, not tracker” wedge.
- The Sleepyti.me story is a cautionary lesson: monetization must not destroy the utility experience.

### Sleep science/legal

- Use 90 minutes as a default approximation, not a promise. Document physiological cycle range as roughly 70-120 minutes depending on person/night/stage.
- Make regularity a first-class message: consistent sleep/wake timing matters as much as one calculated time.
- Strengthen warnings for insomnia, apnea symptoms, excessive sleepiness, shift work, children, pregnancy, medication effects, and chronic illness.
- Avoid “optimal/perfect/guaranteed refreshed” language. Prefer “recommended”, “estimated”, “may help reduce grogginess”.

### Monetization

- RevenueCat data supports hard paywalls in many app categories, but hard-paywalling this calculator conflicts with SEO/trust. Keep free core.
- Reject interstitial/video ads in the calculator flow. The delegated monetization report suggested interstitial/rewarded formats; these are incompatible with the product’s trust bar unless explicitly opt-in and outside the core result.
- Keep early pricing modest. High wellness-app prices ($39-$70/year) are benchmark context, not the MVP default.
- RevenueCat Web Purchase Links are a later option; v1 web should remain free and zero-backend.

### UX/UI

- Add a progressive onboarding path only after the user receives value: age band and fall-asleep latency when saving a routine; reminder permissions only when enabling reminders.
- Use native/system time pickers where they improve accessibility; avoid custom wheels unless tested.
- Add result timeline as optional visual support, but result cards and exact times remain primary.
- Accessibility details to enforce: 44px touch targets, visible labels, `aria-live` for results, reduced motion, high contrast, long Spanish text checks.

### Technical architecture

- Keep core sleep calculation as a pure framework-independent module.
- Static Next.js export remains a good default. PWA service worker can start manual/minimal; Serwist is allowed only if the implementation needs robust caching and the dependency is justified.
- Use localStorage for simple settings first; IndexedDB/idb only when storing structured history becomes necessary.
- Ad abstraction must be isolated and lazy-loaded; if using third-party ads, sandbox or provider-safe isolation is required.
- CI should eventually run docs validation, unit tests, build, and browser smoke tests.

## Rejected or deferred recommendations

| Recommendation from research | Decision | Why |
|---|---|---|
| Hard paywall at first launch | Rejected for v1 | Destroys SEO utility/trust |
| Interstitial ads every few uses | Rejected | Invasive for a sleep/wellness calculator |
| Rewarded video for insights | Deferred | Only acceptable as explicit opt-in outside core result |
| Web billing/RevenueCat in week 1 | Deferred | Adds account/billing complexity before validation |
| AI sleep coaching | Deferred | Adds cost, claims risk, and retention burden |
| 250-400 programmatic pages immediately | Deferred | Risk of thin pages; start small and expand with data |
| Shift-work calculator as full feature v1 | Deferred | Higher safety/legal nuance; include caveat first |

## New backlog implications

- Add programmatic SEO pilot after MVP.
- Add age band and custom latency as v1.1, not required for first working calculator.
- Add stronger legal/disclaimer copy before public launch.
- Add privacy-safe analytics buckets before publishing usage reports.
- Add design QA for accessibility and Spanish overflow.
