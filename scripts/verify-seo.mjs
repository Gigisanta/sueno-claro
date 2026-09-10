import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { build } from "esbuild";

const bundle = await build({ stdin: { contents: 'export { pages } from "./lib/content/pages"; export { SITE_URL } from "./lib/site"; export { socialImagePath } from "./lib/social";', resolveDir: process.cwd() }, bundle: true, write: false, platform: "node", format: "esm" });
const { pages, SITE_URL, socialImagePath } = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString("base64")}`);
const sitemap = await readFile("out/sitemap.xml", "utf8");
const uniqueTitles = new Set();
for (const page of pages) {
  const html = await readFile(page.path === "/" ? "out/index.html" : `out${page.path}.html`, "utf8");
  assert(html.includes(`<html lang="${page.locale}"`), `Language: ${page.path}`);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  assert(canonical, `Missing canonical: ${page.path}`);
  assert.equal(new URL(canonical, SITE_URL).href, new URL(page.path, SITE_URL).href, `Canonical: ${page.path}`);
  assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1, `H1: ${page.path}`);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  assert(title && !uniqueTitles.has(title), `Unique title: ${page.path}`);
  uniqueTitles.add(title);
  const alternate = html.match(new RegExp(`hrefLang="${page.locale === "en" ? "es" : "en"}" href="([^"]+)"`))?.[1];
  assert(alternate, `Missing translation: ${page.path}`);
  assert.equal(new URL(alternate, SITE_URL).href, new URL(page.pairPath, SITE_URL).href, `Translation: ${page.path}`);
  assert(sitemap.includes(`<loc>${SITE_URL}${page.path}</loc>`), `Sitemap: ${page.path}`);
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
console.log(`Static SEO verified: ${pages.length} routes, translations, schemas, discovery links and images`);
