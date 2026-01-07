import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { locales, Locale } from '@/lib/i18n';

export default function LanguageSwitcher() {
  const router = useRouter();
  const { locale: activeLocale, pathname, asPath, query } = router;
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLocale = locales.find((l) => l.code === activeLocale);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative z-50" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
        aria-label="Select Language"
        aria-expanded={isOpen}
      >
        <span className="uppercase">{activeLocale}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden py-1"
          >
            {locales.map((locale) => (
              <Link
                key={locale.code}
                href={{ pathname, query }}
                as={asPath}
                locale={locale.code}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  activeLocale === locale.code
                    ? 'text-brand font-semibold bg-brand/5'
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                <span>{locale.name}</span>
                <span className="text-xs text-gray-400 font-normal ml-2">{locale.label}</span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
