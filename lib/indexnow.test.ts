import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const script = fileURLToPath(new URL('../scripts/indexnow.mjs', import.meta.url));

// Intercept fetch in the child process: these tests never reach IndexNow or production.
function run(args: string[], status = 200, liveKey = true, sitemap = '<urlset></urlset>', sitemapStatus = 200) {
  const transport = `globalThis.fetch = async (url, init) => {
    console.log('REQUEST ' + JSON.stringify({ url, method: init?.method ?? 'GET', body: init?.body, headers: init?.headers }));
    if (String(url).endsWith('/sitemap.xml')) return new Response(${JSON.stringify(sitemap)}, { status: ${sitemapStatus} });
    if (!init) return new Response(${liveKey} ? new URL(url).pathname.slice(1, -4) : 'wrong-key');
    return new Response('', { status: ${status} });
  };`;
  return spawnSync(process.execPath, ['--import', `data:text/javascript,${encodeURIComponent(transport)}`, script, ...args], {
    encoding: 'utf8',
  });
}

function requests(stdout: string) {
  return stdout.split('\n').filter((line) => line.startsWith('REQUEST ')).map((line) => JSON.parse(line.slice(8)));
}

describe('IndexNow CLI', () => {
  it('previews an explicit deduplicated URL list without making network requests', () => {
    const result = run(['/sleep-schedule', 'https://sleeplike.maat.work/sleep-schedule#night-shift', '/fr']);
    expect(result.status, result.stderr).toBe(0);
    const payload = JSON.parse(result.stdout.slice(0, result.stdout.indexOf('\nDry run:')));
    expect(payload.host).toBe('sleeplike.maat.work');
    expect(payload.key).toMatch(/^[0-9a-f]{32}$/);
    expect(payload.keyLocation).toBe(`https://sleeplike.maat.work/${payload.key}.txt`);
    expect(payload.urlList).toEqual(['https://sleeplike.maat.work/sleep-schedule', 'https://sleeplike.maat.work/fr']);
    expect(requests(result.stdout)).toEqual([]);
  });

  it.each([200, 202])('checks the live key before posting JSON and accepts HTTP %i', (status) => {
    const result = run(['--submit', '/calculadora-de-sueno'], status);
    expect(result.status, result.stderr).toBe(0);
    const calls = requests(result.stdout);
    expect(calls).toHaveLength(2);
    expect(calls[0].method).toBe('GET');
    expect(calls[0].url).toMatch(/^https:\/\/sleeplike\.maat\.work\/[0-9a-f]{32}\.txt$/);
    expect(calls[1].url).toBe('https://api.indexnow.org/indexnow');
    expect(calls[1].method).toBe('POST');
    expect(calls[1].headers['Content-Type']).toBe('application/json; charset=utf-8');
    const payload = JSON.parse(calls[1].body);
    expect(payload).toEqual({
      host: 'sleeplike.maat.work',
      key: new URL(calls[0].url).pathname.slice(1, -4),
      keyLocation: calls[0].url,
      urlList: ['https://sleeplike.maat.work/calculadora-de-sueno'],
    });
  });

  it('does not post when the deployed key does not match', () => {
    const result = run(['--submit', '/sleep-schedule'], 200, false);
    expect(result.status).toBe(1);
    expect(result.stderr).toContain('Public key is not live');
    expect(requests(result.stdout).map((call) => call.method)).toEqual(['GET']);
  });

  it('reports an IndexNow rejection as a failed command', () => {
    const result = run(['--submit', '/sleep-schedule'], 403);
    expect(result.status).toBe(1);
    expect(result.stderr).toContain('HTTP 403');
  });

  const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url><loc>https://sleeplike.maat.work/old</loc><lastmod>2026-10-21</lastmod></url>
    <url><loc>https://sleeplike.maat.work/fr?a=1&amp;b=2</loc><lastmod>2026-10-22T12:00:00Z</lastmod></url>
    <url><loc>https://sleeplike.maat.work/new</loc><lastmod>2026-10-23</lastmod></url>
    <url><loc>https://sleeplike.maat.work/undated</loc></url>
    <url><loc>https://sleeplike.maat.work/invalid</loc><lastmod>2026-02-30</lastmod></url>
  </urlset>`;

  it('previews all sitemap locations, decoding XML entities, without submitting', () => {
    const result = run(['--sitemap'], 200, true, sitemap);
    expect(result.status, result.stderr).toBe(0);
    expect(result.stdout).toContain('https://sleeplike.maat.work/fr?a=1&b=2');
    expect(result.stdout).toContain('https://sleeplike.maat.work/undated');
    expect(result.stdout).toContain('https://sleeplike.maat.work/old');
    expect(requests(result.stdout).map((call) => call.url)).toEqual(['https://sleeplike.maat.work/sitemap.xml']);
  });

  it('filters inclusively by lastmod before checking the live key and submitting', () => {
    const result = run(['--submit', '--sitemap', '--since', '2026-10-22'], 202, true, sitemap);
    expect(result.status, result.stderr).toBe(0);
    const calls = requests(result.stdout);
    expect(calls.map((call) => call.method)).toEqual(['GET', 'GET', 'POST']);
    expect(JSON.parse(calls[2].body).urlList).toEqual([
      'https://sleeplike.maat.work/fr?a=1&b=2', 'https://sleeplike.maat.work/new',
    ]);
  });

  it('does not check the key or submit an empty date selection', () => {
    const result = run(['--submit', '--sitemap', '--since', '2026-10-24'], 200, true, sitemap);
    expect(result.status, result.stderr).toBe(0);
    expect(result.stdout).toContain('No sitemap URLs match');
    expect(requests(result.stdout)).toHaveLength(1);
  });

  it.each([
    '<urlset><url><loc>https://example.com/</loc><lastmod>2020-01-01</lastmod></url></urlset>',
    '<urlset><url><loc>http://sleeplike.maat.work/</loc></url></urlset>',
    '<urlset><url><lastmod>2026-10-23</lastmod></url></urlset>',
    '<html>not a sitemap</html>',
  ])('rejects unsafe or malformed sitemaps before submission', (xml) => {
    const result = run(['--submit', '--sitemap', '--since', '2026-10-22'], 200, true, xml);
    expect(result.status).toBe(1);
    expect(requests(result.stdout)).toHaveLength(1);
  });

  it('reports sitemap download failures without submitting', () => {
    const result = run(['--submit', '--sitemap'], 200, true, '', 503);
    expect(result.status).toBe(1);
    expect(result.stderr).toContain('HTTP 503');
    expect(requests(result.stdout)).toHaveLength(1);
  });

  it.each([
    { args: [] },
    { args: ['--submit'] },
    { args: ['--unknown', '/'] },
    { args: ['https://maat.work/'] },
    { args: ['http://sleeplike.maat.work/'] },
    { args: ['https://user:password@sleeplike.maat.work/'] },
    { args: ['--since', '2026-10-22', '/'] },
    { args: ['--sitemap', '/'] },
    { args: ['--sitemap', '--since'] },
    { args: ['--sitemap', '--since', '2026-02-30'] },
    { args: ['--sitemap', '--since', '2026-13-01'] },
  ])('rejects invalid or missing inputs without network calls: $args', ({ args }) => {
    const result = run(args);
    expect(result.status).toBe(1);
    expect(requests(result.stdout)).toEqual([]);
  });
});
