const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
});

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    minimumCacheTTL: 60,
    unoptimized: true
  },
  output: 'export',
  poweredByHeader: false,
  compress: true,
  basePath: '/mathrax',
  assetPrefix: '/mathrax/',
  trailingSlash: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  }
});