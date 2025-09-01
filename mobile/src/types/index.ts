/**
 * Core TypeScript type definitions for RecycleQuest mobile app
 */

// User types
export interface User {
  id: string;
  email: string;
  username: string;
  level: number;
  experiencePoints: number;
  recycleCoins: number;
  totalRecycledKg: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserStats {
  level: number;
  currentXP: number;
  xpToNextLevel: number;
  totalRecycledKg: number;
  recycleCoins: number;
  achievementsCount: number;
  currentStreak: number;
}

// Quest types
export enum QuestType {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  COMMUNITY = 'COMMUNITY',
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  questType: QuestType;
  targetValue: number;
  rewardXP: number;
  rewardCoins: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface QuestProgress {
  questId: string;
  currentValue: number;
  isCompleted: boolean;
  completedAt?: string;
}

// Team types
export interface Team {
  id: string;
  name: string;
  description: string;
  totalRecycledKg: number;
  memberCount: number;
  createdAt: string;
}

export interface TeamMembership {
  teamId: string;
  userId: string;
  role: 'MEMBER' | 'ADMIN';
  joinedAt: string;
}

// Leaderboard types
export interface LeaderboardEntry {
  userId: string;
  username: string;
  level: number;
  totalRecycledKg: number;
  recycleCoins: number;
  rank: number;
}

// Activity types
export interface RecyclingActivity {
  id: string;
  itemType: string;
  weightKg: number;
  coinsEarned: number;
  xpEarned: number;
  verified: boolean;
  timestamp: string;
  binLocation?: string;
}

// Reward types
export interface MarketplaceItem {
  id: string;
  name: string;
  description: string;
  coinCost: number;
  category: string;
  imageUrl?: string;
  isAvailable: boolean;
}

export interface Transaction {
  id: string;
  itemId: string;
  itemName: string;
  coinCost: number;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  createdAt: string;
}

// Achievement types
export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconUrl?: string;
  unlockedAt?: string;
  isUnlocked: boolean;
}

// Smart Bin types
export interface SmartBin {
  id: string;
  locationName: string;
  latitude: number;
  longitude: number;
  binType: string;
  isActive: boolean;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  timestamp: string;
}

// Navigation types
export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Quests: undefined;
  Leaderboard: undefined;
  Marketplace: undefined;
  Camera: undefined;
  Education: undefined;
  Login: undefined;
  Register: undefined;
};

// WebSocket message types
export interface WebSocketMessage {
  type: 'LEADERBOARD_UPDATE' | 'TEAM_PROGRESS' | 'ACHIEVEMENT_UNLOCK' | 'QUEST_COMPLETE' | 'GOLDEN_BIN_ALERT';
  data: any;
  timestamp: string;
}