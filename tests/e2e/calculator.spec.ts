import { test, expect } from "@playwright/test";
import ICAL from "ical.js";
import { readFile } from "node:fs/promises";

test("clock-only wake links choose the next occurrence of the linked time", async ({ page }) => {
  await page.clock.install({ time: new Date("2026-09-11T11:15:00Z") });
  await page.goto("/calculadora-de-sueno#sleep=mode=wake&wake=07%3A00&latency=15");
  await expect(page.locator("#wakeAt-time")).toHaveValue("07:00");
  await expect(page.locator("#wakeAt-date")).toHaveValue("2026-09-12");
});

for (const scenario of [
  { name: "fold chooses the still-future second occurrence", now: "2026-11-01T06:15:00Z", params: "wake=01%3A30", date: "2026-11-01", occurrence: "later" },
  { name: "fold preserves an explicit later preference", now: "2026-11-01T05:15:00Z", params: "wake=01%3A30&wakeOccurrence=later", date: "2026-11-01", occurrence: "later" },
  { name: "gap skips the nonexistent local clock", now: "2026-03-08T06:15:00Z", params: "wake=02%3A30", date: "2026-03-09", occurrence: undefined },
]) {
  test(`clock-only DST link: ${scenario.name}`, async ({ page }) => {
    await page.clock.install({ time: new Date(scenario.now) });
    await page.goto(`/#sleep=mode=wake&${scenario.params}`);
    await expect(page.locator("#wakeAt-date")).toHaveValue(scenario.date);
    if (scenario.occurrence) await expect(page.locator("#wakeAt-occurrence")).toHaveValue(scenario.occurrence);
    await page.getByRole("button", { name: "Calculate", exact: true }).click();
    await expect(page.locator(".result")).toHaveCount(4);
    await expect(page.locator("#wakeAt-error")).toHaveCount(0);
  });
}

test("wake calculation, explicit date, accessible settings and complete ICS", async ({
  page,
}) => {
  await page.goto("/calculadora-de-sueno");
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page.locator(".result")).toHaveCount(0);
  await page.locator("#wakeAt-date").fill("2026-09-11");
  await page.locator("#wakeAt-time").fill("07:30");
  await page.getByRole("button", { name: "Calcular", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".result-time")).toHaveText([
    "22:15",
    "23:45",
    "01:15",
    "02:45",
  ]);
  await expect(page.getByRole("status")).toHaveText("4 opciones calculadas.");
  await expect(
    page.getByRole("button", { name: "Calcular", exact: true }),
  ).toBeFocused();
  await expect(page.locator(".short-sleep")).toHaveCount(2);
  const downloadPromise = page.waitForEvent("download");
  await page
    .getByRole("button", { name: "Recordatorio de calendario", exact: true })
    .first()
    .click();
  const download = await downloadPromise;
  const file = await download.path();
  expect(file).toBeTruthy();
  const event = new ICAL.Event(
    new ICAL.Component(
      ICAL.parse(await readFile(file!, "utf8")),
    ).getFirstSubcomponent("vevent")!,
  );
  expect(event.startDate.toJSDate().toISOString()).toBe(
    "2026-09-11T02:15:00.000Z",
  );
  expect(
    event.endDate.toJSDate().getTime() - event.startDate.toJSDate().getTime(),
  ).toBe(300000);
  expect(event.uid).toContain("sleeplike");
  await expect(page.locator('[data-testid^="ad-"]')).toHaveCount(0);
});
test("short window never yields a time beyond the selected limit", async ({
  page,
}) => {
  await page.goto("/calculadora-de-sueno");
  await page.getByRole("button", { name: "Ventana", exact: true }).click();
  await page.locator("#bedAt-date").fill("2026-09-10");
  await page.locator("#bedAt-time").fill("23:55");
  await page.locator("#wakeAt-date").fill("2026-09-11");
  await page.locator("#wakeAt-time").fill("00:00");
  await page.getByRole("button", { name: "Calcular", exact: true }).click();
  await expect(page.locator("#wakeAt-error")).toContainText("ventana");
  await expect(page.locator(".result")).toHaveCount(0);
  await page.locator("#wakeAt-time").fill("07:30");
  await page.getByRole("button", { name: "Calcular", exact: true }).click();
  await expect(page.locator(".result-time")).toHaveText(["06:10"]);
});
test("DST gap rejected and fold requires occurrence selection", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator("#wakeAt-date").fill("2026-03-08");
  await page.locator("#wakeAt-time").fill("02:30");
  await page.getByRole("button", { name: "Calculate", exact: true }).click();
  await expect(page.locator("#wakeAt-error")).toContainText("does not exist");
  await page.locator("#wakeAt-date").fill("2026-11-01");
  await page.locator("#wakeAt-time").fill("01:30");
  await page.getByRole("button", { name: "Calculate", exact: true }).click();
  await expect(page.locator("#wakeAt-error")).toContainText("Clocks go back");
  await page.locator("#wakeAt-occurrence").selectOption("later");
  await page.getByRole("button", { name: "Calculate", exact: true }).click();
  await expect(page.locator(".result")).toHaveCount(4);
});
test("nap entry, equivalent language navigation and legacy links", async ({
  page,
}) => {
  await page.goto("/siesta");
  await expect(
    page.getByRole("button", { name: "Siesta", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.locator("#napAt-time").fill("14:00");
  await page.getByRole("button", { name: "Calcular", exact: true }).click();
  await expect(page.locator(".result-time")).toHaveText(["14:20", "15:45"]);
  await expect(page.locator(".result-duration").first()).toHaveText(
    "20 min en cama",
  );
  await page.getByRole("link", { name: "English", exact: false }).click();
  await expect(page).toHaveURL(/\/nap-calculator$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.goto("/?mode=nap&nap=14%3A20&latency=30&cycle=100&format=12h");
  await expect(page.locator("#napAt-time")).toHaveValue("14:20");
  await expect(page).toHaveURL(/\/$/);
  await page.locator("summary").click();
  await expect(page.locator("#latency")).toHaveValue("30");
});
test("shared fragment imported and stripped; copy and Web Share alternatives", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: async (text: string) => {
          (window as any).__copied = text;
        },
      },
    });
    Object.defineProperty(navigator, "share", { value: undefined });
  });
  await page.goto(
    "/#sleep=mode=wake&wake=07%3A30&wakeDate=2026-09-11&latency=15",
  );
  await expect(page.locator("#wakeAt-time")).toHaveValue("07:30");
  await expect(page).toHaveURL(/\/$/);
  await page.getByRole("button", { name: "Calculate", exact: true }).click();
  await page.getByRole("button", { name: "Share plan", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("Link copied.");
  const copied = await page.evaluate(() => (window as any).__copied);
  expect(copied).toContain("#sleep=");
  expect(copied).not.toContain("?");
  await page
    .evaluate(() => {
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: {
          writeText: async () => {
            throw new Error("blocked");
          },
        },
      });
    })
    .catch(() => {});
});
test("clipboard failure offers selectable link; native share succeeds", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: async () => {
          throw new Error("blocked");
        },
      },
    });
    Object.defineProperty(navigator, "share", {
      configurable: true,
      value: async (data: unknown) => {
        (window as any).__shared = data;
      },
    });
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Calculate", exact: true }).click();
  await page.getByRole("button", { name: "Copy link", exact: true }).click();
  await expect(page.getByLabel("Plan link", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Share plan", exact: true }).click();
  expect(await page.evaluate(() => (window as any).__shared.url)).toContain(
    "#sleep=",
  );
});
test("sleep now remains a snapshot and offers refresh after returning", async ({
  page,
}) => {
  await page.clock.install({ time: new Date("2026-09-10T23:00:00Z") });
  await page.goto("/");
  await page.getByRole("button", { name: "Sleep now", exact: true }).click();
  await page.getByRole("button", { name: "Calculate", exact: true }).click();
  const first = await page.locator(".result-time").first().textContent();
  await page.clock.fastForward(60000);
  await expect(page.locator(".result-time").first()).toHaveText(first!);
  await page.evaluate(() =>
    document.dispatchEvent(new Event("visibilitychange")),
  );
  await page
    .getByRole("button", { name: "Update to now", exact: true })
    .click();
  await expect(page.locator(".result-time").first()).not.toHaveText(first!);
});
test("visited app works offline without third-party requests", async ({
  page,
  context,
  browserName,
}) => {
  await page.goto("/");
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await page.reload();
  await expect
    .poll(() => page.evaluate(() => !!navigator.serviceWorker.controller))
    .toBe(true);
  await context.setOffline(true);
  if (browserName !== "webkit") await page.reload();
  await page.getByRole("button", { name: "Calculate", exact: true }).click();
  await expect(page.locator(".result")).toHaveCount(4);
  await expect(page.locator('[data-testid^="ad-"]')).toHaveCount(0);
  await context.setOffline(false);
});
test("legacy overnight window infers tomorrow while explicit dates remain strict", async ({
  page,
}) => {
  await page.clock.install({ time: new Date("2026-09-10T09:00:00Z") });
  await page.goto("/?mode=window&bed=23%3A00&wake=07%3A30");
  await expect(page.locator("#bedAt-date")).toHaveValue("2026-09-10");
  await expect(page.locator("#wakeAt-date")).toHaveValue("2026-09-11");
  await page.getByRole("button", { name: "Calculate", exact: true }).click();
  await expect(page.locator(".result")).toHaveCount(1);
});
