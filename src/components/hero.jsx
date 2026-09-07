import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { profile, hero, about, social } from '../data/content.js';
import { stagger, fadeUp } from '../lib/motion-presets.js';
import Icon from './icons.jsx';
import TechTiles from './tech-tiles.jsx';

export default function Hero() {
  const reduce = useReducedMotion();
  const [photoOk, setPhotoOk] = useState(true);
  const [first, ...rest] = profile.name.split(' ');

  return (
    <section
      id="accueil"
      className="relative scroll-mt-24 pb-14 pt-28 sm:pb-16 sm:pt-32"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          variants={stagger(0.12, 0.05)}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-muted"
          >
            {hero.greeting}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="text-4xl font-bold leading-[1.05] text-text sm:text-5xl lg:text-6xl"
          >
            {first} <span className="text-gradient">{rest.join(' ')}</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-5 text-lg text-text/90">
            {profile.title}
          </motion.p>
          <motion.p variants={fadeUp} className="mt-3 max-w-xl text-muted">
            {profile.tagline}
          </motion.p>

          <motion.ul
            variants={fadeUp}
            className="mt-6 flex flex-wrap gap-2"
          >
            {about.behavioral.slice(0, 4).map((t) => (
              <li
                key={t}
                className="rounded-full border border-border bg-white/[0.04] px-3 py-1 text-xs text-text/80"
              >
                {t}
              </li>
            ))}
          </motion.ul>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <motion.a
              href="#projets"
              whileHover={reduce ? undefined : { y: -2 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
              className="rounded-full bg-gradient-to-r from-accent to-accent-2 px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_34px_-10px_rgba(59,130,246,0.6)] transition-[filter] hover:brightness-110"
            >
              Voir mes projets
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={reduce ? undefined : { y: -2 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
              className="rounded-full border border-border-strong bg-white/[0.03] px-6 py-3 text-sm font-semibold text-text transition-colors hover:border-accent/60 hover:bg-accent/10"
            >
              Me contacter
            </motion.a>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-6 flex items-center gap-3">
            {social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={s.label}
                className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted transition-colors hover:border-accent/60 hover:text-text"
              >
                <Icon name={s.icon} size={18} />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Portrait + tuiles flottantes */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div
            className="absolute -inset-6 rounded-[2rem] opacity-70"
            style={{
              background:
                'radial-gradient(circle at 40% 30%, rgba(59,130,246,0.35), transparent 60%), radial-gradient(circle at 70% 80%, rgba(139,92,246,0.3), transparent 60%)',
              filter: 'blur(30px)',
            }}
          />
          <div className="relative aspect-square overflow-hidden rounded-[1.6rem] border border-border-strong bg-surface">
            {photoOk ? (
              <img
                src={profile.photo}
                alt={`Portrait de ${profile.name}`}
                onError={() => setPhotoOk(false)}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="grid h-full w-full place-items-center">
                <span className="font-display text-5xl font-bold text-gradient">
                  {profile.initials}
                </span>
              </div>
            )}
          </div>
          <TechTiles />
          <span className="hand absolute -bottom-8 right-2 text-xl text-accent-2">
            {hero.hand}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
