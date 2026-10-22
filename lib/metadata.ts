import type { Metadata } from "next";
import { getPage, type ContentPage } from "./content/pages";
import { SITE_URL, isPreview } from "./site";
import { alternatePaths, homePath, localeInfo, locales, localizedPaths } from "./i18n";
import { localeCopy } from "./locales";
import { socialImagePath } from "./social";
export function pageMetadata(path: string): Metadata {
  const page = getPage(path)!;
  return {
    metadataBase: new URL(SITE_URL),
    title: `${page.title} · SleepLike`,
    description: page.description,
    applicationName: "SleepLike",
    alternates: {
      canonical: page.path,
      languages: alternatePaths(page.key),
    },
    robots: isPreview
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: page.title,
      description: page.description,
      url: page.path,
      siteName: "SleepLike",
      locale: localeInfo[page.locale].openGraph,
      alternateLocale: locales.filter((locale) => locale !== page.locale).map((locale) => localeInfo[locale].openGraph),
      type: page.kind === "guide" ? "article" : "website",
      images: [
        {
          url: socialImagePath(page.path),
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
      images: [socialImagePath(page.path)],
    },
    other: { referrer: "no-referrer" },
  };
}
export function structuredData(page: ContentPage) {
  const url = SITE_URL + page.path;
  const author = {
    "@type": "Organization",
    "@id": SITE_URL + "/#organization",
    name: "SleepLike",
    url: SITE_URL + localizedPaths[page.locale].about,
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
            image: SITE_URL + socialImagePath(page.path),
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
      name: localeCopy[page.locale].editorial.calculator,
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
    "@graph": [
      { ...primary, "@id": url + "#content" },
      { "@type": "BreadcrumbList", "@id": url + "#breadcrumb", itemListElement: items },
      ...(page.path === "/" ? [{
        "@type": "WebSite",
        "@id": SITE_URL + "/#website",
        name: "SleepLike",
        url: SITE_URL + "/",
        inLanguage: locales,
        publisher: author,
      }] : []),
    ],
  };
}
