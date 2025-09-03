import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LeaderboardEntry, Team } from '../types';

interface LeaderboardState {
  globalLeaderboard: LeaderboardEntry[];
  localLeaderboard: LeaderboardEntry[];
  teams: Team[];
  userTeam: Team | null;
}

const initialState: LeaderboardState = {
  globalLeaderboard: [
    { userId: '2', name: 'GreenHero', coins: 2500, level: 5, rank: 1 },
    { userId: '3', name: 'EcoChamp', coins: 2200, level: 4, rank: 2 },
    { userId: '1', name: 'EcoWarrior', coins: 0, level: 1, rank: 3 },
  ],
  localLeaderboard: [
    { userId: '2', name: 'GreenHero', coins: 2500, level: 5, rank: 1 },
    { userId: '3', name: 'EcoChamp', coins: 2200, level: 4, rank: 2 },
    { userId: '1', name: 'EcoWarrior', coins: 0, level: 1, rank: 3 },
  ],
  teams: [],
  userTeam: null,
};

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    updateLeaderboard: (state, action: PayloadAction<LeaderboardEntry[]>) => {
      state.globalLeaderboard = action.payload;
    },
    updateLocalLeaderboard: (state, action: PayloadAction<LeaderboardEntry[]>) => {
      state.localLeaderboard = action.payload;
    },
    joinTeam: (state, action: PayloadAction<Team>) => {
      state.userTeam = action.payload;
    },
  },
});

export const { updateLeaderboard, updateLocalLeaderboard, joinTeam } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;