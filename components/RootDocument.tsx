import localFont from "next/font/local";
const manrope = localFont({ src: "../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2", display: "swap", variable: "--font-manrope", weight: "200 800" });
import type { ReactNode } from "react";
import { PrivacyProvider } from "./PrivacyProvider";
import { ServiceWorkerRegistration } from "./ServiceWorkerRegistration";
export function RootDocument({
  children,
  locale,
}: {
  children: ReactNode;
  locale: "en" | "es";
}) {
  return (
    <html lang={locale}>
      <body className={manrope.variable}>
        <PrivacyProvider locale={locale}>
          <ServiceWorkerRegistration />
          {children}
        </PrivacyProvider>
      </body>
    </html>
  );
}
