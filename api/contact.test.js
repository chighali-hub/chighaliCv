import { describe, it, expect, vi, beforeEach } from 'vitest';

// On simule Resend : aucun email réel n'est envoyé pendant les tests.
const sendMock = vi.fn();
vi.mock('resend', () => ({
  Resend: class {
    constructor() {
      this.emails = { send: sendMock };
    }
  },
}));

const { default: handler } = await import('./contact.js');

function mockRes() {
  const res = {};
  res.status = vi.fn(() => res);
  res.json = vi.fn(() => res);
  res.setHeader = vi.fn(() => res);
  return res;
}

const validBody = {
  name: 'Jean Dupont',
  email: 'jean@exemple.com',
  message: 'Bonjour, ceci est un vrai message de test suffisamment long.',
};

describe('api/contact', () => {
  beforeEach(() => {
    sendMock.mockReset();
    process.env.RESEND_API_KEY = 'test_key';
  });

  it('refuse les méthodes autres que POST', async () => {
    const res = mockRes();
    await handler({ method: 'GET' }, res);
    expect(res.status).toHaveBeenCalledWith(405);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('rejette un corps invalide sans rien envoyer (422)', async () => {
    const res = mockRes();
    await handler(
      { method: 'POST', body: { name: 'a', email: 'x', message: 'court' } },
      res,
    );
    expect(res.status).toHaveBeenCalledWith(422);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('ignore silencieusement le pot de miel (200, aucun envoi)', async () => {
    const res = mockRes();
    await handler(
      { method: 'POST', body: { ...validBody, company: 'robot' } },
      res,
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('répond 500 si la clé API est absente', async () => {
    delete process.env.RESEND_API_KEY;
    const res = mockRes();
    await handler({ method: 'POST', body: validBody }, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('envoie l’email quand tout est valide (200)', async () => {
    sendMock.mockResolvedValue({ data: { id: 'abc' }, error: null });
    const res = mockRes();
    await handler({ method: 'POST', body: validBody }, res);
    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('renvoie 502 si Resend signale une erreur', async () => {
    sendMock.mockResolvedValue({ data: null, error: { message: 'boom' } });
    const res = mockRes();
    await handler({ method: 'POST', body: validBody }, res);
    expect(res.status).toHaveBeenCalledWith(502);
  });
});
