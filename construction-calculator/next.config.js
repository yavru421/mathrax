const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  buildExcludes: [/middleware-manifest\.json$/],
  maximumFileSizeToCacheInBytes: 5000000
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