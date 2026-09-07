import Reveal from './reveal.jsx';

// En-tête de section façon maquette : petit sur-titre, puis titre avec le
// dernier segment en dégradé bleu -> violet.
export default function Section({
  id,
  kicker,
  title,
  accent,
  intro,
  children,
  className = '',
}) {
  return (
    <section id={id} className={`scroll-mt-24 py-16 sm:py-20 ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        {(kicker || title) && (
          <Reveal className="mb-10 max-w-2xl sm:mb-14">
            {kicker && (
              <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-accent">
                {kicker}
              </p>
            )}
            {title && (
              <h2 className="text-2xl font-bold text-text sm:text-3xl">
                {title}
                {accent && <span className="text-gradient"> {accent}</span>}
              </h2>
            )}
            {intro && <p className="mt-3 text-muted">{intro}</p>}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
