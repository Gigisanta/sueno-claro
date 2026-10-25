import { test, expect } from '@playwright/test';
import { localizedPaths } from '../../lib/i18n';

const journeys = [
  { locale: 'en', path: '/', calculate: 'Calculate', nextLocale: 'es', nextPath: '/calculadora-de-sueno', language: 'Español' },
  { locale: 'es', path: '/calculadora-de-sueno', calculate: 'Calcular', nextLocale: 'pt-BR', nextPath: '/pt-br', language: 'Português (Brasil)' },
  { locale: 'pt-BR', path: '/pt-br', calculate: 'Calcular', nextLocale: 'fr', nextPath: '/fr', language: 'Français' },
  { locale: 'fr', path: '/fr', calculate: 'Calculer', nextLocale: 'de', nextPath: '/de', language: 'Deutsch' },
  { locale: 'de', path: '/de', calculate: 'Berechnen', nextLocale: 'it', nextPath: '/it', language: 'Italiano' },
  { locale: 'it', path: '/it', calculate: 'Calcola', nextLocale: 'id', nextPath: '/id', language: 'Bahasa Indonesia' },
  { locale: 'id', path: '/id', calculate: 'Hitung', nextLocale: 'en', nextPath: '/', language: 'English' },
] as const;

for (const journey of journeys) {
  test(`calculator and crawlable language switch work in ${journey.locale}`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.clock.install({ time: new Date('2026-10-22T12:00:00Z') });
    await page.goto(journey.path);
    await expect(page.locator('html')).toHaveAttribute('lang', journey.locale);
    await expect(page.locator('h1')).toBeVisible();
    const comparison = page.locator('#seven-am-example').getByRole('region');
    expect(await comparison.evaluate((region) => region.scrollWidth <= region.clientWidth)).toBe(true);
    if (journey.locale === 'id') {
      await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', 'id_ID');
    }
    const resources = page.locator('.home-resources');
    await expect(resources).toBeVisible();
    await expect(resources.locator('a')).toHaveCount(5);
    expect(await resources.locator('a').evaluateAll((links) => links.map((link) => link.getAttribute('href')))).toEqual(
      (['schedule', 'nap', 'bedtime', 'cycles', 'duration'] as const).map((key) => localizedPaths[journey.locale][key]),
    );
    for (const link of await resources.locator('a').all()) await expect(link).toBeVisible();
    await expect(page.locator('[data-testid^="ad-"]')).toHaveCount(0);
    await page.locator('#wakeAt-date').fill('2026-10-23');
    await page.locator('#wakeAt-time').fill('07:00');
    await expect(page.locator('.sentence-end time')).toHaveText(journey.locale === 'id' ? '23.15' : '23:15');
    await page.locator('#wakeAt-time').fill('07:30');
    await expect(page.locator('.sentence-end time')).toHaveText(journey.locale === 'id' ? '23.45' : '23:45');
    await expect(page.locator('.result')).toHaveCount(0);
    await expect(page.locator('[data-testid^="ad-"]')).toHaveCount(0);
    await page.locator('#wakeAt-time').fill('07:00');
    await expect(page.locator('#time-format')).toHaveValue('24h');
    await page.getByRole('button', { name: journey.calculate, exact: true }).click();
    const expectedTimes = journey.locale === 'id' ? ['21.45', '23.15', '00.45', '02.15'] : ['21:45', '23:15', '00:45', '02:15'];
    await expect(page.locator('.result-time')).toHaveText(expectedTimes);
    await expect(page.locator('.result-interval').nth(1)).toHaveText(journey.locale === 'id' ? '23.15 → 07.00' : '23:15 → 07:00');
    await expect(page.locator('#results-heading')).toBeVisible();
    await expect(page.locator('[data-testid^="ad-"]')).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(page.locator('.footer-credit a')).toHaveAttribute('href', 'https://maat.work');
    await page.locator('.language-switcher summary').click();
    const link = page.locator('.language-switcher').getByRole('link', { name: journey.language, exact: true });
    await expect(link).toHaveAttribute('href', journey.nextPath);
    await expect(link).toHaveAttribute('hreflang', journey.nextLocale);
    await link.click();
    await expect(page).toHaveURL(new RegExp(`${journey.nextPath === '/' ? '/' : journey.nextPath}$`));
    await expect(page.locator('html')).toHaveAttribute('lang', journey.nextLocale);
    expect(errors).toEqual([]);
  });
}
