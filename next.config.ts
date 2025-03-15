/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["maps.googleapis.com"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdnp.flypgs.com',
        port: '',
        pathname: '/files/**',
      },
    ],
  },
};

module.exports = nextConfig;
