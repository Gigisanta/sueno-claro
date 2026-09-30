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
  publisher: { restrictions: { 2: { 755: 1 }, 7: { 755: 1 }, 9: { 755: 1 }, 10: { 755: 1 } } },
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
  const legitimateInterest: TcfData = {
    cmpStatus: "loaded",
    eventStatus: "useractioncomplete",
    purpose: {
      consents: { 1: true },
      legitimateInterests: { 2: true, 7: true, 9: true, 10: true },
    },
    vendor: { consents: { 755: true }, legitimateInterests: { 755: true } },
  };
  it("requires Google's own legitimate interest in addition to purpose permissions", () => {
    expect(permitsNonPersonalizedAds(legitimateInterest, true)).toBe(true);
    for (const googlePermission of [false, undefined]) {
      expect(permitsNonPersonalizedAds({
        ...legitimateInterest,
        vendor: { consents: { 755: true }, legitimateInterests: { 755: googlePermission } },
      }, true)).toBe(false);
    }
  });
  it("uses Google's default legal basis unless the publisher requires consent", () => {
    expect(permitsNonPersonalizedAds({ ...allowed, publisher: undefined }, true)).toBe(false);
    expect(permitsNonPersonalizedAds({
      ...legitimateInterest,
      publisher: { restrictions: { 7: { 755: 1 } } },
    }, true)).toBe(false);
    expect(permitsNonPersonalizedAds({
      ...allowed,
      publisher: { restrictions: { ...allowed.publisher?.restrictions, 7: { 755: 2 } } },
    }, true)).toBe(false);
  });
  it.each([1, 2, 7, 9, 10])("honors a publisher prohibition for purpose %i", (purpose) => {
    expect(permitsNonPersonalizedAds({
      ...allowed,
      publisher: { restrictions: { ...allowed.publisher?.restrictions, [purpose]: { 755: 0 } } },
    }, true)).toBe(false);
  });
  it("does not treat an unsupported restriction as permission", () => {
    expect(permitsNonPersonalizedAds({
      ...legitimateInterest,
      publisher: { restrictions: { 7: { 755: 3 } } },
    }, true)).toBe(false);
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
