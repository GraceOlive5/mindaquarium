const CACHE_NAME = 'maum-aquarium-v4';
const ASSETS = [
  '/mindaquarium/',
  '/mindaquarium/index.html',
  '/mindaquarium/manifest.json',
  '/mindaquarium/mindaquarium_bg.png',
  '/mindaquarium/mindaquarium_intro.png',
  '/mindaquarium/mindaquarium_logo.png',
  '/mindaquarium/mindaquarium_worry.png',
  '/mindaquarium/mindaquarium_fear.png',
  '/mindaquarium/mindaquarium_angry.png',
  '/mindaquarium/mindaquarium_secret.png',
  '/mindaquarium/mindaquarium_fun.png',
  '/mindaquarium/mindaquarium_shy.png',
  '/mindaquarium/mindaquarium_happy.png',
  '/mindaquarium/mindaquarium_new.png',
  '/mindaquarium/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Firebase 요청은 캐시 안 함
  if (e.request.url.includes('firebase') || e.request.url.includes('googleapis')) {
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
