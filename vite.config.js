import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Vite : bundler du site (React côté client uniquement, aucun serveur).
// Tailwind CSS v4 est branché via son plugin Vite officiel : la configuration
// des tokens vit dans src/index.css (@theme), il n'y a donc pas de
// tailwind.config.js.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    // Environnement DOM pour les tests de rendu React.
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setup-tests.js',
    css: true,
  },
});
