import { CalculatorShell } from './CalculatorShell';
import { PageChrome } from './PageChrome';

const content = {
  en: {
    eyebrow: 'Zero-tracking sleep timing',
    title: 'Plan tonight in one calm minute.',
    lead: 'Choose when you want to wake up, sleep now, or take a nap. Sueño Claro gives clear sleep-window options locally in your browser — no account, no microphone, no surveillance.',
    cta: 'Open calculator',
    demoTitle: 'Tonight at a glance',
    demoBody: '90-minute default cycles, adjustable latency, shareable results, and a gentle reminder that regularity beats perfect math.',
    metrics: [
      ['0', 'accounts, trackers or microphone permissions'],
      ['4', 'modes for bedtime, wake-up, naps and tight windows'],
      ['70–120m', 'cycle range disclosed instead of hidden sleep claims'],
    ],
    cards: [
      ['01', 'Set the question', 'Wake up at 7:30, sleep now, plan a siesta, or fit sleep into a fixed window.'],
      ['02', 'Adjust assumptions', 'Change fall-asleep time and cycle length without digging through settings.'],
      ['03', 'Pick a window', 'Results are ranked, copyable, calendar-ready and never blocked by a paywall.'],
    ],
    side: ['Transparent by design', 'The calculator explains its assumptions and keeps the result useful even when sleep cycles vary.', 'Private by default', 'Everything runs client-side. No backend, no account, no analytics script and no microphone permission.'],
    trust: ['No account', 'No microphone', 'No tracking', 'Free core calculator'],
    faq: [
      ['How long is a sleep cycle?', 'We use 90 minutes as a practical default. Real cycles vary by person and night, often roughly 70–120 minutes.'],
      ['Is this medical advice?', 'No. Sueño Claro is an educational wellness calculator and does not diagnose, treat or track sleep disorders.'],
      ['Can I share a result?', 'Yes. After calculating, the share button copies a URL with your selected wake time, latency and cycle assumptions.'],
    ],
  },
  es: {
    eyebrow: 'Sueño sin tracking',
    title: 'Planificá la noche en un minuto tranquilo.',
    lead: 'Elegí cuándo querés despertar, dormir ahora o hacer una siesta. Sueño Claro te da ventanas claras de sueño en tu navegador: sin cuenta, sin micrófono, sin vigilancia.',
    cta: 'Abrir calculadora',
    demoTitle: 'La noche, clara',
    demoBody: 'Ciclos default de 90 minutos, latencia ajustable, resultados compartibles y una idea simple: la regularidad importa más que la matemática perfecta.',
    metrics: [
      ['0', 'cuentas, trackers o permisos de micrófono'],
      ['4', 'modos para dormir, despertar, siestas y ventanas cortas'],
      ['70–120m', 'rango de ciclos visible, sin promesas escondidas'],
    ],
    cards: [
      ['01', 'Elegí la pregunta', 'Despertar a las 7:30, dormir ahora, planificar siesta o encajar una ventana fija.'],
      ['02', 'Ajustá supuestos', 'Cambiá latencia y duración de ciclo sin entrar a configuraciones ocultas.'],
      ['03', 'Usá una ventana', 'Resultados ordenados, copiables, listos para calendario y nunca bloqueados por paywall.'],
    ],
    side: ['Transparente por diseño', 'La calculadora explica sus supuestos y mantiene útil el resultado aunque los ciclos varíen.', 'Privada por defecto', 'Todo corre del lado del navegador. Sin backend, sin cuenta, sin analytics y sin permiso de micrófono.'],
    trust: ['Sin cuenta', 'Sin micrófono', 'Sin tracking', 'Calculadora gratis'],
    faq: [
      ['¿Cuánto dura un ciclo de sueño?', 'Usamos 90 minutos como default práctico. Los ciclos reales varían por persona y noche, muchas veces alrededor de 70–120 minutos.'],
      ['¿Esto es consejo médico?', 'No. Sueño Claro es una calculadora educativa de bienestar y no diagnostica, trata ni monitorea trastornos del sueño.'],
      ['¿Puedo compartir un resultado?', 'Sí. Después de calcular, el botón de compartir copia una URL con tu hora, latencia y supuestos de ciclo.'],
    ],
  },
} as const;

export function LandingContent({ lang = 'en' }: { lang?: 'en' | 'es' }) {
  const c = content[lang];
  const baseUrl = lang === 'es' ? 'https://sueno-claro.vercel.app/calculadora-de-sueno' : 'https://sueno-claro.vercel.app/sleep-calculator';
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Sueño Claro',
      url: baseUrl,
      applicationCategory: 'HealthApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: c.lead,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: c.faq.map(([question, answer]) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    },
  ];
  return (
    <PageChrome lang={lang}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span aria-hidden="true">●</span>{c.eyebrow}</p>
          <h1 id="hero-title">{c.title}</h1>
          <p className="lead">{c.lead}</p>
          <div className="hero-actions">
            <a className="button primary" href="#calculator">{c.cta}</a>
            <span className="mini-proof">No login · Offline-ready PWA · Shareable results</span>
          </div>
          <div className="trust-row" aria-label="Trust guarantees">
            {c.trust.map((item) => <span key={item} className="pill">{item}</span>)}
          </div>
        </div>
        <div className="hero-calculator">
          <CalculatorShell lang={lang} />
        </div>
      </section>

      <section className="metric-strip" aria-label="Product guarantees">
        <div className="preview-card">
          <span className="preview-kicker">{c.demoTitle}</span>
          <p>{c.demoBody}</p>
        </div>
        {c.metrics.map(([value, label]) => (
          <div key={value} className="metric"><strong>{value}</strong><span>{label}</span></div>
        ))}
      </section>

      <section className="content-grid steps" aria-label="How Sueño Claro works">
        {c.cards.map(([number, title, text]) => <article key={title} className="content-card"><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
      </section>

      <section className="proof-grid" aria-label="Privacy and transparency">
        <article className="panel"><h3>{c.side[0]}</h3><p>{c.side[1]}</p></article>
        <article className="panel"><h3>{c.side[2]}</h3><p>{c.side[3]}</p></article>
      </section>

      <section className="content-grid faq-grid" aria-label="Frequently asked questions">
        {c.faq.map(([question, answer]) => <article key={question} className="content-card"><h3>{question}</h3><p>{answer}</p></article>)}
      </section>
    </PageChrome>
  );
}
