/**
 * Terms of Service Page
 * Based on PRD Section 7.7 - Legal pages
 */

import { motion } from 'framer-motion';
import { SEO } from '@/components';
import { fadeUp } from '@/lib/motion';
import { useSiteData } from '@/context/SiteContext';

export default function TermsPage() {
  const siteData = useSiteData();
  const { company } = siteData;
  const lastUpdated = 'January 1, 2024';

  return (
    <>
      <SEO
        title="Terms of Service"
        description="Read the terms and conditions governing the use of Third Fuse Energy's website and services."
      />

      <section className="pt-12 pb-20 bg-gradient-hero">
        <div className="container-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-h1-mobile md:text-h1">Terms of Service</h1>
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
            <h2>Agreement to Terms</h2>
            <p>
              By accessing or using the {company.name} website and services, you agree to be 
              bound by these Terms of Service. If you do not agree to these terms, please do 
              not use our website or services.
            </p>

            <h2>Use of Website</h2>
            <p>You may use our website for lawful purposes only. You agree not to:</p>
            <ul>
              <li>Use the website in any way that violates applicable laws or regulations</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with the proper functioning of the website</li>
              <li>Use automated systems to access the website without permission</li>
              <li>Transmit malware, viruses, or other harmful code</li>
            </ul>

            <h2>Services</h2>
            <p>
              {company.name} provides solar installation and related energy services. Specific 
              terms and conditions for installation projects will be provided in separate 
              contracts and agreements.
            </p>

            <h2>Quotes and Estimates</h2>
            <p>
              Any quotes or estimates provided through our website are preliminary and subject 
              to change based on site assessment and project requirements. Final pricing will 
              be provided in a formal proposal.
            </p>

            <h2>Intellectual Property</h2>
            <p>
              All content on this website, including text, images, logos, and design elements, 
              is the property of {company.name} and is protected by copyright and other 
              intellectual property laws. You may not reproduce, distribute, or use our 
              content without written permission.
            </p>

            <h2>Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible 
              for the content, privacy practices, or availability of these websites.
            </p>

            <h2>Disclaimer of Warranties</h2>
            <p>
              Our website and services are provided "as is" without warranties of any kind, 
              either express or implied. We do not guarantee that our website will be 
              error-free, secure, or continuously available.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, {company.name} shall not be liable for 
              any indirect, incidental, special, or consequential damages arising from your 
              use of our website or services.
            </p>

            <h2>Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless {company.name} and its officers, 
              directors, employees, and agents from any claims, damages, or expenses arising 
              from your use of our website or violation of these terms.
            </p>

            <h2>Modifications</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. Changes will 
              be effective when posted on this page. Your continued use of the website 
              constitutes acceptance of the modified terms.
            </p>

            <h2>Governing Law</h2>
            <p>
              These Terms of Service are governed by the laws of the State of Texas, without 
              regard to conflict of law principles.
            </p>

            <h2>Dispute Resolution</h2>
            <p>
              Any disputes arising from these terms or your use of our services shall first 
              be addressed through good-faith negotiation. If resolution cannot be reached, 
              disputes may be submitted to binding arbitration.
            </p>

            <h2>Contact Information</h2>
            <p>
              If you have questions about these Terms of Service, please contact us at:
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
