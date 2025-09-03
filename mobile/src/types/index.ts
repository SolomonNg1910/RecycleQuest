export interface User {
  id: string;
  name: string;
  email: string;
  level: number;
  xp: number;
  recycleCoins: number;
  streak: number;
  avatar?: string;
}

export interface RecyclingSession {
  id: string;
  userId: string;
  binId: string;
  items: RecycledItem[];
  totalWeight: number;
  totalCoins: number;
  timestamp: Date;
}

export interface RecycledItem {
  id: string;
  type: 'paper' | 'plastic' | 'glass' | 'metal' | 'electronics';
  weight: number;
  coins: number;
  verified: boolean;
}

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  target: number;
  progress: number;
  reward: number;
  completed: boolean;
  type: 'recycle' | 'scan' | 'weight';
}

export interface LeaderboardEntry {
  userId: string;
  name: string;
  coins: number;
  level: number;
  rank: number;
  avatar?: string;
}

export interface Team {
  id: string;
  name: string;
  members: User[];
  totalCoins: number;
  rank: number;
}

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  category: 'voucher' | 'discount' | 'merchandise';
  image?: string;
}

export interface Quote {
  id: string;
  text: string;
  author: string;
  category: 'motivation' | 'fact' | 'tip';
}