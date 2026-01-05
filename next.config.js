/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/third-fuse-energy' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/third-fuse-energy/' : '',
};

module.exports = nextConfig;
