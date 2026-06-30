import Link from 'next/link';
import type { ReactNode } from 'react';

export function PageChrome({ children, lang = 'en' }: { children: ReactNode; lang?: 'en' | 'es' }) {
  const nav = lang === 'es'
    ? [{ href: '/calculadora-de-sueno', label: 'Calculadora' }, { href: '/siesta', label: 'Siesta' }, { href: '/sleep-calculator', label: 'EN' }]
    : [{ href: '/sleep-calculator', label: 'Calculator' }, { href: '/nap-calculator', label: 'Nap' }, { href: '/calculadora-de-sueno', label: 'ES' }];
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to calculator</a>
      <main id="main-content" className="page-shell">
        <header className="topbar">
          <Link className="brand" href="/" aria-label="Sueño Claro home">
            <span className="brand-mark" aria-hidden="true">☾</span>
            <span className="brand-text"><strong>Sueño Claro</strong><small>private sleep timing</small></span>
          </Link>
          <nav className="nav" aria-label="Primary navigation">
            {nav.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          </nav>
        </header>
        {children}
        <footer className="footer">
          <span>Sueño Claro is an educational wellness tool, not medical advice.</span>
          <span>No account · No microphone · No tracking</span>
        </footer>
      </main>
    </>
  );
}
