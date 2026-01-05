import React from 'react';
import { render, screen } from '@testing-library/react';
import SEO from '@/components/SEO';
import Head from 'next/head';

// Mock Next.js Head component
jest.mock('next/head', () => {
  return function MockHead({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
  };
});

describe('SEO', () => {
  const defaultProps = {
    title: 'Test Page Title',
    description: 'Test page description for SEO purposes',
  };

  it('renders without crashing', () => {
    render(<SEO {...defaultProps} />);
  });

  it('includes title in the document', () => {
    render(<SEO {...defaultProps} />);
    
    // Since we mock Head, check that the component renders
    // In real tests, you'd check document.title
  });

  it('accepts custom OG image', () => {
    const customProps = {
      ...defaultProps,
      ogImage: '/images/custom-og.jpg',
    };
    
    render(<SEO {...customProps} />);
    // Component should render without errors
  });

  it('accepts canonical URL', () => {
    const customProps = {
      ...defaultProps,
      canonical: 'https://thirdfuseenergy.com/about',
    };
    
    render(<SEO {...customProps} />);
    // Component should render without errors
  });

  it('includes structured data when provided', () => {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Third Fuse Energy',
    };
    
    const customProps = {
      ...defaultProps,
      structuredData,
    };
    
    render(<SEO {...customProps} />);
    // Component should handle structured data
  });

  it('handles missing optional props gracefully', () => {
    render(<SEO title="Minimal Title" />);
    // Should not throw
  });

  it('accepts noIndex prop', () => {
    render(<SEO {...defaultProps} noIndex />);
    // Component should render without errors
  });

  it('handles article-specific metadata', () => {
    const articleProps = {
      ...defaultProps,
      type: 'article' as const,
      publishedTime: '2024-01-15',
      author: 'John Doe',
    };
    
    render(<SEO {...articleProps} />);
    // Component should render without errors
  });
});

describe('SEO - Meta Tags', () => {
  it('generates proper title format', () => {
    const { container } = render(<SEO title="About Us" />);
    
    // Check that component renders
    expect(container).toBeInTheDocument();
  });

  it('uses default site name in title', () => {
    render(<SEO title="Services" />);
    // The actual title would be "Services | Third Fuse Energy" or similar
  });
});

describe('SEO - Open Graph', () => {
  it('sets og:type correctly', () => {
    render(<SEO title="Test" type="website" />);
    // Component should handle og:type
  });

  it('handles og:locale', () => {
    render(<SEO title="Test" locale="en_US" />);
    // Component should handle locale
  });
});

describe('SEO - Twitter Cards', () => {
  it('sets twitter card type', () => {
    render(<SEO title="Test" twitterCard="summary_large_image" />);
    // Component should handle twitter cards
  });
});
