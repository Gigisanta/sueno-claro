import { test, expect } from "@playwright/test";
import { build } from "esbuild";
import { resolve } from "node:path";

let bundle = "";

test.beforeAll(async () => {
  const result = await build({
    stdin: {
      contents: `import React,{useState} from 'react';import{createRoot}from'react-dom/client';import{PrivacyProvider}from'./components/PrivacyProvider';import{AdSlot}from'./components/AdSlot';function Fixture(){const[valid,setValid]=useState(false);const[key,setKey]=useState(0);return <PrivacyProvider locale="en"><button onClick={()=>{setValid(true);setKey(key+1)}}>Calculate fixture</button><AdSlot key={key} placement="result" eligible={valid} locale="en"/></PrivacyProvider>}createRoot(document.getElementById('root')).render(<Fixture/>);`,
      resolveDir: resolve("."),
      loader: "tsx",
    },
    bundle: true,
    write: false,
    jsx: "automatic",
    define: {
      "process.env.NODE_ENV": '"production"',
      "process.env.NEXT_PUBLIC_ADS_APPROVED": '"true"',
      "process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID":
        '"ca-pub-0000000000000000"',
      "process.env.NEXT_PUBLIC_ADSENSE_RESULT_SLOT": '"1111111111"',
      "process.env.NEXT_PUBLIC_ADSENSE_ARTICLE_SLOT": '"2222222222"',
      "process.env.NEXT_PUBLIC_VERCEL_ENV": '"production"',
    },
  });
  bundle = result.outputFiles[0].text;
});

const consentScript = `
  window.__consentListeners = [];
  window.__revocationCalls = 0;
  window.__setConsent = (yes) => {
    const data = {
      listenerId: 1,
      cmpStatus: 'loaded',
      eventStatus: 'useractioncomplete',
      purpose: { consents: { 1: yes, 2: yes, 7: yes, 9: yes, 10: yes } },
      vendor: { consents: { 755: yes } }
    };
    window.__consentListeners.slice().forEach((callback) => callback(data, true));
  };
  const queued = window.googlefc?.callbackQueue;
  const pending = Array.isArray(queued) ? queued : [];
  const run = (item) => {
    if (item?.CONSENT_DATA_READY) setTimeout(() => item.CONSENT_DATA_READY(), 0);
    if (item?.CONSENT_API_READY) setTimeout(() => item.CONSENT_API_READY(), 0);
  };
  window.googlefc = window.googlefc || {};
  window.googlefc.callbackQueue = {
    push(item) {
      pending.push(item);
      run(item);
      return pending.length;
    }
  };
  pending.forEach(run);
  window.__tcfapi = (command, version, callback, listenerId) => {
    if (command === 'addEventListener') {
      window.__consentListeners.push(callback);
      window.__setConsent(false);
    }
    if (command === 'removeEventListener') {
      window.__consentListeners = [];
    }
  };
  window.googlefc.showRevocationMessage = () => {
    window.__pauseAtRevocation = window.adsbygoogle.pauseAdRequests;
    window.__revocationCalls += 1;
    window.__setConsent(false);
  };
`;

const adsenseScript = (withConsentApi: boolean) => `
  window.__bootstrap = [window.adsbygoogle?.pauseAdRequests, window.adsbygoogle?.requestNonPersonalizedAds];
  window.__sdkLoaded = true;
  window.__adRequests = 0;
  window.__pauseValues = [];
  window.adsbygoogle = window.adsbygoogle || [];
  window.adsbygoogle.push = function() {
    window.__adRequests += 1;
    window.__npa = this.requestNonPersonalizedAds;
    window.__pauseAtRequest = this.pauseAdRequests;
    window.__pauseValues.push(this.pauseAdRequests);
    document.querySelectorAll('ins.adsbygoogle').forEach((node) => node.setAttribute('data-ad-status', 'filled'));
    return 1;
  };
  ${withConsentApi ? consentScript : ""}
`;

async function fixture(
  page: any,
  {
    sdkBlocked = false,
    consentApiBlocked = false,
  }: { sdkBlocked?: boolean; consentApiBlocked?: boolean } = {},
) {
  const requests: string[] = [];
  // Every request is intercepted. No publisher, consent or impression reaches Google.
  await page.route("**/*", async (route: any) => {
    const url = new URL(route.request().url());
    requests.push(url.href);
    if (url.hostname === "sleeplike.maat.work")
      return route.fulfill({
        contentType: "text/html",
        body: `<!doctype html><html lang="en"><head><title>Isolated consent fixture</title></head><body><div id="root"></div><script>${bundle.replace(/<\/script/gi, "<\\/script")}</script></body></html>`,
      });
    if (url.hostname === "pagead2.googlesyndication.com")
      return sdkBlocked
        ? route.abort()
        : route.fulfill({
            contentType: "text/javascript",
            body: adsenseScript(!consentApiBlocked),
          });
    return route.abort();
  });
  await page.goto("https://sleeplike.maat.work/__test");
  await expect(
    page.getByRole("button", { name: "Calculate fixture" }),
  ).toBeVisible();
  return requests;
}

test("standard SDK is paused, units require late TCF consent and result, and revocation stops repeats", async ({
  page,
}) => {
  const requests = await fixture(page);
  await expect
    .poll(() => page.evaluate(() => (window as any).__sdkLoaded))
    .toBe(true);
  await expect
    .poll(() => page.evaluate(() => (window as any).__consentListeners?.length))
    .toBe(1);
  await expect
    .poll(() => page.evaluate(() => (window as any).adsbygoogle?.pauseAdRequests))
    .toBe(1);
  expect(requests.some((url) => url.includes("pagead2"))).toBe(true);
  expect(await page.evaluate(() => (window as any).__bootstrap)).toEqual([1, 1]);

  await page.getByRole("button", { name: "Calculate fixture" }).click();
  await expect(page.locator(".adsbygoogle")).toHaveCount(0);
  expect(await page.evaluate(() => (window as any).__adRequests)).toBe(0);

  await page.evaluate(() => (window as any).__setConsent(true));
  await expect
    .poll(() => page.evaluate(() => (window as any).__adRequests))
    .toBe(1);
  expect(await page.evaluate(() => (window as any).__npa)).toBe(1);
  expect(await page.evaluate(() => (window as any).__pauseAtRequest)).toBe(0);
  await expect(page.getByText("Advertisement", { exact: true })).toBeVisible();

  await page.getByRole("button", { name: "Privacy preferences" }).click();
  await page
    .getByRole("button", { name: "Review advertising consent" })
    .click();
  await expect
    .poll(() => page.evaluate(() => (window as any).__revocationCalls))
    .toBe(1);
  expect(await page.evaluate(() => (window as any).__pauseAtRevocation)).toBe(1);
  await expect(page.locator(".adsbygoogle")).toHaveCount(0);
  await expect
    .poll(() => page.evaluate(() => (window as any).adsbygoogle?.pauseAdRequests))
    .toBe(1);

  await page.evaluate(() => (window as any).__setConsent(true));
  await expect
    .poll(() => page.evaluate(() => (window as any).__adRequests))
    .toBe(1);
});

test("missing TCF API and offline mode keep units disabled", async ({ page }) => {
  await fixture(page, { consentApiBlocked: true });
  await page.getByRole("button", { name: "Calculate fixture" }).click();
  await expect(page.locator(".adsbygoogle")).toHaveCount(0);
  expect(await page.evaluate(() => (window as any).__adRequests)).toBe(0);

  await page.context().setOffline(true);
  await expect
    .poll(() => page.evaluate(() => navigator.onLine))
    .toBe(false);
  await page.evaluate(() => (window as any).__setConsent?.(true));
  await expect(page.locator(".adsbygoogle")).toHaveCount(0);
});

test("blocked standard SDK leaves the calculator available without ads", async ({
  page,
}) => {
  const requests = await fixture(page, { sdkBlocked: true });
  await page.getByRole("button", { name: "Calculate fixture" }).click();
  await expect(page.locator(".adsbygoogle")).toHaveCount(0);
  expect(await page.evaluate(() => (window as any).__adRequests)).toBeUndefined();
  await expect(
    page.getByRole("button", { name: "Calculate fixture" }),
  ).toBeEnabled();
  expect(requests.some((url) => url.includes("pagead2"))).toBe(true);
});


test("negative consent, CMP error and offline pause synchronously", async ({ page }) => {
  await fixture(page);
  await expect.poll(() => page.evaluate(() => (window as any).__consentListeners?.length)).toBe(1);
  for (const action of ["denied", "error", "offline"]) {
    await page.evaluate(() => (window as any).__setConsent(true));
    await expect.poll(() => page.evaluate(() => (window as any).adsbygoogle.pauseAdRequests)).toBe(0);
    const paused = await page.evaluate((action) => {
      const w = window as any;
      if (action === "denied") w.__setConsent(false);
      else if (action === "error") w.__consentListeners.forEach((callback: any) => callback(null, false));
      else {
        Object.defineProperty(navigator, "onLine", { configurable: true, get: () => false });
        window.dispatchEvent(new Event("offline"));
      }
      return w.adsbygoogle.pauseAdRequests;
    }, action);
    expect(paused).toBe(1);
    await expect(page.locator(".adsbygoogle")).toHaveCount(0);
  }
});
