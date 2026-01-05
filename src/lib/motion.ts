/**
 * Framer Motion Animation Variants & Utilities
 * Based on PRD Section 9 - Interaction & Animation System
 */

import { Variants, Transition } from 'framer-motion';

// ============================================
// Timing & Easing
// ============================================

export const customEase = [0.2, 0.9, 0.2, 1] as const;

export const defaultTransition: Transition = {
  duration: 0.45,
  ease: customEase,
};

export const fastTransition: Transition = {
  duration: 0.18,
  ease: customEase,
};

// ============================================
// Fade Variants
// ============================================

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: defaultTransition,
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: customEase },
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: defaultTransition,
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: defaultTransition,
  },
};

// ============================================
// Scale Variants
// ============================================

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: customEase },
  },
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: defaultTransition,
  },
};

// ============================================
// Stagger Container Variants
// ============================================

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: customEase },
  },
};

// ============================================
// Hover Variants
// ============================================

export const hoverLift = {
  whileHover: {
    scale: 1.03,
    y: -3,
    transition: { duration: 0.18, ease: customEase },
  },
  whileTap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

export const hoverScale = {
  whileHover: {
    scale: 1.05,
    transition: { duration: 0.18, ease: customEase },
  },
  whileTap: {
    scale: 0.95,
    transition: { duration: 0.1 },
  },
};

export const hoverGrow = {
  whileHover: {
    scale: 1.02,
    transition: { duration: 0.2, ease: customEase },
  },
};

// ============================================
// Page Transition Variants
// ============================================

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 10 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: customEase },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.3, ease: customEase },
  },
};

// ============================================
// Modal Variants
// ============================================

export const modalOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, delay: 0.1 },
  },
};

export const modalContent: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: customEase },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.2 },
  },
};

// ============================================
// Hero Specific Variants
// ============================================

export const heroTitle: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: customEase, delay: 0.1 },
  },
};

export const heroSubtitle: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: customEase, delay: 0.3 },
  },
};

export const heroCTA: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: customEase, delay: 0.5 },
  },
};

export const heroImage: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: customEase, delay: 0.2 },
  },
};

// ============================================
// Slide Variants
// ============================================

export const slideUp: Variants = {
  hidden: { y: '100%' },
  visible: {
    y: 0,
    transition: { duration: 0.5, ease: customEase },
  },
  exit: {
    y: '100%',
    transition: { duration: 0.3, ease: customEase },
  },
};

export const slideDown: Variants = {
  hidden: { y: '-100%' },
  visible: {
    y: 0,
    transition: { duration: 0.5, ease: customEase },
  },
};

// ============================================
// Reveal (for text masks)
// ============================================

export const textReveal: Variants = {
  hidden: {
    y: '100%',
  },
  visible: {
    y: 0,
    transition: { duration: 0.6, ease: customEase },
  },
};

// ============================================
// Utility: Create stagger delay
// ============================================

export const createStaggerDelay = (index: number, baseDelay = 0.1, stagger = 0.09) => ({
  delay: baseDelay + index * stagger,
});

// ============================================
// Viewport settings for scroll animations
// ============================================

export const viewportOnce = {
  once: true,
  margin: '-50px',
};

export const viewportRepeat = {
  once: false,
  margin: '-100px',
  amount: 0.3 as const,
};
