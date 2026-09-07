import { motion, useReducedMotion } from 'framer-motion';

// Halos diffus bleu et violet en arrière-plan : grandes formes très floutées,
// faible opacité, en dérive lente. Purement décoratif.
export default function Background() {
  const reduce = useReducedMotion();

  const float = (a, b, d) =>
    reduce
      ? {}
      : {
          animate: { x: [0, a, 0], y: [0, b, 0] },
          transition: { duration: d, repeat: Infinity, ease: 'easeInOut' },
        };

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <motion.div
        {...float(40, -30, 26)}
        className="absolute -left-40 -top-48 h-[42rem] w-[42rem] rounded-full opacity-30"
        style={{
          background:
            'radial-gradient(circle at center, var(--color-glow-blue), transparent 70%)',
          filter: 'blur(130px)',
        }}
      />
      <motion.div
        {...float(-36, 28, 32)}
        className="absolute -right-48 top-24 h-[40rem] w-[40rem] rounded-full opacity-25"
        style={{
          background:
            'radial-gradient(circle at center, var(--color-glow-violet), transparent 70%)',
          filter: 'blur(150px)',
        }}
      />
      <motion.div
        {...float(24, 24, 38)}
        className="absolute left-1/3 top-1/2 h-[34rem] w-[34rem] rounded-full opacity-[0.16]"
        style={{
          background:
            'radial-gradient(circle at center, var(--color-accent-2), transparent 70%)',
          filter: 'blur(160px)',
        }}
      />
    </div>
  );
}
