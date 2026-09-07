import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

// Configuration ESLint « à plat » (format par défaut d'ESLint 10), adaptée à un
// projet React + Vite sans TypeScript.
export default [
  { ignores: ['dist', 'node_modules', 'coverage', '.vercel'] },

  js.configs.recommended,

  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: { ...globals.browser },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // Règles des Hooks : non négociables, elles empêchent des bogues de rendu
      // silencieux.
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // Garde le rechargement à chaud fiable en dev.
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      // Une variable inutilisée est du code mort ; on tolère les constantes en
      // MAJUSCULES et les arguments préfixés par _ (ignorés volontairement).
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^_' }],
    },
  },

  {
    // Fonctions serverless Vercel : elles tournent sous Node, pas dans le navigateur.
    files: ['api/**/*.js'],
    languageOptions: {
      globals: { ...globals.node },
    },
  },

  {
    // Les fichiers de test : globals de vitest injectés via `globals: true`
    // dans la config test de Vite, déclarés ici pour ESLint.
    files: ['**/*.test.{js,jsx}', 'src/setup-tests.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        vi: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
      },
    },
  },
];
