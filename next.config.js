const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Required for GitHub Pages
  basePath: '/construction-calculator', // Match your repo name
  assetPrefix: '/construction-calculator/', // Match your repo name
  images: {
    unoptimized: true // Required for static export
  }
};

module.exports = withPWA(nextConfig);
