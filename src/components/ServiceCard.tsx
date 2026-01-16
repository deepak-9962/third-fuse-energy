/**
 * ServiceCard Component
 * Card for displaying service offerings with hover effects
 * Based on PRD Section 8 - ServiceCard specs
 */

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { hoverLift, iconMicroRotate } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  icon: string;
  title: string;
  summary: string;
  href: string;
  variant?: 'default' | 'compact';
  subsidyEligible?: boolean;
}

// Icon mapping
const IconComponent = ({ name, className }: { name: string; className?: string }) => {
  const icons: Record<string, JSX.Element> = {
    home: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    building: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    wrench: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    chart: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    battery: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 7h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2m16 4h2" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 11v4m4-4v4m4-4v4" />
      </svg>
    ),
    car: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  };

  return icons[name] || icons.home;
};

export default function ServiceCard({
  icon,
  title,
  summary,
  href,
  variant = 'default',
  subsidyEligible
}: ServiceCardProps) {
  const props = { icon, title, summary, href, variant, subsidyEligible }; // Ensure props usage
  return (
    <motion.div {...hoverLift} className="h-full">
      <Link
        href={href}
        className={cn(
          'group flex flex-col card card-hover h-full min-h-[280px]',
          variant === 'default' ? 'p-6 md:p-8' : 'p-5'
        )}
      >
        {/* Icon */}
        <motion.div
          {...iconMicroRotate}
          className={cn(
            'flex items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white',
            variant === 'default' ? 'w-14 h-14' : 'w-12 h-12'
          )}
        >
          <IconComponent name={icon} className={variant === 'default' ? 'w-7 h-7' : 'w-6 h-6'} />
        </motion.div>

        {/* Content */}
        <h3
          className={cn(
            'font-heading font-semibold text-text mt-4',
            variant === 'default' ? 'text-xl' : 'text-lg'
          )}
        >
          {title}
        </h3>

        <p
          className={cn(
            'text-text-light mt-2 flex-grow',
            variant === 'default' ? 'text-base' : 'text-sm'
          )}
        >
          {summary}
        </p>
        
        {/* Subsidy Badge */}
        {props.subsidyEligible && (
          <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-brand-dark bg-brand/10 w-fit px-2.5 py-1 rounded-md">
             <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
             Eligible for Subsidy
          </div>
        )}
        
        {/* Spacer for cards without subsidy badge */}
        {!props.subsidyEligible && (
          <div className="mt-4 h-6"></div>
        )}

        {/* Arrow */}
        <div className="mt-auto pt-4 flex items-center text-brand font-medium text-sm group-hover:gap-2 transition-all duration-300">
          <span>Learn more</span>
          <svg
            className="w-4 h-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </Link>
    </motion.div>
  );
}
