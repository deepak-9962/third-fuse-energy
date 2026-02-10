/**
 * Footer Component
 * Three-column layout: Quick Links | Company | Social + Translate
 * Clean, professional design with Google Translate integration
 */

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSiteData } from '@/context/SiteContext';

// Icon components for social media
const SocialIcon = ({ name }: { name: string }) => {
  const icons: Record<string, JSX.Element> = {
    facebook: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
    twitter: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    linkedin: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    instagram: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
      </svg>
    ),
  };

  return icons[name] || null;
};

// Globe icon for translate
const GlobeIcon = () => (
  <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A8.966 8.966 0 013 12c0-1.97.633-3.792 1.708-5.27" />
  </svg>
);

// Quick links subset
const QUICK_LINKS = [
  { title: 'Home', href: '/' },
  { title: 'Our Services', href: '/services' },
  { title: 'Contact Us', href: '/contact' },
];

// Company links subset
const COMPANY_LINKS = [
  { title: 'About Us', href: '/about' },
  { title: 'Our Pricing', href: '/subsidy' },
];

export default function Footer() {
  const siteData = useSiteData();
  const { company, navigation, social } = siteData;
  const currentYear = new Date().getFullYear();
  const translateInitialized = useRef(false);

  // Initialize Google Translate widget once the element is mounted
  useEffect(() => {
    if (translateInitialized.current) return;

    const initWidget = () => {
      const el = document.getElementById('google_translate_element');
      if (!el) return;
      // Check if the widget was already created (e.g., by the global callback)
      if (el.querySelector('.goog-te-gadget')) {
        translateInitialized.current = true;
        return;
      }

      try {
        if (
          typeof window !== 'undefined' &&
          (window as any).google?.translate?.TranslateElement
        ) {
          new (window as any).google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              includedLanguages: 'en,hi,ta,te,kn,ml,bn,gu,mr,pa',
              layout: (window as any).google.translate.TranslateElement
                .InlineLayout.SIMPLE,
              autoDisplay: false,
            },
            'google_translate_element'
          );
          translateInitialized.current = true;
        }
      } catch (e) {
        // Google Translate API not loaded yet, will retry
      }
    };

    // Try immediately
    initWidget();

    // If not initialized yet, poll until the API is available
    if (!translateInitialized.current) {
      const interval = setInterval(() => {
        initWidget();
        if (translateInitialized.current) clearInterval(interval);
      }, 500);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <footer role="contentinfo" className="footer-root">
      {/* Main Footer */}
      <div className="container-content footer-main">
        <div className="footer-grid">
          {/* Column 1: Quick Links */}
          <div className="footer-col">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              {QUICK_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="footer-link">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Company */}
          <div className="footer-col">
            <h3 className="footer-heading">Company</h3>
            <ul className="footer-links">
              {COMPANY_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="footer-link">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Social + Translate */}
          <div className="footer-col footer-col-right">
            <h3 className="footer-heading">Follow Us</h3>
            <div className="footer-social-row">
              {social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-icon"
                  aria-label={`Follow us on ${item.name}`}
                >
                  <SocialIcon name={item.icon} />
                </a>
              ))}
            </div>

            {/* Google Translate Widget */}
            <div className="footer-translate">
              <GlobeIcon />
              <span className="footer-translate-label">Translate</span>
              <div
                id="google_translate_element"
                className="footer-translate-widget"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container-content footer-bottom-inner">
          <p className="footer-copyright">
            © {currentYear} {company.name}. All rights reserved.
          </p>
          <div className="footer-legal">
            {navigation.footer.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="footer-legal-link"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
