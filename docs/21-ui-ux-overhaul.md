# UI/UX overhaul pass

Date: 2026-06-30

## Direction

Sueño Claro moved from a generic dark landing page to a calculator-first calm wellness interface.

Design principles applied:

- Calculator above the fold on desktop and immediately after hero copy on mobile.
- One primary user question: choose mode → set time → calculate windows.
- Calm premium night palette with one warm accent and one cool support color.
- Larger touch targets, stronger focus states, clearer labels, and no icon-only action without aria labels.
- Progressive result reveal: no sponsored slot before a useful result.
- Transparent privacy and assumption messaging without fake social proof or medical claims.

## Implementation changes

- Redesigned global visual system in `app/globals.css`.
- Rebuilt `PageChrome` with skip link, sticky nav, richer brand lockup, and improved navigation rhythm.
- Rebuilt landing structure in `components/LandingContent.tsx` around an above-fold calculator and supporting proof strip.
- Reworked `components/CalculatorShell.tsx`:
  - richer mode cards with icons and explanatory subtitles;
  - stronger calculator header and cycle badge;
  - larger time fields and primary action;
  - pre-result empty state;
  - ranked result cards with explicit best-fit label;
  - copy/share/calendar actions preserved;
  - accessible labels and form names added.
- Updated Playwright tests and production smoke to match the improved UX copy.

## Source-informed constraints

- WCAG / Vercel UI rules: visible focus states, labeled controls, semantic sections, skip link, aria-live result updates.
- NN/g form guidance: labels stay visible; helper text is close to the input; grouping uses visual proximity.
- Mobile UX: 44px+ touch targets, thumb-friendly vertical layout, no horizontal overflow.
- Material/HIG direction: consistent design tokens, clear interaction states, calm hierarchy, reduced-motion support.

## Verification

- `npm run lint`
- `npm run test`
- `npm run build`
- `npm run e2e`
- `make validate-docs`
- Screenshot artifacts regenerated:
  - `artifacts/visual-qa/desktop-home.png`
  - `artifacts/visual-qa/desktop-results.png`
  - `artifacts/visual-qa/mobile-es-results.png`

## Known tooling limitation

Vision-model analysis is unavailable in this Hermes profile because the configured OpenAI vision key returns 401. Visual QA used Playwright screenshots plus deterministic layout, overflow, contrast/focus, and browser smoke checks instead.
