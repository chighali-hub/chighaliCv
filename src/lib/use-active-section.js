import { useEffect, useState } from 'react';

// Suit la section actuellement à l'écran pour surligner le bon lien de la barre
// de navigation. IntersectionObserver plutôt qu'un écouteur de scroll : pas de
// calcul à chaque frame.
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // La zone active est une bande horizontale au milieu du viewport.
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
