import { motion, useReducedMotion } from 'framer-motion';
import Section from './section.jsx';
import Reveal from './reveal.jsx';
import { about } from '../data/content.js';
import { stagger, fadeUp, inView } from '../lib/motion-presets.js';
import Icon from './icons.jsx';

export default function About() {
  const reduce = useReducedMotion();

  return (
    <Section id="a-propos" kicker="À propos de moi" title="Qui" accent="suis-je ?">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <Reveal>
          <div className="card relative grid aspect-[4/3] place-items-center overflow-hidden">
            <div
              className="absolute inset-0 opacity-80"
              style={{
                background:
                  'radial-gradient(circle at 30% 25%, rgba(59,130,246,0.25), transparent 55%), radial-gradient(circle at 75% 80%, rgba(139,92,246,0.22), transparent 55%)',
              }}
            />
            <div className="relative grid h-16 w-16 place-items-center rounded-2xl bg-white/[0.06] text-accent">
              <Icon name="code" size={30} />
            </div>
          </div>
        </Reveal>

        <div>
          <div className="max-w-2xl space-y-4 text-text/90">
            {about.paragraphs.map((p, i) => (
              <Reveal as="p" key={i}>
                {p}
              </Reveal>
            ))}
          </div>

          <motion.ul
            variants={stagger(0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            className="mt-8 flex flex-wrap gap-2.5"
          >
            {about.behavioral.map((trait) => (
              <motion.li
                key={trait}
                variants={fadeUp}
                whileHover={reduce ? undefined : { y: -2 }}
                className="flex items-center gap-2 rounded-full border border-border bg-white/[0.04] px-3.5 py-1.5 text-sm text-text/85"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-accent to-accent-2" />
                {trait}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </Section>
  );
}
