# Portfolio — Chighali Habott

Site vitrine personnel : parcours, compétences et projets. Application React
côté client, plus une fonction serverless pour le formulaire de contact.

## Stack

| Domaine     | Choix                                                    |
| ----------- | ------------------------------------------------------- |
| Build       | Vite 8                                                  |
| UI          | React 19                                                |
| Style       | Tailwind CSS v4 — tokens dans `src/index.css` (`@theme`) |
| Animation   | Framer Motion (tuiles flottantes, apparitions au scroll, survols) |
| Contact     | Fonction serverless Vercel `api/contact.js` + Resend    |
| Tests       | Vitest + Testing Library (jsdom)                        |
| Exécution   | Node 24 (voir `.nvmrc`)                                 |

### Système de design

Tokens dans `src/index.css` (`@theme`). Style bleu / violet sombre :

- **Fond** `#0A0F1F` avec deux halos radiaux (`#2563EB` bleu, `#7C3AED` violet)
  fixes, très floutés.
- **Surfaces** : cartes translucides `.card` (`#141C36` à 65 %, bordure 1px
  `rgba(255,255,255,.08)`, `border-radius` 18px, ombre portée douce).
- **Accents** : bleu `#3B82F6` et violet `#8B5CF6` — dégradé sur les boutons
  pleins, le nom du hero et le dernier mot des titres de section.
- **Couleur par catégorie de compétence** : `--color-cat-*` (bleu, cyan, vert,
  rose, violet, indigo, orange) — teinte l'icône et le bord supérieur de la carte.
- **Texte** `#EAF0FB`, **texte discret** `#94A0B8` (contraste ≥ 4.5:1).
- Titres **Poppins**, texte **Inter**, accents manuscrits **Caveat** (`.hand`).

## Prérequis

Node 24 (Active LTS). Avec nvm : `nvm install` puis `nvm use` (lit `.nvmrc`).

## Commandes

```bash
npm ci            # installation reproductible depuis package-lock.json
npm run dev        # serveur de développement (front uniquement)
npx vercel dev     # front + fonction /api/contact (nécessite .env.local)
npm run build      # build de production dans dist/
npm run preview    # sert le build localement
npm run lint       # ESLint
npm test           # Vitest (une passe, non interactif)
```

## Formulaire de contact

`POST /api/contact` → envoi d'un vrai email via **Resend**.

- Clé lue dans `process.env`, jamais commitée. Copier `.env.example` en
  `.env.local` pour le développement.
- Variables (déclarées aussi dans Vercel → Settings → Environment Variables) :
  - `RESEND_API_KEY` — obligatoire, obtenue sur <https://resend.com/api-keys>
  - `CONTACT_TO` — optionnel, défaut `habottchighali@gmail.com`
  - `CONTACT_FROM` — optionnel, défaut `Portfolio <onboarding@resend.dev>`
- Garde-fous : méthode POST uniquement, validation des champs, pot de miel
  anti-robot. Couverts par `api/contact.test.js`.

## Structure

```
.github/workflows/   ci.yml · security.yml · deploy.yml
api/contact.js        fonction serverless — envoi d'email
public/               favicon.svg, profile.jpg
src/
  data/content.js     contenu unique du site
  lib/                présets d'animation, hook de section active
  components/          navbar · hero · tech-tiles · about · skills · projects
                      parcours · contact · footer · section · reveal · background · icons
  App.jsx · index.css
```

## Déploiement

Vercel. `deploy.yml` publie une préversion par pull request et la production
sur push vers `main`, après une CI verte. Secrets GitHub :
`VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.
