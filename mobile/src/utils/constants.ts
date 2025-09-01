/**
 * Application constants and configuration
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: __DEV__ ? 'http://localhost:8000' : 'https://your-domain.com',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;

// WebSocket Configuration
export const WS_CONFIG = {
  URL: __DEV__ ? 'ws://localhost:8000/ws' : 'wss://your-domain.com/ws',
  RECONNECT_INTERVAL: 5000,
  MAX_RECONNECT_ATTEMPTS: 5,
} as const;

// Gamification Constants
export const GAMIFICATION = {
  LEVELS: {
    RECYCLER: { min: 0, max: 999, name: 'Recycler' },
    ECO_HERO: { min: 1000, max: 4999, name: 'EcoHero' },
    GREEN_CHAMPION: { min: 5000, max: Infinity, name: 'GreenChampion' },
  },
  XP_PER_KG: 10,
  COINS_PER_KG: 10,
  QUEST_REWARDS: {
    BIN_RUN: 50,
    CLEAN_SWEEP: 20,
    COMMUNITY_DRIVE: 100,
  },
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: '@recyclequest:auth_token',
  USER_DATA: '@recyclequest:user_data',
  QUEST_PROGRESS: '@recyclequest:quest_progress',
  SETTINGS: '@recyclequest:settings',
} as const;

// Colors
export const COLORS = {
  PRIMARY: '#2E7D32',      // Green
  SECONDARY: '#4CAF50',    // Light Green
  ACCENT: '#FF9800',       // Orange
  SUCCESS: '#4CAF50',      // Green
  WARNING: '#FF9800',      // Orange
  ERROR: '#F44336',        // Red
  INFO: '#2196F3',         // Blue
  
  // Neutral colors
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  GRAY_LIGHT: '#F5F5F5',
  GRAY_MEDIUM: '#9E9E9E',
  GRAY_DARK: '#424242',
  
  // Background colors
  BACKGROUND: '#FAFAFA',
  SURFACE: '#FFFFFF',
  
  // Text colors
  TEXT_PRIMARY: '#212121',
  TEXT_SECONDARY: '#757575',
  TEXT_DISABLED: '#BDBDBD',
} as const;

// Typography
export const TYPOGRAPHY = {
  FONT_FAMILY: {
    REGULAR: 'System',
    MEDIUM: 'System',
    BOLD: 'System',
  },
  FONT_SIZE: {
    XS: 12,
    SM: 14,
    MD: 16,
    LG: 18,
    XL: 20,
    XXL: 24,
    XXXL: 32,
  },
  LINE_HEIGHT: {
    XS: 16,
    SM: 20,
    MD: 24,
    LG: 28,
    XL: 32,
    XXL: 36,
    XXXL: 48,
  },
} as const;

// Spacing
export const SPACING = {
  XS: 4,
  SM: 8,
  MD: 16,
  LG: 24,
  XL: 32,
  XXL: 48,
} as const;

// Screen dimensions helpers
export const SCREEN = {
  PADDING: SPACING.MD,
  HEADER_HEIGHT: 56,
  TAB_BAR_HEIGHT: 60,
} as const;

// Animation durations
export const ANIMATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Quest types
export const QUEST_TYPES = {
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  COMMUNITY: 'COMMUNITY',
} as const;

// Recyclable item types
export const ITEM_TYPES = {
  PAPER: 'paper',
  PLASTIC: 'plastic',
  GLASS: 'glass',
  METAL: 'metal',
  ELECTRONICS: 'electronics',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network connection failed. Please check your internet connection.',
  AUTH_FAILED: 'Authentication failed. Please log in again.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  CAMERA_PERMISSION: 'Camera permission is required to scan QR codes.',
  LOCATION_PERMISSION: 'Location permission is required to find nearby bins.',
} as const;