import { mkdir, writeFile } from "node:fs/promises";
import { build } from "esbuild";
import sharp from "sharp";

const bundle = await build({
  stdin: { contents: 'export { pages } from "./lib/content/pages"; export { socialImagePath } from "./lib/social";', resolveDir: process.cwd() },
  bundle: true, write: false, platform: "node", format: "esm",
});
const { pages, socialImagePath } = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString("base64")}`);
const escape = (text) => text.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[char]);
function lines(text) {
  const result = [""];
  for (const word of text.split(" ")) {
    if ((result.at(-1) + " " + word).trim().length > 32) result.push(word);
    else result[result.length - 1] = (result.at(-1) + " " + word).trim();
  }
  if (result.length > 4) throw new Error(`Social title needs editorial shortening: ${text}`);
  return result;
}
await mkdir("out/social", { recursive: true });
for (const page of pages) {
  const category = page.locale === "es"
    ? (page.kind === "tool" ? "PLANIFICA TU DESCANSO" : "ENTIENDE TU SUEÑO")
    : (page.kind === "tool" ? "PLAN YOUR REST" : "UNDERSTAND YOUR SLEEP");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <rect width="1200" height="630" fill="#111514"/>
    <rect x="0" y="0" width="12" height="630" fill="#e6c879"/>
    <circle cx="1080" cy="110" r="38" fill="#e6c879"/><circle cx="1095" cy="96" r="34" fill="#111514"/>
    <g font-family="sans-serif"><text x="76" y="105" font-size="36" fill="#e6c879" font-weight="700">SleepLike.</text>
    <text x="76" y="174" font-size="20" fill="#b4bdb5" letter-spacing="3">${category}</text>
    ${lines(page.title).map((line, index) => `<text x="76" y="${265 + index * 67}" font-size="54" fill="#f1f1e9" font-weight="700">${escape(line)}</text>`).join("")}
    <path d="M76 548H1124" stroke="#35413a"/>
    <text x="76" y="588" font-size="23" fill="#b4bdb5">sleeplike.maat.work</text>
    <text x="1124" y="588" text-anchor="end" font-size="20" fill="#b4bdb5">${page.locale === "es" ? "Sin registro · Para adultos" : "No sign-up · For adults"}</text></g>
  </svg>`;
  await writeFile(`out${socialImagePath(page.path)}`, await sharp(Buffer.from(svg)).png().toBuffer());
}
console.log(`Generated ${pages.length} localized social images`);
