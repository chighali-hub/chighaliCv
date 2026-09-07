import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, inView } from '../lib/motion-presets.js';

// Apparition au scroll : fondu + léger déplacement vers le haut.
// Neutralisé si l'utilisateur préfère moins de mouvement.
export default function Reveal({
  children,
  as = 'div',
  variants = fadeUp,
  className = '',
  ...rest
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as] ?? motion.div;

  if (reduce) {
    const Plain = as;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }

  return (
    <Tag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      {...rest}
    >
      {children}
    </Tag>
  );
}
