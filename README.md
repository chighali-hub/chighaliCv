# Portfolio — Chighali Habott

Site vitrine personnel : présentation du parcours, des compétences et des
projets. Application React entièrement côté client, sans backend.

## Stack

| Domaine    | Choix                                            |
| ---------- | ------------------------------------------------ |
| Build      | Vite 8                                           |
| UI         | React 19                                         |
| Style      | Tailwind CSS v4 (tokens dans `src/index.css`)    |
| Animations | Framer Motion                                    |
| Tests      | Vitest + Testing Library (jsdom)                 |
| Exécution  | Node 24 (voir `.nvmrc`)                          |

**Pourquoi Tailwind CSS ?** Les utilitaires gardent le style au plus près du
balisage, sans coût d'exécution (compilation en CSS statique, contrairement à
styled-components). La couche `@theme` de la v4 concentre les tokens de design
(palette, échelle d'espacement, typographie) en un seul endroit, ce qui rend la
cohérence visuelle mécanique plutôt que disciplinaire. C'est aussi la stack déjà
employée sur d'autres projets du portfolio (SMTS Group, back-office MaharaAPP).

## Prérequis

Node 24 (Active LTS). Avec nvm :

```bash
nvm install    # lit .nvmrc
nvm use
```

## Commandes

```bash
npm ci          # installation reproductible depuis package-lock.json
npm run dev      # serveur de développement
npm run build    # build de production dans dist/
npm run preview  # sert le build localement
npm run lint     # ESLint
npm test         # Vitest (une passe, non interactif)
```

## Structure

```
.github/workflows/   ci.yml · security.yml · deploy.yml
public/              favicon.svg, profile.jpg (photo à déposer ici)
src/
  data/content.js    contenu unique du site (tout le texte affiché)
  lib/               présets d'animation, hook de section active
  components/         navbar, hero, about, skills, projects, parcours, contact, footer
  App.jsx            assemblage des sections
  index.css          import Tailwind + tokens @theme
```

## Photo de profil

Déposer l'image dans `public/profile.jpg`. Tant qu'elle est absente, la section
héro affiche un repli avec les initiales.

## Déploiement

Cible : Vercel. Le workflow `deploy.yml` publie une préversion par pull request
et la production sur push vers `main`, uniquement après une CI verte. Secrets
requis côté GitHub : `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.
Sans ces secrets, le job de déploiement réussit sans rien publier.
