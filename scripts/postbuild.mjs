import { readFile, writeFile, readdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { join } from "node:path";
const files = [];
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) await walk(p);
    else files.push(p);
  }
}
await walk("out");
const assets = files.filter(
  (p) =>
    /\.(html|js|css|woff2|png|svg|webmanifest)$/.test(p) &&
    !p.startsWith("out/social/") &&
    !p.endsWith("/sw.js") &&
    !p.endsWith("/404.html"),
);
const hash = createHash("sha256");
for (const p of assets) hash.update(await readFile(p));
const version = hash.digest("hex").slice(0, 16);
const paths = assets.map((p) => {
  let path = p.slice(3);
  if (path === "/index.html") return "/";
  return path.endsWith(".html") ? path.slice(0, -5) : path;
});
const template = await readFile("scripts/sw-template.js", "utf8");
await writeFile(
  "out/sw.js",
  template
    .replace("__VERSION__", version)
    .replace("__PRECACHE__", JSON.stringify(paths)),
);
console.log(`Versioned offline shell ${version}: ${paths.length} assets`);
