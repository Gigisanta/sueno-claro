# Organic discovery

## Six-language catalog · 2026-10-22

All 12 existing page topics are translated into Brazilian Portuguese, French,
German and Italian without reducing the underlying English sections, tables,
medical cautions or institutional/privacy content. Together with EN/ES this is
72 canonical pages, not additional near-duplicate keyword/doorway topics.
Localized roots are `/pt-br`, `/fr`, `/de` and `/it`; English and Spanish keep
their published URLs. New-language copy uses 24-hour clocks.

`lib/i18n.ts` owns topic IDs and locale routes. A native `details` language
switcher contains ordinary server-rendered links to the same topic in all six
languages, without JavaScript. HTML metadata and sitemap include all six
reciprocal hreflang values plus English `x-default`. Canonicals are per-locale,
and document language uses BCP 47 (`pt-BR` for Brazil). Every localized footer
retains the MaatWork credit at https://maat.work.

Interface dictionaries include calculator errors, date/time presentation,
accessibility labels, calendar reminders, privacy presentation and worked guide
examples. Dictionaries are selected server-side so client components receive
only current-language strings. Advertising and consent **logic are unchanged**;
`NEXT_PUBLIC_ADS_APPROVED=false` remains the required release setting. Existing
CMP/global-consent/network/CLS activation gates are not waived by translation.

The export verifier checks every route, title (including brand) at most 60
characters, description at most 160, canonical, language, all HTML/sitemap
alternates, crawlable switcher, discovery links, MaatWork credit, schema and social
image. The browser suite additionally checks actual hreflang return links and
one calculator/language-switch journey per locale on desktop/mobile Chromium
and WebKit. Unit tests preserve full translation structure and source URLs.
Use `NEXT_PUBLIC_ADS_APPROVED=false make verify` before opening a release PR.
Independent model-assisted translation review uses ten real sample strings per
new language in the PR; it is not accredited medical or professional translation
certification. No deployment, indexing, traffic or ranking is implied.

The 2026-10-22 Search Console handoff reported 200 English-home impressions for
“sleep calculator cycle”, average position 7.09 and zero clicks. The home snippet
now names the calculator and practical bedtime-planning task; English H1 is
“Sleep Cycle Calculator”. All six homepages use localized task-focused titles
and descriptions and a visible five-link directory immediately after the
calculator (schedule, nap, bedtime, cycles and adult sleep duration). These are
ordinary server-rendered links, not footer-only discovery. Home titles use the
`| SleepLike` suffix; other pages retain their existing suffix. This is a snippet
and internal-link improvement, not evidence of later clicks or indexing.

Retained primary references, accessed 2026-10-22 (no unverified national sources):

- NHLBI, phases/stages and variable cycles: https://www.nhlbi.nih.gov/health/sleep/stages-of-sleep
- NHLBI, habits and adult naps: https://www.nhlbi.nih.gov/health/sleep-deprivation/healthy-sleep-habits
- CDC, sleep duration by age, quality and consultation: https://www.cdc.gov/sleep/about/
- NHLBI, adult sleep duration: https://www.nhlbi.nih.gov/health/sleep/how-much-sleep

The 90-minute cycle and default 15-minute settling allowance remain explicit
planning conventions, not measurements or individual medical recommendations.
Short-nap output means 20 minutes **in bed**, not guaranteed time asleep.

## Search Console content follow-through · 2026-10-22

The Spanish calculator title and H1 now lead with “Calculadora de sueño” and
name estimated cycles. Its description explicitly says it cannot detect actual
sleep stages or measure sleep. All six calculator homepages include the same
worked duration example: 02:45–07:33 is 4 hours 48 minutes in bed; subtracting
the assumed 15-minute settling period, without awakenings, gives an estimated
4 hours 33 minutes asleep. Clock subtraction cannot establish actual sleep.
Calculation inputs, formulas, advertising and consent logic are unchanged.

The six existing schedule guides now explain night and rotating shifts without
adding new keyword pages. They distinguish a daytime example from personal
guidance, describe protecting sleep after work and a dark, quiet room, deny
circadian adaptation/alertness guarantees, and include driving and occupational
health cautions. Official source verified and accessed 2026-10-22:
CDC/NIOSH, *Training for Nurses on Shift Work and Long Work Hours*, Module 9,
Sleep (archived; last reviewed 2020-03-31):
https://archive.cdc.gov/www_cdc_gov/niosh/work-hour-training-for-nurses/longhours/mod9/05.html
The guidance was written for nurses; it is not represented as a personalized
plan for every occupation. Source URLs and access dates appear on each guide.
Routes and translation groups remain unchanged.

### IndexNow (manual, after an authorized production release)

The public ownership key is `public/4f8fddec4720ae1200aad2fa14ff476a.txt`;
its contents match its basename. It replaces the unused `indexnow-key.txt`.
This is a public verification file, not a credential.

Preview only, with no network calls:

```bash
npm run indexnow -- /calculadora-de-sueno /sleep-schedule
```

After the changed URLs **and** key file are live, an authorized operator can run:

```bash
npm run indexnow -- --submit /calculadora-de-sueno /sleep-schedule
```

Alternatively, preview the live sitemap (this downloads the sitemap but does not
contact IndexNow), optionally selecting entries updated on or after a date:

```bash
npm run indexnow -- --sitemap
npm run indexnow -- --sitemap --since 2026-10-23
# Only after an authorized release:
npm run indexnow -- --submit --sitemap --since 2026-10-23
```

Sitemap mode cannot be mixed with explicit URLs. `--since` requires sitemap mode
and a valid calendar date; entries with absent or invalid `lastmod` are excluded
when filtering. With no filter all locations are included. Empty selections do
not submit. All locations must be absolute HTTPS URLs on `sleeplike.maat.work`,
including entries excluded by the date filter.

Explicit mode accepts paths or HTTPS URLs only on `sleeplike.maat.work`. Both
modes remove fragments and deduplicate URLs. With `--submit` the command first
checks that the live key matches, then POSTs JSON to
https://api.indexnow.org/indexnow. HTTP 200/202 means received/pending key
validation, not indexed. Without `--submit`, it only prints the payload.
No submission, deployment or indexing request was made for this change.
Protocol reference, accessed 2026-10-22: https://www.indexnow.org/documentation .

## Initial launch · 2026-09-10

SleepLike's 24 localized routes retain their individual canonical URLs, reciprocal language links and static content. The new footer directory makes all seven tools and guides in each language reachable from every page. The Guides navigation leads to this directory; it works without JavaScript and stacks on narrow screens.

Each route now has a distinct 1200×630 PNG social card generated from its catalog title and language during every build. Metadata and Article images use the same typed URL helper. Images are static, contain no visitor inputs and are excluded from offline precaching to avoid downloading 24 share cards on every installation. Existing generic assets remain available for previously shared links.

Guides offer native sharing, clipboard fallback and a selectable public URL if clipboard access fails. They share the canonical article URL exclusively, never the browser query or fragment. Nothing is posted automatically to third parties.

The canonical root now identifies SleepLike with WebSite structured data and a stable Organization identifier. This follows Google's site-name guidance: https://developers.google.com/search/docs/appearance/site-names . It expresses a preference; it does not guarantee a particular search appearance.

The quality workflow runs typechecking, unit tests, export and Chromium/WebKit tests for pushes to main and pull requests. Browser checks cover real PNG dimensions and uniqueness, canonical sharing, fallback copying, the resource directory and existing responsive/privacy/calculation behavior. Build automatically regenerates share images when catalog titles change. This workflow checks changes; it does not post promotions or create articles.

Search Console checked on September 10: sitemap Success, 24 discovered pages; the separate Page indexing report still says Processing data. Discovered is not the same as indexed. Google/Bing sitemaps were already submitted in the initial release. Do not infer visits, positions or revenue from submission alone.

Ad approval remains disabled. No advertising changes were made to MaatWork or other landing pages. Organic growth requires real search demand, useful content and distribution; no automatic popularity, backlinks or revenue are promised.

Validation: root gate PASS (typecheck, lint, 28 unit tests, export); final complete browser suite 84/84 passed across desktop/mobile Chromium and WebKit. Render inspected at 390 and 1440 px, with the directory using the available width. Independent reviewer found no blocking issues. Production and remote CI results are recorded in the task after release.

Remote CI limitation: GitHub Actions run 34514589300 could not start because the account's Actions budget prevents further use. No tests ran there, and no spending settings were changed. The workflow is configured but blocked externally. To keep essential SEO checks automatic now, every local and Vercel build also validates the actual exported HTML, canonical URLs, language alternates, sitemap, unique titles, H1, parseable structured data, public resource links and PNG assets. A failed assertion fails the build before publication. Full browser checks remain locally verified until Actions capacity is restored.
