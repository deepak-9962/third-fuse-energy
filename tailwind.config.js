/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0B63D6',
          blue: '#0B63D6',
          red: '#D6222A',
          accent: '#4DA8FF',
        },
        text: {
          DEFAULT: '#1F2937',
          light: '#6B7280',
        },
        muted: '#6B7280',
        surface: '#FFFFFF',
        bg: '#F9FAFB',
        border: '#E5E7EB',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Montserrat', 'sans-serif'],
        body: ['var(--font-body)', 'Inter', 'sans-serif'],
      },
      fontSize: {
        'h1': ['2.625rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '800' }],
        'h1-mobile': ['2rem', { lineHeight: '1.15', letterSpacing: '-0.015em', fontWeight: '800' }],
        'h2': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h3': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7', fontWeight: '400' }],
      },
      maxWidth: {
        'content': '1200px',
      },
      spacing: {
        'gutter': '1.5rem',
        'section': '5rem',
        'section-mobile': '3rem',
      },
      transitionTimingFunction: {
        'custom': 'cubic-bezier(0.2, 0.9, 0.2, 1)',
      },
      transitionDuration: {
        'default': '350ms',
        'fast': '180ms',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'nav': '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'scale-in': 'scale-in 0.6s cubic-bezier(0.2, 0.9, 0.2, 1) forwards',
        'slide-up': 'slide-up 0.5s cubic-bezier(0.2, 0.9, 0.2, 1) forwards',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
