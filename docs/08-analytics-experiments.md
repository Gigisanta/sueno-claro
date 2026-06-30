# Analytics and experiments

## Privacy principle

Measure product behavior without collecting sensitive sleep diaries. In v1, avoid account identity and avoid sending exact bed/wake times unless explicitly needed and disclosed.

## Event schema

```json
{
  "event": "calculation_completed",
  "timestamp": "ISO-8601",
  "locale": "en|es",
  "mode": "wake-at|sleep-now|nap|fixed-window",
  "result_count": 5,
  "used_custom_settings": false,
  "session_id": "anonymous-rotating"
}
```

Do not include exact times by default. Bucket where useful:

- wake hour bucket: morning/afternoon/evening/night
- sleep duration bucket: `<5h`, `5-7h`, `7-9h`, `>9h`

## Funnel

1. Page view.
2. Calculator interaction.
3. Calculation completed.
4. Result CTA clicked.
5. Return visit / PWA install.
6. App CTA clicked.
7. Paywall viewed.
8. Purchase/restoration.

## North Star metric

Weekly completed calculations by returning users.

Reason: raw pageviews can be SEO noise; returning calculations indicate utility.

## Experiment backlog

| ID | Experiment | Success metric |
|---|---|---|
| E-001 | Hero copy: privacy-first vs wake-refreshed | calculation start rate |
| E-002 | Default mode: wake-at vs sleep-now | calculation completion |
| E-003 | Result card order: ideal first vs earliest first | result CTA click |
| E-004 | Reminder CTA text | reminder click |
| E-005 | Ad placement after first vs after all results | revenue without bounce increase |
| E-006 | Spanish landing localized title variants | CTR from Search Console |
| E-007 | Premium prompt after settings customization | paywall view→purchase |

## Instrumentation rule

No analytics library should block first paint or calculator execution. If analytics fails, the calculator still works.
