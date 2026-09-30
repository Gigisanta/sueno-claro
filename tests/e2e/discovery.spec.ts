import { test, expect } from "@playwright/test";
import { pages } from "../../lib/content/pages";
import { socialImagePath } from "../../lib/social";

for (const example of [
  { locale: 'es', guide: '/cuanto-tardo-en-dormirme', tool: '/hora-de-dormir', contents: 'En esta guía', heading: 'Prueba el ejemplo con tu horario', action: 'Probar en la calculadora: Margen de 30 minutos', calculate: 'Calcular' },
  { locale: 'en', guide: '/sleep-latency', tool: '/bedtime-calculator', contents: 'In this guide', heading: 'Try the example with your schedule', action: 'Try in the calculator: 30-minute allowance', calculate: 'Calculate' },
]) {
  test(`worked guide example ${example.locale} opens a future wake target and can be adjusted`, async ({ page }) => {
    await page.clock.install({ time: new Date('2026-09-11T11:15:00Z') });
    await page.goto(example.guide);
    const anchor = page.getByRole('navigation', { name: example.contents, exact: true }).getByRole('link', { name: example.heading, exact: true });
    await expect(anchor).toHaveCount(1);
    await anchor.click();
    const section = page.locator('#guide-examples');
    await expect(section).toBeInViewport();
    await expect(section.locator('li')).toHaveCount(2);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const action = section.getByRole('link', { name: example.action, exact: true });
    expect((await action.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    await action.click();
    await expect(page).toHaveURL(new RegExp(`${example.tool}$`));
    await expect(page.locator('html')).toHaveAttribute('lang', example.locale);
    await expect(page.locator('#wakeAt-time')).toHaveValue('07:00');
    await expect(page.locator('#wakeAt-date')).toHaveValue('2026-09-12');
    await page.locator('summary').click();
    await expect(page.locator('#latency')).toHaveValue('30');
    await page.getByRole('button', { name: example.calculate, exact: true }).click();
    await expect(page.locator('.result-time')).toHaveText(['21:30', '23:00', '00:30', '02:00']);
    await page.locator('#latency').fill('15');
    await page.getByRole('button', { name: example.calculate, exact: true }).click();
    await expect(page.locator('.result-time')).toHaveText(['21:45', '23:15', '00:45', '02:15']);
    await expect(page.locator('[data-testid^="ad-"]')).toHaveCount(0);
  });
}

test("every page has a real, distinct social image and public discovery links", async ({ request, page }) => {
  const images = new Set<string>();
  for (const entry of pages) {
    const html = await (await request.get(entry.path)).text();
    const image = socialImagePath(entry.path);
    expect(html).toContain(`https://sleeplike.maat.work${image}`);
    const response = await request.get(image);
    expect(response.status()).toBe(200);
    const png = await response.body();
    expect(png.subarray(1, 4).toString()).toBe("PNG");
    expect([png.readUInt32BE(16), png.readUInt32BE(20)]).toEqual([1200, 630]);
    images.add(png.toString("base64"));
    for (const resource of pages.filter((p) => p.locale === entry.locale && p.kind !== "legal")) {
      expect(html).toContain(`href="${resource.path}"`);
    }
  }
  expect(images.size).toBe(pages.length);
  await page.goto("/");
  const graph = await page.locator('script[type="application/ld+json"]').evaluate((node) => JSON.parse(node.textContent!)["@graph"]);
  expect(graph.find((node: Record<string, unknown>) => node["@type"] === "WebSite")).toMatchObject({ name: "SleepLike", url: "https://sleeplike.maat.work/" });
  await page.getByRole("link", { name: "Guides", exact: true }).click();
  await expect(page.locator("#sleep-resources")).toBeInViewport();
  await expect(page.locator("#sleep-resources a")).toHaveCount(7);
});

test("guide sharing uses only the canonical URL, with copy and manual alternatives", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "share", { configurable: true, value: async (data: ShareData) => { document.documentElement.dataset.shared = JSON.stringify(data); } });
  });
  await page.goto("/ciclos-de-sueno?time=07%3A30#private-plan");
  await page.getByRole("button", { name: "Compartir esta guía" }).click();
  const shared = JSON.parse((await page.locator("html").getAttribute("data-shared"))!);
  expect(shared.url).toBe("https://sleeplike.maat.work/ciclos-de-sueno");
  expect(JSON.stringify(shared)).not.toContain("07:30");

  await page.evaluate(() => {
    Object.defineProperty(navigator, "share", { configurable: true, value: undefined });
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: async (url: string) => { document.documentElement.dataset.copied = url; } } });
  });
  await page.getByRole("button", { name: "Compartir esta guía" }).click();
  await expect(page.getByText("Enlace copiado.", { exact: true })).toBeVisible();
  expect(await page.locator("html").getAttribute("data-copied")).toBe(shared.url);
  await page.evaluate(() => Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: async () => { throw new Error("Unavailable"); } } }));
  await page.getByRole("button", { name: "Compartir esta guía" }).click();
  await expect(page.getByLabel("Enlace público")).toHaveValue(shared.url);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
