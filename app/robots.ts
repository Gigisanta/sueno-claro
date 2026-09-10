import type { MetadataRoute } from 'next';
import { SITE_URL,isPreview } from '../lib/site';
export const dynamic='force-static';
export default function robots():MetadataRoute.Robots {return {rules:isPreview?{userAgent:'*',disallow:'/'}:{userAgent:'*',allow:'/'},sitemap:SITE_URL+'/sitemap.xml'};}
