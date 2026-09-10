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
      <body>
        <PrivacyProvider locale={locale}>
          <ServiceWorkerRegistration />
          {children}
        </PrivacyProvider>
      </body>
    </html>
  );
}
