import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { build } from "esbuild";

const bundle = await build({ stdin: { contents: 'export { pages } from "./lib/content/pages"; export { SITE_URL } from "./lib/site"; export { socialImagePath } from "./lib/social";', resolveDir: process.cwd() }, bundle: true, write: false, platform: "node", format: "esm" });
const { pages, SITE_URL, socialImagePath } = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString("base64")}`);
const sitemap = await readFile("out/sitemap.xml", "utf8");
const uniqueTitles = new Set();
const decode = (value) => value.replace(/&(#x[0-9a-f]+|#\d+|amp|quot|apos|lt|gt);/gi, (_, entity) => entity[0] === "#" ? String.fromCodePoint(parseInt(entity.slice(entity[1].toLowerCase() === "x" ? 2 : 1), entity[1].toLowerCase() === "x" ? 16 : 10)) : ({ amp: "&", quot: '"', apos: "'", lt: "<", gt: ">" })[entity.toLowerCase()]);
const sitemapEntries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => match[1]);
assert.equal(sitemapEntries.length, pages.length, "Every page belongs in the sitemap");
for (const page of pages) {
  const html = await readFile(page.path === "/" ? "out/index.html" : `out${page.path}.html`, "utf8");
  const documentTag = html.match(/<html\b[^>]*>/)?.[0];
  assert.equal(documentTag?.match(/\blang="([^"]+)"/)?.[1], page.locale, `Language: ${page.path}`);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  assert(canonical, `Missing canonical: ${page.path}`);
  assert.equal(new URL(canonical, SITE_URL).href, new URL(page.path, SITE_URL).href, `Canonical: ${page.path}`);
  assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1, `H1: ${page.path}`);
  const title = decode(html.match(/<title>(.*?)<\/title>/)?.[1] ?? "");
  assert(title && !uniqueTitles.has(title), `Unique title: ${page.path}`);
  assert(title.length <= 60, `Title length ${title.length}: ${page.path}`);
  const description = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "");
  assert(description && description.length <= 160, `Description length ${description.length}: ${page.path}`);
  uniqueTitles.add(title);
  const htmlAlternates = Object.fromEntries([...html.matchAll(/<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"/g)].map((match) => [match[1], new URL(match[2], SITE_URL).href]));
  const sitemapEntry = sitemapEntries.find((entry) => entry.includes(`<loc>${SITE_URL}${page.path}</loc>`));
  assert(sitemapEntry, `Sitemap: ${page.path}`);
  const sitemapAlternates = Object.fromEntries([...sitemapEntry.matchAll(/<xhtml:link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map((match) => [match[1], new URL(match[2], SITE_URL).href]));
  const translations = pages.filter((candidate) => candidate.key === page.key);
  assert.equal(translations.length, 6, `Six translations: ${page.path}`);
  const expectedAlternates = Object.fromEntries(translations.map((translation) => [translation.locale, SITE_URL + translation.path]));
  expectedAlternates["x-default"] = SITE_URL + translations.find((translation) => translation.locale === "en").path;
  assert.deepEqual(htmlAlternates, expectedAlternates, `HTML hreflang: ${page.path}`);
  assert.deepEqual(sitemapAlternates, expectedAlternates, `Sitemap hreflang: ${page.path}`);
  for (const translation of translations) {
    assert(html.includes(`href="${translation.path}" hrefLang="${translation.locale}"`), `Crawlable switcher: ${page.path} → ${translation.locale}`);
  }
  assert(html.includes('href="https://maat.work"'), `MaatWork footer: ${page.path}`);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
  assert(schemas.length > 0, `Structured data: ${page.path}`);
  if (page.path === "/") assert(schemas.some((schema) => schema["@graph"].some((node) => node["@type"] === "WebSite" && node.name === "SleepLike")));
  assert(html.includes(`${SITE_URL}${socialImagePath(page.path)}`), `Social metadata: ${page.path}`);
  const png = await readFile(`out${socialImagePath(page.path)}`);
  assert.equal(png.subarray(1, 4).toString(), "PNG");
  assert.deepEqual([png.readUInt32BE(16), png.readUInt32BE(20)], [1200, 630]);
  for (const target of pages.filter((candidate) => candidate.locale === page.locale && candidate.kind !== "legal")) {
    assert(html.includes(`href="${target.path}"`), `Discovery link: ${page.path} → ${target.path}`);
  }
}
console.log(`Static SEO verified: ${pages.length} routes, six-language reciprocal HTML/sitemap alternates + x-default, metadata lengths, schemas, discovery links and images`);
