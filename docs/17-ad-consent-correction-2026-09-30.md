# Advertising consent correction, September 30, 2026

## Reproduced defect

The future manual-ad guard accepted purpose-level legitimate interest without
Google's vendor-level permission and ignored publisher restrictions. The
regression ran against the original implementation: eight rejection cases
incorrectly returned permission; the other three tests passed.

`lib/privacy.ts` now requires device-purpose consent and Google vendor consent.
For purposes 2, 7, 9 and 10, Google's default is legitimate interest: both the
purpose and vendor must permit that basis. A publisher restriction of 1 requires
purpose consent instead; 2 requires legitimate interest; 0 forbids the purpose.
Unsupported restriction values deny permission. Purpose 1 cannot be switched
to legitimate interest. The browser fixture now supplies the vendor's legal
basis rather than an incomplete synthetic all-consent response.

Primary contracts, checked September 30:
[Google AdSense TCF integration](https://support.google.com/adsense/answer/9804260?hl=en)
and [IAB Tech Lab CMP API / TCData](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20CMP%20API%20v2.md).

## Verification and limits

- Owner regression: 11/11 pass after correction; 8/11 failed before correction.
- Root gate: typecheck, lint, 37 unit tests and static export pass.
- `make verify`: documentation validation, typecheck, 37 unit tests, static
  export and all 108 browser tests pass. The first full run passed 107 tests;
  one WebKit context failed to launch with a native `Pure virtual function`
  abort. The isolated retry passed, followed by a complete passing gate.
- Claude Code `claude-opus-5-5` reviewed the frontend consent propagation,
  synchronous pause, unit removal and calculator availability without finding
  another reproducible defect. This was a source review, not a real CMP test.
- Independent final code review and staged/production acceptance are separate
  release steps. Their final evidence is recorded with the exact artifact.
- Synthetic CMP/SDK tests intercept every request and use fictitious public
  identifiers. They do not establish real CMP delivery, site approval, real
  impressions, legal readiness or revenue.
- No advertising flags, CSP origins, slots, SDK bootstrap, analytics settings,
  capture or account configuration changed. Advertising remains disabled.

The activation gates in `13-launch-2026-09.md` still apply. This helper enforces
the declared legal-basis restrictions; it does not certify a CMP, decode or
validate an entire TC string, or replace Google's own validation.
