const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development', // Only enable in production
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist/app',
  images: { unoptimized: true }
};

module.exports = withPWA(nextConfig);
