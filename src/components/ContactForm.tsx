/**
 * ContactForm Component
 * Contact form with validation, honeypot, and success/error states
 * Based on PRD Section 8 - ContactForm specs and Section 12 - Forms
 */

'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  message: string;
  botField: string; // Honeypot
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const projectTypes = [
  { value: '', label: 'Select project type' },
  { value: 'residential', label: 'Residential Solar' },
  { value: 'commercial', label: 'Commercial Solar' },
  { value: 'battery', label: 'Battery Storage' },
  { value: 'maintenance', label: 'Maintenance & Service' },
  { value: 'consulting', label: 'Energy Consulting' },
  { value: 'other', label: 'Other' },
];

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    message: '',
    botField: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message || formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          projectType: '',
          message: '',
          botField: '',
        });
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Unable to send message. Please try again later.');
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-green-50 border border-green-200 rounded-xl p-8 text-center"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-heading font-semibold text-green-900 mb-2">
          Message Sent Successfully!
        </h3>
        <p className="text-green-700">
          Thank you for contacting us. We'll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 btn-secondary"
        >
          Send Another Message
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      onSubmit={handleSubmit}
      className="space-y-6"
      noValidate
    >
      {/* Honeypot field - hidden from users */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="botField">Leave this empty</label>
        <input
          type="text"
          id="botField"
          name="botField"
          value={formData.botField}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Name & Email Row */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="label">
            Full Name <span className="text-brand-red">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={cn('input', errors.name && 'input-error')}
            placeholder="John Smith"
            required
          />
          {errors.name && (
            <p className="mt-1 text-sm text-brand-red">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="label">
            Email Address <span className="text-brand-red">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={cn('input', errors.email && 'input-error')}
            placeholder="john@example.com"
            required
          />
          {errors.email && (
            <p className="mt-1 text-sm text-brand-red">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Phone & Company Row */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="label">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="input"
            placeholder="(555) 123-4567"
          />
        </div>

        <div>
          <label htmlFor="company" className="label">
            Company Name
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="input"
            placeholder="Your Company"
          />
        </div>
      </div>

      {/* Project Type */}
      <div>
        <label htmlFor="projectType" className="label">
          Project Type
        </label>
        <select
          id="projectType"
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          className="input"
        >
          {projectTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="label">
          Message <span className="text-brand-red">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className={cn('input resize-none', errors.message && 'input-error')}
          placeholder="Tell us about your project..."
          required
        />
        {errors.message && (
          <p className="mt-1 text-sm text-brand-red">{errors.message}</p>
        )}
      </div>

      {/* Error Message */}
      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {errorMessage}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-primary w-full md:w-auto"
      >
        {status === 'submitting' ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Sending...
          </span>
        ) : (
          'Send Message'
        )}
      </button>

      <p className="text-sm text-text-light">
        By submitting this form, you agree to our{' '}
        <a href="/privacy" className="link">Privacy Policy</a>.
      </p>
    </motion.form>
  );
}
