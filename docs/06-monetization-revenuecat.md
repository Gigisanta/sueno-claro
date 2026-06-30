# Monetization and RevenueCat plan

## Monetization thesis

Do not hard-paywall the web calculator. RevenueCat data shows hard paywalls can monetize strongly, but this product depends on SEO trust and instant utility. Use free core + gentle ads + optional premium convenience.

## Free tier

- Unlimited core calculations.
- Basic settings defaults.
- Ads after result only.
- Educational pages.
- PWA install.

## Premium tier

Entitlement: `premium`

Benefits:

- Remove ads.
- Saved routines/profiles.
- Custom fall-asleep latency and cycle length.
- Widgets.
- Bedtime reminders.
- Theme options.
- History/local insights.
- Calendar export/open alarm shortcuts where platform allows.

## Products

| Product | Suggested price | Notes |
|---|---:|---|
| Monthly | $1.99 | Low-friction support tier |
| Annual | $9.99–14.99 | Best default offer |
| Lifetime | $19.99 | Good for simple utility; use only if App Store setup fits product strategy |

## RevenueCat implementation notes

- Use Swift Package Manager with `https://github.com/RevenueCat/purchases-ios-spm.git` per RevenueCat iOS docs.
- Configure RevenueCat once on app launch with the public iOS SDK key.
- Keep `premium` entitlement as the single source of truth.
- Use RevenueCatUI/paywalls only if the app remains visually consistent; custom paywall is acceptable if simpler.
- RevenueCat Paywalls support iOS 15+ and Web Purchase Links exist for web purchase flows, but web v1 can defer paid web billing.

## Web ads

Ad rules:

- Lazy-load ad slots.
- Never block result rendering.
- No personalized tracking until consent/legal review; start with contextual/non-invasive approach if possible.
- Hide ad container for premium users only in native app v2; web premium can wait.

## Analytics events

Required events:

- `calculator_viewed`
- `mode_selected`
- `calculation_completed`
- `result_cta_clicked`
- `settings_changed`
- `ad_slot_viewed`
- `premium_paywall_viewed`
- `purchase_started`
- `purchase_completed`
- `purchase_restored`
- `reminder_created`
- `widget_configured`

No raw bedtime history should be sent without explicit analytics decision; prefer aggregate mode/event counts.

## KPIs

| Stage | KPI |
|---|---|
| Acquisition | organic sessions, CTR, top query growth |
| Activation | calculation completion rate >= 70% |
| Trust | bounce after result, ad complaint rate |
| Retention | 7-day repeat visitors, saved profiles |
| Monetization | premium conversion, ARPDAU, ad RPM |
| Quality | refund rate, app review sentiment |

## Experiments

1. Annual price: $9.99 vs $14.99.
2. Paywall timing: settings customization vs reminder creation vs remove ads prompt.
3. App CTA on web: after second calculation vs footer only.
4. Ad density: result-only card vs result card + footer.
5. Premium naming: Plus vs Calm vs Pro.

## Delegated monetization corrections

The async monetization research confirmed RevenueCat hard-paywall strength in subscription apps, but those benchmarks are not blindly portable to this product. sleeplike is SEO-first and trust-first; the basic calculator remains free.

Rejected for v1:

- Hard paywall before calculation.
- Interstitial ads in the core calculator flow.
- Auto-playing video ads.
- High annual pricing copied from full sleep trackers.
- Web billing/account setup before traffic validation.

Allowed later:

- Contextual paywall when user tries premium convenience features.
- Web Purchase Links if cross-platform premium becomes necessary.
- Opt-in rewarded unlock only for non-core extras, and only after explicit UX review.

Pricing should start closer to simple utility pricing than full meditation/tracker pricing. Keep `$9.99-14.99/year` as the initial annual range unless real conversion data supports more.
