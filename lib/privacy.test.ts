import { describe, it, expect } from "vitest";
import {
  permitsNonPersonalizedAds,
  readSharedSettings,
  publicPageUrl,
  type TcfData,
} from "./privacy";
const allowed: TcfData = {
  cmpStatus: "loaded",
  eventStatus: "useractioncomplete",
  purpose: { consents: { 1: true, 2: true, 7: true, 9: true, 10: true } },
  vendor: { consents: { 755: true } },
};
describe("consent gates", () => {
  it("requires consent, loaded CMP and allowed purpose/vendor", () => {
    expect(permitsNonPersonalizedAds(allowed, true)).toBe(true);
    expect(permitsNonPersonalizedAds(allowed, false)).toBe(false);
    expect(permitsNonPersonalizedAds({}, true)).toBe(false);
    expect(
      permitsNonPersonalizedAds({ ...allowed, cmpStatus: "error" }, true),
    ).toBe(false);
    expect(
      permitsNonPersonalizedAds(
        { ...allowed, vendor: { consents: { 755: false } } },
        true,
      ),
    ).toBe(false);
    expect(
      permitsNonPersonalizedAds(
        { ...allowed, purpose: { consents: { 1: false } } },
        true,
      ),
    ).toBe(false);
    expect(
      permitsNonPersonalizedAds(
        { ...allowed, eventStatus: "cmpuishown" },
        true,
      ),
    ).toBe(false);
  });
});
describe("link privacy", () => {
  it("removes queries and fragments from telemetry URLs", () => {
    expect(
      publicPageUrl(
        "https://sleeplike.maat.work/siesta?nap=14:00#sleep=secret",
      ),
    ).toBe("https://sleeplike.maat.work/siesta");
  });
  it("only imports supported keys from old or fragment links", () => {
    const p = readSharedSettings(
      "https://sleeplike.maat.work/?mode=wake&secret=x#sleep=mode=nap&nap=14%3A00&unknown=no",
    );
    expect([...p]).toEqual([
      ["mode", "nap"],
      ["nap", "14:00"],
    ]);
  });
});
