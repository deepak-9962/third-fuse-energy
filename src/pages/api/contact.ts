/**
 * Contact Form API Route
 * Handles form submission, validation, and email delivery
 * Based on PRD Section 12 - Forms & backend (serverless)
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { sendContactEmail, validateContactForm, ContactFormData } from '@/lib/email';

interface SuccessResponse {
  ok: true;
  message: string;
}

interface ErrorResponse {
  ok: false;
  message: string;
  errors?: Record<string, string>;
}

type ResponseData = SuccessResponse | ErrorResponse;

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // max 5 requests per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (now - entry.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count++;
  return false;
}

function getClientIP(req: NextApiRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  if (Array.isArray(forwarded)) {
    return forwarded[0];
  }
  return req.socket.remoteAddress || 'unknown';
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      ok: false, 
      message: 'Method not allowed' 
    });
  }

  // Rate limiting
  const clientIP = getClientIP(req);
  if (isRateLimited(clientIP)) {
    return res.status(429).json({
      ok: false,
      message: 'Too many requests. Please try again later.',
    });
  }

  try {
    const body = req.body as Partial<ContactFormData> & { botField?: string };

    // Honeypot check - if botField is filled, reject (it's a bot)
    if (body.botField) {
      // Return success to the bot to not reveal the honeypot
      return res.status(200).json({
        ok: true,
        message: 'Message sent successfully',
      });
    }

    // Validate form data
    const { valid, errors } = validateContactForm(body);
    if (!valid) {
      return res.status(400).json({
        ok: false,
        message: 'Validation failed',
        errors,
      });
    }

    // Prepare form data
    const formData: ContactFormData = {
      name: body.name!.trim(),
      email: body.email!.trim().toLowerCase(),
      phone: body.phone?.trim(),
      company: body.company?.trim(),
      projectType: body.projectType?.trim(),
      message: body.message!.trim(),
    };

    // Send email
    const result = await sendContactEmail(formData);

    if (result.success) {
      return res.status(200).json({
        ok: true,
        message: 'Your message has been sent successfully. We will get back to you within 24 hours.',
      });
    } else {
      console.error('Email send failed:', result.error);
      return res.status(500).json({
        ok: false,
        message: 'Failed to send message. Please try again later or contact us directly.',
      });
    }
  } catch (error) {
    console.error('Contact API error:', error);
    return res.status(500).json({
      ok: false,
      message: 'An unexpected error occurred. Please try again later.',
    });
  }
}
