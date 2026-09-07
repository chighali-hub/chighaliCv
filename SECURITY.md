# Sécurité

## Signaler une faille

Contact : habottchighali@gmail.com

Merci de ne pas ouvrir d'issue publique pour un problème de sécurité. Décrire
le problème, les étapes de reproduction et l'impact estimé.

## Périmètre

Site vitrine avec une seule surface dynamique : la fonction serverless
`api/contact.js` (envoi d'email via Resend).

- **Entrées** : `name`, `email`, `message` sont validés côté serveur
  (type, longueur, format). Méthode `POST` uniquement. Un champ pot de miel
  (`company`) piège les robots. Garde-fous couverts par `api/contact.test.js`.
- **Secrets** : `RESEND_API_KEY` et les autres identifiants viennent
  exclusivement de variables d'environnement (Vercel → Settings →
  Environment Variables). Jamais dans le dépôt, jamais renvoyés au client.
- **Dépendances** : analysées par `trivy` en CI, bloquant sur `CRITICAL`.
- **Code** : analysé par `semgrep` en CI, le volet secrets est bloquant.

## Ce qui n'est jamais commité

Jetons, clés d'API, fichiers `.env` / `.env.local`. `semgrep p/secrets`
échoue la chaîne si un secret est détecté. `.env.example` ne contient que des
noms de variables, sans valeur.
