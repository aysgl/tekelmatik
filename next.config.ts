/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
