"use client";
import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { monetization } from "../lib/monetization/config";
import { usePrivacy } from "./PrivacyProvider";
import type { Locale } from "../lib/site";
declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>> & {
      requestNonPersonalizedAds?: number;
    };
  }
}
const requests: Record<"result" | "article", number> = {
  result: 0,
  article: 0,
};
export function AdSlot({
  placement,
  eligible,
  locale,
}: {
  placement: "result" | "article";
  eligible: boolean;
  locale: Locale;
}) {
  const { adsAllowed } = usePrivacy();
  const [near, setNear] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [filled, setFilled] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const element = useRef<HTMLModElement>(null);
  const requested = useRef(false);
  const active = eligible && adsAllowed && monetization.enabled;
  useEffect(() => {
    if (!active) {
      requested.current = false;
      setFilled(false);
      return;
    }
    if (!container.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setNear(true);
      },
      { rootMargin: "200px" },
    );
    observer.observe(container.current);
    return () => observer.disconnect();
  }, [active]);
  useEffect(() => {
    if (!active || !near || !loaded || requested.current || !element.current)
      return;
    if (requests[placement] >= (placement === "result" ? 1 : 2)) {
      setFailed(true);
      return;
    }
    requests[placement]++;
    requested.current = true;
    const node = element.current;
    const observer = new MutationObserver(() => {
      const status = node.getAttribute("data-ad-status");
      setFilled(status === "filled");
      if (status === "unfilled") setFailed(true);
    });
    observer.observe(node, {
      attributes: true,
      attributeFilter: ["data-ad-status"],
    });
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.requestNonPersonalizedAds = 1;
      window.adsbygoogle.push({});
    } catch {
      setFailed(true);
    }
    return () => observer.disconnect();
  }, [active, near, loaded, placement]);
  if (!active) return null;
  return (
    <div
      ref={container}
      className="ad-slot"
      data-testid={"ad-" + placement}
      aria-label={locale === "es" ? "Publicidad" : "Advertisement"}
    >
      {near && !failed && (
        <>
          <Script
            id="adsense"
            src={
              "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" +
              monetization.publisherId
            }
            crossOrigin="anonymous"
            strategy="afterInteractive"
            onReady={() => setLoaded(true)}
            onError={() => setFailed(true)}
          />
          {filled && (
            <span className="ad-label">
              {locale === "es" ? "Publicidad" : "Advertisement"}
            </span>
          )}
          <ins
            ref={element}
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client={monetization.publisherId}
            data-ad-slot={monetization.slots[placement]}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </>
      )}
    </div>
  );
}
