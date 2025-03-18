import type { NextConfig } from 'next'
import createBundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react']
  },
  images: {
    domains: ['maps.googleapis.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com',
        pathname: '/maps/api/place/photo/**'
      },
      {
        protocol: 'https',
        hostname: 'cdnp.flypgs.com',
        pathname: '/files/**',
      }
    ],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [90, 180, 360, 480, 600],
    formats: ['image/webp']
  }
}

export default withBundleAnalyzer(nextConfig)