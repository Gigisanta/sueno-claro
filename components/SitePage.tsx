import { Fragment } from "react";
import { getGuideExamples } from "../lib/content/examples";
import { getPage } from "../lib/content/pages";
import { structuredData } from "../lib/metadata";
import { homePath } from "../lib/site";
import { CalculatorShell } from "./CalculatorShell";
import { PageChrome } from "./PageChrome";
import { AdSlot } from "./AdSlot";
import { GuideExamples } from "./GuideExamples";
import { SharePage } from "./SharePage";
export function SitePage({ path }: { path: string }) {
  const page = getPage(path)!;
  const es = page.locale === "es";
  const examples =
    page.kind === "guide" ? getGuideExamples(page.path) : undefined;
  return (
    <PageChrome lang={page.locale} pairPath={page.pairPath}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData(page)).replace(/</g, "\\u003c"),
        }}
      />
      <div className={`page-content page-${page.kind}`}>
        <header className="page-intro">
          {page.path !== homePath(page.locale) && (
            <nav
              className="breadcrumb"
              aria-label={es ? "Ruta de navegación" : "Breadcrumb"}
            >
              <a href={homePath(page.locale)}>{es ? "Inicio" : "Home"}</a>
              <span aria-hidden="true">/</span>
              <span>{page.title}</span>
            </nav>
          )}
          <p className="eyebrow">
            {page.kind === "tool"
              ? es
                ? "TU NOCHE, CON MÁS CLARIDAD"
                : "MAKE ROOM FOR REST"
              : page.kind === "guide"
                ? es
                  ? "LA GUÍA DE SLEEPLIKE"
                  : "THE SLEEPLIKE GUIDE"
                : "SLEEPLIKE"}
          </p>
          <h1>{page.heading}</h1>
          <p className="intro-text">{page.intro}</p>
          {page.kind !== "tool" && (
            <p className="byline">
              {es
                ? "Por el equipo de SleepLike · Revisado el"
                : "By the SleepLike team · Reviewed"}{" "}
              <time dateTime={page.updated}>
                {new Intl.DateTimeFormat(es ? "es" : "en", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  timeZone: "UTC",
                }).format(new Date(page.updated))}
              </time>
            </p>
          )}
        </header>
        {page.kind === "tool" && (
          <CalculatorShell lang={page.locale} initialMode={page.mode} />
        )}
        <article
          className="editorial"
          aria-label={es ? "Guía y método" : "Guide and method"}
        >
          {page.kind === "guide" && (
            <nav
              className="contents"
              aria-label={es ? "En esta guía" : "In this guide"}
            >
              <strong>{es ? "En esta guía" : "In this guide"}</strong>
              {page.sections.map((section) => (
                <Fragment key={section.id}>
                  <a href={`#${section.id}`}>{section.heading}</a>
                  {examples?.afterSectionId === section.id && (
                    <a href="#guide-examples">{examples.heading}</a>
                  )}
                </Fragment>
              ))}
            </nav>
          )}
          {page.sections.map((section, index) => (
            <div key={section.id}>
              <section id={section.id} className="content-section">
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
                {section.bullets && (
                  <ul>
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.table && (
                  <div
                    className="table-scroll"
                    role="region"
                    aria-label={section.heading}
                    tabIndex={0}
                  >
                    <table>
                      <thead>
                        <tr>
                          {section.table.headers.map((header) => (
                            <th key={header} scope="col">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row, i) => (
                          <tr key={i}>
                            {row.map((cell, j) => (
                              <td key={j}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
              {examples?.afterSectionId === section.id && (
                <GuideExamples content={examples} />
              )}
              {page.kind === "guide" && (index === 1 || index === 3) && (
                <AdSlot placement="article" eligible locale={page.locale} />
              )}
            </div>
          ))}
          {page.sources.length > 0 && (
            <section className="sources">
              <h2>{es ? "Fuentes y revisión" : "Sources and review"}</h2>
              <ul>
                {page.sources.map((source) => (
                  <li key={source.url}>
                    <a href={source.url} rel="external">
                      {source.title}
                      <span aria-hidden="true"> ↗</span>
                    </a>
                  </li>
                ))}
              </ul>
              <p>
                {es
                  ? "Edición: equipo de SleepLike. Contenido educativo, sin revisión médica acreditada."
                  : "Edited by the SleepLike team. Educational content, without accredited medical review."}
              </p>
            </section>
          )}
        </article>
        {page.kind === "guide" && <SharePage path={page.path} title={page.title} locale={page.locale} />}
        {page.related.length > 0 && (
          <aside className="related">
            <h2>{es ? "Sigue explorando" : "Keep exploring"}</h2>
            <div>
              {page.related.map((path) => {
                const related = getPage(path);
                return related ? (
                  <a href={path} key={path}>
                    {related.title}
                    <span aria-hidden="true">↗</span>
                  </a>
                ) : null;
              })}
            </div>
          </aside>
        )}
      </div>
    </PageChrome>
  );
}
