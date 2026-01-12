/**
 * Header Component
 * Sticky header with shrink-on-scroll behavior and mobile menu
 * Based on PRD Section 8 - Header specs
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useSiteData } from '@/context/SiteContext';

interface NavItem {
  title: string;
  href: string;
}

interface HeaderProps {
  navItems?: NavItem[];
}

export default function Header({ navItems }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const siteData = useSiteData();
  
  const items = navItems || siteData.navigation.main;

  // Handle scroll for shrink effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [router.asPath]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === '/') return router.pathname === '/';
    return router.pathname.startsWith(href);
  };

  return (
    <header
      role="banner"
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-custom',
        isScrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-lg shadow-black/5 border-b border-gray-200 py-3'
          : 'bg-white/95 backdrop-blur-lg shadow-md py-4'
      )}
    >
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="container-content flex items-center justify-between"
      >
        {/* Logo */}
        <Link
          href="/"
          className="relative z-10 flex items-center gap-2"
          aria-label={`${siteData.company.name} - Home`}
        >
          <div
            className={cn(
              'relative transition-all duration-300',
              isScrolled ? 'h-10 w-10' : 'h-12 w-12'
            )}
          >
            <Image
              src="/images/logo-mark.png"
              alt=""
              fill
              className="object-contain"
              priority
            />
          </div>
          <span
            className={cn(
              'font-heading font-bold transition-all duration-300 hidden sm:block text-text',
              isScrolled ? 'text-lg' : 'text-xl'
            )}
          >
            Third Fuse Energy Corp
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-1">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'px-4 py-2 rounded-lg font-medium text-sm transition-all duration-fast',
                  isActive(item.href)
                    ? 'text-brand bg-brand/10'
                    : 'text-text hover:text-brand hover:bg-brand/5'
                )}
              >
                {item.title}
              </Link>
            </li>
          ))}
          <li className="ml-3">
            <Link 
              href="/contact" 
              className="inline-flex items-center text-sm font-semibold py-2.5 px-6 rounded-full bg-brand text-white shadow-lg shadow-brand/30 hover:bg-brand-dark hover:shadow-xl hover:shadow-brand/40 hover:scale-105 transition-all duration-200"
            >
              Get a Quote
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
        <button
          type="button"
          className="relative z-10 p-2 -mr-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span
              className={cn(
                'w-full h-0.5 rounded-full transition-all duration-300 bg-text',
                isMobileMenuOpen && 'rotate-45 translate-y-2'
              )}
            />
            <span
              className={cn(
                'w-full h-0.5 rounded-full transition-all duration-300 bg-text',
                isMobileMenuOpen && 'opacity-0'
              )}
            />
            <span
              className={cn(
                'w-full h-0.5 rounded-full transition-all duration-300 bg-text',
                isMobileMenuOpen && '-rotate-45 -translate-y-2'
              )}
            />
          </div>
        </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-border shadow-lg"
          >
            <nav className="container-content py-6">
              <ul className="space-y-1">
                {items.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        'block px-4 py-3 rounded-lg font-medium transition-colors',
                        isActive(item.href)
                          ? 'text-brand bg-brand/10'
                          : 'text-text hover:text-brand hover:bg-muted'
                      )}
                    >
                      {item.title}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-6 px-4">
                <Link
                  href="/contact"
                  className="btn-primary w-full text-center"
                >
                  Get a Free Quote
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
