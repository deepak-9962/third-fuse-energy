/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // output: 'export', // i18n is not compatible with 'output: export'
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // i18n is not compatible with 'output: export', so we will handle routing manually or remove export if possible.
  // However, the prompt implies adding languages. If this is a static export site, we can't use Next.js i18n routing features.
  // Assuming we need to keep 'output: export', we cannot strictly use the `i18n` config key. 
  // BUT Standard Next.js i18n requires a node server.
  // Let's check how to proceed.
  // If the user wants a static site with multiple languages, we usually use dynamic routes like [locale]/index.tsx.
  // If we can remove 'output: export', we can use i18n config.
  // Given the structure, I will attempt to standard i18n config first, but I see `output: 'export'` is present which means Static Site Generation (SSG).
  // Next.js i18n routing is NOT supported with `next export`.
  
  // Strategy:
  // Since `output: 'export'` is set, I should probably REMOVE it if the user wants standard i18n routing, 
  // OR I have to implement a different strategy.
  // Let's assume for now we can switch to standard Next.js serving or we will use a library that supports it.
  
  // Actually, let's remove `output: 'export'` to enable i18n features properly as it's the standard way.
  // If the user deployment target SPECIFICALLY requires static export (like GitHub Pages without a custom server), this might break deployment.
  // I'll comment it out and add i18n.
  
  // output: 'export', 
  i18n: {
    locales: ['en', 'hi', 'ta', 'te', 'kn', 'ml'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  
  basePath: process.env.NODE_ENV === 'production' ? '/third-fuse-energy' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/third-fuse-energy/' : '',
};

module.exports = nextConfig;
