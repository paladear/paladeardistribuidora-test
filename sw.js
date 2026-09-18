// ════════════════════════════════════════════════════════
// sw.js — Service Worker de Paladear Mercado de Sabores
// Versión: 1.6
//
// CAMBIO CLAVE (arregla "no carga si no borrás el historial" y
// "tarda muchísimo en cargar"):
//
//   1. Ya NO cacheamos las llamadas a datos (Google Sheets / Apps
//      Script). Esas URLs llevan timestamp + random y son únicas en
//      cada visita, así que el Cache Storage crecía sin límite hasta
//      agotar la cuota del navegador y romper la carga. Los datos ya
//      se guardan en localStorage por la propia app, así que el modo
//      offline sigue funcionando.
//
//   2. index.html (la página): NETWORK-FIRST. Siempre se pide la
//      versión más reciente a la red, así los cambios publicados se
//      ven en la primera visita sin tener que borrar el historial.
//      Si no hay red, cae al cache (sigue abriendo offline).
//
//   3. Resto del shell (íconos, imágenes propias): stale-while-
//      revalidate. Cargan al instante desde el cache y se actualizan
//      en segundo plano. Casi nunca cambian.
// ════════════════════════════════════════════════════════

// La carpeta sale de dónde está parado este mismo archivo. Escrita a mano decía
// siempre "paladeardistribuidora-test", así que la distribuidora de verdad guardaba
// los archivos de la de pruebas y su propia página nunca entraba por la regla de red
// primero: por eso se publicaba y se seguía viendo lo de antes.
const BASE = new URL('./', self.location).pathname;
const CACHE_PREFIX = 'paladear-distri-';
const CACHE_VERSION = CACHE_PREFIX + BASE.replace(/\//g, '') + '-v18';

const SHELL_FILES = [
  BASE + 'android-chrome-may-p-192.png',
  BASE + 'android-chrome-may-p-512.png',
  BASE + 'apple-touch-icon-may-p.png',
  BASE + 'favicon-may-p-32.png',
  BASE + 'og-image-may-blue.jpg',
];

// ── INSTALL ─────────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(async cache => {
        const page = await fetch(BASE + 'index.html', { cache: 'reload' });
        if (!page || !page.ok) throw new Error('No se pudo actualizar index.html');
        await Promise.all([
          cache.put(BASE, page.clone()),
          cache.put(BASE + 'index.html', page.clone()),
          // Uno por uno: con addAll, un solo nombre viejo tiraba abajo la instalación
          // entera y el service worker se quedaba con la versión anterior para siempre.
          Promise.all(SHELL_FILES.map(function(f){
            return cache.add(f).catch(function(){ console.warn('[SW] no pude guardar', f); });
          }))
        ]);
      })
      .catch(err => {
        console.warn('[SW] Error cacheando shell:', err);
        throw err;
      })
  );
  self.skipWaiting();
});

// ── ACTIVATE: borrar solo caches viejos de ESTA tienda ──────
// Cache Storage se comparte por dominio: no borrar el cache de la minorista.
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k.startsWith(CACHE_PREFIX) && k !== CACHE_VERSION).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// ── FETCH ───────────────────────────────────────────────
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  let url;
  try { url = new URL(event.request.url); } catch (e) { return; }

  // DATOS y recursos externos (Google Sheets, Apps Script, imágenes
  // de Google, fuentes, etc.): NO los interceptamos. Van directo a la
  // red y, si corresponde, los maneja el cache HTTP normal del
  // navegador. Así el Cache Storage nunca se infla con URLs únicas.
  if (url.origin !== self.location.origin) return;

  // index.html (la página en sí): NETWORK-FIRST. Siempre pedimos la
  // versión más reciente a la red para que los cambios se vean en la
  // primera visita (sin tener que borrar el historial). Si no hay red,
  // caemos al cache para que la página siga abriendo offline.
  const _path = url.pathname;
  const _esPagina = _path === BASE ||
                    _path === BASE + 'index.html' ||
                    _path === BASE + 'catalogo.html';

  // PRECIOS Y FICHAS: también red primero. Sin esta regla caían en
  // stale-while-revalidate y el que volvía a entrar veía los precios y los nombres
  // de la visita anterior. En una lista mayorista eso es un precio mal cobrado.
  const _esDato = /\/(precios-may|info-may|precios-min|stock)\.csv$|\/(catalogo-panel|pendientes|fotos-propias)\.json$/.test(_path);

  if (_esPagina || _esDato) {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' })
        .then(response => {
          if (response && response.status === 200) {
            caches.open(CACHE_VERSION)
              .then(cache => cache.put(event.request, response.clone()))
              .catch(() => {});
          }
          return response;
        })
        .catch(() =>
          caches.match(event.request).then(cached => {
            if (cached) return cached;
            // Un CSV/JSON no puede caer al index.html: devolvería HTML donde se
            // esperan datos. Mejor fallar y que la página reintente.
            return _esDato ? Response.error() : caches.match(BASE + 'index.html');
          })
        )
    );
    return;
  }

  // Resto del shell del mismo origen (íconos, imágenes propias):
  // stale-while-revalidate. Cargan al instante desde el cache y se
  // actualizan en segundo plano. Estos archivos casi no cambian.
  event.respondWith(
    caches.open(CACHE_VERSION).then(cache =>
      cache.match(event.request).then(cached => {
        const network = fetch(event.request)
          .then(response => {
            if (response && response.status === 200) {
              cache.put(event.request, response.clone()).catch(() => {});
            }
            return response;
          })
          .catch(() => cached || caches.match(BASE + 'index.html'));
        // Servimos el cache al instante si existe; si no, esperamos la red.
        return cached || network;
      })
    )
  );
});

// ── PUSH: placeholder para Fase 2 (OneSignal) ──────────
self.addEventListener('push', event => {
  console.log('[SW] Push recibido (OneSignal no configurado aún)');
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.openWindow(BASE));
});
