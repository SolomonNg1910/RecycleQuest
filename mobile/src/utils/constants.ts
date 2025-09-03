export const RECYCLING_RATES = {
  paper: 10, // coins per kg
  plastic: 15,
  glass: 20,
  metal: 25,
  electronics: 50,
};

export const XP_RATES = {
  perKg: 10, // XP per kg recycled
  binScan: 5, // XP per bin scan
  questComplete: 25, // XP per quest completion
};

export const LEVEL_THRESHOLDS = {
  xpPerLevel: 100,
  maxLevel: 50,
};

export const LEVEL_TITLES = {
  1: 'Recycler',
  3: 'EcoHero', 
  6: 'GreenChampion',
  10: 'EcoLegend',
};

export const QUEST_TYPES = {
  SCAN: 'scan',
  WEIGHT: 'weight',
  RECYCLE: 'recycle',
} as const;

export const COLORS = {
  primary: '#2E7D32',
  secondary: '#4CAF50',
  accent: '#FF9800',
  background: '#f5f5f5',
  white: '#ffffff',
  text: '#333333',
  textSecondary: '#666666',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
};