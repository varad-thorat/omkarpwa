if('serviceworker' in navigator){
    window.addEventListener('load',function (){
        this.navigator.serviceWorker.register('/sw.js').then(function(registration){
            //reg was sf
            console.log('ServiceWorker register succesfull with scope:',regitration.scope);
        },function (err){
            //reg failed
            console.log('ServiceWorker registration FAILED',err);
        });
    })
}

var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache=[
    '/',
    'index.html',
];
self.addEventListener('install',function(event){
    event.waitUntil(
        cache.open(CACHE_NAME)
        .then(function(cache){
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    )
});

self.addEventListener('fetch',function(event){
    event.respondWith(
        caches.match(event.request)
        .then(function(response){
            if(response){
                return response
            }
            return fetch(event.request);
        })
    )
});