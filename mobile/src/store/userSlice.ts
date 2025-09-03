import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types';

interface UserState {
  currentUser: User | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  currentUser: {
    id: '1',
    name: 'EcoWarrior',
    email: 'user@recyclequest.sg',
    level: 1,
    xp: 0,
    recycleCoins: 0,
    streak: 0,
  },
  isLoggedIn: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addCoins: (state, action: PayloadAction<number>) => {
      if (state.currentUser) {
        state.currentUser.recycleCoins += action.payload;
      }
    },
    addXP: (state, action: PayloadAction<number>) => {
      if (state.currentUser) {
        state.currentUser.xp += action.payload;
        // Level up logic (every 100 XP = 1 level)
        const newLevel = Math.floor(state.currentUser.xp / 100) + 1;
        if (newLevel > state.currentUser.level) {
          state.currentUser.level = newLevel;
        }
      }
    },
    spendCoins: (state, action: PayloadAction<number>) => {
      if (state.currentUser && state.currentUser.recycleCoins >= action.payload) {
        state.currentUser.recycleCoins -= action.payload;
      }
    },
    updateStreak: (state, action: PayloadAction<number>) => {
      if (state.currentUser) {
        state.currentUser.streak = action.payload;
      }
    },
  },
});

export const { addCoins, addXP, spendCoins, updateStreak } = userSlice.actions;
export default userSlice.reducer;