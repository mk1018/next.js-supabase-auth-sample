/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "line.me",
      },
      {
        protocol: "https",
        hostname: "profile.line-scdn.net",
      },
    ],
  },
  turbopack: {},
};

module.exports = nextConfig;
