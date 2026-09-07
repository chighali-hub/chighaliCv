import { motion, useReducedMotion } from 'framer-motion';

// Tuiles technologiques qui flottent autour du portrait (comme sur la maquette).
// Marques simplifiées, dessinées en SVG, teintées à la couleur de la techno.

function Atom() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
      <circle cx="12" cy="12" r="2" fill="#61DAFB" />
      <g fill="none" stroke="#61DAFB" strokeWidth="1.4">
        <ellipse cx="12" cy="12" rx="10" ry="4.3" />
        <ellipse cx="12" cy="12" rx="10" ry="4.3" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.3" transform="rotate(120 12 12)" />
      </g>
    </svg>
  );
}

function Mono({ label, color }) {
  return (
    <span
      className="font-display text-lg font-bold"
      style={{ color }}
      aria-hidden="true"
    >
      {label}
    </span>
  );
}

const TILES = [
  { key: 'react', node: <Atom />, x: '-9%', y: '6%', d: 5.5 },
  { key: 'js', node: <Mono label="JS" color="#F7DF1E" />, x: '92%', y: '-4%', d: 6.2 },
  { key: 'py', node: <Mono label="Py" color="#6F9BCB" />, x: '100%', y: '46%', d: 5 },
  { key: 'node', node: <Mono label="N" color="#7CC26B" />, x: '-11%', y: '56%', d: 6.8 },
  { key: 'docker', node: <Mono label="D" color="#4AA9EF" />, x: '86%', y: '92%', d: 5.8 },
  { key: 'flutter', node: <Mono label="Fl" color="#54C5F8" />, x: '-4%', y: '96%', d: 6.5 },
];

export default function TechTiles() {
  const reduce = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {TILES.map((t, i) => (
        <motion.div
          key={t.key}
          className="absolute grid h-12 w-12 place-items-center rounded-2xl border border-border-strong bg-white/[0.04] backdrop-blur-sm"
          style={{ left: t.x, top: t.y, boxShadow: '0 12px 30px -14px rgba(0,0,0,0.6)' }}
          initial={reduce ? false : { opacity: 0, scale: 0.8 }}
          animate={
            reduce
              ? { opacity: 1 }
              : { opacity: 1, scale: 1, y: [0, -12, 0] }
          }
          transition={
            reduce
              ? undefined
              : {
                  opacity: { duration: 0.4, delay: 0.3 + i * 0.1 },
                  scale: { duration: 0.4, delay: 0.3 + i * 0.1 },
                  y: {
                    duration: t.d,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.4,
                  },
                }
          }
        >
          {t.node}
        </motion.div>
      ))}
    </div>
  );
}
