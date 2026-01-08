/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Required for GitHub Pages static hosting
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Note: Next.js i18n routing is NOT compatible with 'output: export'
  // Localization is handled client-side via LocaleContext instead
  
  basePath: process.env.NODE_ENV === 'production' ? '/third-fuse-energy' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/third-fuse-energy/' : '',
};

module.exports = nextConfig;
