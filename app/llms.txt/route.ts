import { pages, type ContentPage } from '../../lib/content/pages';
import { SITE_URL } from '../../lib/site';

export const dynamic = 'force-static';

export function GET() {
  const englishPages = pages.filter((page) => page.locale === 'en');
  const home = englishPages.find((page) => page.key === 'home')!;
  const entry = (page: ContentPage) =>
    `- [${page.title}](${SITE_URL}${page.path}): ${page.description}`;
  const body = [
    '# SleepLike',
    '',
    `> ${home.description}`,
    '',
    '## Tools',
    '',
    ...englishPages.filter((page) => page.kind === 'tool').map(entry),
    '',
    '## Guides',
    '',
    ...englishPages.filter((page) => page.kind === 'guide' && page.key !== 'contact').map(entry),
    '',
    '## Other languages',
    '',
    ...pages.filter((page) => page.locale !== 'en' && page.key === 'home').map(entry),
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
