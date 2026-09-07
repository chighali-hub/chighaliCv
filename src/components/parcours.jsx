import Section from './section.jsx';
import Reveal from './reveal.jsx';
import { education, certifications, languages } from '../data/content.js';
import Icon from './icon.jsx';

function Dots({ filled, total = 5 }) {
  return (
    <span className="inline-flex gap-1" aria-hidden="true">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rounded-full ${
            i < filled ? 'bg-accent' : 'bg-border'
          }`}
        />
      ))}
    </span>
  );
}

export default function Parcours() {
  return (
    <Section id="parcours" kicker="Parcours" title="Formation, certifications et langues">
      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        {/* Formation + certifications : ligne de temps */}
        <div>
          <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-faint">
            Formation
          </h3>
          <ol className="relative border-l border-border pl-6">
            {education.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 0.05} className="mb-8 last:mb-0">
                <span className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full border-2 border-accent bg-bg" />
                <p className="font-mono text-xs text-accent">{step.year}</p>
                <p className="mt-1 text-base font-semibold text-ink">{step.title}</p>
                <p className="text-sm text-muted">{step.detail}</p>
              </Reveal>
            ))}
          </ol>

          <h3 className="mb-4 mt-10 text-sm font-semibold uppercase tracking-[0.2em] text-faint">
            Certifications
          </h3>
          <ul className="grid gap-3 sm:grid-cols-2">
            {certifications.map((cert, i) => (
              <Reveal
                as="li"
                key={cert.title}
                delay={i * 0.05}
                className="flex items-start gap-3 rounded-xl border border-border bg-surface/70 p-4"
              >
                <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-2 text-accent">
                  <Icon name="spark" size={16} />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">
                    {cert.title}
                  </span>
                  <span className="block text-sm text-muted">{cert.issuer}</span>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Langues */}
        <Reveal>
          <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-faint">
            Langues
          </h3>
          <ul className="space-y-4">
            {languages.map((lang) => (
              <li
                key={lang.name}
                className="rounded-xl border border-border bg-surface/70 p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-ink">
                    {lang.name}
                  </span>
                  <Dots filled={lang.dots} />
                </div>
                <p className="mt-1 text-sm text-muted">{lang.level}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
