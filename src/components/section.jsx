import Reveal from './reveal.jsx';

// Ossature commune d'une section : ancre de navigation, largeur maximale,
// rythme vertical, et en-tête (sur-titre + titre) animé à l'entrée.
export default function Section({
  id,
  kicker,
  title,
  intro,
  children,
  className = '',
}) {
  return (
    <section id={id} className={`scroll-mt-24 py-20 sm:py-28 ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        {(kicker || title) && (
          <Reveal className="mb-12 max-w-2xl sm:mb-16">
            {kicker && (
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-accent">
                {kicker}
              </p>
            )}
            {title && (
              <h2 className="text-3xl font-bold text-ink sm:text-4xl">{title}</h2>
            )}
            {intro && <p className="mt-4 text-muted">{intro}</p>}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
