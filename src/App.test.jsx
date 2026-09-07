import { render, screen } from '@testing-library/react';
import App from './App.jsx';

// Test de fumée : le site se rend et les repères principaux sont présents.
describe('App', () => {
  it('affiche le nom et les sections principales', () => {
    render(<App />);

    expect(screen.getAllByText(/Chighali/i).length).toBeGreaterThan(0);
    expect(
      screen.getByRole('heading', { name: /qui.*suis-je/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /technologies/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /quelques.*réalisations/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /travaillons.*ensemble/i }),
    ).toBeInTheDocument();
  });

  it('propose un lien email et un lien whatsapp', () => {
    render(<App />);
    const links = screen.getAllByRole('link');
    expect(
      links.some((a) => a.getAttribute('href')?.startsWith('mailto:')),
    ).toBe(true);
    expect(
      links.some((a) => a.getAttribute('href')?.includes('wa.me/22234533237')),
    ).toBe(true);
  });
});
