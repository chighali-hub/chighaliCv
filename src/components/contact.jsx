import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Section from './section.jsx';
import { contact } from '../data/content.js';
import Icon from './icons.jsx';

const EMPTY = { name: '', email: '', message: '', company: '' };

export default function Contact() {
  const reduce = useReducedMotion();
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm(EMPTY);
        return;
      }
      const data = await res.json().catch(() => ({}));
      setErrorMsg(
        data.error ||
          "L'envoi a échoué. Réessaie, ou écris-moi directement par email.",
      );
      setStatus('error');
    } catch {
      setErrorMsg(
        'Impossible de joindre le serveur. Vérifie ta connexion et réessaie.',
      );
      setStatus('error');
    }
  }

  const field =
    'w-full rounded-xl border border-border bg-white/[0.03] px-3.5 py-2.5 text-sm text-text placeholder:text-faint transition-colors focus:border-accent focus:outline-none';
  const submitting = status === 'submitting';

  return (
    <Section
      id="contact"
      kicker="Me contacter"
      title="Travaillons"
      accent="ensemble"
      intro="Une question, une proposition de projet ou de stage : le plus simple est de m’écrire."
    >
      <div
        className="card grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14"
        style={{
          background:
            'linear-gradient(135deg, color-mix(in oklab, var(--color-accent) 12%, transparent), color-mix(in oklab, var(--color-accent-2) 12%, transparent))',
        }}
      >
        <div className="space-y-3 self-start">
          <a
            href={`mailto:${contact.email}`}
            className="flex items-center gap-3 rounded-xl border border-border bg-white/[0.03] p-3.5 transition-colors hover:border-accent/60"
          >
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-white/[0.06] text-accent">
              <Icon name="mail" size={18} />
            </span>
            <span>
              <span className="block text-xs uppercase tracking-wider text-faint">
                Email
              </span>
              <span className="block text-sm font-medium text-text">
                {contact.email}
              </span>
            </span>
          </a>
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl border border-border bg-white/[0.03] p-3.5 transition-colors hover:border-accent/60"
          >
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-white/[0.06] text-accent">
              <Icon name="whatsapp" size={18} />
            </span>
            <span>
              <span className="block text-xs uppercase tracking-wider text-faint">
                WhatsApp
              </span>
              <span className="block text-sm font-medium text-text">
                {contact.phoneDisplay}
              </span>
            </span>
          </a>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm text-muted">Nom</span>
              <input
                type="text"
                required
                minLength={2}
                value={form.name}
                onChange={update('name')}
                disabled={submitting}
                className={field}
                placeholder="Votre nom"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm text-muted">Email</span>
              <input
                type="email"
                required
                value={form.email}
                onChange={update('email')}
                disabled={submitting}
                className={field}
                placeholder="vous@exemple.com"
              />
            </label>
          </div>

          <label className="mt-3 block">
            <span className="mb-1.5 block text-sm text-muted">Message</span>
            <textarea
              required
              minLength={10}
              rows={5}
              value={form.message}
              onChange={update('message')}
              disabled={submitting}
              className={`${field} resize-y`}
              placeholder="Quelques mots sur votre projet"
            />
          </label>

          {/* Pot de miel anti-robot : masqué et ignoré des lecteurs d'écran. */}
          <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
            <label>
              Ne pas remplir
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.company}
                onChange={update('company')}
              />
            </label>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={reduce || submitting ? undefined : { y: -2 }}
              whileTap={reduce || submitting ? undefined : { scale: 0.97 }}
              className="w-fit rounded-full bg-gradient-to-r from-accent to-accent-2 px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_34px_-10px_rgba(59,130,246,0.6)] transition-[filter] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? 'Envoi en cours…' : 'Envoyer un message'}
            </motion.button>

            <p role="status" aria-live="polite" className="text-sm">
              {status === 'success' && (
                <span className="text-accent">
                  Message envoyé. Je te réponds au plus vite.
                </span>
              )}
              {status === 'error' && (
                <span className="inline-block rounded-lg border border-border-strong bg-white/[0.04] px-3 py-2 text-text">
                  {errorMsg}
                </span>
              )}
            </p>
          </div>
        </form>
      </div>
    </Section>
  );
}
