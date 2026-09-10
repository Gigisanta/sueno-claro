import type { Metadata } from "next";
import { getPage, type ContentPage } from "./content/pages";
import { SITE_URL, isPreview, homePath } from "./site";
export function pageMetadata(path: string): Metadata {
  const page = getPage(path)!;
  const en = page.locale === "en" ? page.path : page.pairPath;
  const es = page.locale === "es" ? page.path : page.pairPath;
  return {
    metadataBase: new URL(SITE_URL),
    title: `${page.title} · SleepLike`,
    description: page.description,
    applicationName: "SleepLike",
    alternates: {
      canonical: page.path,
      languages: { en, es, "x-default": en },
    },
    robots: isPreview
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: page.title,
      description: page.description,
      url: page.path,
      siteName: "SleepLike",
      locale: page.locale === "es" ? "es_ES" : "en_US",
      alternateLocale: page.locale === "es" ? "en_US" : "es_ES",
      type: page.kind === "guide" ? "article" : "website",
      images: [
        {
          url: `/og-${page.locale}.png`,
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [`/og-${page.locale}.png`],
    },
    other: { referrer: "no-referrer" },
  };
}
export function structuredData(page: ContentPage) {
  const url = SITE_URL + page.path;
  const author = {
    "@type": "Organization",
    name: "SleepLike",
    url: SITE_URL + (page.locale === "es" ? "/acerca-de" : "/about"),
  };
  const primary =
    page.kind === "tool"
      ? {
          "@type": "WebApplication",
          name: page.title,
          url,
          description: page.description,
          inLanguage: page.locale,
          applicationCategory: "HealthApplication",
          operatingSystem: "Any",
          browserRequirements: "Requires JavaScript for calculation",
          isAccessibleForFree: true,
        }
      : page.kind === "guide"
        ? {
            "@type": "Article",
            headline: page.heading,
            description: page.description,
            inLanguage: page.locale,
            mainEntityOfPage: url,
            author,
            publisher: author,
            dateModified: page.updated,
            image: SITE_URL + `/og-${page.locale}.png`,
            citation: page.sources.map((s) => s.url),
          }
        : {
            "@type": "WebPage",
            name: page.title,
            url,
            inLanguage: page.locale,
          };
  const items = [
    {
      name: page.locale === "es" ? "Calculadora de sueño" : "Sleep calculator",
      item: SITE_URL + homePath(page.locale),
    },
    ...(page.path === homePath(page.locale)
      ? []
      : [{ name: page.title, item: url }]),
  ].map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    ...item,
  }));
  return {
    "@context": "https://schema.org",
    "@graph": [primary, { "@type": "BreadcrumbList", itemListElement: items }],
  };
}
