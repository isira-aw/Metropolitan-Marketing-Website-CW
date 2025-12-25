/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable image optimization to avoid 403 errors from backend
    remotePatterns: [
      // Local backend
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/**',
      },

      // Railway deployed backend
      {
        protocol: 'https',
        hostname: 'metropolitan-marketing-website-b-production-4c0a.up.railway.app',
        pathname: '/uploads/**',
      },
    ],
  },
};

module.exports = nextConfig
