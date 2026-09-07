import { motion, useReducedMotion } from 'framer-motion';
import Section from './section.jsx';
import { projects, catColors } from '../data/content.js';
import { stagger, fadeUp, inView } from '../lib/motion-presets.js';
import Icon from './icons.jsx';

function Pills({ items }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-1.5">
      {items.map((t) => (
        <li
          key={t}
          className="rounded-full border border-border bg-white/[0.04] px-2.5 py-1 text-xs text-muted"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

const COVER_HUES = [
  ['rgba(59,130,246,0.28)', 'rgba(139,92,246,0.22)'],
  ['rgba(34,197,94,0.22)', 'rgba(56,189,248,0.22)'],
  ['rgba(236,72,153,0.22)', 'rgba(139,92,246,0.22)'],
  ['rgba(245,158,11,0.20)', 'rgba(59,130,246,0.22)'],
];

function Cover({ icon = 'layout', index = 0 }) {
  const [a, b] = COVER_HUES[index % COVER_HUES.length];
  return (
    <div
      className="relative grid h-28 place-items-center overflow-hidden rounded-xl border border-border"
      style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />
      <span className="relative grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-white">
        <Icon name={icon} size={22} />
      </span>
    </div>
  );
}

function StandardCard({ project, index }) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      variants={fadeUp}
      whileHover={reduce ? undefined : { y: -5 }}
      className="card flex flex-col p-5 transition-colors hover:border-border-strong"
    >
      <Cover index={index} icon={project.icon} />
      <h3 className="mt-4 text-lg font-semibold text-text">{project.name}</h3>
      <p className="mt-2 text-sm text-muted">{project.summary}</p>
      <Pills items={project.tags} />
    </motion.article>
  );
}

const ARCH_CATS = ['mobile', 'front', 'back'];

function FeaturedCard({ project }) {
  return (
    <motion.article
      variants={fadeUp}
      className="card p-6 sm:p-8 lg:col-span-2"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-accent/40 bg-accent/10 text-accent">
            <Icon name={project.icon} size={22} />
          </span>
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-accent">
              {project.kind}
            </p>
            <h3 className="mt-1 text-xl font-bold text-text sm:text-2xl">
              {project.name}
            </h3>
          </div>
        </div>
        <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
          Projet phare
        </span>
      </div>

      <p className="mt-3 max-w-3xl text-sm text-muted">{project.summary}</p>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {project.architecture.map((layer, i) => {
          const c = catColors[ARCH_CATS[i] ?? 'front'];
          return (
            <div
              key={layer.role}
              className="rounded-xl border p-4"
              style={{
                borderColor: `color-mix(in srgb, ${c} 35%, transparent)`,
                background: `color-mix(in srgb, ${c} 8%, transparent)`,
              }}
            >
              <p className="text-sm font-semibold text-text">{layer.role}</p>
              <p className="mt-1 text-xs font-medium" style={{ color: c }}>
                {layer.tech}
              </p>
              <p className="mt-2 text-sm text-muted">{layer.detail}</p>
            </div>
          );
        })}
      </div>

      <Pills items={project.tags} />
    </motion.article>
  );
}

export default function Projects() {
  return (
    <Section
      id="projets"
      kicker="Mes projets"
      title="Quelques"
      accent="réalisations"
      intro="Des applications menées de la conception au livrable, sur le web, le mobile et le back-end."
    >
      <motion.div
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={inView}
        className="grid gap-4 md:grid-cols-2"
      >
        {projects.map((project, i) =>
          project.featured ? (
            <FeaturedCard key={project.name} project={project} />
          ) : (
            <StandardCard key={project.name} project={project} index={i} />
          ),
        )}
      </motion.div>
    </Section>
  );
}
