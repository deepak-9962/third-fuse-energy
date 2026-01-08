'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '@/context/LocaleContext';
import { cn } from '@/lib/utils';

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { locale, setLocale, locales } = useLocale();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLocale = locales.find(l => l.code === locale) || locales[0];

  const handleLocaleChange = (code: string) => {
    setLocale(code as any);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-fast',
          'text-text hover:text-brand hover:bg-brand/5',
          isOpen && 'text-brand bg-brand/5'
        )}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select language"
      >
        <GlobeIcon className="w-4 h-4" />
        <span className="hidden sm:inline">{currentLocale.label}</span>
        <ChevronIcon className={cn('w-3 h-3 transition-transform', isOpen && 'rotate-180')} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 py-2 w-40 bg-white rounded-xl shadow-lg border border-gray-100 z-50"
            role="listbox"
            aria-label="Language options"
          >
            {locales.map((localeOption) => (
              <button
                key={localeOption.code}
                type="button"
                role="option"
                aria-selected={locale === localeOption.code}
                onClick={() => handleLocaleChange(localeOption.code)}
                className={cn(
                  'w-full px-4 py-2 text-left text-sm transition-colors',
                  locale === localeOption.code
                    ? 'text-brand bg-brand/5 font-medium'
                    : 'text-text hover:text-brand hover:bg-brand/5'
                )}
              >
                <span className="mr-2">{localeOption.label}</span>
                <span className="text-text-light text-xs">({localeOption.name})</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}
