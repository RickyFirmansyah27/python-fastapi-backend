/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config, { dev, isServer }) => {
    // Disable cache in development to prevent file system errors
    if (dev) {
      config.cache = false;
    }
    
    // Ensure proper cache directory permissions
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        runtimeChunk: false,
        splitChunks: {
          cacheGroups: {
            default: false,
          },
        },
      };
    }
    
    return config;
  },
};

module.exports = nextConfig;