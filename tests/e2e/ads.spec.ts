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
  window.__adRequests = window.__adRequests || 0;
  window.__pauseValues = window.__pauseValues || [];
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

const isAdRequest = (url: string) =>
  /googlesyndication|doubleclick|fundingchoices|pagead2/i.test(url);

async function fixture(
  page: any,
  {
    sdkBlocked = false,
    consentApiBlocked = false,
    analyticsStored = false,
    adsStored = false,
    storageFailure,
    broadcastChannelFailure,
  }: {
    sdkBlocked?: boolean;
    consentApiBlocked?: boolean;
    analyticsStored?: boolean;
    adsStored?: boolean;
    storageFailure?: "read" | "write" | "revoke";
    broadcastChannelFailure?: "missing" | "open" | "send-only";
  } = {},
) {
  const requests: string[] = [];
  if (analyticsStored) {
    await page.addInitScript(() =>
      localStorage.setItem("sleeplike-analytics", "yes"),
    );
  }
  if (adsStored) {
    await page.addInitScript(() => localStorage.setItem("sleeplike-ads", "yes"));
  }
  if (broadcastChannelFailure) {
    await page.addInitScript(
      (failure: "missing" | "open" | "send-only") => {
        const NativeBroadcastChannel = window.BroadcastChannel;
        if (failure === "send-only") {
          Object.defineProperty(
            window,
            "__sendOnlyBroadcastChannelSupported",
            {
              configurable: true,
              value: typeof NativeBroadcastChannel === "function",
            },
          );
        }
        if (failure === "send-only" && NativeBroadcastChannel) {
          let channelCount = 0;
          class SendOnlyBroadcastChannel {
            private readonly channel: BroadcastChannel;
            private readonly canReceive: boolean;
            onmessage: ((event: MessageEvent) => void) | null = null;
            onmessageerror: ((event: MessageEvent) => void) | null = null;
            private readonly messageListeners = new Set<EventListener>();
            private readonly messageErrorListeners = new Set<EventListener>();

            constructor(name: string) {
              this.channel = new NativeBroadcastChannel(name);
              this.canReceive = channelCount++ > 0;
              this.channel.onmessage = (event) => {
                if (!this.canReceive) return;
                this.onmessage?.call(this as any, event);
                this.messageListeners.forEach((listener) =>
                  listener.call(this, event),
                );
              };
              this.channel.onmessageerror = (event) => {
                if (!this.canReceive) return;
                this.onmessageerror?.call(this as any, event);
                this.messageErrorListeners.forEach((listener) =>
                  listener.call(this, event),
                );
              };
            }

            postMessage(message: unknown) {
              this.channel.postMessage(message);
            }

            addEventListener(type: string, listener: EventListener) {
              if (type === "message") this.messageListeners.add(listener);
              else if (type === "messageerror")
                this.messageErrorListeners.add(listener);
            }

            removeEventListener(type: string, listener: EventListener) {
              if (type === "message") this.messageListeners.delete(listener);
              else if (type === "messageerror")
                this.messageErrorListeners.delete(listener);
            }

            close() {
              this.channel.close();
            }

            start() {}
          }
          Object.defineProperty(window, "BroadcastChannel", {
            configurable: true,
            value: SendOnlyBroadcastChannel,
          });
          return;
        }

        Object.defineProperty(window, "BroadcastChannel", {
          configurable: true,
          value:
            failure === "missing"
              ? undefined
              : class {
                  constructor() {
                    throw new Error("BroadcastChannel unavailable");
                  }
                },
        });
      },
      broadcastChannelFailure,
    );
  }
  if (storageFailure === "read") {
    await page.addInitScript(() => {
      const original = Storage.prototype.getItem;
      Object.defineProperty(Storage.prototype, "getItem", {
        configurable: true,
        value(this: Storage, key: string) {
          if (key === "sleeplike-ads") throw new Error("storage unavailable");
          return original.call(this, key);
        },
      });
    });
  }
  if (storageFailure === "write" || storageFailure === "revoke") {
    await page.addInitScript((failAllAdWrites: boolean) => {
      const original = Storage.prototype.setItem;
      (window as any).__adsPreferenceWriteAttempts = [];
      Object.defineProperty(Storage.prototype, "setItem", {
        configurable: true,
        value(this: Storage, key: string, value: string) {
          if (key === "sleeplike-ads")
            (window as any).__adsPreferenceWriteAttempts.push(value);
          if (
            key === "sleeplike-ads" &&
            (failAllAdWrites || value === "no")
          )
            throw new Error("storage unavailable");
          return original.call(this, key, value);
        },
      });
    }, storageFailure === "write");
  }
  if (storageFailure === "revoke") {
    await page.addInitScript(() => {
      const original = Storage.prototype.removeItem;
      Object.defineProperty(Storage.prototype, "removeItem", {
        configurable: true,
        value(this: Storage, key: string) {
          if (key === "sleeplike-ads") throw new Error("storage unavailable");
          return original.call(this, key);
        },
      });
    });
  }
  // All traffic is intercepted; the fake publisher, CMP and ad impression stay local.
  await page.route("**/*", async (route: any) => {
    const url = new URL(route.request().url());
    requests.push(url.href);
    if (
      url.hostname === "sleeplike.maat.work" &&
      url.pathname.startsWith("/_vercel/insights/")
    )
      return route.fulfill({ status: 204, body: "" });
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
  await page.goto(
    "https://sleeplike.maat.work/__test?mode=nap&nap=14%3A37#sleep=mode=nap&private=fragment-value",
  );
  await expect(
    page.getByRole("button", { name: "Calculate fixture" }),
  ).toBeVisible();
  await expect
    .poll(() => page.evaluate(() => location.search + location.hash))
    .toBe("");
  return requests;
}

const openPreferences = async (page: any) => {
  const button = page.getByRole("button", { name: "Privacy preferences" });
  if ((await button.getAttribute("aria-expanded")) !== "true") {
    await button.click();
  }
};

const advertisingChoice = (page: any) =>
  page.getByRole("checkbox", {
    name: "Allow non-personalized ads and load advertising services",
  });

const enableAdsWithKeyboard = async (page: any) => {
  await openPreferences(page);
  const choice = advertisingChoice(page);
  await expect(choice).not.toBeChecked();
  await choice.focus();
  await choice.press("Space");
  await expect(choice).toBeChecked();
};

test("fresh load and rejection make no ad request; URL data stays out of third-party requests", async ({
  page,
}) => {
  const requests = await fixture(page);
  expect(requests.filter(isAdRequest)).toHaveLength(0);
  expect(await page.evaluate(() => (window as any).adsbygoogle)).toBeUndefined();
  expect(await page.evaluate(() => (window as any).googlefc)).toBeUndefined();
  await expect(page.locator('script[src*="googlesyndication"]')).toHaveCount(0);

  await openPreferences(page);
  const choice = advertisingChoice(page);
  await expect(choice).not.toBeChecked();
  expect(await page.evaluate(() => localStorage.getItem("sleeplike-ads"))).toBeNull();
  await page.getByRole("button", { name: "Close" }).click();

  expect(requests.filter(isAdRequest)).toHaveLength(0);
  expect(
    requests.filter(isAdRequest).some((url) =>
      /nap=14|fragment-value|private=/.test(url),
    ),
  ).toBe(false);
});

test("analytics opt-in alone never loads the advertising SDK", async ({
  page,
}) => {
  const requests = await fixture(page, { analyticsStored: true });
  await openPreferences(page);
  await expect(
    page.getByRole("checkbox", { name: "Allow aggregate usage statistics" }),
  ).toBeChecked();
  await expect(advertisingChoice(page)).not.toBeChecked();
  expect(requests.filter(isAdRequest)).toHaveLength(0);
  await expect(
    page.locator('script[src*="googlesyndication"]'),
  ).toHaveCount(0);
});

test("a saved affirmative choice is not reused on a new visit", async ({
  page,
}) => {
  const requests = await fixture(page, { adsStored: true });
  expect(requests.filter(isAdRequest)).toHaveLength(0);
  expect(await page.evaluate(() => (window as any).adsbygoogle)).toBeUndefined();
  await expect(page.locator('script[src*="googlesyndication"]')).toHaveCount(0);
  await openPreferences(page);
  await expect(advertisingChoice(page)).not.toBeChecked();
  expect(await page.evaluate(() => localStorage.getItem("sleeplike-ads"))).toBe(
    "yes",
  );
});

test("storage read and write failures keep advertising fail-closed", async ({
  page,
}) => {
  const requests = await fixture(page, { storageFailure: "read" });
  expect(requests.filter(isAdRequest)).toHaveLength(0);
  await openPreferences(page);
  await expect(page.getByRole("status")).toContainText(
    "choice could not be checked or saved",
  );
  await expect(advertisingChoice(page)).not.toBeChecked();

  await page.reload();
  // The reload keeps the failing read hook installed and still makes no request.
  await expect(
    page.getByRole("button", { name: "Privacy preferences" }),
  ).toBeVisible();
  expect(requests.filter(isAdRequest)).toHaveLength(0);

  const writeFailurePage = await page.context().newPage();
  const writeRequests = await fixture(writeFailurePage, {
    storageFailure: "write",
  });
  await openPreferences(writeFailurePage);
  const writeChoice = advertisingChoice(writeFailurePage);
  await writeChoice.focus();
  await writeChoice.press("Space");
  await expect(writeChoice).not.toBeChecked();
  await expect(writeFailurePage.getByRole("status")).toContainText(
    "choice could not be checked or saved",
  );
  expect(
    await writeFailurePage.evaluate(() =>
      localStorage.getItem("sleeplike-ads"),
    ),
  ).toBeNull();
  expect(writeRequests.filter(isAdRequest)).toHaveLength(0);
  await expect(
    writeFailurePage.locator('script[src*="googlesyndication"]'),
  ).toHaveCount(0);
});

test("a send-only BroadcastChannel cannot enable ads without confirmed receipt", async ({
  page,
}) => {
  const requests = await fixture(page, {
    broadcastChannelFailure: "send-only",
  });
  expect(
    await page.evaluate(
      () => (window as any).__sendOnlyBroadcastChannelSupported,
    ),
  ).toBe(true);
  await openPreferences(page);
  const choice = advertisingChoice(page);
  await choice.focus();
  await choice.press("Space");

  await expect(choice).not.toBeChecked();
  await expect(page.getByRole("status")).toContainText(
    "choice could not be checked or saved",
  );
  expect(await page.evaluate(() => localStorage.getItem("sleeplike-ads"))).toBe(
    null,
  );
  expect(requests.filter(isAdRequest)).toHaveLength(0);
  expect(await page.evaluate(() => (window as any).adsbygoogle)).toBeUndefined();
  await expect(
    page.locator('script[src*="googlesyndication"]'),
  ).toHaveCount(0);

  await page.getByRole("button", { name: "Calculate fixture" }).click();
  await expect(page.locator(".adsbygoogle")).toHaveCount(0);
  expect(requests.filter(isAdRequest)).toHaveLength(0);
});

test("failed revocation persistence cannot restart ads after reload", async ({
  page,
  context,
}) => {
  const requests = await fixture(page, {
    adsStored: true,
    storageFailure: "revoke",
  });
  const other = await context.newPage();
  const otherRequests = await fixture(other);
  expect(requests.filter(isAdRequest)).toHaveLength(0);
  await enableAdsWithKeyboard(page);
  await expect
    .poll(() => page.evaluate(() => (window as any).__sdkLoaded))
    .toBe(true);
  await enableAdsWithKeyboard(other);
  await expect
    .poll(() => other.evaluate(() => (window as any).__sdkLoaded))
    .toBe(true);
  await page.evaluate(() => (window as any).__setConsent(true));
  await other.evaluate(() => (window as any).__setConsent(true));
  await page.getByRole("button", { name: "Calculate fixture" }).click();
  await other.getByRole("button", { name: "Calculate fixture" }).click();
  await expect
    .poll(() => page.evaluate(() => (window as any).__adRequests))
    .toBe(1);
  await expect
    .poll(() => other.evaluate(() => (window as any).__adRequests))
    .toBe(1);
  await other.evaluate(() => {
    (window as any).__staleConsent = (window as any).__consentListeners[0];
  });

  await openPreferences(page);
  const choice = advertisingChoice(page);
  await choice.focus();
  await choice.press("Space");
  await expect(choice).not.toBeChecked();
  await expect(page.getByRole("status")).toContainText(
    "revocation could not be saved",
  );
  await expect
    .poll(() => other.evaluate(() => (window as any).adsbygoogle?.pauseAdRequests))
    .toBe(1);
  await expect(other.locator(".adsbygoogle")).toHaveCount(0);
  await other.evaluate(() => {
    const data = {
      listenerId: 1,
      cmpStatus: "loaded",
      eventStatus: "useractioncomplete",
      purpose: { consents: { 1: true, 2: true, 7: true, 9: true, 10: true } },
      vendor: { consents: { 755: true } },
    };
    (window as any).__staleConsent?.(data, true);
  });
  await other.getByRole("button", { name: "Calculate fixture" }).click();
  expect(await other.evaluate(() => (window as any).__adRequests)).toBe(1);
  expect(await page.evaluate(() => localStorage.getItem("sleeplike-ads"))).toBe(
    "yes",
  );
  const adSdkRequestsBeforeReload = requests.filter(isAdRequest).length;
  expect(await page.locator(".adsbygoogle").count()).toBe(0);

  await page.reload();
  await openPreferences(page);
  await expect(advertisingChoice(page)).not.toBeChecked();
  expect(await page.evaluate(() => localStorage.getItem("sleeplike-ads"))).toBe(
    "yes",
  );
  expect(requests.filter(isAdRequest)).toHaveLength(adSdkRequestsBeforeReload);
  expect(await page.evaluate(() => (window as any).adsbygoogle)).toBeUndefined();
  await expect(page.locator('script[src*="googlesyndication"]')).toHaveCount(0);
  await page.getByRole("button", { name: "Calculate fixture" }).click();
  await expect(page.locator(".adsbygoogle")).toHaveCount(0);
  expect(otherRequests.filter(isAdRequest)).toHaveLength(1);
});

test("multiple tabs fail closed with stale grants when BroadcastChannel and storage writes fail", async ({
  page,
  context,
}) => {
  const other = await context.newPage();
  const requests = await fixture(page, {
    adsStored: true,
    storageFailure: "revoke",
    broadcastChannelFailure: "missing",
  });
  const otherRequests = await fixture(other, {
    storageFailure: "revoke",
    broadcastChannelFailure: "open",
  });

  for (const tab of [page, other]) {
    await expect(
      tab.getByRole("button", { name: "Privacy preferences" }),
    ).toBeVisible();
    expect(await tab.evaluate(() => localStorage.getItem("sleeplike-ads"))).toBe(
      "yes",
    );
    expect(await tab.evaluate(() => (window as any).adsbygoogle)).toBeUndefined();
    await expect(tab.locator('script[src*="googlesyndication"]')).toHaveCount(0);

    await openPreferences(tab);
    const choice = advertisingChoice(tab);
    await tab.evaluate(() => {
      (window as any).__adsPreferenceWriteAttempts = [];
    });
    await choice.focus();
    await choice.press("Space");
    await expect(choice).not.toBeChecked();
    await expect(tab.getByRole("status")).toContainText(
      "choice could not be checked or saved",
    );
    expect(await tab.evaluate(() => localStorage.getItem("sleeplike-ads"))).toBe(
      "yes",
    );
    expect(
      await tab.evaluate(() => (window as any).__adsPreferenceWriteAttempts),
    ).toEqual([]);

    const failedRevocation = await tab.evaluate(() => {
      let setFailed = false;
      let removeFailed = false;
      try {
        localStorage.setItem("sleeplike-ads", "no");
      } catch {
        setFailed = true;
      }
      try {
        localStorage.removeItem("sleeplike-ads");
      } catch {
        removeFailed = true;
      }
      return {
        setFailed,
        removeFailed,
        storedChoice: localStorage.getItem("sleeplike-ads"),
      };
    });
    expect(failedRevocation).toEqual({
      setFailed: true,
      removeFailed: true,
      storedChoice: "yes",
    });
    await tab.getByRole("button", { name: "Calculate fixture" }).click();
    await expect(tab.locator(".adsbygoogle")).toHaveCount(0);
    expect(await tab.evaluate(() => (window as any).__adRequests)).toBeUndefined();
  }

  expect(requests.filter(isAdRequest)).toHaveLength(0);
  expect(otherRequests.filter(isAdRequest)).toHaveLength(0);
});

test("separate keyboard opt-in loads CMP after the choice; TCF consent gates ads and revocation stops later requests", async ({
  page,
}) => {
  const requests = await fixture(page);
  expect(requests.filter(isAdRequest)).toHaveLength(0);

  await enableAdsWithKeyboard(page);
  await expect
    .poll(() => page.evaluate(() => (window as any).__sdkLoaded))
    .toBe(true);
  await expect
    .poll(() => page.evaluate(() => (window as any).__consentListeners?.length))
    .toBe(1);
  await expect
    .poll(() => page.evaluate(() => (window as any).adsbygoogle?.pauseAdRequests))
    .toBe(1);
  expect(await page.evaluate(() => (window as any).__bootstrap)).toEqual([1, 1]);
  expect(requests.filter(isAdRequest)).toHaveLength(1);
  expect(
    requests
      .filter(isAdRequest)
      .every((url) => !/nap=14|fragment-value|private=/.test(url)),
  ).toBe(true);
  expect(await page.evaluate(() => localStorage.getItem("sleeplike-ads"))).toBe(
    "yes",
  );
  await expect(
    page.getByRole("checkbox", { name: "Allow aggregate usage statistics" }),
  ).not.toBeChecked();

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

  await page.evaluate(() => {
    (window as any).__staleConsent = (window as any).__consentListeners[0];
  });
  await openPreferences(page);
  const choice = advertisingChoice(page);
  await choice.focus();
  await choice.press("Space");
  await expect(choice).not.toBeChecked();
  await expect
    .poll(() => page.evaluate(() => (window as any).__revocationCalls))
    .toBe(1);
  expect(await page.evaluate(() => localStorage.getItem("sleeplike-ads"))).toBe(
    "no",
  );
  await expect(page.locator(".adsbygoogle")).toHaveCount(0);
  await expect
    .poll(() => page.evaluate(() => (window as any).adsbygoogle?.pauseAdRequests))
    .toBe(1);

  await page.evaluate(() => {
    const data = {
      listenerId: 1,
      cmpStatus: "loaded",
      eventStatus: "useractioncomplete",
      purpose: { consents: { 1: true, 2: true, 7: true, 9: true, 10: true } },
      vendor: { consents: { 755: true } },
    };
    (window as any).__staleConsent?.(data, true);
  });
  await expect
    .poll(() => page.evaluate(() => (window as any).adsbygoogle?.pauseAdRequests))
    .toBe(1);
  expect(await page.evaluate(() => (window as any).__adRequests)).toBe(1);

  await page.reload();
  await expect(
    page.getByRole("button", { name: "Privacy preferences" }),
  ).toBeVisible();
  expect(requests.filter(isAdRequest)).toHaveLength(1);
});

test("missing CMP API keeps ads disabled", async ({
  page,
}) => {
  const missingApiRequests = await fixture(page, { consentApiBlocked: true });
  await enableAdsWithKeyboard(page);
  await expect
    .poll(() => page.evaluate(() => (window as any).__sdkLoaded))
    .toBe(true);
  await page.getByRole("button", { name: "Calculate fixture" }).click();
  await expect(page.locator(".adsbygoogle")).toHaveCount(0);
  expect(await page.evaluate(() => (window as any).__adRequests)).toBe(0);
  expect(missingApiRequests.filter(isAdRequest)).toHaveLength(1);
  expect(await page.evaluate(() => (window as any).adsbygoogle.pauseAdRequests)).toBe(1);
});

test("blocked SDK leaves calculation available without ads", async ({ page }) => {
  const requests = await fixture(page, { sdkBlocked: true });
  await enableAdsWithKeyboard(page);
  await expect
    .poll(() => requests.filter(isAdRequest).length)
    .toBe(1);
  await page.getByRole("button", { name: "Calculate fixture" }).click();
  await expect(page.locator(".adsbygoogle")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Calculate fixture" }),
  ).toBeEnabled();
  expect(await page.evaluate(() => (window as any).__adRequests)).toBeUndefined();
});

test("offline mode pauses ads after first-party opt-in", async ({ page }) => {
  await fixture(page);
  await enableAdsWithKeyboard(page);
  await expect
    .poll(() => page.evaluate(() => (window as any).__sdkLoaded))
    .toBe(true);
  await page.evaluate(() => (window as any).__setConsent(true));
  await page.context().setOffline(true);
  await expect.poll(() => page.evaluate(() => navigator.onLine)).toBe(false);
  await expect
    .poll(() => page.evaluate(() => (window as any).adsbygoogle?.pauseAdRequests))
    .toBe(1);
  await page.getByRole("button", { name: "Calculate fixture" }).click();
  await expect(page.locator(".adsbygoogle")).toHaveCount(0);
});

test("advertising revocation synchronizes across tabs and blocks stale CMP callbacks", async ({
  page,
  context,
}) => {
  await fixture(page);
  const other = await context.newPage();
  const otherRequests = await fixture(other);

  await enableAdsWithKeyboard(page);
  await expect
    .poll(() => page.evaluate(() => (window as any).__sdkLoaded))
    .toBe(true);
  await expect(
    other.locator('script[src*="googlesyndication"]'),
  ).toHaveCount(0);
  await enableAdsWithKeyboard(other);
  await expect
    .poll(() => other.evaluate(() => (window as any).__consentListeners?.length))
    .toBe(1);
  await other.evaluate(() => (window as any).__setConsent(true));
  await other.getByRole("button", { name: "Calculate fixture" }).click();
  await expect
    .poll(() => other.evaluate(() => (window as any).__adRequests))
    .toBe(1);
  await other.evaluate(() => {
    (window as any).__staleConsent = (window as any).__consentListeners[0];
  });

  await openPreferences(page);
  const choice = advertisingChoice(page);
  await choice.focus();
  await choice.press("Space");
  await expect(choice).not.toBeChecked();
  await expect
    .poll(() => other.evaluate(() => (window as any).adsbygoogle?.pauseAdRequests))
    .toBe(1);
  await expect(other.locator(".adsbygoogle")).toHaveCount(0);

  await other.evaluate(() => {
    const data = {
      listenerId: 1,
      cmpStatus: "loaded",
      eventStatus: "useractioncomplete",
      purpose: { consents: { 1: true, 2: true, 7: true, 9: true, 10: true } },
      vendor: { consents: { 755: true } },
    };
    (window as any).__staleConsent?.(data, true);
  });
  await other.getByRole("button", { name: "Calculate fixture" }).click();
  await expect(other.locator(".adsbygoogle")).toHaveCount(0);
  expect(await other.evaluate(() => (window as any).__adRequests)).toBe(1);
  expect(otherRequests.filter(isAdRequest)).toHaveLength(1);
});
