# sleeplike — contrato del repo

<!-- Router corto; CLAUDE.md es symlink acá. Lo genérico vive en ~/.agents/AGENTS.md.
scripts/validate_docs.py exige que este archivo exista, empiece con "#" y no tenga
tabs ni la marca de pendiente en mayúsculas. El estado fechado vive en docs/. -->

Calculadora de ciclos de sueño privacy-first, bilingüe EN/ES, web/PWA en
`https://sleeplike.maat.work` (el repo conserva el nombre viejo, `sueno-claro`).
El estado vigente y los gates de release están en `docs/13-launch-2026-09.md`, que
reemplaza el roadmap anterior de afiliados, app nativa y cero analítica; el diseño
vigente, en `docs/14-responsive-taste.md`; el resto, indexado en `docs/index.md`.

**Stack:** Next.js 16 con `output: "export"` (estático; Vercel publica `out/`) ·
React 19 · TypeScript · Vitest · Playwright. Gestor: npm.

## Comandos

```bash
npm run typecheck    # tsc --noEmit (npm run lint corre lo mismo)
npm test             # vitest run
npm run build        # next build + imágenes sociales + verify-seo + service worker
npm run e2e          # Playwright: Chromium y WebKit, desktop y mobile, contra npm start
make verify          # validate-docs + lint + test + build + e2e
node scripts/prod_smoke.mjs [url]  # smoke de sólo lectura; sin url pega a producción
```

## Invariantes

- **Sin backend:** nada de API routes, cuentas, bases de datos, IA ni permiso de
  micrófono. Sin trackers: la única analítica admitida es la agregada y opcional de
  `components/PrivacyProvider.tsx` (eventos sólo con `mode` y `language`).
- **Núcleo de cálculo** (`lib/sleep`): determinista, con tests unitarios,
  independiente del framework y sin ninguna llamada de red.
- La calculadora nunca queda detrás de un paywall.
- **Anuncios:** sólo después del resultado o en zonas de contenido claramente
  separadas; nunca antes de que la persona tenga su resultado. Siguen apagados
  hasta cumplir el gate de `docs/13-launch-2026-09.md` (`NEXT_PUBLIC_ADS_APPROVED`,
  consentimiento positivo); no inventes publisher, slot ni vendedor autorizado.
- **Monetización** sólo desde `lib/monetization/config.ts`; nada de hooks de
  ingresos hardcodeados en componentes.
- **Copy de salud:** wellness/educativo, con disclaimer no médico
  (`docs/07-sleep-science-legal.md`).

## Gate antes de "listo"

`make verify` en verde (valida docs, `tsc` vía lint, `npm test` con el cálculo,
build y e2e); ningún anuncio antes del resultado; la calculadora anda
sin red. Tras un deploy autorizado: `node scripts/prod_smoke.mjs` (Chromium +
WebKit).
