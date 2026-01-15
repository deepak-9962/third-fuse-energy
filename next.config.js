/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Note: Next.js i18n routing is NOT compatible with 'output: export'
  // Localization is handled client-side via LocaleContext instead
};

module.exports = nextConfig;
