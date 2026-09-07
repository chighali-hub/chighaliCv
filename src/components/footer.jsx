import { profile } from '../data/content.js';
import Icon from './icon.jsx';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-5 sm:flex-row sm:px-8">
        <p className="text-sm text-faint">
          {profile.name} — {year}
        </p>
        <p className="text-sm text-faint">
          Construit avec React, Tailwind CSS et Framer Motion.
        </p>
        <a
          href="#accueil"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
        >
          Haut de page
          <Icon name="arrowUp" size={16} />
        </a>
      </div>
    </footer>
  );
}
