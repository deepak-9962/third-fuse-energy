/**
 * Hero Component
 * Main hero section with animations and video carousel
 * Based on PRD Section 7.1 - Hero specs
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { heroTitle, heroTitleAccent, heroSubtitle, heroCTA, heroImage } from '@/lib/motion';

interface HeroProps {
  title: string;
  subtitle: string;
  cta: string;
  ctaHref?: string;
  ctaSecondary?: string;
  ctaSecondaryHref?: string;
  titleAccent?: string; // Second line of title in accent color
  image?: string;
  videoSrc?: string;
  videoSources?: string[]; // Array of video URLs for carousel
  showContent?: boolean; // Whether to render title/subtitle/CTA
}

export default function Hero({
  title,
  subtitle,
  cta,
  ctaHref = '/contact',
  ctaSecondary,
  ctaSecondaryHref = '/services',
  titleAccent,
  image,
  videoSrc,
  videoSources,
  showContent = false,
}: HeroProps) {
  // Determine if we have a dark background (video or fallback gradient)
  const hasDarkBackground = true; // Always use dark background for hero
  
  // Video carousel state - use videoSources array or fall back to single videoSrc
  const videos = videoSources || (videoSrc ? [videoSrc] : []);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const MAX_DURATION = 6000; // Max 6 seconds per video

  // Function to advance to next video
  const goToNextVideo = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  };

  // Handle video ended (for videos shorter than 6 seconds)
  const handleVideoEnded = () => {
    goToNextVideo();
  };

  // Start timer when video index changes
  useEffect(() => {
    if (videos.length <= 1) return;
    
    // Set max duration timer
    timerRef.current = setTimeout(() => {
      goToNextVideo();
    }, MAX_DURATION);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentVideoIndex, videos.length]);

  // Preload next video for smoother transitions
  useEffect(() => {
    if (videos.length <= 1) return;
    const nextIndex = (currentVideoIndex + 1) % videos.length;
    const preloadVideo = document.createElement('video');
    preloadVideo.src = videos[nextIndex];
    preloadVideo.preload = 'auto';
  }, [currentVideoIndex, videos]);
  
  return (
    <section className="relative min-h-[90vh] flex items-end overflow-hidden bg-gradient-to-br from-[#011d4f] via-[#02399C] to-[#023078] pt-32">
      {/* Background Video Carousel */}
      {videos.length > 0 && (
        <div className="absolute inset-0 z-[1]">
          <AnimatePresence mode="sync">
            <motion.video
              key={currentVideoIndex}
              ref={videoRef}
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={handleVideoEnded}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={videos[currentVideoIndex]} type="video/mp4" />
            </motion.video>
          </AnimatePresence>
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
        </div>
      )}

      <div className="container-content relative z-10 pb-20 md:pb-28 pt-16 md:pt-24">
        {showContent && (
          <>
            <motion.h1
              variants={heroTitle}
              initial="hidden"
              animate="visible"
              className={`font-heading text-3xl md:text-4xl lg:text-5xl font-black max-w-3xl tracking-tight ${hasDarkBackground ? 'text-white' : 'text-text'}`}
            >
              {title}
            </motion.h1>

            {titleAccent && (
              <>
                {/* Decorative accent line */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
                  className="origin-left w-16 h-1 bg-brand-red my-4 md:my-5 rounded-full"
                />
                <motion.p
                  variants={heroTitleAccent}
                  initial="hidden"
                  animate="visible"
                  className="font-heading text-3xl md:text-4xl lg:text-5xl font-black max-w-3xl tracking-tight text-white mb-6"
                >
                  {titleAccent}
                </motion.p>
              </>
            )}

            {subtitle && (
              <motion.p
                variants={heroSubtitle}
                initial="hidden"
                animate="visible"
                className={`text-lg md:text-xl mb-10 max-w-2xl ${hasDarkBackground ? 'text-white/80' : 'text-text-light'}`}
              >
                {subtitle}
              </motion.p>
            )}


          </>
        )}
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
