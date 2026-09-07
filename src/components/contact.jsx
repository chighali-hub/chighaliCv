import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Section from './section.jsx';
import Reveal from './reveal.jsx';
import { contact } from '../data/content.js';
import Icon from './icon.jsx';

// Site 100 % statique : pas de backend pour recevoir un POST. Le formulaire
// compose un lien mailto pré-rempli et ouvre le client de messagerie de
// l'utilisateur. Pour un envoi sans quitter la page, brancher ici un service
// tiers (par exemple Formspree) en remplaçant handleSubmit par un fetch.
export default function Contact() {
  const reduce = useReducedMotion();
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Prise de contact — ${form.name || 'portfolio'}`,
    );
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}\n${form.email}`,
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  };

  const field =
    'w-full rounded-xl border border-border bg-bg/60 px-4 py-3 text-ink placeholder:text-faint focus:border-accent focus:outline-none';

  return (
    <Section
      id="contact"
      kicker="Contact"
      title="Travaillons ensemble"
      intro="Une question, une proposition de projet ou de stage : le plus simple est de m'écrire."
    >
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal className="space-y-4">
          <a
            href={`mailto:${contact.email}`}
            className="flex items-center gap-4 rounded-xl border border-border bg-surface/70 p-4 transition-colors hover:border-accent"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface-2 text-accent">
              <Icon name="mail" size={18} />
            </span>
            <span>
              <span className="block text-xs uppercase tracking-wider text-faint">
                Email
              </span>
              <span className="block text-sm font-medium text-ink">
                {contact.email}
              </span>
            </span>
          </a>

          <a
            href={`tel:${contact.phoneHref}`}
            className="flex items-center gap-4 rounded-xl border border-border bg-surface/70 p-4 transition-colors hover:border-accent"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface-2 text-accent">
              <Icon name="phoneCall" size={18} />
            </span>
            <span>
              <span className="block text-xs uppercase tracking-wider text-faint">
                Téléphone
              </span>
              <span className="block text-sm font-medium text-ink">
                {contact.phoneDisplay}
              </span>
            </span>
          </a>
        </Reveal>

        <Reveal
          as="form"
          onSubmit={handleSubmit}
          className="rounded-2xl border border-border bg-surface/70 p-6 sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-muted">
                Nom
              </span>
              <input
                type="text"
                required
                value={form.name}
                onChange={update('name')}
                className={field}
                placeholder="Votre nom"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-muted">
                Email
              </span>
              <input
                type="email"
                required
                value={form.email}
                onChange={update('email')}
                className={field}
                placeholder="vous@exemple.com"
              />
            </label>
          </div>

          <label className="mt-4 block">
            <span className="mb-1.5 block text-sm font-medium text-muted">
              Message
            </span>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={update('message')}
              className={`${field} resize-y`}
              placeholder="Quelques mots sur votre projet"
            />
          </label>

          <motion.button
            type="submit"
            whileHover={reduce ? undefined : { scale: 1.02 }}
            whileTap={reduce ? undefined : { scale: 0.98 }}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-2 px-6 py-3 font-semibold text-white shadow-lg shadow-primary/25"
          >
            Envoyer
            <Icon name="send" size={18} />
          </motion.button>
          <p className="mt-3 text-xs text-faint">
            Le bouton ouvre votre messagerie avec le message pré-rempli.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
