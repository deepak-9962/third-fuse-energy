/**
 * Privacy Policy Page
 * Based on PRD Section 7.7 - Legal pages
 */

import { motion } from 'framer-motion';
import { SEO } from '@/components';
import { fadeUp } from '@/lib/motion';
import siteData from '@/content/site.json';

export default function PrivacyPage() {
  const { company } = siteData;
  const lastUpdated = 'January 1, 2024';

  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Learn about how Third Fuse Energy collects, uses, and protects your personal information."
      />

      <section className="pt-12 pb-20 bg-gradient-hero">
        <div className="container-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-h1-mobile md:text-h1">Privacy Policy</h1>
            <p className="mt-4 text-text-light">Last updated: {lastUpdated}</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-content">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="prose prose-lg max-w-3xl mx-auto"
          >
            <h2>Introduction</h2>
            <p>
              {company.name} ("we," "our," or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your 
              information when you visit our website or use our services.
            </p>

            <h2>Information We Collect</h2>
            <h3>Personal Information</h3>
            <p>We may collect personal information that you voluntarily provide to us when you:</p>
            <ul>
              <li>Fill out a contact form</li>
              <li>Request a quote or consultation</li>
              <li>Subscribe to our newsletter</li>
              <li>Contact us via email or phone</li>
            </ul>
            <p>This information may include:</p>
            <ul>
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Company name</li>
              <li>Address</li>
              <li>Project details</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <p>
              When you visit our website, we may automatically collect certain information about 
              your device and usage, including:
            </p>
            <ul>
              <li>IP address</li>
              <li>Browser type</li>
              <li>Operating system</li>
              <li>Pages visited</li>
              <li>Time and date of visits</li>
              <li>Referring website</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We may use the information we collect to:</p>
            <ul>
              <li>Respond to your inquiries and requests</li>
              <li>Provide quotes and consultations</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Analyze usage patterns</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. 
              We may share your information with:
            </p>
            <ul>
              <li>Service providers who assist in our operations</li>
              <li>Partners involved in project installation (with your consent)</li>
              <li>Legal authorities when required by law</li>
            </ul>

            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your 
              personal information against unauthorized access, alteration, disclosure, or 
              destruction. However, no method of transmission over the Internet is 100% secure.
            </p>

            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent for data processing</li>
            </ul>

            <h2>Cookies</h2>
            <p>
              Our website may use cookies and similar technologies to enhance your experience. 
              You can control cookie settings through your browser preferences.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any 
              changes by posting the new policy on this page and updating the "Last updated" date.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p>
              {company.name}<br />
              {company.address.street}<br />
              {company.address.city}, {company.address.state} {company.address.zip}<br />
              Email: {company.email}<br />
              Phone: {company.phone}
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
