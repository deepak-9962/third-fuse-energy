/**
 * Splash Screen Component
 * Shows on initial load/reload with centered logo and glowing effect.
 * Supports shared-element transition — logo animates to header position.
 */

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface SplashScreenProps {
  phase: 'splash' | 'transitioning';
  onComplete: () => void;
}

export default function SplashScreen({ phase, onComplete }: SplashScreenProps) {
  const [target, setTarget] = useState<{ x: number; y: number; scale: number } | null>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Measure header logo position when transitioning begins
  useEffect(() => {
    if (phase === 'transitioning') {
      requestAnimationFrame(() => {
        const el = document.getElementById('header-logo');
        if (el) {
          const rect = el.getBoundingClientRect();
          setTarget({
            x: rect.left + rect.width / 2 - window.innerWidth / 2,
            y: rect.top + rect.height / 2 - window.innerHeight / 2,
            scale: rect.width / 144,
          });
        } else {
          onCompleteRef.current();
        }
      });
    }
  }, [phase]);

  // Cross-dissolve: reveal header logo before splash logo fully fades
  useEffect(() => {
    if (phase === 'transitioning' && target) {
      const timer = setTimeout(() => {
        document.body.classList.remove('splash-active');
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [phase, target]);

  const moving = phase === 'transitioning' && target !== null;

  return (
    <div className="splash-screen">
      {/* Background gradient — fades out during transition */}
      <motion.div
        className="splash-screen-bg"
        animate={{ opacity: moving ? 0 : 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Ambient glow orbs — fade out during transition */}
      <motion.div
        style={{ position: 'absolute', inset: 0 }}
        animate={{ opacity: moving ? 0 : 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="splash-glow splash-glow-1" />
        <div className="splash-glow splash-glow-2" />
      </motion.div>

      {/* Logo mark — shared-element animation to header */}
      <motion.div
        className="splash-logo-wrapper"
        style={{ flexDirection: 'column', gap: 0 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          moving
            ? {
                x: target.x,
                y: target.y,
                scale: target.scale,
                opacity: 0,
              }
            : {
                opacity: 1,
                scale: 1,
                x: 0,
                y: 0,
              }
        }
        transition={
          moving
            ? {
                x: { duration: 1, ease: [0.32, 0.72, 0, 1] },
                y: { duration: 1, ease: [0.32, 0.72, 0, 1] },
                scale: { duration: 1, ease: [0.32, 0.72, 0, 1] },
                opacity: { duration: 0.3, delay: 0.7, ease: 'easeOut' },
              }
            : {
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1],
              }
        }
        onAnimationComplete={() => {
          if (moving) onCompleteRef.current();
        }}
      >
        {/* Glow halo — fades out early */}
        <motion.div
          animate={{ opacity: moving ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="splash-logo-glow" />
        </motion.div>
        <Image
          src="/images/logo-mark.png"
          alt="Third Fuse Energy"
          width={144}
          height={144}
          priority
          className={`splash-logo${moving ? ' splash-logo-no-glow' : ''}`}
        />
      </motion.div>

      {/* Company name — fades out during transition, does NOT move */}
      <motion.div
        className="splash-company-name"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: moving ? 0 : 1, y: 0 }}
        transition={
          moving
            ? { duration: 0.3, ease: 'easeOut' }
            : { duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }
        }
      >
        <span className="splash-company-title">Third Fuse Energy</span>
        <span className="splash-company-tagline">See the Light, Feel the Savings</span>
      </motion.div>
    </div>
  );
}
