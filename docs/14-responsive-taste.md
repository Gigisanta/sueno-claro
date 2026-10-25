# Responsive design · October 25, 2026

## The sentence is the layout

Fixed Taste v2 direction, seed `583652942`, without redraws. SleepLike keeps its
night ground `#111514`, moon-gold `#e6c879`, and locally hosted Manrope.
The visitor's actual time becomes the sentence: “Wake at [time] → in bed by
[estimate]”. The time control is inside the line; its live estimate uses the
unchanged deterministic calculation core. Calculate still creates the complete
result list, status announcement, share links and calendar reminders. A live
estimate alone never makes a result ad eligible.

- One inline NASA night photograph; three companion orbital photographs close
  each page. Local files, official sources, creators and public-domain basis:
  `public/open/credits.json`. Credits are visible in the footer. Sentence pieces,
  alt text and credit labels are translated in all seven locale dictionaries.
- Plain navigation, square flat controls, equal 16–32px outer margins, no eyebrow
  labels, decorative numbering, hairlines, shadows or gradients. The five type
  roles separate the sentence from supporting copy and source notes.
- Guides, methodology, about and legal pages use a calm reading column of at most
  70ch. Existing paragraphs, examples, citations and non-medical disclaimers stay
  visible and unchanged. Long h1s split into a short heading and an immediately
  adjacent supporting continuation; SEO titles and descriptions remain intact.
  Guide introductions also expose the localized calculator action before the
  photograph; mobile breadcrumbs omit the separator with the current-page crumb.
- Dates and settings stay labelled; all controls keep 44px targets and native
  keyboard operation. Phones keep the Calculate action in the first screen and
  stack results without overlapping twelve-hour periods and durations.
- A single image shutter and a brief photographic drift accompany differentiated
  heading, paragraph, list and image entrances. Everything is visible without
  JavaScript; reduced motion removes the travel. No continuous animation needs
  a pause control.
- Route URLs, metadata, canonical/hreflang, JSON-LD, sitemap, robots, manifest,
  service-worker scope, consent, analytics, ad gating and monetization are not
  changed. Static-export and offline behavior remain the release contract.

The task report and `.taste-skill/after/` hold measured inspection, screenshot
critiques and calculator-identity evidence. They are not production-deployment
claims.

On a shared host, `PLAYWRIGHT_WORKERS=1 make verify` runs the same complete
four-browser-project suite serially; the default remains four workers. Heavy
verification still goes through the workstation resource guard.

## Previous responsive refinement · September 10, 2026

User requested a substantial mobile/desktop improvement using Taste, and diagnosis of missing advertising. Direction: a calm consumer utility, preserving SleepLike's dark/gold brand. Taste dials: DESIGN_VARIANCE 5, MOTION_INTENSITY 2, VISUAL_DENSITY 4. Native CSS, locally hosted Manrope and one Radix icon family. No animation framework, stock photography, promotional mockups or new routes.

## Audit and changes

The previous desktop split put a long, oversized headline alongside a narrow form/results column. On phones, the introductory material delayed the controls. Results required excessive scrolling, and navigation hid an entry at small widths.

- Compact page heading and description above the actual calculator. Preserve all six tool intents, 24 route URLs, canonical/hreflang, editorial bodies and legal copy.
- Desktop: controls on the left, actual results in a two-column grid on the right. Before calculating, that area explains the current adjustable estimates instead of showing fake results.
- Mobile: controls first, result rows with time/date and durations separated. Explicit Calculate scrolls to results without changing keyboard focus; Edit schedule returns to the form.
- Dates, times, settings and actions keep labels and at least 44-pixel primary targets. Inputs stay 16px to avoid iOS focus zoom. All navigation entries remain available down to 320px.
- Twelve-hour periods use smaller type on their own line on narrow screens; a regression test checks actual text rectangles against duration text, not just document overflow.
- Feedback motion only translates the result panel; opacity stays at full contrast. Reduced-motion preferences disable animation and smooth scrolling.

## Advertising diagnosis

AdSense UI, same date: maat.work = Getting ready, ads.txt = Authorized. Auto Ads and Auto optimize are OFF. This is not permission to serve ads. Production approval flag stays false and only sleeplike.maat.work is eligible in application code. Root MaatWork and other landings remain ad-free.

The previous dedicated CMP source was not a verified delivery URL. Google's documented integration uses the AdSense tag with paused requests, then consent callbacks before manual unit requests. Global positive consent remains the product requirement; absent positive TCF consent the app must remain ad-free, including regions where Google's European message is not shown. A global certified CMP solution and real-ad/CSP verification remain activation gates, in addition to Google approval.

## Verification

Initial local Lighthouse: performance 98, accessibility 100, SEO 100, LCP 2.3 seconds. Laboratory measurements with ads disabled, not field results or revenue evidence. Independent review caught the twelve-hour overlap; corrected with explicit EN/ES 320/390px coverage. Final test and deployment evidence follows in the task report.


Measured against the preceding production release at 390px: Calculate bottom moved from 906px to 589px; the four-result list from 1040px to 815px. At 1440px the result list changed from 1040px to 591px. Independent final UI review: 16 EN/ES, Chromium/WebKit, 320/390/1024/1440 combinations and 64 result cards without overlap; 24 focused visual/SEO/privacy tests passed after the correction.

UI release: commit `c5d677a`, production deployment `dpl_2QgSfxiMD4Wsh2aDJDWW2qi1J57C`, READY at https://sleeplike.maat.work. Production smoke passed Chromium and WebKit, with no active ads. Both root-domain landings and ad approval configuration remain unchanged.

Final integrated verification: gate PASS (typecheck/lint, 28 unit tests, static build); 76/76 E2E cases passed across desktop/mobile Chromium/WebKit. Independent review approved the revised paused SDK after reproducing immediate rejection/error/revocation/offline behavior with all network calls intercepted. No real ads or impressions were tested; approval and real CMP/CSP/global-consent validation remain pending.
