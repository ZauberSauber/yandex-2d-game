/* eslint-disable */
// Файл оставлен для удобства отладки работы Service Worker в dev-режиме позднее будет удален
const CACHE_VERSION = 'v1';
const OFFLINE_PAGE = '/offline.html';
const STATIC_FILES = ['/', '/index.html', OFFLINE_PAGE];

const STATIC_CACHE = `static-${CACHE_VERSION}`;
const API_CACHE = `api-${CACHE_VERSION}`;

const isValidResponse = (response) => {
  return response.status === 200 && response.ok && response.type === 'basic';
};

const networkFirst = async (request) => {
  try {
    const response = await fetch(request);
    if (isValidResponse(response)) {
      const cache = await caches.open(API_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }

    if (request.mode === 'navigate') {
      const offlinePage = await caches.match(OFFLINE_PAGE);
      if (offlinePage) {
        return offlinePage;
      }
    }

    throw error;
  }
};

const cacheFirst = async (request) => {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);
    if (isValidResponse(response)) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    if (request.mode === 'navigate') {
      const offlinePage = await caches.match(OFFLINE_PAGE);
      if (offlinePage) {
        return offlinePage;
      }
    }

    throw error;
  }
};

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_FILES).catch(() => {});
    })
  );

  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== STATIC_CACHE && name !== API_CACHE)
          .map((name) => caches.delete(name))
      );
    })
  );

  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') {
    return;
  }

  const isApiRequest = url.pathname.startsWith('/api/') || url.hostname === 'ya-praktikum.tech';

  if (isApiRequest) {
    event.respondWith(networkFirst(request));
  } else if (url.origin === location.origin) {
    event.respondWith(cacheFirst(request));
  } else {
    event.respondWith(cacheFirst(request));
  }
});
