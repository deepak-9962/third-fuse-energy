/**
 * Home Page
 * Main landing page with Hero, Services, Projects, Testimonials, and CTA
 * Based on PRD Section 7.1 - Home page specs
 */

import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SEO, Hero, ServiceCard, ProjectCard } from '@/components';
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';
import homeData from '@/content/home.json';

// Import project data
import mallProject from '@/content/projects/mall-rooftop-500kw.json';
import residentialProject from '@/content/projects/residential-estate-50kw.json';
import warehouseProject from '@/content/projects/warehouse-district-1mw.json';

interface HomePageProps {
  home: typeof homeData;
  projects: Array<typeof mallProject>;
}

export default function HomePage({ home, projects }: HomePageProps) {
  return (
    <>
      <SEO
        title="Home"
        description="Third Fuse Energy provides premium residential and commercial solar installations. Get a free quote today and start saving with clean solar energy."
      />

      {/* Hero Section */}
      <Hero
        title={home.hero.title}
        subtitle={home.hero.subtitle}
        cta={home.hero.cta}
        ctaSecondary={home.hero.ctaSecondary}
        image={home.hero.image}
      />

      {/* Stats Section */}
      <section className="py-12 bg-brand">
        <div className="container-content">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {home.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-heading font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-white/80 mt-1 text-sm md:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-white">
        <div className="container-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h2 className="heading-accent">Our Services</h2>
            <p className="mt-4 text-text-light text-lg">
              Comprehensive solar solutions for homes and businesses of all sizes
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {home.services.map((service) => (
              <motion.div key={service.id} variants={staggerItem}>
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  summary={service.summary}
                  href={service.href}
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            className="text-center mt-10"
          >
            <Link href="/services" className="btn-secondary">
              View All Services
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-bg">
        <div className="container-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h2 className="heading-accent">{home.whyChooseUs.title}</h2>
            <p className="mt-4 text-text-light text-lg">
              {home.whyChooseUs.subtitle}
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {home.whyChooseUs.items.map((item) => (
              <motion.div
                key={item.title}
                variants={staggerItem}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-brand/10 flex items-center justify-center">
                  <IconComponent name={item.icon} className="w-6 h-6 text-brand" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg">{item.title}</h3>
                  <p className="text-text-light mt-1">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Preview Section */}
      <section className="section-padding bg-white">
        <div className="container-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h2 className="heading-accent">Featured Projects</h2>
            <p className="mt-4 text-text-light text-lg">
              See some of our recent solar installations
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((project) => (
              <motion.div key={project.id} variants={staggerItem}>
                <ProjectCard
                  id={project.id}
                  title={project.title}
                  thumbnail={project.thumbnail}
                  category={project.categories}
                  year={project.year}
                  summary={project.summary}
                  onClick={() => window.location.href = `/projects#${project.slug}`}
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            className="text-center mt-10"
          >
            <Link href="/projects" className="btn-secondary">
              View All Projects
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-surface">
        <div className="container-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h2 className="heading-accent">What Our Clients Say</h2>
            <p className="mt-4 text-text-light text-lg">
              Don't just take our word for it
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid md:grid-cols-3 gap-6"
          >
            {home.testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={staggerItem}
                className="bg-white rounded-xl p-6 shadow-card"
              >
                {/* Quote icon */}
                <svg
                  className="w-10 h-10 text-brand/20 mb-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <blockquote className="text-text-light italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="mt-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-muted overflow-hidden">
                    <div className="w-full h-full bg-brand/10 flex items-center justify-center text-brand font-semibold">
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-text">{testimonial.author}</div>
                    <div className="text-sm text-text-light">{testimonial.role}</div>
                    <div className="text-sm text-text-light">{testimonial.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brand to-brand-accent">
        <div className="container-content text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
              {home.cta.title}
            </h2>
            <p className="mt-4 text-white/90 text-lg max-w-xl mx-auto">
              {home.cta.subtitle}
            </p>
            <div className="mt-8">
              <Link
                href={home.cta.buttonHref}
                className="btn bg-white text-brand hover:bg-white/90 text-lg px-8 py-4"
              >
                {home.cta.buttonText}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

// Icon component for Why Choose Us section
const IconComponent = ({ name, className }: { name: string; className?: string }) => {
  const icons: Record<string, JSX.Element> = {
    shield: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    users: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    zap: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    dollar: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    leaf: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    headphones: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  };

  return icons[name] || icons.shield;
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  return {
    props: {
      home: homeData,
      projects: [mallProject, residentialProject, warehouseProject],
    },
  };
};
