/**
 * Individual Service Detail Page
 * Displays full details for a specific service
 */

import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SEO } from '@/components';
import { fadeUp, viewportOnce, staggerContainer, staggerItem } from '@/lib/motion';
import { useLocale } from '@/context/LocaleContext';

// Import all locale data
import servicesEn from '@/content/locales/en/services.json';
import servicesHi from '@/content/locales/hi/services.json';
import servicesTa from '@/content/locales/ta/services.json';
import servicesTe from '@/content/locales/te/services.json';
import servicesKn from '@/content/locales/kn/services.json';
import servicesMl from '@/content/locales/ml/services.json';

const servicesDataMap: Record<string, typeof servicesEn> = {
  en: servicesEn,
  hi: servicesHi,
  ta: servicesTa,
  te: servicesTe,
  kn: servicesKn,
  ml: servicesMl,
};

// Icon component
const ServiceIcon = ({ name, className }: { name: string; className?: string }) => {
  const icons: Record<string, JSX.Element> = {
    home: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    building: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    factory: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    settings: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    car: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    droplet: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21c-4.97 0-9-4.03-9-9 0-3.87 5.4-10.08 7.73-12.55a1.67 1.67 0 012.54 0C15.6 1.92 21 8.13 21 12c0 4.97-4.03 9-9 9z" />
      </svg>
    ),
  };

  return icons[name] || icons.home;
};

export default function ServiceDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { locale } = useLocale();
  const servicesData = servicesDataMap[locale] || servicesEn;

  const service = servicesData.services.find((s: any) => s.id === id);

  // If route not ready yet
  if (!id) return null;

  // 404 fallback
  if (!service) {
    return (
      <>
        <SEO title="Service Not Found" description="The requested service could not be found." />
        <section className="pt-40 pb-20 text-center">
          <div className="container-content">
            <h1 className="text-h1-mobile md:text-h1 text-text">Service Not Found</h1>
            <p className="mt-4 text-lg text-text-light">The service you&apos;re looking for doesn&apos;t exist.</p>
            <div className="mt-8">
              <Link href="/services" className="btn-primary">
                View All Services
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <SEO title={service.title} description={service.description} />

      {/* Hero */}
      <section className="pt-40 pb-16 bg-gradient-to-br from-[#0a1628] via-[#0B63D6] to-[#083a7a]">
        <div className="container-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90 text-sm mb-6">
              <ServiceIcon name={service.icon} className="w-4 h-4" />
              Service
            </div>
            <h1 className="text-h1-mobile md:text-h1 text-white">{service.title}</h1>
            <p className="mt-4 text-xl text-white/90">{service.summary}</p>
          </motion.div>
        </div>
      </section>

      {/* Blurred service background wrapper */}
      <div className="relative overflow-hidden">
        {/* Blurred background image layer */}
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
          <Image
            src={service.image}
            alt=""
            fill
            className="object-cover blur-2xl scale-125 opacity-60"
            sizes="100vw"
            priority={false}
          />
          {/* White overlay for readability */}
          <div className="absolute inset-0 bg-white/40" />
        </div>

        {/* Main Content */}
        <section className="section-padding relative z-10">
          <div className="container-content">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Details */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                <h2 className="text-h2 heading-accent mb-6">About This Service</h2>
                <p className="text-lg text-gray-600 leading-relaxed">{service.description}</p>

                {service.subsidyEligible && (
                  <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm font-medium">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Eligible for Government Subsidy
                  </div>
                )}

                <div className="mt-10">
                  <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                    Book a Free Consultation
                  </Link>
                </div>
              </motion.div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewportOnce}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-surface"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="section-padding relative z-10">
          <div className="container-content">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              className="text-center mb-12"
            >
              <h2 className="text-h2 heading-accent">What&apos;s Included</h2>
              <p className="mt-3 text-lg text-text-light">Everything you get with our {service.title.toLowerCase()} solution</p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              {service.features.map((feature: string, idx: number) => (
                <motion.div
                  key={idx}
                  variants={staggerItem}
                  className="flex items-start gap-3 bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-sm"
                >
                  <svg
                    className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700 font-medium">{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </div>

      {/* CTA */}
      <section className="py-20 bg-brand text-white">
        <div className="container-content text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold">
              Ready to Get Started?
            </h2>
            <p className="mt-4 text-white/80 text-lg max-w-xl mx-auto">
              Contact us for a free consultation and customized quote for your {service.title.toLowerCase()} needs.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="bg-white text-brand px-8 py-4 rounded-lg font-semibold hover:bg-white/90 transition-colors">
                Request a Quote
              </Link>
              <Link href="/services" className="border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                View All Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
