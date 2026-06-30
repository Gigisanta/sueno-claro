# Implementation plan

## Phase 0 — Repo and planning

Deliverables:

- Documentation scaffold.
- PRD, architecture, ADRs.
- Backlog and autonomous Hermes runbook.

Status: complete in this repo.

## Phase 1 — Web calculator MVP

Goal: working calculator with zero backend.

Tasks:

1. Initialize Next.js TypeScript app.
2. Create `lib/sleep` pure calculator.
3. Add unit tests for all modes.
4. Build main mobile-first calculator UI.
5. Add EN/ES copy and disclaimer.
6. Add metadata, sitemap, robots.
7. Add PWA manifest.
8. Add placeholder `AdSlot` that renders only after result.
9. Run build, tests, browser smoke, Lighthouse.

Exit criteria:

- All calculator modes work.
- SEO routes render.
- No network needed for calculation.
- Verified screenshots.

## Phase 2 — SEO/content expansion

Tasks:

1. Add English SEO pages.
2. Add Spanish SEO pages.
3. Add FAQ structured data where appropriate.
4. Add source citations in educational pages.
5. Submit sitemap.
6. Add privacy policy and disclaimer page.

Exit criteria:

- Every route has unique metadata.
- Internal links complete.
- Search Console ready.

## Phase 3 — Web monetization

Tasks:

1. Add contextual ad provider or placeholder abstraction.
2. Ensure ads lazy-load after result.
3. Add analytics events without exact sleep times.
4. Add premium/app CTA placeholders.

Exit criteria:

- Ads never block calculator.
- Ad-free path can be simulated.

## Phase 4 — iOS prototype

Tasks:

1. Create SwiftUI app target.
2. Port sleep calculation logic and tests.
3. Add local settings and reminders.
4. Add basic widget.
5. Add RevenueCat SDK and configure `premium` entitlement.
6. Add paywall and restore purchases.
7. Test sandbox purchases.

Exit criteria:

- Sandbox purchase unlocks premium.
- Restore works.
- Widgets/reminders work locally.

## Phase 5 — Launch hardening

Tasks:

1. Accessibility audit.
2. Legal copy review.
3. App Store screenshots and metadata.
4. Performance budget pass.
5. Analytics dashboard.
6. Support/refund docs.

Exit criteria:

- Web public launch ready.
- iOS TestFlight ready or submitted.

## Stop conditions

Stop and escalate if:

- Official docs conflict with this plan.
- Medical/legal copy cannot be kept safe.
- Required app permissions exceed the privacy promise.
- A paid service is proposed before free/local alternative is validated.
