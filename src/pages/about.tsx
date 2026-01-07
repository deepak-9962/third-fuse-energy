/**
 * About Page
 * Company overview, mission, certifications, and team grid
 * Based on PRD Section 7.2 - About page specs
 */

import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SEO } from '@/components';
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';

interface AboutPageProps {
  about: any; // We'll type this properly later or infer
}

export default function AboutPage({ about }: AboutPageProps) {
  return (
    <>
      <SEO
        title="About Us"
        description={about.story.content[0]}
      />

      {/* Hero Section */}
      <section className="pt-12 pb-20 bg-gradient-hero">
        <div className="container-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-h1-mobile md:text-h1">{about.hero.title}</h1>
            <p className="mt-4 text-xl text-text-light">{about.hero.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-10 bg-brand">
        <div className="container-content">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {about.stats && about.stats.map((stat: any, index: number) => (
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
                <div className="text-white/80 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section-padding bg-white">
        <div className="container-content">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <h2 className="heading-accent">{about.story.title}</h2>
              <div className="mt-6 space-y-4">
                {about.story.content.map((paragraph: string, index: number) => (
                  <p key={index} className="text-text-light">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted"
            >
              <Image
                src={about.story.image}
                alt="Third Fuse Energy team"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="section-padding bg-muted">
        <div className="container-content">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Mission */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <h2 className="heading-accent">{about.mission.title}</h2>
              <p className="mt-6 text-lg text-text-light">{about.mission.content}</p>
              <div className="mt-6 p-6 bg-brand/5 rounded-xl border-l-4 border-brand">
                <p className="font-heading font-semibold text-text">Our Vision</p>
                <p className="mt-2 text-text-light italic">{about.mission.vision}</p>
              </div>
            </motion.div>

            {/* Values */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <h3 className="font-heading font-semibold text-xl mb-6">Our Core Values</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {about.mission.values.map((value: any) => (
                  <motion.div
                    key={value.title}
                    variants={staggerItem}
                    className="bg-white rounded-xl p-5 shadow-card"
                  >
                    <h4 className="font-heading font-semibold text-brand">
                      {value.title}
                    </h4>
                    <p className="mt-2 text-sm text-text-light">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="section-padding bg-white">
        <div className="container-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h2 className="heading-accent">Certifications & Partnerships</h2>
            <p className="mt-4 text-text-light">
              We maintain the highest industry standards and certifications
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {about.certifications.map((cert: any) => (
              <motion.div
                key={cert.name}
                variants={staggerItem}
                className="bg-muted rounded-xl p-6 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-lg flex items-center justify-center">
                  <Image
                    src={cert.image}
                    alt={cert.name}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <h4 className="font-semibold text-sm">{cert.name}</h4>
                <p className="text-xs text-text-light mt-1">{cert.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-surface">
        <div className="container-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h2 className="heading-accent">Meet Our Team</h2>
            <p className="mt-4 text-text-light">
              The experts behind every successful solar installation
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {about.team.map((member: any) => (
              <motion.div
                key={member.name}
                variants={staggerItem}
                className="bg-white rounded-xl overflow-hidden shadow-card"
              >
                <div className="relative aspect-square bg-muted">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-semibold text-lg">{member.name}</h3>
                  <p className="text-brand font-medium text-sm">{member.role}</p>
                  <p className="mt-3 text-text-light text-sm">{member.bio}</p>
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
              {about.cta.title}
            </h2>
            <p className="mt-4 text-white/90 text-lg max-w-xl mx-auto">
              {about.cta.subtitle}
            </p>
            <div className="mt-8">
              <Link
                href={about.cta.buttonHref}
                className="btn bg-white text-brand hover:bg-white/90 text-lg px-8 py-4"
              >
                {about.cta.buttonText}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}


export const getStaticProps: GetStaticProps<AboutPageProps> = async ({ locale }) => {
  const currentLocale = locale || 'en';
  let aboutData;
  try {
    aboutData = (await import(`@/content/locales/${currentLocale}/about.json`)).default;
  } catch (err) {
    aboutData = (await import(`@/content/locales/en/about.json`)).default;
  }

  return {
    props: {
      about: aboutData,
    },
  };
};
