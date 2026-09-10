import { gzipSync } from "node:zlib";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { resolve, extname } from "node:path";
import config from "../vercel.json" with { type: "json" };
const port = Number(process.env.PORT || 3100),
  root = resolve(process.env.STATIC_DIR || "out");
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webmanifest": "application/manifest+json",
  ".woff2": "font/woff2",
};
createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  if (url.pathname === "/sleep-calculator") {
    res.writeHead(308, { Location: "/" + url.search });
    res.end();
    return;
  }
  let path;
  try {
    path = decodeURIComponent(url.pathname);
  } catch {
    res.writeHead(400);
    res.end();
    return;
  }
  const full = resolve(root, "." + path);
  if (!full.startsWith(root + "/") && full !== root) {
    res.writeHead(403);
    res.end();
    return;
  }
  const candidates =
    path === "/"
      ? [root + "/index.html"]
      : [full, full + ".html", full + "/index.html"];
  let body,
    file,
    status = 200;
  for (const candidate of candidates) {
    try {
      body = await readFile(candidate);
      file = candidate;
      break;
    } catch {}
  }
  if (!body) {
    status = 404;
    file = root + "/404.html";
    try {
      body = await readFile(file);
    } catch {
      body = Buffer.from("Not found");
    }
  }
  const headers = Object.fromEntries(
    config.headers[0].headers.map((h) => [h.key, h.value]),
  );
  const compress =
    /gzip/.test(req.headers["accept-encoding"] || "") &&
    /\.(html|js|css|xml|svg|txt|webmanifest)$/.test(file);
  if (compress) {
    body = gzipSync(body);
    headers["Content-Encoding"] = "gzip";
    headers["Vary"] = "Accept-Encoding";
  }
  res.writeHead(status, {
    ...headers,
    "Content-Type": mime[extname(file)] || "application/octet-stream",
    "Cache-Control": "no-cache",
  });
  res.end(body);
}).listen(port, "127.0.0.1", () =>
  console.log(`Static export: http://127.0.0.1:${port}`),
);
