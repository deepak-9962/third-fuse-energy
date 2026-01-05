/**
 * Next.js Custom App
 * Wraps all pages with Layout and AnimatePresence for page transitions
 * Based on PRD Section 9 - Global page transition
 */

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import { Layout } from '@/components';
import { pageTransition } from '@/lib/motion';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <Layout>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={router.pathname}
          variants={pageTransition}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}
