/**
 * Utility functions and helpers
 */

import { clsx, type ClassValue } from 'clsx';

/**
 * Combines class names using clsx
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Format phone number for display
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  if (cleaned.length === 11 && cleaned[0] === '1') {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  return phone;
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Generate a URL-friendly slug from a string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Format number with commas
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

/**
 * Get initials from a name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Check if we're on the client side
 */
export function isClient(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Check if we're on the server side
 */
export function isServer(): boolean {
  return typeof window === 'undefined';
}

/**
 * Get the base URL for the site
 */
export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://thirdfuseenergy.com';
}

/**
 * Create a full URL from a path
 */
export function getFullUrl(path: string): string {
  const baseUrl = getSiteUrl();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}

/**
 * Simple rate limiter for API routes (in-memory, resets on restart)
 */
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 5,
  windowMs: number = 60000
): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  if (!entry || now - entry.lastReset > windowMs) {
    rateLimitMap.set(identifier, { count: 1, lastReset: now });
    return true;
  }

  if (entry.count >= maxRequests) {
    return false;
  }

  entry.count++;
  return true;
}

/**
 * Extract categories from projects array
 */
export function extractCategories(projects: Array<{ categories: string[] }>): string[] {
  const categories = new Set<string>();
  projects.forEach((project) => {
    project.categories.forEach((cat) => categories.add(cat));
  });
  return Array.from(categories).sort();
}
