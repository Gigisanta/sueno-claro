"use client";

import { useState } from "react";
import { SITE_URL, type Locale } from "../lib/site";

export function SharePage({ path, title, locale }: { path: string; title: string; locale: Locale }) {
  const [status, setStatus] = useState("");
  const [manual, setManual] = useState(false);
  const es = locale === "es";
  // Share the public article, never location.href (which may contain private inputs).
  const url = SITE_URL + path;
  async function share() {
    setStatus("");
    if (navigator.share) {
      try {
        await navigator.share({ title: `${title} · SleepLike`, url });
        return;
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setStatus(es ? "Enlace copiado." : "Link copied.");
    } catch {
      setManual(true);
      setStatus(es ? "Selecciona y copia el enlace." : "Select and copy the link.");
    }
  }
  return <section className="public-share" aria-label={es ? "Compartir guía" : "Share guide"}>
    <p>{es ? "¿A alguien le serviría esta guía?" : "Know someone who could use this guide?"}</p>
    <button type="button" className="text-button" onClick={share}>{es ? "Compartir esta guía ↗" : "Share this guide ↗"}</button>
    <p role="status">{status}</p>
    {manual && <label>{es ? "Enlace público" : "Public link"}<input readOnly value={url} onFocus={(event) => event.currentTarget.select()} /></label>}
  </section>;
}
