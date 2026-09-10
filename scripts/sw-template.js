const CACHE_NAME = 'sleeplike-__VERSION__';
const PRECACHE = __PRECACHE__;
self.addEventListener('install', event => {
  // Atomic installation: a release is usable offline only when all its HTML/chunks are present.
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE)));
  // No skipWaiting: existing tabs keep the matching old shell until they close.
});
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('sleeplike-') && key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim())));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin || url.pathname.startsWith('/_vercel/') || url.pathname.startsWith('/.well-known/')) return;
  const path = url.pathname === '/' ? '/' : url.pathname.replace(/\/$/, '');
  if (!PRECACHE.includes(path)) return;
  // Only public shell paths are cached: queries, fragments, ad and analytics traffic are excluded.
  event.respondWith(caches.open(CACHE_NAME).then(async cache => (await cache.match(path)) || fetch(event.request)));
});
