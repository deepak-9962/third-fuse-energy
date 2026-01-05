/**
 * Layout Component
 * Wraps all pages with Header and Footer
 * Based on PRD Section 7 - All pages use shared Layout component
 */

import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main role="main" className="flex-1 pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}
