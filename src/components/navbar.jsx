import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { nav } from '../data/content.js';
import { useActiveSection } from '../lib/use-active-section.js';
import Icon from './icons.jsx';

const SECTION_IDS = ['accueil', ...nav.map((n) => n.id)];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-bg/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          href="#accueil"
          className="flex items-center gap-2 font-display text-base font-bold text-text"
        >
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-white">
            <Icon name="code" size={14} />
          </span>
          Chighali
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id} className="relative">
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative block rounded-full px-3.5 py-2 text-sm transition-colors ${
                    isActive ? 'text-text' : 'text-muted hover:text-text'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-white/[0.06]"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href="#contact"
          className="hidden rounded-full bg-gradient-to-r from-accent to-accent-2 px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgba(59,130,246,0.7)] transition-[filter] hover:brightness-110 md:inline-block"
        >
          Me contacter
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          className="grid h-10 w-10 place-items-center rounded-lg border border-border text-text md:hidden"
        >
          <span className="relative block h-4 w-5">
            <span className={`absolute left-0 block h-0.5 w-5 rounded bg-current transition-all ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
            <span className={`absolute left-0 top-1.5 block h-0.5 w-5 rounded bg-current transition-opacity ${open ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`absolute left-0 block h-0.5 w-5 rounded bg-current transition-all ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-border bg-bg/95 md:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 py-3">
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-3 py-3 text-sm ${
                      active === item.id ? 'bg-white/[0.06] text-text' : 'text-muted'
                    }`}
                  >
                    {item.label}
                    <Icon name="arrowRight" size={15} />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
