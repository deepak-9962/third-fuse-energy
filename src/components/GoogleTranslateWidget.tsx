import { useEffect } from 'react';

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

const GoogleTranslateWidget = () => {
  useEffect(() => {
    // Check if script is already present
    if (document.querySelector('script[src*="translate.google.com"]')) {
        // If script is present but widget isn't initialized (e.g. navigation), try to re-init
        if (window.google && window.google.translate) {
            window.googleTranslateElementInit();
        }
        return;
    }

    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
            {
            pageLanguage: 'en',
            includedLanguages: 'en,hi,ta,te,kn,ml', // English, Hindi, Tamil, Telugu, Kannada, Malayalam
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
            },
            'google_translate_element'
        );
      }
    };

    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    return () => {
       // Cleanup if necessary, though deleting the script usually doesn't remove the widget DOM
    };
  }, []);

  return <div id="google_translate_element" className="google-translate-container" />;
};

export default GoogleTranslateWidget;
