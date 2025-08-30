import { generateSW } from 'workbox-build';

const generateServiceWorker = async () => {
  try {
    const { count, size } = await generateSW({
      globDirectory: 'dist',
      globPatterns: ['**/*.{html,js,css,png,jpg,jpeg,svg,gif,webp,woff2}'],
      swDest: 'dist/sw.js',
      clientsClaim: true,
      skipWaiting: true,

      additionalManifestEntries: [{ url: '/offline.html', revision: null }],
      manifestTransforms: [
        async originalManifest => {
          const filtered = originalManifest.filter(e => e.url !== 'offline.html'); // buang duplikat
          const manifest = filtered.map(entry => ({ ...entry, url: '/' + entry.url }));
          return { manifest };
        },
      ],
      runtimeCaching: [
        {
          // Cache Google Fonts stylesheet (CSS)
          urlPattern: /^https:\/\/fonts\.googleapis\.com/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'google-fonts-stylesheets',
          },
        },
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'image-cache',
            expiration: { maxEntries: 50, maxAgeSeconds: 30 * 24 * 60 * 60 },
          },
        },
        {
          urlPattern: ({ request }) => request.mode === 'navigate',
          handler: 'NetworkFirst',
          options: {
            cacheName: 'pages-cache',
            networkTimeoutSeconds: 1,
            plugins: [
              {
                handlerDidError: async () => caches.match('/offline.html'),
              },
            ],
          },
        },
      ],
    });

    console.log(`✅ Generated sw.js, ${count} files precached, size: ${size} bytes`);
  } catch (err) {
    console.error('❌ Error generating service worker:', err);
  }
};

generateServiceWorker();
