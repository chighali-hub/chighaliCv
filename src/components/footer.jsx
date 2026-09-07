import { profile, social } from '../data/content.js';
import Icon from './icons.jsx';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-8 border-t border-border">
      <div
        className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-5 py-10 sm:flex-row sm:justify-between sm:px-8"
      >
        <p className="text-sm text-muted">
          {profile.name} — {year}
        </p>

        <div className="flex items-center gap-2.5">
          {social.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={s.label}
              className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted transition-colors hover:border-accent/60 hover:text-text"
            >
              <Icon name={s.icon} size={16} />
            </a>
          ))}
        </div>

        <a
          href="#accueil"
          className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-text"
        >
          Haut de page
          <Icon name="arrowUp" size={15} />
        </a>
      </div>
    </footer>
  );
}
