import { CalculatorShell } from './CalculatorShell';
import { PageChrome } from './PageChrome';

const content = {
  en: {
    eyebrow: 'Zero-tracking sleep timing',
    title: 'A calm sleep calculator that respects your night.',
    lead: 'Get practical bedtime, wake-up and nap options in seconds. Sueño Claro uses simple cycle math locally in your browser — no account, no microphone, no sleep surveillance.',
    metrics: [
      ['<10 sec', 'from question to useful sleep windows'],
      ['0 accounts', 'nothing to sign up for or sync'],
      ['70–120m', 'real sleep cycles vary; 90m is only a practical default'],
    ],
    cards: [
      ['Bedtime calculator', 'Choose when you need to wake up and get several bedtime options ranked by number of estimated cycles.'],
      ['Nap calculator', 'Plan a short power nap or a full-cycle nap without waking deeper than intended.'],
      ['Privacy-first', 'No microphone, no accelerometer, no tracking pixels and no medical claims. Just transparent assumptions.'],
    ],
    side: ['What it does', 'Calculates wake/bed times from cycle length and fall-asleep latency.', 'What it does not do', 'It does not diagnose sleep problems or detect sleep stages.'],
    trust: ['No account', 'No microphone', 'No tracking', 'Free core calculator'],
    faq: [
      ['How long is a sleep cycle?', 'We use 90 minutes as a practical default. Real cycles vary by person and night, often roughly 70–120 minutes.'],
      ['Is this medical advice?', 'No. Sueño Claro is an educational wellness calculator and does not diagnose, treat or track sleep disorders.'],
      ['Can I share a result?', 'Yes. After calculating, the share button copies a URL with your selected wake time, latency and cycle assumptions.'],
    ],
  },
  es: {
    eyebrow: 'Sueño sin tracking',
    title: 'Una calculadora tranquila para planificar mejor la noche.',
    lead: 'Obtené horarios de sueño, despertar y siesta en segundos. Sueño Claro calcula localmente en tu navegador: sin cuenta, sin micrófono, sin vigilancia del sueño.',
    metrics: [
      ['<10 seg', 'de la pregunta a horarios útiles'],
      ['0 cuentas', 'nada que registrar ni sincronizar'],
      ['70–120m', 'los ciclos reales varían; 90m es un default práctico'],
    ],
    cards: [
      ['Calculadora de sueño', 'Elegí cuándo querés despertar y recibí horarios de acostarte ordenados por ciclos estimados.'],
      ['Calculadora de siesta', 'Planificá una siesta corta o de ciclo completo sin pasarte de la ventana disponible.'],
      ['Privacidad primero', 'Sin micrófono, acelerómetro, píxeles de tracking ni promesas médicas. Supuestos claros.'],
    ],
    side: ['Qué hace', 'Calcula horarios a partir de duración de ciclo y latencia para dormir.', 'Qué no hace', 'No diagnostica problemas de sueño ni detecta etapas reales.'],
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
          <p className="eyebrow">{c.eyebrow}</p>
          <h1 id="hero-title">{c.title}</h1>
          <p className="lead">{c.lead}</p>
          <div className="trust-row" aria-label="Trust guarantees">
            {c.trust.map((item) => <span key={item} className="pill">{item}</span>)}
          </div>
        </div>
        <aside className="hero-card" aria-label="Product facts">
          {c.metrics.map(([value, label]) => (
            <div key={value} className="metric"><strong>{value}</strong><span>{label}</span></div>
          ))}
        </aside>
      </section>

      <div className="grid-main">
        <CalculatorShell lang={lang} />
        <aside>
          <section className="panel"><h3>{c.side[0]}</h3><p>{c.side[1]}</p></section>
          <section className="panel"><h3>{c.side[2]}</h3><p>{c.side[3]}</p></section>
        </aside>
      </div>

      <section className="content-grid" aria-label="Sleep calculator features">
        {c.cards.map(([title, text]) => <article key={title} className="content-card"><h3>{title}</h3><p>{text}</p></article>)}
      </section>

      <section className="content-grid" aria-label="Frequently asked questions">
        {c.faq.map(([question, answer]) => <article key={question} className="content-card"><h3>{question}</h3><p>{answer}</p></article>)}
      </section>
    </PageChrome>
  );
}
