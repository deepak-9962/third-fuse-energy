export const defaultLocale = 'en';

export const locales = [
  { code: 'en', name: 'English', label: 'English' },
  { code: 'hi', name: 'Hindi', label: 'हिंदी' },
  { code: 'ta', name: 'Tamil', label: 'தமிழ்' },
  { code: 'te', name: 'Telugu', label: 'తెలుగు' },
  { code: 'kn', name: 'Kannada', label: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', label: 'മലയാളം' },
];

export type Locale = 'en' | 'hi' | 'ta' | 'te' | 'kn' | 'ml';

export function getDirection(locale: Locale) {
  return 'ltr'; // All these are LTR
}
