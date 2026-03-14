/**
 * ServiceCard Component
 * Card for displaying service offerings with hover effects
 * Based on PRD Section 8 - ServiceCard specs
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  icon: string;
  title: string;
  summary: string;
  href: string;
  variant?: 'default' | 'compact';
  subsidyEligible?: boolean;
  image?: string;
}

export default function ServiceCard({
  icon,
  title,
  summary,
  href,
  variant = 'default',
  subsidyEligible,
  image
}: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="h-full"
    >
      <Link
        href={href}
        data-service-icon={icon}
        className={cn(
          'group flex h-full flex-col overflow-hidden rounded-[6px] border border-[#d6d6d6] bg-[#f5f5f5] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
          variant === 'default' ? 'min-h-[520px]' : 'min-h-[460px]'
        )}
      >
        <div className={cn('relative w-full overflow-hidden bg-muted', variant === 'default' ? 'h-72' : 'h-56')}>
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0" aria-hidden="true" />
          )}
        </div>

        <div className={cn('flex flex-1 flex-col', variant === 'default' ? 'p-7' : 'p-5')}>
          <h3
            className={cn(
              'font-heading font-semibold leading-tight text-text',
              variant === 'default' ? 'text-2xl md:text-[1.75rem]' : 'text-xl'
            )}
          >
            {title}
          </h3>

          <p
            className={cn(
              'mt-4 flex-grow leading-relaxed text-[#3e3e3e]',
              variant === 'default' ? 'text-lg' : 'text-base'
            )}
          >
            {summary}
          </p>

          {subsidyEligible && (
            <div className="mt-5 inline-flex w-fit items-center gap-1.5 rounded border border-brand/25 bg-brand/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-brand">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              Subsidy Eligible
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
