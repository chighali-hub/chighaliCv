import { motion, useReducedMotion } from 'framer-motion';
import Section from './section.jsx';
import { skillGroups, catColors } from '../data/content.js';
import { stagger, fadeUp, inView } from '../lib/motion-presets.js';
import Icon from './icons.jsx';

// Une carte par catégorie ; la couleur de catégorie teinte l'icône et un
// liseré en haut de la carte.
export default function Skills() {
  const reduce = useReducedMotion();

  return (
    <Section
      id="competences"
      kicker="Mes compétences"
      title="Technologies &"
      accent="outils"
    >
      <motion.div
        variants={stagger(0.07)}
        initial="hidden"
        whileInView="visible"
        viewport={inView}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {skillGroups.map((group) => {
          const c = catColors[group.cat];
          return (
            <motion.article
              key={group.label}
              variants={fadeUp}
              whileHover={reduce ? undefined : { y: -4 }}
              className="card relative overflow-hidden p-5"
              style={{ borderTop: `2px solid ${c}` }}
            >
              <div
                className="pointer-events-none absolute -top-20 left-0 h-40 w-full opacity-40"
                style={{
                  background: `radial-gradient(150px 90px at 25% 100%, ${c}, transparent 72%)`,
                }}
              />
              <div className="relative">
                <span
                  className="grid h-11 w-11 place-items-center rounded-xl border"
                  style={{
                    background: `color-mix(in srgb, ${c} 20%, transparent)`,
                    borderColor: `color-mix(in srgb, ${c} 45%, transparent)`,
                    color: c,
                  }}
                >
                  <Icon name={group.icon} size={20} />
                </span>
                <h3 className="mt-3 text-base font-semibold text-text">
                  {group.label}
                </h3>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-border bg-white/[0.03] px-2.5 py-1 text-xs text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </Section>
  );
}
