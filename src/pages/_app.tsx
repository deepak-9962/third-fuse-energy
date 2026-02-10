/**
 * Next.js Custom App
 * Wraps all pages with Layout and AnimatePresence for page transitions
 * Based on PRD Section 9 - Global page transition
 */

import { useState, useEffect, useCallback } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { AnimatePresence, motion } from 'framer-motion';
import { Layout } from '@/components';
import SplashScreen from '@/components/SplashScreen';
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
  const [phase, setPhase] = useState<'splash' | 'transitioning' | 'done'>('splash');

  // Mark body as splash-active on mount
  useEffect(() => {
    document.body.classList.add('splash-active');
    return () => document.body.classList.remove('splash-active');
  }, []);

  // Start transition after 1.5s splash display
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('transitioning');
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSplashComplete = useCallback(() => {
    setPhase('done');
    document.body.classList.remove('splash-active');
  }, []);

  return (
    <LocaleProvider>
      {phase !== 'done' && (
        <SplashScreen
          key="splash"
          phase={phase}
          onComplete={handleSplashComplete}
        />
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'splash' ? 0 : 1 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      >
        <AppContent {...props} />
      </motion.div>

      <Script
        id="google-translate-script"
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </LocaleProvider>
  );
}
