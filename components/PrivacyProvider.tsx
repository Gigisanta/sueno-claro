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
      callback: (data: TcfData | null, success: boolean) => void,
      parameter?: number,
    ) => void;
    adsbygoogle?: Array<Record<string, unknown>> & {
      pauseAdRequests?: number;
      requestNonPersonalizedAds?: number;
    };
    googlefc?: {
      callbackQueue?: { push: (data: unknown) => number };
      showRevocationMessage?: () => void;
    };
  }
}

const adsenseBootstrap = `
  window.adsbygoogle = window.adsbygoogle || [];
  window.adsbygoogle.pauseAdRequests = 1;
  window.adsbygoogle.requestNonPersonalizedAds = 1;
  window.googlefc = window.googlefc || {};
  window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];
`;

const ADS_OPT_IN_KEY = "sleeplike-ads";

function verifyAdsBroadcastChannel(channel: BroadcastChannel) {
  return new Promise<boolean>((resolve) => {
    let probe: BroadcastChannel | null = null;
    let timeout: number | undefined;
    let settled = false;
    const operativeHandler = channel.onmessage;
    const finish = (available: boolean) => {
      if (settled) return;
      settled = true;
      if (timeout !== undefined) window.clearTimeout(timeout);
      try {
        channel.onmessage = operativeHandler;
      } catch {}
      try {
        probe?.close();
      } catch {}
      resolve(available);
    };

    try {
      const Channel = window.BroadcastChannel;
      if (typeof Channel !== "function") {
        finish(false);
        return;
      }
      probe = new Channel("sleeplike-ads");
      const token = `${Date.now()}-${Math.random()}`;
      let challengeReceived = false;
      channel.onmessage = (event) => {
        try {
          operativeHandler?.call(channel, event);
        } catch {
          finish(false);
          return;
        }
        if (
          challengeReceived &&
          event.data?.type === "health-check-ack" &&
          event.data?.token === token
        )
          finish(true);
      };
      probe.onmessage = (event) => {
        if (
          event.data?.type === "health-check" &&
          event.data?.token === token
        ) {
          challengeReceived = true;
          try {
            probe?.postMessage({ type: "health-check-ack", token });
          } catch {
            finish(false);
          }
        }
      };
      timeout = window.setTimeout(() => finish(false), 1000);
      channel.postMessage({ type: "health-check", token });
    } catch {
      finish(false);
    }
  });
}

function setAdRequestPaused(paused: boolean, initialize = false) {
  if (!window.adsbygoogle && !initialize) return;
  window.adsbygoogle = window.adsbygoogle || [];
  window.adsbygoogle.requestNonPersonalizedAds = 1;
  window.adsbygoogle.pauseAdRequests = paused ? 1 : 0;
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
  const [adsenseReady, setAdsenseReady] = useState(false);
  const [adsOptIn, setAdsOptIn] = useState(false);
  const [adsStorageAvailable, setAdsStorageAvailable] = useState(true);
  const [adsSyncAvailable, setAdsSyncAvailable] = useState(false);
  const [adsStorageError, setAdsStorageError] = useState(false);
  const [adsRevocationError, setAdsRevocationError] = useState(false);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);
  const [open, setOpen] = useState(false);
  const es = locale === "es";
  const analyticsPermission = useRef(false);
  const adsOptInRef = useRef(false);
  const adsStorageAvailableRef = useRef(true);
  const adsSyncAvailableRef = useRef(false);
  const adsChannelRef = useRef<BroadcastChannel | null>(null);
  const adsenseReadyRef = useRef(false);
  const adConsentRef = useRef(false);
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
    try {
      // A previous visit's stored grant is never sufficient to load advertising.
      localStorage.getItem(ADS_OPT_IN_KEY);
    } catch {
      adsStorageAvailableRef.current = false;
      setAdsStorageAvailable(false);
      setAdsStorageError(true);
    }
    setReady(true);
    const update = () => {
      const connected = navigator.onLine;
      setOnline(connected);
      if (!connected) {
        if (monetization.enabled) {
          try {
            setAdRequestPaused(true);
          } catch {}
        }
        adConsentRef.current = false;
        adsenseReadyRef.current = false;
        setAdsAllowed(false);
        setAdsenseReady(false);
      }
    };
    update();
    const storage = (event: StorageEvent) => {
      if (event.key === "sleeplike-analytics" || event.key === null) {
        const allowed = event.key !== null && event.newValue === "yes";
        analyticsPermission.current = allowed;
        setAnalyticsAllowed(allowed);
      }
      if (
        event.key === null ||
        (event.key === ADS_OPT_IN_KEY && event.newValue !== "yes")
      ) {
        adsStorageAvailableRef.current = true;
        setAdsStorageAvailable(true);
        setAdsStorageError(false);
        setAdsRevocationError(false);
        stopAdvertising();
      }
    };
    let channel: BroadcastChannel | null = null;
    let active = true;
    try {
      if (typeof window.BroadcastChannel === "function") {
        channel = new window.BroadcastChannel("sleeplike-ads");
        channel.onmessage = (event) => {
          if (event.data?.type === "revoke") stopAdvertising();
        };
      }
    } catch {}
    adsChannelRef.current = channel;
    if (channel) {
      void verifyAdsBroadcastChannel(channel).then((available) => {
        if (!active) return;
        adsSyncAvailableRef.current = available;
        setAdsSyncAvailable(available);
      });
    } else {
      adsSyncAvailableRef.current = false;
      setAdsSyncAvailable(false);
    }
    window.addEventListener("storage", storage);
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      active = false;
      window.removeEventListener("storage", storage);
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
      channel?.close();
      adsChannelRef.current = null;
    };
  }, []);
  useEffect(() => {
    if (!monetization.enabled) return;
    if (!adsOptIn || !adsStorageAvailable || !adsSyncAvailable) {
      // A revoked or unavailable preference must pause an SDK already in memory.
      setAdRequestPaused(true);
      return;
    }
    try {
      setAdRequestPaused(
        !(production && navigator.onLine && adsenseReadyRef.current && adConsentRef.current),
      );
    } catch {
      setAdsenseReady(false);
      setAdsAllowed(false);
    }
  }, [
    adsAllowed,
    adsOptIn,
    adsStorageAvailable,
    adsSyncAvailable,
    adsenseReady,
    online,
    production,
  ]);
  useEffect(() => {
    if (
      !ready ||
      !production ||
      !online ||
      !monetization.enabled ||
      !adsOptIn ||
      !adsStorageAvailable ||
      !adsSyncAvailable
    )
      return;
    let listenerId: number | undefined;
    let subscribed = false;
    let active = true;

    const deny = () => {
      if (!active) return;
      adConsentRef.current = false;
      try {
        setAdRequestPaused(true);
      } catch {}
      setAdsAllowed(false);
    };
    const onConsent = (data: TcfData | null, success: boolean) => {
      if (!active) return;
      if (data?.listenerId !== undefined) listenerId = data.listenerId;
      try {
        const allowed =
          adsOptInRef.current &&
          adsStorageAvailableRef.current &&
          adsSyncAvailableRef.current &&
          !!data &&
          permitsNonPersonalizedAds(data, success);
        adConsentRef.current = allowed;
        setAdRequestPaused(!allowed || !adsenseReadyRef.current);
        setAdsAllowed(allowed);
      } catch {
        deny();
      }
    };
    const subscribe = () => {
      const queue = window.googlefc?.callbackQueue;
      if (!queue || typeof queue.push !== "function" || subscribed) return;
      subscribed = true;
      try {
        queue.push({
          CONSENT_DATA_READY: () => {
            if (!active) return;
            const tcfapi = window.__tcfapi;
            if (typeof tcfapi !== "function") {
              deny();
              return;
            }
            try {
              tcfapi("addEventListener", 2, onConsent);
            } catch {
              deny();
            }
          },
        });
      } catch {
        subscribed = false;
        deny();
      }
    };

    deny();
    subscribe();
    const timer = window.setInterval(subscribe, 250);
    const timeout = window.setTimeout(() => clearInterval(timer), 15000);
    return () => {
      active = false;
      clearInterval(timer);
      clearTimeout(timeout);
      if (listenerId !== undefined) {
        try {
          window.__tcfapi?.("removeEventListener", 2, () => {}, listenerId);
        } catch {}
      }
    };
  }, [adsOptIn, adsStorageAvailable, adsSyncAvailable, online, production, ready]);
  function setAnalytics(value: boolean) {
    analyticsPermission.current = value;
    setAnalyticsAllowed(value);
    try {
      localStorage.setItem("sleeplike-analytics", value ? "yes" : "no");
    } catch {}
  }
  function queueRevocationMessage() {
    adConsentRef.current = false;
    try {
      setAdRequestPaused(true);
    } catch {}
    setAdsAllowed(false);
    const queue = window.googlefc?.callbackQueue;
    if (!queue || typeof queue.push !== "function") return;
    try {
      queue.push({
        CONSENT_API_READY: () => {
          try {
            window.googlefc?.showRevocationMessage?.();
          } catch {
            setAdsAllowed(false);
          }
        },
      });
    } catch {
      setAdsAllowed(false);
    }
  }
  function stopAdvertising() {
    adsOptInRef.current = false;
    adConsentRef.current = false;
    try {
      setAdRequestPaused(true);
    } catch {}
    setAdsOptIn(false);
    setAdsAllowed(false);
    queueRevocationMessage();
  }
  function setAdvertisingPreference(value: boolean) {
    if (!value) {
      stopAdvertising();
    }
    if (value && !adsSyncAvailableRef.current) {
      setAdsStorageError(true);
      setAdsRevocationError(false);
      setAdsOptIn(false);
      setAdsAllowed(false);
      setAdRequestPaused(true);
      return;
    }
    if (value && !adsStorageAvailableRef.current) {
      setAdsStorageError(true);
      setAdsRevocationError(false);
      setAdsOptIn(false);
      setAdsAllowed(false);
      return;
    }
    try {
      localStorage.setItem(ADS_OPT_IN_KEY, value ? "yes" : "no");
    } catch {
      let fallbackSucceeded = false;
      try {
        // Clear legacy grants when possible; new visits ignore them regardless.
        localStorage.removeItem(ADS_OPT_IN_KEY);
        fallbackSucceeded = true;
      } catch {}
      if (!value && !fallbackSucceeded) {
        try {
          adsChannelRef.current?.postMessage({ type: "revoke" });
        } catch {}
      }
      adsStorageAvailableRef.current = false;
      setAdsStorageAvailable(false);
      setAdsStorageError(true);
      setAdsRevocationError(!value);
      if (value) stopAdvertising();
      return;
    }
    adsStorageAvailableRef.current = true;
    setAdsStorageAvailable(true);
    setAdsStorageError(false);
    setAdsRevocationError(false);
    adsOptInRef.current = value;
    setAdsOptIn(value);
    if (value) {
      adConsentRef.current = false;
      setAdsAllowed(false);
      setAdRequestPaused(true, true);
    }
  }
  return (
    <PrivacyContext.Provider
      value={{
        ready,
        adsAllowed:
          ready &&
          production &&
          online &&
          adsStorageAvailable &&
          adsSyncAvailable &&
          adsOptIn &&
          adsenseReady &&
          adsAllowed,
        analyticsAllowed: ready && production && analyticsAllowed,
      }}
    >
      {children}
      {ready && production && analyticsAllowed && (
        <Analytics beforeSend={beforeSend} />
      )}
      {ready &&
        production &&
        online &&
        monetization.enabled &&
        adsStorageAvailable &&
        adsSyncAvailable &&
        adsOptIn && (
          <>
            <Script id="adsense-bootstrap" strategy="afterInteractive">
              {adsenseBootstrap}
            </Script>
            <Script
              id="adsense-sdk"
              src={monetization.adsenseSrc}
              strategy="afterInteractive"
              crossOrigin="anonymous"
              onReady={() => {
                try {
                  adsenseReadyRef.current = true;
                  setAdRequestPaused(
                    !(
                      adsOptInRef.current &&
                      adsStorageAvailableRef.current &&
                      adConsentRef.current
                    ),
                  );
                  setAdsenseReady(true);
                } catch {
                  adConsentRef.current = false;
                  adsenseReadyRef.current = false;
                  try {
                    setAdRequestPaused(true);
                  } catch {}
                  setAdsenseReady(false);
                  setAdsAllowed(false);
                }
              }}
              onError={() => {
                adConsentRef.current = false;
                adsenseReadyRef.current = false;
                try {
                  setAdRequestPaused(true);
                } catch {}
                setAdsenseReady(false);
                setAdsAllowed(false);
              }}
            />
          </>
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
                ? "Los servicios publicitarios sólo se cargan si los permitís en esta visita. En visitas futuras vas a tener que volver a aceptarlos; el CMP también requiere una elección afirmativa."
                : "Advertising services load only if you allow them on this visit. You’ll need to allow them again on future visits, and the CMP also requires an affirmative choice."
              : es
                ? "La publicidad todavía no está habilitada."
                : "Advertising is not currently enabled."}
          </p>
          {monetization.enabled && (
            <>
              <label className="check-label">
                <input
                  type="checkbox"
                  checked={adsOptIn}
                  onChange={(e) => setAdvertisingPreference(e.target.checked)}
                />
                {es
                  ? "Permitir anuncios no personalizados y cargar servicios publicitarios"
                  : "Allow non-personalized ads and load advertising services"}
              </label>
              {adsStorageError && (
                <p role="status" aria-live="polite">
                  {adsRevocationError
                    ? es
                      ? "No se pudo guardar la revocación. La publicidad queda apagada y las decisiones guardadas no se reutilizan en visitas futuras."
                      : "The revocation could not be saved. Advertising is off, and saved choices are not reused on future visits."
                    : es
                      ? "No se pudo comprobar o guardar tu decisión. La publicidad queda desactivada en esta visita."
                      : "Your choice could not be checked or saved. Advertising stays off for this visit."}
                </p>
              )}
              {adsOptIn && (
                <button
                  type="button"
                  className="secondary-button"
                  onClick={queueRevocationMessage}
                >
                  {es
                    ? "Revisar consentimiento de anuncios"
                    : "Review advertising consent"}
                </button>
              )}
            </>
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
