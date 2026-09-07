// Étend les assertions de vitest avec les matchers DOM (toBeInTheDocument, etc.).
import '@testing-library/jest-dom/vitest';

// jsdom n'implémente pas ces API navigateur : doubles inertes pour que les
// composants qui les utilisent (révélation au scroll, préférence de mouvement,
// mesure du diagramme) se montent sans erreur en test.
if (!globalThis.IntersectionObserver) {
  globalThis.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  };
}

if (!globalThis.ResizeObserver) {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

if (!globalThis.matchMedia) {
  globalThis.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
    dispatchEvent() {
      return false;
    },
  });
}
