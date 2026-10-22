import type { MetadataRoute } from 'next';
import { pages } from '../lib/content/pages';
import { SITE_URL } from '../lib/site';
import { alternatePaths } from '../lib/i18n';
export const dynamic='force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    url: SITE_URL + page.path,
    lastModified: page.updated,
    alternates: {
      languages: Object.fromEntries(Object.entries(alternatePaths(page.key)).map(([locale, path]) => [locale, SITE_URL + path])),
    },
  }));
}
