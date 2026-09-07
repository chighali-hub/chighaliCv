# Sécurité

## Signaler une faille

Contact : habottchighali@gmail.com

Merci de ne pas ouvrir d'issue publique pour un problème de sécurité. Décrire
le problème, les étapes de reproduction et l'impact estimé. Une réponse est
apportée dès que possible.

## Périmètre

Ce dépôt est un site vitrine statique, sans backend, sans authentification et
sans données personnelles de tiers. Les surfaces pertinentes :

- dépendances de build (analysées par `trivy` en CI, bloquant sur `CRITICAL`) ;
- motifs de code dangereux et secrets (analysés par `semgrep` en CI, le volet
  secrets est bloquant) ;
- configuration de déploiement (secrets Vercel côté GitHub, jamais dans le
  dépôt).

## Ce qui n'est jamais commité

Jetons, clés d'API, fichiers `.env`. Le volet `p/secrets` de `semgrep` échoue
la chaîne si un secret est détecté.
