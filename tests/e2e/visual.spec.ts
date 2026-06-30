import { expect, test } from '@playwright/test';

async function layoutSnapshot(page: import('@playwright/test').Page) {
  return page.evaluate(() => {
    const pick = (selector: string) => {
      const el = document.querySelector(selector);
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      return {
        x: Math.round(rect.x),
        y: Math.round(rect.y),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        fontSize: style.fontSize,
        color: style.color,
        background: style.backgroundColor,
      };
    };
    const buttons = [...document.querySelectorAll('button, a.button, .icon-button')].map((el) => {
      const rect = el.getBoundingClientRect();
      return { text: (el.textContent || el.getAttribute('aria-label') || '').trim(), width: rect.width, height: rect.height };
    });
    return {
      viewport: { width: innerWidth, height: innerHeight },
      scrollWidth: document.documentElement.scrollWidth,
      bodyText: document.body.innerText,
      h1: pick('h1'),
      calculator: pick('.calculator-card'),
      heroCard: pick('.hero-calculator'),
      resultCard: pick('.result-card'),
      buttons,
    };
  });
}

test.describe('visual QA captures', () => {
  test('desktop landing and result screen are polished and stable', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1100 });
    await page.goto('/');
    await page.screenshot({ path: 'artifacts/visual-qa/desktop-home.png', fullPage: true });
    await page.getByRole('button', { name: 'Calculate windows' }).click();
    await expect(page.getByText('22:15')).toBeVisible();
    await page.screenshot({ path: 'artifacts/visual-qa/desktop-results.png', fullPage: true });
    const snap = await layoutSnapshot(page);
    expect(snap.scrollWidth).toBeLessThanOrEqual(snap.viewport.width + 1);
    expect(snap.h1?.height).toBeGreaterThan(90);
    expect(snap.calculator?.width).toBeGreaterThan(620);
    expect(snap.resultCard?.height).toBeGreaterThanOrEqual(82);
    expect(snap.buttons.every((button) => button.height >= 21 || button.text === '')).toBe(true);
  });

  test('mobile Spanish result screen has no overflow and readable hierarchy', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/calculadora-de-sueno');
    await page.getByRole('button', { name: 'Calcular ventanas' }).click();
    await expect(page.getByText('22:15')).toBeVisible();
    await page.screenshot({ path: 'artifacts/visual-qa/mobile-es-results.png', fullPage: true });
    const snap = await layoutSnapshot(page);
    expect(snap.scrollWidth).toBeLessThanOrEqual(snap.viewport.width + 1);
    expect(snap.h1?.width).toBeLessThanOrEqual(370);
    expect(snap.calculator?.width).toBeLessThanOrEqual(370);
    expect(snap.resultCard?.height).toBeGreaterThanOrEqual(150);
    expect(snap.bodyText).toContain('sin micrófono');
  });
});
