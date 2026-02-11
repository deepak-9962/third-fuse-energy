/**
 * AnimatedCounter Component
 * Animates a number counting up from 0 to the target value when it scrolls into view.
 * Parses stat strings like "100+", "50 MW", "7+" into numeric + suffix parts.
 */

import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring, motion } from 'framer-motion';

interface AnimatedCounterProps {
  /** The stat value string, e.g. "100+", "50 MW", "7+" */
  value: string;
  /** Animation duration in seconds (controls spring stiffness) */
  duration?: number;
  /** Additional className for the wrapper span */
  className?: string;
}

/** Parse a stat string into its numeric part and suffix, e.g. "100+" → [100, "+"] */
function parseStatValue(value: string): { num: number; suffix: string } {
  const match = value.match(/^(\d+)(.*)$/);
  if (match) {
    return { num: parseInt(match[1], 10), suffix: match[2] };
  }
  // Fallback: return 0 and the full string as suffix (non-numeric values)
  return { num: 0, suffix: value };
}

export default function AnimatedCounter({ value, duration = 2, className }: AnimatedCounterProps) {
  const { num, suffix } = parseStatValue(value);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 75,
    damping: 30,
    duration: duration,
  });

  useEffect(() => {
    if (inView) {
      motionValue.set(num);
    }
  }, [inView, motionValue, num]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest) + suffix;
      }
    });
    return unsubscribe;
  }, [springValue, suffix]);

  // If there's no numeric part, just render the value as-is
  if (num === 0 && suffix === value) {
    return <span className={className}>{value}</span>;
  }

  return (
    <motion.span ref={ref} className={className}>
      0{suffix}
    </motion.span>
  );
}
