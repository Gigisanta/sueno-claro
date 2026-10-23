#!/usr/bin/env node
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const host = 'sleeplike.maat.work';
const origin = `https://${host}`;
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const usage = 'Usage: npm run indexnow -- [--submit] <urls...> | --sitemap [--since YYYY-MM-DD]';

function validDate(value) {
  const date = new Date(`${value}T00:00:00Z`);
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(date.valueOf()) &&
    date.toISOString().slice(0, 10) === value;
}

function xmlText(value) {
  return value.trim().replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos);/gi, (_, entity) => {
    const named = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" };
    return entity.startsWith('#')
      ? String.fromCodePoint(entity[1].toLowerCase() === 'x' ? parseInt(entity.slice(2), 16) : Number(entity.slice(1)))
      : named[entity];
  });
}

function normalizeUrl(input, base = origin) {
  const url = new URL(input, base);
  if (url.origin !== origin || url.username || url.password) {
    throw new Error(`Only HTTPS URLs on ${host} are allowed: ${input}`);
  }
  url.hash = '';
  return url.href;
}

async function main(argv) {
  let submit = false;
  let sitemap = false;
  let since;
  const inputs = [];
  for (let index = 0; index < argv.length; index++) {
    const arg = argv[index];
    if (arg === '--submit') submit = true;
    else if (arg === '--sitemap') sitemap = true;
    else if (arg === '--since') {
      since = argv[++index];
      if (!since || !validDate(since)) throw new Error(`Invalid --since date. ${usage}`);
    } else if (arg.startsWith('--')) throw new Error(`Unknown option. ${usage}`);
    else inputs.push(arg);
  }
  if ((!sitemap && since) || (sitemap && inputs.length) || (!sitemap && !inputs.length)) {
    throw new Error(usage);
  }
  if (sitemap) {
    const response = await fetch(`${origin}/sitemap.xml`);
    if (!response.ok) throw new Error(`Could not download sitemap (HTTP ${response.status}).`);
    const xml = (await response.text()).replace(/<!--[\s\S]*?-->/g, '');
    if (!/<urlset(?:\s|>)/.test(xml) || !/<\/urlset>/.test(xml)) {
      throw new Error('Expected a sitemap urlset.');
    }
    const cutoff = since ? Date.parse(`${since}T00:00:00Z`) : null;
    for (const match of xml.matchAll(/<url(?:\s[^>]*)?>([\s\S]*?)<\/url>/g)) {
      const loc = match[1].match(/<loc>([\s\S]*?)<\/loc>/);
      const lastmod = match[1].match(/<lastmod>([\s\S]*?)<\/lastmod>/);
      if (!loc) throw new Error('Sitemap URL is missing loc.');
      // Validate even entries excluded by --since; sitemap locations must be absolute.
      const input = normalizeUrl(new URL(xmlText(loc[1])).href);
      const modified = lastmod && xmlText(lastmod[1]);
      if (since && (!modified || !validDate(modified.slice(0, 10)) || !Number.isFinite(Date.parse(modified)))) continue;
      if (!since || Date.parse(modified) >= cutoff) inputs.push(input);
    }
    if (!inputs.length) {
      console.log('No sitemap URLs match; nothing sent.');
      return;
    }
  }

  const urlList = [...new Set(inputs.map((input) => normalizeUrl(input)))];
  if (urlList.length > 10000) throw new Error('IndexNow accepts at most 10,000 URLs per request.');

  const publicDir = path.join(root, 'public');
  const files = readdirSync(publicDir).filter((name) => /^[0-9a-f]{32}\.txt$/.test(name));
  if (files.length !== 1) throw new Error('Expected one public/<32-hex-key>.txt file.');
  const key = files[0].slice(0, -4);
  if (readFileSync(path.join(publicDir, files[0]), 'utf8').trim() !== key) {
    throw new Error('The public key file must contain its filename without .txt.');
  }
  const payload = { host, key, keyLocation: `${origin}/${key}.txt`, urlList };
  console.log(JSON.stringify(payload, null, 2));
  if (!submit) {
    console.log('Dry run: nothing sent. Use --submit only after these URLs and the key file are deployed.');
    return;
  }

  const live = await fetch(payload.keyLocation);
  if (!live.ok || (await live.text()).trim() !== key) {
    throw new Error(`Public key is not live at ${payload.keyLocation} (HTTP ${live.status}). Deploy first.`);
  }
  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });
  if (response.status !== 200 && response.status !== 202) {
    throw new Error(`IndexNow rejected the request (HTTP ${response.status}).`);
  }
  console.log(`IndexNow received the URLs (HTTP ${response.status}); indexing is not guaranteed.`);
}

main(process.argv.slice(2)).catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
