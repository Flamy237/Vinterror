/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer, dev }) => {
    if (!isServer) {
      // Ignoré canvas et fs — dépendances Node.js internes de MindAR
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false, 
        fs: false,
      };
    }

    if (!dev) {
      const TerserPlugin = config.optimization.minimizer?.find(
        (p) => p.constructor.name === 'TerserPlugin'
      );

      if (TerserPlugin) {
        const original = TerserPlugin.options.exclude;
        TerserPlugin.options.exclude = [
          ...(Array.isArray(original) ? original : original ? [original] : []),
          /mind-ar/,
        ];
      }
    }

    return config;
  },
};

module.exports = nextConfig;
