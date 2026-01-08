/**
 * Next.js Custom App
 * Wraps all pages with Layout and AnimatePresence for page transitions
 * Based on PRD Section 9 - Global page transition
 */

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import { Layout } from '@/components';
import { SiteProvider } from '@/context/SiteContext';
import { LocaleProvider, useLocale } from '@/context/LocaleContext';
import { pageTransition } from '@/lib/motion';
import '@/styles/globals.css';

// Import all locale data
import enSiteData from '@/content/locales/en/site.json';
import hiSiteData from '@/content/locales/hi/site.json';
import taSiteData from '@/content/locales/ta/site.json';
import teSiteData from '@/content/locales/te/site.json';
import knSiteData from '@/content/locales/kn/site.json';
import mlSiteData from '@/content/locales/ml/site.json';

const siteDataMap: Record<string, typeof enSiteData> = {
  en: enSiteData,
  hi: hiSiteData,
  ta: taSiteData,
  te: teSiteData,
  kn: knSiteData,
  ml: mlSiteData,
};

function AppContent({ Component, pageProps, router }: AppProps) {
  const { locale } = useLocale();
  const siteData = siteDataMap[locale] || enSiteData;

  return (
    <SiteProvider value={siteData}>
      <Layout>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={router.asPath}
            variants={pageTransition}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </Layout>
    </SiteProvider>
  );
}

export default function App(props: AppProps) {
  return (
    <LocaleProvider>
      <AppContent {...props} />
    </LocaleProvider>
  );
}
