import type { ReactNode } from "react";
import { homePath, locales, localeInfo, localizedPaths, type Locale, type PageKey } from "../lib/i18n";
import { localeCopy } from "../lib/locales";
import { pages } from "../lib/content/pages";
import credits from "../public/open/credits.json";
import { SiteMotion } from "./SiteMotion";

export function PageChrome({ children, lang, pageKey }: { children: ReactNode; lang: Locale; pageKey: PageKey }) {
  const c = localeCopy[lang].chrome;
  const t = localeCopy[lang].taste;
  const links = (["about", "contact", "methodology", "privacy", "terms"] as const).map((key) => [localizedPaths[lang][key], c[key]]);
  return (
    <>
      <SiteMotion />
      <a className="skip-link" href="#main-content">{c.skip}</a>
      <header className="topbar">
        <a className="brand" href={homePath(lang)} aria-label={c.home}>
          <span className="brand-mark" aria-hidden="true">◒</span>
          SleepLike<span className="brand-dot">.</span>
        </a>
        <nav aria-label={c.navigation}>
          <a href={localizedPaths[lang].nap}>{c.naps}</a>
          <a href="#sleep-resources">{c.guides}</a>
          <details className="language-switcher">
            <summary aria-label={c.languages}>{lang.toUpperCase()}</summary>
            <ul aria-label={c.languages}>
              {locales.map((locale) => (
                <li key={locale}>
                  <a href={localizedPaths[locale][pageKey]} hrefLang={locale} lang={locale} aria-current={locale === lang ? "page" : undefined}>
                    {localeInfo[locale].name}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </nav>
      </header>
      <main id="main-content">{children}</main>
      <footer className="footer">
        <section className="night-atlas" aria-labelledby="night-atlas-heading">
          <h2 id="night-atlas-heading">{c.tagline}</h2>
          <div className="night-atlas-pictures">
            {["aurora", "moon", "stars"].map((subject, index) => (
              <img key={subject} src={`/open/night-${subject}.jpg`} width="1200" height="800" alt={t.galleryAlts[index]} loading="lazy" />
            ))}
          </div>
        </section>
        <nav id="sleep-resources" className="resource-directory" aria-label={c.resources}>
          {(["tool", "guide"] as const).map((kind) => (
            <div key={kind}>
              <h2>{kind === "tool" ? c.tools : c.learn}</h2>
              {pages.filter((page) => page.locale === lang && page.kind === kind).map((page) => (
                <a key={page.path} href={page.path}>{page.title}</a>
              ))}
            </div>
          ))}
        </nav>
        <div className="footer-close">
          <a className="footer-contact" href={localizedPaths[lang].contact}>{c.contact} <span aria-hidden="true">↗</span></a>
          <a className="brand" href={homePath(lang)}>SleepLike<span className="brand-dot">.</span></a>
          <p>{c.caution}</p>
        </div>
        <nav className="footer-information" aria-label={c.information}>
          {links.map(([href, label]) => <a href={href} key={href}>{label}</a>)}
        </nav>
        <div className="photo-credits">
          <p>{t.photoCredit} · {t.publicDomain}</p>
          {credits.map((image) => (
            <p key={image.file}>
              <a href={image.source} rel="external">{image.title}</a> · {image.author} · <a href={image.licenseUrl} rel="external">{t.publicDomain}</a>
            </p>
          ))}
        </div>
        <p className="footer-credit">© 2026 SleepLike · <a href="https://maat.work">MaatWork</a></p>
      </footer>
    </>
  );
}
