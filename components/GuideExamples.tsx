import type { GuideExamplesContent } from "../lib/content/examples";

// Server-rendered worked examples: plain links into the calculator, no client JS.
export function GuideExamples({ content }: { content: GuideExamplesContent }) {
  return (
    <section
      id="guide-examples"
      className="guide-examples"
      aria-labelledby="guide-examples-heading"
    >
      <h2 id="guide-examples-heading">{content.heading}</h2>
      {content.intro && <p className="guide-examples-intro">{content.intro}</p>}
      <ul className="guide-examples-list">
        {content.cards.map((card) => (
          <li key={card.href} className="guide-example">
            <h3>{card.title}</h3>
            <p>{card.summary}</p>
            <dl>
              {card.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
            <a href={card.href} aria-label={`${content.action}: ${card.title}`}>
              {content.action}
              <span aria-hidden="true">→</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="guide-examples-note">{content.note}</p>
    </section>
  );
}
