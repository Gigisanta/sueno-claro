import { notFound } from 'next/navigation';
import { SitePage } from '../../../components/SitePage';
import { getPage, pages } from '../../../lib/content/pages';
import { localeFromPrefix } from '../../../lib/i18n';
import { pageMetadata } from '../../../lib/metadata';

type RouteParams = { locale: string; slug?: string[] };
type Props = { params: Promise<RouteParams> };
export const dynamicParams = false;

export function generateStaticParams(): RouteParams[] {
  return pages.filter((page) => page.locale !== 'en' && page.locale !== 'es').map((page) => {
    const [locale, ...slug] = page.path.slice(1).split('/');
    return { locale, slug };
  });
}

function routePath({ locale: prefix, slug = [] }: RouteParams): string {
  const locale = localeFromPrefix(prefix);
  const path = '/' + [prefix, ...slug].join('/');
  if (!locale || getPage(path)?.locale !== locale) notFound();
  return path;
}

export async function generateMetadata({ params }: Props) {
  return pageMetadata(routePath(await params));
}

export default async function Page({ params }: Props) {
  return <SitePage path={routePath(await params)} />;
}
