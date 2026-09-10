import { test, expect } from "@playwright/test";
import { pages } from "../../lib/content/pages";
import { socialImagePath } from "../../lib/social";

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
