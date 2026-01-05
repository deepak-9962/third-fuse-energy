/**
 * Hero Component
 * Main hero section with animations
 * Based on PRD Section 7.1 - Hero specs
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { heroTitle, heroSubtitle, heroCTA, heroImage } from '@/lib/motion';

interface HeroProps {
  title: string;
  subtitle: string;
  cta: string;
  ctaHref?: string;
  ctaSecondary?: string;
  ctaSecondaryHref?: string;
  image?: string;
}

export default function Hero({
  title,
  subtitle,
  cta,
  ctaHref = '/contact',
  ctaSecondary,
  ctaSecondaryHref = '/services',
  image,
}: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" aria-hidden="true" />
      
      {/* Decorative circles */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand/5 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl" aria-hidden="true" />

      <div className="container-content relative z-10 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <motion.h1
              variants={heroTitle}
              initial="hidden"
              animate="visible"
              className="text-h1-mobile md:text-h1 text-text text-balance"
            >
              {title}
            </motion.h1>

            <motion.p
              variants={heroSubtitle}
              initial="hidden"
              animate="visible"
              className="mt-6 text-body-lg text-text-light max-w-xl mx-auto lg:mx-0"
            >
              {subtitle}
            </motion.p>

            <motion.div
              variants={heroCTA}
              initial="hidden"
              animate="visible"
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href={ctaHref} className="btn-primary text-lg px-8 py-4">
                {cta}
              </Link>
              {ctaSecondary && (
                <Link href={ctaSecondaryHref} className="btn-secondary text-lg px-8 py-4">
                  {ctaSecondary}
                </Link>
              )}
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-text-light"
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Free Consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>25-Year Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>NABCEP Certified</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Image/Logo */}
          <motion.div
            variants={heroImage}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand/20 to-brand-accent/20 rounded-full blur-3xl transform scale-90" aria-hidden="true" />
              
              {/* Main image or placeholder */}
              {image ? (
                <Image
                  src={image}
                  alt="Solar installation"
                  fill
                  className="object-contain relative z-10"
                  priority
                />
              ) : (
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <div className="relative w-4/5 h-4/5">
                    <Image
                      src="/images/logo.svg"
                      alt="Third Fuse Energy"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-text/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-text/50 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
