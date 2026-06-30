import { chromium, webkit } from '@playwright/test';

const baseURL = process.argv[2] ?? 'https://sleeplike.maat.work';
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

  // Load page with URL params — auto-calculates on mount
  await page.goto(`${baseURL}?mode=wake&wake=06:00&latency=15&cycle=90&format=24h`, { waitUntil: 'networkidle' });

  // Results auto-calculate — should show bedtimes
  await page.getByText('20:45').waitFor({ state: 'visible', timeout: 5000 });

  // Mode description visible
  const modeDesc = await page.locator('.mode-desc').count();
  if (modeDesc !== 1) throw new Error(`${name}: mode description missing`);

  // Ad slot present
  const adSlot = await page.locator('[data-ad-slot="true"]').count();
  if (adSlot !== 1) throw new Error(`${name}: ad slot missing`);

  // Affiliate product links
  const products = await page.locator('.product-link').count();
  if (products < 1) throw new Error(`${name}: affiliate products missing`);

  // Donate link in footer
  const donate = await page.locator('.donate-link').count();
  if (donate !== 1) throw new Error(`${name}: donate link missing`);

  // Affiliate disclosure present
  const affiliate = await page.locator('.affiliate').count();
  if (affiliate !== 1) throw new Error(`${name}: affiliate disclosure missing`);

  // No horizontal overflow
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  if (overflow) throw new Error(`${name}: horizontal overflow`);

  // JSON-LD present
  const jsonLd = await page.locator('script[type="application/ld+json"]').first().textContent();
  if (!jsonLd?.includes('WebApplication')) throw new Error(`${name}: JSON-LD missing WebApplication`);

  // OG image
  const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
  if (!ogImage?.includes('/og.svg')) throw new Error(`${name}: OG image missing`);

  // Switch to sleepNow mode — verify auto-time and NOW label
  await page.getByRole('button', { name: /^Sleep$/ }).click();
  await page.waitForTimeout(300);
  const nowLabel = await page.locator('.time-now').count();
  if (nowLabel !== 1) throw new Error(`${name}: 'now' label missing in sleep mode`);

  // Spanish page with URL params
  await page.goto(`${baseURL}/calculadora-de-sueno?mode=wake&wake=06:00&latency=15&cycle=90&format=24h`, { waitUntil: 'networkidle' });
  const esTitle = await page.title();
  if (!esTitle?.includes('sleeplike')) throw new Error(`${name}: Spanish page title missing sleeplike`);
  const esResults = await page.locator('.result-item').count();
  if (esResults < 2) throw new Error(`${name}: Spanish page missing results`);

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
