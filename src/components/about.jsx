import { motion, useReducedMotion } from 'framer-motion';
import Section from './section.jsx';
import Reveal from './reveal.jsx';
import { about } from '../data/content.js';
import { popIn, stagger, inView } from '../lib/motion-presets.js';

export default function About() {
  const reduce = useReducedMotion();

  return (
    <Section id="a-propos" kicker="À propos" title="Qui je suis">
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 text-lg text-muted">
          {about.paragraphs.map((p, i) => (
            <Reveal as="p" key={i} delay={i * 0.05}>
              {p}
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-faint">
            Savoir-être
          </h3>
          <motion.ul
            variants={stagger(0.06)}
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            className="flex flex-wrap gap-2.5"
          >
            {about.behavioral.map((trait) => (
              <motion.li
                key={trait}
                variants={popIn}
                whileHover={reduce ? undefined : { scale: 1.06 }}
                className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-ink"
              >
                {trait}
              </motion.li>
            ))}
          </motion.ul>
        </Reveal>
      </div>
    </Section>
  );
}
