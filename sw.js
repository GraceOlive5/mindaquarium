const CACHE_NAME = 'maum-aquarium-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/mindaquarium_bg.png',
  '/mindaquarium_intro.png',
  '/mindaquarium_logo.png',
  '/mindaquarium_worry.png',
  '/mindaquarium_fear.png',
  '/mindaquarium_angry.png',
  '/mindaquarium_secret.png',
  '/mindaquarium_fun.png',
  '/mindaquarium_shy.png',
  '/mindaquarium_happy.png',
  '/icon-192.png',
  '/icon-512.png'
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
