import Section from './section.jsx';
import Reveal from './reveal.jsx';
import {
  education,
  certifications,
  languages,
  highlights,
} from '../data/content.js';
import Icon from './icons.jsx';

function Dots({ filled, total = 5 }) {
  return (
    <span className="inline-flex gap-1" aria-hidden="true">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`h-1.5 w-4 rounded-full ${
            i < filled ? 'bg-gradient-to-r from-accent to-accent-2' : 'bg-white/10'
          }`}
        />
      ))}
    </span>
  );
}

export default function Parcours() {
  return (
    <Section
      id="parcours"
      kicker="Mon parcours"
      title="Formation &"
      accent="certifications"
    >
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <ol className="relative border-l border-border pl-6">
            {education.map((step) => (
              <Reveal as="li" key={step.title} className="mb-7 last:mb-0">
                <span className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full border-2 border-accent bg-bg" />
                <p className="text-xs font-medium text-accent">{step.year}</p>
                <p className="mt-1 text-base font-semibold text-text">
                  {step.title}
                </p>
                <p className="text-sm text-muted">{step.detail}</p>
              </Reveal>
            ))}
          </ol>

          <h3 className="mt-8 mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-muted">
            Certifications
          </h3>
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {certifications.map((cert) => (
              <Reveal
                as="li"
                key={cert.title}
                className="card flex items-start gap-3 p-3.5"
              >
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/[0.06] text-accent">
                  <Icon name="spark" size={16} />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-text">
                    {cert.title}
                  </span>
                  <span className="block text-sm text-muted">{cert.issuer}</span>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <Reveal className="card p-6">
            <h3 className="mb-4 text-base font-semibold text-text">
              En un coup d’œil
            </h3>
            <ul className="space-y-2.5">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-sm text-text/85">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                    <Icon name="arrowRight" size={12} />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="card p-6">
            <h3 className="mb-4 text-base font-semibold text-text">Langues</h3>
            <ul className="space-y-4">
              {languages.map((lang) => (
                <li key={lang.name} className="flex items-center justify-between">
                  <span>
                    <span className="block text-sm font-medium text-text">
                      {lang.name}
                    </span>
                    <span className="block text-sm text-muted">{lang.level}</span>
                  </span>
                  <Dots filled={lang.dots} />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
