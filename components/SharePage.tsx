"use client";

import { useState } from "react";
import { SITE_URL } from "../lib/site";
import type { LocaleCopy } from "../lib/locales/en";

export function SharePage({ path, title, copy: c }: { path: string; title: string; copy: LocaleCopy["share"] }) {
  const [status, setStatus] = useState("");
  const [manual, setManual] = useState(false);
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
      setStatus(c.copied);
    } catch {
      setManual(true);
      setStatus(c.manual);
    }
  }
  return <section className="public-share" aria-label={c.label}>
    <p>{c.prompt}</p>
    <button type="button" className="text-button" onClick={share}>{c.action}</button>
    <p role="status">{status}</p>
    {manual && <label>{c.link}<input readOnly value={url} onFocus={(event) => event.currentTarget.select()} /></label>}
  </section>;
}
