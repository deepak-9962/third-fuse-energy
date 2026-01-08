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
      <Hero
        title={subsidy.hero.title}
        subtitle={subsidy.hero.subtitle}
        cta="View Subsidy Details"
        ctaHref="#residential"
        ctaSecondary="Apply Now"
        ctaSecondaryHref="/contact"
      />

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

      {/* Capacity Section */}
      <section className="section-padding bg-light">
        <div className="container-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            className="max-w-4xl mx-auto"
          >
            <h2 className="heading-2 mb-4">{subsidy.capacity.title}</h2>
            <p className="text-text-light mb-8 text-lg">{subsidy.capacity.description}</p>
            
            <div className="overflow-x-auto rounded-xl shadow-card bg-white border border-gray-100 mb-6">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    {subsidy.capacity.table.headers.map((header: string, index: number) => (
                      <th key={index} className="p-4 font-semibold text-lg">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {subsidy.capacity.table.rows.map((row: any, index: number) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 text-text">{row.units}</td>
                      <td className="p-4 text-text font-semibold">{row.capacity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <p className="text-sm text-text-light italic flex items-center gap-2">
              <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {subsidy.capacity.note}
            </p>
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
