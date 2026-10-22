#!/usr/bin/env node
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const host = 'sleeplike.maat.work';
const origin = `https://${host}`;
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

async function main(argv) {
  const submit = argv.includes('--submit');
  if (argv.some((arg) => arg.startsWith('--') && arg !== '--submit')) {
    throw new Error('Unknown option. Usage: npm run indexnow -- [--submit] <urls...>');
  }
  const inputs = argv.filter((arg) => arg !== '--submit');
  if (!inputs.length) throw new Error('Provide changed URLs or paths: npm run indexnow -- [--submit] <urls...>');

  const urlList = [...new Set(inputs.map((input) => {
    const url = new URL(input, origin);
    if (url.origin !== origin || url.username || url.password) {
      throw new Error(`Only HTTPS URLs on ${host} are allowed: ${input}`);
    }
    url.hash = '';
    return url.href;
  }))];
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
