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

Retained primary references, accessed 2026-10-22 (no unverified national sources):

- NHLBI, phases/stages and variable cycles: https://www.nhlbi.nih.gov/health/sleep/stages-of-sleep
- NHLBI, habits and adult naps: https://www.nhlbi.nih.gov/health/sleep-deprivation/healthy-sleep-habits
- CDC, sleep duration by age, quality and consultation: https://www.cdc.gov/sleep/about/
- NHLBI, adult sleep duration: https://www.nhlbi.nih.gov/health/sleep/how-much-sleep

The 90-minute cycle and default 15-minute settling allowance remain explicit
planning conventions, not measurements or individual medical recommendations.
Short-nap output means 20 minutes **in bed**, not guaranteed time asleep.

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
