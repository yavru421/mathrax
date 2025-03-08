const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  buildExcludes: [/middleware-manifest\.json$/],
  maximumFileSizeToCacheInBytes: 5000000,
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'offlineCache',
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 24 * 60 * 60 // 24 hours
        }
      }
    }
  ]
});

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    minimumCacheTTL: 60,
  },
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
  basePath: '/mathrax',
  assetPrefix: '/mathrax/',
  images: {
    unoptimized: true
  }
});