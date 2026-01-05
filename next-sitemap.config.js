/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://thirdfuseenergy.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/api/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    additionalSitemaps: [],
  },
  transform: async (config, path) => {
    // Custom priority and changefreq for specific pages
    const priorities = {
      '/': { priority: 1.0, changefreq: 'daily' },
      '/contact': { priority: 0.9, changefreq: 'monthly' },
      '/services': { priority: 0.8, changefreq: 'weekly' },
      '/projects': { priority: 0.8, changefreq: 'weekly' },
      '/about': { priority: 0.7, changefreq: 'monthly' },
    };

    const pageConfig = priorities[path] || { priority: 0.5, changefreq: 'monthly' };

    return {
      loc: path,
      changefreq: pageConfig.changefreq,
      priority: pageConfig.priority,
      lastmod: new Date().toISOString(),
    };
  },
};
