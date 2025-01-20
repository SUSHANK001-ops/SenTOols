// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        stream: false,
        path: false,
        process: false
      };
      return config;
    },
    experimental: {
      serverActions: true,
    },
    api: {
      bodyParser: {
        sizeLimit: '10mb',
      },
      responseLimit: '10mb',
    },
  };
  
  export default nextConfig;