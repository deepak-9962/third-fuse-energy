/**
 * SEO Component
 * Generates meta tags, Open Graph, and JSON-LD structured data
 * Based on PRD Section 13 - SEO, metadata & open graph templates
 */

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSiteData } from '@/context/SiteContext';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
  noindex?: boolean;
}

export default function SEO({
  title,
  description,
  image,
  article = false,
  noindex = false,
}: SEOProps) {
  const router = useRouter();
  const siteData = useSiteData();
  const { seo, company } = siteData;

  const pageTitle = title
    ? `${title} | ${company.name}`
    : seo.defaultTitle;
  
  const pageDescription = description || seo.defaultDescription;
  const pageImage = image || seo.ogImage;
  const canonicalUrl = `${seo.siteUrl}${router.asPath}`;
  const fullImageUrl = pageImage.startsWith('http')
    ? pageImage
    : `${seo.siteUrl}${pageImage}`;

  // JSON-LD Structured Data for Organization
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name,
    description: company.description,
    url: seo.siteUrl,
    logo: `${seo.siteUrl}/images/logo.svg`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: company.phone,
      contactType: 'customer service',
      email: company.email,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.street,
      addressLocality: company.address.city,
      addressRegion: company.address.state,
      postalCode: company.address.zip,
      addressCountry: company.address.country,
    },
    sameAs: siteData.social.map((s) => s.href),
  };

  // JSON-LD for LocalBusiness
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': seo.siteUrl,
    name: company.name,
    description: company.description,
    url: seo.siteUrl,
    telephone: company.phone,
    email: company.email,
    image: fullImageUrl,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.street,
      addressLocality: company.address.city,
      addressRegion: company.address.state,
      postalCode: company.address.zip,
      addressCountry: company.address.country,
    },
  };

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Robots */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:site_name" content={company.name} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={fullImageUrl} />

      {/* Favicons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

      {/* Theme Color */}
      <meta name="theme-color" content="#0B63D6" />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
    </Head>
  );
}
