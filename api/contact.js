import { Resend } from 'resend';

// Fonction serverless Vercel : reçoit le formulaire de contact et envoie un
// vrai email via Resend. Aucune clé n'est codée en dur : tout vient de
// process.env (déclaré dans Vercel -> Settings -> Environment Variables).

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readBody(req) {
  // Le runtime Node de Vercel parse déjà le JSON quand le Content-Type est bon.
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return {};
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Méthode non autorisée.' });
  }

  const { name, email, message, company } = readBody(req);

  // Pot de miel anti-robot : un vrai visiteur ne remplit jamais ce champ caché.
  // On répond succès sans rien envoyer, pour ne pas renseigner le robot.
  if (typeof company === 'string' && company.trim() !== '') {
    return res.status(200).json({ ok: true });
  }

  const cleanName = typeof name === 'string' ? name.trim() : '';
  const cleanEmail = typeof email === 'string' ? email.trim() : '';
  const cleanMessage = typeof message === 'string' ? message.trim() : '';

  const invalid = [];
  if (cleanName.length < 2 || cleanName.length > 100) invalid.push('nom');
  if (!EMAIL_RE.test(cleanEmail) || cleanEmail.length > 200) invalid.push('email');
  if (cleanMessage.length < 10 || cleanMessage.length > 5000) invalid.push('message');
  if (invalid.length > 0) {
    return res
      .status(422)
      .json({ error: `Champs invalides ou manquants : ${invalid.join(', ')}.` });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Mauvaise configuration serveur, pas une faute du visiteur.
    console.error('RESEND_API_KEY absente de l’environnement.');
    return res
      .status(500)
      .json({ error: "Le service d'envoi n'est pas configuré. Réessaie plus tard." });
  }

  const to = process.env.CONTACT_TO || 'habottchighali@gmail.com';
  const from = process.env.CONTACT_FROM || 'Portfolio <onboarding@resend.dev>';
  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: cleanEmail,
      subject: `Portfolio — message de ${cleanName}`,
      text:
        `Nom    : ${cleanName}\n` +
        `Email  : ${cleanEmail}\n` +
        `--------------------------------------------------\n\n` +
        `${cleanMessage}\n`,
    });

    if (error) {
      console.error('Erreur Resend :', error);
      return res
        .status(502)
        .json({ error: "L'envoi a échoué. Réessaie, ou écris-moi directement par email." });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Erreur inattendue dans /api/contact :', err);
    return res
      .status(500)
      .json({ error: "Une erreur inattendue s'est produite pendant l'envoi." });
  }
}
