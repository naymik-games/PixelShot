var cacheName = 'PixelShot v2.0';
var filesToCache = [
  '/',
  '/index.html',
  '/game.js',
  '/phaser.min.js',




  '/scenes/lose.js',
  '/scenes/win.js',
  '/scenes/preload.js',
  '/scenes/selectGame.js',
  '/scenes/startGame.js',
  '/scenes/UI.js',


  '/classes/extra.js',
  '/classes/maps.js',
  '/classes/settings.js',
  '/classes/targets.js',
  '/classes/virtualjoystick.js',

  '/assets/particle.png',
  '/assets/particles.png',


  '/assets/sprites/blank.png',
  '/assets/sprites/burst.png',
  '/assets/sprites/bullet.png',
  '/assets/sprites/clip.png',
  '/assets/sprites/crosshair.png',
  '/assets/sprites/fire.png',
  '/assets/sprites/gems.png',
  '/assets/sprites/hAdjustment.png',
  '/assets/sprites/icons.png',
  '/assets/sprites/icons_pixel.png',
  '/assets/sprites/items2.png',
  '/assets/sprites/joystick_base_outline.png',
  '/assets/sprites/joystick_tip_arrows.png',
  '/assets/sprites/menu.png',
  '/assets/sprites/reload.png',
  '/assets/sprites/reset.png',
  '/assets/sprites/scope_wide.png',
  '/assets/sprites/scope_zoom.png',
  '/assets/sprites/spot.png',
  '/assets/sprites/switch.png',
  '/assets/sprites/vAdjustment.png',

  '/assets/sprites/map1/map1_full_.png',
  '/assets/sprites/map1/map1_full.png',
  '/assets/map1/map1_thumb.png',

  '/assets/sprites/map2/map2_full_.png',
  '/assets/sprites/map2/map2_full.png',
  '/assets/sprites/map2/map2_thumb.png',

  '/assets/sprites/map3/map3_full_.png',
  '/assets/sprites/map3/map3_full.png',
  '/assets/sprites/map3/map3_thumb.png',

  '/assets/sprites/map4/map4_full_.png',
  '/assets/sprites/map4/map4_full.png',
  '/assets/sprites/map4/map4_thumb.png',

  '/assets/sprites/map5/map5_full_.png',
  '/assets/sprites/map5/map5_full.png',
  '/assets/sprites/map5/map5_thumb.png',

  '/assets/sprites/map6/map6_full_.png',
  '/assets/sprites/map6/map6_full.png',
  '/assets/sprites/map6/map6_thumb.png',

  '/assets/sprites/map7/map7_full_.png',
  '/assets/sprites/map7/map7_full.png',
  '/assets/sprites/map7/map7_thumb.png',

  '/assets/sprites/map8/map8_full_.png',
  '/assets/sprites/map8/map8_full.png',
  '/assets/sprites/map8/map8_thumb.png',

  '/assets/sprites/map9/map9_full_.png',
  '/assets/sprites/map9/map9_full.png',
  '/assets/sprites/map9/map9_thumb.png',

  '/assets/sprites/map10/map10_full_.png',
  '/assets/sprites/map10/map10_full.png',
  '/assets/sprites/map10/map10_thumb.png',

  '/assets/fonts/topaz.png',
  '/assets/fonts/topaz.xml',





  //'https://cdn.jsdelivr.net/gh/photonstorm/phaser@3.10.1/dist/phaser.min.js'
];
self.addEventListener('install', function (event) {
  console.log('sw install');
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('sw caching files');
      return cache.addAll(filesToCache);
    }).catch(function (err) {
      console.log(err);
    })
  );
});

self.addEventListener('fetch', (event) => {
  console.log('sw fetch');
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    }).catch(function (error) {
      console.log(error);
    })
  );
});

self.addEventListener('activate', function (event) {
  console.log('sw activate');
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName) {
          console.log('sw removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});