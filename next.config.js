/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  optimizeFonts: true,
  experimental: {
    // Enable React Server Components
    serverComponents: true,
    // Enable concurrent features
    concurrentFeatures: true,
  },
}

module.exports = nextConfig
