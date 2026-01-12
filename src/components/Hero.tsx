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
  videoSrc?: string;
}

export default function Hero({
  title,
  subtitle,
  cta,
  ctaHref = '/contact',
  ctaSecondary,
  ctaSecondaryHref = '/services',
  image,
  videoSrc,
}: HeroProps) {
  // Determine if we have a dark background (video or fallback gradient)
  const hasDarkBackground = true; // Always use dark background for hero
  
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#0B63D6] to-[#083a7a] pt-32">
      {/* Background Video */}
      {videoSrc && (
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
        </div>
      )}

      <div className="container-content relative z-10 py-16 md:py-24">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Content */}
          <div className="max-w-3xl">
            <motion.h1
              variants={heroTitle}
              initial="hidden"
              animate="visible"
              className="text-h1-mobile md:text-h1 text-white text-balance"
            >
              {title}
            </motion.h1>

            <motion.p
              variants={heroSubtitle}
              initial="hidden"
              animate="visible"
              className="mt-6 text-body-lg text-white/90 max-w-xl mx-auto"
            >
              {subtitle}
            </motion.p>

            <motion.div
              variants={heroCTA}
              initial="hidden"
              animate="visible"
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
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
              className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-white/80"
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Free Consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>25-Year Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>NABCEP Certified</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
