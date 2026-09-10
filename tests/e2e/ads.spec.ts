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
      "process.env.NEXT_PUBLIC_GOOGLE_CMP_SRC":
        '"https://fundingchoicesmessages.google.com/i/pub-0000000000000000"',
      "process.env.NEXT_PUBLIC_VERCEL_ENV": '"production"',
    },
  });
  bundle = result.outputFiles[0].text;
});
const consentScript = `window.__consentListeners=[];window.__setConsent=(yes)=>{window.__consentListeners.forEach(callback=>callback({listenerId:1,cmpStatus:'loaded',eventStatus:'useractioncomplete',purpose:{consents:{1:yes,2:yes,7:yes,9:yes,10:yes}},vendor:{consents:{755:yes}}},true))};window.__tcfapi=(command,version,callback)=>{if(command==='addEventListener'){window.__consentListeners.push(callback);window.__setConsent(false)}};window.googlefc={showRevocationMessage:()=>window.__setConsent(false)};`;
async function fixture(
  page: any,
  {
    cmpFail = false,
    adBlocked = false,
  }: { cmpFail?: boolean; adBlocked?: boolean } = {},
) {
  const requests: string[] = [];
  // Every request is intercepted. No mock publisher, consent or impression reaches Google.
  await page.route("**/*", async (route: any) => {
    const url = new URL(route.request().url());
    requests.push(url.href);
    if (url.hostname === "sleeplike.maat.work")
      return route.fulfill({
        contentType: "text/html",
        body: `<!doctype html><html lang="en"><head><title>Isolated consent fixture</title></head><body><div id="root"></div><script>${bundle.replace(/<\/script/gi, "<\\/script")}</script></body></html>`,
      });
    if (url.hostname === "fundingchoicesmessages.google.com")
      return cmpFail
        ? route.abort()
        : route.fulfill({
            contentType: "text/javascript",
            body: consentScript,
          });
    if (url.hostname === "pagead2.googlesyndication.com")
      return adBlocked
        ? route.abort()
        : route.fulfill({
            contentType: "text/javascript",
            body: `window.__adRequests=0;window.adsbygoogle=[];window.adsbygoogle.push=function(){window.__adRequests++;window.__npa=this.requestNonPersonalizedAds;document.querySelectorAll('ins.adsbygoogle').forEach(node=>node.setAttribute('data-ad-status','filled'));return 1;};`,
          });
    return route.abort();
  });
  await page.goto("https://sleeplike.maat.work/__test");
  await expect(
    page.getByRole("button", { name: "Calculate fixture" }),
  ).toBeVisible();
  return requests;
}
test("CMP rejected, accepted and revoked; no ad before result; no repeated requests", async ({
  page,
}) => {
  const requests = await fixture(page);
  await expect
    .poll(() => page.evaluate(() => (window as any).__consentListeners?.length))
    .toBe(1);
  await page.evaluate(() => (window as any).__setConsent(true));
  await expect(page.locator(".adsbygoogle")).toHaveCount(0);
  expect(requests.some((url) => url.includes("pagead2"))).toBe(false);
  await page.getByRole("button", { name: "Calculate fixture" }).click();
  await expect
    .poll(() => page.evaluate(() => (window as any).__adRequests))
    .toBe(1);
  expect(await page.evaluate(() => (window as any).__npa)).toBe(1);
  await expect(page.getByText("Advertisement", { exact: true })).toBeVisible();
  await page.evaluate(() => (window as any).__setConsent(false));
  await expect(page.locator(".adsbygoogle")).toHaveCount(0);
  await page.evaluate(() => (window as any).__setConsent(true));
  await page.getByRole("button", { name: "Calculate fixture" }).click();
  await expect
    .poll(() => page.evaluate(() => (window as any).__adRequests))
    .toBe(1);
});
test("rejection, CMP failure and blocked ads leave calculation available", async ({
  page,
}) => {
  await fixture(page, { cmpFail: true });
  await page.getByRole("button", { name: "Calculate fixture" }).click();
  await expect(page.locator(".adsbygoogle")).toHaveCount(0);
  await page.unroute("**/*");
  const requests = await fixture(page, { adBlocked: true });
  await expect
    .poll(() => page.evaluate(() => (window as any).__consentListeners?.length))
    .toBe(1);
  await page.getByRole("button", { name: "Calculate fixture" }).click();
  await expect(page.locator(".adsbygoogle")).toHaveCount(0);
  await page.evaluate(() => (window as any).__setConsent(true));
  await expect.poll(() => requests.some(url => url.includes('pagead2.googlesyndication.com'))).toBe(true);
  await expect(page.locator('.adsbygoogle')).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Calculate fixture" }),
  ).toBeEnabled();
  await expect(page.locator(".ad-label")).toHaveCount(0);
});
