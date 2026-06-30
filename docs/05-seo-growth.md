# SEO and growth plan

## Growth thesis

Search is the main channel. The product should answer the query faster and more cleanly than competitors, then turn repeat utility into PWA installs and app downloads.

## Keyword clusters

### English

- sleep calculator
- sleep cycle calculator
- bedtime calculator
- wake up calculator
- what time should I go to bed
- what time should I wake up
- nap calculator
- power nap calculator
- 90 minute sleep cycle calculator
- sleep now wake up time

### Spanish

- calculadora de sueño
- calculadora de ciclos de sueño
- ciclos de sueño
- a qué hora dormir
- a qué hora despertarme
- calculadora para dormir
- calculadora de siesta
- fases del sueño
- dormir 6 horas ciclos
- despertarse entre ciclos

## Route plan

| Route | Intent | Content angle |
|---|---|---|
| `/` | Brand/direct | Main calculator |
| `/sleep-calculator` | generic EN | Sleep calculator tool |
| `/sleep-cycle-calculator` | cycle-specific | Explain 90-min approximation |
| `/bedtime-calculator` | wake time → bedtime | Work/school morning use case |
| `/wake-up-calculator` | bedtime/now → wake | Alarm setting use case |
| `/nap-calculator` | naps | 20m vs 90m nap |
| `/calculadora-de-sueno` | generic ES | Spanish calculator |
| `/ciclos-de-sueno` | Spanish educational | Cycle explanation |
| `/calculadora-de-siesta` | Spanish nap | Siesta options |

## SEO implementation requirements

- Unique title/meta per route.
- Canonical URLs.
- `sitemap.ts` and `robots.ts` using Next.js conventions.
- Structured data: WebApplication + FAQPage where appropriate, following Google structured-data guidance.
- Fast pages; no blocking ad scripts in first paint.
- Internal links between EN/ES and related calculators.
- Clear source citations for sleep claims.

## Content moat

Build small, high-quality explainers tied to the calculator:

1. Why waking between cycles can feel easier.
2. Why 90 minutes is an approximation.
3. 20-minute vs 90-minute naps.
4. How to plan sleep around early flights.
5. Sleep timing for shift work: limitations and safety.
6. What to do when you only have 4/5/6 hours.
7. Spanish LatAm content with natural language, not machine-translation tone.

## Launch checklist

- Submit sitemap to Google Search Console.
- Create a simple comparison page: “Sleep calculator vs sleep tracker.”
- Publish on Product Hunt only after the app has polish; earlier, use Reddit/HN carefully where self-promo is allowed.
- Create share cards for results: “I’m sleeping at 22:15 to wake at 7:30.”
- Add one-click “install app” PWA prompt only after second use.

## Metrics

- Organic clicks by route.
- Query impressions and CTR.
- Calculator completion rate.
- Repeat visits within 7 days.
- PWA install prompt acceptance.
- App CTA click-through.
- Ad revenue per 1,000 sessions after result.
