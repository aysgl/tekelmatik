import type { NextConfig } from 'next'
import createBundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})

const nextConfig: NextConfig = {
  compress: true,
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}'
    }
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      '@tanstack/react-query',
      'framer-motion',
      'zod'
    ],

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
    formats: ['image/webp', 'image/avif']
  },

  webpack: (config, { dev, isServer }) => {
    config.optimization.splitChunks.maxInitialRequests = Infinity;
    config.optimization.splitChunks.cacheGroups = {
      defaultVendors: {
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
        chunks: 'all',
      },
    };
    config.optimization.splitChunks = {
      chunks: 'all',
      minSize: 20000,
      maxSize: 80000,
      cacheGroups: {
        default: false,
        vendors: false,
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
          reuseExistingChunk: true,
        },
        lib: {
          test: /[\\/]node_modules[\\/]/,
          name(module: import('webpack').Module) {
            const packageNameMatch = module.context?.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            );
            const packageName = packageNameMatch ? packageNameMatch[1] : 'unknown';
            return `npm.${packageName.replace('@', '')}`
          },
          chunks: 'all',
          minChunks: 1,
        }
      }
    };

    if (!dev && !isServer) {
      config.externals = {
        react: 'React',
        'react-dom': 'ReactDOM'
      };
    }

    return config;
  }
}

export default withBundleAnalyzer(nextConfig)
