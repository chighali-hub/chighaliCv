import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, inView } from '../lib/motion-presets.js';

// Enrobe un bloc pour le faire apparaître en fondu montant quand il entre dans
// le viewport. Si l'utilisateur a demandé moins de mouvement, on rend le
// contenu tel quel, sans animation.
export default function Reveal({
  children,
  as = 'div',
  delay = 0,
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
      transition={{ delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
