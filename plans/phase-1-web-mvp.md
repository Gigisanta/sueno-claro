# Phase 1 — Web MVP implementation plan

## Goal

A deployable bilingual web/PWA sleep calculator with deterministic calculations and no backend.

## Steps

1. Initialize Next.js TypeScript app.
2. Add test runner.
3. Implement `lib/sleep`.
4. Build main calculator shell.
5. Add result cards and disclaimer.
6. Add routes and metadata.
7. Add PWA manifest.
8. Run test/build/browser smoke.

## Verification commands

Exact commands depend on chosen package manager. Typical:

```bash
npm run test
npm run lint
npm run build
```

Browser verification:

- `/`
- `/sleep-calculator`
- `/nap-calculator`
- `/calculadora-de-sueno`

## Acceptance

See `docs/12-backlog.md` B-001 through B-007.
