/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config, { dev, isServer }) => {
    if (dev && isServer) {
      config.cache = false;
    }
    return config;
  },
  async rewrites() {
    return [
      // Rule 1: Map /demo/:slug to /demo/:slug/index.html
      {
        source: '/demo/:slug',
        destination: '/demo/:slug/index.html',
      },
      // Rule 2: Serve all sub‑assets (CSS, JS, images) correctly
      {
        source: '/demo/:slug/:path*',
        destination: '/demo/:slug/:path*',
      },
    ];
  },
};

module.exports = nextConfig;