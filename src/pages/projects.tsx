/**
 * Projects Page
 * Filterable project grid with lightbox modal
 * Based on PRD Section 7.4 - Projects page specs
 */

import { useState, useMemo } from 'react';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { SEO, ProjectCard, Modal } from '@/components';
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';
import { extractCategories, cn } from '@/lib/utils';

// Import all projects
import mallProject from '@/content/projects/mall-rooftop-500kw.json';
import residentialProject from '@/content/projects/residential-estate-50kw.json';
import warehouseProject from '@/content/projects/warehouse-district-1mw.json';
import officeProject from '@/content/projects/office-complex-200kw.json';
import farmProject from '@/content/projects/farm-ground-mount-750kw.json';
import schoolProject from '@/content/projects/school-district-300kw.json';

type Project = typeof mallProject;

interface ProjectsPageProps {
  projects: Project[];
  categories: string[];
}

export default function ProjectsPage({ projects, categories }: ProjectsPageProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Filter projects based on active category
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter((p) => p.categories.includes(activeFilter));
  }, [projects, activeFilter]);

  const openProjectModal = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      setSelectedProject(project);
    }
  };

  const openLightbox = (imageUrl: string) => {
    setLightboxImage(imageUrl);
  };

  return (
    <>
      <SEO
        title="Projects"
        description="Explore our portfolio of residential and commercial solar installations. See real examples of our work across various industries."
      />

      {/* Hero Section */}
      <section className="pt-12 pb-20 bg-gradient-hero">
        <div className="container-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-h1-mobile md:text-h1">Our Projects</h1>
            <p className="mt-4 text-xl text-text-light">
              Explore our portfolio of successful solar installations
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-8 bg-white border-b border-border sticky top-16 z-40">
        <div className="container-content">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center justify-center gap-2"
          >
            <button
              onClick={() => setActiveFilter('all')}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                activeFilter === 'all'
                  ? 'bg-brand text-white'
                  : 'bg-muted text-text hover:bg-brand/10'
              )}
            >
              All Projects
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all capitalize',
                  activeFilter === category
                    ? 'bg-brand text-white'
                    : 'bg-muted text-text hover:bg-brand/10'
                )}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-surface">
        <div className="container-content">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={staggerItem}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectCard
                    id={project.id}
                    title={project.title}
                    thumbnail={project.thumbnail}
                    category={project.categories}
                    year={project.year}
                    summary={project.summary}
                    onClick={openProjectModal}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-text-light text-lg">No projects found for this category.</p>
              <button
                onClick={() => setActiveFilter('all')}
                className="mt-4 btn-secondary"
              >
                View All Projects
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Project Detail Modal */}
      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title}
        size="xl"
      >
        {selectedProject && (
          <div className="space-y-6">
            {/* Project Images */}
            <div className="grid grid-cols-3 gap-2">
              {selectedProject.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => openLightbox(image)}
                  className="relative aspect-video bg-muted rounded-lg overflow-hidden hover:opacity-90 transition-opacity focus:ring-2 focus:ring-brand"
                >
                  <Image
                    src={image}
                    alt={`${selectedProject.title} image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                </button>
              ))}
            </div>

            {/* Project Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-heading font-semibold text-sm text-text-light uppercase tracking-wider mb-3">
                  Project Details
                </h4>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-text-light">Location</dt>
                    <dd className="font-medium">{selectedProject.location}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-text-light">Capacity</dt>
                    <dd className="font-medium">{selectedProject.capacity}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-text-light">Client</dt>
                    <dd className="font-medium">{selectedProject.client}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-text-light">Duration</dt>
                    <dd className="font-medium">{selectedProject.duration}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-text-light">Year</dt>
                    <dd className="font-medium">{selectedProject.year}</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h4 className="font-heading font-semibold text-sm text-text-light uppercase tracking-wider mb-3">
                  Categories
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.categories.map((cat) => (
                    <span key={cat} className="badge-primary capitalize">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="font-heading font-semibold text-sm text-text-light uppercase tracking-wider mb-3">
                About This Project
              </h4>
              <p className="text-text-light">{selectedProject.description}</p>
            </div>

            {/* Highlights */}
            <div>
              <h4 className="font-heading font-semibold text-sm text-text-light uppercase tracking-wider mb-3">
                Project Highlights
              </h4>
              <ul className="space-y-2">
                {selectedProject.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-text-light">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Testimonial */}
            {selectedProject.testimonial && (
              <div className="bg-muted rounded-xl p-6">
                <svg className="w-8 h-8 text-brand/30 mb-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <blockquote className="text-text-light italic">
                  "{selectedProject.testimonial.quote}"
                </blockquote>
                <div className="mt-4">
                  <div className="font-semibold text-text">{selectedProject.testimonial.author}</div>
                  <div className="text-sm text-text-light">{selectedProject.testimonial.role}</div>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Lightbox Modal */}
      <Modal
        isOpen={!!lightboxImage}
        onClose={() => setLightboxImage(null)}
        size="full"
        showCloseButton={true}
      >
        {lightboxImage && (
          <div className="relative w-full h-[70vh]">
            <Image
              src={lightboxImage}
              alt="Project image"
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
        )}
      </Modal>
    </>
  );
}

export const getStaticProps: GetStaticProps<ProjectsPageProps> = async () => {
  const projects = [
    mallProject,
    residentialProject,
    warehouseProject,
    officeProject,
    farmProject,
    schoolProject,
  ];

  const categories = extractCategories(projects);

  return {
    props: {
      projects,
      categories,
    },
  };
};
