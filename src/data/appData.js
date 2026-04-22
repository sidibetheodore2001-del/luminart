// ==========================================
// LUMINART — Application Data Store
// ==========================================

export const ROOMS_DATA = [
  {
    id: 'salon',
    name: 'Salon',
    emoji: '🛋️',
    lamps: [
      { id: 'l1', name: 'Plafonnier', intensity: 80, color: '#F5A623', temp: 3200, on: true },
      { id: 'l2', name: 'Lampe bureau', intensity: 0, color: '#FFFFFF', temp: 5000, on: false },
      { id: 'l3', name: 'Ruban LED TV', intensity: 45, color: '#FF6B35', temp: 2700, on: true },
      { id: 'l4', name: 'Lampadaire', intensity: 60, color: '#FFE0B2', temp: 3000, on: true },
      { id: 'l5', name: 'Veilleuse', intensity: 0, color: '#FFAB91', temp: 2700, on: false },
    ],
  },
  {
    id: 'chambre',
    name: 'Chambre',
    emoji: '🛏️',
    lamps: [
      { id: 'l6', name: 'Lampe chevet G', intensity: 30, color: '#FFE0B2', temp: 2700, on: true },
      { id: 'l7', name: 'Lampe chevet D', intensity: 0, color: '#FFE0B2', temp: 2700, on: false },
      { id: 'l8', name: 'Plafonnier', intensity: 0, color: '#FFFFFF', temp: 4000, on: false },
    ],
  },
  {
    id: 'cuisine',
    name: 'Cuisine',
    emoji: '🍳',
    lamps: [
      { id: 'l9', name: 'Spots plan travail', intensity: 90, color: '#FFFFFF', temp: 5000, on: true },
      { id: 'l10', name: 'Suspension ilot', intensity: 0, color: '#FFE0B2', temp: 3000, on: false },
      { id: 'l11', name: 'Réglette', intensity: 50, color: '#FFFFFF', temp: 4500, on: true },
    ],
  },
  {
    id: 'sdb',
    name: 'Salle de bain',
    emoji: '🚿',
    lamps: [
      { id: 'l12', name: 'Plafonnier', intensity: 100, color: '#FFFFFF', temp: 5500, on: true },
      { id: 'l13', name: 'Miroir LED', intensity: 70, color: '#FFFFFF', temp: 5000, on: true },
    ],
  },
  {
    id: 'bureau',
    name: 'Bureau',
    emoji: '💻',
    lamps: [
      { id: 'l14', name: 'Lampe de bureau', intensity: 85, color: '#FFFDE7', temp: 4500, on: true },
      { id: 'l15', name: 'Barre lumineuse écran', intensity: 60, color: '#E3F2FD', temp: 5500, on: true },
    ],
  },
  {
    id: 'couloir',
    name: 'Couloir',
    emoji: '🚪',
    lamps: [
      { id: 'l16', name: 'Spot entrée', intensity: 40, color: '#FFE0B2', temp: 3000, on: true },
    ],
  },
];

export const SCENES_DATA = [
  {
    id: 's1',
    name: 'Cinéma',
    emoji: '🎬',
    desc: 'Lumière tamisée, tons chauds ambrés',
    gradient: 'linear-gradient(135deg, #1a0a00, #3d1e00)',
    rooms: ['salon'],
    config: { intensity: 15, temp: 2700, color: '#FF8A00' },
    isFavorite: true,
  },
  {
    id: 's2',
    name: 'Lecture',
    emoji: '📖',
    desc: 'Blanc neutre, intensité modérée',
    gradient: 'linear-gradient(135deg, #1a1a0a, #2d2d1a)',
    rooms: ['salon', 'chambre'],
    config: { intensity: 60, temp: 4500, color: '#FFFDE7' },
    isFavorite: true,
  },
  {
    id: 's3',
    name: 'Dîner',
    emoji: '🍷',
    desc: 'Ambiance romantique, lueur chaleureuse',
    gradient: 'linear-gradient(135deg, #1a0500, #3d0f00)',
    rooms: ['cuisine', 'salon'],
    config: { intensity: 35, temp: 2700, color: '#FF6B35' },
    isFavorite: true,
  },
  {
    id: 's4',
    name: 'Focus',
    emoji: '🎯',
    desc: 'Lumière vive et froide pour la concentration',
    gradient: 'linear-gradient(135deg, #0a0a1a, #141428)',
    rooms: ['bureau'],
    config: { intensity: 90, temp: 5500, color: '#E3F2FD' },
    isFavorite: false,
  },
  {
    id: 's5',
    name: 'Soirée',
    emoji: '🎉',
    desc: 'Couleurs vives et dynamiques',
    gradient: 'linear-gradient(135deg, #1a0020, #0a001a)',
    rooms: ['salon'],
    config: { intensity: 50, temp: 3000, color: '#E040FB' },
    isFavorite: false,
  },
  {
    id: 's6',
    name: 'Détente',
    emoji: '🧘',
    desc: 'Tons apaisants, faible intensité',
    gradient: 'linear-gradient(135deg, #001a10, #002a18)',
    rooms: ['chambre', 'salon'],
    config: { intensity: 25, temp: 2700, color: '#A5D6A7' },
    isFavorite: false,
  },
  {
    id: 's7',
    name: 'Réveil',
    emoji: '🌅',
    desc: 'Lumière progressive matinale',
    gradient: 'linear-gradient(135deg, #1a0a00, #332200)',
    rooms: ['chambre'],
    config: { intensity: 70, temp: 4000, color: '#FFD54F' },
    isFavorite: false,
  },
];

export const ENERGY_DATA = {
  today: {
    kwh: 1.2,
    cost: 0.18,
    trend: -15,
  },
  hourly: [
    0.01, 0.01, 0.01, 0.01, 0.01, 0.02, 0.05, 0.08,
    0.06, 0.04, 0.03, 0.04, 0.06, 0.05, 0.04, 0.03,
    0.05, 0.08, 0.10, 0.12, 0.10, 0.08, 0.05, 0.02,
  ],
  byRoom: [
    { name: 'Salon', kwh: 0.5, pct: 42 },
    { name: 'Cuisine', kwh: 0.3, pct: 25 },
    { name: 'Bureau', kwh: 0.2, pct: 17 },
    { name: 'Chambre', kwh: 0.12, pct: 10 },
    { name: 'Autre', kwh: 0.08, pct: 6 },
  ],
};

export const COLOR_PRESETS = [
  '#F5A623', '#FF6B35', '#FF453A', '#E040FB',
  '#7B68EE', '#448AFF', '#00BCD4', '#00E676',
  '#FFEB3B', '#FFE0B2', '#FFFFFF', '#B0BEC5',
];

export function getGreeting() {
  const h = new Date().getHours();
  if (h >= 6 && h < 12) return { text: 'Bonjour', emoji: '☀️' };
  if (h >= 12 && h < 18) return { text: 'Bon après-midi', emoji: '🌤️' };
  if (h >= 18 && h < 22) return { text: 'Bonsoir', emoji: '🌙' };
  return { text: 'Bonne nuit', emoji: '🌑' };
}

export function getSceneSuggestion() {
  const h = new Date().getHours();
  if (h >= 6 && h < 9) return { scene: 'Réveil', text: 'Commencez la journée en douceur' };
  if (h >= 9 && h < 12) return { scene: 'Focus', text: 'Optimisez votre concentration' };
  if (h >= 12 && h < 14) return { scene: 'Détente', text: 'Une pause bien méritée' };
  if (h >= 14 && h < 18) return { scene: 'Focus', text: 'Restez productif cet après-midi' };
  if (h >= 18 && h < 20) return { scene: 'Dîner', text: 'Préparez une belle ambiance' };
  if (h >= 20 && h < 22) return { scene: 'Cinéma', text: 'Parfait pour un film' };
  return { scene: 'Détente', text: 'Préparez-vous pour la nuit' };
}
