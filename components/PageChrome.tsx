import type { ReactNode } from "react";
import { homePath, locales, localeInfo, localizedPaths, type Locale, type PageKey } from "../lib/i18n";
import { localeCopy } from "../lib/locales";
import { pages } from "../lib/content/pages";

export function PageChrome({ children, lang, pageKey }: { children: ReactNode; lang: Locale; pageKey: PageKey }) {
  const c = localeCopy[lang].chrome;
  const links = (["about", "contact", "methodology", "privacy", "terms"] as const).map((key) => [localizedPaths[lang][key], c[key]]);
  return (
    <>
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
        <div>
          <a className="brand" href={homePath(lang)}>SleepLike<span className="brand-dot">.</span></a>
          <p>{c.tagline}</p>
          <p className="muted">{c.caution}</p>
        </div>
        <nav aria-label={c.information}>
          {links.map(([href, label]) => <a href={href} key={href}>{label}</a>)}
        </nav>
        <p className="footer-credit">© 2026 SleepLike · <a href="https://maat.work">MaatWork</a></p>
      </footer>
    </>
  );
}
