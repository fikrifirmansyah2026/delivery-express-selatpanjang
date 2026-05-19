/* =========================================
   DELIVERY EXPRESS SELATPANJANG 2026
   SERVICE WORKER
========================================= */

const CACHE_NAME =
"delivery-express-v2026";

/* =========================================
   FILE CACHE
========================================= */

const urlsToCache = [

"/",
"/index.html",
"/order.html",
"/dashboard.html",
"/admin.html",

"/app.js",
"/order.js",
"/dashboard.js",
"/admin.js",

"/firebase-config.js",

"/manifest.json",

"/icons/icon-192.png",
"/icons/icon-512.png",

"https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"

];

/* =========================================
   INSTALL
========================================= */

self.addEventListener(
"install",
(event)=>{

console.log(
"✅ Service Worker Installed"
);

event.waitUntil(

caches.open(CACHE_NAME)

.then((cache)=>{

return cache.addAll(urlsToCache);

})

);

self.skipWaiting();

});

/* =========================================
   ACTIVATE
========================================= */

self.addEventListener(
"activate",
(event)=>{

console.log(
"🚀 Service Worker Activated"
);

event.waitUntil(

caches.keys()

.then((cacheNames)=>{

return Promise.all(

cacheNames.map((cache)=>{

if(cache !== CACHE_NAME){

console.log(
"🗑 Old Cache Deleted:",
cache
);

return caches.delete(cache);

}

})

);

})

);

self.clients.claim();

});

/* =========================================
   FETCH
========================================= */

self.addEventListener(
"fetch",
(event)=>{

event.respondWith(

caches.match(event.request)

.then((response)=>{

if(response){

return response;

}

return fetch(event.request)

.then((networkResponse)=>{

/* =========================
   SAVE NEW CACHE
========================= */

return caches.open(CACHE_NAME)

.then((cache)=>{

cache.put(
event.request,
networkResponse.clone()
);

return networkResponse;

});

})

.catch(()=>{

/* =========================
   OFFLINE FALLBACK
========================= */

if(
event.request.destination ===
"document"
){

return caches.match(
"/index.html"
);

}

});

})

);

});

/* =========================================
   PUSH NOTIFICATION
========================================= */

self.addEventListener(
"push",
(event)=>{

const data =
event.data
? event.data.text()
: "Order baru masuk 🚀";

event.waitUntil(

self.registration.showNotification(

"Delivery Express",

{

body: data,

icon:
"/icons/icon-192.png",

badge:
"/icons/icon-192.png",

vibrate:[

100,
50,
100

],

data:{
url:"/dashboard.html"
}

}

)

);

});

/* =========================================
   NOTIFICATION CLICK
========================================= */

self.addEventListener(
"notificationclick",
(event)=>{

event.notification.close();

event.waitUntil(

clients.openWindow(
"/dashboard.html"
)

);

});

/* =========================================
   BACKGROUND SYNC
========================================= */

self.addEventListener(
"sync",
(event)=>{

if(
event.tag ===
"sync-orders"
){

console.log(
"🔄 Sync Orders..."
);

}

});

/* =========================================
   MESSAGE EVENT
========================================= */

self.addEventListener(
"message",
(event)=>{

if(
event.data ===
"SKIP_WAITING"
){

self.skipWaiting();

}

});

/* =========================================
   READY
========================================= */

console.log(
"🔥 Delivery Express Service Worker 2026 Ready"
);
