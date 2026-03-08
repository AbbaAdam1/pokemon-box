/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Next.js 16+ enables Turbopack by default. We still apply a custom
  // webpack override (fs fallback), so add a minimal turbopack config to
  // prevent the "webpack config with no turbopack config" error.
  turbopack: {
    root: __dirname,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/index',
        destination: '/app/page',
      },
    ];
  },
};

module.exports = nextConfig;
