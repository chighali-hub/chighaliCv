import { motion, useReducedMotion } from 'framer-motion';
import Section from './section.jsx';
import { projects } from '../data/content.js';
import { fadeUp, stagger, inView } from '../lib/motion-presets.js';
import Icon from './icon.jsx';

function Tags({ items }) {
  return (
    <ul className="mt-5 flex flex-wrap gap-2">
      {items.map((t) => (
        <li
          key={t}
          className="rounded-md border border-border bg-bg/60 px-2.5 py-1 text-xs font-medium text-muted"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

function StandardCard({ project }) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      variants={fadeUp}
      whileHover={reduce ? undefined : { y: -6 }}
      className="flex flex-col rounded-2xl border border-border bg-surface/70 p-6 transition-colors hover:border-accent/50"
    >
      <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface-2 text-accent">
        <Icon name="layout" size={18} />
      </div>
      <h3 className="text-lg font-semibold text-ink">{project.name}</h3>
      <p className="mt-2 text-sm text-muted">{project.summary}</p>
      <Tags items={project.tags} />
    </motion.article>
  );
}

function FeaturedCard({ project }) {
  return (
    <motion.article
      variants={fadeUp}
      className="rounded-2xl border border-primary-2/40 bg-gradient-to-b from-surface/90 to-surface/50 p-6 sm:p-8 lg:col-span-2"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {project.kind}
          </p>
          <h3 className="mt-2 text-xl font-bold text-ink sm:text-2xl">
            {project.name}
          </h3>
        </div>
        <span className="rounded-full border border-primary-2/40 bg-primary-2/10 px-3 py-1 text-xs font-medium text-primary-2">
          Projet phare
        </span>
      </div>

      <p className="mt-3 max-w-3xl text-muted">{project.summary}</p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {project.architecture.map((layer) => (
          <div
            key={layer.role}
            className="rounded-xl border border-border bg-bg/50 p-4"
          >
            <p className="text-sm font-semibold text-ink">{layer.role}</p>
            <p className="mt-1 font-mono text-xs text-accent">{layer.tech}</p>
            <p className="mt-2 text-sm text-muted">{layer.detail}</p>
          </div>
        ))}
      </div>

      <Tags items={project.tags} />
    </motion.article>
  );
}

export default function Projects() {
  return (
    <Section
      id="projets"
      kicker="Projets"
      title="Ce que j'ai construit"
      intro="Des applications menées de la conception au livrable, sur le web, le mobile et le back-end."
    >
      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={inView}
        className="grid gap-5 md:grid-cols-2"
      >
        {projects.map((project) =>
          project.featured ? (
            <FeaturedCard key={project.name} project={project} />
          ) : (
            <StandardCard key={project.name} project={project} />
          ),
        )}
      </motion.div>
    </Section>
  );
}
