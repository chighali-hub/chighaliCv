import { motion, useReducedMotion } from 'framer-motion';
import Section from './section.jsx';
import { skillGroups } from '../data/content.js';
import { fadeUp, popIn, stagger, inView } from '../lib/motion-presets.js';
import Icon from './icon.jsx';

export default function Skills() {
  const reduce = useReducedMotion();

  return (
    <Section
      id="competences"
      kicker="Compétences techniques"
      title="Ce avec quoi je construis"
    >
      <motion.div
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={inView}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {skillGroups.map((group) => (
          <motion.article
            key={group.label}
            variants={fadeUp}
            className="group rounded-2xl border border-border bg-surface/70 p-6 transition-colors hover:border-primary-2/60"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-2 text-accent">
                <Icon name={group.icon} size={20} />
              </span>
              <h3 className="text-base font-semibold text-ink">{group.label}</h3>
            </div>

            <motion.ul
              variants={stagger(0.04)}
              className="flex flex-wrap gap-2"
            >
              {group.items.map((item) => (
                <motion.li
                  key={item}
                  variants={popIn}
                  whileHover={reduce ? undefined : { scale: 1.07 }}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-bg/60 px-2.5 py-1.5 text-sm text-muted"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-primary-2 to-accent" />
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}
