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
test("privacy pages disclose Vercel's possible analytics metadata", async ({
  page,
}) => {
  const policyLink = page.getByRole("link", {
    name: "Vercel · Privacy and Compliance",
  });
  for (const [path, metadata, qualification] of [
    [
      "/privacy",
      /data point may include approximate geolocation.*browser and version.*operating system and version.*device type/i,
      /may be stored with a data point.*does not say every field is present for every visit or event/i,
    ],
    [
      "/privacidad",
      /un punto de datos puede incluir ubicación geográfica aproximada.*navegador y versión.*sistema operativo y versión.*tipo de dispositivo/i,
      /podría almacenarse con un punto de datos.*no afirma que cada campo esté presente en todas las visitas o eventos/i,
    ],
  ] as const) {
    await page.goto(path);
    await expect(page.getByText(metadata)).toBeVisible();
    await expect(page.getByText(qualification)).toBeVisible();
    await expect(policyLink).toHaveAttribute(
      "href",
      "https://vercel.com/docs/analytics/privacy-policy",
    );
  }
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
    await page.evaluate(() => localStorage.getItem("sleeplike-analytics")),
  ).toBeNull();
  await page.getByRole("button", { name: "Privacy preferences", exact: true }).click();
  expect(
    await page.evaluate(() => localStorage.getItem("sleeplike-analytics")),
  ).toBeNull();
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
test("analytics script is requested only after opt-in on a production host", async ({
  page,
}) => {
  test.skip(
    !!process.env.BASE_URL || process.env.NEXT_PUBLIC_VERCEL_ENV === "preview",
    "requires the local export and production hostname gate",
  );
  const port = Number(process.env.PORT ?? 3100);
  const publicOrigin = `http://sleeplike.maat.work:${port}`;
  const localOrigin = `http://127.0.0.1:${port}`;
  const analyticsRequests: string[] = [];
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (url.pathname === "/_vercel/insights/script.js")
      analyticsRequests.push(request.url());
  });
  await page.route(`${publicOrigin}/**`, async (route) => {
    const url = new URL(route.request().url());
    if (url.pathname === "/_vercel/insights/script.js") {
      await route.fulfill({
        status: 200,
        contentType: "application/javascript",
        body: "window.__analyticsScriptFixture = true;",
      });
      return;
    }
    if (url.pathname.startsWith("/_vercel/insights/")) {
      await route.fulfill({ status: 204, body: "" });
      return;
    }
    const response = await route.fetch({
      url: route.request().url().replace(publicOrigin, localOrigin),
    });
    await route.fulfill({ response });
  });

  await page.goto(`${publicOrigin}/`);
  await page.getByRole("button", { name: "Privacy preferences", exact: true }).click();
  const analytics = page.getByRole("checkbox", {
    name: "Allow aggregate usage statistics",
  });
  await expect(analytics).not.toBeChecked();
  expect(analyticsRequests).toHaveLength(0);
  expect(
    await page.evaluate(() => localStorage.getItem("sleeplike-analytics")),
  ).toBeNull();

  await analytics.check();
  await expect.poll(() => analyticsRequests.length).toBe(1);
  expect(
    await page.evaluate(() => localStorage.getItem("sleeplike-analytics")),
  ).toBe("yes");

  await page.reload();
  await expect.poll(() => analyticsRequests.length).toBe(2);
  await page.getByRole("button", { name: "Privacy preferences", exact: true }).click();
  await page
    .getByRole("checkbox", { name: "Allow aggregate usage statistics" })
    .uncheck();
  expect(
    await page.evaluate(() => localStorage.getItem("sleeplike-analytics")),
  ).toBe("no");

  await page.reload();
  await page.getByRole("button", { name: "Privacy preferences", exact: true }).click();
  await expect(
    page.getByRole("checkbox", { name: "Allow aggregate usage statistics" }),
  ).not.toBeChecked();
  expect(analyticsRequests).toHaveLength(2);
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
