import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { pages } from "../../lib/content/pages";
test("all routes have unique static SEO, reciprocal languages and structured data", async ({
  request,
}) => {
  const documents = new Map<string, Record<string, string>>();
  for (const entry of pages) {
    const response = await request.get(entry.path);
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).toContain(`<html lang="${entry.locale}"`);
    expect(new URL(html.match(/<link rel="canonical" href="([^"]+)"/)![1]).href).toBe(new URL(entry.path, "https://sleeplike.maat.work").href);
    const alternates = Object.fromEntries([...html.matchAll(/<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"/g)].map((match) => [match[1], new URL(match[2]).href]));
    expect(Object.keys(alternates).sort()).toEqual(["en", "es", "pt-BR", "fr", "de", "it", "id", "x-default"].sort());
    expect(alternates[entry.locale]).toBe(`https://sleeplike.maat.work${entry.path}`);
    expect(alternates["x-default"]).toBe(`https://sleeplike.maat.work${pages.find((page) => page.key === entry.key && page.locale === "en")!.path}`);
    documents.set(entry.path, alternates);
    expect(html.match(/<h1[ >]/g)?.length).toBe(1);
    expect(html).toContain("application/ld+json");
    expect(html).not.toContain("B0EXAMPLE");
  }
  for (const entry of pages) {
    for (const [locale, href] of Object.entries(documents.get(entry.path)!)) {
      const targetPath = new URL(href).pathname;
      const translation = pages.find((candidate) => candidate.path === targetPath)!;
      expect(translation.key).toBe(entry.key);
      expect(translation.locale).toBe(locale === "x-default" ? "en" : locale);
      expect(documents.get(targetPath)![entry.locale]).toBe(`https://sleeplike.maat.work${entry.path}`);
    }
  }
  const sitemap = await (await request.get("/sitemap.xml")).text();
  const sitemapEntries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => match[1]);
  expect(sitemapEntries).toHaveLength(84);
  for (const entry of sitemapEntries) {
    const path = new URL(entry.match(/<loc>([^<]+)<\/loc>/)![1]).pathname;
    const alternates = Object.fromEntries([...entry.matchAll(/<xhtml:link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map((match) => [match[1], new URL(match[2]).href]));
    expect(alternates).toEqual(documents.get(path));
  }
  expect(sitemap).not.toContain("/sleep-calculator");
  const redirect = await request.get("/sleep-calculator", { maxRedirects: 0 });
  expect(redirect.status()).toBe(308);
  const error = await request.get("/not-a-real-page");
  expect(error.status()).toBe(404);
  expect(await error.text()).toContain("noindex");
});
for (const path of [
  "/calculadora-de-sueno", "/siesta", "/sleep-cycles", "/privacidad",
  "/pt-br", "/fr", "/de", "/it", "/id",
]) {
  test(`page remains accessible without overflow at ${path}`, async ({ page }) => {
    await page.goto(path);
    const issues = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(issues.violations).toEqual([]);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  });
}
test("keyboard users can skip to the calculator and calculate accessible results", async ({
  page,
  browserName,
}) => {
  await page.goto("/");
  if (browserName === "webkit")
    await page.getByRole("link", { name: "Skip to content" }).focus();
  else await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await page.getByRole("button", { name: "Calculate", exact: true }).click();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
});
test("no unconsented ads or analytics and no input data in network requests", async ({
  page,
}) => {
  const urls: string[] = [];
  page.on("request", (request) => urls.push(request.url()));
  await page.goto("/#sleep=mode=wake&wake=07%3A43&wakeDate=2026-10-20");
  await page.getByRole("button", { name: "Calculate", exact: true }).click();
  await page
    .getByRole("button", { name: "Privacy preferences", exact: true })
    .click();
  await expect(
    page.getByRole("checkbox", { name: "Allow aggregate usage statistics" }),
  ).not.toBeChecked();
  expect(
    urls.some((url) =>
      /googlesyndication|doubleclick|fundingchoices|_vercel\/insights/.test(
        url,
      ),
    ),
  ).toBe(false);
  expect(urls.some((url) => /07%3A43|wakeDate|2026-10-20/.test(url))).toBe(
    false,
  );
});
test("privacy revocation synchronizes already open tabs", async ({
  page,
  context,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "Privacy preferences", exact: true })
    .click();
  await page
    .getByRole("checkbox", { name: "Allow aggregate usage statistics" })
    .check();
  const other = await context.newPage();
  await other.goto("/");
  await other
    .getByRole("button", { name: "Privacy preferences", exact: true })
    .click();
  await expect(
    other.getByRole("checkbox", { name: "Allow aggregate usage statistics" }),
  ).toBeChecked();
  await page
    .getByRole("checkbox", { name: "Allow aggregate usage statistics" })
    .uncheck();
  await expect(
    other.getByRole("checkbox", { name: "Allow aggregate usage statistics" }),
  ).not.toBeChecked();
});

test("calculator is immediately reachable on narrow phones and uses desktop result space", async ({ page }) => {
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: width < 640 ? 844 : 1000 });
    await page.goto("/calculadora-de-sueno");
    const calculate = page.getByRole("button", { name: "Calcular", exact: true });
    const bounds = await calculate.boundingBox();
    expect(bounds!.y + bounds!.height).toBeLessThan(width < 640 ? 740 : 1000);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await calculate.click();
    await expect(page.locator(".result-time")).toHaveCount(4);
    const [first, second] = await page.locator(".result").evaluateAll(nodes => nodes.slice(0, 2).map(node => ({ y: node.getBoundingClientRect().y })));
    if (width >= 640) expect(Math.abs(first!.y - second!.y)).toBeLessThan(2);
    else {
      expect(second!.y).toBeGreaterThan(first!.y);
      await expect(page.getByRole("link", { name: "Editar horario" })).toBeVisible();
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});


test("12-hour results do not overlap their duration on narrow phones", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 390]) {
    await page.setViewportSize({ width, height: 844 });
    for (const path of ["/", "/calculadora-de-sueno"]) {
      await page.goto(path + "#sleep=format=12h");
      await page.getByRole("button", { name: path === "/" ? "Calculate" : "Calcular", exact: true }).click();
      await expect(page.locator(".result-time")).toHaveCount(4);
      const overlaps = await page.locator(".result-body").evaluateAll(nodes => nodes.some(node => {
        const time = node.querySelector(".result-time")!;
        const range = document.createRange(); range.selectNodeContents(time);
        const duration = node.querySelector(".result-duration")!.getBoundingClientRect();
        return Array.from(range.getClientRects()).some(rect => rect.right > duration.left && rect.left < duration.right && rect.bottom > duration.top && rect.top < duration.bottom);
      }));
      expect(overlaps).toBe(false);
    }
  }
});
