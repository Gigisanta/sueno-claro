import { Fragment } from "react";
import { getGuideExamples } from "../lib/content/examples";
import { getPage } from "../lib/content/pages";
import { structuredData } from "../lib/metadata";
import { homePath, localizedPaths } from "../lib/i18n";
import { localeCopy } from "../lib/locales";
import { CalculatorShell } from "./CalculatorShell";
import { PageChrome } from "./PageChrome";
import { AdSlot } from "./AdSlot";
import { GuideExamples } from "./GuideExamples";
import { SharePage } from "./SharePage";
import { NightPicture } from "./NightPicture";
export function SitePage({ path }: { path: string }) {
  const page = getPage(path)!;
  const c = localeCopy[page.locale];
  const examples =
    page.kind === "guide" ? getGuideExamples(page.path) : undefined;
  const splitAt = page.heading.length > 50
    ? (page.heading.indexOf(":") > 0 && page.heading.indexOf(":") < 42
      ? page.heading.indexOf(":")
      : page.heading.lastIndexOf(" ", 34))
    : -1;
  const heading = splitAt > 0 ? page.heading.slice(0, splitAt) : page.heading;
  const headingTail = splitAt > 0 ? page.heading.slice(splitAt).replace(/^:\s*/, "").trim() : "";
  return (
    <PageChrome lang={page.locale} pageKey={page.key}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData(page)).replace(/</g, "\\u003c"),
        }}
      />
      <div className={`page-content page-${page.kind}`}>
        <header className="page-intro">
          <h1 className={heading.length > 38 ? "heading-long" : undefined}>{heading}</h1>
          {headingTail && <p className="heading-tail">{headingTail}</p>}
          <p className="intro-text">{page.intro}</p>
          {page.kind !== "tool" && (
            <p className="byline">
              {c.editorial.reviewed}{" "}
              <time dateTime={page.updated}>
                {new Intl.DateTimeFormat(page.locale, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  timeZone: "UTC",
                }).format(new Date(page.updated))}
              </time>
            </p>
          )}
          {page.path !== homePath(page.locale) && (
            <nav className="breadcrumb" aria-label={c.editorial.breadcrumb}>
              <a href={homePath(page.locale)}>{c.editorial.home}</a>
              <span aria-hidden="true">/</span>
              <span>{page.title}</span>
            </nav>
          )}
          {page.kind === "guide" && (
            <a className="calculate-button guide-action" href={`${homePath(page.locale)}#calculator`}>
              {c.editorial.calculator}<span aria-hidden="true">↗</span>
            </a>
          )}
          {page.kind !== "tool" && <NightPicture alt={c.taste.nightAlt} />}
        </header>
        {page.kind === "tool" && (
          <CalculatorShell lang={page.locale} initialMode={page.mode} copy={c.calculator} taste={c.taste} reminders={c.reminders} advertisement={c.advertisement} />
        )}
        {page.key === "home" && (
          <nav className="home-resources" aria-labelledby="home-resources-heading">
            <h2 id="home-resources-heading">{c.editorial.related}</h2>
            <div>
              {(["schedule", "nap", "bedtime", "cycles", "duration"] as const).map((key) => {
                const resource = getPage(localizedPaths[page.locale][key])!;
                return <a key={key} href={resource.path}>{resource.title}</a>;
              })}
            </div>
          </nav>
        )}
        <article
          className="editorial"
          aria-label={c.editorial.article}
        >
          {page.kind === "guide" && (
            <nav
              className="contents"
              aria-label={c.editorial.contents}
            >
              <strong>{c.editorial.contents}</strong>
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
                <h2 className={section.heading.length > 66 ? "heading-very-long" : section.heading.length > 44 ? "heading-long" : undefined}>{section.heading}</h2>
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
                <AdSlot placement="article" eligible label={c.advertisement} />
              )}
            </div>
          ))}
          {page.sources.length > 0 && (
            <section className="sources">
              <h2>{c.editorial.sources}</h2>
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
                {c.editorial.sourceNote}
              </p>
            </section>
          )}
        </article>
        {page.kind === "guide" && <SharePage path={page.path} title={page.title} copy={c.share} />}
        {page.related.length > 0 && (
          <aside className="related">
            <h2>{c.editorial.related}</h2>
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
