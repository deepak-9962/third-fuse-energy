/**
 * ProjectCard Component
 * Card for displaying project previews with hover overlay
 * Based on PRD Section 8 - ProjectCard specs
 */

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { hoverGrow } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  id: string;
  title: string;
  thumbnail: string;
  category: string[];
  year: number;
  summary: string;
  onClick?: (id: string) => void;
}

export default function ProjectCard({
  id,
  title,
  thumbnail,
  category,
  year,
  summary,
  onClick,
}: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <motion.div {...hoverGrow}>
      <article
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`View ${title} project details`}
        className="group relative overflow-hidden rounded-xl cursor-pointer focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
      >
        {/* Image */}
        <div className="relative aspect-card bg-muted overflow-hidden">
          {!imageError ? (
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <svg className="w-16 h-16 text-text-light/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}

          {/* Gradient overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"
            aria-hidden="true"
          />

          {/* Hover overlay with summary */}
          <div className="absolute inset-0 flex flex-col justify-end p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
              {category.slice(0, 2).map((cat) => (
                <span
                  key={cat}
                  className="px-2 py-1 text-xs font-medium bg-white/20 text-white rounded-full backdrop-blur-sm"
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Title & Year */}
            <h3 className="font-heading font-semibold text-white text-lg md:text-xl leading-tight">
              {title}
            </h3>
            <p className="text-white/70 text-sm mt-1">{year}</p>

            {/* Summary on hover */}
            <p className="text-white/80 text-sm mt-2 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
              {summary}
            </p>

            {/* View button */}
            <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
              <span className="inline-flex items-center gap-2 text-white text-sm font-medium">
                View Project
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </article>
    </motion.div>
  );
}
