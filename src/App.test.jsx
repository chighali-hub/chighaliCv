import { render, screen } from '@testing-library/react';
import App from './App.jsx';

// Test de fumée : le site se rend et les repères principaux sont présents.
// Volontairement minimal pour l'instant (voir le compromis --passWithNoTests
// dans .github/workflows/ci.yml).
describe('App', () => {
  it('affiche le nom et les sections principales', () => {
    render(<App />);

    expect(screen.getAllByText(/Chighali/i).length).toBeGreaterThan(0);
    expect(
      screen.getByRole('heading', { name: /qui je suis/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /ce que j'ai construit/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /travaillons ensemble/i }),
    ).toBeInTheDocument();
  });

  it('propose un lien de contact par email', () => {
    render(<App />);
    const mailLinks = screen
      .getAllByRole('link')
      .filter((a) => a.getAttribute('href')?.startsWith('mailto:'));
    expect(mailLinks.length).toBeGreaterThan(0);
  });
});
