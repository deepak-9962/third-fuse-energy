import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SEO, Hero } from '@/components';
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';
import { useLocale } from '@/context/LocaleContext';

// Import all locale data at build time
import subsidyEn from '@/content/locales/en/subsidy.json';
import subsidyHi from '@/content/locales/hi/subsidy.json';
import subsidyTa from '@/content/locales/ta/subsidy.json';
import subsidyTe from '@/content/locales/te/subsidy.json';
import subsidyKn from '@/content/locales/kn/subsidy.json';
import subsidyMl from '@/content/locales/ml/subsidy.json';

const subsidyDataMap: Record<string, typeof subsidyEn> = {
  en: subsidyEn,
  hi: subsidyHi,
  ta: subsidyTa,
  te: subsidyTe,
  kn: subsidyKn,
  ml: subsidyMl,
};

export default function SubsidyPage() {
  const { locale } = useLocale();
  const subsidy = subsidyDataMap[locale] || subsidyEn;

  return (
    <>
      <SEO
        title={subsidy.hero.title}
        description={subsidy.hero.subtitle}
      />

      {/* Hero Section */}
      <section data-page-hero className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-[#011d4f] via-[#02399C] to-[#023078] pt-32">
        <div className="container-content relative z-10 py-16 md:py-24">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="max-w-3xl">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-h1-mobile md:text-h1 text-white text-balance leading-tight md:leading-[1.2] md:tracking-[-0.01em] drop-shadow-lg"
              >
                {subsidy.hero.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="mt-6 text-body-lg md:text-xl leading-relaxed text-white max-w-2xl mx-auto drop-shadow-md"
              >
                {subsidy.hero.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link href="#residential" className="btn-primary text-lg px-8 py-4">
                  View Subsidy Details
                </Link>
                <Link href="/contact" className="btn-secondary text-lg px-8 py-4">
                  Apply Now
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm md:text-base text-white drop-shadow-md font-medium"
              >
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Free Consultation</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>25-Year Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>NABCEP Certified</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Residential Section */}
      <section className="section-padding bg-white" id="residential">
        <div className="container-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            className="max-w-4xl mx-auto"
          >
            <h2 className="heading-2 mb-4">{subsidy.residential.title}</h2>
            <p className="text-text-light mb-8 text-lg">{subsidy.residential.description}</p>
            
            <div className="overflow-x-auto rounded-xl shadow-card border border-gray-100">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-brand text-white">
                    {subsidy.residential.table.headers.map((header: string, index: number) => (
                      <th key={index} className="p-4 font-semibold text-lg">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {subsidy.residential.table.rows.map((row: any, index: number) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-medium text-text">{row.size}</td>
                      <td className="p-4 text-text font-bold text-brand">{row.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* GHS / Apartments Section */}
      <section className="section-padding bg-white" id="ghs">
        <div className="container-content">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            className="max-w-4xl mx-auto bg-brand/5 border border-brand/20 rounded-2xl p-8 md:p-12 relative overflow-hidden"
          >
            <div className="relative z-10">
              <span className="inline-block px-4 py-1.5 rounded-full bg-brand/10 text-brand text-sm font-bold mb-4">Group Housing</span>
              <h2 className="heading-2 mb-4">{subsidy.ghs.title}</h2>
              <p className="text-text-light mb-8 text-lg">{subsidy.ghs.content}</p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <ul className="space-y-4">
                    {subsidy.ghs.highlights.map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <svg className="w-6 h-6 text-brand shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        <span className="text-text">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col justify-center">
                   <h3 className="font-heading font-bold text-gray-900 mb-2">{subsidy.ghs.example.title}</h3>
                   <div className="text-lg text-brand font-bold bg-brand/10 p-3 rounded-lg text-center">
                     {subsidy.ghs.example.text}
                   </div>
                </div>
              </div>

              <div className="mt-10 text-center">
                <Link href="/contact" className="btn-primary">
                   Get Government Subsidy Help
                </Link>
              </div>
            </div>
            
            {/* Background Pattern */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand/5 rounded-full blur-3xl opacity-50" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-secondary/5 rounded-full blur-3xl opacity-50" />
          </motion.div>
        </div>
      </section>
    </>
  );
}
