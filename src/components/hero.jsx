import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { profile } from '../data/content.js';
import { easeOut, stagger, fadeUp } from '../lib/motion-presets.js';
import Icon from './icon.jsx';

export default function Hero() {
  const reduce = useReducedMotion();
  const [photoOk, setPhotoOk] = useState(true);

  return (
    <section
      id="accueil"
      className="relative flex min-h-screen items-center scroll-mt-24 pb-16 pt-28"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          variants={stagger(0.12, 0.1)}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={fadeUp}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-sm text-muted"
          >
            <span className="h-2 w-2 rounded-full bg-accent" />
            Disponible pour des projets et des stages
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="text-4xl font-extrabold leading-[1.08] text-ink sm:text-5xl lg:text-6xl"
          >
            {profile.name.split(' ')[0]}{' '}
            <span className="text-gradient">{profile.name.split(' ').slice(1).join(' ')}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-xl text-lg text-muted"
          >
            {profile.title}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-3 max-w-xl text-base text-muted/90"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <motion.a
              href="#projets"
              whileHover={reduce ? undefined : { scale: 1.03 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-2 px-6 py-3 font-semibold text-white shadow-lg shadow-primary/25"
            >
              Voir mes projets
              <Icon name="arrowRight" size={18} />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={reduce ? undefined : { scale: 1.03 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Me contacter
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.2 }}
          className="justify-self-center lg:justify-self-end"
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-primary/40 to-accent/40 blur-2xl" />
            <div className="relative h-64 w-64 overflow-hidden rounded-[2rem] border border-border bg-surface sm:h-80 sm:w-80">
              {photoOk ? (
                <img
                  src={profile.photo}
                  alt={`Portrait de ${profile.name}`}
                  loading="eager"
                  onError={() => setPhotoOk(false)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-surface-2 to-surface">
                  <span className="font-display text-6xl font-bold text-gradient">
                    {profile.initials}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
