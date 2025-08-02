/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["line.me", "profile.line-scdn.net"],
  },
  webpack: (config, { isServer }) => {
    // Suppress warnings for known issues
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        punycode: false,
      };
    }

    // Suppress specific webpack warnings
    config.ignoreWarnings = [
      /Critical dependency: the request of a dependency is an expression/,
    ];

    return config;
  },
};

module.exports = nextConfig;
