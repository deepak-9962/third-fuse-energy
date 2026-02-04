/**
 * Email utility for contact form handling
 * Uses nodemailer for SMTP-based email delivery
 */

import nodemailer from 'nodemailer';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType?: string;
  message: string;
}

interface EmailConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  recipient: string;
}

function getEmailConfig(): EmailConfig {
  // Support both legacy and README-style env var names
  const host = process.env.EMAIL_SMTP_HOST || process.env.SMTP_HOST;
  const portRaw = process.env.EMAIL_SMTP_PORT || process.env.SMTP_PORT || '587';
  const port = Number.parseInt(portRaw, 10);
  const user = process.env.EMAIL_SMTP_USER || process.env.SMTP_USER;
  const pass =
    process.env.EMAIL_SMTP_PASS ||
    process.env.SMTP_PASSWORD ||
    process.env.SMTP_PASS;
  const recipient =
    process.env.FORM_RECIPIENT_EMAIL ||
    process.env.CONTACT_EMAIL ||
    'deepak5122d@gmail.com';

  if (!host || !user || !pass || Number.isNaN(port)) {
    throw new Error(
      'Email configuration is incomplete. Set EMAIL_SMTP_HOST/SMTP_HOST, EMAIL_SMTP_PORT/SMTP_PORT, EMAIL_SMTP_USER/SMTP_USER, and EMAIL_SMTP_PASS/SMTP_PASSWORD.'
    );
  }

  return { host, port, user, pass, recipient };
}

function createTransporter(config: EmailConfig) {
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });
}

function formatEmailBody(data: ContactFormData): string {
  const lines = [
    '='.repeat(50),
    'NEW CONTACT FORM SUBMISSION',
    '='.repeat(50),
    '',
    `Name: ${data.name}`,
    `Email: ${data.email}`,
  ];

  if (data.phone) {
    lines.push(`Phone: ${data.phone}`);
  }

  if (data.company) {
    lines.push(`Company: ${data.company}`);
  }

  if (data.projectType) {
    lines.push(`Project Type: ${data.projectType}`);
  }

  lines.push('');
  lines.push('-'.repeat(50));
  lines.push('MESSAGE:');
  lines.push('-'.repeat(50));
  lines.push('');
  lines.push(data.message);
  lines.push('');
  lines.push('='.repeat(50));
  lines.push(`Submitted at: ${new Date().toISOString()}`);
  lines.push('='.repeat(50));

  return lines.join('\n');
}

function formatEmailHTML(data: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #0B63D6; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #666; }
          .value { margin-top: 5px; }
          .message-box { background: white; padding: 15px; border-left: 4px solid #0B63D6; margin-top: 20px; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Form Submission</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name</div>
              <div class="value">${escapeHtml(data.name)}</div>
            </div>
            <div class="field">
              <div class="label">Email</div>
              <div class="value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></div>
            </div>
            ${data.phone ? `
            <div class="field">
              <div class="label">Phone</div>
              <div class="value">${escapeHtml(data.phone)}</div>
            </div>
            ` : ''}
            ${data.company ? `
            <div class="field">
              <div class="label">Company</div>
              <div class="value">${escapeHtml(data.company)}</div>
            </div>
            ` : ''}
            ${data.projectType ? `
            <div class="field">
              <div class="label">Project Type</div>
              <div class="value">${escapeHtml(data.projectType)}</div>
            </div>
            ` : ''}
            <div class="message-box">
              <div class="label">Message</div>
              <div class="value" style="white-space: pre-wrap;">${escapeHtml(data.message)}</div>
            </div>
          </div>
          <div class="footer">
            <p>This message was sent from the Third Fuse Energy website contact form.</p>
            <p>Submitted at: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

export async function sendContactEmail(data: ContactFormData): Promise<{ success: boolean; error?: string }> {
  try {
    const config = getEmailConfig();
    const transporter = createTransporter(config);

    const mailOptions = {
      from: `"Third Fuse Energy Website" <${config.user}>`,
      to: config.recipient,
      replyTo: data.email,
      subject: `New Contact Form Submission from ${data.name}`,
      text: formatEmailBody(data),
      html: formatEmailHTML(data),
    };

    await transporter.sendMail(mailOptions);
    
    return { success: true };
  } catch (error) {
    console.error('Failed to send contact email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to send email' 
    };
  }
}

// Validation helpers
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateContactForm(data: Partial<ContactFormData>): { 
  valid: boolean; 
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!data.email || !validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
