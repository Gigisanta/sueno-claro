"use client";

import { useEffect } from "react";

export function SiteMotion() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    let observer: IntersectionObserver | undefined;

    function setUp() {
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
      if (preference.matches) return;
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target;
          observer?.unobserve(element);
          const heading = element.matches("h1, h2, h3");
          const picture = element.matches("img");
          const link = element.matches("a, li");
          const animation = element.animate(
            [
              { opacity: .8, transform: picture ? "scale(1.035)" : link ? "translateX(12px)" : `translateY(${heading ? 20 : 10}px)` },
              { opacity: 1, transform: "none" },
            ],
            { duration: picture ? 1000 : heading ? 900 : 800, delay: heading ? 0 : picture ? 140 : 70, easing: "cubic-bezier(.16, 1, .3, 1)" },
          );
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        }
      }, { rootMargin: "0px 0px -3% 0px", threshold: .05 });
      document.querySelectorAll(
        "main h1, main h2, main h3, main .page-intro > p, main .content-section > p, main .content-section li, main .contents a, main .home-resources a, main .guide-example, footer h2, footer .night-atlas img, footer .resource-directory a, footer .footer-contact, footer .footer-close > p",
      ).forEach((element) => observer?.observe(element));
    }

    setUp();
    preference.addEventListener("change", setUp);
    return () => {
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      preference.removeEventListener("change", setUp);
    };
  }, []);

  return null;
}
