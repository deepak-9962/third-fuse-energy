import { useLocale } from '@/context/LocaleContext';
import { locales, Locale } from '../i18n';

export function useTranslation() {
  const { locale, setLocale, locales: availableLocales } = useLocale();

  const t = (key: string) => {
    // Placeholder for actual translation logic if we wanted key-based translations
    // For this project we are loading full JSON files per page/component
    return key; 
  };

  return {
    locale,
    locales: availableLocales,
    setLocale,
    t
  };
}
