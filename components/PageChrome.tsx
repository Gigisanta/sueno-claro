import type { ReactNode } from "react";
import { homePath, type Locale } from "../lib/site";
export function PageChrome({
  children,
  lang,
  pairPath,
}: {
  children: ReactNode;
  lang: Locale;
  pairPath: string;
}) {
  const es = lang === "es";
  const links = es
    ? [
        ["/acerca-de", "Acerca de"],
        ["/contacto", "Contacto"],
        ["/metodologia", "Metodología"],
        ["/privacidad", "Privacidad"],
        ["/terminos", "Términos"],
      ]
    : [
        ["/about", "About"],
        ["/contact", "Contact"],
        ["/methodology", "Methodology"],
        ["/privacy", "Privacy"],
        ["/terms", "Terms"],
      ];
  return (
    <>
      <a className="skip-link" href="#main-content">
        {es ? "Saltar al contenido" : "Skip to content"}
      </a>
      <header className="topbar">
        <a
          className="brand"
          href={homePath(lang)}
          aria-label={es ? "SleepLike, inicio" : "SleepLike home"}
        >
          <span className="brand-mark" aria-hidden="true">
            ◒
          </span>
          SleepLike<span className="brand-dot">.</span>
        </a>
        <nav aria-label={es ? "Navegación principal" : "Main navigation"}>
          <a href={es ? "/siesta" : "/nap-calculator"}>
            {es ? "Siestas" : "Naps"}
          </a>
          <a href={es ? "/ciclos-de-sueno" : "/sleep-cycles"}>
            {es ? "Guías" : "Guides"}
          </a>
          <a
            className="language-link"
            href={pairPath}
            hrefLang={es ? "en" : "es"}
            lang={es ? "en" : "es"}
          >
            {es ? "English" : "Español"}
            <span aria-hidden="true"> ↗</span>
          </a>
        </nav>
      </header>
      <main id="main-content">{children}</main>
      <footer className="footer">
        <div>
          <a className="brand" href={homePath(lang)}>
            SleepLike<span className="brand-dot">.</span>
          </a>
          <p>
            {es
              ? "Un poco de claridad antes de dormir."
              : "A little clarity before you sleep."}
          </p>
          <p className="muted">
            {es
              ? "Herramienta educativa para adultos. No ofrece diagnóstico médico."
              : "Educational tool for adults. Not a medical diagnosis."}
          </p>
        </div>
        <nav aria-label={es ? "Información del sitio" : "Site information"}>
          {links.map(([href, label]) => (
            <a href={href} key={href}>
              {label}
            </a>
          ))}
        </nav>
        <p className="footer-credit">
          © 2026 SleepLike · <a href="https://maat.work">MaatWork</a>
        </p>
      </footer>
    </>
  );
}
