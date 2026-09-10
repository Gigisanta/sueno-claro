import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { pages } from "../../lib/content/pages";
test("all routes have unique static SEO, reciprocal languages and structured data", async ({
  request,
}) => {
  for (const entry of pages) {
    const response = await request.get(entry.path);
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).toContain(`<html lang="${entry.locale}"`);
    expect(
      new URL(html.match(/<link rel="canonical" href="([^"]+)"/)![1]).href,
    ).toBe(new URL(entry.path, "https://sleeplike.maat.work").href);
    expect(
      new URL(
        html.match(
          new RegExp(
            `hrefLang="${entry.locale === "en" ? "es" : "en"}" href="([^"]+)"`,
          ),
        )![1],
      ).href,
    ).toBe(new URL(entry.pairPath, "https://sleeplike.maat.work").href);
    expect(html.match(/<h1[ >]/g)?.length).toBe(1);
    expect(html).toContain("application/ld+json");
    expect(html).not.toContain("B0EXAMPLE");
  }
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap.match(/<url>/g) || []).toHaveLength(24);
  expect(sitemap).not.toContain("/sleep-calculator");
  const redirect = await request.get("/sleep-calculator", { maxRedirects: 0 });
  expect(redirect.status()).toBe(308);
  const error = await request.get("/not-a-real-page");
  expect(error.status()).toBe(404);
  expect(await error.text()).toContain("noindex");
});
test("mobile and desktop remain accessible without overflow", async ({
  page,
  browserName,
}) => {
  for (const path of [
    "/calculadora-de-sueno",
    "/siesta",
    "/sleep-cycles",
    "/privacidad",
  ]) {
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
  }
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
