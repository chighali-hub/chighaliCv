import { motion, useReducedMotion } from 'framer-motion';

// Décor de fond : deux halos colorés en dérive lente et une grille discrète.
// Purement décoratif (aria-hidden), placé derrière tout le contenu.
export default function Background() {
  const reduce = useReducedMotion();

  const drift = reduce
    ? {}
    : {
        animate: {
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.1, 0.95, 1],
        },
        transition: { duration: 26, repeat: Infinity, ease: 'easeInOut' },
      };

  const drift2 = reduce
    ? {}
    : {
        animate: {
          x: [0, -35, 25, 0],
          y: [0, 25, -15, 0],
          scale: [1, 0.9, 1.08, 1],
        },
        transition: { duration: 32, repeat: Infinity, ease: 'easeInOut' },
      };

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <motion.div
        {...drift}
        className="absolute -left-32 -top-40 h-[38rem] w-[38rem] rounded-full opacity-30 blur-[120px]"
        style={{
          background:
            'radial-gradient(circle at center, #6366f1, transparent 70%)',
        }}
      />
      <motion.div
        {...drift2}
        className="absolute -right-40 top-1/3 h-[34rem] w-[34rem] rounded-full opacity-25 blur-[120px]"
        style={{
          background:
            'radial-gradient(circle at center, #22d3ee, transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            'linear-gradient(#273043 1px, transparent 1px), linear-gradient(90deg, #273043 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse at 50% 0%, #000 30%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at 50% 0%, #000 30%, transparent 75%)',
        }}
      />
    </div>
  );
}
