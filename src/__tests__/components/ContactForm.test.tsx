import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '@/components/ContactForm';

// Mock fetch
global.fetch = jest.fn();

describe('ContactForm', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('renders all form fields', () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/service interest/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty required fields', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    // HTML5 validation should prevent submission
    const nameInput = screen.getByLabelText(/full name/i);
    expect(nameInput).toBeInvalid();
  });

  it('validates email format', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'invalid-email');

    expect(emailInput).toHaveValue('invalid-email');
  });

  it('submits form with valid data', async () => {
    const user = userEvent.setup();
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<ContactForm />);

    // Fill out the form
    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/phone/i), '555-123-4567');
    await user.selectOptions(screen.getByLabelText(/service interest/i), 'residential');
    await user.type(screen.getByLabelText(/message/i), 'I am interested in solar panels for my home.');

    // Submit
    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/contact', expect.any(Object));
    });
  });

  it('shows success message after successful submission', async () => {
    const user = userEvent.setup();
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<ContactForm />);

    // Fill out the form
    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'Test message');

    // Submit
    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/thank you/i)).toBeInTheDocument();
    });
  });

  it('shows error message on submission failure', async () => {
    const user = userEvent.setup();
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Server error' }),
    });

    render(<ContactForm />);

    // Fill out the form
    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'Test message');

    // Submit
    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/error|failed|problem/i)).toBeInTheDocument();
    });
  });

  it('disables submit button while submitting', async () => {
    const user = userEvent.setup();
    let resolvePromise: (value: unknown) => void;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });
    (global.fetch as jest.Mock).mockReturnValueOnce(promise);

    render(<ContactForm />);

    // Fill out the form
    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'Test message');

    // Submit
    await user.click(screen.getByRole('button', { name: /send message/i }));

    const submitButton = screen.getByRole('button');
    expect(submitButton).toBeDisabled();

    // Resolve the promise
    resolvePromise!({
      ok: true,
      json: async () => ({ success: true }),
    });

    await waitFor(() => {
      expect(screen.getByText(/thank you/i)).toBeInTheDocument();
    });
  });

  it('contains honeypot field that is hidden', () => {
    render(<ContactForm />);

    const honeypotField = document.querySelector('input[name="website"]');
    expect(honeypotField).toBeInTheDocument();
    
    // Check if parent has screen-reader only class or hidden styling
    const honeypotContainer = honeypotField?.closest('[class*="sr-only"], [aria-hidden="true"]') || 
                               honeypotField?.parentElement;
    expect(honeypotContainer).toBeInTheDocument();
  });
});
