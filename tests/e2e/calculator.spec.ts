import { expect, test } from '@playwright/test';

test.describe('Sueño Claro calculator', () => {
  test('shows no ad before first result and calculates bedtime across midnight', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('post-result-ad')).toHaveCount(0);
    await page.getByLabel('I want to wake up at').fill('07:30');
    await page.getByRole('button', { name: 'Calculate times' }).click();
    await expect(page.getByText('22:15')).toBeVisible();
    await expect(page.getByText('23:45')).toBeVisible();
    await expect(page.getByTestId('post-result-ad')).toBeVisible();
  });

  test('supports Spanish route and mobile width without horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/calculadora-de-sueno');
    await expect(page.getByRole('heading', { name: /calculadora tranquila/i })).toBeVisible();
    await page.getByRole('button', { name: 'Calcular horarios' }).click();
    await expect(page.getByText('22:15')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    expect(overflow).toBe(false);
  });

  test('has SEO/PWA essentials', async ({ page }) => {
    await page.goto('/sleep-calculator');
    await expect(page).toHaveTitle(/Sleep Calculator/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /90-minute sleep cycles/i);
    const manifest = await page.request.get('/manifest.webmanifest');
    expect(manifest.ok()).toBe(true);
    const robots = await page.request.get('/robots.txt');
    expect(robots.ok()).toBe(true);
    const sitemap = await page.request.get('/sitemap.xml');
    expect(sitemap.ok()).toBe(true);
    const sw = await page.request.get('/sw.js');
    expect(sw.ok()).toBe(true);
  });
});
