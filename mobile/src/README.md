# RecycleQuest Mobile App - MVP Features

## Overview
RecycleQuest is a gamified mobile platform that turns recycling into an engaging quest. This MVP includes the core features needed to encourage recycling behavior through points, levels, and social elements.

## MVP Features Implemented

### 1. 📱 Scan the Bin
- **Location**: `ScannerScreen.tsx`
- **Functionality**: Simulates QR code scanning of recycling bins
- **User Flow**: Tap to scan bin → Get bin ID → Proceed to item selection

### 2. 📦 Scan the Item  
- **Location**: `ScannerScreen.tsx`
- **Functionality**: Select recyclable item type (paper, plastic, glass, metal, electronics)
- **User Flow**: Choose item type → Enter weight → Calculate rewards

### 3. ⚖️ Points by Weight
- **Location**: `userSlice.ts`, `ScannerScreen.tsx`
- **Functionality**: Award RecycleCoins based on item type and weight
- **Rates**: 
  - Paper: 10 coins/kg
  - Plastic: 15 coins/kg  
  - Glass: 20 coins/kg
  - Metal: 25 coins/kg
  - Electronics: 50 coins/kg

### 4. 🎯 Daily Quest System
- **Location**: `QuestsScreen.tsx`, `questsSlice.ts`
- **Quests Available**:
  - **Bin Run**: Scan 3 recycling bins (50 coins reward)
  - **Green Weight**: Recycle 2kg of materials (100 coins reward)
- **Features**: Progress tracking, completion status, rewards

### 5. 🏆 Point/Level System
- **Location**: `userSlice.ts`, `HomeScreen.tsx`
- **Progression**: 100 XP = 1 Level
- **Level Titles**:
  - Level 1-2: Recycler
  - Level 3-5: EcoHero  
  - Level 6+: GreenChampion
- **XP Sources**: 10 XP per kg recycled, 5 XP per bin scan

### 6. 🏅 Leaderboard
- **Location**: `LeaderboardScreen.tsx`, `leaderboardSlice.ts`
- **Features**:
  - Global and Local rankings
  - User rank display
  - Coins and level comparison
  - Team battle preview

### 7. 👥 Social Team/Friends
- **Location**: `LeaderboardScreen.tsx`
- **Features**:
  - Team battle system preview
  - Friend invitation system
  - Social sharing capabilities
  - Community challenges

### 8. 🛍️ Shop (Redeem CDC)
- **Location**: `ShopScreen.tsx`
- **Categories**:
  - **CDC Vouchers**: $5 (500 coins), $10 (1000 coins), $20 (2000 coins)
  - **Retail Discounts**: FairPrice, Grab Food, Shopee
  - **Eco Merchandise**: Tote bags, water bottles, badges
- **Features**: Purchase validation, insufficient funds handling

### 9. 💡 Quote of the Day
- **Location**: `HomeScreen.tsx`, `mockData.ts`
- **Content**: Motivational quotes, environmental facts, recycling tips
- **Display**: Featured prominently on home screen

## Technical Architecture

### State Management
- **Redux Toolkit** for global state management
- **Slices**: User, Quests, Leaderboard
- **Persistent data** simulation with initial state

### Navigation
- **React Navigation** with bottom tabs
- **Stack navigation** for modal screens
- **Tab icons** using emoji for MVP simplicity

### UI/UX Design
- **Material Design** inspired color scheme
- **Green theme** (#2E7D32 primary, #4CAF50 secondary)
- **Card-based layouts** for better mobile experience
- **Progress indicators** for quests and levels

### Data Flow
1. User scans bin → Updates scan quest progress
2. User selects item & weight → Calculates coins/XP → Updates user stats
3. Quest completion → Rewards distribution
4. Shop purchases → Coin deduction with validation

## File Structure
```
src/
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── navigation/         # Navigation configuration
├── screens/           # Main app screens
├── services/          # API and data services
├── store/             # Redux store and slices
├── types/             # TypeScript type definitions
└── utils/             # Helper functions and constants
```

## Getting Started
1. Ensure React Native environment is set up
2. Install dependencies: `npm install`
3. Run on Android: `npm run android`
4. Run on iOS: `npm run ios`

## Future Enhancements
- Real QR code scanning integration
- Backend API integration
- Push notifications for quests
- Camera integration for item verification
- Real-time leaderboard updates
- Social features expansion