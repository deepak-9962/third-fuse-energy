/**
 * Services Page
 * Service cards with details and process steps
 * Based on PRD Section 7.3 - Services page specs
 */

import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SEO, ServiceCard } from '@/components';
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';
import servicesData from '@/content/services.json';

interface ServicesPageProps {
  services: typeof servicesData;
}

export default function ServicesPage({ services }: ServicesPageProps) {
  return (
    <>
      <SEO
        title="Services"
        description="Explore our comprehensive solar solutions including residential and commercial installations, battery storage, maintenance, and energy consulting."
      />

      {/* Hero Section */}
      <section className="pt-12 pb-20 bg-gradient-hero">
        <div className="container-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-h1-mobile md:text-h1">{services.hero.title}</h1>
            <p className="mt-4 text-xl text-text-light">{services.hero.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section-padding bg-white">
        <div className="container-content">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.services.map((service) => (
              <motion.div key={service.id} variants={staggerItem}>
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  summary={service.summary}
                  href={`#${service.id}`}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Detailed Service Sections */}
      {services.services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`section-padding ${index % 2 === 0 ? 'bg-muted' : 'bg-white'}`}
        >
          <div className="container-content">
            <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 !== 0 ? 'lg:grid-flow-dense' : ''}`}>
              {/* Content */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className={index % 2 !== 0 ? 'lg:col-start-2' : ''}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand/10 rounded-full text-brand font-medium text-sm mb-4">
                  <ServiceIcon name={service.icon} className="w-4 h-4" />
                  Service
                </div>
                <h2 className="text-h2 heading-accent">{service.title}</h2>
                <p className="mt-6 text-lg text-text-light">{service.description}</p>

                {/* Features list */}
                <ul className="mt-6 space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-text-light">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Link href="/contact" className="btn-primary">
                    Get a Quote
                  </Link>
                </div>
              </motion.div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewportOnce}
                className={`relative aspect-[4/3] rounded-2xl overflow-hidden bg-surface ${index % 2 !== 0 ? 'lg:col-start-1' : ''}`}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Process Section */}
      <section className="section-padding bg-brand text-white">
        <div className="container-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold">
              {services.process.title}
            </h2>
            <p className="mt-4 text-white/80 text-lg">{services.process.subtitle}</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.process.steps.map((step) => (
              <motion.div
                key={step.step}
                variants={staggerItem}
                className="relative"
              >
                <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm h-full">
                  <div className="w-12 h-12 rounded-full bg-white text-brand font-bold text-xl flex items-center justify-center mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-heading font-semibold text-lg">{step.title}</h3>
                  <p className="mt-2 text-white/80">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-surface">
        <div className="container-content text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text">
              {services.cta.title}
            </h2>
            <p className="mt-4 text-text-light text-lg max-w-xl mx-auto">
              {services.cta.subtitle}
            </p>
            <div className="mt-8">
              <Link href={services.cta.buttonHref} className="btn-primary text-lg px-8 py-4">
                {services.cta.buttonText}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

// Service icon component
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
    wrench: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    chart: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    battery: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 7h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2m16 4h2M7 11v4m4-4v4m4-4v4" />
      </svg>
    ),
    car: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  };

  return icons[name] || icons.home;
};

export const getStaticProps: GetStaticProps<ServicesPageProps> = async () => {
  return {
    props: {
      services: servicesData,
    },
  };
};
