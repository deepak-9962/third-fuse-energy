import { useRouter } from 'next/router';
import { locales, Locale } from '../i18n';

export function useTranslation() {
  const router = useRouter();
  const { locale, defaultLocale, pathname, query, asPath } = router;
  
  const currentLocale = (locale as Locale) || (defaultLocale as Locale);

  const setLocale = (newLocale: Locale) => {
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  const t = (key: string) => {
      // Placeholder for actual translation logic if we wanted key-based translations
      // For this project we are loading full JSON files per page/component
      return key; 
  }

  return {
    locale: currentLocale,
    locales,
    setLocale,
    t
  };
}
