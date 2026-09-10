# Organic discovery · 2026-09-10

SleepLike's 24 localized routes retain their individual canonical URLs, reciprocal language links and static content. The new footer directory makes all seven tools and guides in each language reachable from every page. The Guides navigation leads to this directory; it works without JavaScript and stacks on narrow screens.

Each route now has a distinct 1200×630 PNG social card generated from its catalog title and language during every build. Metadata and Article images use the same typed URL helper. Images are static, contain no visitor inputs and are excluded from offline precaching to avoid downloading 24 share cards on every installation. Existing generic assets remain available for previously shared links.

Guides offer native sharing, clipboard fallback and a selectable public URL if clipboard access fails. They share the canonical article URL exclusively, never the browser query or fragment. Nothing is posted automatically to third parties.

The canonical root now identifies SleepLike with WebSite structured data and a stable Organization identifier. This follows Google's site-name guidance: https://developers.google.com/search/docs/appearance/site-names . It expresses a preference; it does not guarantee a particular search appearance.

The quality workflow runs typechecking, unit tests, export and Chromium/WebKit tests for pushes to main and pull requests. Browser checks cover real PNG dimensions and uniqueness, canonical sharing, fallback copying, the resource directory and existing responsive/privacy/calculation behavior. Build automatically regenerates share images when catalog titles change. This workflow checks changes; it does not post promotions or create articles.

Search Console checked on September 10: sitemap Success, 24 discovered pages; the separate Page indexing report still says Processing data. Discovered is not the same as indexed. Google/Bing sitemaps were already submitted in the initial release. Do not infer visits, positions or revenue from submission alone.

Ad approval remains disabled. No advertising changes were made to MaatWork or other landing pages. Organic growth requires real search demand, useful content and distribution; no automatic popularity, backlinks or revenue are promised.

Validation: root gate PASS (typecheck, lint, 28 unit tests, export); final complete browser suite 84/84 passed across desktop/mobile Chromium and WebKit. Render inspected at 390 and 1440 px, with the directory using the available width. Independent reviewer found no blocking issues. Production and remote CI results are recorded in the task after release.
