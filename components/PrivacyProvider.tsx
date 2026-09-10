"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
  type ReactNode,
} from "react";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import { isPublicProduction, monetization } from "../lib/monetization/config";
import {
  permitsNonPersonalizedAds,
  publicPageUrl,
  type TcfData,
} from "../lib/privacy";
import type { Locale } from "../lib/site";
declare global {
  interface Window {
    __tcfapi?: (
      command: string,
      version: number,
      callback: (data: TcfData, success: boolean) => void,
      parameter?: number,
    ) => void;
    googlefc?: {
      callbackQueue?: Array<unknown>;
      showRevocationMessage?: () => void;
    };
  }
}
const PrivacyContext = createContext({
  ready: false,
  adsAllowed: false,
  analyticsAllowed: false,
});
export const usePrivacy = () => useContext(PrivacyContext);
export function PrivacyProvider({
  children,
  locale,
}: {
  children: ReactNode;
  locale: Locale;
}) {
  const [ready, setReady] = useState(false);
  const [production, setProduction] = useState(false);
  const [online, setOnline] = useState(true);
  const [adsAllowed, setAdsAllowed] = useState(false);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);
  const [open, setOpen] = useState(false);
  const es = locale === "es";
  const analyticsPermission = useRef(false);
  const beforeSend = useCallback(
    (event: { type: "pageview" | "event"; url: string }) =>
      analyticsPermission.current
        ? { ...event, url: publicPageUrl(event.url) }
        : null,
    [],
  );
  useEffect(() => {
    // The calculator imports shared settings in a layout effect, before any third-party script.
    history.replaceState(null, "", location.pathname);
    // An inbound legacy URL in document.referrer cannot be changed reliably.
    // Skip third parties for this document; our no-referrer navigation is clean thereafter.
    let cleanReferrer = true;
    try {
      if (document.referrer) {
        const referrer = new URL(document.referrer);
        cleanReferrer = !referrer.search && !referrer.hash;
      }
    } catch {
      cleanReferrer = false;
    }
    setProduction(isPublicProduction(location.hostname) && cleanReferrer);
    try {
      const allowed = localStorage.getItem("sleeplike-analytics") === "yes";
      analyticsPermission.current = allowed;
      setAnalyticsAllowed(allowed);
    } catch {}
    setReady(true);
    const update = () => {
      setOnline(navigator.onLine);
      if (!navigator.onLine) setAdsAllowed(false);
    };
    update();
    const storage = (event: StorageEvent) => {
      if (event.key === "sleeplike-analytics" || event.key === null) {
        const allowed = event.key !== null && event.newValue === "yes";
        analyticsPermission.current = allowed;
        setAnalyticsAllowed(allowed);
      }
    };
    window.addEventListener("storage", storage);
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("storage", storage);
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);
  useEffect(() => {
    if (!production || !online || !monetization.enabled) return;
    let listenerId: number | undefined;
    let subscribed = false;
    let active = true;
    const subscribe = () => {
      if (!window.__tcfapi || subscribed) return;
      subscribed = true;
      window.__tcfapi("addEventListener", 2, (data, success) => {
        if (!active) return;
        listenerId = data?.listenerId;
        setAdsAllowed(permitsNonPersonalizedAds(data, success));
      });
    };
    subscribe();
    const timer = window.setInterval(subscribe, 500);
    const timeout = window.setTimeout(() => clearInterval(timer), 15000);
    return () => {
      active = false;
      clearInterval(timer);
      clearTimeout(timeout);
      if (listenerId !== undefined)
        window.__tcfapi?.("removeEventListener", 2, () => {}, listenerId);
    };
  }, [production, online]);
  function setAnalytics(value: boolean) {
    analyticsPermission.current = value;
    setAnalyticsAllowed(value);
    try {
      localStorage.setItem("sleeplike-analytics", value ? "yes" : "no");
    } catch {}
  }
  return (
    <PrivacyContext.Provider
      value={{
        ready,
        adsAllowed: ready && production && online && adsAllowed,
        analyticsAllowed: ready && production && analyticsAllowed,
      }}
    >
      {children}
      {ready && production && analyticsAllowed && (
        <Analytics beforeSend={beforeSend} />
      )}
      {ready && production && online && monetization.enabled && (
        <Script
          id="google-consent"
          src={monetization.cmpSrc}
          strategy="afterInteractive"
          onError={() => setAdsAllowed(false)}
        />
      )}
      <div className="privacy-access">
        <button
          type="button"
          className="text-button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="privacy-preferences"
        >
          {es ? "Preferencias de privacidad" : "Privacy preferences"}
        </button>
      </div>
      {open && (
        <section
          id="privacy-preferences"
          className="privacy-panel"
          aria-label={es ? "Preferencias de privacidad" : "Privacy preferences"}
        >
          <h2>
            {es ? "Tu descanso. Tus decisiones." : "Your rest. Your choices."}
          </h2>
          <p>
            {es
              ? "El cálculo se realiza en tu dispositivo. Podés permitir estadísticas agregadas; no enviamos tus horarios ni resultados."
              : "Calculations run on your device. You can allow aggregate usage statistics; we do not send your sleep times or results."}
          </p>
          <label className="check-label">
            <input
              type="checkbox"
              checked={analyticsAllowed}
              onChange={(e) => setAnalytics(e.target.checked)}
            />
            {es
              ? "Permitir estadísticas agregadas"
              : "Allow aggregate usage statistics"}
          </label>
          <p>
            {monetization.enabled
              ? es
                ? "Los anuncios no personalizados requieren consentimiento independiente."
                : "Non-personalized ads require a separate consent choice."
              : es
                ? "La publicidad todavía no está habilitada."
                : "Advertising is not currently enabled."}
          </p>
          {monetization.enabled && (
            <button
              type="button"
              className="secondary-button"
              onClick={() => {
                setAdsAllowed(false);
                window.googlefc?.showRevocationMessage?.();
              }}
            >
              {es
                ? "Revisar consentimiento de anuncios"
                : "Review advertising consent"}
            </button>
          )}
          <button
            type="button"
            className="secondary-button"
            onClick={() => setOpen(false)}
          >
            {es ? "Cerrar" : "Close"}
          </button>
        </section>
      )}
    </PrivacyContext.Provider>
  );
}
