// Contenu unique du site. Toute donnée affichée vient d'ici : le reste du code
// ne fait que la mettre en forme.

export const profile = {
  name: 'Chighali Habott',
  title:
    'Étudiant en 3e année de développement de systèmes informatiques à SupNum',
  tagline:
    'Je conçois et construis des applications web, mobiles et back-end, de la modélisation du domaine jusqu’à l’interface.',
  // L'image est fournie séparément : déposer le fichier dans public/profile.jpg.
  // Un rendu de repli (initiales) s'affiche tant qu'elle est absente.
  photo: '/profile.jpg',
  initials: 'CH',
  location: 'Mauritanie',
};

export const hero = {
  greeting: 'Bonjour, je suis',
  hand: 'concevoir · construire · itérer',
};

export const social = [
  { label: 'GitHub', icon: 'github', href: 'https://github.com/chighali-hub' },
  { label: 'Email', icon: 'mail', href: 'mailto:habottchighali@gmail.com' },
  { label: 'WhatsApp', icon: 'whatsapp', href: 'https://wa.me/22234533237' },
];

export const about = {
  paragraphs: [
    "Étudiant en troisième année à SupNum, je me forme au développement de systèmes informatiques, de la modélisation d'un domaine jusqu'à l'interface que l'utilisateur manipule.",
    "Ce qui me motive : prendre un besoin concret et le faire exister sous forme de logiciel qui tient debout. J'apprends en construisant, un projet complet à la fois, et je cherche aujourd'hui à mettre cette pratique au service d'équipes et de produits réels.",
  ],
  behavioral: [
    'Rigueur',
    'Gestion du temps',
    'Travail en équipe',
    'Adaptabilité',
    'Esprit critique',
    'Persévérance',
    'Prise de décision',
  ],
};

// Couleur par catégorie (valeurs en dur : Tailwind ne préserve pas une
// variable CSS dont le nom est construit dynamiquement).
export const catColors = {
  web: '#38bdf8',
  front: '#3b82f6',
  back: '#22c55e',
  mobile: '#ec4899',
  data: '#8b5cf6',
  prog: '#6366f1',
  tools: '#f59e0b',
  devops: '#f97316',
};

export const skillGroups = [
  { label: 'Langages web', icon: 'code', cat: 'web', items: ['HTML5', 'CSS', 'JavaScript', 'PHP'] },
  { label: 'Frontend', icon: 'layout', cat: 'front', items: ['React.js', 'Next.js'] },
  {
    label: 'Backend',
    icon: 'server',
    cat: 'back',
    items: ['Django', 'Flask', 'Express.js', 'Spring Boot'],
  },
  { label: 'Mobile', icon: 'phone', cat: 'mobile', items: ['Flutter'] },
  {
    label: 'Bases de données',
    icon: 'database',
    cat: 'data',
    items: ['SQL', 'NoSQL (MongoDB)'],
  },
  {
    label: 'Programmation',
    icon: 'terminal',
    cat: 'prog',
    items: ['Python', 'C++', 'POO', 'Java', 'Prolog'],
  },
  {
    label: 'Outils',
    icon: 'wrench',
    cat: 'tools',
    items: ['Modelio', 'VS Code', 'PyCharm', 'IntelliJ IDEA', 'Eclipse', 'Word'],
  },
  {
    label: 'DevOps',
    icon: 'infinity',
    cat: 'devops',
    items: ['Docker', 'Jenkins', 'Git', 'GitHub'],
  },
];

export const projects = [
  {
    name: 'Gestion de pharmacie',
    icon: 'box',
    summary: 'Application de gestion de stock et de ventes.',
    tags: ['Gestion de stock', 'Ventes'],
  },
  {
    name: 'Bibliothèque numérique à SupNum',
    icon: 'book',
    summary: 'Plateforme web de consultation de ressources.',
    tags: ['Plateforme web', 'Consultation de ressources'],
  },
  {
    name: 'Gestion des absences à SupNum',
    icon: 'calendar',
    summary: 'Solution mobile et web pour le suivi des absences en temps réel.',
    tags: ['Mobile', 'Web', 'Temps réel'],
  },
  {
    name: 'SMTS Group — Site vitrine',
    icon: 'window',
    summary:
      "Site vitrine développé pour l'entreprise SMTS Group : une application React entièrement frontend, animée et responsive.",
    tags: ['React', 'Tailwind CSS', 'Framer Motion', 'React Router v6'],
  },
  {
    name: 'Académie Mobile (MaharaAPP)',
    icon: 'graduation',
    kind: 'Plateforme de formation professionnelle',
    summary:
      "Plateforme d'apprentissage en ligne bâtie sur une architecture multi-canal : deux applications pour deux publics distincts, servies par une même API.",
    architecture: [
      {
        role: 'Application mobile — étudiants',
        tech: 'Flutter',
        detail:
          'Catalogue de formations, cours, abonnements, quiz, certificats et notifications.',
      },
      {
        role: 'Back-office web — administrateurs',
        tech: 'React.js',
        detail:
          'Gestion des formations, des abonnements, des étudiants et des statistiques.',
      },
      {
        role: 'API REST partagée',
        tech: 'Express.js · Prisma · MySQL',
        detail:
          'Routes séparées pour le mobile étudiant et le web admin, sur une base de données commune.',
      },
    ],
    tags: ['Flutter', 'React.js', 'Express.js', 'Prisma', 'MySQL'],
    featured: true,
  },
];

export const education = [
  { year: '2024', title: 'Baccalauréat D', detail: 'Série scientifique' },
  { year: '2021', title: 'Brevet', detail: 'Sciences générales' },
];

export const certifications = [
  { title: 'Certification Python', issuer: 'Alison' },
  { title: 'Certification Hedera', issuer: 'The Hashgraph Association' },
];

export const languages = [
  { name: 'Arabe', level: 'Langue maternelle', dots: 5 },
  { name: 'Français', level: 'Courant', dots: 4 },
];

// Résumé factuel du parcours, dérivé des compétences et des projets ci-dessus.
export const highlights = [
  'Développement web front-end et back-end',
  'Applications mobiles avec Flutter',
  'Conception et consommation d’API REST',
  'Bases de données SQL et NoSQL',
  'Intégration et déploiement continus (CI/CD, Vercel)',
  'Apprentissage par projets menés de bout en bout',
];

export const contact = {
  email: 'habottchighali@gmail.com',
  phoneDisplay: '+222 34 53 32 37',
  // Lien direct vers une conversation WhatsApp (indicatif Mauritanie 222 +
  // numéro à 8 chiffres, sans préfixe interurbain).
  whatsapp: 'https://wa.me/22234533237',
};

export const nav = [
  { id: 'a-propos', label: 'À propos' },
  { id: 'competences', label: 'Compétences' },
  { id: 'projets', label: 'Projets' },
  { id: 'parcours', label: 'Parcours' },
  { id: 'contact', label: 'Contact' },
];
