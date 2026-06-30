import { chromium, webkit } from '@playwright/test';

const baseURL = process.argv[2] ?? 'https://sueno-claro.vercel.app';
const browsers = [
  ['chromium', chromium],
  ['webkit', webkit],
];

for (const [name, browserType] of browsers) {
  const browser = await browserType.launch();
  const page = await browser.newPage({ viewport: name === 'webkit' ? { width: 390, height: 844 } : { width: 1440, height: 1000 } });
  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));

  await page.goto(baseURL, { waitUntil: 'networkidle' });

  // Click Calculate and verify results appear
  await page.getByRole('button', { name: /^Calculate$/ }).click();
  await page.getByText('22:15').waitFor({ state: 'visible' });

  // No horizontal overflow
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  if (overflow) throw new Error(`${name}: horizontal overflow`);

  // JSON-LD present (WebApplication, no FAQPage in minimalist version)
  const jsonLd = await page.locator('script[type="application/ld+json"]').first().textContent();
  if (!jsonLd?.includes('WebApplication')) throw new Error(`${name}: JSON-LD missing WebApplication`);

  // OG image
  const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
  if (!ogImage?.includes('/og.svg')) throw new Error(`${name}: OG image missing`);

  // Spanish page with URL params — loads and calculates results
  await page.goto(`${baseURL}/calculadora-de-sueno?mode=wake&wake=06:00&latency=15&cycle=90&format=24h`, { waitUntil: 'networkidle' });
  await page.getByText('20:45').waitFor({ state: 'visible' });

  // All SEO/PWA endpoints return 200
  const siesta = await page.request.get(`${baseURL}/siesta`);
  if (!siesta.ok()) throw new Error(`${name}: /siesta failed`);

  const title = await page.title();
  const manifestOk = (await page.request.get(`${baseURL}/manifest.webmanifest`)).ok();
  const sitemapOk = (await page.request.get(`${baseURL}/sitemap.xml`)).ok();
  const robotsOk = (await page.request.get(`${baseURL}/robots.txt`)).ok();
  if (!manifestOk || !sitemapOk || !robotsOk) throw new Error(`${name}: SEO/PWA endpoint failed`);

  if (errors.length) throw new Error(`${name}: console errors: ${errors.join(' | ')}`);
  console.log(`${name}: ok — ${title}`);
  await browser.close();
}
