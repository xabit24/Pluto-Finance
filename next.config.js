/** @type {import('next').NextConfig} */
const isCI = process.env.VERCEL === '1' || process.env.CI === 'true';
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@mysten/dapp-kit', '@mysten/sui'],
  typescript: { ignoreBuildErrors: isCI },
  eslint: { ignoreDuringBuilds: isCI },
};
module.exports = nextConfig;
