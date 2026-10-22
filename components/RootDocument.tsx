import localFont from "next/font/local";
const manrope = localFont({ src: "../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2", display: "swap", variable: "--font-manrope", weight: "200 800" });
import type { ReactNode } from "react";
import { PrivacyProvider } from "./PrivacyProvider";
import { ServiceWorkerRegistration } from "./ServiceWorkerRegistration";
import type { Locale } from "../lib/i18n";
import { localeCopy } from "../lib/locales";
export function RootDocument({
  children,
  locale,
}: {
  children: ReactNode;
  locale: Locale;
}) {
  return (
    <html lang={locale}>
      <body className={manrope.variable}>
        <PrivacyProvider copy={localeCopy[locale].privacy}>
          <ServiceWorkerRegistration />
          {children}
        </PrivacyProvider>
      </body>
    </html>
  );
}
