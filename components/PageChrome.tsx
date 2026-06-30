import Link from 'next/link';
import type { ReactNode } from 'react';
import { monetization, kofiUrl } from '../lib/monetization/config';

export function PageChrome({ children, lang = 'en' }: { children: ReactNode; lang?: 'en' | 'es' }) {
  const nav = lang === 'es'
    ? [{ href: '/calculadora-de-sueno', label: 'Calculadora' }, { href: '/siesta', label: 'Siesta' }, { href: '/sleep-calculator', label: 'EN' }]
    : [{ href: '/sleep-calculator', label: 'Calc' }, { href: '/nap-calculator', label: 'Nap' }, { href: '/calculadora-de-sueno', label: 'ES' }];
  const donateLabel = lang === 'es' ? '☕ Invitame un café' : '☕ Buy me a coffee';
  return (
    <>
      <main id="main-content" className="page-shell">
        <header className="topbar">
          <Link className="brand" href="/" aria-label="sleeplike home">
            <span className="brand-mark" aria-hidden="true">☾</span>
          </Link>
          <nav className="nav" aria-label="Primary navigation">
            {nav.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          </nav>
        </header>
        {children}
        <footer className="footer">
          <a className="donate-link" href={kofiUrl()} target="_blank" rel="noopener">{donateLabel}</a>
          <span>Wellness tool · No medical advice</span>
        </footer>
      </main>
    </>
  );
}
