# QA, privacy, security and risk register

## QA matrix

### Calculation tests

- Wake at 07:30 with default settings returns expected previous-night options.
- Sleep now near midnight handles date rollover.
- Nap 20/90 options are correct.
- Custom latency changes outputs.
- 12h/24h formatting works.
- DST boundary does not crash; local Date behavior documented.

### Browser tests

- User can complete each mode on mobile viewport.
- Keyboard-only flow works.
- Results announce to screen readers.
- Ads render only after result.
- PWA manifest is valid.
- SEO metadata present per route.

### Visual tests

- Mobile 375px.
- Mobile 430px.
- Tablet.
- Desktop.
- Dark/light if implemented.
- Spanish text does not overflow.

## Privacy requirements

- Core calculation is local.
- No microphone permission.
- No contacts/calendar permission in web v1.
- Local reminders only when app/native support exists.
- Clear privacy statement: no account required, no sleep audio collected.

## Security requirements

- No user-generated HTML rendering.
- CSP when implementation begins.
- Sanitize/validate URL params used for prefilled calculators.
- Do not expose private RevenueCat secret keys client-side; only public SDK key in native app.

## Risk register

| Risk | Likelihood | Impact | Mitigation |
|---|---:|---:|---|
| SEO fails to rank | Medium | High | Long-tail bilingual pages + quality UX + fast pages |
| Premium weak | Medium | Medium | Add convenience features, lifetime option, keep costs zero |
| Medical claim complaint | Low-Med | High | Guardrails, disclaimers, source citations |
| Ads hurt trust | Medium | Medium | Strict ad placement rules and experiment caps |
| Overbuilding iOS too early | Medium | High | Ship web first; app only after traction signal |
| Calculation criticized as oversimplified | Medium | Medium | Explain approximation; allow customization |

## Release gate

Do not launch paid app until:

- Core web calculator has real usage or manual validation.
- App Store metadata avoids medical claims.
- Subscription products and entitlements tested in sandbox.
- Restore purchases tested.
- Refund/support copy prepared.
