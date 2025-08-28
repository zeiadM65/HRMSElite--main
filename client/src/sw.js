/* eslint-env serviceworker */
import {clientsClaim} from 'workbox-core';
import {precacheAndRoute} from 'workbox-precaching';
import {registerRoute} from 'workbox-routing';
import {StaleWhileRevalidate} from 'workbox-strategies';
import {ExpirationPlugin} from 'workbox-expiration';

self.skipWaiting();
clientsClaim();

// Precache assets generated during build
precacheAndRoute(self.__WB_MANIFEST);

// Cache only public static assets
registerRoute(
  ({url, request}) =>
    url.origin === self.location.origin &&
    ['style', 'script', 'image', 'font'].includes(request.destination),
  new StaleWhileRevalidate()
);

// add expiration for static assets
registerRoute(
  ({request}) => ['style', 'script', 'image', 'font'].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: 'static-v20250827',
    plugins: [new ExpirationPlugin({maxEntries: 200, maxAgeSeconds: 7 * 24 * 60 * 60})],
  })
);
