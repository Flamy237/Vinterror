/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // ✅ Webpack classique : oblige le bundler a ignorer 'fs' côté client
      // MindAR utilisé uniquement dans un contexte Node.js jamais atteint sur le navigateur
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;