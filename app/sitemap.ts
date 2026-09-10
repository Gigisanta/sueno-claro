import type { MetadataRoute } from 'next';
import { pages } from '../lib/content/pages';
import { SITE_URL } from '../lib/site';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap {return pages.map(page=>({url:SITE_URL+page.path,lastModified:page.updated,alternates:{languages:{[page.locale]:SITE_URL+page.path,[page.locale==='es'?'en':'es']:SITE_URL+page.pairPath}}}));}
