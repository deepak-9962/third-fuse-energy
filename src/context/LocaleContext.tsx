/**
 * LocaleContext
 * Client-side locale management for static export
 * Since Next.js i18n is not compatible with 'output: export',
 * we handle locale switching on the client side.
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Locale, defaultLocale, locales } from '@/lib/i18n';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  locales: typeof locales;
}

const LocaleContext = createContext<LocaleContextType>({
  locale: 'en',
  setLocale: () => {},
  locales,
});

const LOCALE_STORAGE_KEY = 'preferred-locale';

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [mounted, setMounted] = useState(false);

  // Load locale from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored && locales.some(l => l.code === stored)) {
      setLocaleState(stored as Locale);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
  };

  // Prevent hydration mismatch by showing default locale until mounted
  const currentLocale = mounted ? locale : 'en';

  return (
    <LocaleContext.Provider value={{ locale: currentLocale, setLocale, locales }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
